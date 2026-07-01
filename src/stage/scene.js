import { Place } from '../chamber.js';
import { makeCharacter, makeProp, makeTextSprite } from '../entities.js';
import { PROPS, getCreature } from '../models.js';
import { t } from '../i18n.js';

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
    this.world.pickables?.push(gongProp);

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
        kiki.position.y = baseY + Math.abs(Math.sin(bob.t * 1.9)) * 0.05;
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
}
