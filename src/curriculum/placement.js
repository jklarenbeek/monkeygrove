import { getPack, listObjectives } from './index.js';

const DEFAULT_PACK = 'NL_PO';

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
