import { Place } from '../chamber.js';
import { makeCharacter, makeProp, makeTextSprite } from '../entities.js';
import { PROPS, getCreature } from '../models.js';
import { t } from '../i18n.js';
import { reducedMotion } from '../a11y.js';

// Kiki the Kitten's music stage: a small raised platform with a golden gong at the back,
// footlight lanterns, and Kiki herself waiting to play. The whole minigame is screen-driven
// (the song menu + the three song panels); this scene is the cozy backdrop, and tapping the
// gong — or Kiki — opens the songs. Rows use '1' for the raised stage floor (chamber HEIGHTS).
const STAGE_ROWS = [
  '#############',
  '#...........#',
  '#..1111111..#',
  '#..1111111..#',
  '#..1111111..#',
  '#...........#',
  '#...........#',
  '#...........#',
  '#...........#',
  '#############',
];

const GONG = { x: 6, z: 3 };            // centre-back of the platform
const KIKI = { x: 4, z: 3 };            // Kiki stands stage-left of the gong
const LANTERNS = [{ x: 3, z: 2 }, { x: 9, z: 2 }, { x: 3, z: 4 }, { x: 9, z: 4 }];

export class StagePlace extends Place {
  constructor(world, opts = {}) {
    super(world, 'hub');
    this.buildFrom(STAGE_ROWS, { seed: opts.seed ?? 808 });
    this.gong = { ...GONG };
    this._textSprites = [];
    this._placeStage();
  }

  _textSprite(key, text, spriteOpts, position) {
    const sprite = makeTextSprite(text, spriteOpts);
    sprite.position.copy(position);
    this.group.add(sprite);
    this._textSprites.push({ key, sprite, opts: spriteOpts, position: position.clone() });
    return sprite;
  }

  refreshLanguage() {
    for (const record of this._textSprites) {
      const next = makeTextSprite(t(record.key), record.opts);
      next.position.copy(record.position);
      this.group.add(next);
      this.group.remove(record.sprite);
      record.sprite.material?.map?.dispose?.();
      record.sprite.material?.dispose?.();
      record.sprite = next;
    }
  }

  _placeStage() {
    // the gong at the back of the platform (blocked, tappable)
    const gongProp = makeProp(PROPS.gong, 1.0, 'prop:gong');
    gongProp.position.copy(this.worldPos(this.gong.x, this.gong.z));
    this.group.add(gongProp);
    this.addGroundShadow?.(this.gong.x, this.gong.z, { radius: 0.4 });
    const gongCell = this.cellAt(this.gong.x, this.gong.z);
    if (gongCell) gongCell.walk = false;
    this.gongMesh = gongProp;
    this._gongBase = gongProp.scale.clone();
    this._gongPulse = 0; // 1 right after a note, eased back to 0 each frame
    this._kikiPulse = 0;
    this.world.pickables?.push(gongProp);
    // Ease the gong pulse (and Kiki's extra hop) back down every frame, so pulseStage()
    // just needs to bump them. The gong scales relative to its authored base scale.
    this.addEntity({
      update: (dtMs) => {
        const dt = dtMs / 1000;
        this._gongPulse = Math.max(0, this._gongPulse - dt * 2.6);
        this._kikiPulse = Math.max(0, this._kikiPulse - dt * 2.4);
        this.gongMesh.scale.copy(this._gongBase).multiplyScalar(1 + this._gongPulse * 0.18);
      },
    });

    // footlight lanterns at the platform corners
    for (const spot of LANTERNS) {
      const lantern = makeProp(PROPS.lantern, 0.5, 'prop:lantern');
      lantern.position.copy(this.worldPos(spot.x, spot.z));
      this.group.add(lantern);
      const cell = this.cellAt(spot.x, spot.z);
      if (cell) cell.walk = false;
    }

    // Kiki the Kitten, waiting to play, with a gentle idle bob
    const creature = getCreature('kitten');
    const kiki = makeCharacter(creature.full, 0.66, null, 'creature:kitten:f');
    const kikiPos = this.worldPos(KIKI.x, KIKI.z);
    kiki.position.copy(kikiPos);
    kiki.rotation.y = Math.PI;
    this.group.add(kiki);
    this.world.pickables?.push(kiki);
    const kikiCell = this.cellAt(KIKI.x, KIKI.z);
    if (kikiCell) kikiCell.walk = false;
    this.kiki = kiki;
    const baseY = kikiPos.y;
    const bob = {
      t: 0,
      update: (dtMs) => {
        bob.t += dtMs / 1000;
        // idle bob + an extra hop on each note (pulseStage bumps _kikiPulse)
        kiki.position.y = baseY + Math.abs(Math.sin(bob.t * 1.9)) * 0.05 + this._kikiPulse * 0.14;
      },
    };
    this.addEntity(bob);

    // stage sign
    this._textSprite('build.stage', t('build.stage'), { bg: '#fff8ecdd', scale: 0.6, fontSize: 42 }, this.worldPos(6, 1, 1.3));
  }

  // True when grid cell (x,z) is the gong (or right beside it) — the tap that opens songs.
  isGong(x, z) {
    return Math.abs(this.gong.x - x) + Math.abs(this.gong.z - z) <= 1
      || (Math.abs(KIKI.x - x) + Math.abs(KIKI.z - z) <= 1);
  }

  // World position of the gong, for confetti / steam-style fx.
  gongWorld(lift = 0.9) {
    return this.worldPos(this.gong.x, this.gong.z, lift);
  }

  // Pulse the real 3D stage on a note: light the gong (scale bump + a little sparkle)
  // and give Kiki an extra hop, so Echo playback is felt on stage, not only on the DOM
  // pads. Motion is skipped under reducedMotion(); a faint sparkle still marks the beat.
  pulseStage() {
    if (!reducedMotion()) {
      this._gongPulse = 1;
      this._kikiPulse = 1;
    }
    if (this.fx && this.gongWorld) {
      this.fx.emit(this.gongWorld(0.9), reducedMotion() ? 2 : 5,
        { colors: [0xffd166, 0xfff3a0, 0xffe066], speed: 0.5, up: 1.2, life: 520, spread: 0.32 });
    }
  }
}
