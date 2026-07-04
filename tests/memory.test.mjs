// Memory Grove (docs/06) — the Phase 1 MVP: a pure engine (gating, wobbly-fact
// pick, anchor CRUD, hint dispatch), plus additive state healing so old saves gain
// a profile.memory subtree without a version bump.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { createMathState, nextProblem } from '../src/mathengine.js';
import { parseFact } from '../src/math/selection.js';
import { MULT } from '../src/math/generators/multiplication.js';
import { Rng } from '../src/rng.js';
import { migrate } from '../src/state.js';
import {
  createMemoryState, ensureMemory,
  placementOrder, memoryGateReached, memoryUnlocked, memoryOfferReady,
  litFactCount, adoptableFacts, adoptedAnchors, adoptAnchor, recordAnchorRecall,
  factKeysFor, anchorForProblem, setMemoryEnabled,
  availableLoci, walkStepsForOrder, availableWalkSteps, walkSkillForStep,
  buildSkipWalk, gradeWalkStop, recordWalk, swapAnchorLoci, memoryAnalytics,
  echoTargetFact,
  makeWalkCode, parseWalkCode, pickHintArm, recordHintArm,
  buildProbe, gradeProbeItem, recordProbe,
} from '../src/memory/engine.js';

// A math state with the given facts pre-lit/wobbly. `{ '7x8': [n, ok, lastOk] }`.
function mathWith(facts = {}) {
  const m = createMathState();
  for (const [k, [n, ok, lastOk]] of Object.entries(facts)) {
    m.facts[k] = { n, ok, lastOk };
  }
  return m;
}

function curriculum({ groep = null, confirmedStage = null, estimatedStage = null, stageSource = 'auto' } = {}) {
  return { packId: 'NL_PO', groep, confirmedStage, estimatedStage, stageSource };
}

// ---------- state shape + healing ----------

test('fresh memory state is disabled with empty anchor/walk maps', () => {
  const mem = createMemoryState();
  assert.deepEqual(mem, { enabled: false, anchors: {}, walks: {}, probes: [] });
});

test('ensureMemory heals a profile missing the subtree, additively', () => {
  const p = { memory: { anchors: { '7x8': { lociId: 'gemtree' } } } }; // enabled + walks missing
  const mem = ensureMemory(p);
  assert.equal(mem.enabled, false);
  assert.deepEqual(mem.walks, {});
  assert.deepEqual(mem.anchors['7x8'], { lociId: 'gemtree' }); // existing data untouched
});

test('migrate() adds profile.memory to a save from before the feature existed', () => {
  const old = { v: 1, profiles: [{ name: 'Pip' }], settings: {} };
  const migrated = migrate(old);
  const p = migrated.profiles[0];
  assert.ok(p.memory, 'memory subtree present after heal');
  assert.equal(p.memory.enabled, false);
  assert.deepEqual(p.memory.anchors, {});
});

// ---------- gating (docs/06 §4.2) ----------

test('placementOrder: child-said groep beats a lower age stage', () => {
  assert.equal(placementOrder(curriculum({ groep: 6, estimatedStage: 'grade_4' })), 6);
  assert.equal(placementOrder(curriculum({ estimatedStage: 'grade_4' })), 4);
  assert.equal(placementOrder(null), null);
});

test('memoryGateReached opens at groep 6 / grade_6, closed below', () => {
  assert.equal(memoryGateReached(curriculum({ groep: 6 })), true);
  assert.equal(memoryGateReached(curriculum({ groep: 5 })), false);
  assert.equal(memoryGateReached(curriculum({ estimatedStage: 'grade_6' })), true);
  assert.equal(memoryGateReached(curriculum({ estimatedStage: 'grade_5' })), false);
});

test('memoryOfferReady needs old-enough + gems + not-yet-enabled', () => {
  const lit = {};
  for (const k of ['6x7', '7x8', '6x8', '6x9', '7x9', '8x9']) lit[k] = [5, 4, true]; // 6 gems
  const ready = { memory: createMemoryState(), curriculum: curriculum({ groep: 6 }), math: mathWith(lit) };
  assert.equal(litFactCount(ready.math), 6);
  assert.equal(memoryOfferReady(ready), true);

  // too young
  assert.equal(memoryOfferReady({ ...ready, curriculum: curriculum({ groep: 4 }) }), false);
  // not enough gems
  assert.equal(memoryOfferReady({ ...ready, math: mathWith({ '7x8': [5, 4, true] }) }), false);
  // already enabled
  const on = { ...ready, memory: { ...createMemoryState(), enabled: true } };
  assert.equal(memoryOfferReady(on), false);
  assert.equal(memoryUnlocked(on), true);
});

test('setMemoryEnabled flips the flag', () => {
  const p = { memory: createMemoryState() };
  setMemoryEnabled(p, true);
  assert.equal(p.memory.enabled, true);
  setMemoryEnabled(p, false);
  assert.equal(p.memory.enabled, false);
});

// ---------- adoption (wobbly pick + CRUD) ----------

test('adoptableFacts: only solved catalog facts, wobbly first, adopted excluded', () => {
  const math = mathWith({
    '7x8': [6, 5, false], // solved but wobbly (last slipped)
    '6x7': [5, 4, true], // solid
    '2x2': [9, 9, true], // solved but NOT in the hard-cluster catalog
    '9x9': [1, 1, true], // not solved yet (ok < 3)
  });
  const memory = createMemoryState();
  const list = adoptableFacts(math, memory);
  const keys = list.map((a) => a.factKey);
  assert.ok(keys.includes('7x8') && keys.includes('6x7'));
  assert.ok(!keys.includes('2x2'), 'non-catalog fact is not adoptable');
  assert.ok(!keys.includes('9x9'), 'un-mastered fact is not adoptable');
  assert.equal(list[0].factKey, '7x8', 'wobbly fact sorts to the top');
  assert.equal(list[0].wobbly, true);

  // pure: calling again yields the same result and never mutates the math state
  const snapshot = JSON.stringify(math.facts);
  adoptableFacts(math, memory);
  assert.equal(JSON.stringify(math.facts), snapshot);
});

test('adoptAnchor stores a catalog anchor; commutative twin resolves; junk rejected', () => {
  const mem = createMemoryState();
  assert.ok(adoptAnchor(mem, '8x7', { now: 100 }), 'twin order adopts the 7x8 anchor');
  assert.ok(mem.anchors['7x8'], 'stored under the canonical key');
  assert.equal(mem.anchors['7x8'].lociId, 'gemtree');
  assert.equal(mem.anchors['7x8'].adoptedAt, 100);
  assert.equal(adoptAnchor(mem, '99x99', {}), null, 'no catalog anchor → no adoption');

  // adopted facts drop out of the adoptable list
  const math = mathWith({ '7x8': [6, 5, true], '6x7': [5, 4, true] });
  const keys = adoptableFacts(math, mem).map((a) => a.factKey);
  assert.ok(!keys.includes('7x8'));
  assert.ok(keys.includes('6x7'));

  const adopted = adoptedAnchors(mem);
  assert.equal(adopted.length, 1);
  assert.equal(adopted[0].factKey, '7x8');
  assert.equal(adopted[0].imageKey, 'memory.anchor.7x8');
});

test('recordAnchorRecall tracks recalls + lastOk, accepting either order', () => {
  const mem = createMemoryState();
  adoptAnchor(mem, '7x8', { now: 0 });
  recordAnchorRecall(mem, '8x7', true);
  recordAnchorRecall(mem, '7x8', false);
  assert.equal(mem.anchors['7x8'].recalls, 2);
  assert.equal(mem.anchors['7x8'].lastOk, false);
  assert.equal(recordAnchorRecall(mem, '9x9', true), null, 'no anchor → no-op');
});

// ---------- hint dispatch (docs/06 §4.3) ----------

test('factKeysFor: fact problems only, both orders, non-facts ignored', () => {
  assert.deepEqual(factKeysFor({ skillId: 'tables_b', meta: { a: 8, b: 7 } }), ['8x7', '7x8']);
  assert.deepEqual(factKeysFor({ skillId: 'tables_b', meta: { a: 8, b: 8 } }), ['8x8']);
  assert.deepEqual(factKeysFor({ skillId: 'add_20', meta: { a: 8, b: 7 } }), []);
  assert.deepEqual(factKeysFor({ skillId: 'tables_b', meta: { a: 12, b: 7 } }), []); // out of the 10×10 grid
  assert.deepEqual(factKeysFor(null), []);
});

test('anchorForProblem returns the adopted anchor only when the feature is enabled', () => {
  const mem = createMemoryState();
  adoptAnchor(mem, '7x8', { now: 0 });
  const problem = { skillId: 'tables_b', meta: { a: 8, b: 7 } }; // commutative order

  assert.equal(anchorForProblem(mem, problem), null, 'disabled → no anchor hint');
  mem.enabled = true;
  const hit = anchorForProblem(mem, problem);
  assert.ok(hit);
  assert.equal(hit.factKey, '7x8');
  assert.equal(hit.imageKey, 'memory.anchor.7x8');
  assert.equal(hit.lociId, 'gemtree');

  // an un-anchored fact returns nothing even when enabled
  assert.equal(anchorForProblem(mem, { skillId: 'tables_b', meta: { a: 6, b: 9 } }), null);
});

// ========================= Phase 2 =========================

// ---------- fact-level echo bias (§4.5) ----------

test('parseFact validates a fact string within the 10×10 grid', () => {
  assert.deepEqual(parseFact('7x8'), { a: 7, b: 8 });
  assert.equal(parseFact('11x2'), null);
  assert.equal(parseFact('nope'), null);
  assert.equal(parseFact(null), null);
});

test('nextProblem targetFact serves that exact fact via the owning table skill', () => {
  const math = createMathState();
  const p = nextProblem(math, { targetFact: '7x8', rng: new Rng('t1'), now: 0 });
  assert.equal(p.meta.a, 7);
  assert.equal(p.meta.b, 8);
  assert.equal(p.answer, 56);
  assert.equal(p.skillId, 'tables_c'); // larger factor 8 → the 7/8/9 table
});

test('a hard opts.skill still wins over targetFact', () => {
  const math = createMathState();
  const p = nextProblem(math, { skill: 'add_20', targetFact: '7x8', rng: new Rng('t2'), now: 0 });
  assert.equal(p.skillId, 'add_20');
});

test('a table generator honors an injected fact', () => {
  const out = MULT.tables_c(700, new Rng('g'), 'fetch', 2, { fact: [4, 7] });
  assert.equal(out.meta.a, 4);
  assert.equal(out.meta.b, 7);
  assert.equal(out.answer, 28);
});

test('echoTargetFact surfaces a wobbly adopted fact, or null', () => {
  const profile = {
    memory: { ...createMemoryState(), enabled: true, anchors: {} },
    math: mathWith({ '7x8': [6, 5, false], '6x7': [5, 4, true] }),
  };
  adoptAnchor(profile.memory, '7x8', { now: 0 }); // wobbly (lastOk false)
  adoptAnchor(profile.memory, '6x7', { now: 0 }); // solid
  assert.equal(echoTargetFact(profile), '7x8');
  // disabled feature → never targets
  assert.equal(echoTargetFact({ ...profile, memory: { ...profile.memory, enabled: false } }), null);
  // no wobbly anchors → null
  const solid = { memory: { ...createMemoryState(), enabled: true, anchors: { '6x7': { lociId: 'shop' } } }, math: mathWith({ '6x7': [5, 4, true] }) };
  assert.equal(echoTargetFact(solid), null);
});

// ---------- memory walks (§4.4) ----------

test('availableLoci: the four permanent loci plus restored builds, in route order', () => {
  assert.deepEqual(availableLoci({ island: { built: [] } }), ['gemtree', 'shop', 'nest', 'mimi']);
  assert.deepEqual(
    availableLoci({ island: { built: ['garden', 'lanterns'] } }),
    ['gemtree', 'shop', 'nest', 'mimi', 'lanterns', 'garden'],
  );
});

test('walkStepsForOrder unlocks harder skip-counts with grade', () => {
  assert.deepEqual(walkStepsForOrder(3), [2, 5, 10]);
  assert.deepEqual(walkStepsForOrder(6), [2, 5, 10, 3, 4, 6, 7, 8, 9]);
  assert.deepEqual(walkStepsForOrder(0), [2]); // floor
});

test('availableWalkSteps needs the feature on and enough loci', () => {
  const base = { memory: createMemoryState(), curriculum: curriculum({ groep: 6 }), island: { built: [] } };
  assert.deepEqual(availableWalkSteps(base), []); // locked
  const on = { ...base, memory: { ...createMemoryState(), enabled: true } };
  assert.ok(availableWalkSteps(on).includes(7));
});

test('buildSkipWalk lays one stop per landmark with the running multiples', () => {
  const walk = buildSkipWalk({ step: 7, loci: ['gemtree', 'shop', 'nest', 'mimi'] });
  assert.equal(walk.id, 'skip-7');
  assert.equal(walk.reinforceSkill, 'tables_c');
  assert.deepEqual(walk.stops.map((s) => s.answer), [7, 14, 21, 28]);
  assert.equal(gradeWalkStop(walk.stops[2], 21).correct, true);
  assert.equal(gradeWalkStop(walk.stops[2], 20).correct, false);
});

test('walkSkillForStep maps the step to its table', () => {
  assert.equal(walkSkillForStep(2), 'tables_a');
  assert.equal(walkSkillForStep(4), 'tables_b');
  assert.equal(walkSkillForStep(8), 'tables_c');
});

test('recordWalk marks built, keeps the best streak, stamps the time', () => {
  const mem = createMemoryState();
  recordWalk(mem, 'skip-7', { streak: 3, now: 100 });
  recordWalk(mem, 'skip-7', { streak: 1, now: 200 });
  assert.deepEqual(mem.walks['skip-7'], { built: true, bestStreak: 3, lastAt: 200 });
});

// ---------- browser swap (§4.6) ----------

test('swapAnchorLoci moves an image, accepting either fact order', () => {
  const mem = createMemoryState();
  adoptAnchor(mem, '7x8', { now: 0 });
  swapAnchorLoci(mem, '8x7', 'bakery');
  assert.equal(mem.anchors['7x8'].lociId, 'bakery');
  assert.equal(swapAnchorLoci(mem, '9x9', 'nest'), null); // not adopted → no-op
});

// ---------- parents analytics (§4.7) ----------

test('memoryAnalytics reports adoption, walks, and anchored-vs-unanchored recall', () => {
  const profile = {
    memory: createMemoryState(),
    math: mathWith({ '7x8': [10, 9, true], '6x7': [10, 5, true], '8x9': [4, 2, true] }),
  };
  adoptAnchor(profile.memory, '7x8', { now: 0 });   // anchored: 9/10
  recordWalk(profile.memory, 'skip-3', { streak: 4, now: 0 });
  const a = memoryAnalytics(profile);
  assert.equal(a.anchorsAdopted, 1);
  assert.equal(a.walksBuilt, 1);
  assert.equal(a.bestWalkStreak, 4);
  assert.ok(Math.abs(a.anchoredRate - 0.9) < 1e-9);
  // unanchored comparable facts (6x7, 8x9) that were tried: (5+2)/(10+4) = 0.5
  assert.ok(Math.abs(a.unanchoredRate - 0.5) < 1e-9);
  assert.equal(a.anchoredN, 10);
  assert.equal(a.unanchoredN, 14);
});

// ========================= Phase 3 =========================

// ---------- walk challenge codes (§5) ----------

test('walk codes round-trip and reject junk', () => {
  assert.equal(makeWalkCode(7, 5), 'MW7-5');
  assert.deepEqual(parseWalkCode('MW7-5'), { step: 7, stops: 5 });
  assert.deepEqual(parseWalkCode('  mw7-5 '), { step: 7, stops: 5 });
  assert.equal(parseWalkCode('MW1-5'), null); // step out of range
  assert.equal(parseWalkCode('MW7-0'), null); // no stops
  assert.equal(parseWalkCode('nope'), null);
});

test('a challenge walk asks identical questions regardless of the island loci', () => {
  const rich = buildSkipWalk({ step: 7, loci: ['gemtree', 'shop', 'nest', 'mimi', 'garden'], stops: 5 });
  const sparse = buildSkipWalk({ step: 7, loci: ['gemtree'], stops: 5 }); // one landmark, cycled
  assert.deepEqual(rich.stops.map((s) => s.answer), [7, 14, 21, 28, 35]);
  assert.deepEqual(rich.stops.map((s) => s.answer), sparse.stops.map((s) => s.answer));
  assert.equal(sparse.stops.length, 5);
});

// ---------- A/B hints (§5) ----------

test('pickHintArm honors the rng and recordHintArm tallies per arm', () => {
  assert.equal(pickHintArm({ float: () => 0.2 }), 'mem');
  assert.equal(pickHintArm({ float: () => 0.8 }), 'model');
  const mem = createMemoryState();
  adoptAnchor(mem, '7x8', { now: 0 });
  recordHintArm(mem, '7x8', 'mem', true);
  recordHintArm(mem, '8x7', 'mem', false); // twin order, same anchor
  recordHintArm(mem, '7x8', 'model', true);
  assert.deepEqual(mem.anchors['7x8'].ab, { mem: { n: 2, ok: 1 }, model: { n: 1, ok: 1 } });
  assert.equal(recordHintArm(mem, '7x8', 'bogus', true), null); // invalid arm
});

test('memoryAnalytics summarises the hint A/B arms', () => {
  const profile = { memory: createMemoryState(), math: mathWith({ '7x8': [3, 3, true] }) };
  adoptAnchor(profile.memory, '7x8', { now: 0 });
  recordHintArm(profile.memory, '7x8', 'mem', true);
  recordHintArm(profile.memory, '7x8', 'mem', true);
  recordHintArm(profile.memory, '7x8', 'model', false);
  const a = memoryAnalytics(profile);
  assert.equal(a.memFirstN, 2);
  assert.equal(a.modelFirstN, 1);
  assert.equal(a.memFirstRate, 1);
  assert.equal(a.modelFirstRate, 0);
});

// ---------- opt-in recall probe (§7) ----------

test('buildProbe covers anchored + unanchored catalog facts with real answers', () => {
  const profile = { memory: createMemoryState() };
  adoptAnchor(profile.memory, '7x8', { now: 0 });
  const items = buildProbe(profile, { size: 6 });
  assert.equal(items.length, 6);
  assert.ok(items.every((i) => i.answer === i.a * i.b));
  const anchored = items.find((i) => i.factKey === '7x8');
  assert.ok(anchored && anchored.anchored === true);
  assert.equal(gradeProbeItem(items[0], items[0].answer).correct, true);
  assert.equal(gradeProbeItem(items[0], items[0].answer + 1).correct, false);
});

test('recordProbe stores a pre baseline then post checks, and analytics shows the delta', () => {
  const profile = { memory: createMemoryState(), math: mathWith({}) };
  const pre = recordProbe(profile.memory, { items: [{ correct: true }, { correct: false }], now: 1 });
  const post = recordProbe(profile.memory, { items: [{ correct: true }, { correct: true }], now: 2 });
  assert.equal(pre.phase, 'pre');
  assert.equal(post.phase, 'post');
  const a = memoryAnalytics(profile);
  assert.equal(a.probeCount, 2);
  assert.equal(a.probePre, 0.5);
  assert.equal(a.probePost, 1);
});

test('migrate() heals probes onto a save from before Phase 3', () => {
  const old = { v: 1, profiles: [{ name: 'Pip', memory: { enabled: true, anchors: {}, walks: {} } }], settings: {} };
  const p = migrate(old).profiles[0];
  assert.deepEqual(p.memory.probes, []); // ensureMemory backfills the new field
  assert.equal(p.memory.enabled, true); // existing data preserved
});
