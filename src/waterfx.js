// Lazy animated water effects: theme tint, shimmer, foam, shoreline ripples,
// fish shadows, and bubbles. Loaded only when GFX.water asks for animation.
import * as THREE from 'three';
import { GFX } from './gfx.js';
import { reducedMotion } from './a11y.js';

const WATER_TINT = {
  hub: { surface: 0x7ec8e3, deep: 0x5fb0d4, foam: 1.0 },
  tide: { surface: 0x86cfe6, deep: 0x5fb0d4, foam: 1.5 },
  garden: { surface: 0x7ec8e3, deep: 0x5fb0d4, foam: 0.8 },
  stump: { surface: 0x7ec8e3, deep: 0x5fb0d4, foam: 1.0 },
  vines: { surface: 0x79b8e0, deep: 0x6a8fd4, foam: 0.8 },
};

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
  } catch { /* incomplete ctx (test stub) -> blank texture is fine */ }
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
  } catch { /* incomplete ctx (test stub) -> blank texture is fine */ }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function shoreCellsOf(place) {
  const { w, d } = place.size;
  const out = [];
  for (let z = 0; z < d; z++) {
    for (let x = 0; x < w; x++) {
      const c = place.cellAt(x, z);
      if (!c || c.h !== 0) continue;
      let ox = 0, oz = 0;
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        if (!place.cellAt(x + dx, z + dz)) { ox += dx; oz += dz; }
      }
      if (ox || oz) out.push({ x, z, ox: ox * 0.45, oz: oz * 0.45 });
    }
  }
  return out;
}

function shoreAnchorsOf(place) {
  return shoreCellsOf(place).map((s) => {
    const wp = place.worldPos(s.x, s.z);
    const mag = Math.hypot(s.ox, s.oz) || 1;
    return {
      kind: 'shore',
      x: wp.x + s.ox,
      z: wp.z + s.oz,
      outX: s.ox / mag,
      outZ: s.oz / mag,
    };
  });
}

function overlayPlane(geo, tex, y, opacity, repeat) {
  tex.repeat.set(repeat, repeat);
  const mat = new THREE.MeshBasicMaterial({
    map: tex, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  mat._owned = true;
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = y;
  return mesh;
}

function buildFoam(group, shore, tint) {
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
    pos.set(s.x, -0.18, s.z);
    m4.compose(pos, q, scl);
    foam.setMatrixAt(i, m4);
  });
  foam.instanceMatrix.needsUpdate = true;
  group.add(foam);
}

function nearestAnchor(anchors, position, maxDist = Infinity) {
  if (!position || !anchors.length) return null;
  let best = null;
  let bestD = maxDist * maxDist;
  for (const a of anchors) {
    const d = (a.x - position.x) ** 2 + (a.z - position.z) ** 2;
    if (d < bestD) { best = a; bestD = d; }
  }
  return best;
}

function createShoreMoments(group, anchors) {
  const active = [];
  const max = GFX.tier === 'high' ? 14 : 9;
  const tex = streakTexture();
  const free = (p) => {
    group.remove(p.mesh);
    p.mesh.geometry.dispose?.();
    p.mesh.material.dispose?.();
  };
  const spawnShoreRipple = (anchor, opts = {}) => {
    if (reducedMotion() || !anchor || active.length >= max) return;
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      color: opts.color || 0xeaffff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    mat._owned = true;
    const geo = new THREE.PlaneGeometry(opts.width || 0.72, opts.depth || 0.28);
    geo._owned = true;
    const ripple = new THREE.Mesh(geo, mat);
    const angle = Math.atan2(anchor.outZ || 0, anchor.outX || 1) + Math.PI / 2;
    ripple.rotation.set(-Math.PI / 2, 0, angle);
    ripple.position.set(anchor.x + (anchor.outX || 0) * 0.06, -0.188, anchor.z + (anchor.outZ || 0) * 0.06);
    ripple.renderOrder = 2;
    group.add(ripple);
    active.push({ mesh: ripple, anchor, t: 0, life: opts.life || 1250, opacity: opts.opacity || 0.24, drift: opts.drift || 0.16 });
  };
  const update = (dtMs) => {
    for (let i = active.length - 1; i >= 0; i--) {
      const p = active[i];
      p.t += dtMs;
      const k = Math.min(1, p.t / p.life);
      p.mesh.position.x = p.anchor.x + (p.anchor.outX || 0) * (0.06 + p.drift * k);
      p.mesh.position.z = p.anchor.z + (p.anchor.outZ || 0) * (0.06 + p.drift * k);
      p.mesh.material.opacity = Math.sin(k * Math.PI) * p.opacity;
      p.mesh.scale.set(0.65 + k * 0.7, 0.75 + k * 0.25, 1);
      if (k >= 1) { free(p); active.splice(i, 1); }
    }
  };
  const react = (type, payload = {}) => {
    if (reducedMotion()) return;
    if (type !== 'player-hop' && type !== 'correct-answer' && type !== 'build-complete') return;
    const anchor = nearestAnchor(anchors, payload.worldPos || payload.position, type === 'player-hop' ? 1.4 : Infinity);
    if (!anchor) return;
    spawnShoreRipple(anchor, {
      opacity: type === 'correct-answer' ? 0.32 : 0.24,
      width: type === 'build-complete' ? 0.9 : 0.72,
      life: type === 'build-complete' ? 1500 : 1150,
    });
  };
  const dispose = () => {
    for (const p of active) free(p);
    active.length = 0;
    tex.dispose?.();
  };
  return { update, dispose, react, spawnShoreRipple };
}

function createPool(group) {
  const pooled = [];
  const MAX = 12;
  const spawnFishShadow = (at, opts = {}) => {
    if (!at || pooled.length >= MAX) return;
    const mat = new THREE.MeshBasicMaterial({ color: 0x224055, transparent: true, opacity: 0, depthWrite: false });
    mat._owned = true;
    const fish = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.28), mat);
    fish.geometry._owned = true;
    fish.rotation.x = -Math.PI / 2;
    fish.position.set(at.x, -0.21, at.z);
    const side = opts.side || 1;
    const dx = opts.dx ?? -(at.outZ || 0) * side;
    const dz = opts.dz ?? (at.outX || 1) * side;
    fish.rotation.z = Math.atan2(dz, dx);
    group.add(fish);
    pooled.push({ mesh: fish, t: 0, life: opts.life || 2800, dir: new THREE.Vector3(dx, 0, dz).normalize(), speed: opts.speed || 0.42, opacity: 0.24 });
  };
  const spawnBubble = (at, opts = {}) => {
    if (!at || pooled.length >= MAX) return;
    const mat = new THREE.MeshBasicMaterial({
      color: 0xd9f2fb, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    mat._owned = true;
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 4), mat);
    b.geometry._owned = true;
    b.position.set(at.x, -0.2, at.z);
    group.add(b);
    pooled.push({ mesh: b, t: 0, life: opts.life || 900, rise: opts.rise || 0.42, sway: opts.sway || 0.08 });
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
        p.mesh.material.opacity = Math.sin(Math.min(1, k) * Math.PI) * p.opacity;
      } else {
        p.mesh.position.y = -0.2 + k * p.rise;
        p.mesh.position.x += Math.sin(k * Math.PI * 2) * p.sway * dtMs / 1000;
        p.mesh.material.opacity = (1 - k) * 0.5;
      }
      if (k >= 1) { free(p); pooled.splice(i, 1); }
    }
  };
  const dispose = () => { for (const p of pooled) free(p); pooled.length = 0; };
  return { spawnFishShadow, spawnBubble, spawnSparkle: spawnBubble, update, dispose };
}

export function attachWaterEffects(place, { group, surface, deep, theme = 'hub', lifeAnchors }) {
  const tint = WATER_TINT[theme] || WATER_TINT.hub;
  surface.material.color.setHex(tint.surface);
  deep.material.color.setHex(tint.deep);
  lifeAnchors.splice(0, lifeAnchors.length, ...shoreAnchorsOf(place));

  const geo = surface.geometry;
  const highlight = overlayPlane(geo, streakTexture(), -0.205, 0.12, 3);
  const sparkle = GFX.bloom ? overlayPlane(geo, dotTexture(), -0.2, 0.08, 4) : null;
  group.add(highlight);
  if (sparkle) group.add(sparkle);
  buildFoam(group, lifeAnchors, tint);

  const shore = createShoreMoments(group, lifeAnchors);
  const pool = createPool(group);
  let t = 0;
  return {
    update(dtMs) {
      t += dtMs / 1000;
      const calm = reducedMotion() ? 0.25 : 1;
      highlight.material.map.offset.set((t * 0.012 * calm) % 1, (t * 0.008 * calm) % 1);
      highlight.material.opacity = 0.10 + 0.05 * (0.5 + 0.5 * Math.sin(t * 0.8)) * calm;
      if (sparkle) {
        sparkle.material.map.offset.x = (-t * 0.02 * calm) % 1;
        sparkle.material.opacity = (0.05 + 0.04 * (0.5 + 0.5 * Math.sin(t * 1.3))) * calm;
      }
      shore.update(dtMs);
      pool.update(dtMs);
    },
    react: shore.react,
    dispose() { shore.dispose(); pool.dispose(); },
    spawnShoreRipple: shore.spawnShoreRipple,
    spawnFishShadow: pool.spawnFishShadow,
    spawnBubble: pool.spawnBubble,
    spawnSparkle: pool.spawnSparkle,
  };
}
