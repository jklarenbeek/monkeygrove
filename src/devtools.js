import { createMathState, SKILLS } from './mathengine.js';
import { BUILDS, freshIsland } from './island.js';
import { getPack } from './curriculum/index.js';
import { createCurriculumState } from './curriculum/placement.js';
import { BALANCE } from './config.js';
import { createBusinessState, ensureBusinessState } from './business/engine.js';

export const DEV_PRESETS = [
  { id: 'warmup_done', label: 'Warmup done', detail: 'Intro seen, placement complete.' },
  { id: 'bakery_unlocked', label: 'Bakery unlocked', detail: 'Enough mastery and bananas; bakery not built.' },
  { id: 'bakery_built', label: 'Bakery built', detail: 'Business scene is playable.' },
  { id: 'grade8_business', label: 'Grade 8 business', detail: 'Bakery built with advanced curriculum modes.' },
  { id: 'festival_complete', label: 'Festival complete', detail: 'All builds and all mastery complete.' },
];

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

const STYLE = `<style>
.mg-devtools-panel{border-color:#f4b942}
.mg-devtools-summary,.mg-devtools-worlds{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}
.mg-devtools-summary span,.mg-devtools-worlds span{background:#fff;border:2px solid var(--cream-2);border-radius:999px;color:var(--ink-soft);font-size:13px;font-weight:900;padding:5px 10px}
.mg-devtools-manual{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin:10px 0 14px}
.mg-devtools-manual label{display:flex;flex-direction:column;gap:4px;color:var(--ink-soft);font-size:12px;font-weight:900}
.mg-devtools-manual input,.mg-devtools-manual select{border:2px solid var(--cream-2);border-radius:10px;font-family:var(--font);font-size:14px;font-weight:900;padding:7px 8px;pointer-events:auto}
.mg-devtools-presets{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px}
.mg-devtools-preset{display:flex;flex-direction:column;gap:3px;align-items:flex-start;text-align:left;width:100%}
.mg-devtools-preset small{color:var(--ink-soft);font-family:var(--font);font-size:12px;font-weight:800;line-height:1.25}
</style>`;

function pctValue(summary, world) {
  const raw = summary?.worldValues?.[world] ?? summary?.worlds?.[world] ?? 0;
  if (typeof raw === 'number') return Math.round(raw);
  const n = Number(String(raw).replace('%', ''));
  return Number.isFinite(n) ? Math.round(n) : 0;
}

function manualControlsHtml(summary) {
  if (!summary) return '';
  const pack = getPack(summary.packId || 'NL_PO');
  const stage = summary.stage || pack.stages[0]?.id || 'grade_1';
  const buildCount = Number(summary.buildCount || 0);
  return `
    <form id="settings-manual-devtools" class="mg-devtools-manual">
      <label>Bananas
        <input id="dev-bananas" type="number" min="0" step="1" value="${esc(summary.bananas || 0)}">
      </label>
      <label>Stage
        <select id="dev-stage">
          ${pack.stages.map((s) => `<option value="${esc(s.id)}" ${s.id === stage ? 'selected' : ''}>${esc(s.id)}</option>`).join('')}
        </select>
      </label>
      <label>Builds
        <select id="dev-build-count">
          ${Array.from({ length: BUILDS.length + 1 }, (_, n) => {
            const label = n === 0 ? `0/${BUILDS.length} none` : `${n}/${BUILDS.length} ${BUILDS[n - 1].id}`;
            return `<option value="${n}" ${n === buildCount ? 'selected' : ''}>${esc(label)}</option>`;
          }).join('')}
        </select>
      </label>
      ${Object.keys(WORLD_SKILLS).map((world) => `
        <label>${esc(world)}
          <input id="dev-${esc(world)}" type="number" min="0" max="100" step="1" value="${esc(pctValue(summary, world))}">
        </label>
      `).join('')}
      <button class="btn green" id="dev-apply-manual" type="submit">Apply manual state</button>
    </form>`;
}

export function renderDevTools({ summary, presets = DEV_PRESETS, open = false } = {}) {
  const toggleHtml = `<button class="btn soft" id="settings-extra-toggle">${open ? 'Hide developer tools' : 'Developer tools'}</button>`;
  const panelHtml = !open ? '' : `
    ${STYLE}
    <div class="card mg-devtools-panel">
      <h3>Developer tools</h3>
      ${summary ? `
        <div class="mg-devtools-summary">
          <span>Name: ${esc(summary.name)}</span>
          <span>Bananas: ${esc(summary.bananas)}</span>
          <span>Stage: ${esc(summary.stage)}</span>
          <span>Warmup: ${esc(summary.warmup)}</span>
          <span>Builds: ${esc(summary.builds)}</span>
          <span>Business: ${esc(summary.business)}</span>
        </div>
        <div class="mg-devtools-worlds">
          ${Object.entries(summary.worlds || {}).map(([world, pct]) => `<span>${esc(world)} ${esc(pct)}</span>`).join('')}
        </div>
      ` : ''}
      ${manualControlsHtml(summary)}
      <div class="mg-devtools-presets">
        ${presets.map((preset) => `
          <button class="btn soft mg-devtools-preset" data-settings-preset="${esc(preset.id)}">
            <span>${esc(preset.label)}</span>
            <small>${esc(preset.detail)}</small>
          </button>
        `).join('')}
      </div>
    </div>`;
  return { toggleHtml, panelHtml };
}

const BUILD_ORDER = BUILDS.map((build) => build.id);

function skillsForWorld(world) {
  return Object.values(SKILLS)
    .filter((skill) => skill.world === world)
    .sort((a, b) => a.order - b.order)
    .map((skill) => skill.id);
}

const WORLD_SKILLS = {
  tide: skillsForWorld('tide'),
  garden: skillsForWorld('garden'),
  stump: skillsForWorld('stump'),
  vines: skillsForWorld('vines'),
};

function markSkill(skill, mastered) {
  skill.r = mastered ? 900 : 600;
  skill.n = mastered ? 12 : 0;
  skill.hist = mastered ? Array(10).fill(1) : [];
}

function markSkillProgress(skill, fraction) {
  if (fraction >= 1) {
    markSkill(skill, true);
    return;
  }
  skill.r = Math.round(600 + Math.max(0, Math.min(1, fraction)) * 250);
  skill.n = fraction > 0 ? 10 : 0;
  skill.hist = [];
}

function setMastery(profile, countsByWorld) {
  profile.math = createMathState();
  for (const [world, ids] of Object.entries(WORLD_SKILLS)) {
    const count = countsByWorld[world] ?? 0;
    ids.forEach((id, index) => markSkill(profile.math.skills[id], index < count));
  }
}

function setAllMastered(profile) {
  setMastery(profile, Object.fromEntries(
    Object.entries(WORLD_SKILLS).map(([world, ids]) => [world, ids.length]),
  ));
}

function setWorldMasteryPercent(math, world, percent) {
  const ids = WORLD_SKILLS[world] || [];
  const n = Number(percent);
  const progress = Math.max(0, Math.min(100, Number.isFinite(n) ? n : 0)) / 100 * ids.length;
  ids.forEach((id, index) => {
    const fraction = Math.max(0, Math.min(1, progress - index));
    markSkillProgress(math.skills[id], fraction);
  });
}

function ensureBasics(profile, stage = profile.curriculum?.confirmedStage || 'grade_5') {
  if (!profile.curriculum) profile.curriculum = createCurriculumState({ age: 8 });
  profile.curriculum = {
    ...profile.curriculum,
    estimatedStage: stage,
    confirmedStage: stage,
    stageSource: 'auto',
    placementBand: stage === 'grade_8' ? 'ahead' : (profile.curriculum.placementBand || 'on_track'),
    warmup: {
      ...(profile.curriculum.warmup || {}),
      completed: true,
      scored: profile.curriculum.warmup?.scored || { band: 'on_track' },
    },
  };
  profile.flags = profile.flags || {};
  profile.flags.introSeen = true;
  profile.stats = profile.stats || { chambers: 0, correct: 0, wrong: 0, msPlayed: 0, berries: 0, days: 0 };
}

function setBuilt(profile, ids) {
  if (!profile.island) profile.island = freshIsland();
  profile.island.built = ids.slice();
  profile.island.seen = [...new Set([...(profile.island.seen || []), ...ids])];
}

function stockBusiness(profile) {
  const business = ensureBusinessState(profile);
  business.stock = Object.fromEntries(
    Object.keys(BALANCE.businessStartingStock).map((key) => [key, 20]),
  );
  business.stockLimit = Math.max(business.stockLimit || 0, 20);
  return business;
}

function applyWarmupDone(profile) {
  ensureBasics(profile, 'grade_5');
  profile.bananas = Math.max(profile.bananas || 0, 120);
  return profile;
}

function applyBakeryUnlocked(profile) {
  applyWarmupDone(profile);
  setMastery(profile, { tide: 5, garden: 5, stump: 2, vines: 0 });
  setBuilt(profile, []);
  profile.bananas = Math.max(profile.bananas || 0, 200);
  profile.flags.festivalDone = false;
  return profile;
}

function applyBakeryBuilt(profile) {
  applyBakeryUnlocked(profile);
  setBuilt(profile, BUILD_ORDER.slice(0, BUILD_ORDER.indexOf('bakery') + 1));
  stockBusiness(profile);
  profile.bananas = Math.max(profile.bananas || 0, 500);
  return profile;
}

function applyGrade8Business(profile) {
  applyBakeryBuilt(profile);
  ensureBasics(profile, 'grade_8');
  setMastery(profile, { tide: 5, garden: 5, stump: 4, vines: 2 });
  stockBusiness(profile);
  profile.business.shopCoins = Math.max(profile.business.shopCoins || 0, 2500);
  profile.bananas = Math.max(profile.bananas || 0, 1200);
  return profile;
}

function applyFestivalComplete(profile) {
  applyGrade8Business(profile);
  setAllMastered(profile);
  setBuilt(profile, BUILD_ORDER);
  profile.flags.festivalDone = true;
  profile.flags.portalStages = { tide: 4, garden: 4, stump: 4, vines: 4 };
  profile.bananas = Math.max(profile.bananas || 0, 9999);
  return profile;
}

const APPLY = {
  warmup_done: applyWarmupDone,
  bakery_unlocked: applyBakeryUnlocked,
  bakery_built: applyBakeryBuilt,
  grade8_business: applyGrade8Business,
  festival_complete: applyFestivalComplete,
};

export function applyDevPreset(profile, id) {
  if (!profile || !APPLY[id]) return null;
  APPLY[id](profile);
  return DEV_PRESETS.find((preset) => preset.id === id) || null;
}

export function applyManualDevState(profile, values = {}) {
  if (!profile) return null;
  const bananas = Math.max(0, Math.floor(Number(values.bananas)));
  if (Number.isFinite(bananas)) profile.bananas = bananas;

  const pack = getPack(profile.curriculum?.packId || 'NL_PO');
  const stage = pack.stages.some((s) => s.id === values.stage)
    ? values.stage
    : (profile.curriculum?.confirmedStage || profile.curriculum?.estimatedStage || pack.stages[0]?.id);
  ensureBasics(profile, stage);

  const buildCount = Math.max(0, Math.min(BUILDS.length, Math.floor(Number(values.buildCount))));
  if (Number.isFinite(buildCount)) setBuilt(profile, BUILD_ORDER.slice(0, buildCount));

  if (!profile.math) profile.math = createMathState();
  for (const world of Object.keys(WORLD_SKILLS)) {
    if (values.worlds?.[world] !== undefined) setWorldMasteryPercent(profile.math, world, values.worlds[world]);
  }

  if (profile.island?.built?.includes('bakery')) stockBusiness(profile);
  profile.flags.festivalDone = profile.island?.built?.includes('plaza') || false;
  return { id: 'manual', label: 'Manual state' };
}

export function describeDevState(profile, report) {
  if (!profile) return null;
  const worldValues = Object.fromEntries(Object.entries(report?.worlds || {})
    .map(([world, info]) => [world, Math.round((info.pct || 0) * 100)]));
  const worlds = Object.fromEntries(Object.entries(worldValues)
    .map(([world, pct]) => [world, `${pct}%`]));
  return {
    name: profile.name || 'Explorer',
    bananas: profile.bananas || 0,
    packId: profile.curriculum?.packId || 'NL_PO',
    stage: profile.curriculum?.confirmedStage || profile.curriculum?.estimatedStage || 'unknown',
    warmup: profile.curriculum?.warmup?.completed ? 'done' : 'pending',
    buildCount: profile.island?.built?.length || 0,
    builds: `${profile.island?.built?.length || 0}/${BUILDS.length}`,
    business: profile.island?.built?.includes('bakery') ? 'open' : 'closed',
    worldValues,
    worlds,
  };
}
