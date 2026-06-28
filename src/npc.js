// Build NPC routines (Phase 9) — moves life into the build "homes" Phase 3 dressed.
// A tiny transform-only state machine (idle bob → wander → work → wave) ticked through
// the existing place.entities path. Kind companions only: never blocks an interaction
// tile or the player's cell, never needy or scary, and tap-to-talk always wins.
//
// Tier (GFX.npcRoutines): 'limited' (low) = today's quiet bob in place, never wanders →
// Low is byte-identical. 'full' (med/high) = wander within a small home radius + face
// the build + greet the player. Motion damps under reducedMotion(). A dedicated forked
// Rng keeps cosmetic dice off the chamber/problem stream.
import { FLOOR_CHARS, MARKERS, OCCUPIED_MARKERS } from './config.js';
import { Rng } from './rng.js';
import { GFX } from './gfx.js';
import { reducedMotion } from './a11y.js';

// Pure steppability test (unit-tested): a cell an NPC may hop onto. Excludes anything
// off-floor, raised, occupied/interactable, outside the home radius, or the player's
// cell — so an NPC can never stand on a portal/shop/nest/plot/math tile.
export function npcSteppable(place, x, z, home, radius, playerCell) {
  if (Math.abs(x - home.x) + Math.abs(z - home.z) > radius) return false;
  if (playerCell && playerCell.x === x && playerCell.z === z) return false;
  const c = place.cellAt(x, z);
  if (!c || c.walk === false || c.h !== 0) return false;
  if (!(FLOOR_CHARS.has(c.ch) || c.ch === MARKERS.HELPER)) return false;
  if (OCCUPIED_MARKERS.has(c.ch)) return false;
  return true;
}

export class NpcRoutine {
  constructor(place, mesh, { home, anchor, playerAt, rng, tier = 'full', entry, radius = 1 } = {}) {
    this.place = place;
    this.mesh = mesh;
    this.home = home;
    this.anchor = anchor || home;
    this.playerAt = playerAt;
    this.rng = rng;
    this.tier = tier;
    this.entry = entry;       // the place.npcs row → kept in sync so tap-to-talk stays correct
    this.radius = radius;
    this.pos = { x: home.x, z: home.z };
    this.baseY = mesh.position.y;
    this.t = rng.float() * 6;
    this.wait = 2000 + rng.float() * 3000;
    this.hop = null;
  }

  _commit(nx, nz, dx, dz) {
    const cur = this.place.cellAt(this.pos.x, this.pos.z);
    if (cur) cur.walk = true;                 // free the cell we leave
    const c = this.place.cellAt(nx, nz);
    if (c) c.walk = false;                    // claim the cell we enter (taps stay valid)
    this.pos = { x: nx, z: nz };
    if (this.entry) { this.entry.x = nx; this.entry.z = nz; }
    this.mesh.rotation.y = Math.atan2(dx, dz);
    this.hop = { from: this.mesh.position.clone(), to: this.place.worldPos(nx, nz), k: 0 };
  }

  update(dt) {
    this.t += dt / 1000;
    // 'limited' tier = exactly today's _bob: bob in place, never wander.
    if (this.tier === 'limited') {
      this.mesh.position.y = this.baseY + Math.abs(Math.sin(this.t * 2)) * 0.04;
      return;
    }
    if (this.hop) {
      this.hop.k += dt / 300;
      const k = Math.min(1, this.hop.k);
      this.mesh.position.lerpVectors(this.hop.from, this.hop.to, k);
      this.mesh.position.y += Math.sin(k * Math.PI) * 0.22;
      if (k >= 1) this.hop = null;
      return;
    }
    const base = this.place.worldPos(this.pos.x, this.pos.z);
    this.mesh.position.y = base.y + Math.abs(Math.sin(this.t * 2)) * 0.04;
    // approach reaction: face the child and hold still while they're close, so
    // tap-to-talk owns the moment (the NPC never wanders out from under a tap).
    const p = this.playerAt?.();
    if (p && Math.abs(p.x - this.pos.x) + Math.abs(p.z - this.pos.z) <= 2) {
      const want = Math.atan2(p.x - this.pos.x, p.z - this.pos.z);
      this.mesh.rotation.y += (want - this.mesh.rotation.y) * Math.min(1, dt / 160);
      return;
    }
    this.wait -= dt;
    if (this.wait > 0) return;
    this.wait = (2200 + this.rng.float() * 3800) * (reducedMotion() ? 2 : 1);
    // sometimes just turn to tend the build ("work"); otherwise take one slow step.
    if (this.rng.chance(0.4)) {
      this.mesh.rotation.y = Math.atan2(this.anchor.x - this.pos.x, this.anchor.z - this.pos.z);
      return;
    }
    for (const [dx, dz] of this.rng.shuffle([[1, 0], [-1, 0], [0, 1], [0, -1]])) {
      const nx = this.pos.x + dx, nz = this.pos.z + dz;
      if (!npcSteppable(this.place, nx, nz, this.home, this.radius, p)) continue;
      this._commit(nx, nz, dx, dz);
      break;
    }
  }

  dispose() {
    const c = this.place.cellAt(this.pos.x, this.pos.z);
    if (c) c.walk = true; // release the cell we're parked on (idempotent)
  }
}

// Build + register an NPC routine for a freshly-placed build friend. Keeps chamber.js
// thin and within its line budget.
export function attachNpcRoutine(place, mesh, spot, entry, idx) {
  const rng = new Rng((777 ^ 0x9c0000) + idx);
  place.addEntity(new NpcRoutine(place, mesh, {
    home: { x: entry.x, z: entry.z }, anchor: spot,
    playerAt: () => place.playerAt?.(), rng, tier: GFX.npcRoutines, entry, radius: 1,
  }));
}
