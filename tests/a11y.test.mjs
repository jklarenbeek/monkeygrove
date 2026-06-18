import { test, beforeEach } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';

const read = (p) => readFileSync(new URL(`../src/${p}`, import.meta.url), 'utf8');
// The screens layer was split into src/screens/*.js (TODO_16); read the barrel plus
// every family module so these structural assertions stay location-agnostic.
const readScreens = () => [
  read('screens.js'),
  ...readdirSync(new URL('../src/screens/', import.meta.url))
    .filter((f) => f.endsWith('.js')).map((f) => read(`screens/${f}`)),
].join('\n');

function mockStorage() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
    clear: () => data.clear(),
  };
}

function fakeClassList() {
  const set = new Set();
  return {
    toggle: (n, force) => { if (force) set.add(n); else set.delete(n); return !!force; },
    contains: (n) => set.has(n),
    add: (n) => set.add(n),
    remove: (n) => set.delete(n),
  };
}

function fakeStyle() {
  const props = {};
  return { setProperty: (k, v) => { props[k] = String(v); }, getPropertyValue: (k) => props[k] ?? '', _props: props };
}

beforeEach(() => {
  globalThis.localStorage = mockStorage();
  globalThis.document = { documentElement: { classList: fakeClassList(), style: fakeStyle() } };
  globalThis.matchMedia = () => ({ matches: false });
});

test('reducedMotion follows the OS when unset, and the explicit setting when set', async () => {
  const { settings, loadSave } = await import('../src/state.js');
  const { reducedMotion } = await import('../src/a11y.js');
  loadSave();
  const s = settings();

  s.reduceMotion = null; // auto
  globalThis.matchMedia = () => ({ matches: true });
  assert.equal(reducedMotion(), true, 'auto follows the OS reduce-motion preference');
  globalThis.matchMedia = () => ({ matches: false });
  assert.equal(reducedMotion(), false, 'auto follows OS no-preference');

  s.reduceMotion = true; // explicit wins over the OS
  assert.equal(reducedMotion(), true);
  s.reduceMotion = false;
  globalThis.matchMedia = () => ({ matches: true });
  assert.equal(reducedMotion(), false, 'explicit off overrides the OS');
});

test('applyComfortSettings mirrors settings onto the root element classes', async () => {
  const { settings, loadSave } = await import('../src/state.js');
  const { applyComfortSettings } = await import('../src/a11y.js');
  loadSave();
  const s = settings();
  const cl = globalThis.document.documentElement.classList;

  // applyComfortSettings awaits the lazy dyslexia font before flipping the class, so it
  // returns a promise — await it before asserting on the .dyslexia class.
  s.reduceMotion = true; s.dyslexiaFont = true; s.highContrast = false;
  await applyComfortSettings();
  assert.ok(cl.contains('reduce-motion'));
  assert.ok(cl.contains('dyslexia'));
  assert.ok(!cl.contains('high-contrast'));

  s.dyslexiaFont = false; s.highContrast = true;
  await applyComfortSettings();
  assert.ok(!cl.contains('dyslexia'), 'toggling off removes the class');
  assert.ok(cl.contains('high-contrast'));

  // colour-blind palette + text scale
  s.colorblind = true; s.textScale = 1.3;
  await applyComfortSettings();
  assert.ok(cl.contains('colorblind'), 'colour-blind palette is opt-in via a class');
  assert.equal(globalThis.document.documentElement.style.getPropertyValue('--text-scale'), '1.3', 'text scale drives --text-scale');
  s.colorblind = false; s.textScale = 1;
  await applyComfortSettings();
  assert.ok(!cl.contains('colorblind'), 'normal mode has no colour-blind class');
  assert.equal(globalThis.document.documentElement.style.getPropertyValue('--text-scale'), '1');
});

test('fresh and migrated saves both get the comfort settings keys', async () => {
  const { loadSave, settings } = await import('../src/state.js');
  loadSave();
  const s = settings();
  for (const k of ['reduceMotion', 'dyslexiaFont', 'highContrast']) {
    assert.ok(k in s, `settings has ${k}`);
  }
  // booleans for the explicit toggles, regardless of what other tests set
  assert.equal(typeof s.dyslexiaFont, 'boolean');
  assert.equal(typeof s.highContrast, 'boolean');
});

test('the 3D juice is gated by reducedMotion()', () => {
  const world = read('world.js');
  const player = read('player.js');
  assert.match(world, /shake\([^)]*\)\s*\{[\s\S]*reducedMotion\(\)/, 'camera shake checks reducedMotion');
  assert.ok(player.includes('reducedMotion() ? NO_SQUASH'), 'squash & stretch is neutralized under reduced motion');
});

test('settings screen exposes the comfort toggles, localized in both languages', () => {
  const screens = readScreens();
  for (const id of ['tg-motion', 'tg-font', 'tg-contrast', 'tg-colorblind', 'tg-textsize']) {
    assert.ok(screens.includes(`id="${id}"`), `settings has a ${id} toggle`);
  }
  const dict = read('i18n/en.js') + '\n' + read('i18n/nl.js');
  for (const key of ['settings.reduce_motion', 'settings.dyslexia_font', 'settings.high_contrast', 'settings.colorblind', 'settings.text_size']) {
    const n = dict.split(`'${key}'`).length - 1;
    assert.equal(n, 2, `${key} is defined in both en and nl`);
  }
});

test('text-scale and the colour-blind palette are opt-in and wired in CSS', () => {
  const css = readFileSync(new URL('../style.css', import.meta.url), 'utf8');
  assert.match(css, /--text-scale:\s*1\b/, 'normal mode is 1× (unchanged)');
  assert.ok(css.includes('font-size: calc(') && css.includes('* var(--text-scale))'), 'font-sizes scale with --text-scale');
  assert.match(css, /:root\.colorblind\s*\{/, 'colour-blind palette is a class (opt-in, normal mode untouched)');
});

test('opening a screen moves focus into it for keyboard/screen-reader users', () => {
  const screens = readScreens();
  const render = screens.slice(screens.indexOf('function render('), screens.indexOf('function backBtn('));
  assert.match(render, /\.tabIndex\s*=\s*-1/, 'screen container is focusable');
  assert.match(render, /\.focus\?\./, 'render moves focus into the new screen');
});

test('OpenDyslexic is lazy-loaded at runtime, not statically declared, and wired to the easy-read option', () => {
  const css = readFileSync(new URL('../style.css', import.meta.url), 'utf8');
  const a11y = read('a11y.js');
  // The heavy woff2 must NOT ship as a static @font-face in the always-loaded CSS (that would
  // pull it into the PWA precache for every kid — the whole point of TODO_01 is to avoid that).
  assert.doesNotMatch(css, /@font-face/i, 'no static @font-face in the always-loaded CSS');
  // Instead it is registered on demand via the FontFace API, with Vite-fingerprinted URLs.
  assert.match(a11y, /new FontFace\(\s*['"]OpenDyslexic['"]/, 'OpenDyslexic is registered via the FontFace API');
  assert.match(a11y, /new URL\(\s*['"][^'"]*OpenDyslexic-Regular\.woff2['"]\s*,\s*import\.meta\.url\)/, 'Regular woff2 is referenced via new URL(import.meta.url) so Vite emits it');
  assert.match(a11y, /new URL\(\s*['"][^'"]*OpenDyslexic-Bold\.woff2['"]\s*,\s*import\.meta\.url\)/, 'Bold woff2 is referenced via new URL(import.meta.url) so Vite emits it');
  assert.match(a11y, /document\.fonts\.add/, 'the loaded face is added to document.fonts');
  // The easy-read option still selects OpenDyslexic first in the font stack.
  assert.match(css, /:root\.dyslexia[\s\S]*?'OpenDyslexic'/, 'the dyslexia option uses OpenDyslexic first');
  assert.ok(existsSync(new URL('../assets/fonts/OpenDyslexic-Regular.woff2', import.meta.url)), 'Regular woff2 is in the repo');
  assert.ok(existsSync(new URL('../assets/fonts/OpenDyslexic-Bold.woff2', import.meta.url)), 'Bold woff2 is in the repo');
});

test('toasts and Mimi dialogue are announced to screen readers', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const hud = read('hud.js');
  const css = readFileSync(new URL('../style.css', import.meta.url), 'utf8');

  assert.match(html, /id="sr-announce"[^>]*aria-live="polite"/, 'a polite live region exists');
  assert.match(hud, /function announce\(/, 'hud has an announce() helper');
  const toast = hud.slice(hud.indexOf('export function toast'));
  assert.match(toast.slice(0, 260), /announce\(/, 'toasts are mirrored to the announcer');
  assert.match(hud, /\$\('bubble-text'\)\.innerHTML[\s\S]{0,40}announce\(/, 'Mimi dialogue is announced');
  assert.match(css, /\.sr-only\s*\{/, 'the .sr-only utility exists');
});

test('icon-only controls carry accessible names for screen readers', () => {
  const screens = readScreens();
  const hud = read('hud.js');

  assert.match(screens, /id="scr-back"[^>]*aria-label=/, 'the back/close button has an accessible name');
  assert.match(screens, /id="business-close"[^>]*aria-label=/, 'the shop close button has an accessible name');
  assert.match(hud, /setAttribute\('aria-label'/, 'HUD round buttons get accessible names in initHud');

  const dict = read('i18n/en.js') + '\n' + read('i18n/nl.js');
  for (const key of ['nav.back', 'nav.close', 'hud.hint', 'hud.action', 'hud.home']) {
    assert.equal(dict.split(`'${key}'`).length - 1, 2, `${key} is defined in both en and nl`);
  }
});
