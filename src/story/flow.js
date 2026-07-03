// Story flow — the ceremony gate on every hub entry, extracted from main.js.
// Latches newly earned hexagram lines, queues their ceremonies and the one-shot
// narrative beats (reveal, crab sighting), then hands over to the hub build.
// Sits beside the pure spine (engine.js, chapters.js); reaches the Game for
// profile/mode/playCutscene.
import { masteryReport } from '../mathengine.js';
import { eligibleSkillIds } from '../curriculum/placement.js';
import { ensureStory, refreshStoryLines, worldBands, drawNarrativeLine, markBeat } from './engine.js';
import { lineCeremonies, dueNarrativeBeat, dueSightingBeat, NARRATIVE_BEATS } from './chapters.js';
import { advanceMimiPhase } from '../mimi.js';
import * as screens from '../screens.js';
import { persist } from '../state.js';

// Mode entry point the Game shell routes startHub() through.
//
// Before the hub builds, draw any founding-hexagram lines the player just
// earned (story mode). On a real transition into the hub — returning from a
// chamber/business — play their line-draw ceremony first; on the first
// title->hub bootstrap the lines are drawn silently (a remembered older-child
// batch shouldn't front-load a pile of pop-ups before the kid even arrives).
export function enterHub(game) {
  // 'cutscene' counts as bootstrap: the only cutscene->hub path is the intro
  // (via Mimi's Check), and the first arrival must stay pop-up-free.
  const ceremonial = game.mode !== 'title' && game.mode !== 'hub' && game.mode !== 'cutscene';
  const queue = advanceStory(game, ceremonial);
  if (queue.length) { runStoryQueue(queue, () => game.hub.startHub()); return; }
  game.hub.startHub();
}

// Latch any story lines the player just earned (world mastery) and the auto
// narrative reveal, persisting as it goes. With `withCeremony`, returns an
// ordered queue of screen thunks (line-draw ceremony, then the reveal beat) to
// play before the hub builds; without it, the lines are drawn silently (the
// first title->hub bootstrap shouldn't front-load a pile of pop-ups). Pure
// failures must never block hub entry, so the whole thing is defensive.
export function advanceStory(game, withCeremony) {
  const queue = [];
  try {
    if (!game.profile) return queue;
    const report = masteryReport(game.profile.math, { now: Date.now() });
    const eligible = eligibleSkillIds(game.profile.curriculum);
    const story = ensureStory(game.profile);
    let changed = false;

    const newly = refreshStoryLines(story, report, eligible);
    // Mimi's healing arc tracks the returning friends (monotonic; never relapses).
    // Side-effect latch; it persists with the line-draw that triggered it.
    advanceMimiPhase(game.profile);
    if (newly.length) {
      changed = true;
      if (withCeremony) {
        const bands = worldBands(report, eligible);
        const kindByWorld = {};
        for (const [world, info] of Object.entries(bands)) {
          kindByWorld[world] = info.band === 'below' ? 'remembered' : 'earned';
        }
        const events = lineCeremonies(newly, kindByWorld);
        if (events.length) queue.push((done) => screens.showLineCeremony(events, { story }, done));
      }
    }

    // The Four-Directions reveal draws the second line once the first shore is
    // home — but ONLY ever through its ceremony. The beat is keyed off the line
    // state (dueNarrativeBeat), so latching the line silently on the title->hub
    // bootstrap would consume the beat and the child would never see it. On the
    // silent bootstrap we leave it pending; the next real hub transition (after a
    // chamber/business) plays it with the honest "2 of 6".
    if (withCeremony && dueNarrativeBeat(story) === 'reveal') {
      const revealIdx = NARRATIVE_BEATS.reveal.lineIndex;
      queue.push((done) => {
        drawNarrativeLine(story, revealIdx);
        persist();
        game.playCutscene('reveal', done, () => screens.showStoryBeat('reveal', { story }, done));
      });
    }

    // The Crab King sighting — the mid-game mystery drip. Once the garden line
    // (Ch03, the Eight Friends) is home, someone with big pincers starts
    // watching from the gray shore. One-shot, ceremony-gated like the reveal
    // (a silent bootstrap leaves it pending so the child never misses it),
    // and marked only when it actually shows.
    if (withCeremony && dueSightingBeat(story)) {
      queue.push((done) => {
        markBeat(story, 'crab_sighting');
        persist();
        game.playCutscene('sighting', done, () => screens.showStoryBeat('sighting', { story }, done));
      });
    }

    if (changed) persist();
  } catch (e) {
    // Story must never block hub entry (anti-anxiety), but a silent swallow hides
    // real regressions — surface it in dev/test so a broken spine is visible.
    if (import.meta.env.DEV) console.error('[story] advanceStory failed (hub entry continues):', e);
    return [];
  }
  return queue;
}

// Play a sequence of story-screen thunks (each calls its callback when done),
// then the final continuation.
export function runStoryQueue(queue, done) {
  const step = (i) => {
    if (i >= queue.length) { done(); return; }
    queue[i](() => step(i + 1));
  };
  step(0);
}
