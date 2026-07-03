import { tween, ease, delay } from '../anim.js';
import { audio } from '../audio.js';
import { makeProp, makeTextSprite } from '../entities.js';
import { PROPS } from '../models.js';
import { VerbBase } from './VerbBase.js';
import { fxNumberLinePulse } from './verbfx.js';

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
    // tapping a floating end label means "walk to that end of the vine"
    place.registerPickable(this.endA, a, { magnet: 0 });
    place.registerPickable(this.endB, b, { magnet: 0 });
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
    for (const t of this.ticks) { place.unregisterPickable(t); place.group.remove(t); }
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
      // tapping a tick post (or its fraction label) walks to that tick's tile
      place.registerPickable(mark, tile, { magnet: 0 });
      this.ticks.push(mark);
      if (label) {
        const sp = makeTextSprite(label, { bg: big ? '#ffd966dd' : '#ffffffe0', color: '#6a4a8a', scale: 0.68 });
        sp.position.copy(place.worldPos(tile.x, tile.z, big ? 0.92 : 0.82));
        place.group.add(sp);
        place.registerPickable(sp, tile, { magnet: 0 });
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
    fxNumberLinePulse(this.ctx, { x, z, kind: 'ready' });
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
      fxNumberLinePulse(this.ctx, { x: player.x, z: player.z, kind: 'correct' });
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
    place.unregisterPickable(this.endA);
    place.unregisterPickable(this.endB);
    place.group.remove(this.endA, this.endB);
    if (this.knot) place.group.remove(this.knot);
    if (this.readyMark) place.group.remove(this.readyMark);
    for (const t of this.ticks) { place.unregisterPickable(t); place.group.remove(t); }
    this.ctx.hud.setAction(null);
    this.ctx.hud.setActionReady?.(false);
  }
}
