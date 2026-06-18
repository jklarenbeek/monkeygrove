// DOM HUD: equation banner, chips, Mimi bubble, toasts, verb panels.
import { t } from './i18n.js';
import { audio } from './audio.js';

const $ = (id) => document.getElementById(id);

let handlers = {};
let bubbleTimer = null;

export function initHud(h) {
  handlers = h;
  // accessible names for the icon-only round buttons (screen readers / keyboard)
  const label = (id, key) => { const b = $(id); if (b) { const s = t(key); b.setAttribute('aria-label', s); b.title = s; } };
  label('btn-hint', 'hud.hint');
  label('btn-action', 'hud.action');
  label('btn-home', 'hud.home');
  label('btn-settings', 'settings.title');
  $('btn-hint').addEventListener('click', () => { audio.sfx('click'); handlers.onHint?.(); });
  $('btn-action').addEventListener('click', () => { audio.sfx('click'); handlers.onAction?.(); });
  $('btn-home').addEventListener('click', () => { audio.sfx('click'); handlers.onHome?.(); });
  $('btn-settings').addEventListener('click', () => { audio.sfx('click'); handlers.onSettings?.(); });
  $('bubble').addEventListener('click', () => advanceBubble());
}

export function showHud(on = true) {
  $('hud').classList.toggle('hidden', !on);
  if (!on) {
    $('banner').classList.add('hidden');
    $('verb-panel').classList.add('hidden');
    hideBubble();
    hideModelPanel();
  }
}

// Renders '3/4' as a stacked fraction, '?' and '⬚' as a pulsing slot.
export function formatEquation(eq) {
  let html = String(eq)
    .replace(/(\d+)\s*\/\s*(\d+)/g, '<span class="frac"><span class="n">$1</span><span class="d">$2</span></span>')
    .replace(/\?/g, '<span class="slot">?</span>')
    .replace(/⬚/g, '<span class="slot">◯</span>');
  return html;
}

export function setBanner(instruction, equation) {
  const b = $('banner');
  b.classList.remove('hidden', 'solved');
  $('banner-instruction').textContent = instruction || '';
  $('banner-equation').innerHTML = formatEquation(equation || '');
}

export function solveBanner(equation) {
  const b = $('banner');
  b.classList.add('solved');
  $('banner-equation').innerHTML = formatEquation(equation);
}

export function wiggleBanner() {
  const b = $('banner');
  b.classList.remove('wiggle');
  void b.offsetWidth;
  b.classList.add('wiggle');
}

export function hideBanner() { $('banner').classList.add('hidden'); }

export function setBananas(n) { $('banana-count').textContent = n; }
export function setStreak(n) { $('streak-count').textContent = n; }
export function setEgg(points, goal) {
  $('egg-fill').style.width = Math.min(100, (points / goal) * 100) + '%';
}

export function setCombo(n) {
  const c = $('combo');
  if (n >= 2) {
    c.classList.remove('hidden');
    $('combo-count').textContent = n;
    c.style.animation = 'none';
    void c.offsetWidth;
    c.style.animation = '';
  } else {
    c.classList.add('hidden');
  }
}

export function setAction(emoji) {
  const b = $('btn-action');
  b.classList.remove('ready');
  if (emoji) { b.textContent = emoji; b.classList.remove('hidden'); }
  else b.classList.add('hidden');
}

export function setActionReady(on) {
  const b = $('btn-action');
  b.classList.toggle('ready', !!on && !b.classList.contains('hidden'));
}

export function showHintButton(on) { $('btn-hint').classList.toggle('hidden', !on); }

// ---------- model fallback panel (always-available visual model) ----------

let modelTimer = null;

export function showModelPanel(model) {
  if (!model || model.kind === 'none') return false;
  const p = $('model-panel');
  let html = '';
  if (model.kind === 'array') {
    const { rows, cols } = model.params;
    if (cols > 12) {
      // partial products breakdown for big columns (e.g. 4 × 21)
      const tens = Math.floor(cols / 10) * 10, ones = cols - tens;
      html = `<div class="mp-caption">${rows} × ${cols} = ${rows} × ${tens} + ${rows} × ${ones}
        = ${rows * tens} + ${rows * ones} = <b>${rows * cols}</b></div>`;
    } else {
      let cells = '';
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells += `<div class="mp-cell ${r % 2 ? 'alt' : ''}" style="animation-delay:${(r * cols + c) * 22}ms"></div>`;
        }
        cells += `<div class="mp-rowlabel" style="grid-column:${cols + 1}">${(r + 1) * cols}</div>`;
      }
      html = `<div class="mp-grid" style="grid-template-columns:repeat(${cols},16px) 30px">${cells}</div>
        <div class="mp-caption">${rows} × ${cols} = <b>${rows * cols}</b></div>`;
    }
  } else if (model.kind === 'baskets') {
    const { total, baskets, quotient, remainder } = model.params;
    let bs = '';
    for (let b = 0; b < baskets; b++) {
      bs += `<div class="mp-basket">🧺<br><b>${quotient}</b></div>`;
    }
    if (remainder > 0) bs += `<div class="mp-basket" style="border-color:var(--pink)">🍓<br><b>+${remainder}</b></div>`;
    html = `<div class="mp-baskets">${bs}</div>
      <div class="mp-caption">${total} ÷ ${baskets} = <b>${quotient}</b>${remainder ? ` <span style="color:#c2497a">rest ${remainder}</span>` : ''}</div>`;
  } else if (model.kind === 'numberline') {
    const { n, d, lo = 0, hi = 1 } = model.params;
    let ticks = '';
    for (let i = 0; i <= d * (hi - lo); i++) {
      ticks += `<div class="mp-tick" style="left:${(i / (d * (hi - lo))) * 100}%"></div>`;
    }
    const pos = ((n / d - lo) / (hi - lo)) * 100;
    html = `<div class="mp-line" style="width:280px">${ticks}
        <div class="mp-mark" style="left:${pos}%">🐵</div>
        <div class="mp-endlabel" style="left:0">${lo}</div>
        <div class="mp-endlabel" style="left:100%">${hi}</div>
      </div>
      <div class="mp-caption" style="margin-top:30px">${formatEquation(`${n}/${d}`)}</div>`;
  } else if (model.kind === 'strip') {
    const { a, b, op } = model.params;
    // place-value row: tens rods + ones dots (the model that teaches carrying)
    const numRow = (n, cls) => {
      const tens = Math.floor(n / 10), ones = n % 10;
      let s = '';
      for (let i = 0; i < tens; i++) s += `<div class="mp-rod ${cls}" style="animation-delay:${i * 60}ms">10</div>`;
      for (let i = 0; i < ones; i++) s += `<div class="mp-cell ${cls}" style="animation-delay:${(tens + i) * 60}ms"></div>`;
      return `<div class="mp-pv">${s}<div class="mp-rowlabel">${n}</div></div>`;
    };
    const result = op === '+' ? a + b : a - b;
    html = numRow(a, '') +
      `<div class="mp-caption" style="margin:0">${op}</div>` +
      numRow(b, op === '+' ? 'alt' : 'b') +
      `<div class="mp-caption">${a} ${op} ${b} = <b>${result}</b></div>`;
  } else {
    return false;
  }
  p.innerHTML = html;
  p.classList.remove('hidden');
  if (modelTimer) clearTimeout(modelTimer);
  modelTimer = setTimeout(hideModelPanel, 7000);
  return true;
}

export function hideModelPanel() {
  $('model-panel').classList.add('hidden');
  if (modelTimer) { clearTimeout(modelTimer); modelTimer = null; }
}

// ---------- Mimi bubble ----------
//
// Two kinds of speech, like the games kids love:
//  - dialogue (default): Zelda-style — the bubble STAYS until the child
//    confirms (tap the bubble, or Space/Enter). Nobody reads at a deadline.
//    Pass an array of pages for longer talk, one confirm per page.
//  - transient: quick in-play reactions (cheers, crab yoinks) that
//    self-dismiss — and never steal the stage from an open dialogue.

let bubbleState = null; // { pages, i, face, onDone } while a dialogue is open

function renderBubblePage(html, face, caret) {
  const b = $('bubble');
  $('bubble-face').textContent = face;
  $('bubble-text').innerHTML = html;
  announce(html);
  $('bubble-next').classList.toggle('hidden', !caret);
  b.classList.remove('hidden');
  b.style.animation = 'none';
  void b.offsetWidth;
  b.style.animation = '';
}

export function say(htmlOrPages, { ms = 2400, face = '🐵', transient = false, onDone = null } = {}) {
  const pages = (Array.isArray(htmlOrPages) ? htmlOrPages : [htmlOrPages])
    .filter(Boolean)
    .map((p) => (typeof p === 'string' ? { html: p } : p)); // pages may carry their own face
  if (!pages.length) return;
  if (transient && bubbleState) return; // a reaction never replaces unread dialogue
  if (bubbleTimer) { clearTimeout(bubbleTimer); bubbleTimer = null; }
  bubbleState = transient ? null : { pages, i: 0, face, onDone };
  renderBubblePage(pages[0].html, pages[0].face || face, !transient);
  if (transient) bubbleTimer = setTimeout(() => hideBubble(), ms);
}

// Returns true if a dialogue consumed the confirm (so Space/Enter can fall
// through to the action button when no bubble is open).
export function advanceBubble() {
  const st = bubbleState;
  if (!st) return false;
  audio.sfx('click');
  st.i++;
  if (st.i < st.pages.length) {
    const p = st.pages[st.i];
    renderBubblePage(p.html, p.face || st.face, true);
  } else { hideBubble(); st.onDone?.(); }
  return true;
}

export function bubbleOpen() { return !!bubbleState; }

export function hideBubble() {
  $('bubble').classList.add('hidden');
  bubbleState = null;
  if (bubbleTimer) { clearTimeout(bubbleTimer); bubbleTimer = null; }
}

// ---------- toasts ----------

// Mirror transient on-screen text into the screen-reader live region so it's
// announced even though toasts/the bubble are off-canvas or animated.
function announce(html) {
  const el = $('sr-announce');
  if (!el) return;
  el.textContent = String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function toast(text, cls = '') {
  const el = document.createElement('div');
  el.className = 'toast ' + cls;
  el.innerHTML = text;
  $('toasts').appendChild(el);
  announce(text);
  setTimeout(() => el.remove(), 2800);
}

// ---------- verb panels ----------

export function setVerbPanel(data) {
  const p = $('verb-panel');
  if (!data) { p.classList.add('hidden'); p.innerHTML = ''; return; }
  p.classList.remove('hidden');
  if (data.kind === 'array') {
    const nums = data.count > 0
      ? `<span style="color:var(--leaf-deep)">${data.rows}</span> × <span style="color:#b06a2c">${data.cols}</span> = ${data.count}`
      : '🚩';
    const subKey = data.anchored
      ? (data.offBed ? 'verb.array_offsoil' : 'verb.array_stretch')
      : 'verb.array_plant';
    p.innerHTML = `
      <div>${nums}
        <div class="sub">${t(subKey)}</div>
      </div>`;
  } else if (data.kind === 'share') {
    p.innerHTML = `
      <div>🥥 ${data.pile} &nbsp;→&nbsp; 🧺 ${data.counts.join(' · ')}</div>
      <div class="sub">${t('verb.share_sub')}</div>`;
  }
}
