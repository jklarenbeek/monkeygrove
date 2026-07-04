// MemoryWalk — a loci journey over the LIVE hub (docs/06 §4.4): no new scene, no
// auto-pathing. Mimi names the next restored landmark, the child physically walks
// there (the whole point of the method of loci), and a numpad question appears on
// arrival. The first content is skip-counting — the spatial twin of Kiki's
// Counting Song, so a correct stop reinforces the same times-table skill.
//
// It borrows hub mode ('walk'): the HubController's scene hooks all self-guard on
// mode==='hub', so during a walk taps just walk the player and no hub action
// fires. Arrival is detected by overriding the player's onArrive and testing
// adjacency to the landmark cell, so any approach path counts.
import { delay } from '../anim.js';
import { t } from '../i18n.js';
import * as hud from '../hud.js';
import * as screens from '../screens.js';
import { audio } from '../audio.js';
import { addBananas, addEggPoints, persist, persistNow } from '../state.js';
import { reinforceSkill } from '../mathengine.js';
import { BALANCE } from '../config.js';
import { availableLoci, buildSkipWalk, gradeWalkStop, recordWalk } from './engine.js';

// The hub cell of a landmark (a non-walkable prop cell; the child stands beside it).
function lociCell(place, id) {
  if (!place) return null;
  const marker = (ch) => (place.markers?.[ch] || [])[0] || null;
  if (id === 'gemtree') return marker('T');
  if (id === 'shop') return marker('O');
  if (id === 'nest') return marker('N');
  if (id === 'mimi') return place.mimiPos || marker('M');
  return place.buildSpots?.[id] || null; // a restored build's plot
}

export class MemoryWalk {
  constructor(game) {
    this.game = game;
  }

  start(step) {
    const g = this.game;
    const walk = buildSkipWalk({ step, loci: availableLoci(g.profile) });
    if (!walk.stops.length) { g.startHub(); return; }
    this.walk = walk;
    this.i = 0;
    this.correct = 0;
    this.streak = 0;
    this.best = 0;
    g.mode = 'walk';
    g.flowToken++;
    this.token = g.flowToken;
    screens.closeScreen();
    hud.showHud(true);
    hud.showHintButton(false);
    hud.setAction(null);
    // Take over arrival detection; the hub's own onArrive (portal entry) is inert
    // anyway (it self-guards on mode==='hub'), but we want the walk's version.
    this.savedArrive = g.player?.onArrive || null;
    if (g.player) g.player.onArrive = (x, z) => this.onArrive(x, z);
    hud.say(t('memory.walk_start', { step }), { face: '🐒' });
    delay(600, () => { if (this.token === g.flowToken) this.cueStop(); });
  }

  // Name the next landmark and draw the eye to it; the child walks there.
  cueStop() {
    const g = this.game;
    const stop = this.walk.stops[this.i];
    if (!stop) { this.finish(); return; }
    this.presented = false;
    this.lociXZ = lociCell(g.place, stop.lociId);
    hud.toast(t('memory.walk_go', { place: t('memory.loci.' + stop.lociId) }), 'gem');
    if (this.lociXZ && g.place?.worldPos && g.particles) {
      g.particles.confetti(g.place.worldPos(this.lociXZ.x, this.lociXZ.z, 0.9), 12);
    }
  }

  onArrive(x, z) {
    const g = this.game;
    if (g.mode !== 'walk' || this.presented || !this.lociXZ) return;
    g.pet?.notePlayerAt?.(x, z);
    if (Math.abs(x - this.lociXZ.x) + Math.abs(z - this.lociXZ.z) <= 1) this.present();
  }

  present() {
    const g = this.game;
    if (this.presented || g.mode !== 'walk') return;
    this.presented = true;
    const stop = this.walk.stops[this.i];
    audio.sfx('click');
    if (this.lociXZ && g.place?.worldPos && g.particles) {
      g.particles.confetti(g.place.worldPos(this.lociXZ.x, this.lociXZ.z, 0.9), 10);
    }
    screens.showWalkStep({
      step: this.walk.step,
      index: stop.index,
      total: this.walk.stops.length,
      lociId: stop.lociId,
      onSubmit: (value) => this.grade(value),
      onExit: () => this.leave(),
    });
  }

  // Returns true (advance) / false (wrong, let them try again) to the numpad.
  grade(value) {
    const g = this.game;
    const { correct } = gradeWalkStop(this.walk.stops[this.i], value);
    if (!correct) {
      this.streak = 0;
      audio.sfx('boop');
      return false;
    }
    this.streak += 1;
    this.correct += 1;
    this.best = Math.max(this.best, this.streak);
    audio.sfx('correct');
    // A correct stop feeds the SAME mastery the chambers use (docs/06 §4.4).
    reinforceSkill(g.profile.math, this.walk.reinforceSkill, true, { now: Date.now() });
    addBananas(g.profile, g.rng.int(BALANCE.stageBananaReward[0], BALANCE.stageBananaReward[1]));
    addEggPoints(g.profile, BALANCE.eggPerCorrect);
    persist();
    g.refreshHudCounts();
    this.i += 1;
    screens.closeScreen();
    delay(220, () => { if (this.token === g.flowToken) this.cueStop(); });
    return true;
  }

  finish() {
    const g = this.game;
    recordWalk(g.profile.memory, this.walk.id, { streak: this.best, now: Date.now() });
    persistNow();
    this.restore();
    hud.toast(t('memory.walk_done', { n: this.correct, total: this.walk.stops.length }), 'gem');
    audio.sfx('bloom');
    g.startHub();
  }

  // Stop early (the child chose to leave): still credit progress, back to the hub.
  leave() {
    const g = this.game;
    recordWalk(g.profile.memory, this.walk.id, { streak: this.best, now: Date.now() });
    persistNow();
    this.restore();
    screens.closeScreen();
    g.startHub();
  }

  restore() {
    const g = this.game;
    if (g.player) g.player.onArrive = this.savedArrive;
  }
}
