import { getPack, listObjectives } from './index.js';
import { LADDER_STEPS } from './ladder.js';

const DEFAULT_PACK = 'NL_PO';

// Two success targets (docs/04 §2): deliberately-effortful active practice at the
// frontier (~65%), and affirming confirmation for placement / compaction / spaced
// review (~85-90%). A confirmation that fails a third of the time reads as punishment.
export const PRACTICE_TARGET = 0.65;
export const CONFIRM_TARGET = 0.87;

const BAND_SIZE = 8;

function parseAge(age) {
  if (age == null) return null;
  if (typeof age === 'string' && age.trim() === '') return null;
  const n = Number(age);
  return Number.isFinite(n) ? n : null;
}

function parseYmd(value) {
  if (!value) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return {
      y: value.getFullYear(),
      m: value.getMonth() + 1,
      d: value.getDate(),
    };
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value));
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  return { y, m, d };
}

function ymdString(value) {
  const parsed = parseYmd(value);
  if (!parsed) return null;
  return `${String(parsed.y).padStart(4, '0')}-${String(parsed.m).padStart(2, '0')}-${String(parsed.d).padStart(2, '0')}`;
}

function todayString() {
  return ymdString(new Date());
}

export function ageOnDate(birthDate, onDate = todayString()) {
  const birth = parseYmd(birthDate);
  const today = parseYmd(onDate);
  if (!birth || !today) return null;
  let age = today.y - birth.y;
  if (today.m < birth.m || (today.m === birth.m && today.d < birth.d)) age -= 1;
  return age >= 0 ? age : null;
}

function elapsedYearsSince(startDate, onDate = todayString()) {
  const start = parseYmd(startDate);
  const today = parseYmd(onDate);
  if (!start || !today) return 0;
  let years = today.y - start.y;
  if (today.m < start.m || (today.m === start.m && today.d < start.d)) years -= 1;
  return Math.max(0, years);
}

export function estimateStageFromAge(packId = DEFAULT_PACK, age = null) {
  const pack = getPack(packId);
  const n = parseAge(age);
  if (n == null) return null;
  const match = pack.stages.find((s) => n >= s.minAge && n < s.maxAge);
  if (match) return match.id;
  if (n < pack.stages[0].minAge) return pack.stages[0].id;
  return pack.stages[pack.stages.length - 1].id;
}

export function currentCurriculumAge(curriculum = {}, onDate = todayString()) {
  if (curriculum.birthDate) return ageOnDate(curriculum.birthDate, onDate);
  const ageAtStart = parseAge(curriculum.ageAtStart);
  if (ageAtStart == null) return null;
  if (!curriculum.ageCapturedOn) return ageAtStart;
  return ageAtStart + elapsedYearsSince(curriculum.ageCapturedOn, onDate);
}

export function createCurriculumState({
  packId = DEFAULT_PACK,
  age = null,
  birthDate = null,
  today = null,
} = {}) {
  const pack = getPack(packId);
  const resolvedPackId = pack.id || DEFAULT_PACK;
  const normalizedToday = today ? ymdString(today) : null;
  const normalizedBirthDate = ymdString(birthDate);
  const ageAtStart = normalizedBirthDate
    ? ageOnDate(normalizedBirthDate, normalizedToday || todayString())
    : parseAge(age);
  const shouldCaptureAge = normalizedBirthDate || (ageAtStart != null && normalizedToday);
  const ageCapturedOn = shouldCaptureAge
    ? (normalizedToday || todayString())
    : null;
  const estimatedStage = estimateStageFromAge(resolvedPackId, ageAtStart);
  return {
    packId: resolvedPackId,
    ageAtStart,
    birthDate: normalizedBirthDate,
    ageCapturedOn,
    estimatedStage,
    confirmedStage: estimatedStage,
    stageSource: 'auto',
    lastPromotionCheck: null,
    lastPromotion: null,
    placementBand: 'unknown',
    strictness: 'soft',
    warmup: { completed: false, results: [], skillIds: [] },
  };
}

export function retargetCurriculumPack(curriculum = {}, packId = DEFAULT_PACK) {
  const base = createCurriculumState({
    packId,
    age: currentCurriculumAge(curriculum),
    birthDate: curriculum.birthDate,
    today: todayString(),
  });
  return {
    ...curriculum,
    ...base,
    strictness: curriculum.strictness || base.strictness,
  };
}

function validStageId(pack, stageId) {
  return pack.stages.some((stage) => stage.id === stageId);
}

export function refreshCurriculumForDate(curriculum = {}, onDate = todayString()) {
  const pack = getPack(curriculum.packId || DEFAULT_PACK);
  const checkedOn = ymdString(onDate) || todayString();
  const currentAge = currentCurriculumAge(curriculum, checkedOn);
  const suggestedStage = estimateStageFromAge(pack.id, currentAge);
  const previousEstimated = validStageId(pack, curriculum.estimatedStage)
    ? curriculum.estimatedStage
    : null;
  const previousOrder = stageOrder(pack, previousEstimated);
  const suggestedOrder = stageOrder(pack, suggestedStage);
  const advanced = suggestedOrder != null && (previousOrder == null || suggestedOrder > previousOrder);
  const estimatedStage = advanced ? suggestedStage : (previousEstimated || suggestedStage);
  const inferredParentOverride = curriculum.confirmedStage
    && curriculum.estimatedStage
    && curriculum.confirmedStage !== curriculum.estimatedStage;
  const stageSource = curriculum.stageSource || (inferredParentOverride ? 'parent' : 'auto');
  const confirmedValid = validStageId(pack, curriculum.confirmedStage);
  const confirmedStage = stageSource === 'parent' && confirmedValid
    ? curriculum.confirmedStage
    : estimatedStage;
  const promotion = stageSource === 'auto' && advanced && previousEstimated
    ? { fromStage: previousEstimated, toStage: estimatedStage, on: checkedOn }
    : null;

  return {
    ...curriculum,
    packId: pack.id,
    birthDate: ymdString(curriculum.birthDate),
    estimatedStage,
    confirmedStage,
    stageSource: stageSource === 'parent' && confirmedValid ? 'parent' : 'auto',
    lastPromotionCheck: checkedOn,
    lastPromotion: promotion || curriculum.lastPromotion || null,
    warmup: promotion
      ? { completed: false, results: [], skillIds: [] }
      : (curriculum.warmup || { completed: false, results: [], skillIds: [] }),
  };
}

export function scoreWarmup(results = []) {
  const answered = results.filter((r) => typeof r.correct === 'boolean');
  const correct = answered.filter((r) => r.correct).length;
  const rate = answered.length ? correct / answered.length : 0;
  const band = rate >= 0.85 ? 'ahead' : rate < 0.5 ? 'below' : 'on_track';
  return { band, correct, total: answered.length, rate };
}

function stageOrder(pack, stageId) {
  return pack.stages.find((s) => s.id === stageId)?.order ?? null;
}

function resolveLowerBoundOrder(pack, curriculum) {
  const estimated = stageOrder(pack, curriculum.estimatedStage);
  const confirmed = stageOrder(pack, curriculum.confirmedStage);
  const parentOverride = curriculum.stageSource === 'parent'
    || curriculum.confirmedStage !== curriculum.estimatedStage;
  if (confirmed != null && (estimated == null || parentOverride)) {
    return confirmed;
  }
  return estimated ?? confirmed;
}

export function eligibleObjectives(curriculum = null) {
  if (!curriculum?.packId) return [];
  const pack = getPack(curriculum.packId);
  const lowerBound = resolveLowerBoundOrder(pack, curriculum);
  if (!lowerBound) return listObjectives(pack.id, { status: 'playable' });

  const bandShift = curriculum.placementBand === 'ahead' ? 1
    : curriculum.placementBand === 'below' ? -1 : 0;
  const center = Math.min(pack.stages.length, Math.max(lowerBound, lowerBound + bandShift));
  const stageWindow = curriculum.strictness === 'strict'
    ? [center]
    : Array.from({ length: (center + 1) - lowerBound + 1 }, (_, i) => lowerBound + i);
  const allowed = new Set(stageWindow.filter((n) => n >= 1 && n <= pack.stages.length));

  return listObjectives(pack.id, { status: 'playable' })
    .filter((o) => allowed.has(stageOrder(pack, o.stage)));
}

export function eligibleSkillIds(curriculum = null) {
  return [...new Set(eligibleObjectives(curriculum).flatMap((o) => o.gameSkills || []))];
}

// ---------- placement + compaction over the 64-step ladder (docs/04 §4) ----------
// One ladder for everyone; placement sets the entry, compaction handles everything
// below it. A late starter lives the whole story but practises only at their real edge.

// The top ladder step of a stage's band — the age-Target ceiling. grade_N -> band N-1
// -> steps (N-1)*8 .. N*8-1; the target is the top of that band.
export function targetStepForStage(packId = DEFAULT_PACK, stageId = null) {
  const pack = getPack(packId);
  const order = stageOrder(pack, stageId);
  if (!order) return LADDER_STEPS.length - 1;
  return Math.min(LADDER_STEPS.length - 1, order * BAND_SIZE - 1);
}

function skillStatesFromReport(report) {
  const out = {};
  for (const world of Object.values(report?.worlds || {})) {
    for (const s of world?.skills || []) out[s.id] = s;
  }
  for (const s of report?.business?.skills || []) out[s.id] = s;
  return out;
}

// A step is "solid" when its engine skill reads mastered (the report is decay-adjusted,
// so this means *recently* solid). Observational / cold-start steps carry no Elo gate
// and are solid by definition — they sequence the story, they never block it.
function stepSolid(step, skills) {
  if (!step.legacyGroup) return true;
  return !!skills[step.legacyGroup]?.mastered;
}

// Walk DOWN from the age-Target step to the frontier — the highest step at/below target
// that is not yet solid. Below the frontier, solid steps are `compacted` (cleared by a
// single breeze at the confirm target); genuine gaps stay `active` (real ~65% practice).
// Steps between the frontier and the target are visible `goal`s; above target is `locked`
// future. This is the grade-8-starter answer: identical ladder, different entry.
export function placeOnLadder(report, { targetStep = LADDER_STEPS.length - 1 } = {}) {
  const skills = skillStatesFromReport(report);
  const ceiling = Math.max(0, Math.min(targetStep, LADDER_STEPS.length - 1));
  let frontier = null;
  for (let id = ceiling; id >= 0; id--) {
    if (!stepSolid(LADDER_STEPS[id], skills)) { frontier = id; break; }
  }
  const perStep = {};
  for (const step of LADDER_STEPS) {
    if (step.id > ceiling) perStep[step.id] = 'locked';
    else if (frontier === null) perStep[step.id] = 'compacted'; // solid all the way to the ceiling
    else if (step.id > frontier) perStep[step.id] = 'goal';
    else if (step.id === frontier) perStep[step.id] = 'active';
    else perStep[step.id] = stepSolid(step, skills) ? 'compacted' : 'active';
  }
  return placementLists({ frontier, targetStep: ceiling, perStep });
}

function placementLists(p) {
  return {
    ...p,
    compacted: LADDER_STEPS.filter((s) => p.perStep[s.id] === 'compacted').map((s) => s.id),
    practicing: LADDER_STEPS.filter((s) => p.perStep[s.id] === 'active').map((s) => s.id),
  };
}

// Place using the child's confirmed (parent override) or estimated age stage.
export function placeForCurriculum(curriculum = null, report = null) {
  if (!report) return null;
  const stage = curriculum?.confirmedStage || curriculum?.estimatedStage;
  return placeOnLadder(report, {
    targetStep: targetStepForStage(curriculum?.packId || DEFAULT_PACK, stage),
  });
}

// Compaction demotion (docs/04 §4.3): a confirmed step that is then missed becomes real
// practice and the frontier drops to it — a genuine gap, surfaced cheaply. Access never
// shrinks; only pace and entry move.
export function demoteStep(placement, stepId) {
  if (!placement || !(stepId in placement.perStep)) return placement;
  const perStep = { ...placement.perStep, [stepId]: 'active' };
  const frontier = placement.frontier === null ? stepId : Math.min(placement.frontier, stepId);
  return placementLists({ ...placement, frontier, perStep });
}

export function applyWarmupResult(curriculum, results, opts = {}) {
  const completed = opts.completed ?? true;
  const skillIds = Array.isArray(opts.skillIds)
    ? opts.skillIds.slice(0, 8)
    : Array.isArray(curriculum?.warmup?.skillIds) ? curriculum.warmup.skillIds.slice(0, 8) : [];
  const scored = results.length ? scoreWarmup(results) : curriculum?.warmup?.scored;
  return {
    ...curriculum,
    placementBand: scored?.band ?? curriculum?.placementBand ?? 'unknown',
    warmup: {
      ...curriculum?.warmup,
      completed,
      results: results.slice(-8),
      skillIds,
      ...(scored ? { scored } : {}),
    },
  };
}
