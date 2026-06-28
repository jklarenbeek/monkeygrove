// Glow language (Phase 6, Layer A) — one dependency-free vocabulary for "friendly
// magic and reward" glow that every magical/reward object uses instead of hand-rolling
// sprites. All outputs are ADDITIVE, depthWrite:false, mark their material `_owned`
// (so place.dispose() frees them), and reuse shared radial-gradient canvas textures
// bucketed by softness (no shipped images). Runs at EVERY tier via GFX.glowSprites.
//
// High tier (GFX.bloom) gets a gentle additive "boost" — larger, brighter haloes —
// which stands in for true selective-bloom postprocessing. The full EffectComposer
// path (the `postprocessing` dependency, plan open-decision #2) is intentionally
// deferred to protect the first-load budget; it can be slotted in later behind the
// same GFX.bloom flag without touching call sites.
//
// HARD child-safety rule: glow reads as warmth, never glare, and never sits behind a
// number/prompt/button. Keep opacities gentle and never place a bright glow directly
// behind docked text.
import * as THREE from 'three';
import { GFX } from './gfx.js';
import { reducedMotion } from './a11y.js';

const _texCache = new Map();
function glowTexture(soft = 0.4) {
  const key = Math.round(soft * 10);
  let t = _texCache.get(key);
  if (t) return t;
  if (typeof document === 'undefined') return null; // SSR / tests without a DOM
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(Math.max(0.1, Math.min(0.9, soft)), 'rgba(255,255,255,0.55)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  t = new THREE.CanvasTexture(c);
  t._cached = true; // shared singleton — never disposed with a place
  _texCache.set(key, t);
  return t;
}

// High-tier halo boost (no postprocessing): bigger, slightly brighter on GFX.bloom.
export function glowSizeBoost() { return GFX.bloom ? 1.35 : 1.0; }
export function glowOpacityBoost() { return GFX.bloom ? 1.25 : 1.0; }

// Camera-facing soft additive dot — gem cores, stars, sparkles, fireflies.
export function makeGlowSprite(color, radius = 0.1, opacity = 1) {
  const mat = new THREE.SpriteMaterial({
    map: glowTexture(0.4), color, transparent: true,
    depthWrite: false, blending: THREE.AdditiveBlending,
    opacity: Math.min(1, opacity * glowOpacityBoost()),
  });
  mat._owned = true;
  const sp = new THREE.Sprite(mat);
  const s = radius * 2 * glowSizeBoost();
  sp.scale.set(s, s, 1);
  sp.userData.baseOpacity = opacity;
  return sp;
}

// Flat additive quad — portal films, altar/reward washes on the ground or a face.
export function makeGlowPlane(color, size = 1, opacity = 0.5) {
  const mat = new THREE.MeshBasicMaterial({
    map: glowTexture(0.5), color, transparent: true,
    depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    opacity: Math.min(1, opacity * glowOpacityBoost()),
  });
  mat._owned = true;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size * glowSizeBoost(), size * glowSizeBoost()), mat);
  m.geometry._owned = true; // per-instance geometry → freed with the place
  m.userData.baseOpacity = opacity;
  return m;
}

// Per-frame breathe of a glow's opacity. MUST hold steady under reduced-motion so
// nothing flickers for a sensitive child.
export function pulseGlow(material, time, base = 0.3, amp = 0.2, speed = 2) {
  if (!material) return;
  if (reducedMotion()) { material.opacity = base; return; }
  material.opacity = Math.min(1, base + amp * (0.5 + 0.5 * Math.sin(time * speed)));
}

// A small drifting mote field as a self-contained group. Returns { group, update }.
// Cosmetic, deterministic only if you seed `rand`; defaults to a fixed sequence so it
// never touches a game RNG. Honors reduced-motion (slows to a gentle hover).
export function makeMoteField({ count = 6, color = 0xfff3b8, size = 0.07, spread = 0.6, rise = 1.0, rand = null } = {}) {
  const group = new THREE.Group();
  const motes = [];
  let seed = 1;
  const rnd = rand || (() => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; });
  for (let i = 0; i < count; i++) {
    const sp = makeGlowSprite(color, size, 0.6);
    sp.userData.m = {
      ox: (rnd() - 0.5) * spread, oz: (rnd() - 0.5) * spread,
      phase: rnd(), speed: 0.05 + rnd() * 0.06, sway: 0.4 + rnd() * 0.6, base: size,
    };
    group.add(sp);
    motes.push(sp);
  }
  function update(timeSec) {
    const calm = reducedMotion();
    for (const sp of motes) {
      const m = sp.userData.m;
      const k = ((timeSec * (calm ? m.speed * 0.4 : m.speed)) + m.phase) % 1;
      sp.position.set(
        m.ox + Math.sin(timeSec * m.sway + m.phase * 7) * (calm ? 0.05 : 0.16),
        0.1 + k * rise,
        m.oz,
      );
      sp.material.opacity = Math.sin(k * Math.PI) * 0.55 * glowOpacityBoost();
    }
  }
  return { group, update };
}
