// Phase 2 generators (business world): decimals, %, scale (groep 6-8). All fetch.
// Difficulty tiers are spaced like the four-world skills so the simulated-learner
// guard holds. Decimals carry numeric (comma-formatted-for-display) values; %, and
// scale answers are integers, so those reuse buildChoices.
import {
  pickTier, buildChoices, buildDecimalChoices, round3, gcd, reverseDigits,
} from '../choices.js';

export const DEC = {};

const decStr = (n) => String(round3(n)).replace('.', ',');
// Monotonic-increasing positive filler so buildDecimalChoices always reaches `count`.
const decFill = (answer) => (j) => answer + (j + 1) * Math.max(0.01, Math.abs(answer) * 0.1);

// dec_compare — decimals on the line, "fetch the LARGEST". THE highest-leverage trap
// in the game: a longer decimal (0,12) looks bigger than a shorter, larger one (0,4).
// Tagged `decimal_length_bias` so Mimi can name exactly that intuition.
DEC.dec_compare = (target, rng) => {
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
DEC.dec_addsub = (target, rng) => {
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
DEC.dec_muldiv = (target, rng) => {
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
DEC.frac_dec_pct = (target, rng) => {
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
DEC.percent_of = (target, rng) => {
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
DEC.percent_adv = (target, rng) => {
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
DEC.scale = (target, rng) => {
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
