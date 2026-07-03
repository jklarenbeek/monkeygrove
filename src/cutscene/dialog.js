// Cutscene dialog bar — the story prose over the live 3D scene. One page at a
// time, advanced by a tap anywhere (or Space/Enter), Zelda-style like the hub
// bubble, plus an always-visible Skip button (Escape) so a replaying child is
// never trapped in a movie. Text mirrors into #sr-announce for screen readers.
import { t } from '../i18n.js';
import { audio } from '../audio.js';

// Taps landing right after a page appears are ignored briefly, so a double-tap
// on the previous page can never blow through the next one unread.
export const PAGE_ARM_MS = 280;

let state = null; // { onSkip, resolve, armAt } while the overlay is open

const el = (id) => document.getElementById(id);

function ensureRoot() {
  let root = el('cutscene-ui');
  if (root) return root;
  root = document.createElement('div');
  root.id = 'cutscene-ui';
  root.className = 'hidden';
  root.innerHTML = `
    <button class="btn soft" id="cutscene-skip"></button>
    <div id="cutscene-dialog" class="hidden">
      <div id="cutscene-face"></div>
      <div id="cutscene-body">
        <span id="cutscene-name" class="hidden"></span>
        <span id="cutscene-text"></span>
      </div>
      <div id="cutscene-next">▼</div>
    </div>`;
  (el('ui') || document.body).appendChild(root);
  root.addEventListener('click', () => advancePage());
  root.querySelector('#cutscene-skip').addEventListener('click', (e) => {
    e.stopPropagation();
    audio.sfx('click');
    state?.onSkip?.();
  });
  return root;
}

function onKey(e) {
  if (!state) return;
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); advancePage(); }
  else if (e.key === 'Escape') { e.preventDefault(); state.onSkip?.(); }
}

function announce(html) {
  const live = el('sr-announce');
  if (!live) return;
  live.textContent = String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Open the overlay for one scene run. Idempotent; pairs with closeCutsceneUi().
export function openCutsceneUi({ onSkip } = {}) {
  const root = ensureRoot();
  state = { onSkip, resolve: null, armAt: 0 };
  root.querySelector('#cutscene-skip').textContent = `⏭ ${t('cutscene.skip')}`;
  root.querySelector('#cutscene-dialog').classList.add('hidden');
  root.classList.remove('hidden');
  window.addEventListener('keydown', onKey);
}

// Show one prose page; resolves when the child taps it onward. `armMs` is
// overridable for tests only.
export function showCutscenePage({ name = null, html = '', face = '✨', armMs = PAGE_ARM_MS } = {}) {
  if (!state) return Promise.resolve();
  const root = ensureRoot();
  const dialog = root.querySelector('#cutscene-dialog');
  const nameEl = root.querySelector('#cutscene-name');
  root.querySelector('#cutscene-face').textContent = face;
  nameEl.textContent = name || '';
  nameEl.classList.toggle('hidden', !name);
  root.querySelector('#cutscene-text').innerHTML = html;
  announce(name ? `${name}: ${html}` : html);
  dialog.classList.remove('hidden');
  // restart the pop-in so every page visibly arrives
  dialog.style.animation = 'none';
  void dialog.offsetWidth;
  dialog.style.animation = '';
  state.armAt = performance.now() + armMs;
  return new Promise((resolve) => { state.resolve = resolve; });
}

export function advancePage() {
  if (!state?.resolve || performance.now() < state.armAt) return;
  audio.sfx('click');
  // hide the bar between pages so the choreography plays unobstructed
  el('cutscene-ui')?.querySelector('#cutscene-dialog')?.classList.add('hidden');
  const resolve = state.resolve;
  state.resolve = null;
  resolve();
}

export function cutsceneUiOpen() { return !!state; }

export function closeCutsceneUi() {
  window.removeEventListener('keydown', onKey);
  state = null;
  const root = el('cutscene-ui');
  if (!root) return;
  root.classList.add('hidden');
  root.querySelector('#cutscene-dialog')?.classList.add('hidden');
}
