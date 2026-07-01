// StageController — owns Kiki's music-stage flow: everything between tapping the gong and
// leaving the stage. The Game shell sets up the scene in Game.startStage(), then hands
// control here. Like the BusinessController it reaches the Game only through a small
// surface: profile, place, rng, mode, startHub(), afterResult(), and refreshHudCounts().
import { t } from '../i18n.js';
import * as hud from '../hud.js';
import * as screens from '../screens.js';
import { audio } from '../audio.js';
import { persist, persistNow, addBananas, addEggPoints } from '../state.js';
import { Rng } from '../rng.js';
import { BALANCE } from '../config.js';
import { nextWonderFor } from '../story/wonders.js';
import {
  ensureStageState,
  gradeStageRound,
  nextStageRound,
  recordStageAttempt,
  stageSongs,
} from './engine.js';

export class StageController {
  constructor(game) {
    this.game = game;
    this.songId = null;   // the song currently being played
    this.round = null;    // the active round data
    this.roundSeq = 0;    // bumps each round so the seed differs
  }

  state() {
    return ensureStageState(this.game.profile);
  }

  gradeLabel(stageId) {
    return t('curriculum.nl_po.stage.' + stageId);
  }

  // Entry point (Game.startStage calls this once the scene is built).
  open() {
    this.showSongs();
  }

  showSongs() {
    screens.showStageSongs({
      songs: stageSongs(this.game.profile.curriculum),
      gradeLabel: (stageId) => this.gradeLabel(stageId),
      onPlay: (songId) => this.playSong(songId),
      onExit: () => this.leave(),
    });
  }

  playSong(songId) {
    const state = this.state();
    const level = state.level?.[songId] || 0;
    const rng = new Rng(`stage:${this.game.profile.id}:${songId}:${state.currentDay}:${this.roundSeq++}`);
    this.songId = songId;
    this.round = nextStageRound(songId, this.game.profile.curriculum, { rng, level });
    this.showRound();
  }

  showRound() {
    if (!this.round) { this.showSongs(); return; }
    const shared = {
      round: this.round,
      onNote: (i) => audio.pad(i),
      onSubmit: (action) => this.grade(action),
      onClose: () => this.showSongs(),
    };
    if (this.round.mode === 'echo') screens.showStageEcho(shared);
    else if (this.round.mode === 'count') screens.showStageCount(shared);
    else screens.showStageBeat(shared);
  }

  grade(action) {
    const state = this.state();
    const result = gradeStageRound(this.round, action);
    recordStageAttempt(state, this.songId, result.correct);
    persist();
    if (!result.correct) {
      audio.sfx('boop');
      return { correct: false }; // wrong: panel stays and offers a hint
    }
    audio.sfx('gong');
    audio.sfx('correct');
    this.reward();
    this.maybeStageWonder();
    hud.toast(t('stage.correct'));
    // hatch a full egg (shared result flow), then play a fresh, slightly harder round
    this.game.afterResult(() => this.playSong(this.songId));
    return { correct: true };
  }

  reward() {
    const bananas = this.game.rng.int(BALANCE.stageBananaReward[0], BALANCE.stageBananaReward[1]);
    addBananas(this.game.profile, bananas);
    addEggPoints(this.game.profile, BALANCE.eggPerCorrect);
    persist();
    this.game.refreshHudCounts();
    const place = this.game.place;
    if (place?.fx && place.gongWorld) {
      place.fx.emit(place.gongWorld(), 22, { colors: [0xffd166, 0xff9db0, 0x8ecae6, 0xa0e8af], speed: 1.8, up: 2.6, life: 900 });
    }
  }

  // A gentle one-time reveal that the music stage IS skip-counting (SUPER_PROMPT Phase 7):
  // the same 3, 6, 9 you ring on the gong are the threes you skip-count in the Garden.
  maybeStageWonder() {
    const p = this.game.profile;
    const card = nextWonderFor('music', p.flags?.wondersSeen || []);
    if (!card) return;
    p.flags.wondersSeen = p.flags.wondersSeen || [];
    p.flags.wondersSeen.push(card.id);
    persist();
    hud.say(`✨ ${t(card.bodyKey)}`, { face: '🐱' });
  }

  leave() {
    persistNow();
    this.game.startHub();
    return true;
  }

  // A tap on the gong (or Kiki) opens the song menu.
  stageTap(x, z) {
    if (this.game.mode !== 'stage') return false;
    if (!this.game.place?.isGong?.(x, z)) return false;
    audio.sfx('gong');
    this.showSongs();
    return true;
  }

  // Re-render the open overlay in the freshly chosen language.
  refreshLanguage() {
    this.game.place?.refreshLanguage?.();
    const open = document.querySelector('#screens .screen');
    if (!open) return;
    if (open.querySelector('#stage-close')) this.showSongs();
    else if (this.round && open.querySelector('#stage-done')) this.showRound();
  }
}
