// Banyan Gem Tree overlay: the 10×10 times-table mosaic, the 8×8 hexagram grid it
// secretly IS (the 64 = the I Ching = the 64 codons of DNA), the Tree of Learning
// (10 nodes + 22 paths folded from the same 64 — docs/story/TREE_OF_LEARNING.md),
// plus a per-world skill progress list, all read from the mastery report.
import { render, backBtn, WORLD_EMOJI } from './core.js';
import { t } from '../i18n.js';
import { audio } from '../audio.js';
import { LOCI_EMOJI, formatFact } from '../memory/data.js';
import { YIJING_KINGWEN_SEQUENCE } from '../yijing/yijing.js';
import { NODES, NODE_IDS, PATHS, CHAPTER_REGIONS } from '../story/tree.js';
import { CHAPTERS } from '../story/constants.js';

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

// ---------------------------------------------------------------------------
// The Tree of Learning (src/story/tree.js drawn live). Node positions follow the
// classic three-pillar layout: middle = the number-sense spine, right = building
// up (×), left = breaking down (÷). Child-safe names only (t('tree.node.*')).
const TREE_POS = {
  integration: [105, 22],
  proportion: [172, 58],
  precision: [38, 58],
  growth: [172, 120],
  sharing: [38, 120],
  balance: [105, 150],
  fluency: [172, 196],
  procedure: [38, 196],
  foundation: [105, 228],
  whole: [105, 272],
};

// How far along a path is: 'gold' = every skill on it mastered, 'growing' = the
// child has begun walking it, 'sleep' = not yet started, 'dream' = curriculum the
// shipped worlds don't host yet (planned paths — buds still waiting to open).
function pathState(p, skillMap) {
  const ss = p.skills.map((id) => skillMap[id]).filter(Boolean);
  if (p.planned || !ss.length) return 'dream';
  if (ss.every((s) => s.mastered)) return 'gold';
  if (ss.some((s) => s.n > 0)) return 'growing';
  return 'sleep';
}

// Which nodes are lit: each chapter illuminates its Tree region as its story line
// is drawn (docs/story/TREE_OF_LEARNING.md §4). The Whole — the island the child
// can touch — is lit from the very first day.
function litNodeSet(story) {
  const lit = new Set(['whole']);
  const lines = story?.lines || [];
  const chapterLine = {};
  for (const c of CHAPTERS) chapterLine[c.key] = c.lineIndex;
  for (const [key, region] of Object.entries(CHAPTER_REGIONS)) {
    const li = chapterLine[key];
    if (li != null && lines[li]) for (const n of region.nodes) lit.add(n);
  }
  return lit;
}

const PATH_STYLE = {
  gold: 'stroke:#f4c95d;stroke-width:4',
  growing: 'stroke:#7ccf7c;stroke-width:3',
  sleep: 'stroke:#c9c3b8;stroke-width:2;opacity:.55',
  dream: 'stroke:#c9c3b8;stroke-width:2;stroke-dasharray:3 4;opacity:.45',
};

function treeSvg(skillMap, litNodes, stateByPath) {
  const pathEls = PATHS.map((p) => {
    const [ax, ay] = TREE_POS[NODE_IDS[p.nodes[0]]];
    const [bx, by] = TREE_POS[NODE_IDS[p.nodes[1]]];
    return `<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" style="${PATH_STYLE[stateByPath[p.index]]};stroke-linecap:round"/>`;
  }).join('');
  const nodeEls = NODES.map((n) => {
    const [x, y] = TREE_POS[n.id];
    const lit = litNodes.has(n.id);
    return `
      <circle cx="${x}" cy="${y}" r="9" style="${lit ? 'fill:#f4c95d;stroke:#d9a93f' : 'fill:#efe9dd;stroke:#c9c3b8'};stroke-width:2"/>
      ${lit ? `<circle cx="${x}" cy="${y}" r="3.4" style="fill:#fff6dd"/>` : ''}
      <text x="${x}" y="${y + 19}" text-anchor="middle" style="font-size:8px;font-weight:700;fill:currentColor;opacity:${lit ? '.95' : '.55'}">${t('tree.node.' + n.id)}</text>`;
  }).join('');
  return `<svg id="learning-tree" viewBox="0 0 210 298" style="max-width:340px;width:100%;display:block;margin:0 auto">${pathEls}${nodeEls}</svg>`;
}

function legendRow(sample, label) {
  return `<div style="display:flex;align-items:center;gap:8px;margin:3px 0">
    <span style="display:inline-block;width:26px;height:0;border-top:${sample};border-radius:2px;flex:none"></span>
    <span>${label}</span>
  </div>`;
}

function treeCard(report, story) {
  const skillMap = {};
  for (const info of Object.values(report.worlds)) {
    for (const s of info.skills || []) skillMap[s.id] = s;
  }
  const litNodes = litNodeSet(story);
  const stateByPath = {};
  for (const p of PATHS) stateByPath[p.index] = pathState(p, skillMap);
  const gold = Object.values(stateByPath).filter((s) => s === 'gold').length;
  return `
    <div class="card" style="text-align:center">
      <h3>🌿 ${t('tree.title')}</h3>
      <div class="tagline" style="margin:4px 0 10px">${t('tree.sub')}</div>
      ${treeSvg(skillMap, litNodes, stateByPath)}
      <div class="chip" style="margin-top:10px">${t('tree.count', { gold, lit: litNodes.size })}</div>
      <div style="margin-top:10px;font-size:13px;line-height:1.4;text-align:left;display:inline-block">
        ${legendRow('4px solid #f4c95d', t('tree.legend.gold'))}
        ${legendRow('3px solid #7ccf7c', t('tree.legend.growing'))}
        ${legendRow('2px solid #c9c3b8', t('tree.legend.sleep'))}
        ${legendRow('2px dashed #c9c3b8', t('tree.legend.dream'))}
      </div>
      <div class="tagline" style="margin-top:10px">${t('tree.moral')}</div>
    </div>`;
}

// The Memory Grove adoption card (docs/06 §4.3), shown only once the feature is
// unlocked. `memory` is { adoptable, adopted }: wobbly-first facts the child has
// mastered and can anchor, plus the anchors they already own. Tapping a fact
// reveals its silly image story; a "Got it!" confirm saves the anchor — the small
// generation step the evidence asks for (§2.3). Re-reading an owned anchor just
// replays the story.
const factProduct = (fk) => {
  const m = /^(\d+)x(\d+)$/.exec(String(fk));
  return m ? Number(m[1]) * Number(m[2]) : '';
};

function memorySection(memory) {
  if (!memory) return '';
  const { adoptable = [], adopted = [] } = memory;
  const adoptHtml = adoptable.length ? `
    <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:10px">
      ${adoptable.map((a) => `<button class="btn soft" data-adopt="${a.factKey}">${a.wobbly ? '✨ ' : ''}${formatFact(a.factKey)}</button>`).join('')}
    </div>`
    : `<div class="tagline" style="margin-top:8px">${t('memory.none')}</div>`;
  const adoptedHtml = adopted.length ? `
    <div class="tagline" style="margin-top:14px">${t('memory.adopted_title')}</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:6px">
      ${adopted.map((a) => `<button class="chip" data-reread="${a.factKey}" style="cursor:pointer">${LOCI_EMOJI[a.lociId] || '🧠'} ${formatFact(a.factKey)} = ${factProduct(a.factKey)}</button>`).join('')}
    </div>` : '';
  const walkBtn = memory.canWalk
    ? `<button class="btn soft" id="mem-open" style="margin-top:12px">🚶 ${t('memory.open_browser')}</button>`
    : (adopted.length ? `<button class="btn soft" id="mem-open" style="margin-top:12px">🧠 ${t('memory.open_browser')}</button>` : '');
  return `
    <div class="card" style="text-align:center">
      <h3>${t('memory.adopt_title')}</h3>
      <div class="tagline" style="margin:4px 0 6px">${t('memory.adopt_sub')}</div>
      ${adoptHtml}
      <div class="card hidden" id="mem-story" style="max-width:400px;margin:12px auto 0;text-align:center">
        <div id="mem-story-text" style="font-size:15px;line-height:1.5"></div>
        <button class="btn" id="mem-story-confirm" style="margin-top:10px">${t('memory.got_it')}</button>
      </div>
      ${adoptedHtml}
      ${walkBtn}
    </div>`;
}

function wireMemory(el, memory, onAdopt) {
  if (!memory) return;
  const story = el.querySelector('#mem-story');
  const storyText = el.querySelector('#mem-story-text');
  const confirmBtn = el.querySelector('#mem-story-confirm');
  let pending = null;
  const showStory = (factKey, canAdopt) => {
    pending = canAdopt ? factKey : null;
    storyText.innerHTML = t(`memory.anchor.${factKey}`);
    story.classList.remove('hidden');
    confirmBtn.classList.toggle('hidden', !canAdopt);
  };
  el.querySelectorAll('[data-adopt]').forEach((b) => b.addEventListener('click', () => {
    audio.sfx('sparkle');
    showStory(b.dataset.adopt, true);
  }));
  el.querySelectorAll('[data-reread]').forEach((b) => b.addEventListener('click', () => {
    audio.sfx('click');
    showStory(b.dataset.reread, false);
  }));
  confirmBtn?.addEventListener('click', () => {
    if (!pending) return;
    audio.sfx('correct');
    onAdopt?.(pending);
  });
}

// `story` lights the Tree's nodes (optional — undefined renders a fresh tree).
// `wonder` is the next undiscovered gem_tree card (the DNA reveal, then the
// doubling branches), offered as an opt-in door exactly like the result screen:
// tap to open, or just leave — never a nag. `onWonderOpen(id)` marks it seen.
export function showGems({ report, story, wonder = null, memory = null, onWonderOpen, onAdopt, onOpenMemory, onClose }) {
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
  const wonderHtml = wonder ? `
    <div style="text-align:center;margin:10px 0">
      <button class="btn soft" id="gems-wonder">✨ ${t('result.wonder')}</button>
      <div class="card hidden" id="gems-wonder-card" style="max-width:400px;margin:10px auto;text-align:center">
        <div style="font-weight:800">${t(wonder.titleKey)}</div>
        <div style="font-size:14px;line-height:1.5;color:var(--ink-soft);margin-top:6px">${t(wonder.bodyKey)}</div>
      </div>
    </div>` : '';
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
    ${memorySection(memory)}
    ${wonderHtml}
    ${treeCard(report, story)}
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
  wireMemory(el, memory, onAdopt);
  el.querySelector('#mem-open')?.addEventListener('click', () => onOpenMemory?.());
  const wonderBtn = el.querySelector('#gems-wonder');
  wonderBtn?.addEventListener('click', () => {
    wonderBtn.classList.add('hidden');
    el.querySelector('#gems-wonder-card').classList.remove('hidden');
    audio.sfx('correct');
    onWonderOpen?.(wonder.id);
  });
}
