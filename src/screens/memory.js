// Memory Grove overlays (docs/06 §4.4/§4.6): the walk step card (a numpad question
// at each landmark on a skip-counting route) and the anchor browser (review adopted
// anchors, swap a landmark, start a memory walk). The numpad reuses the checkup's
// constructed-response styling (.checkup-numpad / .placement-card) so it feels of a
// piece with Mimi's Check, without any new CSS.
import { render, backBtn, esc } from './core.js';
import { t } from '../i18n.js';
import { audio } from '../audio.js';
import { LOCI_EMOJI, formatFact } from '../memory/data.js';

const factProduct = (fk) => {
  const m = /^(\d+)x(\d+)$/.exec(String(fk));
  return m ? Number(m[1]) * Number(m[2]) : '';
};

const lociLabel = (id) => `${LOCI_EMOJI[id] || '🧠'} ${t('memory.loci.' + id)}`;

// ---------- the walk step card ----------

function numpadHtml() {
  const key = (v, label = v, extra = '') => `
    <button class="btn soft numpad-key ${extra}" data-np="${v}" aria-label="${esc(String(label))}">${label}</button>`;
  return `
    <div class="numpad-display" id="mem-np-val" aria-live="polite">&nbsp;</div>
    <div class="checkup-numpad">
      ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => key(n)).join('')}
      ${key('del', '⌫')}
      ${key(0)}
      ${key('ok', t('ui.ok'), 'green')}
    </div>`;
}

function wireNumpad(el, submit) {
  const display = el.querySelector('#mem-np-val');
  let value = '';
  const refresh = () => { display.textContent = value || ' '; };
  for (const btn of el.querySelectorAll('[data-np]')) {
    btn.addEventListener('click', () => {
      const k = btn.dataset.np;
      if (k === 'ok') {
        if (!value) return;
        // submit returns false on a wrong answer → clear and let them try again.
        if (submit(value) === false) { value = ''; refresh(); }
        return;
      }
      if (k === 'del') value = value.slice(0, -1);
      else if (value.length < 4) value += k;
      refresh();
    });
  }
}

// One stop on a skip-counting walk. The eq shows the running count so far
// (·, then the previous number → ?), so the child skip-counts forward at the
// landmark. `onSubmit(value)` returns true to advance, false to retry.
export function showWalkStep({ step, index, total, lociId, onSubmit, onExit }) {
  const prev = step * index;
  const el = render(`
    <div class="card placement-card">
      <div class="tagline">${esc(t('memory.walk_progress', { n: index + 1, total }))}</div>
      <div class="placement-task">${LOCI_EMOJI[lociId] || '🧠'} ${esc(t('memory.walk_prompt', { step }))}</div>
      <div class="placement-eq">${index === 0 ? esc(t('memory.walk_first', { step })) : `${prev} + ${step} = ?`}</div>
      ${numpadHtml()}
      <button class="btn soft" id="mem-walk-exit" style="margin-top:10px">${esc(t('memory.walk_exit'))}</button>
    </div>
  `);
  wireNumpad(el, (value) => onSubmit?.(value));
  el.querySelector('#mem-walk-exit').addEventListener('click', () => onExit?.());
}

// ---------- the anchor browser (§4.6) ----------

// Review adopted anchors, swap the landmark an image lives on, and start a memory
// walk. `anchors` are {factKey, lociId}; `loci` the landmarks to choose among;
// `walkSteps` the skip-counts unlocked at the child's grade.
export function showMemory({ anchors = [], loci = [], walkSteps = [], onSwap, onStartWalk, onClose }) {
  const walkHtml = walkSteps.length ? `
    <div class="card" style="text-align:center">
      <h3>🚶 ${esc(t('memory.walk_title'))}</h3>
      <div class="tagline" style="margin:4px 0 10px">${esc(t('memory.walk_sub'))}</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">
        ${walkSteps.map((s) => `<button class="btn green" data-walk="${s}">${esc(t('memory.walk_step', { step: s }))}</button>`).join('')}
      </div>
    </div>` : '';
  const anchorsHtml = anchors.length ? anchors.map((a) => `
    <div class="skill-row" style="align-items:center;gap:8px">
      <div class="s-name">${formatFact(a.factKey)} = ${factProduct(a.factKey)}</div>
      <select data-swap="${a.factKey}" aria-label="${esc(t('memory.swap_label', { fact: formatFact(a.factKey) }))}">
        ${loci.map((id) => `<option value="${id}" ${id === a.lociId ? 'selected' : ''}>${esc(lociLabel(id))}</option>`).join('')}
      </select>
    </div>`).join('') : `<div class="tagline">${esc(t('memory.none'))}</div>`;
  const el = render(`
    ${backBtn()}
    <h2>🧠 ${esc(t('memory.title'))}</h2>
    <div class="tagline" style="margin-bottom:10px">${esc(t('memory.browser_sub'))}</div>
    ${walkHtml}
    <div class="card">
      <h3>${esc(t('memory.adopted_title'))}</h3>
      <div class="tagline" style="margin:2px 0 8px">${esc(t('memory.swap_hint'))}</div>
      ${anchorsHtml}
    </div>
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
  for (const sel of el.querySelectorAll('[data-swap]')) {
    sel.addEventListener('change', () => { audio.sfx('click'); onSwap?.(sel.dataset.swap, sel.value); });
  }
  for (const btn of el.querySelectorAll('[data-walk]')) {
    btn.addEventListener('click', () => { audio.sfx('click'); onStartWalk?.(Number(btn.dataset.walk)); });
  }
}
