// Grid-hop player controller + pet follower. Hops between cells with
// squash & stretch; supports BFS tap-to-walk; can carry a stone mesh.
import { STEP_H, HOP_MS, HOP_ARC } from './config.js';
import { tween, ease, squash } from './anim.js';
import { reducedMotion } from './a11y.js';
import { audio } from './audio.js';
import { GFX } from './gfx.js';
import { makeContactShadow } from './blobshadow.js';

const NO_SQUASH = { sy: 1, sxz: 1 };

// A ground-pinned contact shadow that tracks a hopping character on the X/Z plane
// but never inherits its hop arc or squash (it stays flat on the floor). Lives as a
// sibling in the place group, not a child of the bouncing mesh. Shared singleton
// geometry/material → nothing per-character to dispose (see blobshadow.js).
function ensureShadow(self, place, radius) {
  if (!GFX.contactShadows) return;
  if (!self.shadow) self.shadow = makeContactShadow({ radius });
  place.group.add(self.shadow); // reparents from any previous place
}

function trackShadow(self) {
  const s = self.shadow;
  if (!s || !self.place) return;
  const floorY = (self.place.cellAt(self.x, self.z)?.h ?? 0) * STEP_H;
  s.position.set(self.mesh.position.x, floorY + 0.02, self.mesh.position.z);
}

export class Player {
  constructor(mesh) {
    this.mesh = mesh;               // THREE.Group/Mesh, origin at feet
    this.x = 0; this.z = 0;
    this.place = null;
    this.hopping = false;
    this.queue = [];                // pending steps [{dx,dz}] or path cells [{x,z}]
    this.carrying = null;           // carried mesh (attached above head)
    this.carryData = null;          // game payload (e.g. stone choice)
    this.facing = 0;
    this.idleT = Math.random() * 10;
    this.locked = false;            // input lock (cutscenes/verbs)
    this.onArrive = null;           // (x, z) => void
    this.onBump = null;             // (x, z) => void — stepped into a blocked cell
    this.sfx = true;                // attract-mode demo walks silently
    this.headH = 1.0;               // world height of head top (set by main)
    this.baseScale = mesh.scale.x || 1;
  }

  setPlace(place, x, z) {
    this.place = place;
    this.x = x; this.z = z;
    this.queue.length = 0;
    this.hopping = false;
    const p = place.worldPos(x, z);
    this.mesh.position.copy(p);
    place.group.add(this.mesh);
    ensureShadow(this, place, 0.32);
    trackShadow(this);
  }

  get cell() { return this.place?.cellAt(this.x, this.z); }

  face(dx, dz) {
    if (dx === 0 && dz === 0) return;
    this.facing = Math.atan2(dx, dz);
  }

  tryStep(dx, dz) {
    if (this.locked) return false;
    if (this.hopping) {
      if (this.queue.length < 2) this.queue.push({ dx, dz });
      return true;
    }
    return this._step(dx, dz);
  }

  _step(dx, dz) {
    const nx = this.x + dx, nz = this.z + dz;
    const from = this.place.cellAt(this.x, this.z);
    const to = this.place.cellAt(nx, nz);
    this.face(dx, dz);
    if (!to || !to.walk || !this.place.canWalk(from, to)) {
      // bump animation
      this.hopping = true;
      const m = this.mesh;
      const sx = m.position.x, sz = m.position.z;
      tween({
        ms: 140, ease: ease.outQuad,
        onUpdate: (v, k) => {
          const off = Math.sin(k * Math.PI) * 0.18;
          m.position.x = sx + dx * off; m.position.z = sz + dz * off;
        },
        onDone: () => { this.hopping = false; this._next(); },
      });
      this.onBump?.(nx, nz);
      return false;
    }
    this.hopping = true;
    const m = this.mesh;
    const start = m.position.clone();
    const end = this.place.worldPos(nx, nz);
    if (this.sfx) audio.sfx('hop');
    tween({
      ms: HOP_MS, ease: ease.linear,
      onUpdate: (v, k) => {
        m.position.x = start.x + (end.x - start.x) * k;
        m.position.z = start.z + (end.z - start.z) * k;
        m.position.y = start.y + (end.y - start.y) * k + Math.sin(k * Math.PI) * HOP_ARC;
        const s = reducedMotion() ? NO_SQUASH : squash(k);
        m.scale.set(this.baseScale * s.sxz, this.baseScale * s.sy, this.baseScale * s.sxz);
        m.rotation.y += (this.facing - m.rotation.y) * 0.35;
      },
      onDone: () => {
        m.position.copy(end);
        m.scale.setScalar(this.baseScale);
        this.x = nx; this.z = nz;
        this.hopping = false;
        this.onArrive?.(nx, nz);
        this._next();
      },
    });
    return true;
  }

  _next() {
    if (this.locked) { this.queue.length = 0; return; }
    const n = this.queue.shift();
    if (!n) return;
    if (n.dx !== undefined) this._step(n.dx, n.dz);
    else {
      const dx = Math.sign(n.x - this.x), dz = Math.sign(n.z - this.z);
      if (dx || dz) this._step(dx, dz);
    }
  }

  // BFS path to target cell; walks as far as reachable.
  pathTo(tx, tz) {
    if (this.locked || !this.place) return;
    const { w, d } = this.place.size;
    const inb = (x, z) => x >= 0 && z >= 0 && x < w && z < d;
    const idx = (x, z) => z * w + x;
    const prev = new Int32Array(w * d).fill(-2);
    const q = [[this.x, this.z]];
    prev[idx(this.x, this.z)] = -1;
    let found = false;
    while (q.length && !found) {
      const [cx, cz] = q.shift();
      const fromCell = this.place.cellAt(cx, cz);
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = cx + dx, nz = cz + dz;
        if (!inb(nx, nz) || prev[idx(nx, nz)] !== -2) continue;
        const c = this.place.cellAt(nx, nz);
        if (!c || !c.walk || !this.place.canWalk(fromCell, c)) { prev[idx(nx, nz)] = -3; continue; }
        prev[idx(nx, nz)] = idx(cx, cz);
        if (nx === tx && nz === tz) { found = true; break; }
        q.push([nx, nz]);
      }
    }
    if (!found) return false;
    const path = [];
    let cur = idx(tx, tz);
    while (cur !== -1 && prev[cur] !== -1) {
      path.unshift({ x: cur % w, z: Math.floor(cur / w) });
      cur = prev[cur];
    }
    this.queue = path.map((p) => ({ x: p.x, z: p.z }));
    if (!this.hopping) this._next();
    return true;
  }

  stop() { this.queue.length = 0; }

  carry(mesh, data) {
    this.carrying = mesh;
    this.carryData = data;
    this.mesh.add(mesh);
    mesh.position.set(0, this.headH + 0.18, 0);
    mesh.rotation.set(0, 0, 0);
    // bob handled in update
  }

  dropCarry() {
    const m = this.carrying;
    if (m) this.mesh.remove(m);
    this.carrying = null;
    const d = this.carryData;
    this.carryData = null;
    return { mesh: m, data: d };
  }

  update(dtMs) {
    this.idleT += dtMs / 1000;
    const m = this.mesh;
    if (!this.hopping) {
      // gentle idle breathing
      const b = 1 + Math.sin(this.idleT * 3.1) * 0.015;
      m.scale.set(this.baseScale, this.baseScale * b, this.baseScale);
      m.rotation.y += (this.facing - m.rotation.y) * Math.min(1, dtMs / 90);
    }
    trackShadow(this); // flat on the ground, never riding the hop arc
    if (this.carrying) {
      this.carrying.position.y = this.headH + 0.18 + Math.sin(this.idleT * 4) * 0.035;
      this.carrying.rotation.y += dtMs * 0.001;
    }
  }
}

// A pet hops along the player's breadcrumb trail, two steps behind.
export class PetFollower {
  constructor(mesh) {
    this.mesh = mesh;
    this.trail = [];
    this.x = 0; this.z = 0;
    this.hopping = false;
    this.place = null;
    this.idleT = Math.random() * 10;
    this.baseScale = mesh.scale.x || 1;
    this.happy = 0; // >0 → does a flip
  }

  setPlace(place, x, z) {
    this.place = place;
    this.x = x; this.z = z;
    this.trail.length = 0;
    this.mesh.position.copy(place.worldPos(x, z));
    place.group.add(this.mesh);
    ensureShadow(this, place, 0.22);
    trackShadow(this);
  }

  notePlayerAt(x, z) {
    const last = this.trail[this.trail.length - 1];
    if (last && last.x === x && last.z === z) return;
    this.trail.push({ x, z });
    if (this.trail.length > 6) this.trail.shift();
  }

  celebrate() { this.happy = 1; }

  update(dtMs) {
    this.idleT += dtMs / 1000;
    const m = this.mesh;
    if (this.happy > 0) {
      this.happy -= dtMs / 600;
      m.rotation.x = (1 - Math.max(0, this.happy)) * Math.PI * 2;
      if (this.happy <= 0) m.rotation.x = 0;
    }
    if (!this.hopping && this.trail.length > 2 && this.place) {
      const next = this.trail.shift();
      const dx = next.x - this.x, dz = next.z - this.z;
      if (dx || dz) {
        this.hopping = true;
        const start = m.position.clone();
        const end = this.place.worldPos(next.x, next.z);
        const face = Math.atan2(dx, dz);
        tween({
          ms: HOP_MS * 1.05, ease: ease.linear,
          onUpdate: (v, k) => {
            m.position.lerpVectors(start, end, k);
            m.position.y = start.y + (end.y - start.y) * k + Math.sin(k * Math.PI) * HOP_ARC * 0.7;
            m.rotation.y += (face - m.rotation.y) * 0.3;
            const s = reducedMotion() ? NO_SQUASH : squash(k);
            m.scale.set(this.baseScale * s.sxz, this.baseScale * s.sy, this.baseScale * s.sxz);
          },
          onDone: () => {
            m.position.copy(end);
            m.scale.setScalar(this.baseScale);
            this.x = next.x; this.z = next.z;
            this.hopping = false;
          },
        });
      }
    } else if (!this.hopping) {
      m.scale.set(this.baseScale, this.baseScale * (1 + Math.sin(this.idleT * 4.2) * 0.03), this.baseScale);
    }
    trackShadow(this); // flat on the ground, never riding the hop arc
  }
}
