// Mimi's Check flow (docs/05): the adaptive placement & recalibration session,
// extracted from main.js. This drives the screens and the pure probe state
// machine (curriculum/checkup.js); the Game shell only routes the entry points
// (startCheckupThenHub / startCheckupFromHub). No 3D scene is involved — the
// whole flow is DOM screens over whatever place is currently standing.
import { nextProblem, recordCalibration } from './mathengine.js';
import {
  applyCheckupResult, checkupTarget, setCurriculumGroep, CONFIRM_TARGET,
  refreshCurriculumForDate,
} from './curriculum/placement.js';
import {
  createCheckup, checkupNext, checkupRecord, checkupAbort, checkupResult,
} from './curriculum/checkup.js';
import { ladderStep } from './curriculum/ladder.js';
import * as screens from './screens.js';
import { persist, todayString, addBananas } from './state.js';
import { Rng } from './rng.js';

// Onboarding forces a check exactly once; a completed check (or a legacy
// completed warm-up) is never re-forced — recalibration goes through Mimi's
// offers in the hub instead.
export function needsCheckup(profile) {
  const cur = profile?.curriculum;
  if (cur?.checkup?.completed || cur?.warmup?.completed) return false;
  return !!profile?.flags?.needsPlacementWarmup || cur?.ageAtStart != null;
}

// One check session: groep (always re-asked on a fresh run — it's one tap and
// September changes it), birthday (once, optional), then the probe loop driven
// by the pure state machine. Every answer persists into a resumable draft;
// Elo calibration is batched at settle so a rushed streak or an unscored
// bookend never writes ratings (docs/05 §3.4).
export function runCheckup(game, { onDone }) {
  const profile = game.profile;
  let machine = null;
  let settled = false;
  const settleOnce = (fn) => {
    if (settled) return;
    settled = true;
    fn?.();
  };

  const screen = screens.showCheckup({
    onSkip: () => settleOnce(() => {
      // Skipped at the setup pages: mark the check handled (Mimi keeps
      // offering later), exactly like the old warm-up skip.
      profile.curriculum = applyCheckupResult(profile.curriculum, null, { mode: 'skipped' });
      if (profile.flags) profile.flags.needsPlacementWarmup = false;
      persist();
      onDone();
    }),
    onStop: () => {
      if (!machine || settled) return;
      checkupAbort(machine);
      settleOnce(() => settleCheckup(game, machine, screen, onDone, { quit: true }));
    },
  });

  const stepLoop = () => {
    if (settled) return;
    const req = checkupNext(machine);
    if (req.type !== 'item') {
      settleOnce(() => settleCheckup(game, machine, screen, onDone, {}));
      return;
    }
    const problem = nextProblem(profile.math, {
      skill: req.skillId,
      kind: 'fetch',
      probe: { targetSuccess: CONFIRM_TARGET, scaffold: req.scaffold ?? undefined },
      rng: new Rng(`checkup:${profile.id}:${machine.runId}:${machine.answers.length}:${req.stepId}`),
      now: Date.now(),
    });
    const count = machine.answers.filter((a) => !a.unscored).length;
    screen.presentItem(problem, { count }, ({ correct, ms, tag }) => {
      checkupRecord(machine, { correct, ms, tag, difficulty: problem.difficulty });
      profile.curriculum = { ...profile.curriculum, checkupDraft: { ...machine, on: todayString() } };
      persist();
      setTimeout(stepLoop, 600); // let the praise flash land before the next card
    });
  };

  const beginProbe = () => {
    if (settled) return;
    const { targetBand, ageBand, kleuter } = checkupTarget(profile.curriculum);
    // Groep 1-2 / age ≤ 5 is never probed (docs/05 §2.5) — Mimi just plays.
    if (kleuter) {
      screen.showKleuter(() => settleOnce(() => {
        profile.curriculum = applyCheckupResult(profile.curriculum, null, { mode: 'kleuter' });
        if (profile.flags) profile.flags.needsPlacementWarmup = false;
        persist();
        onDone();
      }));
      return;
    }
    const draft = profile.curriculum.checkupDraft;
    machine = draft?.v === 1 && draft.targetBand === targetBand
      ? draft
      : Object.assign(createCheckup({ targetBand, ageBand }), { runId: Date.now().toString(36) });
    stepLoop();
  };

  const askBirthdayThen = () => {
    if (settled) return;
    if (profile.curriculum.birthDate || profile.curriculum.checkup?.completed) {
      beginProbe();
      return;
    }
    screen.askBirthday({
      onPick: (ymd) => {
        if (ymd) {
          profile.curriculum = refreshCurriculumForDate({ ...profile.curriculum, birthDate: ymd }, todayString());
          persist();
        }
        beginProbe();
      },
    });
  };

  // A pending draft resumes straight into the probe; a fresh run re-asks groep.
  if (profile.curriculum.checkupDraft?.v === 1) {
    beginProbe();
    return;
  }
  screen.askGroep({
    onPick: (groep) => {
      profile.curriculum = setCurriculumGroep(profile.curriculum, groep, { on: todayString() });
      persist();
      askBirthdayThen();
    },
  });
}

// Conclude a check: batch the Elo calibration from the accepted evidence, then
// either apply the measured placement (complete) or keep the draft (interrupted).
function settleCheckup(game, machine, screen, onDone, { quit = false } = {}) {
  const profile = game.profile;
  const result = checkupResult(machine);
  const now = Date.now();
  const from = machine.calibratedUpTo || 0;
  for (const a of machine.answers.slice(from)) {
    if (a.unscored || a.rushed || a.difficulty == null) continue;
    recordCalibration(
      profile.math,
      { skillId: a.skillId, difficulty: a.difficulty, answer: null, meta: {} },
      { correct: a.correct, ms: a.ms ?? 0 },
      { now },
    );
  }
  machine.calibratedUpTo = machine.answers.length;

  if (result.complete) {
    profile.curriculum = applyCheckupResult(profile.curriculum, result, { mode: 'probe' });
    if (profile.flags) {
      profile.flags.needsPlacementWarmup = false;
      profile.flags.checkupRequested = false;
    }
    addBananas(profile, 10); // completion reward — identical whatever the frontier
    persist();
    if (quit || result.flags.rushed) {
      onDone();
      return;
    }
    const world = result.frontier != null ? ladderStep(result.frontier)?.world : null;
    const worldEmoji = { ...screens.WORLD_EMOJI, business: '🥐', hub: '🌴' }[world] || '🌈';
    screen.showDone({ reward: 10, worldEmoji }, () => onDone());
    return;
  }
  // Interrupted before the frontier was bracketed: partial evidence is already
  // calibrated; the draft resumes next time (a rushed run starts over fresh).
  profile.curriculum = {
    ...profile.curriculum,
    checkupDraft: result.flags.rushed ? null : { ...machine, on: todayString() },
  };
  persist();
  onDone();
}
