// Problem-construction helpers — the pure combinatorics the generators lean on:
// distractor pools (numeric / fraction-string / decimal / mixed-division), the
// misconception values that seed them, and the tier picker. All take the rng as a
// parameter and source no entropy of their own, so a generator's output is fixed
// by its (target, rng) inputs. A leaf module: no config, no state.

export const gcd = (a, b) => (b ? gcd(b, a % b) : a);

// Digit-swap misconception value ('reversed'): 62 -> 26, 182 -> 281.
export function reverseDigits(n) {
  if (!Number.isInteger(n) || n < 10) return null;
  const r = Number(String(n).split('').reverse().join(''));
  return r === n || r < 1 ? null : r;
}

export function coprimes(d) {
  const out = [];
  for (let n = 1; n < d; n++) if (gcd(n, d) === 1) out.push(n);
  return out;
}

export function mixedNumberLabel(whole, numerator, denominator) {
  if (!numerator) return whole;
  const carry = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  const w = whole + carry;
  if (!remainder) return w;
  const g = gcd(remainder, denominator);
  const frac = `${remainder / g}/${denominator / g}`;
  return w ? `${w} ${frac}` : frac;
}

export function divisionAnswerLabel(total, divisor) {
  const quotient = Math.floor(total / divisor);
  const remainder = total % divisor;
  return mixedNumberLabel(quotient, remainder, divisor);
}

// Numeric fetch choices (default 6 — a proper stone hunt): answer +
// misconception candidates (in priority order), deduped and kept plausible,
// padded with near misses.
export function buildChoices(rng, answer, candidates, { min = 1, count = 6 } = {}) {
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
export function buildFracChoices(rng, answer, candidates, fill) {
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
export const round3 = (n) => Math.round(n * 1000) / 1000;
export function buildDecimalChoices(rng, answer, candidates, fill, { count = 5 } = {}) {
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

export function buildMixedDivisionChoices(rng, { total, baskets, quotient, remainder }) {
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
export function pickTier(tiers, target) {
  let best = tiers[0];
  for (const t of tiers) if (Math.abs(t.d - target) < Math.abs(best.d - target)) best = t;
  return best;
}
