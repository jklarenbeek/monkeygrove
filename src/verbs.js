// Math verbs: the four ways a problem is SOLVED inside the world.
// Each verb owns its scene objects, handles input routed from the game,
// and calls ctx.resolve(correct, info) exactly once per attempt.
//
// ctx: { world, place, player, particles, altar, hud, problem, rng,
//        resolve(correct, {tag, value}), hintUsed() }
import * as THREE from 'three';
import { tween, ease, delay } from './anim.js';
import { audio } from './audio.js';
import {
  NumberStone, Pot, makeProp, makeTextSprite, floatLabel,
} from './entities.js';
import { PROPS } from './models.js';
import { PALETTE, OCCUPIED_MARKERS } from './config.js';
import { t } from './i18n.js';

// ---------- shared: paint a visual model onto the chamber floor ----------

export class FloorModel {
  constructor(place) {
    this.place = place;
    this.painted = [];   // [{x,z}]
    this.labels = [];    // sprites
    this.pending = [];   // scheduled paint steps — cancelled on clear
  }

  _later(ms, fn) { this.pending.push(delay(ms, fn)); }

  clear() {
    for (const d of this.pending) d.cancel();
    this.pending = [];
    for (const p of this.painted) this.place.resetCellTint(p.x, p.z);
    for (const l of this.labels) this.place.group.remove(l);
    this.painted = [];
    this.labels = [];
  }

  _free(x, z) {
    const c = this.place.cellAt(x, z);
    return c && c.walk && c.h === 0 && !OCCUPIED_MARKERS.has(c.ch);
  }

  _findRect(rw, rd) {
    const { w, d } = this.place.size;
    const cx = Math.floor(w / 2), cz = Math.floor(d / 2);
    // spiral out from center looking for a clear rw×rd patch
    for (let r = 0; r < Math.max(w, d); r++) {
      for (let z0 = Math.max(1, cz - r); z0 <= Math.min(d - rd - 1, cz + r); z0++) {
        for (let x0 = Math.max(1, cx - r); x0 <= Math.min(w - rw - 1, cx + r); x0++) {
          let ok = true;
          for (let z = z0; z < z0 + rd && ok; z++) {
            for (let x = x0; x < x0 + rw && ok; x++) if (!this._free(x, z)) ok = false;
          }
          if (ok) return { x0, z0 };
        }
      }
    }
    return null;
  }

  addLabel(x, z, text, color = '#2c6e49', lift = 0.55) {
    const sp = makeTextSprite(text, { bg: '#ffffffee', color, scale: 0.55 });
    const p = this.place.worldPos(x, z, lift);
    sp.position.copy(p);
    this.place.group.add(sp);
    this.labels.push(sp);
  }

  // model: {kind, params} from the problem. Paints + animates, auto-clears later.
  show(model, { skipCounts = true } = {}) {
    this.clear();
    if (!model || model.kind === 'none') return false;
    if (model.kind === 'array') {
      let { rows, cols } = model.params;
      let spot = this._findRect(cols, rows);
      if (!spot) {
        // try the transposed orientation (commutativity is a feature here)
        spot = this._findRect(rows, cols);
        if (!spot) return false;
        const r0 = rows; rows = cols; cols = r0;
      }
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = spot.x0 + c, z = spot.z0 + r;
          this.painted.push({ x, z });
          this._later(i * 28, () => {
            this.place.tintCell(x, z, r % 2 ? 0xaef0b2 : 0x8fe39a);
            if (c === cols - 1) audio.sfx('plant', { pitch: 1 + r * 0.06 });
          });
          i++;
        }
        if (skipCounts) {
          const count = (r + 1) * cols;
          this._later(r * cols * 28 + 150, () => this.addLabel(spot.x0 + cols, spot.z0 + r, String(count)));
        }
      }
      return true;
    }
    if (model.kind === 'baskets') {
      const { total, baskets, quotient, remainder } = model.params;
      const spot = this._findRect(baskets * 2 - 1, 2);
      if (!spot) return false;
      for (let b = 0; b < baskets; b++) {
        const x = spot.x0 + b * 2, z = spot.z0;
        this.painted.push({ x, z });
        this._later(b * 90, () => {
          this.place.tintCell(x, z, 0xf7d8a0);
          this.addLabel(x, z, String(quotient), '#b06a2c');
          audio.sfx('coin', { pitch: 1 + b * 0.05 });
        });
      }
      if (remainder > 0) {
        const x = spot.x0 + Math.floor(baskets), z = spot.z0 + 1;
        this.painted.push({ x, z });
        this._later(baskets * 90 + 120, () => {
          this.place.tintCell(x, z, 0xf7b8cf);
          this.addLabel(x, z, '+' + remainder, '#c2497a');
        });
      }
      return true;
    }
    if (model.kind === 'numberline') {
      // strip of 11 cells, mark the fraction position
      const W = 11;
      const { n, d } = model.params;
      const spot = this._findRect(W, 1);
      if (!spot) return false;
      for (let i = 0; i < W; i++) {
        const x = spot.x0 + i, z = spot.z0;
        this.painted.push({ x, z });
        this._later(i * 35, () => this.place.tintCell(x, z, 0xcfe6ff));
      }
      this.addLabel(spot.x0, spot.z0, '0', '#4a6a8a');
      this.addLabel(spot.x0 + W - 1, spot.z0, '1', '#4a6a8a');
      const pos = spot.x0 + Math.round((n / d) * (W - 1));
      this._later(W * 35 + 150, () => {
        this.place.tintCell(pos, spot.z0, 0xffd966);
        this.addLabel(pos, spot.z0, `${n}/${d}`, '#b06a2c', 0.8);
        audio.sfx('sparkle');
      });
      return true;
    }
    if (model.kind === 'strip') {
      // addition/subtraction strip: a cells + b cells
      const { a, b, op } = model.params;
      const W = Math.min(a + Math.abs(b), 12);
      const spot = this._findRect(Math.min(a, 12), 2);
      if (!spot) return false;
      const paint = (count, z, color, off = 0) => {
        for (let i = 0; i < count && i + off < 12; i++) {
          const x = spot.x0 + off + i;
          this.painted.push({ x, z });
          this._later(i * 30, () => this.place.tintCell(x, z, color));
        }
      };
      paint(Math.min(a, 12), spot.z0, 0x9bd6ff);
      this.addLabel(spot.x0, spot.z0 - 1 >= 0 ? spot.z0 : spot.z0, String(a), '#4a6a8a');
      if (op === '+') {
        paint(Math.min(b, 12), spot.z0 + 1, 0xaef0b2);
        this.addLabel(spot.x0, spot.z0 + 1, '+' + b, '#2c6e49');
      } else {
        paint(Math.min(b, 12), spot.z0 + 1, 0xffc2b3);
        this.addLabel(spot.x0, spot.z0 + 1, '−' + b, '#c2497a');
      }
      return true;
    }
    return false;
  }
}

// ---------- base ----------

class VerbBase {
  constructor(ctx) {
    this.ctx = ctx;
    this.model = new FloorModel(ctx.place);
    this.done = false;
  }
  begin() {}
  onCellTap() { return false; }
  onArrive() {}
  onBump() {}
  onAction() {}
  onKey() { return false; }
  showModel() { return this.model.show(this.ctx.problem.model); }
  update() {}
  destroy() { this.model.clear(); }
}

// ---------- FETCH: find the stone, carry it to the altar ----------

export class FetchVerb extends VerbBase {
  begin() {
    const { place, problem, rng } = this.ctx;
    this.stones = [];
    this.pots = [];
    const sSpots = rng.shuffle(place.markers.s || []);
    const pSpots = rng.shuffle(place.markers.p || []);
    const spots = [...sSpots.map((s) => ({ ...s, pot: false })), ...pSpots.map((s) => ({ ...s, pot: true }))];
    // one spot per choice, pedestals before pots — and the correct answer is
    // pinned to a pedestal, so it is always in plain sight, never buried in a
    // pot. If a layout has fewer spots than choices, distractors are dropped,
    // never the answer.
    const shuffled = rng.shuffle(problem.choices);
    const correctIdx = shuffled.findIndex((c) => c.tag === 'correct');
    shuffled.unshift(shuffled.splice(correctIdx, 1)[0]);
    const choices = shuffled.slice(0, spots.length);
    choices.forEach((choice, i) => {
      const spot = spots[i];
      if (spot.pot) {
        this.pots.push(new Pot(place, spot.x, spot.z, { kind: 'stone', choice }));
      } else {
        this.stones.push(new NumberStone(place, spot.x, spot.z, choice));
      }
    });
    // leftover pots hide treats
    for (let i = choices.length; i < spots.length; i++) {
      const spot = spots[i];
      if (!spot.pot) continue;
      const treat = rng.chance(0.4) ? { kind: 'berry' } : { kind: 'bananas', n: rng.int(1, 3) };
      this.pots.push(new Pot(place, spot.x, spot.z, treat));
    }
    this.ctx.hud.setAction(null);
  }

  _stoneAt(x, z) { return this.stones.find((s) => !s.taken && s.x === x && s.z === z); }
  _potAt(x, z) { return this.pots.find((p) => !p.smashed && p.x === x && p.z === z); }

  onArrive(x, z) {
    const { player, place, particles } = this.ctx;
    const pot = this._potAt(x, z);
    if (pot) {
      this.pendingDeliver = null;
      const contents = pot.smash(particles);
      if (contents?.kind === 'stone') {
        this.stones.push(new NumberStone(place, x, z, contents.choice));
      } else if (contents?.kind === 'bananas') {
        this.ctx.onTreat?.('bananas', contents.n, place.worldPos(x, z, 0.4));
      } else if (contents?.kind === 'berry') {
        this.ctx.onTreat?.('berry', 1, place.worldPos(x, z, 0.4));
      }
      return;
    }
    const stone = this._stoneAt(x, z);
    if (stone) {
      // picking up (or swapping) en route cancels a tap-ordered offering —
      // the number in hand changed, so the child decides again
      this.pendingDeliver = null;
      audio.sfx('pick');
      const mesh = stone.pickUpMesh();
      if (player.carrying) {
        // changed your mind? swap — the stone in hand takes this pedestal
        const { mesh: held, data } = player.dropCarry();
        held.removeFromParent();
        this.stones.push(new NumberStone(place, x, z, data));
      }
      player.carry(mesh, stone.choice);
      this.ctx.onCarry?.(true);
      this.ctx.hud.setAction('⬇️');
      return;
    }
    // tap-to-deliver: the child tapped the altar, we walked to the open cell
    // beside it — arriving there makes the offering
    if (this.pendingDeliver && player.queue.length === 0) {
      const target = this.pendingDeliver;
      this.pendingDeliver = null;
      const aSpot = (place.markers.A || [])[0];
      if (aSpot && target.x === x && target.z === z && player.carrying) this._offer(aSpot);
    }
  }

  // Walking INTO the altar (it is solid now) makes the offering — the stone
  // arcs from the monkey's head into the bowl while the monkey stays put.
  onBump(x, z) {
    const { player, place, particles } = this.ctx;
    const aSpot = (place.markers.A || [])[0];
    if (!aSpot || x !== aSpot.x || z !== aSpot.z) return;
    if (player.carrying) { this._offer(aSpot); return; }
    // empty-handed bump: a gentle sparkle nudge, never a scold
    if (this.done || this.fxStone) return;
    const now = performance.now();
    if (now < (this.nudgeT || 0)) return; // held arrow keys re-bump
    this.nudgeT = now + 2600;
    particles.emit(place.worldPos(aSpot.x, aSpot.z, 1.0), 8,
      { colors: [0xffd966, 0xfff3bf], speed: 0.6, up: 0.6, life: 600, spread: 0.25 });
    this.ctx.hud.say(t('play.altar_wants'), { transient: true, ms: 2400, face: '✨' });
  }

  onAction() {
    // put the stone back down on the tile you stand on
    const { player, place } = this.ctx;
    if (!player.carrying) return;
    const { x, z } = player;
    if (this._stoneAt(x, z) || this._potAt(x, z)) return;    // tile already occupied
    this.pendingDeliver = null;
    audio.sfx('place');
    const { mesh, data } = player.dropCarry();
    mesh.removeFromParent();
    this.stones.push(new NumberStone(place, x, z, data));
    this.ctx.onCarry?.(false);
    this.ctx.hud.setAction(null);
  }

  onCellTap(x, z) {
    // tapping a stone or pot walks there (handled by game pathing). Tapping
    // the altar while carrying walks beside it and offers — the touch-screen
    // twin of bumping into it.
    const { player, place } = this.ctx;
    const aSpot = (place.markers.A || [])[0];
    if (!aSpot || x !== aSpot.x || z !== aSpot.z) return false;
    if (!player.carrying) { this.onBump(x, z); return true; }
    if (Math.abs(player.x - aSpot.x) + Math.abs(player.z - aSpot.z) === 1) {
      this._offer(aSpot);
      return true;
    }
    const open = [[0, 1], [1, 0], [-1, 0], [0, -1]]
      .map(([dx, dz]) => ({ x: aSpot.x + dx, z: aSpot.z + dz }))
      .filter((n) => place.cellAt(n.x, n.z)?.walk)
      .sort((a, b) => (Math.abs(a.x - player.x) + Math.abs(a.z - player.z))
        - (Math.abs(b.x - player.x) + Math.abs(b.z - player.z)));
    for (const n of open) {
      if (player.pathTo(n.x, n.z)) { this.pendingDeliver = n; return true; }
    }
    return true; // altar walled in (nearly impossible): swallow the tap
  }

  _offer(aSpot) {
    const { player } = this.ctx;
    player.face(aSpot.x - player.x, aSpot.z - player.z);
    const { mesh, data } = player.dropCarry();
    this.ctx.onCarry?.(false);
    this.ctx.hud.setAction(null);
    this._deliver(mesh, data, aSpot);
  }

  // The offering is a SCENE, not a transaction: the stone visibly arcs into
  // the altar bowl while the monkey watches from beside it — then the altar
  // answers, loudly when it's right, kindly when it's not.
  _deliver(mesh, choice, aSpot) {
    if (this.done) return;
    const { place, player } = this.ctx;
    // re-parent the carried stone into the world, starting at the head
    mesh.position.copy(player.mesh.position).add(new THREE.Vector3(0, player.headH + 0.18, 0));
    place.group.add(mesh);
    this.fxStone = mesh;
    const from = mesh.position.clone();
    const to = place.worldPos(aSpot.x, aSpot.z, 0.92);
    tween({
      ms: 360, ease: ease.linear,
      onUpdate: (v, k) => {
        mesh.position.lerpVectors(from, to, k);
        mesh.position.y += Math.sin(k * Math.PI) * 0.55;
      },
      onDone: () => {
        audio.sfx('place');
        if (!this.dead) this._evaluate(choice, mesh, aSpot);
      },
    });
  }

  // Nearest free walkable cell around a spot (skips stones, pots, the player).
  _freeNeighbor(spot) {
    const { place, player } = this.ctx;
    for (const [dx, dz] of [[0, 1], [1, 0], [-1, 0], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
      const x = spot.x + dx, z = spot.z + dz;
      const c = place.cellAt(x, z);
      if (!c || !c.walk) continue;
      if (this._stoneAt(x, z) || this._potAt(x, z)) continue;
      if (player.x === x && player.z === z) continue;
      return { x, z };
    }
    return null;
  }

  _evaluate(choice, mesh, aSpot) {
    if (this.done) return;
    const { problem, place } = this.ctx;
    const apos = place.worldPos(aSpot.x, aSpot.z, 0.92);
    const correct = String(choice.value) === String(problem.answer);
    if (correct) {
      this.done = true;
      this.ctx.resolve(true, { tag: 'correct', value: choice.value });
      this._starBurst(mesh, apos);
    } else {
      this.ctx.resolve(false, { tag: choice.tag, value: choice.value });
      this._handBack(mesh, choice, aSpot, apos);
    }
  }

  // Mario-star moment: the altar bounces, drinks the number, and a golden
  // star is born from it — rising, spinning, bursting. Success a kid can
  // SEE from across the room.
  _starBurst(mesh, apos) {
    const { place, particles } = this.ctx;
    this.ctx.altar?.cheer();
    particles.confetti(apos.clone().add(new THREE.Vector3(0, 0.3, 0)), 34);
    // the stone melts down into the altar as the star is born from it
    tween({
      ms: 420, delay: 140, ease: ease.inQuad,
      onUpdate: (v, k) => {
        mesh.scale.setScalar(Math.max(0.001, 1 - k));
        mesh.position.y = apos.y - k * 0.3;
      },
      onDone: () => { mesh.removeFromParent(); this.fxStone = null; },
    });
    const star = makeTextSprite('⭐', { scale: 1.5 });
    star.position.copy(apos);
    place.group.add(star);
    this.fxStar = star;
    const bs = star.scale.clone();
    star.scale.copy(bs).multiplyScalar(0.3);
    audio.sfx('bloom');
    const sway = (Math.random() - 0.5) * 0.5;
    let trail = -1;
    tween({
      ms: 950, ease: ease.outQuad,
      onUpdate: (v, k) => {
        star.position.y = apos.y + 0.15 + k * 1.7;
        star.position.x = apos.x + Math.sin(k * Math.PI * 2) * 0.12 + sway * k;
        star.material.rotation = Math.sin(k * Math.PI * 3) * 0.45;
        star.scale.copy(bs).multiplyScalar(0.3 + Math.min(1, k * 2.5) * 0.7);
        const step = (k * 8) | 0;   // sparkle trail as it climbs
        if (step !== trail) {
          trail = step;
          particles.emit(star.position.clone(), 2,
            { colors: [0xffd966, 0xfff3bf], speed: 0.4, up: 0.2, life: 480, spread: 0.12 });
        }
      },
      onDone: () => {
        particles.confetti(star.position.clone(), 26);
        audio.sfx('sparkle');
        tween({
          ms: 280, ease: ease.outQuad,
          onUpdate: (v, k) => {
            star.scale.copy(bs).multiplyScalar(1 + k * 0.9);
            star.material.opacity = 1 - k;
          },
          onDone: () => { star.removeFromParent(); this.fxStar = null; },
        });
      },
    });
  }

  // Not a buzzer, a kindness: the altar thinks it over (🤔), shakes a gentle
  // no, and hands the stone back — nothing is lost, nothing punished; the
  // helper explains why while the right stone waits out there.
  _handBack(mesh, choice, aSpot, apos) {
    const { place, particles } = this.ctx;
    this.ctx.altar?.shake();
    particles.poof(apos.clone().add(new THREE.Vector3(0, 0.35, 0)), 10, 0xd9cdb8);
    const think = makeTextSprite('🤔', { scale: 0.8 });
    think.position.copy(apos).add(new THREE.Vector3(0, 0.85, 0));
    place.group.add(think);
    this.fxThink = think;
    tween({
      ms: 1150, ease: ease.outQuad,
      onUpdate: (v, k) => {
        think.position.y = apos.y + 0.85 + k * 0.5;
        think.material.opacity = k < 0.6 ? 1 : 1 - (k - 0.6) / 0.4;
      },
      onDone: () => { think.removeFromParent(); this.fxThink = null; },
    });
    const spot = this._freeNeighbor(aSpot);
    if (!spot) { // boxed in (nearly impossible): crumble softly like before
      particles.poof(apos, 18, 0xcfc8bb);
      mesh.removeFromParent();
      this.fxStone = null;
      return;
    }
    const from = mesh.position.clone();
    const to = place.worldPos(spot.x, spot.z);
    tween({
      ms: 460, delay: 430, ease: ease.linear,
      onUpdate: (v, k) => {
        mesh.position.lerpVectors(from, to, k);
        mesh.position.y += Math.sin(k * Math.PI) * 0.7;
      },
      onDone: () => {
        audio.sfx('drop');
        mesh.removeFromParent();
        this.fxStone = null;
        if (!this.dead) {
          this.stones.push(new NumberStone(place, spot.x, spot.z, choice, { tried: true }));
        }
      },
    });
  }

  update(dtMs) {
    for (const s of this.stones) s.update(dtMs);
  }

  destroy() {
    this.dead = true; // in-flight ceremony tweens check this before resolving
    super.destroy();
    for (const s of this.stones) if (!s.taken) s.remove();
    for (const m of [this.fxStone, this.fxStar, this.fxThink]) m?.removeFromParent();
    const { player } = this.ctx;
    if (player.carrying) { const { mesh } = player.dropCarry(); mesh?.removeFromParent(); }
  }
}

// ---------- ARRAY: walk the bed — plant a corner flag, stretch, grow ----------
// The monkey does the work: stand on the soil and press 🌱 to plant a corner
// flag, then walk — the bed stretches between the flag and the monkey. Press
// 🌱 again to plant the bed; press it back on the flag to take the flag back.

export class ArrayVerb extends VerbBase {
  begin() {
    const { place, hud } = this.ctx;
    const soil = place.markers.o || [];
    this.minX = Math.min(...soil.map((s) => s.x));
    this.minZ = Math.min(...soil.map((s) => s.z));
    this.maxX = Math.max(...soil.map((s) => s.x));
    this.maxZ = Math.max(...soil.map((s) => s.z));
    this.anchor = null;   // planted corner; until then it is all just soil
    this.flag = null;
    this.sprouts = [];
    this.pending = [];    // scheduled pops & tweens — cancelled on destroy
    this._paint();
    hud.setAction('🌱');
    hud.setVerbPanel(this._panel());
  }

  _later(ms, fn) { this.pending.push(delay(ms, fn)); }

  _onBed(x, z) { return x >= this.minX && x <= this.maxX && z >= this.minZ && z <= this.maxZ; }

  _clamp(x, z) {
    return {
      x: Math.max(this.minX, Math.min(this.maxX, x)),
      z: Math.max(this.minZ, Math.min(this.maxZ, z)),
    };
  }

  // current bed rectangle: planted flag → monkey (clamped onto the soil);
  // before the flag is planted, a 1×1 preview glows under the monkey
  _rect() {
    const { player } = this.ctx;
    if (!this.anchor) {
      if (!this._onBed(player.x, player.z)) return null;
      return { x0: player.x, z0: player.z, x1: player.x, z1: player.z };
    }
    const p = this._clamp(player.x, player.z);
    return {
      x0: Math.min(this.anchor.x, p.x), x1: Math.max(this.anchor.x, p.x),
      z0: Math.min(this.anchor.z, p.z), z1: Math.max(this.anchor.z, p.z),
    };
  }

  _panel() {
    const { player } = this.ctx;
    const r = this._rect();
    const rows = r ? r.z1 - r.z0 + 1 : 0;
    const cols = r ? r.x1 - r.x0 + 1 : 0;
    return {
      kind: 'array', rows, cols, count: rows * cols,
      anchored: !!this.anchor,
      offBed: !this._onBed(player.x, player.z),
    };
  }

  _paint() {
    const { place } = this.ctx;
    const r = this._rect();
    for (let z = this.minZ; z <= this.maxZ; z++) {
      for (let x = this.minX; x <= this.maxX; x++) {
        const sel = r && x >= r.x0 && x <= r.x1 && z >= r.z0 && z <= r.z1;
        place.tintCell(x, z, sel
          ? ((z - r.z0) % 2 ? 0xaef0b2 : 0x8fe39a)
          : ((x + z) % 2 ? 0xb98a5e : 0xa1764e));
      }
    }
    this.ctx.hud.setVerbPanel(this._panel());
  }

  showModel() { return true; } // the soil bed itself is the model

  onArrive(x, z) {
    const p = this._panel();
    if (this.anchor && (p.rows !== this._lastR || p.cols !== this._lastC)) {
      audio.sfx('click', { pitch: 1 + (p.rows + p.cols) * 0.03 });
    }
    this._lastR = p.rows; this._lastC = p.cols;
    this._paint();
  }

  onAction() {
    if (this.done) return;
    const { player, place, problem, particles } = this.ctx;
    if (!this.anchor) {
      if (!this._onBed(player.x, player.z)) {
        audio.sfx('boop');
        this.ctx.hud.toast('🌱 ' + t('verb.array_need_soil'));
        return;
      }
      this.anchor = { x: player.x, z: player.z };
      this.flag = makeProp(PROPS.flowerYellow, 0.42, 'prop:flowerYellow');
      this.flag.position.copy(place.worldPos(this.anchor.x, this.anchor.z, 0.04));
      place.group.add(this.flag);
      audio.sfx('plant');
      this._paint();
      return;
    }
    // back on the flag: take it with you again (free do-over, never a fail)
    if (player.x === this.anchor.x && player.z === this.anchor.z) {
      place.group.remove(this.flag);
      this.flag = null;
      this.anchor = null;
      audio.sfx('swoosh');
      this.ctx.hud.toast('🚩 ' + t('verb.array_unplant'));
      this._paint();
      return;
    }
    const { rows, cols, total, given } = problem.model.params;
    const rect = this._rect();
    const r = rect.z1 - rect.z0 + 1, c = rect.x1 - rect.x0 + 1, n = r * c;
    let ok = false;
    if (given === 'both') ok = (r === rows && c === cols) || (r === cols && c === rows);
    else if (given === 'rows') ok = (r === rows && n === total);
    else ok = n === total && r > 1 && c > 1;
    if (ok) {
      this.done = true;
      // sprouts pop row by row with skip counts (all cancellable: a Home
      // press mid-celebration must not touch the disposed place)
      let i = 0;
      for (let z = 0; z < r; z++) {
        for (let x = 0; x < c; x++) {
          const wp = place.worldPos(rect.x0 + x, rect.z0 + z, 0.06);
          this._later(i * 36, () => {
            // up to 80 of these at once — shadows off (baked AO covers it)
            const s = makeProp(PROPS.sprout, 0.3, 'prop:sprout', { castShadow: false });
            s.position.copy(wp);
            s.scale.multiplyScalar(0.001);
            place.group.add(s);
            this.sprouts.push(s);
            const sc = s.scale.x * 1000;
            this.pending.push(tween({ ms: 240, ease: ease.outBack, onUpdate: (v, k) => s.scale.setScalar(Math.max(0.001, sc * k)) }));
            audio.sfx('plant', { pitch: 0.9 + (z * c + x) * 0.012 });
          });
          i++;
        }
        const count = (z + 1) * c;
        this._later(z * c * 36 + 200, () =>
          floatLabel(this.ctx.world, place.worldPos(rect.x0 + c, rect.z0 + z, 0.3), String(count)));
      }
      this._later(r * c * 36 + 450, () => {
        particles.confetti(place.worldPos(rect.x0 + Math.floor(c / 2), rect.z0 + Math.floor(r / 2), 0.6), 40);
        this.ctx.resolve(true, { tag: 'correct', value: n });
      });
    } else {
      const tag = n === total ? 'shape' : (n < total ? 'too_few' : 'too_many');
      this.ctx.resolve(false, { tag: 'near_miss', value: n, arrayInfo: { tag, r, c, n } });
    }
  }

  destroy() {
    super.destroy();
    const { place } = this.ctx;
    for (const p of this.pending) p.cancel();
    this.pending = [];
    for (let z = this.minZ; z <= this.maxZ; z++) for (let x = this.minX; x <= this.maxX; x++) place.resetCellTint(x, z);
    if (this.flag) place.group.remove(this.flag);
    for (const s of this.sprouts) place.group.remove(s);
    this.ctx.hud.setVerbPanel(null);
    this.ctx.hud.setAction(null);
  }
}

// ---------- NUMBERLINE: stand where the fraction lives ----------

export class LineVerb extends VerbBase {
  begin() {
    const { place, problem, hud } = this.ctx;
    this.tiles = (place.markers.V || []).slice().sort((a, b) => a.x - b.x);
    this.n = this.tiles.length;
    const { lo = 0, hi = 1, d = 4 } = problem.model.params;
    this.lo = lo; this.hi = hi; this.d = d;
    this.ticks = [];
    this.knot = null;
    this.readyMark = null;
    this.readyKey = null;
    this.readyPulseAt = 0;
    // end labels
    const a = this.tiles[0], b = this.tiles[this.n - 1];
    this.endA = makeTextSprite(String(lo), { bg: '#fff8ec', scale: 0.8 });
    this.endA.position.copy(place.worldPos(a.x, a.z, 0.9));
    this.endB = makeTextSprite(String(hi), { bg: '#fff8ec', scale: 0.8 });
    this.endB.position.copy(place.worldPos(b.x, b.z, 0.9));
    place.group.add(this.endA, this.endB);
    this._showTicks(problem.scaffold ?? 1);
    hud.setAction('🔔');
  }

  // The bridge is never bare: landmarks are how magnitude is estimated
  // (IES fractions guide). What fades with mastery is the labeling:
  //   level 0 — a post at every 1/d, all labeled (full support)
  //   level 1 — a post at every 1/d, labels only on benchmarks (wholes, ½)
  //   level 2 — benchmark posts only; the ½ anchor always survives
  _showTicks(level) {
    const { place } = this.ctx;
    for (const t of this.ticks) place.group.remove(t);
    this.ticks = [];
    this.level = level;
    const span = this.hi - this.lo;
    const segs = Math.round(this.d * span);
    const post = (frac, big, label) => {
      const idx = Math.round(((frac - this.lo) / span) * (this.n - 1));
      const tile = this.tiles[idx];
      const mark = makeTextSprite('▲', { color: big ? '#e8a23d' : '#7c4fd0', scale: big ? 1.0 : 0.95 });
      mark.position.copy(place.worldPos(tile.x, tile.z, 0.34));
      place.group.add(mark);
      this.ticks.push(mark);
      if (label) {
        const sp = makeTextSprite(label, { bg: big ? '#ffd966dd' : '#ffffffe0', color: '#6a4a8a', scale: 0.68 });
        sp.position.copy(place.worldPos(tile.x, tile.z, big ? 0.92 : 0.82));
        place.group.add(sp);
        this.ticks.push(sp);
      }
    };
    let hasHalfPost = false;
    for (let i = 1; i < segs; i++) {
      const frac = this.lo + i / this.d;
      const whole = Number.isInteger(frac);
      const half = !whole && Number.isInteger(frac * 2);
      if (half) hasHalfPost = true;
      if (level >= 2 && !(whole || half)) continue;
      let label = null;
      if (level === 0) label = whole ? String(frac) : `${Math.round(frac * this.d)}/${this.d}`;
      else if (level === 1 && whole) label = String(frac);
      else if (level === 1 && half) label = frac === 0.5 ? '½' : `${Math.floor(frac)}½`;
      post(frac, whole || half, label);
    }
    // odd denominators have no exact ½ post — add the benchmark anchor anyway
    if (!hasHalfPost && this.lo < 0.5 && this.hi > 0.5) {
      post(0.5, true, level <= 1 ? '½' : null);
    }
  }

  _valueAt(x) {
    const idx = this.tiles.findIndex((t) => t.x === x);
    if (idx < 0) return null;
    return this.lo + (idx / (this.n - 1)) * (this.hi - this.lo);
  }

  _tol() {
    const { problem } = this.ctx;
    return Math.max(problem.accept?.tol ?? 0.05, 0.55 / (this.n - 1)) * (this.hi - this.lo);
  }

  _isCorrectCell(x, z) {
    if (!this.tiles.some((t) => t.x === x && t.z === z)) return false;
    const val = this._valueAt(x);
    return val !== null && Math.abs(val - this.ctx.problem.answer) <= this._tol();
  }

  _showReadyCue(x, z) {
    if (this.done || this.resolving) return;
    const now = performance.now();
    const key = `${x},${z}`;
    this.ctx.hud.setActionReady?.(true);
    if (this.readyKey === key && now < this.readyPulseAt) return;
    this.readyKey = key;
    this.readyPulseAt = now + 1200;
    const { place, particles } = this.ctx;
    const pos = place.worldPos(x, z, 0.52);
    particles.emit(pos, 10, {
      colors: [0xffd966, 0xffffff, 0xc9a6ff],
      speed: 0.8, up: 1.0, life: 620, spread: 0.18,
    });
    audio.sfx('sparkle', { pitch: 0.75, gain: 0.45 });
    const mark = makeTextSprite('✦', { color: '#ffd966', scale: 0.72 });
    mark.position.copy(pos);
    place.group.add(mark);
    this.readyMark = mark;
    const base = mark.scale.clone();
    tween({
      ms: 680, ease: ease.outQuad,
      onUpdate: (v, k) => {
        mark.position.y = pos.y + Math.sin(k * Math.PI) * 0.22;
        mark.scale.set(base.x * (1 + k * 0.55), base.y * (1 + k * 0.55), 1);
        mark.material.opacity = 1 - k;
      },
      onDone: () => {
        if (this.readyMark === mark) this.readyMark = null;
        place.group.remove(mark);
      },
    });
  }

  onArrive(x, z) {
    if (this._isCorrectCell(x, z) && this.ctx.player.queue.length === 0) this._showReadyCue(x, z);
    else this.ctx.hud.setActionReady?.(false);
  }

  showModel() {
    this._showTicks(0); // hint: full labels return
    return true; // the bridge is the model; ticks are the scaffold
  }

  onAction() {
    // resolving guards against gong-spam during the dunk animation, which
    // would record several wrong answers for one attempt
    if (this.done || this.resolving || this.ctx.player.locked) return;
    const { player, place, problem, particles } = this.ctx;
    const onBridge = this.tiles.some((t) => t.x === player.x && t.z === player.z);
    if (!onBridge) { audio.sfx('boop'); return; }
    const val = this._valueAt(player.x);
    const target = problem.answer;
    const tol = this._tol();
    audio.sfx('gong');
    this.ctx.hud.setActionReady?.(false);
    if (Math.abs(val - target) <= tol) {
      this.done = true;
      // knot + flowers bloom along the vine
      const kp = place.worldPos(player.x, player.z, 0.15);
      this.knot = makeProp(PROPS.flowerPink, 0.3, 'prop:flowerPink');
      this.knot.position.copy(kp);
      place.group.add(this.knot);
      this.tiles.forEach((t, i) => {
        delay(i * 40, () => {
          if ((i % 3) === 0) {
            const f = makeProp(i % 2 ? PROPS.flowerYellow : PROPS.flowerBlue, 0.22, 'prop:f' + (i % 2));
            f.position.copy(place.worldPos(t.x, t.z, 0.12));
            place.group.add(f);
            this.ticks.push(f); // reuse cleanup list
          }
        });
      });
      particles.confetti(kp, 40);
      delay(500, () => this.ctx.resolve(true, { tag: 'correct', value: val }));
    } else {
      // comic splash: dunk, respawn at start, scaffold up
      this.resolving = true;
      const m = player.mesh;
      player.locked = true;
      particles.splash(m.position.clone(), 34);
      audio.sfx('splash');
      const sy = m.position.y;
      tween({
        ms: 420, ease: ease.inQuad,
        onUpdate: (v, k) => { m.position.y = sy - k * 1.1; m.rotation.z = k * 0.7; },
        onDone: () => {
          const spawn = (place.markers.P || [{ x: 2, z: 2 }])[0];
          m.rotation.z = 0;
          player.locked = false;
          player.setPlace(place, spawn.x, spawn.z);
          this.ctx.hud.setActionReady?.(false);
          this._showTicks(0); // full labels return on struggle
          this.resolving = false;
          this.ctx.resolve(false, { tag: val < target ? 'magnitude_low' : 'magnitude_high', value: val });
        },
      });
    }
  }

  destroy() {
    super.destroy();
    const { place } = this.ctx;
    place.group.remove(this.endA, this.endB);
    if (this.knot) place.group.remove(this.knot);
    if (this.readyMark) place.group.remove(this.readyMark);
    for (const t of this.ticks) place.group.remove(t);
    this.ctx.hud.setAction(null);
    this.ctx.hud.setActionReady?.(false);
  }
}

// ---------- SHARE: deal coconuts into baskets, pocket the remainder ----------

export class ShareVerb extends VerbBase {
  begin() {
    const { place, problem, hud, rng } = this.ctx;
    const { total, baskets } = problem.model.params;
    this.total = total;
    this.pile = total;
    const stump = (place.markers.m || [])[0];
    this.stumpPos = stump ? { x: stump.x, z: stump.z } : { x: 2, z: 2 };
    if (stump) {
      this.stumpMesh = makeProp(PROPS.stump, 0.5, 'prop:stump');
      this.stumpMesh.position.copy(place.worldPos(stump.x, stump.z));
      place.group.add(this.stumpMesh);
      place.cellAt(stump.x, stump.z).walk = false;
    }
    // pile display
    this.pileSprite = makeTextSprite('🥥 ' + this.pile, { bg: '#fff8ec', scale: 0.8 });
    this.pileSprite.position.copy(place.worldPos(this.stumpPos.x, this.stumpPos.z, 1.0));
    place.group.add(this.pileSprite);
    // choose nearest k baskets
    const all = (place.markers.B || []).slice()
      .sort((a, b) =>
        (Math.abs(a.x - this.stumpPos.x) + Math.abs(a.z - this.stumpPos.z)) -
        (Math.abs(b.x - this.stumpPos.x) + Math.abs(b.z - this.stumpPos.z)));
    this.baskets = all.slice(0, baskets).map((b) => {
      const mesh = makeProp(PROPS.basket, 0.42, 'prop:basket');
      mesh.position.copy(place.worldPos(b.x, b.z));
      place.group.add(mesh);
      const label = makeTextSprite('0', { bg: '#fff8ec', scale: 0.6 });
      label.position.copy(place.worldPos(b.x, b.z, 0.85));
      place.group.add(label);
      return { x: b.x, z: b.z, count: 0, mesh, label, order: [] };
    });
    this.lastDrops = [];
    hud.setAction('✅');
    hud.setVerbPanel(this._panel());
  }

  _panel() {
    return {
      kind: 'share',
      pile: this.pile,
      remainder: this.ctx.problem.model.params.remainder,
      counts: this.baskets.map((b) => b.count),
    };
  }

  _updateLabel(b) {
    const { place } = this.ctx;
    place.group.remove(b.label);
    b.label = makeTextSprite(String(b.count), { bg: '#fff8ec', scale: 0.6 });
    b.label.position.copy(place.worldPos(b.x, b.z, 0.85));
    place.group.add(b.label);
  }

  _updatePile() {
    const { place } = this.ctx;
    place.group.remove(this.pileSprite);
    this.pileSprite = makeTextSprite('🥥 ' + this.pile, { bg: '#fff8ec', scale: 0.8 });
    this.pileSprite.position.copy(place.worldPos(this.stumpPos.x, this.stumpPos.z, 1.0));
    place.group.add(this.pileSprite);
    this.ctx.hud.setVerbPanel(this._panel());
  }

  _basketAt(x, z) { return this.baskets.find((b) => b.x === x && b.z === z); }

  _drop(b) {
    if (this.pile <= 0) { audio.sfx('boop'); return; }
    const { place } = this.ctx;
    this.pile -= 1;
    b.count += 1;
    this.lastDrops.push(b);
    // coconut arcs from stump to basket
    const coco = makeProp(PROPS.coconut, 0.22, 'prop:coconut');
    const from = place.worldPos(this.stumpPos.x, this.stumpPos.z, 0.6);
    const to = place.worldPos(b.x, b.z, 0.3);
    coco.position.copy(from);
    place.group.add(coco);
    audio.sfx('pick', { pitch: 1 + b.count * 0.04 });
    tween({
      ms: 320, ease: ease.linear,
      onUpdate: (v, k) => {
        coco.position.lerpVectors(from, to, k);
        coco.position.y = from.y + (to.y - from.y) * k + Math.sin(k * Math.PI) * 0.7;
      },
      onDone: () => {
        place.group.remove(coco);
        audio.sfx('drop');
        this._updateLabel(b);
        this._updatePile();
      },
    });
  }

  _take() {
    const b = this.lastDrops.pop();
    if (!b || b.count <= 0) { audio.sfx('boop'); return; }
    b.count -= 1;
    this.pile += 1;
    audio.sfx('swoosh');
    this._updateLabel(b);
    this._updatePile();
  }

  showModel() {
    // the baskets are the model — bounce them as a nudge
    for (const [i, b] of this.baskets.entries()) {
      const m = b.mesh;
      tween({ ms: 360, delay: i * 70, onUpdate: (v, k) => { m.position.y = this.ctx.place.worldPos(b.x, b.z).y + Math.sin(k * Math.PI) * 0.18; } });
    }
    audio.sfx('click');
    return true;
  }

  onCellTap(x, z) {
    const b = this._basketAt(x, z);
    if (b) { this._drop(b); return true; }
    if (x === this.stumpPos.x && z === this.stumpPos.z) { this._take(); return true; }
    return false;
  }

  onArrive(x, z) {
    // walking onto a basket deals one — but only when it's the destination,
    // so pathing across a basket doesn't scatter coconuts by accident
    if (this.ctx.player.queue.length > 0) return;
    const b = this._basketAt(x, z);
    if (b) this._drop(b);
  }

  onKey(code) {
    // keyboard players need a take-back too (stump is tap-only otherwise)
    if (code === 'Backspace' || code === 'KeyX') { this._take(); return true; }
    return false;
  }

  onAction() {
    if (this.done) return;
    const { problem } = this.ctx;
    const { baskets, quotient, remainder } = problem.model.params;
    const counts = this.baskets.map((b) => b.count);
    const allEqual = counts.every((c) => c === counts[0]);
    if (allEqual && counts[0] === quotient && this.pile === remainder) {
      this.done = true;
      for (const b of this.baskets) {
        this.ctx.particles.confetti(this.ctx.place.worldPos(b.x, b.z, 0.5), 12);
      }
      if (remainder > 0) {
        this.ctx.onTreat?.('berry', remainder, this.ctx.place.worldPos(this.stumpPos.x, this.stumpPos.z, 0.7));
      }
      this.ctx.resolve(true, { tag: 'correct', value: counts[0] });
    } else if (!allEqual) {
      // wobble unfair baskets
      const max = Math.max(...counts);
      for (const b of this.baskets) {
        if (b.count === max) {
          const m = b.mesh;
          tween({ ms: 380, onUpdate: (v, k) => { m.rotation.z = Math.sin(k * Math.PI * 4) * 0.15; } });
        }
      }
      this.ctx.resolve(false, { tag: 'unfair_share', value: counts.join(',') });
    } else if (this.pile > remainder) {
      this.ctx.resolve(false, { tag: 'share_more', value: this.pile });
    } else {
      this.ctx.resolve(false, { tag: 'remainder_ignored', value: counts[0] });
    }
  }

  destroy() {
    super.destroy();
    const { place } = this.ctx;
    if (this.stumpMesh) place.group.remove(this.stumpMesh);
    place.group.remove(this.pileSprite);
    for (const b of this.baskets) { place.group.remove(b.mesh); place.group.remove(b.label); }
    this.ctx.hud.setVerbPanel(null);
    this.ctx.hud.setAction(null);
  }
}

export const VERBS = {
  fetch: FetchVerb,
  array: ArrayVerb,
  numberline: LineVerb,
  share: ShareVerb,
};
