import { createMathState, SKILLS } from './mathengine.js';
import { BUILDS, freshIsland } from './island.js';
import { getPack } from './curriculum/index.js';
import { createCurriculumState } from './curriculum/placement.js';
import { BALANCE } from './config.js';
import { createBusinessState, ensureBusinessState } from './business/engine.js';
import { CREATURES, CHARS, HATS, PROPS, AMBIENT } from './models.js';

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
.mg-dev-note{color:var(--ink-soft);font-size:12px;font-weight:800;margin-bottom:8px}
.mg-dev-gallery h4{margin:14px 0 6px;color:var(--ink);font-size:14px;font-weight:950}
.mg-dev-gallery details{margin-top:8px;border-top:1px dashed var(--cream-2);padding-top:6px}
.mg-dev-gallery summary{cursor:pointer;font-weight:900;color:var(--ink-soft);font-size:13px;padding:3px 0}
.mg-dev-creatures{display:grid;grid-template-columns:repeat(auto-fill,minmax(154px,1fr));gap:10px}
.mg-dev-creature{border:2px solid var(--cream-2);border-radius:12px;padding:6px;background:#fff}
.mg-dev-creature-h{font-weight:950;font-size:12px;color:var(--ink);text-align:center;margin-bottom:3px}
.mg-dev-pair{display:grid;grid-template-columns:1fr 1fr;gap:4px}
.mg-dev-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px;margin-top:6px}
.mg-dev-model{margin:0;display:flex;flex-direction:column;align-items:center;gap:2px}
.mg-dev-stage{width:100%;height:74px;display:grid;place-items:center;background:linear-gradient(#eef6ff,#fbf4e6);border-radius:8px;overflow:hidden}
.mg-dev-voxel{width:88%;height:88%;max-height:66px}
.mg-dev-model figcaption{font-size:11px;font-weight:900;color:var(--ink-soft);text-align:center;line-height:1.15}
.mg-dev-model figcaption small{display:block;font-size:9px;color:var(--ink-soft);opacity:.7;font-weight:700}
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

// ---------------------------------------------------------------------------
// Model viewer: render any voxel model as a static isometric SVG, so every
// mesh can be eyeballed straight from the dev-tools panel. Pure data in, an
// <svg> string out — no three.js, no canvas, no mount step (the panel is
// injected as innerHTML). Faces are culled against neighbours (like voxel.js)
// and painted back-to-front with simple top/right/front shading.
const ISO = { tw: 14, th: 7, vh: 11 }; // tile width, depth-height, voxel up-height

function shadeHex(hex, f) {
  const n = parseInt(String(hex).slice(1), 16);
  if (!Number.isFinite(n)) return hex;
  const c = (s) => Math.max(0, Math.min(255, Math.round(((n >> s) & 255) * f)));
  return `#${((1 << 24) + (c(16) << 16) + (c(8) << 8) + c(0)).toString(16).slice(1)}`;
}

function voxelSvg(model, opts = {}) {
  const o = { ...ISO, ...opts };
  const pal = model?.palette || {};
  const vox = [];
  (model?.layers || []).forEach((layer, y) => {
    layer.forEach((row, z) => {
      for (let x = 0; x < row.length; x++) {
        const ch = row[x];
        if (ch === '.' || ch === ' ' || !pal[ch]) continue;
        vox.push({ x, y, z, hex: pal[ch] });
      }
    });
  });
  if (!vox.length) return '';
  const occ = new Set(vox.map((v) => `${v.x},${v.y},${v.z}`));
  const has = (x, y, z) => occ.has(`${x},${y},${z}`);
  // back-to-front: smaller (x+z) is farther; lower y first within a column
  vox.sort((a, b) => (a.x + a.z) - (b.x + b.z) || a.y - b.y || a.x - b.x);

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const pt = (x, y, z) => {
    const sx = (x - z) * (o.tw / 2);
    const sy = (x + z) * (o.th / 2) - y * o.vh;
    if (sx < minX) minX = sx; if (sx > maxX) maxX = sx;
    if (sy < minY) minY = sy; if (sy > maxY) maxY = sy;
    return `${sx.toFixed(1)},${sy.toFixed(1)}`;
  };
  const polys = [];
  for (const { x, y, z, hex } of vox) {
    if (!has(x, y + 1, z)) { // top (+y), brightest
      polys.push(`<polygon points="${pt(x, y + 1, z)} ${pt(x + 1, y + 1, z)} ${pt(x + 1, y + 1, z + 1)} ${pt(x, y + 1, z + 1)}" fill="${hex}"/>`);
    }
    if (!has(x + 1, y, z)) { // right (+x)
      polys.push(`<polygon points="${pt(x + 1, y, z)} ${pt(x + 1, y, z + 1)} ${pt(x + 1, y + 1, z + 1)} ${pt(x + 1, y + 1, z)}" fill="${shadeHex(hex, 0.8)}"/>`);
    }
    if (!has(x, y, z + 1)) { // front (+z), darkest
      polys.push(`<polygon points="${pt(x, y, z + 1)} ${pt(x + 1, y, z + 1)} ${pt(x + 1, y + 1, z + 1)} ${pt(x, y + 1, z + 1)}" fill="${shadeHex(hex, 0.62)}"/>`);
    }
  }
  const pad = 2;
  const w = (maxX - minX) + pad * 2;
  const h = (maxY - minY) + pad * 2;
  return `<svg class="mg-dev-voxel" viewBox="${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}" preserveAspectRatio="xMidYMid meet">${polys.join('')}</svg>`;
}

function modelCard(model, label, sub) {
  const art = voxelSvg(model) || '<span style="font-size:11px;color:#b00">empty</span>';
  return `<figure class="mg-dev-model">
    <div class="mg-dev-stage">${art}</div>
    <figcaption>${esc(label)}${sub ? `<small>${esc(sub)}</small>` : ''}</figcaption>
  </figure>`;
}

function dims(model) {
  let w = 0;
  for (const layer of model.layers) for (const row of layer) w = Math.max(w, row.replace(/[. ]+$/, '').length);
  return `${w}w×${model.layers.length}L`;
}

function modelGalleryHtml() {
  const creatures = CREATURES.map((c) => `
    <div class="mg-dev-creature">
      <div class="mg-dev-creature-h">${esc(c.id)}${c.isDefault ? ' ★' : ''}${c.companion ? ' 💛' : ''}</div>
      <div class="mg-dev-pair">
        ${modelCard(c.small, 'small', dims(c.small))}
        ${modelCard(c.full, 'full', dims(c.full))}
      </div>
    </div>`).join('');
  const grid = (cards) => `<div class="mg-dev-grid">${cards}</div>`;
  const npcs = ['crab', 'crabKing'].filter((id) => CHARS[id])
    .map((id) => modelCard(CHARS[id], id, dims(CHARS[id]))).join('');
  const hats = HATS.map((h) => modelCard(h.model, h.id, dims(h.model))).join('');
  const props = Object.entries(PROPS).map(([k, m]) => modelCard(m, k, dims(m))).join('');
  const ambient = Object.entries(AMBIENT).map(([k, m]) => modelCard(m, k, dims(m))).join('');
  return `
    <div class="mg-dev-gallery">
      <h4>Creature roster — small ↔ full (${CREATURES.length})</h4>
      <div class="mg-dev-creatures">${creatures}</div>
      <details><summary>Story NPCs — crab &amp; Crab King (not avatars/pets)</summary>${grid(npcs)}</details>
      <details><summary>Hats (${HATS.length})</summary>${grid(hats)}</details>
      <details><summary>Props (${Object.keys(PROPS).length})</summary>${grid(props)}</details>
      <details><summary>Ambient critters (${Object.keys(AMBIENT).length})</summary>${grid(ambient)}</details>
    </div>`;
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
    </div>
    <div class="card mg-devtools-panel">
      <h3>Model viewer</h3>
      <div class="mg-dev-note">Every voxel model as a front-lit isometric SVG — no need to leave settings. ★ default avatar · 💛 companion.</div>
      ${modelGalleryHtml()}
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
