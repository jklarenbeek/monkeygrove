// Music-stage minigame — pure logic (no DOM, no three.js). Round generation, grading,
// and per-song progress for Kiki's three songs. Difficulty is driven by the child's
// curriculum stage (grade) plus a gentle per-song `level` that rises with each correct
// round, so the stage grows with the player. Deterministic when handed a seeded Rng.
import { getPack } from '../curriculum/index.js';
import {
  BEAT_TILES,
  COUNT_STEPS,
  ECHO_PADS,
  NOTE_TILES,
  STAGE_MODES,
  STAGE_MODE_IDS,
  WHOLE_BAR,
  stageOrder,
} from './data.js';

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// ---------------------------------------------------------------- state -----

export function createStageState() {
  return { progress: {}, level: {}, seen: [], currentDay: 1 };
}

export function ensureStageState(profile) {
  if (!profile.stage || typeof profile.stage !== 'object' || Array.isArray(profile.stage)) {
    profile.stage = createStageState();
  }
  const ref = createStageState();
  for (const [key, value] of Object.entries(ref)) {
    if (profile.stage[key] === undefined) profile.stage[key] = structuredClone(value);
  }
  if (typeof profile.stage.progress !== 'object' || profile.stage.progress === null) profile.stage.progress = {};
  if (typeof profile.stage.level !== 'object' || profile.stage.level === null) profile.stage.level = {};
  if (!Array.isArray(profile.stage.seen)) profile.stage.seen = [];
  return profile.stage;
}

function curriculumStage(curriculum) {
  const pack = getPack(curriculum?.packId);
  const id = curriculum?.confirmedStage || curriculum?.estimatedStage || 'grade_4';
  return pack.stages.some((stage) => stage.id === id) ? id : 'grade_4';
}

// The song list for the stage menu: every song, flagged unlocked/locked by the child's
// grade so difficulty ramps (locked songs still show, with the grade they open in).
export function stageSongs(curriculum) {
  const order = stageOrder(curriculumStage(curriculum));
  return STAGE_MODE_IDS.map((id) => {
    const mode = STAGE_MODES[id];
    return { ...mode, unlocked: order >= stageOrder(mode.minStage), unlocksStage: mode.minStage };
  });
}

// -------------------------------------------------------------- rounds ------

const defaultRng = {
  int: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),
  pick: (xs) => xs[Math.floor(Math.random() * xs.length)],
};

// Echo Song: a growing pattern of pad taps to repeat back. Length grows with grade and
// with the per-song level (each correct round adds a note), capped so it stays gentle.
function echoRound(order, level, rng) {
  const length = clamp(3 + Math.floor((order - 1) / 2) + level, 3, 8);
  const sequence = Array.from({ length }, () => rng.int(0, ECHO_PADS.length - 1));
  return { mode: 'echo', kind: 'sequence', sequence, length };
}

// Counting Song: ring the gong on every beat that is a multiple of `step`. The step pool
// widens with grade (2/5/10 → 3/4/6 → 7/8/9); the beat count grows too. targets is the
// set of gong-beats (the answer). A grade-8 child still meets easy steps (spaced review).
function countRound(order, level, rng) {
  const pool = COUNT_STEPS.filter((band) => order >= stageOrder(band.minStage)).flatMap((band) => band.steps);
  const step = rng.pick(pool.length ? pool : [2]);
  const beats = Math.max(step * 3, order >= 6 ? 24 : order >= 4 ? 20 : 12);
  const targets = [];
  for (let n = step; n <= beats; n += step) targets.push(n);
  return { mode: 'count', kind: 'skip', step, beats, targets };
}

// Known-good ways to fill exactly one bar; a hint example is drawn from the ones the
// grade's tiles allow (grading only checks the sum, so this is just for the 💡 nudge).
const BEAT_COMBOS = [
  ['half', 'quarter', 'quarter'],
  ['quarter', 'quarter', 'quarter', 'quarter'],
  ['half', 'half'],
  ['half', 'quarter', 'eighth', 'eighth'],
  ['third', 'third', 'third'],
  ['half', 'third', 'sixth'],
];

// Beat Bar: choose note values that add up to exactly one whole bar. Tiles widen with
// grade (halves/quarters → +eighths → +thirds/sixths). `answer` is one valid combo (hint).
function beatRound(order, level, rng) {
  const tiles = BEAT_TILES.filter((band) => order >= stageOrder(band.minStage)).flatMap((band) => band.tiles);
  const allowed = [...new Set(tiles.length ? tiles : ['half', 'quarter'])];
  const valid = BEAT_COMBOS.filter((combo) => combo.every((id) => allowed.includes(id)));
  const answer = rng.pick(valid.length ? valid : [['quarter', 'quarter', 'quarter', 'quarter']]);
  return { mode: 'beat', kind: 'notevalue', target: WHOLE_BAR, tiles: allowed, answer };
}

const GENERATORS = { echo: echoRound, count: countRound, beat: beatRound };

export function nextStageRound(modeId, curriculum, opts = {}) {
  const mode = STAGE_MODES[modeId] || STAGE_MODES.echo;
  const rng = opts.rng ?? defaultRng;
  const order = stageOrder(curriculumStage(curriculum));
  const level = Math.max(0, opts.level || 0);
  const round = GENERATORS[mode.id](order, level, rng);
  return { id: `stage-${mode.id}-${order}-${level}`, objectiveId: mode.objectiveId, ...round };
}

// -------------------------------------------------------------- grading -----

const seqEqual = (a = [], b = []) => a.length === b.length && a.every((v, i) => Number(v) === Number(b[i]));
const setEqual = (a = [], b = []) => {
  const sa = new Set(a.map(Number));
  const sb = new Set(b.map(Number));
  return sa.size === sb.size && [...sa].every((v) => sb.has(v));
};

// Name the miss in the misconception vocabulary the worlds use, so the helper can explain
// it (the count song's classic slip is off-by-a-table; the others are simple near misses).
export function classifyStageMiss(round, action = {}) {
  if (round.mode === 'count') {
    const taps = (action.beats || []).map(Number);
    // every tap is a multiple of a *neighbouring* step (counted by the wrong table)
    for (const alt of [round.step - 1, round.step + 1]) {
      if (alt > 1 && taps.length && taps.every((n) => n % alt === 0)) return 'off_by_table';
    }
    return 'near_miss';
  }
  if (round.mode === 'beat') {
    const total = (action.tiles || []).reduce((sum, id) => sum + (NOTE_TILES[id]?.units || 0), 0);
    if (total > round.target) return 'whole_number_bias'; // overfilled the bar (more is "bigger")
    return 'near_miss';
  }
  return 'near_miss';
}

export function gradeStageRound(round, action = {}) {
  let correct = false;
  if (round.mode === 'echo') correct = seqEqual(action.sequence, round.sequence);
  else if (round.mode === 'count') correct = setEqual(action.beats, round.targets);
  else if (round.mode === 'beat') {
    correct = (action.tiles || []).reduce((sum, id) => sum + (NOTE_TILES[id]?.units || 0), 0) === round.target;
  }
  return { correct, tag: correct ? 'correct' : classifyStageMiss(round, action) };
}

// --------------------------------------------------------------- record -----

export function recordStageAttempt(state, modeId, correct) {
  if (!state.progress[modeId]) state.progress[modeId] = { attempts: 0, correct: 0 };
  state.progress[modeId].attempts += 1;
  if (correct) {
    state.progress[modeId].correct += 1;
    state.level[modeId] = Math.min(5, (state.level[modeId] || 0) + 1); // gently harder next time
  }
  return { mode: modeId, correct, recorded: true };
}

// Per-song coverage for the parent dashboard, mirroring dailyBusinessReport: a song is
// 'covered' once it has 3 correct at ≥80%, 'partial' once tried, else 'playable'.
export function stageReport(state) {
  const modes = {};
  for (const id of STAGE_MODE_IDS) {
    const stats = state?.progress?.[id] ?? { attempts: 0, correct: 0 };
    const rate = stats.attempts ? stats.correct / stats.attempts : 0;
    modes[id] = {
      ...stats,
      rate,
      coverage: stats.correct >= 3 && rate >= 0.8 ? 'covered' : stats.attempts > 0 ? 'partial' : 'playable',
    };
  }
  return { modes };
}
