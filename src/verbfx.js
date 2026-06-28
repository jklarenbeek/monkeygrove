// Math-chamber juice (Phase 11) — the consistent glow + ambience layer the verbs and
// chamber flow add ON TOP of their existing, already-distinct effects (star birth,
// row sprouts, splash, basket wobble). The pedagogical bar is strict: nothing here
// hides a number, the equation banner, an answer zone, or the model; a not-yet answer
// gets a warm shimmer, never red/shake/punishment.
//
// HARD rule: this module NEVER imports mathengine.js — the math logic stays pure.
// All randomness forks its own Rng; all motion checks reducedMotion(); off at low.
import * as THREE from 'three';
import { GFX } from './gfx.js';
import { reducedMotion } from './a11y.js';
import { WORLD_THEME } from './config.js';
import { tween, ease, delay } from './anim.js';
import { makeGlowPlane, makeMoteField } from './glow.js';
import { Rng } from './rng.js';

const GOLD = 0xffd966;
const CREAM = 0xfff3bf;
const KIND_COLOR = {
  ready: 0xffd966,
  correct: 0xaef0b2,
  low: 0x9bd6ff,
  high: 0xc9a6ff,
  notYet: 0xffe9a8,
};

// Correct/idle colors come from the world theme — never hardcoded per verb.
export function themeAccent(world) {
  return (WORLD_THEME[world] || WORLD_THEME.hub).accent;
}

function gfxFor(ctx) {
  return ctx?.gfx || GFX;
}

function isReduced(ctx) {
  if (typeof ctx?.reducedMotion === 'boolean') return ctx.reducedMotion;
  const gfx = gfxFor(ctx);
  if (gfx?.reducedMotion) return true;
  return reducedMotion();
}

function canAddJuice(ctx) {
  const gfx = gfxFor(ctx);
  return !!gfx?.glowSprites && gfx.tier !== 'low';
}

function worldId(ctx) {
  return ctx?.currentWorld || ctx?.place?.theme || ctx?.worldId || 'hub';
}

function copyPos(pos) {
  if (!pos) return null;
  if (typeof pos.clone === 'function') return pos.clone();
  return new THREE.Vector3(pos.x || 0, pos.y || 0, pos.z || 0);
}

function disposeGlow(mesh) {
  if (!mesh) return;
  mesh.geometry?.dispose?.();
  const map = mesh.material?.map;
  if (map && !map._cached) map.dispose?.();
  mesh.material?.dispose?.();
}

function track(ctx, handle) {
  if (handle && Array.isArray(ctx?.fxHandles)) ctx.fxHandles.push(handle);
  return handle;
}

function later(ctx, ms, fn) {
  if (!fn) return null;
  if (isReduced(ctx) || ms <= 0) {
    return fn();
  }
  return track(ctx, delay(ms, fn));
}

function addHandles(handles, value) {
  if (!value) return;
  if (Array.isArray(value)) handles.push(...value.filter(Boolean));
  else handles.push(value);
}

function addGroundGlow(ctx, pos, { size = 1.2, peak = 0.35, ms = 620, delayMs = 0, stretchX = 1, stretchZ = 1 } = {}) {
  const place = ctx?.place;
  const p = copyPos(pos);
  if (!place?.group || !p || !canAddJuice(ctx)) return null;
  const wash = makeGlowPlane(themeAccent(worldId(ctx)), size, 0);
  wash.rotation.x = -Math.PI / 2;
  wash.scale.x *= stretchX;
  wash.scale.y *= stretchZ;
  wash.position.set(p.x, p.y + 0.045, p.z);
  place.group.add(wash);
  const dur = isReduced(ctx) ? Math.min(ms, 220) : ms;
  const tw = tween({
    ms: dur, delay: delayMs, ease: ease.outQuad,
    onUpdate: (_v, k) => {
      wash.material.opacity = Math.sin(Math.min(1, k) * Math.PI) * peak;
    },
    onDone: () => {
      place.group.remove(wash);
      disposeGlow(wash);
    },
  });
  return track(ctx, tw);
}

function emitParticles(ctx, pos, n, opts = {}) {
  const p = copyPos(pos);
  if (!p || !ctx?.particles || !canAddJuice(ctx)) return;
  ctx.particles.emit?.(p, n, opts);
}

function popMesh(ctx, mesh, { amount = 0.12, ms = 180 } = {}) {
  if (!mesh || isReduced(ctx)) return null;
  const base = mesh.scale.clone();
  return track(ctx, tween({
    ms, ease: ease.outQuad,
    onUpdate: (_v, k) => {
      const pop = Math.sin(k * Math.PI) * amount;
      mesh.scale.set(base.x * (1 + pop), base.y * (1 + pop * 0.65), base.z * (1 + pop));
    },
    onDone: () => mesh.scale.copy(base),
  }));
}

// Shared correct-answer spine: verb helpers pass their model-local glow/particles
// as callbacks, so every verb stages the win instead of bursting at once.
export function fxCorrectSequence(ctx, emitLocalGlow, emitReward) {
  const handles = [];
  addHandles(handles, later(ctx, 0, emitLocalGlow));
  addHandles(handles, later(ctx, 120, emitReward));
  return handles.filter(Boolean);
}

// Shared not-yet spine. The chamber flow already owns the helper line/scaffold; this
// gives verbs a common gentle nudge point without introducing a second event bus.
export function fxNotYetSequence(ctx, nudge, showScaffold) {
  const handles = [];
  if (nudge) nudge();
  addHandles(handles, later(ctx, 120, showScaffold));
  return handles.filter(Boolean);
}

// The shared "local glow" correct beat: a short theme-colored wash on the GROUND at
// the model (altar bowl / completed bed / chosen tick / baskets) — washes outward,
// never up the banner. Gated by GFX.glowSprites; brief + gentle under reduced motion.
export function fxCorrectGlow(place, pos, world) {
  if (!place?.group || !GFX.glowSprites || GFX.tier === 'low' || !pos) return;
  const wash = makeGlowPlane(themeAccent(world), 2.2, 0.0);
  wash.rotation.x = -Math.PI / 2;
  wash.position.set(pos.x, (pos.y ?? 0) + 0.06, pos.z);
  place.group.add(wash);
  const peak = reducedMotion() ? 0.35 : 0.5;
  tween({
    ms: reducedMotion() ? 240 : 700, ease: ease.outQuad,
    onUpdate: (v, k) => { wash.material.opacity = Math.sin(Math.min(1, k) * Math.PI) * peak; },
    onDone: () => {
      place.group.remove(wash);
      wash.geometry.dispose?.();
      if (!wash.material.map?._cached) wash.material.map?.dispose?.();
      wash.material.dispose?.();
    },
  });
}

export function fxFetchCorrect(ctx, { altarPos, stoneMesh } = {}) {
  const pos = copyPos(altarPos);
  if (!pos) return [];
  return fxCorrectSequence(ctx, () => {
    popMesh(ctx, stoneMesh, { amount: 0.08, ms: 160 });
    addGroundGlow(ctx, pos, { size: 2.2, peak: 0.45, ms: 700 });
  }, () => {
    emitParticles(ctx, pos.clone().add(new THREE.Vector3(0, 0.28, 0)), 12, {
      colors: [themeAccent(worldId(ctx)), GOLD, CREAM],
      speed: 1.0,
      up: 1.4,
      life: 720,
      spread: 0.18,
    });
  });
}

export function fxArrayGrowCell(ctx, { rect, row = 0, col = 0, count = 0 } = {}) {
  if (!rect || col !== 0) return [];
  const cols = rect.x1 - rect.x0 + 1;
  const x = rect.x0 + (cols - 1) / 2;
  const z = rect.z0 + row;
  const pos = ctx.place?.worldPos?.(x, z, 0.08);
  const handles = fxCorrectSequence(ctx, () => {
    addGroundGlow(ctx, pos, {
      size: 0.9,
      peak: 0.28,
      ms: 460,
      stretchX: Math.max(1, cols * 0.62),
      stretchZ: 0.42,
    });
  }, () => {
    if (count) {
      emitParticles(ctx, copyPos(pos)?.add(new THREE.Vector3(0, 0.22, 0)), 4, {
        colors: [themeAccent(worldId(ctx)), CREAM],
        speed: 0.45,
        up: 0.45,
        life: 420,
        spread: 0.2,
      });
    }
  });
  return handles;
}

export function fxNumberLinePulse(ctx, { x, z, kind = 'ready' } = {}) {
  const pos = ctx?.place?.worldPos?.(x, z, kind === 'correct' ? 0.2 : 0.12);
  if (!pos) return [];
  const color = KIND_COLOR[kind] || KIND_COLOR.ready;
  const handles = [];
  handles.push(addGroundGlow(ctx, pos, {
    size: kind === 'correct' ? 1.3 : 0.9,
    peak: kind === 'correct' ? 0.38 : 0.25,
    ms: kind === 'correct' ? 620 : 420,
  }));
  emitParticles(ctx, pos.clone().add(new THREE.Vector3(0, 0.22, 0)), kind === 'correct' ? 14 : 6, {
    colors: [color, 0xffffff],
    speed: kind === 'correct' ? 0.8 : 0.45,
    up: kind === 'correct' ? 1.1 : 0.55,
    life: kind === 'correct' ? 680 : 420,
    spread: 0.16,
  });
  return handles.filter(Boolean);
}

export function fxShareDeal(ctx, { basket, fair = false } = {}) {
  if (!basket?.mesh) return [];
  const handles = [];
  handles.push(popMesh(ctx, basket.mesh, { amount: fair ? 0.1 : 0.16, ms: fair ? 260 : 220 }));
  const pos = ctx?.place?.worldPos?.(basket.x, basket.z, fair ? 0.16 : 0.08);
  if (fair) {
    handles.push(addGroundGlow(ctx, pos, { size: 1.15, peak: 0.32, ms: 620 }));
    emitParticles(ctx, copyPos(pos)?.add(new THREE.Vector3(0, 0.28, 0)), 7, {
      colors: [themeAccent(worldId(ctx)), GOLD, 0xffffff],
      speed: 0.6,
      up: 0.75,
      life: 560,
      spread: 0.22,
    });
  }
  return handles.filter(Boolean);
}

// Light per-theme chamber ambience — deliberately BELOW hub density so it never
// competes with the math. Own Rng (never the chamber/problem stream); off at low and
// under reduced motion; scaled by GFX.ambientScale.
export function fxThemeAmbience(place, world) {
  if (GFX.tier === 'low' || !GFX.ambientScale || reducedMotion() || !place?.size) return;
  const rng = new Rng((0x0e7b ^ ((world ? world.length : 1) * 2654435761)) >>> 0);
  const color = world === 'vines' ? 0xc9a6ff
    : world === 'tide' ? 0x9bd6ff
      : world === 'stump' ? 0xffe9a8 : 0xfff3b8;
  const count = Math.max(2, Math.round(4 * GFX.ambientScale)); // ≪ hub
  const field = makeMoteField({
    count, color, size: 0.06,
    spread: Math.max(place.size.w, place.size.d) * 0.5, rise: 1.0,
    rand: () => rng.float(),
  });
  field.group.position.set(0, 0.3, 0); // board center
  place.group.add(field.group);
  let t = 0;
  place.addEntity({ update: (dt) => { t += dt / 1000; field.update(t); } });
}
