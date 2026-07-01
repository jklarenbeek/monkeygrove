// Banyan Gem Tree overlay: the 10×10 times-table mosaic, the 8×8 hexagram grid it
// secretly IS (the 64 = the I Ching = the 64 codons of DNA), plus a per-world skill
// progress list, all read from the mastery report.
import { render, backBtn, WORLD_EMOJI } from './core.js';
import { t } from '../i18n.js';
import { YIJING_KINGWEN_SEQUENCE } from '../yijing/yijing.js';

// A tiny six-line hexagram glyph from a 6-bit value (bit 0 = bottom line).
function miniHex(value, lit) {
  let rows = '';
  for (let i = 5; i >= 0; i--) rows += `<span class="hx-line ${(value >> i) & 1 ? 'yang' : 'yin'}"></span>`;
  return `<div class="hx${lit ? ' lit' : ''}">${rows}</div>`;
}

// The 64 as an 8×8 grid, in King Wen order, lighting up in step with the times-table
// gems — the live reveal that the Gem Tree is the same 64 as the Book of Changes.
function hexGrid(report) {
  const total = report.gems.total || 100;
  const frac = Math.min(1, (report.gems.lit.length || 0) / total);
  const litCount = Math.round(64 * frac);
  return YIJING_KINGWEN_SEQUENCE.map((v, k) => miniHex(v, k < litCount)).join('');
}

const HEX_STYLE = `<style>
  #hex-grid { display:grid; grid-template-columns:repeat(8,1fr); gap:5px; max-width:340px; margin:0 auto; }
  .hx { display:flex; flex-direction:column; gap:2px; align-items:center; padding:5px 3px; border-radius:7px; background:rgba(0,0,0,.05); opacity:.42; transition:opacity .3s, background .3s; }
  .hx.lit { opacity:1; background:rgba(244,201,93,.18); }
  .hx-line { height:3px; border-radius:2px; }
  .hx-line.yang { width:22px; background:#c9c3b8; }
  .hx.lit .hx-line.yang { background:#f4c95d; }
  .hx-line.yin { width:22px; background:linear-gradient(90deg,#c9c3b8 0 40%, transparent 40% 60%, #c9c3b8 60% 100%); }
  .hx.lit .hx-line.yin { background:linear-gradient(90deg,#f4c95d 0 40%, transparent 40% 60%, #f4c95d 60% 100%); }
</style>`;

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
    ${HEX_STYLE}
    ${backBtn()}
    <h2>🌳 ${t('gems.title')}</h2>
    <div class="tagline" style="margin-bottom:8px">${t('gems.sub')}</div>
    <div class="chip" style="margin-bottom:10px">💎 ${t('gems.count', { n: report.gems.lit.length, total: report.gems.total })}</div>
    <div class="card" style="display:flex;justify-content:center"><div id="gem-grid">${cells}</div></div>
    <div class="card" style="text-align:center">
      <h3>✨ ${t('gems.hex_title')}</h3>
      <div id="hex-grid">${hexGrid(report)}</div>
      <div class="tagline" style="margin-top:10px">${t('gems.hex_sub')}</div>
    </div>
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
