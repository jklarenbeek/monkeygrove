// Banyan Gem Tree overlay: the 10×10 times-table mosaic plus a per-world skill
// progress list, all read from the mastery report.
import { render, backBtn, WORLD_EMOJI } from './core.js';
import { t } from '../i18n.js';

export function showGems({ report, onClose }) {
  const lit = new Set(report.gems.lit);
  let cells = '<div class="gem-cell head">×</div>';
  for (let c = 1; c <= 10; c++) cells += `<div class="gem-cell head">${c}</div>`;
  for (let r = 1; r <= 10; r++) {
    cells += `<div class="gem-cell head">${r}</div>`;
    for (let c = 1; c <= 10; c++) {
      const on = lit.has(`${r}x${c}`);
      cells += `<div class="gem-cell ${on ? 'lit' : ''}">${on ? '💎' : r * c}</div>`;
    }
  }
  const el = render(`
    ${backBtn()}
    <h2>🌳 ${t('gems.title')}</h2>
    <div class="tagline" style="margin-bottom:8px">${t('gems.sub')}</div>
    <div class="chip" style="margin-bottom:10px">💎 ${t('gems.count', { n: report.gems.lit.length, total: report.gems.total })}</div>
    <div class="card" style="display:flex;justify-content:center"><div id="gem-grid">${cells}</div></div>
    <div class="card">
      <h3>${t('gems.skills')}</h3>
      ${Object.entries(report.worlds).map(([w, info]) => `
        <div style="margin-bottom:8px">
          <div style="font-weight:900">${WORLD_EMOJI[w]} ${t('world.' + w)}</div>
          ${info.skills.map((s) => `
            <div class="skill-row">
              <div class="s-name">${t(s.nameKey)}</div>
              <div class="s-bar"><div class="s-fill" style="width:${Math.round(Math.min(1, Math.max(0, (s.rating - 400) / 600)) * 100)}%"></div></div>
              <div class="s-star">${s.mastered ? '🌟' : (s.n > 0 ? '🌱' : '·')}</div>
            </div>`).join('')}
        </div>`).join('')}
    </div>
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
}
