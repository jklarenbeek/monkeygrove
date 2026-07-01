// Parents dashboard overlay: pedagogy blurb, curriculum coverage (with optional
// pack/birthday/stage/strictness controls), business coverage, and the per-skill
// accuracy overview.
import { render, backBtn, esc, PET_EMOJI } from './core.js';
import { t } from '../i18n.js';
import { coverageForReport, getPack, listPacks } from '../curriculum/index.js';
import { money, businessModeLabel } from './business.js';
import { STAGE_MODES } from '../stage/data.js';
import { parentWonders } from '../story/wonders.js';

// The deeper "cohesion of nature" reveals (SUPER_PROMPT Phase 7) — a door, not a
// worksheet: gentle "did you know" cards for the parent about the one structure under
// the whole game (the Gem Tree's 64 = the I Ching = the 64 codons of DNA; change one
// line at a time). Opt-in reading, never on the clock.
function wondersHtml() {
  const cards = parentWonders();
  if (!cards.length) return '';
  return `<div class="card">
    <h3>✨ ${t('parents.wonders')}</h3>
    ${cards.map((w) => `
      <div style="margin-bottom:10px">
        <div style="font-weight:800">${t(w.titleKey)}</div>
        <div style="font-size:14px;line-height:1.5;color:var(--ink-soft)">${t(w.bodyKey)}</div>
      </div>`).join('')}
  </div>`;
}

export function curriculumPackLabel(pack) {
  const country = pack.countryKey ? t(pack.countryKey) : pack.countryCode || pack.id;
  return `${country} - ${t(pack.titleKey)}`;
}

export function showParentProfileSelect({ profiles = [], onChoose, onBack }) {
  const el = render(`
    ${backBtn()}
    <h2>${esc(t('parents.choose_child'))}</h2>
    ${profiles.length ? `
      <div class="card parent-picker-card">
        <div class="tile-grid parent-profile-grid">
          ${profiles.map((profile) => {
            const petId = profile.avatar?.pet || profile.pets?.[0] || 'bunny';
            const pet = PET_EMOJI[petId] || '🐵';
            const stage = profile.curriculum?.confirmedStage || profile.curriculum?.estimatedStage;
            const pack = profile.curriculum?.packId ? getPack(profile.curriculum.packId) : null;
            const stageText = pack && stage ? stageLabel(pack, stage) : '';
            return `
              <button class="tile parent-profile-tile" data-parent-profile="${esc(profile.id)}">
                <span class="t-icon">${pet}</span>
                <span class="t-name">${esc(profile.name)}</span>
                ${stageText ? `<span class="t-price">${esc(stageText)}</span>` : ''}
              </button>`;
          }).join('')}
        </div>
      </div>`
      : `<div class="card parent-picker-card"><p>${esc(t('parents.no_profiles'))}</p></div>`}
  `);
  el.querySelector('#scr-back').addEventListener('click', onBack);
  el.querySelectorAll('[data-parent-profile]').forEach((button) => {
    button.addEventListener('click', () => onChoose?.(button.dataset.parentProfile));
  });
}

function stageLabel(pack, stageId) {
  const stage = pack.stages.find((s) => s.id === stageId);
  return stage ? t(stage.labelKey) : t(pack.fallbackStagePrefixKey || 'curriculum.stage', { n: '?' });
}

function curriculumCoverageHtml(profile, report, businessReport = null, stageReport = null, showControls = false) {
  if (!profile?.curriculum || !report) return '';
  const pack = getPack(profile.curriculum.packId);
  const packs = listPacks();
  const coverage = coverageForReport(pack.id, report, { business: businessReport, stage: stageReport });
  const stage = profile.curriculum.confirmedStage || profile.curriculum.estimatedStage;
  const strictness = profile.curriculum.strictness || 'soft';
  return `
    <div class="card">
      <h3>${esc(t('parents.curriculum'))}</h3>
      <div class="curriculum-meta">
        <div class="chip">${esc(t('parents.country'))}: ${esc(pack.countryKey ? t(pack.countryKey) : pack.countryCode || pack.id)}</div>
        <div class="chip">${esc(t('parents.curriculum_pack'))}: ${esc(t(pack.titleKey))}</div>
        ${profile.curriculum.birthDate ? `<div class="chip">${esc(t('parents.birthday'))}: ${esc(profile.curriculum.birthDate)}</div>` : ''}
        <div class="chip">${esc(t('parents.stage'))}: ${esc(stageLabel(pack, stage))}</div>
      </div>
      ${showControls ? `<div class="curriculum-controls">
        <label>
          <span>${esc(t('parents.curriculum_pack'))}</span>
          <select data-pack>
            ${packs.map((p) => `<option value="${esc(p.id)}" ${p.id === pack.id ? 'selected' : ''}>${esc(curriculumPackLabel(p))}</option>`).join('')}
          </select>
        </label>
        <label>
          <span>${esc(t('parents.birthday'))}</span>
          <input type="date" data-birth-date value="${esc(profile.curriculum.birthDate || '')}">
        </label>
        <label>
          <span>${esc(t('parents.stage'))}</span>
          <select data-stage>
            ${pack.stages.map((s) => `<option value="${esc(s.id)}" ${s.id === stage ? 'selected' : ''}>${esc(t(s.labelKey))}</option>`).join('')}
          </select>
        </label>
        <label>
          <span>${esc(t('parents.strictness'))}</span>
          <select data-strictness>
            <option value="soft" ${strictness === 'soft' ? 'selected' : ''}>${esc(t('parents.strictness_soft'))}</option>
            <option value="strict" ${strictness === 'strict' ? 'selected' : ''}>${esc(t('parents.strictness_strict'))}</option>
          </select>
        </label>
      </div>` : ''}
      <div class="tagline" style="color:var(--ink-soft);text-shadow:none;margin-bottom:8px">${esc(t('parents.coverage'))}</div>
      ${Object.values(coverage.domains).filter((d) => d.total > 0).map((d) => `
        <div class="curriculum-domain">
          <div class="skill-row">
            <div class="s-name">${esc(t(d.labelKey))}</div>
            <div class="s-bar"><div class="s-fill" style="width:${Math.round((d.covered / Math.max(1, d.total)) * 100)}%"></div></div>
            <div class="curriculum-count">${d.covered}/${d.total}</div>
          </div>
          <div class="curriculum-objectives">
            ${d.objectives.map((o) => `<span class="curriculum-pill ${o.coverage}">${esc(t(o.titleKey))} · ${esc(t(`parents.${o.coverage}`))}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>`;
}

function parentBusinessHtml(businessReport) {
  if (!businessReport) return '';
  const modes = Object.entries(businessReport.modes || {});
  return `
    <div class="card">
      <h3>${esc(t('parents.business'))}</h3>
      <div class="curriculum-meta">
        <div class="chip">${esc(t('business.orders_served', { n: businessReport.ordersServed || 0 }))}</div>
        <div class="chip">${esc(t('business.profit'))}: ${esc(money(businessReport.profitCents))}</div>
      </div>
      <div class="curriculum-objectives">
        ${modes.map(([id, mode]) => {
          const coverage = mode?.coverage || 'partial';
          const label = businessModeLabel(id) || t('parents.business');
          return `<span class="curriculum-pill ${esc(coverage)}">${esc(label)} · ${esc(t(`parents.${coverage}`))}</span>`;
        }).join('')}
      </div>
    </div>`;
}

// The music stage's per-song practice, mirroring the business panel — song titles with
// a covered/started/ready pill each, so parents see Kiki's stage feeds real objectives.
function parentStageHtml(stageReport) {
  if (!stageReport) return '';
  const modes = Object.entries(stageReport.modes || {});
  if (!modes.some(([, mode]) => (mode.attempts || 0) > 0)) return '';
  return `
    <div class="card">
      <h3>${esc(t('parents.stage_practice'))}</h3>
      <div class="curriculum-objectives">
        ${modes.map(([id, mode]) => {
          const coverage = mode?.coverage || 'playable';
          const label = t(STAGE_MODES[id]?.titleKey || 'stage.songs');
          return `<span class="curriculum-pill ${esc(coverage)}">${esc(label)} · ${esc(t(`parents.${coverage}`))}</span>`;
        }).join('')}
      </div>
    </div>`;
}

export function showParents({ report, profile, businessReport = null, stageReport = null, onClose, onCurriculumChange }) {
  const el = render(`
    ${backBtn()}
    <h2>${t('parents.title')}</h2>
    <div class="card"><p style="margin:0;font-size:15px;line-height:1.5">${t('parents.body')}</p></div>
    ${profile && report ? `
    ${curriculumCoverageHtml(profile, report, businessReport, stageReport, !!onCurriculumChange)}
    ${parentBusinessHtml(businessReport)}
    ${parentStageHtml(stageReport)}
    <div class="card">
      <h3>${t('parents.skills')} — ${esc(profile.name)}</h3>
      ${Object.entries(report.worlds).map(([w, info]) => info.skills.filter((s) => s.n > 0).map((s) => `
        <div class="skill-row">
          <div class="s-name">${t(s.nameKey)}</div>
          <div class="s-bar"><div class="s-fill" style="width:${Math.round(s.acc10 * 100)}%"></div></div>
          <div style="font-size:12px;color:var(--ink-soft);min-width:90px;text-align:right">
            ${Math.round(s.acc10 * 100)}% · ${t('parents.attempts', { n: s.n })}${s.mastered ? ' · 🌟' : ''}
          </div>
        </div>`).join('')).join('') || '<p style="font-size:14px;color:var(--ink-soft)">—</p>'}
    </div>` : ''}
    ${wondersHtml()}
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
  el.querySelector('[data-pack]')?.addEventListener('change', (e) => {
    onCurriculumChange?.({ packId: e.target.value });
  });
  el.querySelector('[data-birth-date]')?.addEventListener('change', (e) => {
    onCurriculumChange?.({ birthDate: e.target.value });
  });
  el.querySelector('[data-stage]')?.addEventListener('change', (e) => {
    onCurriculumChange?.({ confirmedStage: e.target.value });
  });
  el.querySelector('[data-strictness]')?.addEventListener('change', (e) => {
    onCurriculumChange?.({ strictness: e.target.value });
  });
}
