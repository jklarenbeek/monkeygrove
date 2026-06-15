import { createMathState, SKILLS } from './mathengine.js';
import { BUILDS, freshIsland } from './island.js';
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
.mg-devtools-presets{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px}
.mg-devtools-preset{display:flex;flex-direction:column;gap:3px;align-items:flex-start;text-align:left;width:100%}
.mg-devtools-preset small{color:var(--ink-soft);font-family:var(--font);font-size:12px;font-weight:800;line-height:1.25}
</style>`;

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

export function describeDevState(profile, report) {
  if (!profile) return null;
  const worlds = Object.fromEntries(Object.entries(report?.worlds || {})
    .map(([world, info]) => [world, `${Math.round((info.pct || 0) * 100)}%`]));
  return {
    name: profile.name || 'Explorer',
    bananas: profile.bananas || 0,
    stage: profile.curriculum?.confirmedStage || profile.curriculum?.estimatedStage || 'unknown',
    warmup: profile.curriculum?.warmup?.completed ? 'done' : 'pending',
    builds: `${profile.island?.built?.length || 0}/${BUILDS.length}`,
    business: profile.island?.built?.includes('bakery') ? 'open' : 'closed',
    worlds,
  };
}
