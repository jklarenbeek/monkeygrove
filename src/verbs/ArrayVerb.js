import { tween, ease, delay } from '../anim.js';
import { audio } from '../audio.js';
import { makeProp, floatLabel } from '../entities.js';
import { PROPS } from '../models.js';
import { t } from '../i18n.js';
import { VerbBase } from './VerbBase.js';
import { fxArrayGrowCell } from './verbfx.js';

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
    let ok;
    if (given === 'both') ok = (r === rows && c === cols) || (r === cols && c === rows);
    else if (given === 'rows') ok = (r === rows && n === total);
    else ok = n === total && r > 1 && c > 1;
    if (ok) {
      this.done = true;
      // sprouts pop row by row with skip counts (all cancellable: a Home
      // press mid-celebration must not touch the disposed place)
      let i = 0;
      for (let z = 0; z < r; z++) {
        this._later(z * c * 36, () =>
          fxArrayGrowCell(this.ctx, { rect, row: z, col: 0, count: (z + 1) * c }));
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
