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
import { AMBIENT } from './models.js';
import { Rng } from './rng.js';

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
        if (!c || !c.walk || !'.,'.includes(c.ch)) continue;
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

export class AmbientLife {
  constructor(place, rng, { butterflies = 0, birds = 0, clouds = 0, playerPos = null } = {}) {
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
        if (c && c.walk && c.h === 0 && '.,'.includes(c.ch)) this.openCells.push({ x, z });
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
  }

  update(dtMs) {
    for (const c of this.clouds) c.update(dtMs);
    for (const b of this.butterflies) b.update(dtMs);
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
