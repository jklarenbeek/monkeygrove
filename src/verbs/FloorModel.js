// FloorModel — the shared visual-model painter every verb hangs off VerbBase.
// Paints + animates a problem's {kind, params} model onto the chamber floor
// (array grid, division baskets, fraction number line, addition/subtraction
// strip), then auto-clears. Scheduled paint steps are all cancellable on clear.
import { delay } from '../anim.js';
import { audio } from '../audio.js';
import { makeTextSprite } from '../entities.js';
import { OCCUPIED_MARKERS } from '../config.js';

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
      const { baskets, quotient, remainder } = model.params;
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
