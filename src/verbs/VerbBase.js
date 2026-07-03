// Math verbs: the four ways a problem is SOLVED inside the world. Each verb
// owns its scene objects, handles input routed from the game, and calls
// ctx.resolve(correct, info) exactly once per attempt.
//
// ctx: { world, place, player, particles, altar, hud, problem, rng,
//        resolve(correct, {tag, value}), hintUsed() }
import { FloorModel } from './FloorModel.js';

export class VerbBase {
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
  refreshLanguage() {
    if (typeof this._panel === 'function') this.ctx.hud.setVerbPanel(this._panel());
  }
  update() {}
  destroy() { this.model.clear(); }
}
