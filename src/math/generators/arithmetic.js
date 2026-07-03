// Number-sense generators (tide world): addition/subtraction to 20 and 100,
// missing addends, and the grade 1-2/8 bookends — counting, number bonds, big
// numbers. Each returns the inner problem fields; nextProblem adds id/skillId/etc.
import { pickTier, buildChoices, reverseDigits } from '../choices.js';

export const ARITH = {};

ARITH.add_20 = (target, rng) => {
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

ARITH.sub_20 = (target, rng) => {
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

ARITH.missing_addend = (target, rng) => {
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

ARITH.add_100 = (target, rng) => {
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

ARITH.sub_100 = (target, rng) => {
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

// counting (grades 1-2, the foundation of the Tree): "what comes next" in the number
// sequence. Three tiers grow the magnitude (to 10, to 20, to ~100). The lowest tier is
// the gentlest in the whole engine — a math-anxious five-year-old's first stones.
ARITH.counting = (target, rng) => {
  const tier = pickTier([
    { d: 400, gen: () => rng.int(1, 8) },
    { d: 520, gen: () => rng.int(9, 18) },
    { d: 640, gen: () => rng.int(20, 96) },
  ], target);
  const a = tier.gen();
  const answer = a + 2; // the number after a, a+1
  return {
    kind: 'fetch',
    equation: `${a}, ${a + 1}, ⬚`,
    prompt: { key: 'q.count', vars: { a } },
    answer,
    choices: buildChoices(rng, answer, [
      { value: a + 1, tag: 'near_miss' }, // stayed put instead of stepping on
      { value: reverseDigits(answer), tag: 'reversed' },
    ], { min: 0 }),
    model: { kind: 'none', params: {} },
    explain: { key: 'ex.near_miss', vars: { answer } },
    difficulty: tier.d,
    meta: { a },
  };
};

// number bonds / splits (grade 2): make-ten facts, then to 20 and to 100-by-tens.
// The strategy the whole +/- staircase is built on (docs/04 step 9).
ARITH.number_bonds = (target, rng) => {
  const tier = pickTier([
    { d: 460, gen: () => [10, rng.int(1, 9)] },
    { d: 580, gen: () => [20, rng.int(2, 18)] },
    { d: 700, gen: () => [100, rng.int(1, 9) * 10] },
  ], target);
  const [c, a] = tier.gen();
  const answer = c - a;
  return {
    kind: 'fetch',
    equation: `${a} + ? = ${c}`,
    prompt: { key: 'q.missing', vars: { a, c } },
    answer,
    choices: buildChoices(rng, answer, [
      { value: c + a, tag: 'addsub_confuse' }, // added instead of finding the gap
      { value: reverseDigits(answer), tag: 'reversed' },
    ], { min: 0 }),
    model: { kind: 'none', params: {} },
    explain: { key: 'ex.near_miss', vars: { answer } },
    difficulty: tier.d,
    meta: { a, c },
  };
};

// big numbers (grade 8): +/- in the hundreds, thousands, and ten-thousands — place
// value reused at scale (docs/04 steps 40/48/56). Reuses the carry-slip distractor
// shape of add_100; the magnitude is the only thing that grows.
ARITH.big_numbers = (target, rng) => {
  const tier = pickTier([
    { d: 820, gen: () => [rng.int(2, 8) * 100 + rng.int(0, 9) * 10, rng.int(1, 8) * 100 + rng.int(0, 9) * 10] },
    { d: 960, gen: () => [rng.int(11, 89) * 100, rng.int(11, 89) * 100] },
    { d: 1100, gen: () => [rng.int(12, 90) * 1000, rng.int(1, 9) * 1100 + rng.int(0, 9) * 100] },
  ], target);
  const [a, b] = tier.gen();
  const answer = a + b;
  return {
    kind: 'fetch',
    equation: `${a} + ${b} = ?`,
    prompt: { key: 'q.fetch', vars: { a, b } },
    answer,
    choices: buildChoices(rng, answer, [
      { value: reverseDigits(answer), tag: 'reversed' },
    ], { min: 0 }),
    model: { kind: 'none', params: {} },
    explain: { key: 'ex.near_miss', vars: { a, b, answer } },
    difficulty: tier.d,
    meta: { a, b },
  };
};
