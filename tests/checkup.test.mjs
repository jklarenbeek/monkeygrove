// Mimi's Check (docs/05-mimi-check.md): the adaptive placement probe. The heart
// of this suite is docs/05 §5 — the reference children driven through the pure
// state machine — plus the curriculum-state plumbing, Mimi's offer logic, the
// engine's confirm-target probes, and the screen/flow wiring.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import {
  createCheckup, checkupNext, checkupRecord, checkupAbort, checkupResult,
  bandProbePoints, fluentMsFor, CHECKUP_MAX_ITEMS,
} from '../src/curriculum/checkup.js';
import {
  createCurriculumState, setCurriculumGroep, checkupTarget, applyCheckupResult,
  functioneringsniveau, eligibleObjectives, CONFIRM_TARGET,
} from '../src/curriculum/placement.js';
import { checkupSuggestion, checkupFresh, mimiLines } from '../src/mimi.js';
import { createMathState, nextProblem, recordCalibration } from '../src/mathengine.js';
import { Rng } from '../src/rng.js';

// ---------- a simulated child ----------
// Answers every probe from a fixed ability: bands ≤ solidThrough are correct and
// fast; everything above is wrong (slow enough to never look like rushing).
// slowBands answer correctly but over the fluency norm.
function simulate(machine, { solidThrough, slowBands = [] }) {
  for (let guard = 0; guard < 100; guard++) {
    const req = checkupNext(machine);
    if (req.type !== 'item') break;
    const band = req.stepId >> 3;
    const knows = band <= solidThrough;
    const slow = slowBands.includes(band);
    checkupRecord(machine, {
      correct: knows,
      ms: knows ? (slow ? fluentMsFor(req.skillId) + 5000 : 2000) : 8000,
      tag: knows ? 'correct' : 'addsub_confuse',
      difficulty: 520,
    });
  }
  return checkupResult(machine);
}

// ---------- the ladder's probe points ----------

test('every probeable band has at least two signature skills, disjoint across bands', () => {
  const seen = new Set();
  for (let b = 1; b <= 7; b++) {
    const points = bandProbePoints(b);
    assert.ok(points.length >= 2, `band ${b} has ${points.length} probe points`);
    for (const p of points) {
      assert.equal(p.stepId >> 3, b, `step ${p.stepId} sits in band ${b}`);
      assert.ok(!seen.has(p.skillId), `${p.skillId} appears in one band only`);
      seen.add(p.skillId);
    }
  }
});

// ---------- docs/05 §5 scenarios ----------

test('scenario 1 — on-track groep 5: short check, frontier in the target band', () => {
  const m = createCheckup({ targetBand: 4, ageBand: 4 });
  const result = simulate(m, { solidThrough: 3 });
  assert.ok(result.complete);
  assert.equal(result.frontier >> 3, 4, `frontier ${result.frontier} in band 4`);
  assert.ok(result.itemsAsked <= 9, `${result.itemsAsked} items stays short`);
  const cur = applyCheckupResult(createCurriculumState({ age: 8 }), result);
  assert.equal(cur.placementBand, 'on_track');
});

test('scenario 2 — zittenblijver (age 9, groep 4): groep prior wins, no above-target items', () => {
  let cur = createCurriculumState({ age: 9 });                    // age says grade_6
  cur = setCurriculumGroep(cur, 4, { on: '2026-07-01' });         // child says groep 4
  const { targetBand, ageBand, kleuter } = checkupTarget(cur);
  assert.equal(targetBand, 3, 'target from groep, not age');
  assert.equal(ageBand, 5);
  assert.equal(kleuter, false);

  const m = createCheckup({ targetBand, ageBand });
  assert.equal(m.startBand, 1, 'age ≫ groep starts one band gentler');
  const result = simulate(m, { solidThrough: 2 });
  assert.ok(result.complete);
  assert.equal(result.frontier >> 3, 3, 'frontier in the groep band');
  for (const a of result.answers) {
    assert.ok((a.stepId >> 3) <= 3, `step ${a.stepId} never above the groep target`);
  }
});

test('scenario 3 — struggling groep 8: descent finds a frontier far below, within budget', () => {
  const m = createCheckup({ targetBand: 7, ageBand: 7 });
  const result = simulate(m, { solidThrough: 4 });
  assert.ok(result.complete);
  assert.equal(result.frontier >> 3, 5, 'frontier two bands under the groep');
  assert.ok(result.itemsAsked <= CHECKUP_MAX_ITEMS);
  const cur = applyCheckupResult(createCurriculumState({ age: 12 }), result);
  assert.equal(cur.placementBand, 'below');
  // practice window hugs the frontier — stages 6..7, far below the groep-8 floor
  const stages = [...new Set(eligibleObjectives(cur).map((o) => o.stage))].sort();
  assert.deepEqual(stages, ['grade_6', 'grade_7']);
});

test('scenario 4 — versneld (age 7, groep 5): ceiling groep+2 honored, all-clear reads ahead', () => {
  let cur = createCurriculumState({ age: 7 });
  cur = setCurriculumGroep(cur, 5, { on: '2026-07-01' });
  const { targetBand, ageBand } = checkupTarget(cur);
  assert.equal(targetBand, 4);
  const m = createCheckup({ targetBand, ageBand });
  assert.equal(m.ceilingBand, 6, 'ceiling = groep band + 2');
  const result = simulate(m, { solidThrough: 7 });
  assert.ok(result.complete);
  assert.equal(result.allClear, true);
  assert.equal(result.frontier, null);
  for (const a of result.answers) {
    assert.ok((a.stepId >> 3) <= 6, `step ${a.stepId} stays under the ceiling`);
  }
  const applied = applyCheckupResult(cur, result);
  assert.equal(applied.placementBand, 'ahead');
});

test('scenario 5 — kleuter: groep ≤ 2 or age ≤ 5 is never probed', () => {
  let cur = createCurriculumState({ age: 5 });
  assert.equal(checkupTarget(cur).kleuter, true, 'age 5, no groep');
  cur = setCurriculumGroep(createCurriculumState({ age: 6 }), 2, { on: '2026-07-01' });
  assert.equal(checkupTarget(cur).kleuter, true, 'groep 2');
  cur = setCurriculumGroep(createCurriculumState({ age: 5 }), 3, { on: '2026-07-01' });
  assert.equal(checkupTarget(cur).kleuter, false, 'a young groep-3 child follows the groep');
  const applied = applyCheckupResult(createCurriculumState({ age: 5 }), null, { mode: 'kleuter' });
  assert.equal(applied.checkup.completed, true);
  assert.equal(applied.checkup.mode, 'kleuter');
  // kleuter mode leaves eligibility on the stage path (no frontier window)
  assert.ok(eligibleObjectives({ ...applied, packId: 'NL_PO' }).length > 0);
});

test('scenario 6 — slow-but-correct band: frontier lands on fluency work, not below it', () => {
  const m = createCheckup({ targetBand: 4, ageBand: 4 });
  // knows bands ≤ 4, but band 4 answers are all over the fluency norm
  const result = simulate(m, { solidThrough: 4, slowBands: [4] });
  assert.ok(result.complete);
  assert.equal(result.frontier >> 3, 4, 'can-do-but-slow keeps the frontier at band 4');
  assert.ok(result.notFluent.length >= 1, 'the slow steps are remembered for practice');
});

test('scenario 7 — rushed check self-terminates and drops the streak from evidence', () => {
  const m = createCheckup({ targetBand: 4, ageBand: 4 });
  // warm-in + two honest answers, then a fast-wrong tantrum
  for (let i = 0; i < 3; i++) {
    const req = checkupNext(m);
    assert.equal(req.type, 'item');
    checkupRecord(m, { correct: true, ms: 2000, tag: null, difficulty: 520 });
  }
  for (let i = 0; i < 3; i++) {
    const req = checkupNext(m);
    if (req.type !== 'item') break;
    checkupRecord(m, { correct: false, ms: 400, tag: null, difficulty: 520 });
  }
  assert.equal(m.flags.rushed, true);
  assert.equal(checkupNext(m).type, 'done');
  const result = checkupResult(m);
  assert.equal(result.flags.rushed, true);
  const rushed = result.answers.filter((a) => a.rushed);
  assert.equal(rushed.length, 3, 'exactly the streak is excluded');
});

test('scenario 8 — quit mid-check: snapshot survives JSON and resumes where it left off', () => {
  const m = createCheckup({ targetBand: 4, ageBand: 4 });
  for (let i = 0; i < 4; i++) {
    const req = checkupNext(m);
    assert.equal(req.type, 'item');
    checkupRecord(m, { correct: true, ms: 2000, tag: null, difficulty: 520 });
  }
  checkupAbort(m);
  assert.equal(checkupNext(m).type, 'done');
  const beforeQuit = checkupResult(m);

  const revived = JSON.parse(JSON.stringify({ ...m }));
  revived.flags.quit = false;
  const req = checkupNext(revived);
  assert.equal(req.type, 'item', 'a revived draft keeps probing');
  const cont = simulate(revived, { solidThrough: 3 });
  assert.ok(cont.complete);
  assert.ok(cont.answers.length > beforeQuit.answers.length);
});

test('the ERWD retry: a miss at the default scaffold gets one model-visible retry', () => {
  const m = createCheckup({ targetBand: 4, ageBand: 4 });
  let sawRetry = false;
  for (let guard = 0; guard < 100; guard++) {
    const req = checkupNext(m);
    if (req.type !== 'item') break;
    if (req.purpose === 'retry') {
      sawRetry = true;
      assert.equal(req.scaffold, 0, 'retry drops to the visible model');
    }
    const band = req.stepId >> 3;
    checkupRecord(m, { correct: band <= 3, ms: 8000, tag: null, difficulty: 520 });
  }
  assert.ok(sawRetry, 'a failing probe was retried at scaffold 0');
});

test('bookends: the check opens and closes with unscored easy items', () => {
  const m = createCheckup({ targetBand: 4, ageBand: 4 });
  const first = checkupNext(m);
  assert.equal(first.purpose, 'warmin');
  assert.equal(first.unscored, true);
  assert.equal(first.scaffold, 0);
  const result = simulate(m, { solidThrough: 3 });
  assert.ok(result.complete);
  const purposes = result.answers.map((a) => a.purpose);
  assert.equal(purposes[0], 'warmin');
  assert.equal(purposes[purposes.length - 1], 'bookend');
});

// ---------- curriculum plumbing ----------

test('applyCheckupResult stores the check and satisfies the legacy warm-up flag', () => {
  const m = createCheckup({ targetBand: 4, ageBand: 4 });
  const result = simulate(m, { solidThrough: 3 });
  const cur = applyCheckupResult(createCurriculumState({ age: 8 }), result);
  assert.equal(cur.checkup.completed, true);
  assert.equal(cur.checkup.mode, 'probe');
  assert.equal(cur.warmup.completed, true);
  assert.equal(cur.checkupDraft, null);
  assert.ok(cur.checkup.misconceptions.includes('addsub_confuse'));
});

test('functioneringsniveau translates the frontier into M/E labels', () => {
  const base = createCurriculumState({ age: 8 });
  const withFrontier = (frontier, extra = {}) => ({
    ...base,
    checkup: { ...base.checkup, completed: true, mode: 'probe', frontier, ceilingBand: 6, ...extra },
  });
  assert.equal(functioneringsniveau(withFrontier(33)).label, 'M5');
  assert.equal(functioneringsniveau(withFrontier(36)).label, 'E5');
  assert.equal(functioneringsniveau(withFrontier(null)).label, 'E7+');
  assert.equal(functioneringsniveau(base), null, 'no completed check, no label');
});

test('setCurriculumGroep validates and the groep floors eligibility before any check', () => {
  const cur = setCurriculumGroep(createCurriculumState({ age: 9 }), 4, { on: '2026-07-01' });
  assert.equal(cur.groep, 4);
  assert.equal(cur.groepSource, 'child');
  const stages = new Set(eligibleObjectives(cur).map((o) => o.stage));
  assert.ok(stages.has('grade_4'), 'groep-4 work eligible despite the age-6 estimate');
  const bad = setCurriculumGroep(cur, 12);
  assert.equal(bad.groep, null);
});

test('checkupTarget prior order: parent override > groep > age; no info starts mid-primary', () => {
  let cur = createCurriculumState({ age: 9 });                    // grade_6
  assert.equal(checkupTarget(cur).targetBand, 5);
  cur = setCurriculumGroep(cur, 4, { on: '2026-07-01' });
  assert.equal(checkupTarget(cur).targetBand, 3, 'groep beats age');
  cur = { ...cur, confirmedStage: 'grade_7', stageSource: 'parent' };
  assert.equal(checkupTarget(cur).targetBand, 6, 'parent beats groep');
  assert.equal(checkupTarget(createCurriculumState({})).targetBand, 3, 'no prior → mid-primary');
});

test('a strict profile with a measured frontier practices that stage only', () => {
  const m = createCheckup({ targetBand: 7, ageBand: 7 });
  const result = simulate(m, { solidThrough: 4 });
  const cur = { ...applyCheckupResult(createCurriculumState({ age: 12 }), result), strictness: 'strict' };
  const stages = [...new Set(eligibleObjectives(cur).map((o) => o.stage))];
  assert.deepEqual(stages, ['grade_6']);
});

// ---------- Mimi's offers ----------

function profileWith(checkupPatch, extra = {}) {
  const curriculum = createCurriculumState({ age: 8 });
  return {
    curriculum: { ...curriculum, checkup: { ...curriculum.checkup, ...checkupPatch } },
    flags: {},
    math: { log: [] },
    story: {},
    ...extra,
  };
}

const NOW = new Date(2026, 6, 3).getTime(); // 2026-07-03

test('checkupSuggestion: first / requested / new school year / stale / flow extremes', () => {
  assert.equal(checkupSuggestion(profileWith({ completed: false }), NOW), 'first');
  const requested = profileWith({ completed: true, on: '2026-07-01', mode: 'probe' });
  requested.flags.checkupRequested = true;
  assert.equal(checkupSuggestion(requested, NOW), 'requested');
  const june = profileWith({ completed: true, on: '2026-06-15', mode: 'probe' });
  assert.equal(checkupSuggestion(june, new Date(2026, 8, 3).getTime()), 'new_year', 'September re-asks the groep');
  const old = profileWith({ completed: true, on: '2026-03-01', mode: 'probe' });
  assert.equal(checkupSuggestion(old, NOW), 'stale');
  const bored = profileWith({ completed: true, on: '2026-06-20', mode: 'probe' });
  bored.math.log = Array.from({ length: 20 }, () => ({ ok: true }));
  assert.equal(checkupSuggestion(bored, NOW), 'bored');
  bored.math.log = Array.from({ length: 20 }, (_, i) => ({ ok: i % 3 === 0 }));
  assert.equal(checkupSuggestion(bored, NOW), 'frustrated');
  const fresh = profileWith({ completed: true, on: '2026-07-01', mode: 'probe' });
  assert.equal(checkupSuggestion(fresh, NOW), null);
  assert.equal(checkupFresh(fresh, NOW), true);
});

test('mimiLines carries the offer when suggested, the ask otherwise, the deflection when fresh', () => {
  const report = { worlds: { tide: { pct: 0.5 } } };
  const keysFor = (p) => mimiLines(p, report, [], { now: NOW }).map((l) => l.key);
  const legacy = profileWith({ completed: false });
  legacy.flags.mimiMet = true;
  assert.ok(keysFor(legacy).includes('mimi.checkup_offer'));
  const fresh = profileWith({ completed: true, on: '2026-07-01', mode: 'probe' });
  fresh.flags.mimiMet = true;
  assert.ok(keysFor(fresh).includes('mimi.checkup_fresh'));
  const settled = profileWith({ completed: true, on: '2026-06-20', mode: 'probe' });
  settled.flags.mimiMet = true;
  const keys = keysFor(settled);
  assert.ok(keys.includes('mimi.checkup_ask'));
  assert.ok(!keys.includes('mimi.checkup_offer'));
});

// ---------- engine probes & calibration ----------

test('probe items anchor at the mastery bar, not the child rating', () => {
  const low = createMathState();
  low.skills.add_100.r = 400;  // struggling child
  const high = createMathState();
  high.skills.add_100.r = 850; // master
  high.skills.add_100.n = 30;
  const opts = { skill: 'add_100', kind: 'fetch', probe: { targetSuccess: CONFIRM_TARGET } };
  const p1 = nextProblem(low, { ...opts, rng: new Rng('probe-test') });
  const p2 = nextProblem(high, { ...opts, rng: new Rng('probe-test') });
  // MASTERY 850 − offset(0.87) ≈ 520 (±20 jitter): a master breezes it at ~87%
  assert.ok(Math.abs(p1.difficulty - 520) < 80, `difficulty ${p1.difficulty} anchored near 520`);
  assert.equal(p1.difficulty, p2.difficulty, 'the anchor ignores the child rating entirely');
  const retry = nextProblem(low, { ...opts, probe: { targetSuccess: CONFIRM_TARGET, scaffold: 0 }, rng: new Rng('probe-retry') });
  assert.equal(retry.scaffold, 0, 'the ERWD retry forces the visible model');
});

test('recordCalibration moves a fresh skill several times faster than practice', () => {
  const problem = { skillId: 'tables_a', difficulty: 520, answer: null, meta: {} };
  // Practice K for a fresh skill is 32 → delta = 32·(1−E(600 vs 520)) ≈ 12.4.
  // Calibration K for the same fresh skill is boosted ×(1+3U) with U = 1 → ≈ 4×.
  const calibrated = recordCalibration(createMathState(), problem, { correct: true, ms: 2000 }, { now: Date.now() });
  assert.ok(calibrated.delta > 40, `boosted-K delta ${calibrated.delta.toFixed(1)} ≫ the practice-K ~12`);
  assert.ok(calibrated.delta < 130, 'but bounded');
});

// ---------- wiring (structural, like the old warm-up suite) ----------

const screens = [
  readFileSync(new URL('../src/screens.js', import.meta.url), 'utf8'),
  ...readdirSync(new URL('../src/screens/', import.meta.url)).filter((f) => f.endsWith('.js'))
    .map((f) => readFileSync(new URL(`../src/screens/${f}`, import.meta.url), 'utf8')),
].join('\n');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
// The check session flow moved out of main.js into checkupflow.js; the
// onboarding branch that invokes it lives in appflow.js (player select).
const checkupflow = readFileSync(new URL('../src/checkupflow.js', import.meta.url), 'utf8');
const appflow = readFileSync(new URL('../src/appflow.js', import.meta.url), 'utf8');
const hub = readFileSync(new URL('../src/hub.js', import.meta.url), 'utf8');
const i18n = ['en', 'nl']
  .map((l) => readFileSync(new URL(`../src/i18n/${l}.js`, import.meta.url), 'utf8'))
  .join('\n');

test('checkup wiring exists across screens, main, and hub', () => {
  assert.match(screens, /export function showCheckup/);
  assert.match(screens, /id="checkup-skip"/);  // e2e + baseline skip anchor
  assert.match(screens, /data-groep/);
  assert.match(screens, /data-request-checkup/);
  assert.match(checkupflow, /export function needsCheckup\(profile\)/);
  assert.match(main, /startCheckupThenHub\(\)/);
  assert.match(main, /startCheckupFromHub\(\)/);
  assert.match(checkupflow, /recordCalibration/);
  assert.match(checkupflow, /applyCheckupResult/);
  assert.match(appflow, /else if \(needsCheckup\(game\.profile\)\)/);
  assert.match(hub, /mimi\.checkup_offer/);
  assert.match(hub, /startCheckupFromHub/);
});

test('checkup i18n keys exist in english and dutch', () => {
  for (const key of [
    'checkup.title', 'checkup.body', 'checkup.skip', 'checkup.stop',
    'checkup.groep_title', 'checkup.groep_n', 'checkup.groep_unknown',
    'checkup.bday_title', 'checkup.bday_later',
    'checkup.kleuter_title', 'checkup.kleuter_body', 'checkup.kleuter_play',
    'checkup.praise_1', 'checkup.done_title', 'checkup.done_body', 'checkup.done_play',
    'mimi.checkup_offer', 'mimi.checkup_ask', 'mimi.checkup_fresh',
    'parents.groep', 'parents.level', 'parents.last_check',
    'parents.misconceptions', 'parents.request_check', 'parents.check_requested',
    'misconception.addsub_confuse', 'misconception.whole_number_bias',
  ]) {
    const n = i18n.split(`'${key}'`).length - 1;
    assert.ok(n >= 2, `${key} needs EN and NL entries (found ${n})`);
  }
});
