// Mimi's Check — the adaptive placement/recalibration probe (docs/05-mimi-check.md).
//
// Pure state machine: no DOM, no engine import — only ladder data. The caller
// (main.js) turns each emitted request into a confirm-target item via
// nextProblem({ probe }) and reports the outcome back; this module only decides
// WHAT to ask next and what the evidence means.
//
// Shape of the probe (docs/05 §3.3): Phase A staircases whole bands — start one
// band BELOW the child's expected band (first item ≈ 85-90% success, the Star
// Math anti-anxiety opening), 2 confirm items per band, ascend while solid,
// descend on a miss — until the solid/gap boundary is bracketed. Phase B then
// bisects the boundary band's signature skills to pin the frontier step. A wrong
// answer at a bare/on-demand scaffold gets ONE retry with the model visible
// (ERWD: drop a representation level before declaring a gap).
//
// The machine is evidence-driven: every checkupNext() re-derives the whole plan
// from the answer trail, so a resumed draft, a rushed streak being excluded, or
// a replay all land in the same place. Deterministic — no rng, no clock.
//
// Imports: ladder data, plus one engine capability fact — which skills can be
// presented as a fetch item, since the check runs in a DOM overlay without the
// 3D verb scenes (frac_magnitude is numberline-only and sits this one out; its
// fraction thread is probed in band 5 via frac_compare instead).
import { LADDER_STEPS } from './ladder.js';
import { skillSupportsKind } from '../mathengine.js';

export const CHECKUP_MAX_ITEMS = 16;   // scored budget (~5 min; docs/05 §3.5)
const MAX_BANDS_PROBED = 4;            // Phase A breadth budget
const RUSH_MS = 3000;                  // wrong faster than this looks like rushing
const RUSH_STREAK = 3;                 // three in a row ends the check gently
const MAX_MISCONCEPTIONS = 8;

// Fluency norms (docs/05 §3.4, Bareka power-vs-speed): facts must come fast
// (MTC uses 6 s/fact; Bareka 4-5 s — we stay generous), procedures get thinking
// time. Only ever used to withhold compaction, never to punish.
const FACT_MS = 10000;
const PROCEDURE_MS = 30000;
const FACT_SKILLS = new Set([
  'number_bonds', 'add_20', 'sub_20',
  'tables_a', 'tables_b', 'tables_c', 'tables_mix', 'div_facts',
]);

export function fluentMsFor(skillId) {
  return FACT_SKILLS.has(skillId) ? FACT_MS : PROCEDURE_MS;
}

// Distractor tags that are NOT diagnoses — everything else a wrong pick carries
// (addsub_confuse, reversed, no_carry, whole_number_bias, …) is a misconception
// worth remembering for the first post-check quests (docs/05 §3.6.3).
const NON_DIAGNOSTIC_TAGS = new Set(['correct', 'near_miss', 'random']);

// ---------- band probe points ----------

// A band's signature points: the steps whose legacy engine skill FIRST appears in
// that band — "what is new at this grade". This is the honest 18-skill-resolution
// projection of the 64-step ladder (docs/04 §5): probing a band means probing the
// skills that grade introduces, and the sets are disjoint across bands by
// construction (a skill first-appears exactly once).
const FIRST_APPEARANCE = (() => {
  const first = new Map();
  for (const step of LADDER_STEPS) {
    if (!step.legacyGroup || !skillSupportsKind(step.legacyGroup, 'fetch')) continue;
    if (!first.has(step.legacyGroup)) first.set(step.legacyGroup, step);
  }
  return [...first.values()].sort((a, b) => a.id - b.id);
})();

export function bandProbePoints(band) {
  return FIRST_APPEARANCE.filter((s) => s.band === band)
    .map((s) => ({ stepId: s.id, skillId: s.legacyGroup, world: s.world }));
}

// Phase A asks a band's points in a fixed, deliberate order: open with the
// mid-band representative, follow with the band's first skill (preferring a
// different world so two probes never feel like the same quest twice), then the
// rest ascending. Deterministic — the derivation replays it byte-identically.
function probeOrder(points) {
  if (points.length <= 1) return points.slice();
  const mid = points[Math.floor(points.length / 2)];
  const rest = points.filter((p) => p !== mid);
  const second = rest.find((p) => p.world !== mid.world) || rest[0];
  return [mid, second, ...rest.filter((p) => p !== second)];
}

// ---------- state ----------

// targetBand: the band of the child's groep/stage (1..7 — band 0 is [obs], never
// probed). ageBand: the age-derived band, or null; a child older than their groep
// (a zittenblijver) starts one band gentler (docs/05 §3.2).
export function createCheckup({ targetBand, ageBand = null } = {}) {
  const target = clampBand(targetBand ?? 1);
  const repeated = ageBand != null && ageBand > target;
  return {
    v: 1,
    targetBand: target,
    ageBand: ageBand ?? null,
    startBand: clampBand(target - 1 - (repeated ? 1 : 0)),
    ceilingBand: clampBand(target + 2),
    answers: [],
    flags: { rushed: false, quit: false },
    rushStreak: 0,
    current: null,
  };
}

function clampBand(b) {
  return Math.max(1, Math.min(7, b));
}

// ---------- evidence derivation (pure views over state.answers) ----------

function scoredAnswers(state) {
  return state.answers.filter((a) => !a.unscored && !a.rushed);
}

function answersFor(state, stepId) {
  return scoredAnswers(state).filter((a) => a.stepId === stepId);
}

// One point's verdict from its answer trail:
//   pass       — a correct answer exists (fluent: any correct within the norm;
//                supported: only correct after the scaffold-0 retry)
//   fail       — wrong at the model-visible scaffold too (or retry exhausted)
//   retryable  — wrong at scaffold > 0, ERWD retry not yet offered
//   unknown    — no evidence
function pointState(state, point) {
  const trail = answersFor(state, point.stepId);
  if (!trail.length) return { kind: 'unknown' };
  const correct = trail.filter((a) => a.correct);
  if (correct.length) {
    const fluent = correct.some((a) => a.ms == null || a.ms <= fluentMsFor(point.skillId));
    const firstTry = correct.some((a) => a.scaffold !== 0) || !trail.some((a) => !a.correct);
    return { kind: 'pass', fluent, supported: !firstTry };
  }
  const retried = trail.some((a) => a.scaffold === 0);
  return retried ? { kind: 'fail' } : { kind: 'retryable' };
}

// A band's verdict from its points: any fail/retryable/model-only pass → gap;
// two passes with at least one fluent → solid; two all-slow passes → gap
// (docs/05 §3.3: twice slow descends — "can do, not yet fluent" is not a solid
// band); else pending.
function bandVerdict(state, band) {
  const points = bandProbePoints(band);
  const states = points.map((p) => pointState(state, p));
  if (states.some((s) => s.kind === 'fail' || s.kind === 'retryable'
    || (s.kind === 'pass' && s.supported))) return 'gap';
  const passes = states.filter((s) => s.kind === 'pass');
  if (passes.length >= 2 || (passes.length && passes.length === points.length)) {
    return passes.some((s) => s.fluent) ? 'solid' : 'gap';
  }
  return passes.length ? 'pending' : 'unknown';
}

function bandsWithEvidence(state) {
  const bands = new Set();
  for (const a of scoredAnswers(state)) bands.add(a.stepId >> 3);
  return bands;
}

// ---------- the plan: derive the next request (or the conclusion) ----------

// Internal: derive where the check stands. Returns one of
//   { type: 'emit', request }                       — ask this next
//   { type: 'frontier', frontier, boundary }        — bracketed: frontier step id
//   { type: 'allClear' }                            — solid to the ceiling
//   { type: 'exhausted', frontier }                 — budget out, conservative
function derivePlan(state) {
  const asked = scoredAnswers(state).length;
  const budgetLeft = () => asked < CHECKUP_MAX_ITEMS;

  let band = state.startBand;
  const visitedGuard = new Set();
  for (let guard = 0; guard < 64; guard++) {
    // A gap band directly above a solid band (or band 1) is the boundary — refine it.
    const v = bandVerdict(state, band);
    if (v === 'pending' || v === 'unknown') {
      // Budget guards: a spent item budget, or opening a NEW band when the
      // breadth budget is gone, takes the conservative low frontier instead
      // (docs/05 §3.5 hard stop: better to under-place and let compaction climb).
      const evidence = bandsWithEvidence(state);
      if (!budgetLeft() || (!evidence.has(band) && evidence.size >= MAX_BANDS_PROBED)) {
        return { type: 'exhausted', frontier: firstPointId(band) };
      }
      const next = nextBandProbe(state, band);
      if (next) return { type: 'emit', request: next };
      // no probe points at all (cannot happen for bands 1-7, but stay safe)
      return { type: 'exhausted', frontier: firstPointId(band) };
    }
    if (v === 'solid') {
      if (band + 1 > state.ceilingBand) return { type: 'allClear' };
      const above = bandVerdict(state, band + 1);
      if (above === 'gap') return refineBand(state, band + 1, budgetLeft());
      band = band + 1;
    } else { // gap
      if (band === 1) return refineBand(state, band, budgetLeft());
      const below = bandVerdict(state, band - 1);
      if (below === 'solid') return refineBand(state, band, budgetLeft());
      if (below === 'gap') { band = band - 1; continue; }
      // below is unknown/pending — keep descending only while breadth remains
      const evidence = bandsWithEvidence(state);
      if (evidence.size >= MAX_BANDS_PROBED && !evidence.has(band - 1)) {
        return refineBand(state, band, budgetLeft());
      }
      band = band - 1;
    }
    if (visitedGuard.has(band)) return refineBand(state, band, budgetLeft());
    visitedGuard.add(band);
  }
  return refineBand(state, band, false);
}

function firstPointId(band) {
  const points = bandProbePoints(clampBand(band));
  return points.length ? points[0].stepId : clampBand(band) * 8;
}

// The next Phase-A probe for a band: the first point (in probe order) without
// evidence. Two scored probes are enough for a verdict, so emission stops there.
function nextBandProbe(state, band) {
  const ordered = probeOrder(bandProbePoints(band));
  const withEvidence = ordered.filter((p) => pointState(state, p).kind !== 'unknown');
  if (withEvidence.length >= 2) return null;
  const next = ordered.find((p) => pointState(state, p).kind === 'unknown');
  return next ? probeRequest(next, 'probe') : null;
}

// Phase B: bisect the boundary band's points to pin the frontier (docs/05 §3.3).
// A pass that only came with the model visible ("supported") and a wrong still
// awaiting its ERWD retry both bound the search like a miss — when evidence
// contradicts, trust the miss (conservative placement).
function refineBand(state, boundary, budgetLeft) {
  const b = clampBand(boundary);
  const points = bandProbePoints(b);
  const states = points.map((p) => pointState(state, p));
  const blocks = (s) => s.kind === 'fail' || s.kind === 'retryable'
    || (s.kind === 'pass' && s.supported);

  let hi = points.length;
  for (let i = 0; i < points.length; i++) if (blocks(states[i])) { hi = i; break; }
  let lo = -1;
  for (let i = 0; i < hi; i++) if (states[i].kind === 'pass') lo = i;

  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2);
    const s = states[mid];
    if (blocks(s)) { hi = mid; continue; }
    if (s.kind === 'pass') { lo = mid; continue; }
    if (!budgetLeft) return { type: 'exhausted', frontier: points[mid].stepId };
    return { type: 'emit', request: probeRequest(points[mid], 'probe') };
  }

  if (hi < points.length) {
    // ERWD retry: a wrong at scaffold > 0 gets one model-visible retry before it
    // may count as a genuine gap — resolved before the frontier is declared.
    if (states[hi].kind === 'retryable') {
      if (!budgetLeft) return { type: 'exhausted', frontier: points[hi].stepId };
      return { type: 'emit', request: probeRequest(points[hi], 'retry', 0) };
    }
    return { type: 'frontier', frontier: points[hi].stepId, boundary: b };
  }

  // Every point passed, yet the band read as a gap — that can only be the
  // all-slow case (or a supported-only pass): the frontier is the first step
  // that is not yet fluent/independent, because fluency is what practice must
  // now build there (docs/05 §3.4).
  const softIdx = states.findIndex((s) => s.kind === 'pass' && (!s.fluent || s.supported));
  if (softIdx >= 0) return { type: 'frontier', frontier: points[softIdx].stepId, boundary: b };

  // Fully fluent after refinement (the gap verdict has healed): move on upward.
  if (b + 1 > state.ceilingBand) return { type: 'allClear' };
  const above = bandVerdict(state, b + 1);
  if (above === 'gap') return refineBand(state, b + 1, budgetLeft);
  return { type: 'frontier', frontier: firstPointId(b + 1), boundary: b + 1 };
}

function probeRequest(point, purpose, scaffold = null) {
  return {
    type: 'item',
    stepId: point.stepId,
    skillId: point.skillId,
    scaffold,
    purpose,
    unscored: false,
  };
}

// ---------- public API ----------

// The next thing to do: an item request, or done. The first call emits the
// unscored warm-in freebie (two bands below expectation, model visible — the
// guaranteed first success); after the frontier is bracketed one unscored
// bookend from a solid band closes on a win (docs/05 §3.3).
export function checkupNext(state) {
  if (state.flags.quit || state.flags.rushed) {
    state.current = null;
    return { type: 'done' };
  }
  if (!state.answers.length) {
    const band = clampBand(state.startBand - 1);
    const point = probeOrder(bandProbePoints(band))[0];
    state.current = { ...probeRequest(point, 'warmin', 0), unscored: true };
    return state.current;
  }
  const plan = derivePlan(state);
  if (plan.type === 'emit') {
    state.current = plan.request;
    return state.current;
  }
  // Concluded — offer the bookend once, then done.
  if (!state.answers.some((a) => a.purpose === 'bookend')) {
    const solid = solidBands(state);
    const band = solid.length ? Math.max(...solid) : clampBand(bandOfPlan(plan, state) - 1);
    const point = probeOrder(bandProbePoints(clampBand(band)))[0];
    state.current = { ...probeRequest(point, 'bookend', 0), unscored: true };
    return state.current;
  }
  state.current = null;
  return { type: 'done' };
}

function solidBands(state) {
  const out = [];
  for (let b = 1; b <= 7; b++) if (bandVerdict(state, b) === 'solid') out.push(b);
  return out;
}

function bandOfPlan(plan, state) {
  if (plan.type === 'allClear') return state.ceilingBand;
  const frontier = plan.frontier ?? null;
  return frontier == null ? state.targetBand : Math.max(1, frontier >> 3);
}

// Record the child's answer to the current request. `difficulty` is carried
// opaquely so the caller can batch the Elo calibration afterwards from the same
// trail (docs/05 §3.4: a rushed streak must not write garbage ratings).
export function checkupRecord(state, { correct, ms = null, tag = null, difficulty = null } = {}) {
  const req = state.current;
  if (!req || req.type !== 'item') return state;
  state.answers.push({
    stepId: req.stepId,
    skillId: req.skillId,
    scaffold: req.scaffold ?? null,
    purpose: req.purpose,
    unscored: !!req.unscored,
    correct: !!correct,
    ms: ms == null ? null : Math.max(0, Math.round(ms)),
    tag: tag || null,
    difficulty,
    rushed: false,
  });
  state.current = null;

  // Disengagement guard (docs/05 §3.4): three fast-wrong scored answers in a row
  // end the check and drop themselves from the evidence.
  if (!req.unscored) {
    const fastWrong = !correct && ms != null && ms < RUSH_MS;
    state.rushStreak = fastWrong ? state.rushStreak + 1 : 0;
    if (state.rushStreak >= RUSH_STREAK) {
      state.flags.rushed = true;
      let toMark = RUSH_STREAK;
      for (let i = state.answers.length - 1; i >= 0 && toMark > 0; i--) {
        if (!state.answers[i].unscored) { state.answers[i].rushed = true; toMark--; }
      }
    }
  }
  return state;
}

export function checkupAbort(state) {
  state.flags.quit = true;
  state.current = null;
  return state;
}

// The conclusion. `complete` means the frontier was actually bracketed (or all
// clear); an interrupted check reports incomplete and the caller keeps the draft.
export function checkupResult(state) {
  const plan = derivePlan(state);
  const concluded = plan.type !== 'emit';
  const frontier = plan.type === 'allClear' ? null : (plan.frontier ?? null);
  const scored = scoredAnswers(state);

  const notFluent = [];
  const supported = [];
  for (const band of bandsWithEvidence(state)) {
    for (const point of bandProbePoints(band)) {
      const s = pointState(state, point);
      if (s.kind !== 'pass') continue;
      if (!s.fluent) notFluent.push(point.stepId);
      if (s.supported) supported.push(point.stepId);
    }
  }
  const misconceptions = [...new Set(
    scored.filter((a) => !a.correct && a.tag && !NON_DIAGNOSTIC_TAGS.has(a.tag))
      .map((a) => a.tag),
  )].slice(0, MAX_MISCONCEPTIONS);

  const bands = {};
  for (let b = 1; b <= 7; b++) {
    const v = bandVerdict(state, b);
    if (v === 'solid' || v === 'gap') bands[b] = v;
  }

  return {
    complete: concluded,
    frontier,
    allClear: plan.type === 'allClear',
    exhausted: plan.type === 'exhausted',
    targetBand: state.targetBand,
    ceilingBand: state.ceilingBand,
    bands,
    notFluent: notFluent.sort((a, b) => a - b),
    supported: supported.sort((a, b) => a - b),
    misconceptions,
    itemsAsked: scored.length,
    flags: { ...state.flags },
    answers: state.answers.slice(),
  };
}
