// App flow — the DOM screen flows that sit in front of (or on top of) the 3D
// game: title/attract, player picker, parent dashboard, and settings. Extracted
// from main.js; each flow takes the Game and drives screens.js, reaching back
// into the shell only through its public surface (startHub, playCutscene,
// startCheckupThenHub, startDuelSetup, afterLanguageChange, refreshHudCounts).
import { profiles, activeProfile, selectProfile, persist, persistNow, todayString } from './state.js';
import { masteryReport } from './mathengine.js';
import { applyParentPatch } from './curriculum/placement.js';
import { aggregateBusinessReport } from './business/engine.js';
import { stageReport } from './stage/engine.js';
import { needsCheckup } from './checkupflow.js';
import * as screens from './screens.js';
import * as hud from './hud.js';
import { audio } from './audio.js';

export function showTitle(game) {
  game.mode = 'title';
  game.setScene(null);
  game.flowToken++;
  game.hubWelcomed = false;
  hud.showHud(false);
  game.clearPlace();
  game.player = null;
  game.pet = null;
  audio.music(null);
  // the island itself is the title screen: a fully bloomed grove, alive
  // behind the logo — the game advertising the game
  game.hub.buildAttractIsland();
  screens.showAttract({
    onStart: () => showPlayerSelect(game),
    onParents: () => showParentSelect(game),
    onDuel: () => game.startDuelSetup(),
    onLangChange: () => game.place?.refreshLanguage?.(),
  });
}

export function showParentSelect(game, onBack = () => showTitle(game)) {
  screens.showParentProfileSelect({
    profiles: profiles(),
    onChoose: (profileId) => showParents(game, profileId, () => showParentSelect(game, onBack)),
    onBack,
  });
}

// Parent dashboard: mastery + curriculum coverage, and the controls that edit
// birthday / pack / stage / strictness (each re-renders this screen).
export function showParents(game, profileId = null, onClose = () => showTitle(game)) {
  const p = profileId
    ? profiles().find((profile) => profile.id === profileId) || null
    : activeProfile();
  screens.showParents({
    report: p ? masteryReport(p.math, { now: Date.now() }) : null,
    profile: p,
    businessReport: p?.business ? aggregateBusinessReport(p) : null,
    stageReport: p?.stage ? stageReport(p.stage) : null,
    onCurriculumChange: (patch) => {
      if (!p) return;
      p.curriculum = applyParentPatch(p.curriculum, patch, { on: todayString() });
      persistNow();
      showParents(game, p.id, onClose);
    },
    // Queues Mimi's offer for the child's next hub visit (docs/05 §3.1.4).
    onRequestCheckup: p ? () => {
      p.flags = p.flags || {};
      p.flags.checkupRequested = true;
      persistNow();
      showParents(game, p.id, onClose);
    } : null,
    onClose,
  });
}

// Player picker / new-explorer form: new or intro-unseen profiles go through
// the story, then Mimi's Check if their curriculum needs placing, then the hub.
export function showPlayerSelect(game) {
  screens.showTitle({
    onLangChange: () => game.place?.refreshLanguage?.(),
    onPlay: (pid, isNew) => {
      game.profile = selectProfile(pid);
      if (!game.profile) return;
      const continueFromIntro = () => {
        game.profile.flags.introSeen = true;
        persist();
        if (needsCheckup(game.profile)) game.startCheckupThenHub();
        else game.startHub();
      };
      if (isNew || !game.profile.flags.introSeen) {
        // the theft, played by the engine itself (DOM cards as fallback)
        game.playCutscene('intro', continueFromIntro, () => screens.showStory(continueFromIntro));
      } else if (needsCheckup(game.profile)) game.startCheckupThenHub();
      else game.startHub();
    },
    onParents: () => showParentSelect(game, () => showPlayerSelect(game)),
    onDuel: () => game.startDuelSetup(),
  });
}

export async function openSettings(game, devOpen = false) {
  hud.hideBubble();
  let devTools = null;
  if (import.meta.env.DEV) {
    const mod = await import('./devtools.js');
    const summary = mod.describeDevState(game.profile, game.profile ? masteryReport(game.profile.math, { now: Date.now() }) : null);
    devTools = {
      open: devOpen,
      ...mod.renderDevTools({ summary, presets: mod.DEV_PRESETS, open: devOpen }),
      onToggle: (open) => openSettings(game, open),
      onApply: (id) => {
        const preset = mod.applyDevPreset(game.profile, id);
        if (!preset) return;
        persistNow();
        afterDevPresetApplied(game, preset);
        openSettings(game, true);
      },
      onManual: (values) => {
        const result = mod.applyManualDevState(game.profile, values);
        if (!result) return;
        persistNow();
        afterDevPresetApplied(game, result);
        openSettings(game, true);
      },
    };
  }
  screens.showSettings({
    onClose: () => screens.closeScreen(),
    onSwitchPlayer: () => showTitle(game),
    onLangChange: () => game.afterLanguageChange(),
    devTools,
  });
}

function afterDevPresetApplied(game, preset) {
  hud.toast(`Dev preset: ${preset.label}`);
  if (game.mode === 'hub') {
    game.hub.buildHub();
    hud.showHud(true);
    game.refreshHudCounts();
    return;
  }
  if (game.mode !== 'title') game.startHub();
}
