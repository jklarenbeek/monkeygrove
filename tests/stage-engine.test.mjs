import { test } from 'vitest';
import assert from 'node:assert/strict';
import { Rng } from '../src/rng.js';
import { createCurriculumState } from '../src/curriculum/placement.js';
import { coverageForReport, listObjectives } from '../src/curriculum/index.js';
import {
  NOTE_TILES, STAGE_MODES, STAGE_MODE_IDS, WHOLE_BAR,
} from '../src/stage/data.js';
import {
  createStageState,
  ensureStageState,
  gradeStageRound,
  nextStageRound,
  recordStageAttempt,
  stageReport,
  stageSongs,
} from '../src/stage/engine.js';

const sumUnits = (ids) => ids.reduce((s, id) => s + NOTE_TILES[id].units, 0);

test('fresh stage state is empty and heals additively on old saves', () => {
  const state = createStageState();
  assert.deepEqual(state.progress, {});
  assert.deepEqual(state.level, {});

  const profile = { stage: { progress: { echo: { attempts: 2, correct: 1 } } } };
  const healed = ensureStageState(profile);
  assert.deepEqual(healed.progress.echo, { attempts: 2, correct: 1 });
  assert.deepEqual(healed.level, {}); // missing field filled
  assert.ok(Array.isArray(healed.seen));
});

test('songs unlock by grade so difficulty ramps along the journey', () => {
  const g1 = stageSongs(createCurriculumState({ age: 4 })); // grade 1
  const byId = Object.fromEntries(g1.map((s) => [s.id, s]));
  assert.equal(byId.echo.unlocked, true, 'the echo song is playable from the start');
  assert.equal(byId.count.unlocked, false, 'the counting song is still locked in grade 1');
  assert.equal(byId.beat.unlocked, false, 'the beat bar is still locked in grade 1');

  const g6 = Object.fromEntries(stageSongs(createCurriculumState({ age: 9 })).map((s) => [s.id, s]));
  assert.ok(g6.echo.unlocked && g6.count.unlocked && g6.beat.unlocked, 'all three songs are open by grade 6');
});

test('echo rounds grow with grade and level, staying within pad range', () => {
  const rng = new Rng('echo-1');
  const young = nextStageRound('echo', createCurriculumState({ age: 4 }), { rng, level: 0 });
  const older = nextStageRound('echo', createCurriculumState({ age: 11 }), { rng, level: 3 });

  assert.equal(young.mode, 'echo');
  assert.equal(young.sequence.length, young.length);
  assert.ok(young.length >= 3 && young.length <= 8);
  assert.ok(older.length > young.length, 'grade + level make the pattern longer');
  assert.ok(older.length <= 8, 'but never overwhelming');
  for (const note of older.sequence) assert.ok(note >= 0 && note <= 3, 'notes stay in the four pads');
});

test('counting rounds ring on the multiples of a grade-appropriate step', () => {
  const round = nextStageRound('count', createCurriculumState({ age: 7 }), { rng: new Rng('count-1') });
  assert.equal(round.mode, 'count');
  assert.ok([2, 5, 10].includes(round.step), 'grade 4 counts by landmark steps');
  assert.deepEqual(round.targets, Array.from({ length: Math.floor(round.beats / round.step) }, (_, i) => (i + 1) * round.step));
  assert.ok(round.targets.length >= 3, 'always at least three gong beats to find');
});

test('beat rounds offer only grade-appropriate note tiles and a valid hint combo', () => {
  const round = nextStageRound('beat', createCurriculumState({ age: 8 }), { rng: new Rng('beat-1') }); // grade 5
  assert.equal(round.target, WHOLE_BAR);
  for (const id of round.tiles) assert.ok(['half', 'quarter'].includes(id), 'grade 5 uses halves & quarters only');
  assert.equal(sumUnits(round.answer), WHOLE_BAR, 'the hint combo fills exactly one bar');
});

test('grading: echo needs the same order, counting needs the exact multiples', () => {
  const echo = { mode: 'echo', sequence: [0, 2, 1] };
  assert.equal(gradeStageRound(echo, { sequence: [0, 2, 1] }).correct, true);
  assert.equal(gradeStageRound(echo, { sequence: [0, 1, 2] }).correct, false); // order matters
  assert.equal(gradeStageRound(echo, { sequence: [0, 2] }).correct, false);    // length matters

  const count = { mode: 'count', step: 3, beats: 9, targets: [3, 6, 9] };
  assert.equal(gradeStageRound(count, { beats: [3, 6, 9] }).correct, true);
  assert.equal(gradeStageRound(count, { beats: [9, 3, 6] }).correct, true, 'order does not matter for the set');
  assert.equal(gradeStageRound(count, { beats: [3, 6] }).correct, false);
});

test('grading: the beat bar is correct only when the notes add to one whole', () => {
  const beat = { mode: 'beat', target: WHOLE_BAR };
  assert.equal(gradeStageRound(beat, { tiles: ['half', 'half'] }).correct, true);
  assert.equal(gradeStageRound(beat, { tiles: ['half', 'quarter', 'quarter'] }).correct, true);
  assert.equal(gradeStageRound(beat, { tiles: ['half', 'quarter'] }).correct, false); // 3/4, short
});

test('a wrong answer is tagged in the misconception vocabulary the worlds use', () => {
  // counting by the neighbouring table is the classic skip-count slip
  const count = { mode: 'count', step: 3, beats: 12, targets: [3, 6, 9, 12] };
  assert.equal(gradeStageRound(count, { beats: [2, 4, 6, 8, 10, 12] }).tag, 'off_by_table');
  // overfilling the bar is "more is bigger" — whole-number bias over fractions
  const beat = { mode: 'beat', target: WHOLE_BAR };
  assert.equal(gradeStageRound(beat, { tiles: ['half', 'half', 'quarter'] }).tag, 'whole_number_bias');
});

test('recording an attempt tracks progress and gently raises the difficulty level', () => {
  const state = createStageState();
  recordStageAttempt(state, 'echo', false);
  assert.deepEqual(state.progress.echo, { attempts: 1, correct: 0 });
  assert.equal(state.level.echo || 0, 0, 'a miss does not raise the level');
  recordStageAttempt(state, 'echo', true);
  assert.equal(state.progress.echo.correct, 1);
  assert.equal(state.level.echo, 1, 'a correct round raises the level');
});

test('stageReport summarizes per-song coverage like the business report', () => {
  const state = createStageState();
  state.progress.count = { attempts: 4, correct: 4 };
  state.progress.beat = { attempts: 2, correct: 1 };
  const report = stageReport(state);
  assert.equal(report.modes.count.coverage, 'covered');
  assert.equal(report.modes.beat.coverage, 'partial');
  assert.equal(report.modes.echo.coverage, 'playable');
});

test('every song maps to a real NL_PO objective that lists it as a stageMode', () => {
  const objectives = new Map(listObjectives('NL_PO').map((o) => [o.id, o]));
  for (const id of STAGE_MODE_IDS) {
    const mode = STAGE_MODES[id];
    const objective = objectives.get(mode.objectiveId);
    assert.ok(objective, `${id} maps to ${mode.objectiveId}`);
    assert.ok((objective.stageModes || []).includes(id), `${mode.objectiveId} lists stageMode ${id}`);
  }
});

test('coverageForReport credits stage practice beside math and business', () => {
  const state = createStageState();
  state.progress.count = { attempts: 4, correct: 4 }; // covers tables_2_5_10
  const coverage = coverageForReport('NL_PO', { worlds: {} }, { stage: stageReport(state) });
  const tables = coverage.domains.operations.objectives.find((o) => o.id === 'nl_po.grade4.tables_2_5_10');
  assert.equal(tables.coverage, 'covered');
});
