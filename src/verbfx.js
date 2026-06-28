// Math-chamber juice (Phase 11) — the consistent glow + ambience layer the verbs and
// chamber flow add ON TOP of their existing, already-distinct effects (star birth,
// row sprouts, splash, basket wobble). The pedagogical bar is strict: nothing here
// hides a number, the equation banner, an answer zone, or the model; a not-yet answer
// gets a warm shimmer, never red/shake/punishment.
//
// HARD rule: this module NEVER imports mathengine.js — the math logic stays pure.
// All randomness forks its own Rng; all motion checks reducedMotion(); off at low.
import { GFX } from './gfx.js';
import { reducedMotion } from './a11y.js';
import { WORLD_THEME } from './config.js';
import { tween, ease } from './anim.js';
import { makeGlowPlane, makeMoteField } from './glow.js';
import { Rng } from './rng.js';

// Correct/idle colors come from the world theme — never hardcoded per verb.
export function themeAccent(world) {
  return (WORLD_THEME[world] || WORLD_THEME.hub).accent;
}

// The shared "local glow" correct beat: a short theme-colored wash on the GROUND at
// the model (altar bowl / completed bed / chosen tick / baskets) — washes outward,
// never up the banner. Gated by GFX.glowSprites; brief + gentle under reduced motion.
export function fxCorrectGlow(place, pos, world) {
  if (!GFX.glowSprites || !pos) return;
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
      wash.material.map?.dispose?.();
      wash.material.dispose?.();
    },
  });
}

// Light per-theme chamber ambience — deliberately BELOW hub density so it never
// competes with the math. Own Rng (never the chamber/problem stream); off at low and
// under reduced motion; scaled by GFX.ambientScale.
export function fxThemeAmbience(place, world) {
  if (!GFX.ambientScale || reducedMotion() || !place?.size) return;
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
