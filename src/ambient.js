// Ambient life: butterflies and birds that make the island feel alive.
// Pure cosmetics — no gameplay, no collision, no walkability changes. All
// meshes live in place.group (disposed with the place) and all geometry is
// cached per color frame, so a whole flock costs a handful of draw calls.
//
// Determinism note: AmbientLife derives its OWN Rng stream from a single
// seed draw at construction. Critters keep rolling dice every frame, so they
// must never share the chamber rng with verbs/stones (duel fairness).
import * as THREE from 'three';
import { buildVoxelMesh, withPalette } from './voxel.js';
import { makeCharacter, makeMoteSprite } from './entities.js';
import { AMBIENT, getCreature } from './models.js';
import { Rng } from './rng.js';
import { FLOOR_CHARS } from './config.js';

// Per-type hard caps (high tier). Counts from the resolver are clamped to these
// AFTER GFX.ambientScale so no device can blow the additive-overdraw / draw-call
// budget. The existing actors keep their established caps elsewhere.
export const AMBIENT_CAPS = {
  fireflies: 32,
  bees: 8,
  motes: 24,
  water: [8, 5, 3], // ripples, bubbles, fish
};

const WING_COLORS = [
  { id: 'pink', W: '#ffb3c6' },
  { id: 'blue', W: '#9bd6ff' },
  { id: 'gold', W: '#ffd966' },
  { id: 'lilac', W: '#c9a6ff' },
];
const BIRD_COLORS = [
  { id: 'blue', B: '#7fb8e8', b: '#5e9ed0' },
  { id: 'rose', B: '#f4b8c4', b: '#dd93a6' },
  { id: 'gull', B: '#f4f3ee', b: '#cfd4dd' },
];

// A two-frame critter: group with both cached meshes, visibility toggled.
function makeFrames(modelA, modelB, palette, key, targetH) {
  const g = new THREE.Group();
  const opts = { castShadow: false };
  const a = buildVoxelMesh(withPalette(modelA, palette), { cacheKey: `amb:${key}:a`, ...opts });
  const b = buildVoxelMesh(withPalette(modelB, palette), { cacheKey: `amb:${key}:b`, ...opts });
  const s = targetH / Math.max(modelA.layers.length, modelB.layers.length);
  a.scale.setScalar(s);
  b.scale.setScalar(s);
  b.visible = false;
  g.add(a, b);
  g.userData.frames = [a, b];
  return g;
}

function setFrame(g, i) {
  g.userData.frames[0].visible = i === 0;
  g.userData.frames[1].visible = i === 1;
}

class Butterfly {
  constructor(place, rng, anchors) {
    this.place = place;
    this.rng = rng;
    this.anchors = anchors;
    const pal = rng.pick(WING_COLORS);
    this.mesh = makeFrames(
      AMBIENT.butterflyOpen, AMBIENT.butterflyClosed,
      { W: pal.W }, `butterfly:${pal.id}`, 0.22,
    );
    this.pos = this._spot();
    this.mesh.position.copy(this.pos);
    place.group.add(this.mesh);
    this.flapT = rng.float() * 200;
    this.frame = 0;
    this.bobT = rng.float() * 10;
    this.rest = 0;
    this.target = this._spot();
  }

  _spot() {
    const a = this.rng.pick(this.anchors);
    return new THREE.Vector3(
      a.x + (this.rng.float() - 0.5) * 1.6,
      0.35 + this.rng.float() * 0.8,
      a.z + (this.rng.float() - 0.5) * 1.6,
    );
  }

  update(dtMs) {
    // flap: quick in flight, lazy open/close while resting on a flower
    this.flapT += dtMs;
    const period = this.rest > 0 ? 600 : 110;
    if (this.flapT >= period) {
      this.flapT = 0;
      this.frame = 1 - this.frame;
      setFrame(this.mesh, this.frame);
    }
    if (this.rest > 0) {
      this.rest -= dtMs;
      return;
    }
    this.bobT += dtMs / 1000;
    const m = this.mesh;
    const dx = this.target.x - m.position.x;
    const dy = this.target.y - m.position.y;
    const dz = this.target.z - m.position.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 0.12) {
      if (this.rng.chance(0.35)) {
        this.rest = 800 + this.rng.float() * 2200; // sit on the flower a moment
        m.position.y = this.target.y;
      }
      this.target = this._spot();
      return;
    }
    const v = (0.55 + this.rng.float() * 0.1) * (dtMs / 1000);
    m.position.x += (dx / dist) * v;
    m.position.z += (dz / dist) * v;
    m.position.y += dy * Math.min(1, dtMs / 700) + Math.sin(this.bobT * 7) * 0.004;
    m.rotation.y = Math.atan2(dx, dz);
  }
}

// One bird = one life: fly in from off-board, maybe land + hop + peck,
// fly off again. The manager respawns a fresh one after a pause.
class Bird {
  constructor(place, rng, openCells, playerPos) {
    this.place = place;
    this.rng = rng;
    this.openCells = openCells;
    this.playerPos = playerPos;
    const pal = rng.pick(BIRD_COLORS);
    this.mesh = makeFrames(
      AMBIENT.birdSpread, AMBIENT.birdFold,
      { B: pal.B, b: pal.b }, `bird:${pal.id}`, 0.3,
    );
    place.group.add(this.mesh);
    this.flapT = 0;
    this.frame = 0;
    this.done = false;
    this.groundT = 0;
    this.hop = null;
    const wantsToLand = openCells.length > 0 && rng.chance(0.55);
    this._fly(this._edgePoint(), wantsToLand ? this._landingSpot() : this._edgePoint(), wantsToLand);
  }

  _edgePoint() {
    const { w, d } = this.place.size;
    const side = this.rng.int(0, 3);
    const rx = (this.rng.float() - 0.5) * w;
    const rz = (this.rng.float() - 0.5) * d;
    const x = side === 0 ? -w / 2 - 3 : side === 1 ? w / 2 + 3 : rx;
    const z = side === 2 ? -d / 2 - 3 : side === 3 ? d / 2 + 3 : rz;
    return new THREE.Vector3(x, 2.4 + this.rng.float() * 1.2, z);
  }

  _landingSpot() {
    const c = this.rng.pick(this.openCells);
    return this.place.worldPos(c.x, c.z, 0.04);
  }

  _fly(from, to, landing) {
    this.state = 'fly';
    this.landing = landing;
    this.from = from;
    this.to = to;
    // control point arcs the path up and over the island
    this.ctrl = new THREE.Vector3(
      (from.x + to.x) / 2 + (this.rng.float() - 0.5) * 4,
      Math.max(from.y, to.y) + 1.2 + this.rng.float() * 1.0,
      (from.z + to.z) / 2 + (this.rng.float() - 0.5) * 4,
    );
    const dist = from.distanceTo(this.ctrl) + this.ctrl.distanceTo(to);
    this.flyMs = (dist / 4.2) * 1000;
    this.t = 0;
    this.mesh.position.copy(from);
  }

  _takeOff() {
    this._fly(this.mesh.position.clone(), this._edgePoint(), false);
  }

  update(dtMs) {
    if (this.done) return;
    const m = this.mesh;
    this.flapT += dtMs;
    if (this.state === 'fly') {
      if (this.flapT >= 110) { this.flapT = 0; this.frame = 1 - this.frame; setFrame(m, this.frame); }
      this.t += dtMs / this.flyMs;
      const k = Math.min(1, this.t);
      const a = this.from, c = this.ctrl, b = this.to;
      const u = 1 - k;
      const px = u * u * a.x + 2 * u * k * c.x + k * k * b.x;
      const py = u * u * a.y + 2 * u * k * c.y + k * k * b.y;
      const pz = u * u * a.z + 2 * u * k * c.z + k * k * b.z;
      m.rotation.y = Math.atan2(px - m.position.x, pz - m.position.z);
      m.position.set(px, py, pz);
      if (k >= 1) {
        if (this.landing) {
          this.state = 'ground';
          this.groundT = 3500 + this.rng.float() * 5500;
          setFrame(m, 1); // wings folded on the ground
        } else {
          this.done = true;
          m.removeFromParent();
        }
      }
      return;
    }
    // grounded: peck, hop between nearby cells, flee from the player
    this.bobT = (this.bobT || 0) + dtMs / 1000;
    const p = this.playerPos?.();
    if (p && Math.hypot(p.x - m.position.x, p.z - m.position.z) < 2.1) {
      this._takeOff(); // startled!
      return;
    }
    if (this.hop) {
      this.hop.k += dtMs / 240;
      const k = Math.min(1, this.hop.k);
      m.position.lerpVectors(this.hop.from, this.hop.to, k);
      m.position.y = this.hop.from.y + (this.hop.to.y - this.hop.from.y) * k + Math.sin(k * Math.PI) * 0.22;
      if (k >= 1) this.hop = null;
      return;
    }
    m.rotation.x = Math.max(0, Math.sin(this.bobT * 3.2)) * 0.35; // pecking dip
    this.groundT -= dtMs;
    if (this.groundT <= 0) { m.rotation.x = 0; this._takeOff(); return; }
    if (this.rng.chance(dtMs / 1400)) {
      // hop to a random free neighbor cell (visual only — birds don't block)
      const gx = Math.round(m.position.x + this.place.size.w / 2 - 0.5);
      const gz = Math.round(m.position.z + this.place.size.d / 2 - 0.5);
      const dirs = this.rng.shuffle([[1, 0], [-1, 0], [0, 1], [0, -1]]);
      for (const [dx, dz] of dirs) {
        const c = this.place.cellAt(gx + dx, gz + dz);
        if (!c || !c.walk || !FLOOR_CHARS.has(c.ch)) continue;
        m.rotation.x = 0;
        m.rotation.y = Math.atan2(dx, dz);
        this.hop = { from: m.position.clone(), to: this.place.worldPos(gx + dx, gz + dz, 0.04), k: 0 };
        break;
      }
    }
  }
}

// A puffy cloud in the island's own blocky language: a few white boxes
// drifting slowly across the sky, wrapping around. Weather, not scenery —
// no shadows, no collision.
class Cloud {
  constructor(place, rng, mat) {
    this.place = place;
    const g = new THREE.Group();
    const puffs = 3 + rng.int(0, 1);
    for (let p = 0; p < puffs; p++) {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(
          1.6 + rng.float() * 1.6,
          0.5 + rng.float() * 0.35,
          0.9 + rng.float() * 0.7,
        ),
        mat,
      );
      m.position.set((p - (puffs - 1) / 2) * 1.1, (p % 2) * 0.3, rng.float() * 0.8 - 0.4);
      g.add(m);
    }
    g.scale.setScalar(0.8 + rng.float() * 0.7);
    const { w, d } = place.size;
    g.position.set((rng.float() - 0.5) * w, 5.5 + rng.float() * 2.2, (rng.float() - 0.5) * d);
    place.group.add(g);
    this.mesh = g;
    this.v = 0.25 + rng.float() * 0.3;
  }

  update(dtMs) {
    this.mesh.position.x += this.v * dtMs / 1000;
    if (this.mesh.position.x > this.place.size.w / 2 + 6) {
      this.mesh.position.x = -this.place.size.w / 2 - 6;
    }
  }
}

// A full-size pet ambling on the walkable floor — pure set-dressing in the same
// spirit as the birds: hops to a free floor neighbour, pauses, idle-bobs, and
// shies off the player's cell. Built from the creature's full-body mesh with
// shadows off to stay cheap. Never sets cell.walk=false (non-blocking cosmetic).
class WanderingPet {
  constructor(place, rng, openCells, playerPos, creatureId) {
    this.place = place;
    this.rng = rng;
    this.playerPos = playerPos;
    const creature = getCreature(creatureId);
    this.mesh = makeCharacter(creature.full, 0.5, null, 'creature:' + creature.id + ':f');
    this.mesh.traverse((o) => { if (o.isMesh) o.castShadow = false; });
    const start = openCells.length ? rng.pick(openCells) : { x: 0, z: 0 };
    this.cell = { x: start.x, z: start.z };
    this.mesh.position.copy(place.worldPos(start.x, start.z, 0.02));
    place.group.add(this.mesh);
    this.baseScale = this.mesh.scale.x;
    this.t = rng.float() * 5;
    this.wait = 900 + rng.float() * 2600;
    this.hop = null;
  }

  _playerCell() {
    const p = this.playerPos?.();
    if (!p) return null;
    return {
      x: Math.round(p.x + this.place.size.w / 2 - 0.5),
      z: Math.round(p.z + this.place.size.d / 2 - 0.5),
    };
  }

  update(dtMs) {
    const m = this.mesh;
    this.t += dtMs / 1000;
    if (this.hop) {
      this.hop.k += dtMs / 320;
      const k = Math.min(1, this.hop.k);
      m.position.lerpVectors(this.hop.from, this.hop.to, k);
      m.position.y = this.hop.from.y + Math.sin(k * Math.PI) * 0.16;
      if (k >= 1) { this.cell = this.hop.cell; this.hop = null; }
      return;
    }
    m.scale.set(this.baseScale, this.baseScale * (1 + Math.sin(this.t * 4) * 0.03), this.baseScale);
    this.wait -= dtMs;
    if (this.wait > 0) return;
    this.wait = 900 + this.rng.float() * 2600;
    const pc = this._playerCell();
    const dirs = this.rng.shuffle([[1, 0], [-1, 0], [0, 1], [0, -1]]);
    for (const [dx, dz] of dirs) {
      const nx = this.cell.x + dx, nz = this.cell.z + dz;
      if (pc && pc.x === nx && pc.z === nz) continue; // never hop onto the player
      const c = this.place.cellAt(nx, nz);
      if (!c || !c.walk || c.h !== 0 || !FLOOR_CHARS.has(c.ch)) continue;
      m.rotation.y = Math.atan2(dx, dz);
      this.hop = {
        from: m.position.clone(),
        to: this.place.worldPos(nx, nz, 0.02),
        k: 0,
        cell: { x: nx, z: nz },
      };
      break;
    }
  }
}

// A soft additive glow that drifts gently upward, twinkles, and resets low —
// fireflies near portals, pollen/magic motes in bloomed regions. Calm by design:
// slow rise, no darting. Mirrors the portal-mote loop in entities.js. The sprite's
// material is _owned (freed by place.dispose()).
class GlowMote {
  constructor(place, rng, anchor, { color = 0xfff3b8, size = 0.08, rise = 1.3 } = {}) {
    this.rng = rng;
    this.base = anchor;
    this.rise = rise;
    this.size = size;
    this.sprite = makeMoteSprite(color, size);
    this.phase = rng.float();
    this.speed = 0.05 + rng.float() * 0.06;
    this.sway = 0.4 + rng.float() * 0.6;
    this.ox = (rng.float() - 0.5) * 0.5;
    this.oz = (rng.float() - 0.5) * 0.5;
    this.t = rng.float() * 10;
    place.group.add(this.sprite);
  }

  update(dtMs) {
    this.t += dtMs / 1000;
    const k = (this.t * this.speed + this.phase) % 1;
    this.sprite.position.set(
      this.base.x + this.ox + Math.sin(this.t * this.sway + this.phase * 7) * 0.18,
      this.base.y + 0.1 + k * this.rise,
      this.base.z + this.oz,
    );
    this.sprite.material.opacity = Math.sin(k * Math.PI)
      * (0.32 + 0.4 * Math.sin(this.t * 4 + this.phase * 9) ** 2);
    const s = this.size * (0.85 + 0.25 * Math.sin(this.t * 3 + this.phase * 5));
    this.sprite.scale.set(s, s, 1);
  }
}

// A bee loops a flower/garden anchor with a quick wing-flap, pausing now and then,
// and drifts *slightly* away from the player — never a dramatic flee. Reuses the
// two-frame winged helper (gold wings) and cached geometry; casts no shadow.
class Bee {
  constructor(place, rng, anchors, playerPos) {
    this.place = place;
    this.rng = rng;
    this.anchors = anchors;
    this.playerPos = playerPos;
    this.mesh = makeFrames(AMBIENT.butterflyOpen, AMBIENT.butterflyClosed, { W: '#ffd45e' }, 'bee:gold', 0.16);
    this.mesh.position.copy(this._spot());
    place.group.add(this.mesh);
    this.flapT = 0;
    this.frame = 0;
    this.t = rng.float() * 5;
    this.rest = 0;
    this.target = this._spot();
  }

  _spot() {
    const a = this.rng.pick(this.anchors);
    return new THREE.Vector3(
      a.x + (this.rng.float() - 0.5) * 1.3,
      0.4 + this.rng.float() * 0.45,
      a.z + (this.rng.float() - 0.5) * 1.3,
    );
  }

  update(dtMs) {
    this.flapT += dtMs;
    if (this.flapT >= 70) { this.flapT = 0; this.frame = 1 - this.frame; setFrame(this.mesh, this.frame); }
    if (this.rest > 0) { this.rest -= dtMs; return; }
    const m = this.mesh;
    let dx = this.target.x - m.position.x;
    let dz = this.target.z - m.position.z;
    const dy = this.target.y - m.position.y;
    // gently veer away from the player (no dramatic flee)
    const p = this.playerPos?.();
    if (p) {
      const pdx = m.position.x - p.x, pdz = m.position.z - p.z;
      const pd = Math.hypot(pdx, pdz);
      if (pd < 1.6 && pd > 0.001) { dx += (pdx / pd) * 0.8; dz += (pdz / pd) * 0.8; }
    }
    const dist = Math.hypot(dx, dz);
    if (dist < 0.14) {
      if (this.rng.chance(0.3)) this.rest = 500 + this.rng.float() * 1400;
      this.target = this._spot();
      return;
    }
    const v = (0.7 + this.rng.float() * 0.15) * (dtMs / 1000);
    m.position.x += (dx / dist) * v;
    m.position.z += (dz / dist) * v;
    m.position.y += dy * Math.min(1, dtMs / 600);
    m.rotation.y = Math.atan2(dx, dz);
  }
}

// Pure spawn resolver for the NEW ambient actors (fireflies / bees / region motes).
// No GL, no RNG — unit-testable. Counts are clamped to AMBIENT_CAPS after the
// caller folds in GFX.ambientScale. The original butterflies/birds/clouds/pets are
// left to their existing call-site math so "Low = today" holds for them.
export function ambientExtras(ctx = {}) {
  const {
    mode = 'hub', avgPct = 0, garden = false, portalStages = 0, festival = false,
    tier = 'high', ambientScale = 1, reducedMotion = false,
  } = ctx;
  const cap = (n, hi) => Math.max(0, Math.min(hi, Math.round(n)));
  const s = Math.max(0, ambientScale);
  const waterStill = tier === 'low' || reducedMotion;
  const dry = [0, 0, 0];
  const wc = AMBIENT_CAPS.water;
  if (mode === 'chamber') {
    // very sparse — the puzzle owns the screen
    return {
      fireflies: cap(2 * s, AMBIENT_CAPS.fireflies),
      bees: (tier === 'low' || reducedMotion) ? 0 : cap(2 * s, AMBIENT_CAPS.bees),
      motes: cap(2 * s, AMBIENT_CAPS.motes),
      water: waterStill ? dry : [
        cap(1 * s, wc[0]),
        cap(1 * s, wc[1]),
        tier !== 'high' ? 0 : cap(0.6 * s, wc[2]),
      ],
    };
  }
  // hub / attract
  let bees = (tier === 'low') ? 0 : cap((garden ? 6 : 2) * s, AMBIENT_CAPS.bees);
  if (reducedMotion) bees = Math.min(bees, 2); // bees stay, but kept calm/few
  return {
    fireflies: cap((portalStages * 2 + (festival ? 10 : 0)) * s, AMBIENT_CAPS.fireflies),
    bees,
    motes: cap((avgPct * 10 + (festival ? 6 : 0)) * s, AMBIENT_CAPS.motes),
    water: waterStill ? dry : [
      cap((4 + avgPct * 4 + (festival ? 2 : 0)) * s, wc[0]),
      cap((2 + avgPct * 2) * s, wc[1]),
      cap((1 + (avgPct >= 0.5 ? 1 : 0) + (festival ? 1 : 0)) * s, wc[2]),
    ],
  };
}

export class AmbientLife {
  constructor(place, rng, {
    butterflies = 0, birds = 0, clouds = 0, pets = [], petCount = 0, playerPos = null,
    fireflies = 0, bees = 0, motes = 0, glowAnchors = null,
    water = null,
  } = {}) {
    this.place = place;
    this.rng = new Rng(rng.int(1, 1e9)); // own stream — never skews game rng
    this.playerPos = playerPos;
    this.clouds = [];
    if (clouds > 0) {
      const mat = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
      mat._owned = true; // place.dispose() frees it with the rest of the sky
      for (let i = 0; i < clouds; i++) this.clouds.push(new Cloud(place, this.rng, mat));
    }
    this.openCells = [];
    for (let z = 1; z < place.size.d - 1; z++) {
      for (let x = 1; x < place.size.w - 1; x++) {
        const c = place.cellAt(x, z);
        if (c && c.walk && c.h === 0 && FLOOR_CHARS.has(c.ch)) this.openCells.push({ x, z });
      }
    }
    // butterflies gather where the flowers are (deco spots), or anywhere open
    const spots = (place.markers.d || []).length ? place.markers.d : this.openCells;
    const anchors = spots.map((s) => place.worldPos(s.x, s.z));
    this.butterflies = [];
    if (anchors.length) {
      for (let i = 0; i < butterflies; i++) {
        this.butterflies.push(new Butterfly(place, this.rng, anchors));
      }
    }
    this.birds = [];
    this.birdTimers = [];
    for (let i = 0; i < birds; i++) {
      this.birds.push(null);
      this.birdTimers.push(i === 0 ? 600 : this.rng.float() * 9000);
    }
    // Wandering full-size pets, hard-capped at 4 for the draw-call budget.
    this.wanderers = [];
    const petCap = Math.min(petCount, 4, this.openCells.length);
    for (let i = 0; i < petCap && pets.length; i++) {
      this.wanderers.push(
        new WanderingPet(place, this.rng, this.openCells, this.playerPos, pets[i % pets.length]),
      );
    }
    // New glow/winged actors. Glow anchors are portal/build positions when
    // supplied, else the flower/deco anchors, else any open cell — region-scoped so
    // fireflies/motes cluster where they belong rather than hazing the whole screen.
    const glowSpots = (glowAnchors && glowAnchors.length)
      ? glowAnchors
      : (anchors.length ? anchors : this.openCells.map((c) => place.worldPos(c.x, c.z)));
    this.fireflies = [];
    for (let i = 0; i < fireflies && glowSpots.length; i++) {
      this.fireflies.push(new GlowMote(place, this.rng, this.rng.pick(glowSpots), { color: 0xfff3b8, size: 0.09, rise: 1.5 }));
    }
    this.motes = [];
    for (let i = 0; i < motes && glowSpots.length; i++) {
      this.motes.push(new GlowMote(place, this.rng, this.rng.pick(glowSpots), { color: 0xfff7d8, size: 0.05, rise: 1.0 }));
    }
    this.bees = [];
    for (let i = 0; i < bees && anchors.length; i++) {
      this.bees.push(new Bee(place, this.rng, anchors, this.playerPos));
    }
    const [waterRipples = 0, waterBubbles = 0, waterFish = 0] = water || [];
    this.waterMoments = (waterRipples || waterBubbles || waterFish)
      ? { r: waterRipples, b: waterBubbles, f: waterFish, rt: 0, bt: 350, ft: 700 }
      : null;
  }

  _waterAnchor() {
    const anchors = this.place.water?.lifeAnchors || [];
    return anchors.length ? this.rng.pick(anchors) : null;
  }

  _updateWater(dtMs) {
    const w = this.waterMoments;
    if (!w) return;
    const a = this._waterAnchor();
    if (!a) return;
    w.rt -= dtMs; w.bt -= dtMs; w.ft -= dtMs;
    if (w.r && w.rt <= 0) {
      this.place.water?.spawnShoreRipple?.(a);
      w.rt = (1900 + this.rng.float() * 3600) / Math.max(1, w.r);
    }
    if (w.b && w.bt <= 0) {
      this.place.water?.spawnBubble?.({
        ...a,
        x: a.x + (this.rng.float() - 0.5) * 0.22,
        z: a.z + (this.rng.float() - 0.5) * 0.22,
      });
      w.bt = (3200 + this.rng.float() * 5400) / Math.max(1, w.b);
    }
    if (w.f && w.ft <= 0) {
      this.place.water?.spawnFishShadow?.(a, {
        side: this.rng.chance(0.5) ? 1 : -1,
        speed: 0.32 + this.rng.float() * 0.24,
      });
      w.ft = (6200 + this.rng.float() * 9000) / Math.max(1, w.f);
    }
  }

  update(dtMs) {
    for (const c of this.clouds) c.update(dtMs);
    for (const b of this.butterflies) b.update(dtMs);
    for (const w of this.wanderers) w.update(dtMs);
    for (const f of this.fireflies) f.update(dtMs);
    for (const m of this.motes) m.update(dtMs);
    for (const b of this.bees) b.update(dtMs);
    this._updateWater(dtMs);
    for (let i = 0; i < this.birds.length; i++) {
      const bird = this.birds[i];
      if (bird && !bird.done) { bird.update(dtMs); continue; }
      this.birdTimers[i] -= dtMs;
      if (this.birdTimers[i] <= 0) {
        this.birds[i] = new Bird(this.place, this.rng, this.openCells, this.playerPos);
        this.birdTimers[i] = 5000 + this.rng.float() * 14000;
      }
    }
  }
}
