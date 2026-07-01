// Placement + compaction over the 64-step ladder (SUPER_PROMPT Phase 3, docs/04 §4):
// one ladder for everyone; placement walks DOWN from the age-Target band to the frontier,
// compaction clears the solid steps below it, and real ~65% practice concentrates at the
// child's actual edge. Proven on the three reference learners A (grade 3), B (grade 6),
// C (grade 8) — the canonical "does a late starter live the whole story without grinding
// baby math?" question.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { SKILLS, WORLDS, BUSINESS_WORLD } from '../src/mathengine.js';
import { LADDER_STEPS } from '../src/curriculum/ladder.js';
import {
  placeOnLadder, targetStepForStage, demoteStep, placeForCurriculum,
  PRACTICE_TARGET, CONFIRM_TARGET,
} from '../src/curriculum/placement.js';
import { createCurriculumState } from '../src/curriculum/placement.js';

// A masteryReport skeleton (four worlds + the business group) with a chosen set of
// mastered skill ids — mirrors the real engine shape placeOnLadder reads.
function reportWith(mastered = []) {
  const set = new Set(mastered);
  const worlds = {};
  for (const w of WORLDS) worlds[w] = { pct: 0, skills: [] };
  const business = { pct: 0, skills: [] };
  for (const id of Object.keys(SKILLS)) {
    const entry = { id, mastered: set.has(id) };
    if (SKILLS[id].world === BUSINESS_WORLD) business.skills.push(entry);
    else worlds[SKILLS[id].world].skills.push(entry);
  }
  return { worlds, business };
}

const FOUNDATION = ['counting', 'number_bonds', 'add_20', 'sub_20', 'missing_addend'];
const THROUGH_G5 = [
  ...FOUNDATION, 'add_100', 'sub_100',
  'tables_a', 'tables_b', 'tables_c', 'tables_mix', 'mult_2digit',
  'div_facts', 'share', 'div_remainder', 'missing_factor',
];
const THROUGH_G7 = [
  ...THROUGH_G5, 'big_numbers',
  'frac_magnitude', 'frac_compare', 'frac_equiv', 'frac_of_n',
  'dec_compare', 'dec_addsub', 'dec_muldiv', 'frac_dec_pct', 'percent_of',
];

const stepsBetween = (lo, hi) => LADDER_STEPS.filter((s) => s.id >= lo && s.id <= hi).map((s) => s.id);

test('the two success targets are practice ~65% and confirm ~85-90%', () => {
  assert.ok(PRACTICE_TARGET > 0.6 && PRACTICE_TARGET < 0.7);
  assert.ok(CONFIRM_TARGET >= 0.85 && CONFIRM_TARGET <= 0.9);
});

test('targetStepForStage maps a grade band to the top of its eight steps', () => {
  assert.equal(targetStepForStage('NL_PO', 'grade_1'), 7);
  assert.equal(targetStepForStage('NL_PO', 'grade_3'), 23);
  assert.equal(targetStepForStage('NL_PO', 'grade_6'), 47);
  assert.equal(targetStepForStage('NL_PO', 'grade_8'), 63);
});

test('learner A (grade 3, slow): entry is low, higher worlds stay locked future', () => {
  const place = placeOnLadder(reportWith(FOUNDATION), { targetStep: 23 });
  // counting/bonds/+- to 20 are solid -> compacted; the frontier sits inside the grade-3
  // band where real practice begins.
  for (const id of [0, 1, 2, 3, 4, 8, 9]) assert.equal(place.perStep[id], 'compacted', `step ${id}`);
  assert.ok(place.frontier <= 23 && place.frontier >= 16, `frontier ${place.frontier}`);
  // nothing above the age ceiling is ever a gate — it is locked future, not practice.
  for (const id of stepsBetween(24, 63)) assert.equal(place.perStep[id], 'locked', `step ${id}`);
});

test('learner B (grade 6): breezes groep 1-3, practises only the loose fractions', () => {
  const place = placeOnLadder(reportWith(THROUGH_G5), { targetStep: 47 });
  // the whole of groep 1-3 (steps 0-23) is solid -> NEVER active practice (the age fix).
  for (const id of stepsBetween(0, 23)) {
    assert.notEqual(place.perStep[id], 'active', `groep-3 step ${id} must not be a practice gate`);
  }
  // the frontier sits up in the grade-6 fraction work, their genuine edge.
  assert.equal(place.frontier, 47);
  assert.ok(place.practicing.every((id) => id >= 24), `practice only above groep 3: ${place.practicing}`);
});

test('learner C (grade 8 late start): lives the whole ladder, practises only the grade-8 edge', () => {
  const place = placeOnLadder(reportWith(THROUGH_G7), { targetStep: 63 });
  // every groep 1-6 step is compacted — no baby math grind for a late starter.
  for (const id of stepsBetween(0, 47)) {
    assert.notEqual(place.perStep[id], 'active', `lower step ${id} must not be a grind`);
  }
  // the loose grade-8 skills (percent_adv step 62, scale steps 54/63) are the real edge.
  assert.equal(place.frontier, 63);
  assert.ok(place.practicing.includes(62), 'percent_adv is practised');
  assert.ok(place.practicing.includes(54), 'scale is practised');
});

test('a fully-solid child has no frontier (everything to the ceiling is compacted)', () => {
  const place = placeOnLadder(reportWith(THROUGH_G7), { targetStep: 23 });
  assert.equal(place.frontier, null);
  for (const id of stepsBetween(0, 23)) assert.equal(place.perStep[id], 'compacted');
});

test('compaction demotion: a missed confirm becomes practice and drops the frontier', () => {
  const place = placeOnLadder(reportWith(THROUGH_G5), { targetStep: 47 });
  // a confirmed groep-3 step (16, solid via add_100) is missed during spaced review.
  assert.equal(place.perStep[16], 'compacted');
  const after = demoteStep(place, 16);
  assert.equal(after.perStep[16], 'active');
  assert.equal(after.frontier, 16, 'the frontier drops to the surfaced gap');
  assert.ok(after.practicing.includes(16));
});

test('placeForCurriculum uses the child stage; an 11-year-old at groep 6 never gates on groep 3', () => {
  const curriculum = createCurriculumState({ age: 11 }); // grade_8 by age...
  curriculum.confirmedStage = 'grade_6';                 // ...but parent-confirmed at groep 6
  const place = placeForCurriculum(curriculum, reportWith(THROUGH_G5));
  assert.equal(place.targetStep, 47);
  for (const id of stepsBetween(0, 23)) assert.notEqual(place.perStep[id], 'active');
});
