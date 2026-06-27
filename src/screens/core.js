// Shared spine for every full-screen DOM overlay: the #screens host, the render
// helper that swaps in one screen at a time and moves focus into it, the close
// button, the toast flash, HTML escaping, and the emoji lookup tables. Family
// modules (intro, warmup, settings, cosmetics, gems, business, parents, result)
// build on these; src/screens.js re-exports the public ones as a barrel.
import { t } from '../i18n.js';

const $ = (id) => document.getElementById(id);
const host = () => $('screens');

export const PET_EMOJI = {
  monkey: '🐵', mimi: '🐒',
  bunny: '🐰', duckling: '🐥', kitten: '🐱', piglet: '🐷',
  redpanda: '🦊', turtle: '🐢', owl: '🦉', dragon: '🐉',
};
export const HAT_EMOJI = {
  cap: '🧢', bow: '🎀', crown: '👑', flowercrown: '🌸',
  beanie: '🧶', wizard: '🧙‍♂️', pirate: '🏴‍☠️', party: '🥳',
};
export const TRAIL_EMOJI = { sparkle: '✨', petal: '🌸', bubble: '🫧', star: '⭐' };
export const WORLD_EMOJI = { tide: '🌊', garden: '🌱', stump: '🥥', vines: '🍇' };

export function closeScreen() {
  host().innerHTML = '';
}

export function render(html, extraClass = '') {
  const className = ['screen', extraClass].filter(Boolean).join(' ');
  host().innerHTML = `<div class="${className}">${html}</div>`;
  const el = host().firstElementChild;
  // move keyboard/screen-reader focus into the freshly opened screen
  el.tabIndex = -1;
  el.focus?.({ preventScroll: true });
  return el;
}

export function backBtn(onBack, label = null) {
  return `<button class="round-btn screen-close" id="scr-back" aria-label="${esc(t('nav.back'))}">${label || '✖️'}</button>`;
}

export function flash(text) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = text;
  $('toasts').appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

export function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
