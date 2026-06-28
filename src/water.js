// Water & shoreline (Phase 7). All water lives here behind one helper so Place only
// talks to { group, update, dispose, spawn* }. Quality comes from GFX.water:
//   'flat'      (low)    → exactly today: surface plane + deep plane + gentle bob.
//   'animated'  (med/hi) → adds a scrolling highlight overlay, a high-tier sparkle
//                          overlay, a soft shore-foam rim, and per-theme tinting.
// Everything is procedural (canvas textures, no shipped assets). Every material,
// geometry, and texture this makes is per-place and _owned (or freed in dispose()).
// Motion damps hard under reducedMotion(); picking/collision are never touched (water
// adds no pickables).
import * as THREE from 'three';
import { GFX } from './gfx.js';
import { reducedMotion } from './a11y.js';

// Per-theme tint + sparkle/foam density. 'flat' ignores this and uses the base palette
// so Low stays byte-identical to today.
const WATER_TINT = {
  hub: { surface: 0x7ec8e3, deep: 0x5fb0d4, sparkle: 1.0, foam: 1.0 },
  tide: { surface: 0x86cfe6, deep: 0x5fb0d4, sparkle: 1.2, foam: 1.5 },
  garden: { surface: 0x7ec8e3, deep: 0x5fb0d4, sparkle: 0.8, foam: 0.8 },
  stump: { surface: 0x7ec8e3, deep: 0x5fb0d4, sparkle: 0.8, foam: 1.0 },
  vines: { surface: 0x79b8e0, deep: 0x6a8fd4, sparkle: 1.0, foam: 0.8 },
};

// Drawing is wrapped so an incomplete 2d context (e.g. a minimal test stub) yields a
// valid blank texture instead of throwing; a real browser context draws normally.
function streakTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  try {
    g.clearRect(0, 0, 128, 128);
    g.strokeStyle = 'rgba(255,255,255,0.5)';
    g.lineWidth = 3;
    for (let i = 0; i < 5; i++) {
      g.beginPath();
      const y = 12 + i * 26;
      g.moveTo(0, y);
      g.bezierCurveTo(40, y - 10, 88, y + 10, 128, y - 4);
      g.stroke();
    }
  } catch { /* incomplete ctx (test stub) → blank texture is fine */ }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  try {
    for (let i = 0; i < 18; i++) {
      const x = (i * 37) % 64, y = (i * 53) % 64;
      const grad = g.createRadialGradient(x, y, 0, x, y, 3);
      grad.addColorStop(0, 'rgba(255,255,255,0.9)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = grad;
      g.fillRect(x - 3, y - 3, 6, 6);
    }
  } catch { /* incomplete ctx (test stub) → blank texture is fine */ }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

// Floor cells adjacent to a '#' (null) water cell, with an outward offset toward the
// water — so the foam sits on the *edge*, never over a walkable tile center.
function shoreCellsOf(place) {
  const { w, d } = place.size;
  const out = [];
  for (let z = 0; z < d; z++) {
    for (let x = 0; x < w; x++) {
      const c = place.cellAt(x, z);
      if (!c || c.h !== 0) continue;
      let ox = 0, oz = 0, water = 0;
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        if (!place.cellAt(x + dx, z + dz)) { ox += dx; oz += dz; water++; }
      }
      if (water > 0) out.push({ x, z, ox: ox * 0.45, oz: oz * 0.45 });
    }
  }
  return out;
}

function flatPlane(geo, color, y, opts = {}) {
  const mat = new THREE.MeshLambertMaterial({ color, ...opts });
  mat._owned = true;
  const m = new THREE.Mesh(geo, mat);
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  return m;
}

function overlayPlane(geo, tex, y, opacity, repeat) {
  tex.repeat.set(repeat, repeat);
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending });
  mat._owned = true;
  const m = new THREE.Mesh(geo, mat);
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  return m;
}

// Soft foam rim along coast edges as ONE instanced additive mesh, offset toward the
// water so it never covers a walkable tile center.
function buildFoam(place, group, tint) {
  const shore = shoreCellsOf(place);
  if (!shore.length) return;
  const foamGeo = new THREE.PlaneGeometry(0.7, 0.7);
  foamGeo._owned = true;
  const foamMat = new THREE.MeshBasicMaterial({
    map: dotTexture(), color: 0xeafcff, transparent: true,
    opacity: 0.22 * (tint.foam || 1), depthWrite: false, blending: THREE.AdditiveBlending,
  });
  foamMat._owned = true;
  const foam = new THREE.InstancedMesh(foamGeo, foamMat, shore.length);
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
  const scl = new THREE.Vector3(1, 1, 1);
  const pos = new THREE.Vector3();
  shore.forEach((s, i) => {
    const wp = place.worldPos(s.x, s.z);
    pos.set(wp.x + s.ox, -0.18, wp.z + s.oz);
    m4.compose(pos, q, scl);
    foam.setMatrixAt(i, m4);
  });
  foam.instanceMatrix.needsUpdate = true;
  group.add(foam);
}

export function createWaterSurface(place, { size, quality, palette, theme = 'hub' } = {}) {
  const group = new THREE.Group();
  const span = Math.max(size.w, size.d) * 3;
  const geo = new THREE.PlaneGeometry(span, span); // shared by base + deep + overlays
  const animated = quality === 'animated';
  const tint = animated ? (WATER_TINT[theme] || WATER_TINT.hub) : { surface: palette.water, deep: palette.waterDeep };

  const surface = flatPlane(geo, tint.surface, -0.22, { transparent: true, opacity: 0.92 });
  group.add(surface);
  group.add(flatPlane(geo, tint.deep, -0.55));

  let highlight = null;
  let sparkle = null;
  if (animated) {
    highlight = overlayPlane(geo, streakTexture(), -0.205, 0.12, 3);
    group.add(highlight);
    if (GFX.bloom) { sparkle = overlayPlane(geo, dotTexture(), -0.2, 0.08, 4); group.add(sparkle); } // high only
    buildFoam(place, group, tint);
  }

  const pool = createPool(group, animated);
  let t = 0;
  function update(dtMs) {
    t += dtMs / 1000;
    surface.position.y = -0.22 + Math.sin(t * 1.11) * 0.02; // same gentle bob as today
    if (!animated) return;
    const calm = reducedMotion() ? 0.25 : 1;
    if (highlight) {
      highlight.material.map.offset.set((t * 0.012 * calm) % 1, (t * 0.008 * calm) % 1);
      highlight.material.opacity = 0.10 + 0.05 * (0.5 + 0.5 * Math.sin(t * 0.8)) * calm;
    }
    if (sparkle) {
      sparkle.material.map.offset.x = (-t * 0.02 * calm) % 1;
      sparkle.material.opacity = (0.05 + 0.04 * (0.5 + 0.5 * Math.sin(t * 1.3))) * calm;
    }
    pool.update(dtMs);
  }

  return {
    group, update, surface,
    dispose: pool.dispose,
    spawnFishShadow: pool.spawnFishShadow,
    spawnBubble: pool.spawnBubble,
    spawnSparkle: pool.spawnBubble,
  };
}

// Pooled, capped water-life spawns (Phase 4 drives these). No-ops on flat water.
function createPool(group, animated) {
  const pooled = [];
  const MAX = 12;
  const spawnFishShadow = (at) => {
    if (!animated || pooled.length >= MAX) return;
    const mat = new THREE.MeshBasicMaterial({ color: 0x224055, transparent: true, opacity: 0, depthWrite: false });
    mat._owned = true;
    const fish = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.22), mat);
    fish.geometry._owned = true;
    fish.rotation.x = -Math.PI / 2;
    fish.position.set(at.x, -0.21, at.z);
    group.add(fish);
    pooled.push({ mesh: fish, t: 0, life: 2600, dir: new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize(), speed: 0.5 + Math.random() * 0.4 });
  };
  const spawnBubble = (at) => {
    if (!animated || pooled.length >= MAX) return;
    const mat = new THREE.MeshBasicMaterial({ color: 0xd9f2fb, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending });
    mat._owned = true;
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 4), mat);
    b.geometry._owned = true;
    b.position.set(at.x, -0.2, at.z);
    group.add(b);
    pooled.push({ mesh: b, t: 0, life: 900, rise: 0.4 });
  };
  const free = (p) => { group.remove(p.mesh); p.mesh.geometry.dispose?.(); p.mesh.material.dispose?.(); };
  const update = (dtMs) => {
    for (let i = pooled.length - 1; i >= 0; i--) {
      const p = pooled[i];
      p.t += dtMs;
      const k = p.t / p.life;
      if (p.dir) {
        p.mesh.position.x += p.dir.x * p.speed * dtMs / 1000;
        p.mesh.position.z += p.dir.z * p.speed * dtMs / 1000;
        p.mesh.material.opacity = Math.sin(Math.min(1, k) * Math.PI) * 0.28;
      } else {
        p.mesh.position.y = -0.2 + k * p.rise;
        p.mesh.material.opacity = (1 - k) * 0.5;
      }
      if (k >= 1) { free(p); pooled.splice(i, 1); }
    }
  };
  const dispose = () => { for (const p of pooled) free(p); pooled.length = 0; };
  return { spawnFishShadow, spawnBubble, update, dispose };
}
