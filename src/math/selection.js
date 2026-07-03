// Skill selection and problem assembly — the adaptive core. Picks which skill to
// serve (focus / echo / prereq / mastered-review), targets a difficulty ~108 Elo
// under the effective rating (≈65% expected success), and hands off to the domain
// generators. nextProblem is the engine's main entry point.
import {
  SKILLS, LADDER, WORLDS, COLD_N, TARGET_OFFSET, MASTERY_RATING,
} from './config.js';
import {
  isMastered, effectiveRating, lastPracticed, offsetForSuccess, scaffoldFor,
} from './rating.js';
import { GEN } from './generators/index.js';

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

// Whether a skill can generate the given interaction kind. Mimi's Check uses
// this to probe only skills the DOM overlay can present (fetch): frac_magnitude
// is numberline-only — its 3D vine lives in the chambers, not in an overlay.
export function skillSupportsKind(skillId, kind) {
  return KINDS_SUPPORTED[skillId]?.includes(kind) ?? false;
}

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
  // Confirm probes (opts.probe — Mimi's Check, docs/05 §3.3): difficulty anchors to
  // the SKILL's mastery bar, not the child's current rating, so the item asks "is
  // this step solid?" at the confirm target (~87% for a master) instead of adapting
  // to ability. probe.scaffold overrides for the ERWD drop-a-representation retry.
  const probe = opts.probe || null;
  const probeTarget = probe
    ? MASTERY_RATING - offsetForSuccess(probe.targetSuccess ?? 0.87)
    : 0;
  const scaffold = probe
    ? (probe.scaffold ?? scaffoldFor(probeTarget))
    : scaffoldFor(effR);
  const kind = chooseKind(skillId, s, opts.kind, rng);
  const target = probe
    ? probeTarget + (rng.float() - 0.5) * 40
    : targetDifficulty(s, rng, effR);
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
