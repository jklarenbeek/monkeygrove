// Multiplication generators (garden world): the times-table ladder and 2-digit
// multiplication. The 'array' kind is the constructed Garden verb; 'fetch' carries
// the array model so the UI can materialize it either way.
import { pickTier, buildChoices, reverseDigits } from '../choices.js';

export const MULT = {};

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

MULT.tables_a = tableGen([
  { d: 420, gen: (rng) => [rng.pick([2, 5, 10]), rng.int(1, 5)] },
  { d: 520, gen: (rng) => [rng.pick([2, 5, 10]), rng.int(2, 10)] },
  { d: 640, gen: (rng) => [rng.pick([2, 5, 10]), rng.int(6, 10)] },
]);
MULT.tables_b = tableGen([
  { d: 560, gen: (rng) => [rng.pick([3, 4, 6]), rng.int(2, 5)] },
  { d: 660, gen: (rng) => [rng.pick([3, 4, 6]), rng.int(2, 10)] },
]);
MULT.tables_c = tableGen([
  { d: 680, gen: (rng) => [rng.pick([7, 8, 9]), rng.int(2, 5)] },
  { d: 780, gen: (rng) => [rng.pick([7, 8, 9]), rng.int(2, 10)] },
  { d: 860, gen: (rng) => [rng.pick([7, 8, 9]), rng.int(6, 9)] },
]);
MULT.tables_mix = tableGen([
  { d: 600, gen: (rng) => [rng.int(2, 6), rng.int(2, 6)] },
  { d: 700, gen: (rng) => [rng.int(2, 10), rng.int(2, 10)] },
  { d: 800, gen: (rng) => [rng.int(6, 9), rng.int(6, 9)] },
]);

MULT.mult_2digit = (target, rng, kind, scaffold) => {
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
