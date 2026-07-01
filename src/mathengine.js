// Monkey Grove math engine — pure logic, no DOM, no three.js, and no ambient
// entropy or clock: callers inject the rng (nextProblem) and the timestamp
// (recordResult), so every output is reproducible from its inputs.
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

// The four story worlds — each maps to one line of the founding hexagram (story
// constants LINE_WORLD), so this list is load-bearing for the cosmology and stays four.
export const WORLDS = ['tide', 'garden', 'stump', 'vines'];

// The business world is a FIFTH skill group that lives OUTSIDE the six-line hexagram:
// it holds the upper-grade decimals/%/scale adaptive skills (SUPER_PROMPT Phase 2,
// the Tree's precision/proportion paths, world: 'business'). It is deliberately not in
// WORLDS, so the four story worlds' mastery gates, the island progress points, and the
// six story lines are untouched; masteryReport surfaces it under its own `business`
// group for the parent dashboard and curriculum coverage.
export const BUSINESS_WORLD = 'business';

const LADDER = {
  // tide grew the bottom (counting, number bonds — grades 1-2) and the top
  // (big_numbers — grade 8 place value) of the number-sense world, filling the two
  // ends of the Tree the 64-step ladder names (docs/04; SUPER_PROMPT Phase 1). Order
  // is the in-world climb; the canonical cross-grade sequence lives in curriculum/ladder.js.
  tide: ['counting', 'number_bonds', 'add_20', 'sub_20', 'missing_addend', 'add_100', 'sub_100', 'big_numbers'],
  garden: ['tables_a', 'tables_b', 'tables_c', 'tables_mix', 'mult_2digit'],
  stump: ['div_facts', 'share', 'div_remainder', 'missing_factor'],
  vines: ['frac_magnitude', 'frac_compare', 'frac_equiv', 'frac_of_n'],
  // Phase 2: decimals/%/scale as first-class adaptive maths (groep 6-8). These feed the
  // business-world Tree paths and the parent coverage, not the four story worlds.
  business: ['dec_compare', 'dec_addsub', 'dec_muldiv', 'frac_dec_pct', 'percent_of', 'percent_adv', 'scale'],
};

// All worlds that carry skills (the four story worlds + the business group). SKILLS is
// built from this so the business skills are real, generatable, and rated; only the
// story-coupled systems read the four-world WORLDS.
export const ALL_WORLDS = Object.keys(LADDER);

export const SKILLS = {};
for (const world of ALL_WORLDS) {
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

// Forgetting curve (TODO_09). A skill's rating drifts back toward the START
// baseline the longer it goes unpracticed, so "mastered" comes to mean *recently*
// mastered and Echo Doors re-target genuinely-fading skills. Deliberately gentle:
// a grace window then a long half-life, so a week away barely nudges while a
// couple of months clearly fades a once-mastered skill back into review range.
// It only ever pulls DOWN toward the floor (a struggling skill below the floor is
// never inflated), and never below a fresh start. Computed lazily from elapsed
// days — never on a timer — so it behaves identically for offline play.
const DAY_MS = 86400000;
const DECAY_FLOOR = START_RATING;     // rust never drops a skill below a fresh start
const DECAY_GRACE_DAYS = 2;           // just-practiced still counts as fresh
const DECAY_HALFLIFE_DAYS = 60;       // slow on purpose — far slower than Elo gain

export function createMathState() {
  const skills = {};
  for (const id of Object.keys(SKILLS)) skills[id] = { r: START_RATING, n: 0, hist: [] };
  return { skills, facts: {}, log: [] };
}

// ---------- small helpers ----------

const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

// Pull `rating` toward DECAY_FLOOR after `days` of not practicing this skill.
// Exponential (an Ebbinghaus-style forgetting curve), bounded below by the floor
// and never raising a rating. A no-op inside the grace window or at/below the floor.
function decayedRating(rating, days) {
  if (rating <= DECAY_FLOOR) return rating;
  const elapsed = days - DECAY_GRACE_DAYS;
  if (elapsed <= 0) return rating;
  return DECAY_FLOOR + (rating - DECAY_FLOOR) * 2 ** (-elapsed / DECAY_HALFLIFE_DAYS);
}

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

// `rating` defaults to the stored rating; callers pass the time-decayed
// effective rating so a long-unpracticed skill stops counting as mastered.
function isMastered(s, rating = s.r) {
  return rating >= MASTERY_RATING && s.n >= MASTERY_MIN_N
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

function mixedNumberLabel(whole, numerator, denominator) {
  if (!numerator) return whole;
  const carry = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  const w = whole + carry;
  if (!remainder) return w;
  const g = gcd(remainder, denominator);
  const frac = `${remainder / g}/${denominator / g}`;
  return w ? `${w} ${frac}` : frac;
}

function divisionAnswerLabel(total, divisor) {
  const quotient = Math.floor(total / divisor);
  const remainder = total % divisor;
  return mixedNumberLabel(quotient, remainder, divisor);
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

// Decimal fetch choices: numeric, NOT integer-rounded (buildChoices is integers only,
// which is why decimals needed their own infrastructure — SUPER_PROMPT §3). Values are
// snapped to 3 decimals to kill float dupes; the answer keeps its exact value.
const round3 = (n) => Math.round(n * 1000) / 1000;
function buildDecimalChoices(rng, answer, candidates, fill, { count = 5 } = {}) {
  const out = [{ value: answer, tag: 'correct' }];
  const vals = [answer];
  const push = (value, tag) => {
    if (out.length >= count || value == null || !Number.isFinite(value) || value < 0) return;
    const v = round3(value);
    if (vals.some((u) => Math.abs(u - v) < 1e-9)) return;
    vals.push(v);
    out.push({ value: v, tag });
  };
  for (const c of candidates) push(c.value, c.tag);
  // `fill` is monotonic-increasing-positive by contract, so count is always reachable.
  let j = 0;
  while (out.length < count && j < 80) push(fill(j++), 'random');
  return rng.shuffle(out);
}

function buildMixedDivisionChoices(rng, { total, baskets, quotient, remainder }) {
  const answer = divisionAnswerLabel(total, baskets);
  const out = [{ value: answer, tag: 'correct' }];
  const used = new Set([String(answer)]);
  const push = (value, tag) => {
    if (out.length >= 6 || value == null) return;
    if (typeof value === 'number' && (!Number.isFinite(value) || value < 0)) return;
    const key = String(value);
    if (!key || used.has(key)) return;
    used.add(key);
    out.push({ value, tag });
  };

  push(quotient, 'remainder_ignored');
  push(quotient + 1, 'near_miss');
  push(mixedNumberLabel(quotient, remainder + 1, baskets), 'near_miss');
  push(mixedNumberLabel(quotient, Math.max(1, remainder - 1), baskets), 'near_miss');
  push(mixedNumberLabel(quotient, remainder, baskets + 1), 'random');

  for (const off of [1, -1, 2, -2, 3, -3]) {
    push(divisionAnswerLabel(total + off, baskets), 'random');
  }
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

// counting (grades 1-2, the foundation of the Tree): "what comes next" in the number
// sequence. Three tiers grow the magnitude (to 10, to 20, to ~100). The lowest tier is
// the gentlest in the whole engine — a math-anxious five-year-old's first stones.
GEN.counting = (target, rng) => {
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
GEN.number_bonds = (target, rng) => {
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
GEN.big_numbers = (target, rng) => {
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

// ---------- Phase 2: decimals, %, scale (the business world's adaptive maths) ----------
// All fetch, all groep 6-8. Difficulty tiers are spaced like the four-world skills so
// the simulated-learner guard holds. Decimals carry numeric (comma-formatted-for-display)
// values; %, and scale answers are integers, so those reuse buildChoices.
const decStr = (n) => String(round3(n)).replace('.', ',');
// Monotonic-increasing positive filler so buildDecimalChoices always reaches `count`.
const decFill = (answer) => (j) => answer + (j + 1) * Math.max(0.01, Math.abs(answer) * 0.1);

// dec_compare — decimals on the line, "fetch the LARGEST". THE highest-leverage trap
// in the game: a longer decimal (0,12) looks bigger than a shorter, larger one (0,4).
// Tagged `decimal_length_bias` so Mimi can name exactly that intuition.
GEN.dec_compare = (target, rng) => {
  const tier = pickTier([{ d: 780 }, { d: 900 }, { d: 1020 }], target);
  const tenth = rng.int(2, 9);
  const answer = tenth / 10;                                  // e.g. 0,4 — the largest
  const trap = (10 + rng.int(2, 9)) / 100;                    // 0,1x: longer, looks bigger, is smaller
  const choices = buildDecimalChoices(rng, answer, [
    { value: trap, tag: 'decimal_length_bias' },
    { value: (tenth - 1) / 10, tag: 'near_miss' },
  ], (j) => Math.max(0.01, (tenth - 1 - j) / 10)); // descending, all < answer
  return {
    kind: 'fetch',
    equation: `${choices.map((c) => decStr(c.value)).join(' · ')} → ?`,
    prompt: { key: 'q.compare_dec', vars: {} },
    answer,
    choices,
    model: { kind: 'none', params: {} },
    explain: { key: 'ex.decimal_length', vars: { answer: decStr(answer) } },
    difficulty: tier.d,
    meta: { answer },
  };
};

// dec_addsub — column decimals; the `comma_misalign` slip (adding digits as if the
// comma were not there) is the tagged distractor.
GEN.dec_addsub = (target, rng) => {
  const tier = pickTier([{ d: 840, dp: 1 }, { d: 960, dp: 2 }, { d: 1080, dp: 2 }], target);
  const scale = 10 ** tier.dp;
  const a = rng.int(11, 89) / scale;
  const b = rng.int(11, 89) / scale;
  const answer = round3(a + b);
  const choices = buildDecimalChoices(rng, answer, [
    { value: a * scale + b * scale, tag: 'comma_misalign' }, // ignored the comma entirely
    { value: round3(a + b + 0.1), tag: 'near_miss' },
  ], decFill(answer));
  return {
    kind: 'fetch',
    equation: `${decStr(a)} + ${decStr(b)} = ?`,
    prompt: { key: 'q.fetch', vars: { a: decStr(a), b: decStr(b) } },
    answer,
    choices,
    model: { kind: 'none', params: {} },
    explain: { key: 'ex.comma_misalign', vars: { answer: decStr(answer) } },
    difficulty: tier.d,
    meta: { a, b },
  };
};

// dec_muldiv — ×/÷ by 10/100/1000; the `comma_misalign` distractor moves the comma the
// wrong way.
GEN.dec_muldiv = (target, rng) => {
  const tier = pickTier([{ d: 860, pow: 10 }, { d: 980, pow: 100 }, { d: 1100, pow: 1000 }], target);
  const base = rng.int(11, 99) / 100;
  const mul = rng.chance(0.5);
  const answer = round3(mul ? base * tier.pow : base / tier.pow);
  const wrong = round3(mul ? base / tier.pow : base * tier.pow); // moved the comma the wrong way
  const choices = buildDecimalChoices(rng, answer, [
    { value: wrong, tag: 'comma_misalign' },
  ], decFill(answer));
  return {
    kind: 'fetch',
    equation: `${decStr(base)} ${mul ? '×' : '÷'} ${tier.pow} = ?`,
    prompt: { key: 'q.fetch', vars: {} },
    answer,
    choices,
    model: { kind: 'none', params: {} },
    explain: { key: 'ex.comma_misalign', vars: { answer: decStr(answer) } },
    difficulty: tier.d,
    meta: { base, pow: tier.pow },
  };
};

// frac_dec_pct — convert between fraction, decimal and percent. The `whole_number_bias`
// distractor reads the numerator as the answer (1/4 -> 0,1 / "1").
GEN.frac_dec_pct = (target, rng) => {
  const tier = pickTier([{ d: 820 }, { d: 940 }, { d: 1060 }], target);
  const opts = [[1, 2, 0.5], [1, 4, 0.25], [3, 4, 0.75], [1, 5, 0.2], [2, 5, 0.4], [1, 10, 0.1], [3, 10, 0.3]];
  const [n, d, answer] = rng.pick(opts);
  const choices = buildDecimalChoices(rng, answer, [
    { value: n / 100, tag: 'whole_number_bias' },
    { value: round3(1 - answer), tag: 'near_miss' },
  ], decFill(answer));
  return {
    kind: 'fetch',
    equation: `${n}/${d} = ⬚`,
    prompt: { key: 'q.fetch', vars: {} },
    answer,
    choices,
    model: { kind: 'none', params: {} },
    explain: { key: 'ex.near_miss', vars: { answer: decStr(answer) } },
    difficulty: tier.d,
    meta: { n, d },
  };
};

// percent_of — % of a quantity (groep 7). Integer answers, so buildChoices fits. The
// `whole_number_bias` distractor returns the whole instead of the part.
GEN.percent_of = (target, rng) => {
  const tier = pickTier([
    { d: 800, pcts: [50, 25, 10], maxMul: 6 },
    { d: 920, pcts: [25, 20, 75], maxMul: 8 },
    { d: 1040, pcts: [20, 30, 15], maxMul: 10 },
  ], target);
  const pct = rng.pick(tier.pcts);
  const base = (100 / gcd(pct, 100)) * rng.int(2, tier.maxMul);
  const answer = base * pct / 100;
  return {
    kind: 'fetch',
    equation: `${pct}% × ${base} = ?`,
    prompt: { key: 'q.fetch', vars: { pct, base } },
    answer,
    choices: buildChoices(rng, answer, [
      { value: base, tag: 'whole_number_bias' },
      { value: reverseDigits(answer), tag: 'reversed' },
    ]),
    model: { kind: 'none', params: {} },
    explain: { key: 'ex.near_miss', vars: { answer } },
    difficulty: tier.d,
    meta: { pct, base },
  };
};

// percent_adv — percent over 100% (groep 8). The `whole_number_bias` distractor ignores
// the part above 100% and just returns the base.
GEN.percent_adv = (target, rng) => {
  const tier = pickTier([{ d: 980 }, { d: 1100 }, { d: 1220 }], target);
  const pct = rng.pick([110, 120, 125, 150, 200]);
  const base = (100 / gcd(pct, 100)) * rng.int(2, 8);
  const answer = base * pct / 100;
  return {
    kind: 'fetch',
    equation: `${pct}% × ${base} = ?`,
    prompt: { key: 'q.fetch', vars: { pct, base } },
    answer,
    choices: buildChoices(rng, answer, [
      { value: base, tag: 'whole_number_bias' },
      { value: reverseDigits(answer), tag: 'reversed' },
    ]),
    model: { kind: 'none', params: {} },
    explain: { key: 'ex.near_miss', vars: { answer } },
    difficulty: tier.d,
    meta: { pct, base },
  };
};

// scale — scale notation 1:S, map length -> real length (groep 7-8). Integer answers.
GEN.scale = (target, rng) => {
  const tier = pickTier([{ d: 900, scales: [10, 50] }, { d: 1020, scales: [100, 250] }, { d: 1140, scales: [500, 1000] }], target);
  const s = rng.pick(tier.scales);
  const map = rng.int(2, 9);
  const answer = map * s;
  return {
    kind: 'fetch',
    equation: `1 : ${s}, ${map} → ?`,
    prompt: { key: 'q.fetch', vars: { s, map } },
    answer,
    choices: buildChoices(rng, answer, [
      { value: map + s, tag: 'addsub_confuse' }, // added the scale instead of multiplying
      { value: reverseDigits(answer), tag: 'reversed' },
    ]),
    model: { kind: 'none', params: {} },
    explain: { key: 'ex.near_miss', vars: { answer } },
    difficulty: tier.d,
    meta: { s, map },
  };
};

// ---------- kind capability ----------

const NATURAL_KIND = {
  dec_compare: 'fetch', dec_addsub: 'fetch', dec_muldiv: 'fetch', frac_dec_pct: 'fetch',
  percent_of: 'fetch', percent_adv: 'fetch', scale: 'fetch',
  counting: 'fetch', number_bonds: 'fetch', big_numbers: 'fetch',
  add_20: 'fetch', sub_20: 'fetch', missing_addend: 'fetch', add_100: 'fetch', sub_100: 'fetch',
  tables_a: 'fetch', tables_b: 'fetch', tables_c: 'fetch', tables_mix: 'fetch', mult_2digit: 'fetch',
  div_facts: 'fetch', share: 'share', div_remainder: 'share', missing_factor: 'fetch',
  frac_magnitude: 'numberline', frac_compare: 'fetch', frac_equiv: 'fetch', frac_of_n: 'fetch',
};

const KINDS_SUPPORTED = {
  dec_compare: ['fetch'], dec_addsub: ['fetch'], dec_muldiv: ['fetch'], frac_dec_pct: ['fetch'],
  percent_of: ['fetch'], percent_adv: ['fetch'], scale: ['fetch'],
  counting: ['fetch'], number_bonds: ['fetch'], big_numbers: ['fetch'],
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

function allowedSetForWorld(allowedSkills, world) {
  if (!Array.isArray(allowedSkills) || !allowedSkills.length) return null;
  const set = new Set(allowedSkills.filter((id) => SKILLS[id]?.world === world));
  return set.size ? set : null;
}

function allowedWorlds(allowedSkills) {
  if (!Array.isArray(allowedSkills) || !allowedSkills.length) return null;
  const worlds = [...new Set(allowedSkills.map((id) => SKILLS[id]?.world).filter(Boolean))];
  return worlds.length ? worlds : null;
}

// Linear prereqs => the first unmastered skill in a world has its prereqs met.
function focusSkill(math, world, allowedSkills = null, now = 0) {
  const allowed = allowedSetForWorld(allowedSkills, world);
  const ids = LADDER[world].filter((id) => !allowed || allowed.has(id));
  for (const id of ids) if (!isMastered(math.skills[id], effectiveRating(math, id, now))) return id;
  return ids[ids.length - 1] ?? LADDER[world][0];
}

function lastPracticed(math, skillId) {
  for (let i = math.log.length - 1; i >= 0; i--) {
    if (math.log[i].skill === skillId) return math.log[i].t;
  }
  return 0;
}

// Days since this skill was last practiced, per the caller-injected `now`. Zero
// when the engine has no clock (now falsy) or the skill has no logged practice,
// and clamped at 0 so an out-of-order `now` can never *add* mastery.
function daysSincePractice(math, skillId, now) {
  if (!now) return 0;
  const last = lastPracticed(math, skillId);
  if (!last) return 0;
  return Math.max(0, (now - last) / DAY_MS);
}

// The rating a skill is actually worth right now, after any forgetting decay.
function effectiveRating(math, skillId, now) {
  return decayedRating(math.skills[skillId].r, daysSincePractice(math, skillId, now));
}

// Weakest stale skill: lowest *effective* (decay-adjusted) rating among practiced
// skills; ties (within a hair) go to the least recently practiced. Because the
// rating decays, a skill mastered long ago and left to fade sinks back to the
// bottom and becomes Echo-eligible again.
function echoSkill(math, allowedSkills = null, now = 0) {
  const allowed = Array.isArray(allowedSkills) && allowedSkills.length ? new Set(allowedSkills) : null;
  const practiced = Object.keys(SKILLS).filter((id) => math.skills[id].n > 0);
  const candidates = allowed ? practiced.filter((id) => allowed.has(id)) : practiced;
  if (!candidates.length) return null;
  const eff = {};
  for (const id of candidates) eff[id] = effectiveRating(math, id, now);
  candidates.sort((p, q) => {
    const dr = eff[p] - eff[q];
    if (Math.abs(dr) > 1) return dr;
    return lastPracticed(math, p) - lastPracticed(math, q);
  });
  return candidates[0];
}

function targetDifficulty(s, rng, baseRating = s.r) {
  let t = baseRating - TARGET_OFFSET;
  if (s.n < COLD_N) {
    t -= (COLD_N - s.n) * 25; // cold start: open gently
    let streak = 0;
    for (let i = s.hist.length - 1; i >= 0 && s.hist[i] === 1; i--) streak++;
    t += streak * 45; // ...but ramp fast on consecutive wins
  }
  return t + (rng.float() - 0.5) * 80;
}

function recentFractionMagnitude(math, limit = 2) {
  const out = [];
  for (let i = math.log.length - 1; i >= 0 && out.length < limit; i--) {
    const e = math.log[i];
    if (e.skill === 'frac_magnitude' && e.item && Number.isFinite(e.value)) out.push(e);
  }
  return out;
}

function fractionSpreadScore(problem, recent, s) {
  const key = `${problem.meta.n}/${problem.meta.d}`;
  let score = 0;
  if (recent[0]?.item === key) score += 12;
  else if (recent.some((e) => e.item === key)) score += 7;
  if (recent.some((e) => Math.abs(e.value - problem.answer) < 1e-9)) score += 6;
  // After the very first half, prefer the neighboring quarter landmarks when
  // possible so one chamber does not ask for the exact middle over and over.
  if (s.n > 0 && s.n < 4 && problem.meta.d === 2) score += 3;
  return score;
}

function spreadFractionMagnitude(initial, math, rng, target, kind, scaffold, s) {
  const recent = recentFractionMagnitude(math);
  if (!recent.length) return initial;
  let best = initial;
  let bestScore = fractionSpreadScore(best, recent, s);
  for (let i = 0; i < 12 && bestScore > 0; i++) {
    const candidate = GEN.frac_magnitude(target, rng, kind, scaffold);
    const score = fractionSpreadScore(candidate, recent, s);
    if (score < bestScore) {
      best = candidate;
      bestScore = score;
    }
  }
  return best;
}

// opts: { world?, kind?, echo?, rng?, skill?, now? } — skill is an extension used
// by tests and duels to force a specific skill; the core game never passes it.
// now (the caller's clock) drives the lazy forgetting decay; omit it (free-play
// without a clock, duels) and selection/difficulty fall back to stored ratings.
export function nextProblem(math, opts = {}) {
  const rng = opts.rng;
  if (!rng) throw new Error('nextProblem requires opts.rng — the engine sources no entropy of its own.');
  const now = opts.now ?? 0;
  let skillId;
  if (opts.skill && SKILLS[opts.skill]) {
    skillId = opts.skill;
  } else if (opts.echo) {
    skillId = echoSkill(math, opts.allowedSkills, now) ?? focusSkill(math, opts.world ?? rng.pick(WORLDS), opts.allowedSkills, now);
  } else {
    const wantedWorld = opts.world && WORLDS.includes(opts.world) ? opts.world : rng.pick(WORLDS);
    const allowedInWantedWorld = allowedSetForWorld(opts.allowedSkills, wantedWorld);
    const constrainedWorlds = allowedWorlds(opts.allowedSkills);
    const world = allowedInWantedWorld || !constrainedWorlds
      ? wantedWorld
      : rng.pick(constrainedWorlds);
    const focus = focusSkill(math, world, opts.allowedSkills, now);
    const allowed = allowedSetForWorld(opts.allowedSkills, world);
    const roll = rng.float();
    if (roll < 0.7) {
      skillId = focus;
    } else if (roll < 0.9) {
      const prev = LADDER[world][SKILLS[focus].order - 1] ?? focus;
      skillId = !allowed || allowed.has(prev) ? prev : focus;
    } else {
      const mastered = Object.keys(SKILLS).filter((id) => id !== focus
        && isMastered(math.skills[id], effectiveRating(math, id, now))
        && (!allowed || allowed.has(id)));
      skillId = mastered.length ? rng.pick(mastered) : focus;
    }
  }
  const s = math.skills[skillId];
  // Serve the rusty learner gentler problems: scaffold and difficulty track the
  // *effective* rating, so a returning child eases back in instead of being met
  // at the wall they last touched two months ago.
  const effR = effectiveRating(math, skillId, now);
  const scaffold = scaffoldFor(effR);
  const kind = chooseKind(skillId, s, opts.kind, rng);
  const target = targetDifficulty(s, rng, effR);
  let inner = GEN[skillId](target, rng, kind, scaffold);
  if (skillId === 'frac_magnitude') {
    inner = spreadFractionMagnitude(inner, math, rng, target, kind, scaffold, s);
  }
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

// `now` is the caller-supplied timestamp stamped into the practice log; the
// engine never reads the clock, so the log replays byte-identically from inputs.
export function recordResult(math, problem, res, { now = 0 } = {}) {
  const s = math.skills[problem.skillId];
  // Bake in any forgetting since this skill was last practiced *before* scoring,
  // so a returning child is graded from their current (rusty) rating and the Elo
  // gain that follows genuinely recovers it. This is the engine's only mutation
  // of a decayed rating — selection and reports stay pure views of it.
  s.r = decayedRating(s.r, daysSincePractice(math, problem.skillId, now));
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
    t: now,
    skill: problem.skillId,
    tag: problem.explain?.key ?? null,
    item: problem.meta?.n !== undefined && problem.meta?.d !== undefined
      ? `${problem.meta.n}/${problem.meta.d}`
      : null,
    value: typeof problem.answer === 'number' ? problem.answer : null,
    ok: !!res.correct,
    ms: res.ms ?? 0,
    hint: !!res.usedHint,
  });
  if (math.log.length > LOG_MAX) math.log.splice(0, math.log.length - LOG_MAX);
  const newGems = updateFacts(math, problem, !!res.correct);
  const masteredSkill = !wasMastered && isMastered(s) ? problem.skillId : null;
  return { delta, rating: s.r, masteredSkill, newGems };
}

// A lightweight external mastery signal: reinforce a real skill from a minigame (the
// music stage) without a full generated problem. It's scored as a fair-difficulty
// practice (difficulty = the skill's current rating, so expected ≈ 0.5), giving a gentle
// Elo nudge on a correct round — so the stage and the chambers feed the SAME mastery
// (a grade-appropriate skip-count on the stage counts toward tables_a, etc.). No-op for
// an unknown skill. Deterministic from inputs (pass `now` as the log timestamp).
export function reinforceSkill(math, skillId, correct, { now = 0 } = {}) {
  const s = math?.skills?.[skillId];
  if (!s) return null;
  return recordResult(math, { skillId, difficulty: s.r, answer: null, meta: {} }, { correct: !!correct }, { now });
}

// Pass `now` for an honest, decay-adjusted snapshot (the Gem Tree and the parent
// dashboard do, so "mastered" means *recently* mastered). Omit it and the report
// reflects stored ratings unchanged — which is exactly what the hub passes when
// it drives the living-gate / island bloom, so a fading rating can never wilt the
// visible reward (that only ever rises, via flags.portalStages).
function skillStatesFor(math, world, now) {
  return LADDER[world].map((id) => {
    const s = math.skills[id];
    const rating = effectiveRating(math, id, now);
    return {
      id,
      nameKey: SKILLS[id].nameKey,
      rating: Math.round(rating),
      acc10: acc(s.hist),
      n: s.n,
      mastered: isMastered(s, rating),
    };
  });
}

function worldPct(skills) {
  return skills.reduce((sum, sk) => sum + (sk.mastered ? 1
    : clamp((sk.rating - START_RATING) / (MASTERY_RATING - START_RATING), 0, 1)
      * Math.min(1, sk.n / MASTERY_MIN_N)), 0) / skills.length;
}

export function masteryReport(math, { now = 0 } = {}) {
  const worlds = {};
  for (const world of WORLDS) {
    const skills = skillStatesFor(math, world, now);
    worlds[world] = { pct: worldPct(skills), skills };
  }
  // The business group rides alongside the four story worlds (not inside `worlds`, so
  // the six-line cosmology and island progress stay four-world), purely so the parent
  // dashboard and curriculum coverage can see decimals/%/scale mastery.
  const businessSkills = skillStatesFor(math, BUSINESS_WORLD, now);
  const lit = Object.keys(math.facts).filter((key) => gemLit(math.facts[key]));
  const weakest = Object.keys(SKILLS)
    .filter((id) => math.skills[id].n > 0)
    .sort((p, q) => effectiveRating(math, p, now) - effectiveRating(math, q, now))
    .slice(0, 3);
  return {
    worlds,
    business: { pct: worldPct(businessSkills), skills: businessSkills },
    gems: { lit, total: 100 },
    weakest,
  };
}
