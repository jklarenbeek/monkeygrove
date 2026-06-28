// World reactivity — the "everything gently notices you" layer. A handful
// of tiny, additive, motion-gated helpers plus a shared landing reaction. Everything
// here is COSMETIC: it never touches cell.walk, scoring, the problem/duel RNG, or a
// tap target, and it never wilts/darkens/startles. Generalizes the one hand-coded
// reaction that already shipped (LivingPortal's greet) into reusable pieces that
// the math-chamber juice and audio layers also build on.
import * as THREE from 'three';
import { reducedMotion } from './a11y.js';
import { GFX } from './gfx.js';
import { makeGlowSprite } from './glow.js';

// Gentle continuous breathe of a material property. Collapses to a steady `base` under
// reduced motion so nothing flickers.
export function makePulse(target, { prop = 'opacity', base = 0.5, amp = 0.2, hz = 1 } = {}) {
  let t = 0;
  const baseY = target?.position?.y ?? 0;
  return {
    update(dtMs) {
      t += dtMs / 1000;
      const a = reducedMotion() ? 0 : amp;
      const v = base + a * (0.5 + 0.5 * Math.sin(t * hz * Math.PI * 2));
      if (prop === 'scale') target.scale?.setScalar?.(v);
      else if (prop === 'y') { if (target.position) target.position.y = baseY + (v - base); }
      else if (target.material) target.material.opacity = v;
      else target.opacity = v;
    },
  };
}

// Fire `cb` once per approach within `radius` (Manhattan), re-arming only past the
// radius + hysteresis — the portal's greet-guard, extracted. `cooldown` in seconds.
export function onPlayerNear(getPos, getSelf, radius, cb, cooldown = 6) {
  let armed = true;
  let cd = 0;
  return {
    update(dtMs) {
      cd = Math.max(0, cd - dtMs / 1000);
      const p = getPos?.();
      const s = getSelf?.();
      if (!p || !s) return;
      const d = Math.abs(p.x - s.x) + Math.abs(p.z - s.z);
      if (d <= radius && armed && cd <= 0) { armed = false; cd = cooldown; cb(); }
      else if (d >= radius + 2) armed = true;
    },
  };
}

// A cosmetic prop that springs away from a kick, then damps back to its stored base.
// Capped tiny so a tap target never visibly shifts. No-op kick under reduced motion.
export function makeReactiveProp(mesh, { stiffness = 14, damp = 0.8, maxOffset = 0.1 } = {}) {
  const base = mesh.position.clone();
  let ox = 0;
  let oz = 0;
  let vx = 0;
  let vz = 0;
  return {
    mesh,
    kick(dx, dz, strength = 0.6) {
      if (reducedMotion()) return;
      const d = Math.hypot(dx, dz) || 1;
      vx += (dx / d) * strength;
      vz += (dz / d) * strength;
    },
    update(dtMs) {
      const dt = Math.min(0.05, dtMs / 1000);
      vx += -stiffness * ox * dt;
      vz += -stiffness * oz * dt;
      vx *= damp;
      vz *= damp;
      ox = Math.max(-maxOffset, Math.min(maxOffset, ox + vx * dt));
      oz = Math.max(-maxOffset, Math.min(maxOffset, oz + vz * dt));
      mesh.position.set(base.x + ox, base.y, base.z + oz);
    },
  };
}

// Floor-typed landing puff colors (reuse the pooled Particles, no new system).
const PUFF_COLOR = { sand: 0xe4d0a8, soil: 0xb98a5e, grass: 0x8fd18a, vines: 0xc9a6ff };

// One-shot landing reaction: broadcast 'player-hop' and emit a tiny floor-appropriate
// puff. Suppressed entirely under reduced motion / low tier (GFX.ambientScale 0).
export function landingReaction(place, x, z, worldPos) {
  place.visualEvent?.('player-hop', { x, z, worldPos });
  // puff is a med/high touch; low stays today (event still broadcasts harmlessly).
  if (reducedMotion() || GFX.ambientScale <= 0.5 || !place.fx || !worldPos) return;
  const cell = place.cellAt?.(x, z);
  const theme = place.theme || 'hub';
  let color = PUFF_COLOR.grass;
  if (cell?.ch === 'o') color = PUFF_COLOR.soil;
  else if (theme === 'tide' || theme === 'stump') color = PUFF_COLOR.sand;
  else if (theme === 'vines') color = PUFF_COLOR.vines;
  const c = worldPos.clone();
  c.y += 0.05;
  place.fx.poof(c, Math.round(7 * GFX.ambientScale), color);
}

// A warm breathing glow that makes the egg nest feel alive. Med/high only.
export function attachNestGlow(place, nx, nz) {
  if (!GFX.toneMap) return;
  const glow = makeGlowSprite(0xffe9a8, 0.26, 0.25);
  glow.position.copy(place.worldPos(nx, nz)).add(new THREE.Vector3(0, 0.5, 0));
  place.group.add(glow);
  place.addReactor(makePulse(glow, { prop: 'opacity', base: 0.22, amp: 0.16, hz: 0.35 }));
}

// A small lived-in idle effect per build. Med/high only so low = today.
// Reuses the pooled Particles (smoke) and the glow language (warm pulse).
export function attachBuildIdle(place, def, spot) {
  if (!GFX.toneMap) return;
  const wp = place.worldPos(spot.x, spot.z);
  if (def.id === 'bakery') {
    let t = 0; // periodic chimney smoke puff
    place.addEntity({
      update: (dt) => {
        t += dt;
        if (t < 2600) return;
        t = 0;
        place.fx?.poof(new THREE.Vector3(wp.x, wp.y + 1.1, wp.z), 6, 0xe8e2d4);
      },
    });
  } else if (def.id === 'plaza' || def.id === 'stage' || def.id === 'lanterns') {
    const glow = makeGlowSprite(def.id === 'plaza' ? 0xffd966 : 0xffe9a8, def.id === 'plaza' ? 0.5 : 0.3, 0.3);
    glow.position.set(wp.x, wp.y + (def.id === 'plaza' ? 1.6 : 0.7), wp.z);
    place.group.add(glow);
    place.addReactor(makePulse(glow, { prop: 'opacity', base: 0.22, amp: 0.16, hz: 0.5 }));
  }
}
