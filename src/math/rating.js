// Rating math — the Elo-lite core: expected success, the forgetting-curve decay,
// scaffold thresholds, and the mastery test. Also the practice-log timing helpers
// (lastPracticed / daysSincePractice / effectiveRating) that BOTH selection and
// results read, kept here so neither of those has to depend on the other.
// Pure scalar functions over the injected math state — no clock, no entropy.
import {
  MASTERY_RATING, MASTERY_ACC, MASTERY_MIN_N,
  DAY_MS, DECAY_FLOOR, DECAY_GRACE_DAYS, DECAY_HALFLIFE_DAYS,
} from './config.js';

export const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));

// Pull `rating` toward DECAY_FLOOR after `days` of not practicing this skill.
// Exponential (an Ebbinghaus-style forgetting curve), bounded below by the floor
// and never raising a rating. A no-op inside the grace window or at/below the floor.
export function decayedRating(rating, days) {
  if (rating <= DECAY_FLOOR) return rating;
  const elapsed = days - DECAY_GRACE_DAYS;
  if (elapsed <= 0) return rating;
  return DECAY_FLOOR + (rating - DECAY_FLOOR) * 2 ** (-elapsed / DECAY_HALFLIFE_DAYS);
}

export function expectedFor(rating, difficulty) {
  return 1 / (1 + 10 ** ((difficulty - rating) / 400));
}

// Elo offset that yields expected success p against a rating: an item at
// rating − offsetForSuccess(p) is solved with probability p by that rating.
// Confirm probes (Mimi's Check) anchor at MASTERY_RATING − offsetForSuccess(0.87)
// ≈ 520 — an item a child who mastered the skill breezes (docs/04 §2, docs/05 §3.3).
export function offsetForSuccess(p) {
  return 400 * Math.log10(p / (1 - p));
}

export function expectedSuccess(math, problem) {
  return expectedFor(math.skills[problem.skillId].r, problem.difficulty);
}

export function scaffoldFor(rating) {
  return rating < 520 ? 0 : rating < 760 ? 1 : 2;
}

export function acc(hist) {
  return hist.length ? hist.reduce((a, b) => a + b, 0) / hist.length : 0;
}

// `rating` defaults to the stored rating; callers pass the time-decayed
// effective rating so a long-unpracticed skill stops counting as mastered.
export function isMastered(s, rating = s.r) {
  return rating >= MASTERY_RATING && s.n >= MASTERY_MIN_N
    && s.hist.length >= MASTERY_MIN_N && acc(s.hist) >= MASTERY_ACC;
}

export function lastPracticed(math, skillId) {
  for (let i = math.log.length - 1; i >= 0; i--) {
    if (math.log[i].skill === skillId) return math.log[i].t;
  }
  return 0;
}

// Days since this skill was last practiced, per the caller-injected `now`. Zero
// when the engine has no clock (now falsy) or the skill has no logged practice,
// and clamped at 0 so an out-of-order `now` can never *add* mastery.
export function daysSincePractice(math, skillId, now) {
  if (!now) return 0;
  const last = lastPracticed(math, skillId);
  if (!last) return 0;
  return Math.max(0, (now - last) / DAY_MS);
}

// The rating a skill is actually worth right now, after any forgetting decay.
export function effectiveRating(math, skillId, now) {
  return decayedRating(math.skills[skillId].r, daysSincePractice(math, skillId, now));
}
