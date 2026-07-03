// CutsceneDirector — plays a declarative scene script (scenes.js) on the real
// 3D engine: voxel actors that grid-hop like the player, camera glides, the
// gray↔bloom dial, particles, and the tap-paced dialog bar (dialog.js).
//
// Contracts (DESIGN.md): the child paces every `say`; `walk` is raced against
// a timeout so a blocked path can never trap them; Skip/Escape ends the whole
// scene instantly; under reduced motion actors teleport and the camera snaps.
// A director never persists anything — story latching stays in main.js.
import { Player } from '../player.js';
import { makeCharacter, floatLabel } from '../entities.js';
import { CHARS } from '../models.js';
import { getCreature } from '../mesh/creatures.js';
import { tween, ease, delay } from '../anim.js';
import { reducedMotion } from '../a11y.js';
import { GFX } from '../gfx.js';
import { audio } from '../audio.js';
import { t } from '../i18n.js';
import { openCutsceneUi, showCutscenePage, closeCutsceneUi } from './dialog.js';

const WALK_TIMEOUT_MS = 7000;   // a stuck walk resolves anyway — never block the child
const PAUSE_CAP_MS = 2500;      // `pause` beats are moments, not timers
const CHAR_HEIGHTS = { mimi: 0.8, crabKing: 0.95, crab: 0.5, monkey: 0.85 };
const WHO_NAME = { mimi: () => 'Mimi', crabking: () => t('npc.crabking') };

// Resolve a scene position spec (see scenes.js header) to a grid cell, or null.
// Pure and place-shaped (cellAt/markers), so it is unit-testable without three.
export function resolvePos(spec, { place, actors = {}, playerAt = null } = {}) {
  if (Array.isArray(spec)) return { x: spec[0], z: spec[1] };
  if (typeof spec === 'string' && spec.startsWith('@')) {
    const a = actors[spec.slice(1)];
    return a ? { x: a.x, z: a.z } : null;
  }
  if (spec && typeof spec === 'object') {
    if (spec.marker !== undefined) {
      const m = (place?.markers?.[spec.marker] || [])[0];
      return m ? { x: m.x + (spec.dx || 0), z: m.z + (spec.dz || 0) } : null;
    }
    if (spec.nearPlayer !== undefined) return nearPlayerCell(place, playerAt, spec.nearPlayer);
  }
  return null;
}

// A free walkable cell at (about) `dist` grid steps from the player, searching
// outward-in so the actor lands as far as asked but always lands somewhere.
// South/east offsets are tried first (toward the hub's shore side).
function nearPlayerCell(place, playerAt, dist) {
  if (!playerAt) return null;
  if (dist <= 0) return { x: playerAt.x, z: playerAt.z };
  for (let d = dist; d >= 1; d--) {
    for (let dx = -d; dx <= d; dx++) {
      for (const dz of [d - Math.abs(dx), -(d - Math.abs(dx))]) {
        const x = playerAt.x + dx, z = playerAt.z + dz;
        const c = place?.cellAt?.(x, z);
        if (c && c.walk !== false && c.h === 0) return { x, z };
        if (dz === 0) break; // ±0 is the same cell
      }
    }
  }
  return null;
}

export class CutsceneDirector {
  constructor(game, scene, { place } = {}) {
    this.game = game;
    this.scene = scene;
    this.place = place || game.place;
    this.actors = {};      // id -> Player (voxel mesh + grid-hop controller)
    this._ticker = null;   // place entity that updates the actors each frame
    this._tweens = [];     // owned tweens, cancelled on dispose
    this._skipped = false;
    this._skipResolve = null;
  }

  _ctx() {
    const p = this.game.player;
    return { place: this.place, actors: this.actors, playerAt: p ? { x: p.x, z: p.z } : null };
  }

  _pos(spec) { return resolvePos(spec, this._ctx()); }

  _worldPos(spec, lift = 0) {
    const cell = this._pos(spec);
    return cell ? this.place.worldPos(cell.x, cell.z, lift) : null;
  }

  // Play the whole script. Resolves 'done' or 'skipped'; never rejects on a
  // single broken beat (it is skipped and the scene flows on).
  async play() {
    const skipPromise = new Promise((resolve) => { this._skipResolve = resolve; });
    openCutsceneUi({ onSkip: () => this.skip() });
    this._setup();
    for (const beat of this.scene.beats || []) {
      if (this._skipped) break;
      try {
        await Promise.race([this._runBeat(beat), skipPromise]);
      } catch (e) {
        if (import.meta.env.DEV) console.error('[cutscene] beat failed:', beat, e);
      }
    }
    closeCutsceneUi();
    return this._skipped ? 'skipped' : 'done';
  }

  skip() {
    if (this._skipped) return;
    this._skipped = true;
    this._skipResolve?.();
  }

  _setup() {
    const { world } = this.game;
    if (this.scene.place?.daylight) world.setDaylight(this.scene.place.daylight);
    if (this.scene.camera) {
      const wp = this._worldPos(this.scene.camera.to);
      if (wp) world.lookAt(wp, this.scene.camera.span ?? 10);
    }
    for (const def of this.scene.actors || []) this._spawnActor(def);
    const actors = this.actors;
    this._ticker = this.place.addEntity({
      update(dt) { for (const a of Object.values(actors)) a.update(dt); },
    });
  }

  _makeMesh(def) {
    if (def.kind === 'avatar') return this.game.avatar.makeAvatarMesh(this.game.profile?.avatar);
    if (def.kind === 'creature') {
      const creature = getCreature(def.model);
      return makeCharacter(creature.full, def.h ?? 0.62, null, 'creature:' + creature.id + ':f');
    }
    return makeCharacter(CHARS[def.model], def.h ?? CHAR_HEIGHTS[def.model] ?? 0.8, null, 'char:' + def.model);
  }

  _spawnActor(def) {
    const at = this._pos(def.at);
    if (!at) return;
    const actor = new Player(this._makeMesh(def));
    actor.sfx = false; // cutscenes cue their own sounds
    actor.setPlace(this.place, at.x, at.z);
    const look = def.look ? this._pos(def.look) : null;
    if (look) {
      actor.face(look.x - at.x, look.z - at.z);
      actor.mesh.rotation.y = actor.facing;
    }
    this.actors[def.id] = actor;
  }

  _runBeat(beat) {
    if (beat.say !== undefined) return this._beatSay(beat);
    if (beat.walk !== undefined) return this._beatWalk(beat);
    if (beat.pause !== undefined) {
      const ms = Math.min(beat.pause, PAUSE_CAP_MS);
      return new Promise((resolve) => this._tweens.push(delay(reducedMotion() ? Math.min(ms, 400) : ms, resolve)));
    }
    if (beat.camera !== undefined) return this._beatCamera(beat);
    if (beat.turn !== undefined) return this._beatTurn(beat);
    if (beat.fx !== undefined) return this._beatFx(beat);
    if (beat.emote !== undefined) return this._beatEmote(beat);
    if (beat.sfx !== undefined) { audio.sfx(beat.sfx); return Promise.resolve(); }
    return Promise.resolve();
  }

  _beatSay(beat) {
    const name = WHO_NAME[beat.who]?.() || null;
    return showCutscenePage({ name, html: t(beat.say), face: beat.face || '✨' });
  }

  _beatWalk(beat) {
    const actor = this.actors[beat.walk];
    const to = this._pos(beat.to);
    if (!actor || !to) return Promise.resolve();
    if (reducedMotion()) { // calm mode: appear there, no hop parade
      actor.stop();
      actor.x = to.x; actor.z = to.z;
      actor.mesh.position.copy(this.place.worldPos(to.x, to.z));
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this._tweens.push(delay(WALK_TIMEOUT_MS, resolve)); // safety: never hang the scene
      if (!actor.pathTo(to.x, to.z)) { resolve(); return; }
      actor.onArrive = () => {
        if (actor.queue.length) return;
        actor.onArrive = null;
        resolve();
      };
    });
  }

  // Camera beats glide (the world's own exp-smoothed look-at does the easing);
  // `follow: true` rides along with a walking actor.
  _beatCamera(beat) {
    const { world } = this.game;
    const actorId = typeof beat.camera === 'string' && beat.camera.startsWith('@') ? beat.camera.slice(1) : null;
    const mesh = actorId ? this.actors[actorId]?.mesh : null;
    if (beat.follow && mesh) {
      world.followObj = mesh;
      world.followMode = 'always';
    } else {
      const wp = this._worldPos(beat.camera);
      if (!wp) return Promise.resolve();
      world.followObj = null;
      world.followMode = null;
      world.boardCenter.copy(wp);
    }
    if (beat.span) this._spanTo(beat.span, beat.ms ?? 800);
    return Promise.resolve();
  }

  _spanTo(span, ms) {
    const { world } = this.game;
    if (GFX.cameraMoments === 'minimal' || reducedMotion()) { world.setSpan(span); return; }
    // cameraShot animates span-only (never the iso angle), exactly what we want
    world.cameraShot({ span, fromSpanMul: (world.span || span) / span, duration: ms });
  }

  _beatTurn(beat) {
    const actor = this.actors[beat.turn];
    const to = this._pos(beat.toward);
    if (actor && to) actor.face(to.x - actor.x, to.z - actor.z); // Player.update eases the yaw
    return Promise.resolve();
  }

  _beatEmote(beat) {
    const actor = this.actors[beat.emote];
    if (!actor || reducedMotion()) return Promise.resolve();
    const m = actor.mesh;
    const y0 = m.position.y;
    this._tweens.push(tween({
      ms: 420, ease: ease.outQuad,
      onUpdate: (v, k) => { m.position.y = y0 + Math.sin(k * Math.PI) * 0.32; },
      onDone: () => { m.position.y = y0; },
    }));
    return Promise.resolve();
  }

  _beatFx(beat) {
    const { world, particles } = this.game;
    const wp = beat.at ? this._worldPos(beat.at, 0.5) : null;
    switch (beat.fx) {
      case 'gray':
        this.place.bloomTo?.(beat.level ?? 0, beat.ms ?? 1400);
        break;
      case 'bloom':
        this.place.bloomTo?.(beat.level ?? 1, beat.ms ?? 1200);
        break;
      case 'confetti':
        if (wp) particles?.confetti(wp, beat.count ?? 30);
        break;
      case 'sparkle':
        if (wp) particles?.emit(wp, beat.count ?? 12, { colors: [0xfff3b8, 0xc9a6ff], speed: 1.3, up: 1.8, life: 750, spread: 0.3 });
        break;
      case 'shake':
        world.shake(beat.amount ?? 0.18);
        break;
      case 'numbers':
        // the stolen numbers fly off one by one — the theft made visible
        if (wp) {
          ['7', '3', '12', '5', '9'].forEach((digit, i) => {
            const at = wp.clone();
            at.x += ((i % 3) - 1) * 0.5;
            at.z += (i % 2) * 0.4;
            this._tweens.push(delay(i * 170, () => floatLabel(world, at, digit, '#b0483f')));
          });
        }
        break;
    }
    return Promise.resolve();
  }

  // Remove everything the scene added. Safe to call twice; never touches the
  // place's own props/floor (the caller owns the place's lifecycle).
  dispose() {
    closeCutsceneUi();
    for (const actor of Object.values(this.actors)) {
      actor.stop();
      actor.onArrive = null;
      actor.mesh.removeFromParent();
      actor.shadow?.removeFromParent();
    }
    this.actors = {};
    if (this._ticker) {
      const i = this.place.entities.indexOf(this._ticker);
      if (i >= 0) this.place.entities.splice(i, 1);
      this._ticker = null;
    }
    for (const tw of this._tweens) tw?.cancel?.();
    this._tweens = [];
  }
}
