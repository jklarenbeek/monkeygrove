import { tween, ease } from '../anim.js';
import { audio } from '../audio.js';
import { makeProp, makeTextSprite } from '../entities.js';
import { PROPS } from '../models.js';
import { VerbBase } from './VerbBase.js';
import { fxShareDeal } from './verbfx.js';

// ---------- SHARE: deal coconuts into baskets, pocket the remainder ----------

export class ShareVerb extends VerbBase {
  begin() {
    const { place, problem, hud } = this.ctx;
    const { total, baskets } = problem.model.params;
    this.total = total;
    this.pile = total;
    const stump = (place.markers.m || [])[0];
    this.stumpPos = stump ? { x: stump.x, z: stump.z } : { x: 2, z: 2 };
    if (stump) {
      this.stumpMesh = makeProp(PROPS.stump, 0.5, 'prop:stump');
      this.stumpMesh.position.copy(place.worldPos(stump.x, stump.z));
      place.group.add(this.stumpMesh);
      place.registerPickable(this.stumpMesh, this.stumpPos, { anchorY: 0.3 });
      place.cellAt(stump.x, stump.z).walk = false;
    }
    // pile display — tapping the floating 🥥 count means the stump (take-back)
    this.pileSprite = makeTextSprite('🥥 ' + this.pile, { bg: '#fff8ec', scale: 0.8 });
    this.pileSprite.position.copy(place.worldPos(this.stumpPos.x, this.stumpPos.z, 1.0));
    place.group.add(this.pileSprite);
    place.registerPickable(this.pileSprite, this.stumpPos, { magnet: 0 });
    // choose nearest k baskets
    const all = (place.markers.B || []).slice()
      .sort((a, b) =>
        (Math.abs(a.x - this.stumpPos.x) + Math.abs(a.z - this.stumpPos.z)) -
        (Math.abs(b.x - this.stumpPos.x) + Math.abs(b.z - this.stumpPos.z)));
    this.baskets = all.slice(0, baskets).map((b) => {
      const mesh = makeProp(PROPS.basket, 0.42, 'prop:basket');
      mesh.position.copy(place.worldPos(b.x, b.z));
      place.group.add(mesh);
      place.registerPickable(mesh, b, { anchorY: 0.25 });
      const label = makeTextSprite('0', { bg: '#fff8ec', scale: 0.6 });
      label.position.copy(place.worldPos(b.x, b.z, 0.85));
      place.group.add(label);
      place.registerPickable(label, b, { magnet: 0 });
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
    place.unregisterPickable(b.label);
    place.group.remove(b.label);
    b.label = makeTextSprite(String(b.count), { bg: '#fff8ec', scale: 0.6 });
    b.label.position.copy(place.worldPos(b.x, b.z, 0.85));
    place.group.add(b.label);
    place.registerPickable(b.label, b, { magnet: 0 });
  }

  _updatePile() {
    const { place } = this.ctx;
    place.unregisterPickable(this.pileSprite);
    place.group.remove(this.pileSprite);
    this.pileSprite = makeTextSprite('🥥 ' + this.pile, { bg: '#fff8ec', scale: 0.8 });
    this.pileSprite.position.copy(place.worldPos(this.stumpPos.x, this.stumpPos.z, 1.0));
    place.group.add(this.pileSprite);
    place.registerPickable(this.pileSprite, this.stumpPos, { magnet: 0 });
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
        fxShareDeal(this.ctx, { basket: b, fair: false });
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
    const { quotient, remainder } = problem.model.params;
    const counts = this.baskets.map((b) => b.count);
    const allEqual = counts.every((c) => c === counts[0]);
    if (allEqual && counts[0] === quotient && this.pile === remainder) {
      this.done = true;
      for (const b of this.baskets) {
        fxShareDeal(this.ctx, { basket: b, fair: true });
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
    if (this.stumpMesh) { place.unregisterPickable(this.stumpMesh); place.group.remove(this.stumpMesh); }
    place.unregisterPickable(this.pileSprite);
    place.group.remove(this.pileSprite);
    for (const b of this.baskets) {
      place.unregisterPickable(b.mesh);
      place.unregisterPickable(b.label);
      place.group.remove(b.mesh);
      place.group.remove(b.label);
    }
    this.ctx.hud.setVerbPanel(null);
    this.ctx.hud.setAction(null);
  }
}
