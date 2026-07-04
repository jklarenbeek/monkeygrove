// Scoring, times-table fact gems, and the mastery report. recordResult is the
// engine's only mutation of a skill's rating (the Elo update, applied AFTER baking
// in any forgetting decay); recordCalibration and reinforceSkill are thin wrappers
// over it. masteryReport is a pure, decay-adjusted view for the Gem Tree / parents.
import {
  WORLDS, BUSINESS_WORLD, LADDER, SKILLS,
  HIST_MAX, LOG_MAX, START_RATING, MASTERY_RATING, MASTERY_MIN_N,
} from './config.js';
import {
  clamp, acc, decayedRating, daysSincePractice, effectiveRating, isMastered, expectedFor,
} from './rating.js';

// The five skills whose per-fact history (math.facts, keyed "7x8") is tracked for the
// Banyan Gem Tree — and, downstream, the Memory Grove's anchor images (docs/06).
export const FACT_SKILLS = new Set(['tables_a', 'tables_b', 'tables_c', 'tables_mix', 'div_facts']);

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
// `kFactor` overrides the default K (recordCalibration passes a boosted one).
export function recordResult(math, problem, res, { now = 0, kFactor = null } = {}) {
  const s = math.skills[problem.skillId];
  // Bake in any forgetting since this skill was last practiced *before* scoring,
  // so a returning child is graded from their current (rusty) rating and the Elo
  // gain that follows genuinely recovers it. This is the engine's only mutation
  // of a decayed rating — selection and reports stay pure views of it.
  s.r = decayedRating(s.r, daysSincePractice(math, problem.skillId, now));
  const wasMastered = isMastered(s);
  const expected = expectedFor(s.r, problem.difficulty);
  const K = kFactor ?? (s.n < 20 ? 32 : 16);
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

// Calibration recording (Mimi's Check, docs/05 §3.6): the same Elo update with an
// uncertainty-boosted K, Klinkenberg-style (Rekentuin's K·(1+4U)) — a brand-new or
// long-rested skill moves up to ~4× faster, so a 12-item placement can do the work
// practice normally spreads over dozens of answers. Uncertainty blends inexperience
// (few attempts) with staleness (days since practice), both capped so K stays bounded.
export function recordCalibration(math, problem, res, { now = 0 } = {}) {
  const s = math.skills[problem.skillId];
  if (!s) return null;
  const staleness = Math.min(1, daysSincePractice(math, problem.skillId, now) / 180);
  const uncertainty = Math.min(1, 1 / (1 + 0.05 * s.n) + staleness / 2);
  return recordResult(math, problem, res, { now, kFactor: 32 * (1 + 3 * uncertainty) });
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
