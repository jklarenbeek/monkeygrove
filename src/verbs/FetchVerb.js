import * as THREE from 'three';
import { tween, ease } from '../anim.js';
import { audio } from '../audio.js';
import { NumberStone, Pot, makeTextSprite } from '../entities.js';
import { t } from '../i18n.js';
import { VerbBase } from './VerbBase.js';
import { fxFetchCorrect } from './verbfx.js';

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
    fxFetchCorrect(this.ctx, { altarPos: apos, stoneMesh: mesh });
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
