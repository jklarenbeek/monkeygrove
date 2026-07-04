// MemoryProbe — the opt-in pre/post fact-recall check (docs/06 §7, Phase 3). A
// short run of bare fact questions over the child's anchored facts and comparable
// unanchored ones, timed, with no right/wrong pressure (the checkup's warm-nod
// contract). The first run is the 'pre' baseline, later ones 'post' — so the
// parents screen can show the pre→post change on anchored facts. Stored only on
// the device (no backend, docs/06 §4.8).
import * as screens from '../screens.js';
import { audio } from '../audio.js';
import { persistNow } from '../state.js';
import { buildProbe, gradeProbeItem, recordProbe } from './engine.js';

const now = () => (typeof performance !== 'undefined' ? performance.now() : 0);

export class MemoryProbe {
  constructor(game) {
    this.game = game;
  }

  start() {
    const g = this.game;
    this.items = buildProbe(g.profile, { size: 8 });
    if (!this.items.length) { g.startHub(); return; }
    this.i = 0;
    this.results = [];
    g.mode = 'probe';
    g.flowToken++;
    screens.closeScreen();
    this.next();
  }

  next() {
    const item = this.items[this.i];
    if (!item) { this.finish(); return; }
    this.startedAt = now();
    screens.showProbeItem({
      index: this.i,
      total: this.items.length,
      a: item.a,
      b: item.b,
      onSubmit: (value) => this.answer(value),
      onExit: () => this.finish(),
    });
  }

  answer(value) {
    const item = this.items[this.i];
    const { correct } = gradeProbeItem(item, value);
    this.results.push({ ...item, correct, ms: now() - (this.startedAt || 0) });
    audio.sfx(correct ? 'correct' : 'click'); // gentle — never a boop on a probe
    this.i += 1;
    screens.closeScreen();
    this.next();
  }

  finish() {
    const g = this.game;
    if (!this.results.length) { g.startHub(); return; }
    const rec = recordProbe(g.profile.memory, { items: this.results, now: Date.now() });
    persistNow();
    screens.showProbeDone({
      n: rec.n,
      ok: rec.ok,
      phase: rec.phase,
      onClose: () => { screens.closeScreen(); g.startHub(); },
    });
  }
}
