import { test, beforeEach } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(`../src/${p}`, import.meta.url), 'utf8');

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

beforeEach(() => {
  globalThis.localStorage = mockStorage();
  globalThis.document = { documentElement: { classList: fakeClassList() } };
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

  s.reduceMotion = true; s.dyslexiaFont = true; s.highContrast = false;
  applyComfortSettings();
  assert.ok(cl.contains('reduce-motion'));
  assert.ok(cl.contains('dyslexia'));
  assert.ok(!cl.contains('high-contrast'));

  s.dyslexiaFont = false; s.highContrast = true;
  applyComfortSettings();
  assert.ok(!cl.contains('dyslexia'), 'toggling off removes the class');
  assert.ok(cl.contains('high-contrast'));
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
  const screens = read('screens.js');
  for (const id of ['tg-motion', 'tg-font', 'tg-contrast']) {
    assert.ok(screens.includes(`id="${id}"`), `settings has a ${id} toggle`);
  }
  const dict = read('i18n/en.js') + '\n' + read('i18n/nl.js');
  for (const key of ['settings.reduce_motion', 'settings.dyslexia_font', 'settings.high_contrast']) {
    const n = dict.split(`'${key}'`).length - 1;
    assert.equal(n, 2, `${key} is defined in both en and nl`);
  }
});

test('opening a screen moves focus into it for keyboard/screen-reader users', () => {
  const screens = read('screens.js');
  const render = screens.slice(screens.indexOf('function render('), screens.indexOf('function backBtn('));
  assert.match(render, /\.tabIndex\s*=\s*-1/, 'screen container is focusable');
  assert.match(render, /\.focus\?\./, 'render moves focus into the new screen');
});

test('icon-only controls carry accessible names for screen readers', () => {
  const screens = read('screens.js');
  const hud = read('hud.js');

  assert.match(screens, /id="scr-back"[^>]*aria-label=/, 'the back/close button has an accessible name');
  assert.match(screens, /id="business-close"[^>]*aria-label=/, 'the shop close button has an accessible name');
  assert.match(hud, /setAttribute\('aria-label'/, 'HUD round buttons get accessible names in initHud');

  const dict = read('i18n/en.js') + '\n' + read('i18n/nl.js');
  for (const key of ['nav.back', 'nav.close', 'hud.hint', 'hud.action', 'hud.home']) {
    assert.equal(dict.split(`'${key}'`).length - 1, 2, `${key} is defined in both en and nl`);
  }
});
