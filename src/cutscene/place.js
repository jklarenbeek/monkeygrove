// CutscenePlace — a small story diorama built from a scene's ASCII rows, with
// one extra trick the story needs: a whole-island gray↔colour dial (the theft
// drains the grove; the reveal washes colour back in). Same recipe as the
// hub's applyBloom, but uniform — cutscene dioramas have no portal regions.
import * as THREE from 'three';
import { Place } from '../chamber/index.js';
import { PALETTE } from '../config.js';
import { tween, ease } from '../anim.js';

export class CutscenePlace extends Place {
  constructor(world, spec = {}) {
    super(world, spec.theme || 'hub');
    this.buildFrom(spec.rows, { seed: spec.seed ?? 4242 });
    this._bloom = 1;
    this._bloomTween = null;
    if (spec.startGray) this.setBloom(0);
  }

  // 0 = the stolen island (almost pure gray), 1 = full colour. A floor of
  // 0.15 keeps a whisper of the palette even at 0 so the gray reads sad,
  // never dead — matching the hub's unbloomed look.
  setBloom(p) {
    this._bloom = Math.max(0, Math.min(1, p));
    const gray = new THREE.Color(PALETTE.gray);
    const color = new THREE.Color();
    for (const it of this.floorList) {
      color.setHex(this._floorColors(it.c, it.x, it.z, {}));
      color.lerpColors(gray, color, 0.15 + 0.85 * this._bloom);
      this.floor.setColorAt(it.c.instanceId, color);
    }
    if (this.floor.instanceColor) this.floor.instanceColor.needsUpdate = true;
  }

  // Eased glide to a bloom level; returns the tween so the director can
  // cancel it on dispose/skip.
  bloomTo(p, ms = 1200) {
    this._bloomTween?.cancel?.();
    const from = this._bloom;
    this._bloomTween = tween({
      ms, ease: ease.inOutQuad,
      onUpdate: (v, k) => this.setBloom(from + (p - from) * k),
      onDone: () => { this._bloomTween = null; },
    });
    return this._bloomTween;
  }

  dispose() {
    this._bloomTween?.cancel?.();
    super.dispose();
  }
}
