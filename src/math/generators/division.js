// Division-flavored generators (stump world): division facts, fair sharing,
// remainders, and missing factors. The 'share' kind is the constructed coconut-
// dealing verb; 'fetch' carries the same baskets model. answer = per-basket quotient.
import {
  pickTier, buildChoices, buildMixedDivisionChoices,
  divisionAnswerLabel, reverseDigits,
} from '../choices.js';

export const DIV = {};

// Shared assembly for division-flavored problems. answer = per-basket quotient.
function shareProblem(rng, kind, { total, baskets, quotient, remainder, d, meta, explain }) {
  const model = { kind: 'baskets', params: { total, baskets, quotient, remainder } };
  if (kind === 'share') {
    return {
      kind: 'share',
      equation: `${total} ÷ ${baskets}`,
      prompt: {
        key: remainder > 0 ? 'q.share_remainder' : 'q.share',
        vars: { total, baskets, remainder },
      },
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
    answer: remainder > 0 ? divisionAnswerLabel(total, baskets) : quotient,
    choices: remainder > 0
      ? buildMixedDivisionChoices(rng, { total, baskets, quotient, remainder })
      : buildChoices(rng, quotient, candidates),
    model,
    explain: remainder > 0
      ? { ...explain, vars: { ...(explain.vars || {}), answer: divisionAnswerLabel(total, baskets) } }
      : explain,
    difficulty: d,
    meta: remainder > 0 ? { ...meta, answerLabel: divisionAnswerLabel(total, baskets) } : meta,
  };
}

DIV.div_facts = (target, rng, kind, scaffold, opts = null) => {
  const tier = pickTier([
    { d: 480, gen: () => [rng.pick([2, 5, 10]), rng.int(2, 5)] },
    { d: 600, gen: () => [rng.pick([2, 3, 4, 5, 6, 10]), rng.int(2, 10)] },
    { d: 720, gen: () => [rng.pick([6, 7, 8, 9]), rng.int(3, 10)] },
  ], target);
  // opts.fact (docs/06 §4.5): re-serve this exact fact as its division form
  // (a×b → c ÷ a = b), so an anchored fact can come back through the Sharing world.
  const [a, b] = opts?.fact ? opts.fact : tier.gen(); // c ÷ a = b, underlying fact a×b
  const c = a * b;
  return shareProblem(rng, kind, {
    total: c, baskets: a, quotient: b, remainder: 0, d: tier.d,
    meta: { a, b, c },
    explain: { key: 'ex.div_fact', vars: { a, b, c, answer: b } },
  });
};

DIV.share = (target, rng, kind) => {
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

DIV.div_remainder = (target, rng, kind) => {
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

DIV.missing_factor = (target, rng, kind) => {
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
