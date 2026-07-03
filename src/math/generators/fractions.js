// Fraction generators (vines world): magnitude on the number line, "find the
// largest" comparison, equivalence, and fraction-of-a-number. frac_magnitude is
// the constructed numberline verb; the rest are fetch with a numberline model.
import { pickTier, buildChoices, buildFracChoices, coprimes, gcd } from '../choices.js';

export const FRAC = {};

FRAC.frac_magnitude = (target, rng, kind, scaffold) => {
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

FRAC.frac_compare = (target, rng) => {
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

FRAC.frac_equiv = (target, rng) => {
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

FRAC.frac_of_n = (target, rng) => {
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
