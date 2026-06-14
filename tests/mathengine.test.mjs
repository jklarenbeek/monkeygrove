import { test } from 'vitest';
import assert from 'node:assert/strict';
import { Rng } from '../src/rng.js';
import {
  WORLDS, SKILLS, createMathState, nextProblem, recordResult,
  masteryReport, expectedSuccess,
} from '../src/mathengine.js';

const FRAC_RE = /^\d+\/\d+$/;
const KINDS = ['fetch', 'array', 'numberline', 'share'];

function stateWithRating(skillId, rating, n = 20) {
  const m = createMathState();
  m.skills[skillId].r = rating;
  m.skills[skillId].n = n;
  return m;
}

function master(m, skillId) {
  m.skills[skillId].r = 900;
  m.skills[skillId].n = 20;
  m.skills[skillId].hist = Array(10).fill(1);
}

function validateProblem(p) {
  const ctx = `${p.skillId}/${p.kind}`;
  assert.equal(typeof p.id, 'string', ctx);
  assert.ok(p.id.length > 0, ctx);
  assert.ok(SKILLS[p.skillId], ctx);
  assert.equal(p.world, SKILLS[p.skillId].world, ctx);
  assert.ok(KINDS.includes(p.kind), ctx);
  assert.equal(typeof p.equation, 'string', ctx);
  assert.ok(p.equation.length > 0, ctx);
  assert.ok(p.prompt && p.prompt.key.startsWith('q.'), ctx);
  assert.ok(p.prompt.vars && typeof p.prompt.vars === 'object', ctx);
  assert.ok([0, 1, 2].includes(p.scaffold), ctx);
  assert.equal(typeof p.difficulty, 'number', ctx);
  assert.ok(p.difficulty >= 300 && p.difficulty <= 1500, `${ctx} difficulty ${p.difficulty}`);
  assert.ok(p.explain && p.explain.key.startsWith('ex.'), ctx);
  assert.ok(p.explain.vars && typeof p.explain.vars === 'object', ctx);
  assert.ok(p.meta && typeof p.meta === 'object', ctx);
  assert.ok(p.model && typeof p.model.kind === 'string', ctx);

  if (p.kind === 'fetch') {
    assert.match(p.equation, /[?⬚]/, ctx);
    assert.equal(p.accept, null, ctx);
    assert.ok(Array.isArray(p.choices), ctx);
    // numeric fetch hunts use 6 stones; fraction-string problems keep 4
    assert.ok(p.choices.length >= 4 && p.choices.length <= 6, `${ctx} ${p.choices.length} choices`);
    const values = p.choices.map((c) => c.value);
    assert.equal(new Set(values).size, values.length, `${ctx} dup choices ${values}`);
    const correct = p.choices.filter((c) => c.tag === 'correct');
    assert.equal(correct.length, 1, ctx);
    assert.equal(correct[0].value, p.answer, ctx);
    for (const c of p.choices) {
      assert.equal(typeof c.tag, 'string', ctx);
      if (typeof c.value === 'number') {
        assert.ok(Number.isFinite(c.value) && c.value >= 0, `${ctx} value ${c.value}`);
      } else {
        assert.match(c.value, FRAC_RE, ctx);
      }
    }
  } else {
    assert.equal(p.choices, null, ctx);
  }

  if (p.kind === 'array') {
    assert.equal(p.model.kind, 'array', ctx);
    const { rows, cols, total, given } = p.model.params;
    assert.ok(rows > 0 && cols > 0, ctx);
    assert.equal(rows * cols, total, ctx);
    assert.ok(['both', 'rows', 'total'].includes(given), ctx);
    assert.equal(p.answer, total, ctx);
    assert.match(p.equation, /[?⬚]/, ctx);
  }

  if (p.kind === 'numberline') {
    assert.equal(p.model.kind, 'numberline', ctx);
    const { n, d, lo, hi, ticks } = p.model.params;
    assert.ok(d > 0 && n > 0, ctx);
    assert.ok(lo <= n / d && n / d <= hi, `${ctx} ${n}/${d} outside [${lo},${hi}]`);
    assert.ok(ticks >= 0, ctx);
    assert.ok(p.accept && p.accept.tol > 0, ctx);
    assert.ok(Math.abs(p.answer - n / d) < 1e-9, ctx);
  }

  if (p.kind === 'share') {
    assert.equal(p.model.kind, 'baskets', ctx);
    const { total, baskets, quotient, remainder } = p.model.params;
    assert.equal(total, baskets * quotient + remainder, ctx);
    assert.ok(remainder >= 0 && remainder < baskets, ctx);
    assert.equal(p.answer, quotient, ctx);
  }
}

test('exports: WORLDS and SKILLS ladder with linear prereqs', () => {
  assert.deepEqual(WORLDS, ['tide', 'garden', 'stump', 'vines']);
  assert.equal(Object.keys(SKILLS).length, 18);
  for (const [id, sk] of Object.entries(SKILLS)) {
    assert.equal(sk.id, id);
    assert.ok(WORLDS.includes(sk.world));
    assert.equal(sk.nameKey, `skill.${id}`);
    if (sk.order === 0) assert.deepEqual(sk.prereqs, []);
    else assert.equal(SKILLS[sk.prereqs[0]].order, sk.order - 1);
  }
  assert.equal(SKILLS.tables_b.prereqs[0], 'tables_a');
  assert.equal(SKILLS.frac_of_n.prereqs[0], 'frac_equiv');
});

test('createMathState shape', () => {
  const m = createMathState();
  assert.equal(Object.keys(m.skills).length, 18);
  assert.deepEqual(m.skills.add_20, { r: 600, n: 0, hist: [] });
  assert.deepEqual(m.facts, {});
  assert.deepEqual(m.log, []);
});

test('every skill generates valid problems across ratings', () => {
  for (const skillId of Object.keys(SKILLS)) {
    for (const rating of [400, 600, 900, 1200]) {
      const m = stateWithRating(skillId, rating);
      for (let i = 0; i < 10; i++) {
        const rng = new Rng(`${skillId}:${rating}:${i}`);
        const p = nextProblem(m, { skill: skillId, rng });
        assert.equal(p.skillId, skillId);
        validateProblem(p);
        const expectedScaffold = rating < 520 ? 0 : rating < 760 ? 1 : 2;
        assert.equal(p.scaffold, expectedScaffold);
      }
    }
  }
});

test('forced kinds are honored, unsupported kinds fall back to natural', () => {
  const rng = () => new Rng(7);
  for (const skillId of ['tables_a', 'tables_c', 'tables_mix']) {
    const m = stateWithRating(skillId, 700);
    const p = nextProblem(m, { skill: skillId, kind: 'array', rng: rng() });
    assert.equal(p.kind, 'array');
    validateProblem(p);
  }
  // mult_2digit arrays (12-99 cols) can never fit the soil patch — array is
  // intentionally unsupported and falls back to its natural kind, fetch
  {
    const m = stateWithRating('mult_2digit', 700);
    const p = nextProblem(m, { skill: 'mult_2digit', kind: 'array', rng: rng() });
    assert.equal(p.kind, 'fetch');
    validateProblem(p);
  }
  for (const skillId of ['div_facts', 'share', 'div_remainder', 'missing_factor']) {
    const m = stateWithRating(skillId, 700);
    const p = nextProblem(m, { skill: skillId, kind: 'share', rng: rng() });
    assert.equal(p.kind, 'share');
    validateProblem(p);
  }
  // fetch versions of share-natural skills exist too
  for (const skillId of ['share', 'div_remainder']) {
    const m = stateWithRating(skillId, 700);
    const p = nextProblem(m, { skill: skillId, kind: 'fetch', rng: rng() });
    assert.equal(p.kind, 'fetch');
    validateProblem(p);
  }
  // unsupported -> natural
  const m1 = stateWithRating('frac_magnitude', 700);
  assert.equal(nextProblem(m1, { skill: 'frac_magnitude', kind: 'array', rng: rng() }).kind, 'numberline');
  const m2 = stateWithRating('add_20', 700);
  assert.equal(nextProblem(m2, { skill: 'add_20', kind: 'share', rng: rng() }).kind, 'fetch');
});

test('fraction answers are fraction strings', () => {
  for (const skillId of ['frac_compare', 'frac_equiv']) {
    const m = stateWithRating(skillId, 800);
    const p = nextProblem(m, { skill: skillId, rng: new Rng(11) });
    assert.match(p.answer, FRAC_RE);
    // exactly one choice has the answer's value
    validateProblem(p);
  }
});

test('frac_compare: the correct choice is strictly the largest of 4', () => {
  for (let i = 0; i < 100; i++) {
    const m = stateWithRating('frac_compare', 400 + (i % 3) * 300);
    const p = nextProblem(m, { skill: 'frac_compare', rng: new Rng(1000 + i) });
    const val = (s) => { const [n, d] = s.split('/').map(Number); return n / d; };
    const correct = p.choices.find((c) => c.tag === 'correct');
    for (const c of p.choices) {
      if (c !== correct) assert.ok(val(c.value) < val(correct.value), `${c.value} >= ${correct.value}`);
    }
  }
});

test('frac_equiv: exactly one choice is equivalent to the base fraction', () => {
  for (let i = 0; i < 100; i++) {
    const m = stateWithRating('frac_equiv', 400 + (i % 3) * 300);
    const p = nextProblem(m, { skill: 'frac_equiv', rng: new Rng(2000 + i) });
    const base = p.meta.n / p.meta.d;
    const equiv = p.choices.filter((c) => {
      const [n, d] = c.value.split('/').map(Number);
      return Math.abs(n / d - base) < 1e-9;
    });
    assert.equal(equiv.length, 1);
    assert.equal(equiv[0].tag, 'correct');
  }
});

test('frac_magnitude spreads the first number-line targets', () => {
  const m = createMathState();
  const rng = new Rng('vine-openers');
  const values = [];
  const labels = [];
  for (let i = 0; i < 3; i++) {
    const p = nextProblem(m, { skill: 'frac_magnitude', rng });
    validateProblem(p);
    values.push(p.answer.toFixed(6));
    labels.push(`${p.meta.n}/${p.meta.d}`);
    recordResult(m, p, { correct: true, usedHint: false, ms: 1000 });
  }
  assert.equal(new Set(labels).size, labels.length, labels.join(', '));
  assert.equal(new Set(values).size, values.length, labels.join(', '));
});

test('determinism: same seed and state produce identical problems', () => {
  const make = (seed) => {
    const m = createMathState();
    const rng = new Rng(seed);
    return [
      nextProblem(m, { world: 'garden', rng }),
      nextProblem(m, { world: 'vines', rng }),
      nextProblem(m, { skill: 'sub_100', rng }),
    ];
  };
  assert.deepEqual(make('duel-42'), make('duel-42'));
  assert.notDeepEqual(make('duel-42'), make('duel-43'));
  // consecutive problems from one stream get distinct ids
  const [a, b] = make('duel-42');
  assert.notEqual(a.id, b.id);
});

test('Elo: update matches formula, hint scores 0.7, K halves after 20 attempts', () => {
  const m = createMathState();
  const p = nextProblem(m, { skill: 'add_20', rng: new Rng(5) });
  const e = expectedSuccess(m, p);
  assert.ok(e > 0 && e < 1);

  const res1 = recordResult(m, p, { correct: true, usedHint: false, ms: 1200 });
  assert.ok(Math.abs(res1.delta - 32 * (1 - e)) < 1e-9);
  assert.ok(Math.abs(res1.rating - (600 + res1.delta)) < 1e-9);
  assert.ok(res1.delta > 0);

  const m2 = createMathState();
  const e2 = expectedSuccess(m2, p);
  const hinted = recordResult(m2, p, { correct: true, usedHint: true, ms: 1200 });
  assert.ok(Math.abs(hinted.delta - 32 * (0.7 - e2)) < 1e-9);

  const m3 = createMathState();
  const wrong = recordResult(m3, p, { correct: false, usedHint: false, ms: 1200 });
  assert.ok(wrong.delta < 0);

  const m4 = createMathState();
  m4.skills.add_20.n = 25;
  const e4 = expectedSuccess(m4, p);
  const late = recordResult(m4, p, { correct: true, usedHint: false, ms: 900 });
  assert.ok(Math.abs(late.delta - 16 * (1 - e4)) < 1e-9);
});

test('expectedSuccess rises with skill rating', () => {
  const m = createMathState();
  const p = nextProblem(m, { skill: 'tables_mix', rng: new Rng(9) });
  const lo = expectedSuccess(m, p);
  m.skills.tables_mix.r = 900;
  assert.ok(expectedSuccess(m, p) > lo);
});

test('Elo converges for a simulated 80%-accurate learner', () => {
  const m = createMathState();
  const genRng = new Rng('learner-gen');
  const ansRng = new Rng('learner-ans');
  let r200 = 0;
  for (let i = 0; i < 400; i++) {
    const p = nextProblem(m, { skill: 'tables_mix', rng: genRng });
    recordResult(m, p, { correct: ansRng.chance(0.8), usedHint: false, ms: 3000 });
    if (i === 199) r200 = m.skills.tables_mix.r;
  }
  const r400 = m.skills.tables_mix.r;
  assert.ok(r400 > 850 && r400 < 1250, `r400=${r400}`);
  assert.ok(Math.abs(r400 - r200) < 150, `drift ${r400 - r200}`);
  // offered problems sit in the productive-struggle band at steady state
  const p = nextProblem(m, { skill: 'tables_mix', rng: new Rng(3) });
  const e = expectedSuccess(m, p);
  assert.ok(e > 0.45 && e < 0.95, `expected=${e}`);
});

test('mastery triggers after sustained success', () => {
  const m = createMathState();
  const rng = new Rng('mastery');
  let mastered = null;
  let steps = 0;
  for (let i = 0; i < 300 && !mastered; i++) {
    const p = nextProblem(m, { skill: 'add_20', rng });
    const res = recordResult(m, p, { correct: true, usedHint: false, ms: 1500 });
    mastered = res.masteredSkill;
    steps++;
  }
  assert.equal(mastered, 'add_20');
  assert.ok(steps >= 10, 'needs at least 10 attempts');
  assert.ok(m.skills.add_20.r >= 850);
  const rep = masteryReport(m);
  assert.equal(rep.worlds.tide.skills.find((s) => s.id === 'add_20').mastered, true);
  assert.ok(rep.worlds.tide.pct > 0);
});

test('gems light after 3 corrects, commutative twins light together', () => {
  let p = null;
  for (let seed = 0; !p; seed++) {
    const m0 = stateWithRating('tables_c', 700);
    const cand = nextProblem(m0, { skill: 'tables_c', kind: 'fetch', rng: new Rng(seed) });
    if (cand.meta.a !== cand.meta.b && cand.meta.b <= 10) p = cand;
  }
  const { a, b } = p.meta;
  const m = createMathState();
  assert.deepEqual(recordResult(m, p, { correct: true, usedHint: false, ms: 1 }).newGems, []);
  assert.deepEqual(recordResult(m, p, { correct: true, usedHint: false, ms: 1 }).newGems, []);
  const third = recordResult(m, p, { correct: true, usedHint: false, ms: 1 });
  assert.deepEqual(new Set(third.newGems), new Set([`${a}x${b}`, `${b}x${a}`]));
  let rep = masteryReport(m);
  assert.ok(rep.gems.lit.includes(`${a}x${b}`) && rep.gems.lit.includes(`${b}x${a}`));
  assert.equal(rep.gems.total, 100);
  // a miss dims the gem (lastOk false) without erasing history
  recordResult(m, p, { correct: false, usedHint: false, ms: 1 });
  rep = masteryReport(m);
  assert.ok(!rep.gems.lit.includes(`${a}x${b}`));
  assert.equal(m.facts[`${a}x${b}`].ok, 3);
});

test('div_facts feed the underlying multiplication fact', () => {
  let p = null;
  for (let seed = 100; !p; seed++) {
    const m0 = stateWithRating('div_facts', 700);
    const cand = nextProblem(m0, { skill: 'div_facts', kind: 'fetch', rng: new Rng(seed) });
    if (cand.meta.a !== cand.meta.b && cand.meta.a <= 10 && cand.meta.b <= 10) p = cand;
  }
  const m = createMathState();
  recordResult(m, p, { correct: true, usedHint: false, ms: 1 });
  recordResult(m, p, { correct: true, usedHint: false, ms: 1 });
  const third = recordResult(m, p, { correct: true, usedHint: false, ms: 1 });
  const { a, b } = p.meta;
  assert.deepEqual(new Set(third.newGems), new Set([`${a}x${b}`, `${b}x${a}`]));
});

test('tide and vines problems never touch facts', () => {
  const m = createMathState();
  const p = nextProblem(m, { skill: 'add_20', rng: new Rng(1) });
  recordResult(m, p, { correct: true, usedHint: false, ms: 1 });
  assert.deepEqual(m.facts, {});
});

test('selection: fresh world focuses on the first skill', () => {
  for (const [world, first] of [['tide', 'add_20'], ['garden', 'tables_a'], ['stump', 'div_facts'], ['vines', 'frac_magnitude']]) {
    const m = createMathState();
    const rng = new Rng(`fresh-${world}`);
    for (let i = 0; i < 50; i++) {
      assert.equal(nextProblem(m, { world, rng }).skillId, first);
    }
  }
});

test('selection: prereqs gate focus; mix is ~70/20/10', () => {
  const m = createMathState();
  master(m, 'add_20');
  const rng = new Rng('mix');
  const counts = {};
  for (let i = 0; i < 300; i++) {
    const p = nextProblem(m, { world: 'tide', rng });
    counts[p.skillId] = (counts[p.skillId] ?? 0) + 1;
  }
  assert.deepEqual(new Set(Object.keys(counts)), new Set(['add_20', 'sub_20']));
  assert.ok(counts.sub_20 > 160, `focus ${counts.sub_20}`);
  assert.ok(counts.add_20 > 40, `review ${counts.add_20}`);
});

test('selection: allowedSkills constrains world focus when possible', () => {
  const m = createMathState();
  const rng = new Rng(123);
  for (let i = 0; i < 20; i++) {
    const p = nextProblem(m, { world: 'garden', allowedSkills: ['tables_b'], rng });
    assert.equal(p.skillId, 'tables_b');
    validateProblem(p);
  }
});

test('selection: allowedSkills falls back to normal world focus when empty for world', () => {
  const m = createMathState();
  const p = nextProblem(m, { world: 'tide', allowedSkills: ['tables_b'], rng: new Rng(5) });
  assert.equal(p.world, 'tide');
  assert.ok(['add_20', 'sub_20', 'missing_addend', 'add_100', 'sub_100'].includes(p.skillId));
  validateProblem(p);
});

test('selection: forced skill still works with allowedSkills', () => {
  const m = createMathState();
  const p = nextProblem(m, {
    skill: 'frac_magnitude',
    allowedSkills: ['add_20'],
    rng: new Rng(9),
  });
  assert.equal(p.skillId, 'frac_magnitude');
  validateProblem(p);
});

test('selection: refresh can pull mastered skills from other worlds', () => {
  const m = createMathState();
  master(m, 'add_20');
  master(m, 'tables_a');
  const rng = new Rng('refresh');
  const seen = new Set();
  for (let i = 0; i < 400; i++) seen.add(nextProblem(m, { world: 'stump', rng }).skillId);
  assert.ok(seen.has('div_facts'));
  assert.ok(seen.has('add_20') || seen.has('tables_a'), 'cross-world refresh');
});

test('echo picks the weakest stale skill', () => {
  const m = createMathState();
  m.skills.tables_b = { r: 480, n: 5, hist: [0, 1, 0] };
  m.skills.add_20 = { r: 700, n: 10, hist: [1, 1, 1] };
  m.skills.share = { r: 650, n: 4, hist: [1, 0] };
  const p = nextProblem(m, { echo: true, rng: new Rng(2) });
  assert.equal(p.skillId, 'tables_b');
  // tie on rating -> least recently practiced wins
  const m2 = createMathState();
  m2.skills.add_20 = { r: 500, n: 3, hist: [1] };
  m2.skills.tables_b = { r: 500, n: 3, hist: [1] };
  m2.log.push({ t: 2000, skill: 'add_20', tag: null, ok: true, ms: 1, hint: false });
  m2.log.push({ t: 1000, skill: 'tables_b', tag: null, ok: true, ms: 1, hint: false });
  assert.equal(nextProblem(m2, { echo: true, rng: new Rng(3) }).skillId, 'tables_b');
  // echo with no practice falls back to a valid problem
  const m3 = createMathState();
  const fallback = nextProblem(m3, { echo: true, rng: new Rng(4) });
  validateProblem(fallback);
});

test('misconception tags appear in distractors over 200 generations', () => {
  const tags = new Set();
  const collect = (skillId, rating, kind, base) => {
    const m = stateWithRating(skillId, rating);
    for (let i = 0; i < 200; i++) {
      const p = nextProblem(m, { skill: skillId, kind, rng: new Rng(base + i) });
      if (p.choices) for (const c of p.choices) tags.add(c.tag);
    }
  };
  collect('tables_mix', 600, 'fetch', 10000);
  collect('add_100', 900, 'fetch', 20000);
  collect('sub_100', 900, 'fetch', 30000);
  collect('frac_equiv', 700, 'fetch', 40000);
  collect('frac_compare', 700, 'fetch', 50000);
  collect('div_remainder', 700, 'fetch', 60000);
  collect('missing_addend', 600, 'fetch', 70000);
  collect('frac_of_n', 800, 'fetch', 80000);
  for (const want of ['off_by_table', 'addsub_confuse', 'no_carry', 'borrow', 'reversed',
    'whole_number_bias', 'add_tops_bottoms', 'remainder_ignored', 'near_miss', 'random']) {
    assert.ok(tags.has(want), `missing tag ${want}`);
  }
});

test('garden mixes in array kind (~35%) once warmed up; stump mixes share', () => {
  const m = stateWithRating('tables_a', 700, 12);
  const rng = new Rng('kindmix');
  let arrays = 0;
  for (let i = 0; i < 200; i++) {
    if (nextProblem(m, { skill: 'tables_a', rng }).kind === 'array') arrays++;
  }
  assert.ok(arrays > 30 && arrays < 120, `arrays=${arrays}`);

  const m2 = stateWithRating('div_facts', 700, 12);
  const rng2 = new Rng('kindmix2');
  let shares = 0;
  for (let i = 0; i < 200; i++) {
    if (nextProblem(m2, { skill: 'div_facts', rng: rng2 }).kind === 'share') shares++;
  }
  assert.ok(shares > 30 && shares < 120, `shares=${shares}`);

  // cold skills stick to their natural kind
  const m3 = stateWithRating('tables_a', 700, 0);
  const rng3 = new Rng('kindmix3');
  for (let i = 0; i < 50; i++) {
    assert.equal(nextProblem(m3, { skill: 'tables_a', rng: rng3 }).kind, 'fetch');
  }
});

test('cold start serves easier params than a warmed-up skill', () => {
  const avgDifficulty = (n) => {
    let sum = 0;
    for (let i = 0; i < 60; i++) {
      const m = stateWithRating('add_20', 600, n);
      sum += nextProblem(m, { skill: 'add_20', rng: new Rng(900 + i) }).difficulty;
    }
    return sum / 60;
  };
  assert.ok(avgDifficulty(0) < avgDifficulty(20));
});

test('log ring buffer caps at 200', () => {
  const m = createMathState();
  const p = nextProblem(m, { skill: 'sub_20', rng: new Rng(8) });
  for (let i = 0; i < 250; i++) {
    recordResult(m, p, { correct: i % 3 !== 0, usedHint: false, ms: i });
  }
  assert.equal(m.log.length, 200);
  assert.equal(m.log[199].ms, 249); // newest kept, oldest dropped
  assert.equal(m.log[0].ms, 50);
  const entry = m.log[0];
  assert.ok(typeof entry.t === 'number' && entry.skill === 'sub_20');
  assert.ok('tag' in entry && 'ok' in entry && 'hint' in entry);
});

test('masteryReport shape and weakest list', () => {
  const m = createMathState();
  const rep0 = masteryReport(m);
  assert.deepEqual(Object.keys(rep0.worlds), WORLDS);
  for (const w of WORLDS) {
    assert.ok(rep0.worlds[w].pct >= 0 && rep0.worlds[w].pct <= 1);
    for (const sk of rep0.worlds[w].skills) {
      assert.ok(sk.id in SKILLS);
      assert.equal(sk.nameKey, `skill.${sk.id}`);
      assert.equal(typeof sk.rating, 'number');
      assert.ok(sk.acc10 >= 0 && sk.acc10 <= 1);
      assert.equal(sk.mastered, false);
    }
  }
  assert.deepEqual(rep0.weakest, []); // nothing practiced yet

  m.skills.tables_b = { r: 480, n: 5, hist: [0, 1, 0] };
  m.skills.add_20 = { r: 700, n: 10, hist: [1, 1] };
  m.skills.share = { r: 650, n: 4, hist: [1] };
  m.skills.frac_equiv = { r: 620, n: 2, hist: [0] };
  const rep = masteryReport(m);
  assert.equal(rep.weakest.length, 3);
  assert.equal(rep.weakest[0], 'tables_b');
  assert.ok(!rep.weakest.includes('add_20')); // 4 practiced, top-3 weakest only
});

test('nextProblem works without an explicit rng', () => {
  const m = createMathState();
  const p = nextProblem(m, { world: 'garden' });
  validateProblem(p);
  assert.equal(p.world, 'garden');
});
