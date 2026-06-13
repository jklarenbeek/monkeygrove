// Monkey Grove math engine — pure logic, no DOM, no three.js.
// Owns the profile.math subtree: per-skill Elo-lite ratings, times-table fact
// gems (Banyan Gem Tree), and a ring-buffer practice log.
//
// Pedagogy notes (docs/01-learn.md, docs/02-adaptive.md):
// - Items are parameterized; params are chosen so expected success ≈ 0.6–0.7
//   by targeting an item difficulty ~108 Elo points under the skill rating.
// - Every fetch distractor is misconception-tagged so the UI can materialize
//   the right visual model and Mimi can explain the *specific* error.
// - Scaffold fades with rating (0 model visible, 1 on demand, 2 bare).
// - frac_compare design: FOUR fraction choices, find the LARGEST (richer
//   misconception distractors than a pair comparison). Equation shows the
//   candidates in stone order: '2/5 · 1/2 · 3/4 · 1/8 → ?'.

import { Rng } from './rng.js';

export const WORLDS = ['tide', 'garden', 'stump', 'vines'];

const LADDER = {
  tide: ['add_20', 'sub_20', 'missing_addend', 'add_100', 'sub_100'],
  garden: ['tables_a', 'tables_b', 'tables_c', 'tables_mix', 'mult_2digit'],
  stump: ['div_facts', 'share', 'div_remainder', 'missing_factor'],
  vines: ['frac_magnitude', 'frac_compare', 'frac_equiv', 'frac_of_n'],
};

export const SKILLS = {};
for (const world of WORLDS) {
  LADDER[world].forEach((id, order) => {
    SKILLS[id] = {
      id,
      world,
      order,
      // Prereq chains are strictly linear inside a world; cross-world: none.
      prereqs: order === 0 ? [] : [LADDER[world][order - 1]],
      nameKey: `skill.${id}`,
    };
  });
}

const START_RATING = 600;
const MASTERY_RATING = 850;
const MASTERY_ACC = 0.8;
const MASTERY_MIN_N = 10;
const HIST_MAX = 10;
const LOG_MAX = 200;
const TARGET_OFFSET = 108; // expected ≈ 0.65 when item sits this far under rating
const COLD_N = 8;

export function createMathState() {
  const skills = {};
  for (const id of Object.keys(SKILLS)) skills[id] = { r: START_RATING, n: 0, hist: [] };
  return { skills, facts: {}, log: [] };
}

// ---------- small helpers ----------

const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

function expectedFor(rating, difficulty) {
  return 1 / (1 + 10 ** ((difficulty - rating) / 400));
}

export function expectedSuccess(math, problem) {
  return expectedFor(math.skills[problem.skillId].r, problem.difficulty);
}

function scaffoldFor(rating) {
  return rating < 520 ? 0 : rating < 760 ? 1 : 2;
}

function acc(hist) {
  return hist.length ? hist.reduce((a, b) => a + b, 0) / hist.length : 0;
}

function isMastered(s) {
  return s.r >= MASTERY_RATING && s.n >= MASTERY_MIN_N
    && s.hist.length >= MASTERY_MIN_N && acc(s.hist) >= MASTERY_ACC;
}

// Digit-swap misconception value ('reversed'): 62 -> 26, 182 -> 281.
function reverseDigits(n) {
  if (!Number.isInteger(n) || n < 10) return null;
  const r = Number(String(n).split('').reverse().join(''));
  return r === n || r < 1 ? null : r;
}

function coprimes(d) {
  const out = [];
  for (let n = 1; n < d; n++) if (gcd(n, d) === 1) out.push(n);
  return out;
}

// Numeric fetch choices (default 6 — a proper stone hunt): answer +
// misconception candidates (in priority order), deduped and kept plausible,
// padded with near misses.
function buildChoices(rng, answer, candidates, { min = 1, count = 6 } = {}) {
  const lo = answer === 0 ? 0 : min;
  const out = [{ value: answer, tag: 'correct' }];
  const used = new Set([answer]);
  const push = (value, tag) => {
    if (out.length >= count || value == null || !Number.isFinite(value)) return;
    value = Math.round(value);
    if (value < lo || used.has(value)) return;
    used.add(value);
    out.push({ value, tag });
  };
  for (const c of candidates) push(c.value, c.tag);
  for (const off of [1, -1, 2, -2, 3, -3]) push(answer + off, 'near_miss');
  let off = 4;
  while (out.length < count) {
    push(answer + (rng.chance(0.5) ? off : -off), 'random');
    push(answer + off, 'random');
    off++;
  }
  return rng.shuffle(out);
}

// Fraction-string fetch choices (frac_equiv, frac_of_n distractor pools are
// numeric; this one is for string-valued fraction answers). Guarantees the
// correct value is unique among the four.
function buildFracChoices(rng, answer, candidates, fill) {
  const val = (s) => {
    const [n, d] = String(s).split('/').map(Number);
    return n / d;
  };
  const out = [{ value: answer, tag: 'correct' }];
  const vals = [val(answer)];
  const push = (value, tag) => {
    if (out.length >= 4) return;
    const v = val(value);
    if (!Number.isFinite(v) || v <= 0) return;
    if (vals.some((u) => Math.abs(u - v) < 1e-9)) return;
    vals.push(v);
    out.push({ value, tag });
  };
  for (const c of candidates) push(c.value, c.tag);
  let j = 0;
  while (out.length < 4 && j < 50) push(fill(j++), 'random');
  return rng.shuffle(out);
}

// Pick the parameter tier whose item difficulty is closest to the target.
function pickTier(tiers, target) {
  let best = tiers[0];
  for (const t of tiers) if (Math.abs(t.d - target) < Math.abs(best.d - target)) best = t;
  return best;
}

// ---------- generators (per skill) ----------
// Each returns the inner problem fields; nextProblem adds id/skillId/world/scaffold.

const GEN = {};

GEN.add_20 = (target, rng) => {
  const tier = pickTier([
    { d: 420, gen: () => { const a = rng.int(1, 9); return [a, rng.int(1, Math.max(1, 10 - a))]; } },
    { d: 540, gen: () => { const a = rng.int(3, 9); return [a, rng.int(Math.max(2, 11 - a), Math.min(9, 18 - a))]; } },
    { d: 650, gen: () => { const a = rng.int(11, 17); return [a, rng.int(2, Math.min(9, 20 - a))]; } },
  ], target);
  const [a, b] = tier.gen();
  const answer = a + b;
  return {
    kind: 'fetch',
    equation: `${a} + ${b} = ?`,
    prompt: { key: 'q.fetch', vars: { a, b } },
    answer,
    choices: buildChoices(rng, answer, [
      { value: Math.abs(a - b), tag: 'addsub_confuse' },
      { value: reverseDigits(answer), tag: 'reversed' },
    ], { min: 0 }),
    model: { kind: 'none', params: {} },
    explain: { key: 'ex.near_miss', vars: { a, b, answer } },
    difficulty: tier.d,
    meta: { a, b },
  };
};

GEN.sub_20 = (target, rng) => {
  const tier = pickTier([
    { d: 460, gen: () => { const a = rng.int(3, 10); return [a, rng.int(1, a - 1)]; } },
    { d: 580, gen: () => { const a = rng.int(12, 19); return [a, rng.int(1, a % 10)]; } },
    { d: 690, gen: () => { const a = rng.int(11, 18); return [a, rng.int((a % 10) + 1, 9)]; } },
  ], target);
  const [a, b] = tier.gen();
  const answer = a - b;
  return {
    kind: 'fetch',
    equation: `${a} − ${b} = ?`,
    prompt: { key: 'q.fetch', vars: { a, b } },
    answer,
    choices: buildChoices(rng, answer, [
      { value: a + b, tag: 'addsub_confuse' },
      { value: reverseDigits(answer), tag: 'reversed' },
    ], { min: 0 }),
    model: { kind: 'none', params: {} },
    explain: { key: 'ex.addsub_confuse', vars: { a, b, answer } },
    difficulty: tier.d,
    meta: { a, b },
  };
};

GEN.missing_addend = (target, rng) => {
  const tier = pickTier([
    { d: 500, gen: () => { const c = rng.int(5, 10); return [rng.int(1, c - 1), c]; } },
    { d: 620, gen: () => { const c = rng.int(11, 20); return [rng.int(2, c - 2), c]; } },
    { d: 780, gen: () => { const c = rng.int(6, 18) * 5; return [rng.int(1, c / 5 - 1) * 5, c]; } },
  ], target);
  const [a, c] = tier.gen();
  const answer = c - a;
  return {
    kind: 'fetch',
    equation: `${a} + ? = ${c}`,
    prompt: { key: 'q.missing', vars: { a, c } },
    answer,
    choices: buildChoices(rng, answer, [
      { value: a + c, tag: 'addsub_confuse' },
      { value: reverseDigits(answer), tag: 'reversed' },
    ]),
    model: { kind: 'none', params: {} },
    explain: { key: 'ex.addsub_confuse', vars: { a, c, answer } },
    difficulty: tier.d,
    meta: { a, c },
  };
};

GEN.add_100 = (target, rng) => {
  const tier = pickTier([
    { d: 560, carry: false, gen: () => {
      const tA = rng.int(1, 7), tB = rng.int(1, 8 - tA);
      const oA = rng.int(1, 8), oB = rng.int(0, 9 - oA);
      return [tA * 10 + oA, tB * 10 + oB];
    } },
    { d: 760, carry: true, gen: () => {
      const tA = rng.int(1, 6), tB = rng.int(1, 7 - tA);
      const oA = rng.int(2, 9), oB = rng.int(Math.max(2, 11 - oA), 9);
      return [tA * 10 + oA, tB * 10 + oB];
    } },
    { d: 900, carry: true, gen: () => {
      const tA = rng.int(3, 5), tB = rng.int(3, Math.min(5, 8 - tA));
      const oA = rng.int(5, 9), oB = rng.int(Math.max(5, 11 - oA), 9);
      return [tA * 10 + oA, tB * 10 + oB];
    } },
  ], target);
  const [a, b] = tier.gen();
  const answer = a + b;
  const noCarry = ((a % 10) + (b % 10)) % 10 + 10 * (Math.floor(a / 10) + Math.floor(b / 10));
  return {
    kind: 'fetch',
    equation: `${a} + ${b} = ?`,
    prompt: { key: 'q.fetch', vars: { a, b } },
    answer,
    choices: buildChoices(rng, answer, [
      { value: noCarry, tag: 'no_carry' },
      { value: reverseDigits(answer), tag: 'reversed' },
    ]),
    model: { kind: 'none', params: {} },
    explain: tier.carry
      ? { key: 'ex.no_carry', vars: { a, b, answer } }
      : { key: 'ex.near_miss', vars: { a, b, answer } },
    difficulty: tier.d,
    meta: { a, b, carry: tier.carry },
  };
};

GEN.sub_100 = (target, rng) => {
  const tier = pickTier([
    { d: 620, borrow: false, gen: () => {
      const tA = rng.int(2, 9), oA = rng.int(1, 9);
      return [tA * 10 + oA, rng.int(1, tA - 1) * 10 + rng.int(0, oA)];
    } },
    { d: 840, borrow: true, gen: () => {
      const tA = rng.int(2, 9), oA = rng.int(0, 8);
      return [tA * 10 + oA, rng.int(1, tA - 1) * 10 + rng.int(oA + 1, 9)];
    } },
    { d: 980, borrow: true, gen: () => {
      const tA = rng.int(6, 9), oA = rng.int(0, 7);
      return [tA * 10 + oA, rng.int(2, tA - 1) * 10 + rng.int(oA + 1, 9)];
    } },
  ], target);
  const [a, b] = tier.gen();
  const answer = a - b;
  // Wrong-direction subtraction per column: 52−27 -> 35.
  const borrowWrong = (Math.floor(a / 10) - Math.floor(b / 10)) * 10 + Math.abs((a % 10) - (b % 10));
  return {
    kind: 'fetch',
    equation: `${a} − ${b} = ?`,
    prompt: { key: 'q.fetch', vars: { a, b } },
    answer,
    choices: buildChoices(rng, answer, [
      { value: borrowWrong, tag: 'borrow' },
      { value: reverseDigits(answer), tag: 'reversed' },
    ], { min: 0 }),
    model: { kind: 'none', params: {} },
    explain: tier.borrow
      ? { key: 'ex.borrow', vars: { a, b, answer } }
      : { key: 'ex.near_miss', vars: { a, b, answer } },
    difficulty: tier.d,
    meta: { a, b, borrow: tier.borrow },
  };
};

// Shared assembly for times-table skills. kind 'array' is the constructed
// Garden verb; 'fetch' carries the array model so the UI can materialize it.
function tableProblem(rng, kind, scaffold, a, b, d) {
  const total = a * b;
  const meta = { a, b };
  if (kind === 'array') {
    const given = scaffold === 0 || rng.chance(0.5) ? 'both' : rng.chance(0.6) ? 'rows' : 'total';
    const equation = given === 'both' ? `${a} × ${b} = ?`
      : given === 'rows' ? `${a} × ? = ${total}` : `? × ? = ${total}`;
    return {
      kind: 'array',
      equation,
      prompt: { key: `q.array_${given}`, vars: { rows: a, cols: b, total } },
      answer: total,
      choices: null,
      model: { kind: 'array', params: { rows: a, cols: b, total, given } },
      explain: { key: 'ex.off_by_table', vars: { a, b, answer: total } },
      difficulty: d + (given === 'both' ? 0 : 30),
      meta,
    };
  }
  return {
    kind: 'fetch',
    equation: `${a} × ${b} = ?`,
    prompt: { key: 'q.fetch', vars: { a, b } },
    answer: total,
    choices: buildChoices(rng, total, [
      { value: (a + (rng.chance(0.5) ? 1 : -1)) * b, tag: 'off_by_table' },
      { value: a * (b + (rng.chance(0.5) ? 1 : -1)), tag: 'off_by_table' },
      { value: a + b, tag: 'addsub_confuse' },
      { value: reverseDigits(total), tag: 'reversed' },
    ]),
    model: { kind: 'array', params: { rows: a, cols: b, total, given: 'both' } },
    explain: { key: 'ex.off_by_table', vars: { a, b, answer: total } },
    difficulty: d,
    meta,
  };
}

function tableGen(tiers) {
  return (target, rng, kind, scaffold) => {
    const tier = pickTier(tiers, target);
    const [a, b] = tier.gen(rng);
    return tableProblem(rng, kind, scaffold, a, b, tier.d);
  };
}

GEN.tables_a = tableGen([
  { d: 420, gen: (rng) => [rng.pick([2, 5, 10]), rng.int(1, 5)] },
  { d: 520, gen: (rng) => [rng.pick([2, 5, 10]), rng.int(2, 10)] },
  { d: 640, gen: (rng) => [rng.pick([2, 5, 10]), rng.int(6, 10)] },
]);
GEN.tables_b = tableGen([
  { d: 560, gen: (rng) => [rng.pick([3, 4, 6]), rng.int(2, 5)] },
  { d: 660, gen: (rng) => [rng.pick([3, 4, 6]), rng.int(2, 10)] },
]);
GEN.tables_c = tableGen([
  { d: 680, gen: (rng) => [rng.pick([7, 8, 9]), rng.int(2, 5)] },
  { d: 780, gen: (rng) => [rng.pick([7, 8, 9]), rng.int(2, 10)] },
  { d: 860, gen: (rng) => [rng.pick([7, 8, 9]), rng.int(6, 9)] },
]);
GEN.tables_mix = tableGen([
  { d: 600, gen: (rng) => [rng.int(2, 6), rng.int(2, 6)] },
  { d: 700, gen: (rng) => [rng.int(2, 10), rng.int(2, 10)] },
  { d: 800, gen: (rng) => [rng.int(6, 9), rng.int(6, 9)] },
]);

GEN.mult_2digit = (target, rng, kind, scaffold) => {
  const tier = pickTier([
    { d: 780, gen: () => [rng.int(2, 4), rng.int(12, 29)] },
    { d: 940, gen: () => [rng.int(3, 7), rng.int(13, 49)] },
    { d: 1100, gen: () => [rng.int(4, 9), rng.int(25, 99)] },
  ], target);
  const [a, b] = tier.gen();
  const answer = a * b;
  if (kind === 'array') {
    // Big beds: UI renders with distributive splits; always 'both' given.
    return {
      kind: 'array',
      equation: `${a} × ${b} = ?`,
      prompt: { key: 'q.array_both', vars: { rows: a, cols: b, total: answer } },
      answer,
      choices: null,
      model: { kind: 'array', params: { rows: a, cols: b, total: answer, given: 'both' } },
      explain: { key: 'ex.no_carry', vars: { a, b, answer } },
      difficulty: tier.d,
      meta: { a, b },
    };
  }
  // Dropped carry in the ones partial product: 7×26 -> 142 instead of 182.
  const noCarry = a * Math.floor(b / 10) * 10 + (a * (b % 10)) % 10;
  return {
    kind: 'fetch',
    equation: `${a} × ${b} = ?`,
    prompt: { key: 'q.fetch', vars: { a, b } },
    answer,
    choices: buildChoices(rng, answer, [
      { value: noCarry, tag: 'no_carry' },
      { value: (a + (rng.chance(0.5) ? 1 : -1)) * b, tag: 'off_by_table' },
      { value: reverseDigits(answer), tag: 'reversed' },
    ]),
    model: { kind: 'array', params: { rows: a, cols: b, total: answer, given: 'both' } },
    explain: { key: 'ex.no_carry', vars: { a, b, answer } },
    difficulty: tier.d,
    meta: { a, b },
  };
};

// Shared assembly for division-flavored problems. answer = per-basket quotient.
function shareProblem(rng, kind, { total, baskets, quotient, remainder, d, meta, explain }) {
  const model = { kind: 'baskets', params: { total, baskets, quotient, remainder } };
  if (kind === 'share') {
    return {
      kind: 'share',
      equation: `${total} ÷ ${baskets}`,
      prompt: { key: 'q.share', vars: { total, baskets } },
      answer: quotient,
      choices: null,
      model,
      explain,
      difficulty: d,
      meta,
    };
  }
  const candidates = remainder > 0
    ? [
      { value: quotient + 1, tag: 'remainder_ignored' },
      { value: remainder, tag: 'random' },
    ]
    : [
      { value: quotient + (rng.chance(0.5) ? 1 : -1), tag: 'off_by_table' },
      { value: total - baskets, tag: 'addsub_confuse' },
    ];
  return {
    kind: 'fetch',
    equation: `${total} ÷ ${baskets} = ?`,
    prompt: { key: remainder > 0 ? 'q.share_fetch' : 'q.fetch', vars: { total, baskets } },
    answer: quotient,
    choices: buildChoices(rng, quotient, candidates),
    model,
    explain,
    difficulty: d,
    meta,
  };
}

GEN.div_facts = (target, rng, kind) => {
  const tier = pickTier([
    { d: 480, gen: () => [rng.pick([2, 5, 10]), rng.int(2, 5)] },
    { d: 600, gen: () => [rng.pick([2, 3, 4, 5, 6, 10]), rng.int(2, 10)] },
    { d: 720, gen: () => [rng.pick([6, 7, 8, 9]), rng.int(3, 10)] },
  ], target);
  const [a, b] = tier.gen(); // c ÷ a = b, underlying fact a×b
  const c = a * b;
  return shareProblem(rng, kind, {
    total: c, baskets: a, quotient: b, remainder: 0, d: tier.d,
    meta: { a, b, c },
    explain: { key: 'ex.div_fact', vars: { a, b, c, answer: b } },
  });
};

GEN.share = (target, rng, kind) => {
  const tier = pickTier([
    { d: 560, gen: () => [rng.int(2, 4), rng.int(2, 5)] },
    { d: 700, gen: () => [rng.int(3, 8), rng.int(3, 9)] },
    { d: 860, gen: () => [rng.int(4, 9), rng.int(6, 12)] },
  ], target);
  const [baskets, quotient] = tier.gen();
  const total = baskets * quotient;
  return shareProblem(rng, kind, {
    total, baskets, quotient, remainder: 0, d: tier.d,
    meta: { baskets, quotient, total, remainder: 0 },
    explain: { key: 'ex.div_fact', vars: { a: baskets, b: quotient, c: total, answer: quotient } },
  });
};

GEN.div_remainder = (target, rng, kind) => {
  const tier = pickTier([
    { d: 680, gen: () => [rng.int(2, 5), rng.int(2, 5)] },
    { d: 820, gen: () => [rng.int(3, 8), rng.int(3, 9)] },
    { d: 960, gen: () => [rng.int(6, 9), rng.int(6, 12)] },
  ], target);
  const [baskets, quotient] = tier.gen();
  const remainder = rng.int(1, baskets - 1);
  const total = baskets * quotient + remainder;
  return shareProblem(rng, kind, {
    total, baskets, quotient, remainder, d: tier.d,
    meta: { baskets, quotient, total, remainder },
    explain: { key: 'ex.remainder_ignored', vars: { total, baskets, quotient, remainder, answer: quotient } },
  });
};

GEN.missing_factor = (target, rng, kind) => {
  const tier = pickTier([
    { d: 640, gen: () => [rng.int(2, 5), rng.int(2, 5)] },
    { d: 780, gen: () => [rng.int(3, 9), rng.int(3, 9)] },
    { d: 900, gen: () => [rng.int(6, 12), rng.int(6, 9)] },
  ], target);
  const [a, b] = tier.gen(); // ? × b = c, answer a
  const c = a * b;
  if (kind === 'share') {
    return shareProblem(rng, 'share', {
      total: c, baskets: b, quotient: a, remainder: 0, d: tier.d,
      meta: { a, b, c },
      explain: { key: 'ex.missing_factor', vars: { a, b, c, answer: a } },
    });
  }
  return {
    kind: 'fetch',
    equation: `? × ${b} = ${c}`,
    prompt: { key: 'q.missing', vars: { b, c } },
    answer: a,
    choices: buildChoices(rng, a, [
      { value: a + (rng.chance(0.5) ? 1 : -1), tag: 'off_by_table' },
      { value: c - b, tag: 'addsub_confuse' },
      { value: reverseDigits(a), tag: 'reversed' },
    ]),
    model: { kind: 'array', params: { rows: a, cols: b, total: c, given: 'total' } },
    explain: { key: 'ex.missing_factor', vars: { a, b, c, answer: a } },
    difficulty: tier.d,
    meta: { a, b, c },
  };
};

GEN.frac_magnitude = (target, rng, kind, scaffold) => {
  const tier = pickTier([
    { d: 520, denoms: [2, 4], hi: 1 },
    { d: 700, denoms: [3, 6, 8], hi: 1 },
    { d: 880, denoms: [5, 10, 12], hi: 1 },
    { d: 1040, denoms: [3, 4, 5, 6, 8], hi: 2 },
  ], target);
  const d = rng.pick(tier.denoms);
  const hi = tier.hi;
  let n = hi === 1 ? rng.int(1, d - 1) : rng.int(1, 2 * d - 1);
  if (n % d === 0) n += 1; // never an integer position
  const tol = [0.05, 0.03, 0.02][scaffold];
  const ticks = d * hi; // segment count (the bridge derives its scaffold from `scaffold`)
  return {
    kind: 'numberline',
    equation: `${n}/${d}`,
    prompt: { key: 'q.numberline', vars: { n, d } },
    answer: n / d,
    accept: { tol },
    choices: null,
    model: { kind: 'numberline', params: { n, d, lo: 0, hi, ticks } },
    explain: { key: 'ex.magnitude', vars: { n, d } },
    difficulty: tier.d,
    meta: { n, d, lo: 0, hi },
  };
};

GEN.frac_compare = (target, rng) => {
  const tier = pickTier([
    { d: 620, denoms: [2, 3, 4] },
    { d: 760, denoms: [2, 3, 4, 6, 8] },
    { d: 920, denoms: [3, 5, 8, 10, 12] },
  ], target);
  // Four proper fractions with pairwise-distinct values; find the largest.
  const seen = new Set();
  const pool = [];
  const tryAdd = (n, d) => {
    const g = gcd(n, d);
    const key = `${n / g}/${d / g}`;
    if (seen.has(key)) return;
    seen.add(key);
    pool.push({ n, d, v: n / d });
  };
  let guard = 0;
  while (pool.length < 4 && guard++ < 200) {
    const d = rng.pick(tier.denoms);
    tryAdd(rng.int(1, d - 1), d);
  }
  for (const [n, d] of [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [4, 5], [5, 6]]) {
    if (pool.length >= 4) break;
    tryAdd(n, d);
  }
  pool.sort((x, y) => y.v - x.v);
  const correct = pool[0];
  const rest = pool.slice(1);
  // 'big numerals, smaller value' -> classic whole-number bias trap.
  const wnb = rest.reduce((m, f) => (f.n + f.d > m.n + m.d ? f : m), rest[0]);
  const others = rest.filter((f) => f !== wnb);
  const near = others.reduce((m, f) => (correct.v - f.v < correct.v - m.v ? f : m), others[0]);
  const choices = rng.shuffle([
    { value: `${correct.n}/${correct.d}`, tag: 'correct' },
    ...rest.map((f) => ({
      value: `${f.n}/${f.d}`,
      tag: f === wnb ? 'whole_number_bias' : f === near ? 'near_miss' : 'random',
    })),
  ]);
  return {
    kind: 'fetch',
    equation: `${choices.map((c) => c.value).join(' · ')} → ?`,
    prompt: { key: 'q.compare', vars: { count: 4 } },
    answer: `${correct.n}/${correct.d}`,
    choices,
    model: { kind: 'numberline', params: { n: correct.n, d: correct.d, lo: 0, hi: 1, ticks: correct.d + 1 } },
    explain: { key: 'ex.whole_number_bias', vars: { n: wnb.n, d: wnb.d, answer: `${correct.n}/${correct.d}` } },
    difficulty: tier.d,
    meta: { fractions: pool.map((f) => `${f.n}/${f.d}`) },
  };
};

GEN.frac_equiv = (target, rng) => {
  const tier = pickTier([
    { d: 660, denoms: [2, 3, 4], kMax: 3 },
    { d: 800, denoms: [2, 3, 4, 5, 6], kMax: 4 },
    { d: 940, denoms: [3, 4, 5, 6, 8], kMax: 6 },
  ], target);
  const d = rng.pick(tier.denoms);
  const n = rng.pick(coprimes(d));
  const k = rng.int(2, tier.kMax);
  const answer = `${n * k}/${d * k}`;
  const choices = buildFracChoices(rng, answer, [
    { value: `${n + k}/${d + k}`, tag: 'add_tops_bottoms' },
    { value: `${n * k + 1}/${d * k}`, tag: 'near_miss' },
    { value: `${(n + 1) * k}/${(d + 1) * k}`, tag: 'whole_number_bias' },
    { value: `${n * k}/${d * (k + 1)}`, tag: 'near_miss' },
  ], (j) => `${n * k + 2 + j}/${d * k}`);
  return {
    kind: 'fetch',
    equation: `${n}/${d} = ?`,
    prompt: { key: 'q.equiv', vars: { n, d } },
    answer,
    choices,
    model: { kind: 'numberline', params: { n, d, lo: 0, hi: 1, ticks: d * k + 1 } },
    explain: { key: 'ex.equiv', vars: { n, d, answer } },
    difficulty: tier.d,
    meta: { n, d, k },
  };
};

GEN.frac_of_n = (target, rng) => {
  const tier = pickTier([
    { d: 720, denoms: [2, 4], mMin: 2, mMax: 6 },
    { d: 880, denoms: [3, 4, 6, 8], mMin: 3, mMax: 8 },
    { d: 1040, denoms: [5, 8, 10, 12], mMin: 4, mMax: 10 },
  ], target);
  const d = rng.pick(tier.denoms);
  const n = rng.pick(coprimes(d));
  const whole = d * rng.int(tier.mMin, tier.mMax);
  const unit = whole / d;
  const answer = unit * n;
  return {
    kind: 'fetch',
    equation: `${n}/${d} × ${whole} = ?`,
    prompt: { key: 'q.frac_of', vars: { n, d, whole } },
    answer,
    choices: buildChoices(rng, answer, [
      { value: unit, tag: 'whole_number_bias' }, // divided but ignored the numerator
      { value: answer + unit, tag: 'near_miss' },
      { value: answer - unit, tag: 'near_miss' },
      { value: whole - n, tag: 'random' },
    ]),
    model: { kind: 'baskets', params: { total: whole, baskets: d, quotient: unit, remainder: 0 } },
    explain: { key: 'ex.generic', vars: { n, d, whole, answer } },
    difficulty: tier.d,
    meta: { n, d, whole },
  };
};

// ---------- kind capability ----------

const NATURAL_KIND = {
  add_20: 'fetch', sub_20: 'fetch', missing_addend: 'fetch', add_100: 'fetch', sub_100: 'fetch',
  tables_a: 'fetch', tables_b: 'fetch', tables_c: 'fetch', tables_mix: 'fetch', mult_2digit: 'fetch',
  div_facts: 'fetch', share: 'share', div_remainder: 'share', missing_factor: 'fetch',
  frac_magnitude: 'numberline', frac_compare: 'fetch', frac_equiv: 'fetch', frac_of_n: 'fetch',
};

const KINDS_SUPPORTED = {
  add_20: ['fetch'], sub_20: ['fetch'], missing_addend: ['fetch'], add_100: ['fetch'], sub_100: ['fetch'],
  tables_a: ['fetch', 'array'], tables_b: ['fetch', 'array'], tables_c: ['fetch', 'array'],
  // mult_2digit arrays (cols 12-99) can never fit the 10×8 soil patch — fetch
  // only, with the partial-products panel as its visual model
  tables_mix: ['fetch', 'array'], mult_2digit: ['fetch'],
  div_facts: ['fetch', 'share'], share: ['share', 'fetch'],
  div_remainder: ['share', 'fetch'], missing_factor: ['fetch', 'share'],
  frac_magnitude: ['numberline'], frac_compare: ['fetch'], frac_equiv: ['fetch'], frac_of_n: ['fetch'],
};

function chooseKind(skillId, s, forced, rng) {
  const supported = KINDS_SUPPORTED[skillId];
  if (forced) return supported.includes(forced) ? forced : NATURAL_KIND[skillId];
  const natural = NATURAL_KIND[skillId];
  const { world } = SKILLS[skillId];
  if (s.n >= COLD_N && natural === 'fetch') {
    if (world === 'garden' && supported.includes('array') && rng.chance(0.35)) return 'array';
    if (world === 'stump' && supported.includes('share') && rng.chance(0.35)) return 'share';
  }
  return natural;
}

// ---------- selection ----------

// Linear prereqs => the first unmastered skill in a world has its prereqs met.
function focusSkill(math, world) {
  const ids = LADDER[world];
  for (const id of ids) if (!isMastered(math.skills[id])) return id;
  return ids[ids.length - 1];
}

function lastPracticed(math, skillId) {
  for (let i = math.log.length - 1; i >= 0; i--) {
    if (math.log[i].skill === skillId) return math.log[i].t;
  }
  return 0;
}

// Weakest stale skill: lowest rating among practiced skills; ties (within a
// hair) go to the least recently practiced.
function echoSkill(math) {
  const practiced = Object.keys(SKILLS).filter((id) => math.skills[id].n > 0);
  if (!practiced.length) return null;
  practiced.sort((p, q) => {
    const dr = math.skills[p].r - math.skills[q].r;
    if (Math.abs(dr) > 1) return dr;
    return lastPracticed(math, p) - lastPracticed(math, q);
  });
  return practiced[0];
}

function targetDifficulty(s, rng) {
  let t = s.r - TARGET_OFFSET;
  if (s.n < COLD_N) {
    t -= (COLD_N - s.n) * 25; // cold start: open gently
    let streak = 0;
    for (let i = s.hist.length - 1; i >= 0 && s.hist[i] === 1; i--) streak++;
    t += streak * 45; // ...but ramp fast on consecutive wins
  }
  return t + (rng.float() - 0.5) * 80;
}

// opts: { world?, kind?, echo?, rng?, skill? } — skill is an extension used by
// tests and duels to force a specific skill; the core game never passes it.
export function nextProblem(math, opts = {}) {
  const rng = opts.rng ?? new Rng((Math.random() * 2 ** 32) >>> 0);
  let skillId;
  if (opts.skill && SKILLS[opts.skill]) {
    skillId = opts.skill;
  } else if (opts.echo) {
    skillId = echoSkill(math) ?? focusSkill(math, opts.world ?? rng.pick(WORLDS));
  } else {
    const world = opts.world && WORLDS.includes(opts.world) ? opts.world : rng.pick(WORLDS);
    const focus = focusSkill(math, world);
    const roll = rng.float();
    if (roll < 0.7) {
      skillId = focus;
    } else if (roll < 0.9) {
      skillId = LADDER[world][SKILLS[focus].order - 1] ?? focus;
    } else {
      const mastered = Object.keys(SKILLS).filter((id) => id !== focus && isMastered(math.skills[id]));
      skillId = mastered.length ? rng.pick(mastered) : focus;
    }
  }
  const s = math.skills[skillId];
  const scaffold = scaffoldFor(s.r);
  const kind = chooseKind(skillId, s, opts.kind, rng);
  const inner = GEN[skillId](targetDifficulty(s, rng), rng, kind, scaffold);
  const id = `${skillId}-${Math.floor(rng.float() * 0xffffffff).toString(36)}${Math.floor(rng.float() * 0xffffffff).toString(36)}`;
  return {
    id,
    skillId,
    world: SKILLS[skillId].world,
    kind: inner.kind,
    equation: inner.equation,
    prompt: inner.prompt,
    answer: inner.answer,
    accept: inner.accept ?? null,
    choices: inner.choices ?? null,
    model: inner.model,
    scaffold,
    difficulty: inner.difficulty,
    explain: inner.explain,
    meta: inner.meta,
  };
}

// ---------- results, facts, mastery ----------

const FACT_SKILLS = new Set(['tables_a', 'tables_b', 'tables_c', 'tables_mix', 'div_facts']);

const gemLit = (f) => !!f && f.ok >= 3 && f.lastOk;

// Times-table fact gems; commutative twins light (and track) together.
function updateFacts(math, problem, correct) {
  if (!FACT_SKILLS.has(problem.skillId)) return [];
  const { a, b } = problem.meta ?? {};
  if (!a || !b || a > 10 || b > 10) return [];
  const keys = a === b ? [`${a}x${b}`] : [`${a}x${b}`, `${b}x${a}`];
  const newly = [];
  for (const key of keys) {
    const f = math.facts[key] ?? (math.facts[key] = { n: 0, ok: 0, lastOk: false });
    const was = gemLit(f);
    f.n += 1;
    if (correct) f.ok += 1;
    f.lastOk = !!correct;
    if (!was && gemLit(f)) newly.push(key);
  }
  return newly;
}

export function recordResult(math, problem, res) {
  const s = math.skills[problem.skillId];
  const wasMastered = isMastered(s);
  const expected = expectedFor(s.r, problem.difficulty);
  const K = s.n < 20 ? 32 : 16;
  const score = res.correct ? (res.usedHint ? 0.7 : 1) : 0;
  const delta = K * (score - expected);
  s.r += delta;
  s.n += 1;
  s.hist.push(res.correct ? 1 : 0);
  if (s.hist.length > HIST_MAX) s.hist.shift();
  math.log.push({
    t: Date.now(),
    skill: problem.skillId,
    tag: problem.explain?.key ?? null,
    ok: !!res.correct,
    ms: res.ms ?? 0,
    hint: !!res.usedHint,
  });
  if (math.log.length > LOG_MAX) math.log.splice(0, math.log.length - LOG_MAX);
  const newGems = updateFacts(math, problem, !!res.correct);
  const masteredSkill = !wasMastered && isMastered(s) ? problem.skillId : null;
  return { delta, rating: s.r, masteredSkill, newGems };
}

export function masteryReport(math) {
  const worlds = {};
  for (const world of WORLDS) {
    const skills = LADDER[world].map((id) => {
      const s = math.skills[id];
      return {
        id,
        nameKey: SKILLS[id].nameKey,
        rating: Math.round(s.r),
        acc10: acc(s.hist),
        n: s.n,
        mastered: isMastered(s),
      };
    });
    const pct = skills.reduce((sum, sk) => sum + (sk.mastered ? 1
      : clamp((sk.rating - START_RATING) / (MASTERY_RATING - START_RATING), 0, 1)
        * Math.min(1, sk.n / MASTERY_MIN_N)), 0) / skills.length;
    worlds[world] = { pct, skills };
  }
  const lit = Object.keys(math.facts).filter((key) => gemLit(math.facts[key]));
  const weakest = Object.keys(SKILLS)
    .filter((id) => math.skills[id].n > 0)
    .sort((p, q) => math.skills[p].r - math.skills[q].r)
    .slice(0, 3);
  return { worlds, gems: { lit, total: 100 }, weakest };
}
