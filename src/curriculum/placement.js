import { getPack, listObjectives } from './index.js';

const DEFAULT_PACK = 'NL_PO';

function parseAge(age) {
  if (age == null) return null;
  if (typeof age === 'string' && age.trim() === '') return null;
  const n = Number(age);
  return Number.isFinite(n) ? n : null;
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

export function createCurriculumState({ packId = DEFAULT_PACK, age = null } = {}) {
  const ageAtStart = parseAge(age);
  const estimatedStage = estimateStageFromAge(packId, age);
  return {
    packId,
    ageAtStart,
    estimatedStage,
    confirmedStage: estimatedStage,
    placementBand: 'unknown',
    strictness: 'soft',
    warmup: { completed: false, results: [], skillIds: [] },
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

function resolveStageOrder(pack, curriculum) {
  return stageOrder(pack, curriculum.confirmedStage)
    ?? stageOrder(pack, curriculum.estimatedStage);
}

export function eligibleObjectives(curriculum = null) {
  if (!curriculum?.packId) return [];
  const pack = getPack(curriculum.packId);
  const order = resolveStageOrder(pack, curriculum);
  if (!order) return listObjectives(pack.id, { status: 'playable' });

  const bandShift = curriculum.placementBand === 'ahead' ? 1
    : curriculum.placementBand === 'below' ? -1 : 0;
  const center = Math.min(pack.stages.length, Math.max(1, order + bandShift));
  const stageWindow = curriculum.strictness === 'strict' ? [center] : [center - 1, center, center + 1];
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
