import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { applyWarmupResult, createCurriculumState } from '../src/curriculum/placement.js';

// Screens were split into src/screens/*.js (TODO_16); read the barrel + every family
// module so these structural assertions stay location-agnostic.
const screens = [
  readFileSync(new URL('../src/screens.js', import.meta.url), 'utf8'),
  ...readdirSync(new URL('../src/screens/', import.meta.url)).filter((f) => f.endsWith('.js'))
    .map((f) => readFileSync(new URL(`../src/screens/${f}`, import.meta.url), 'utf8')),
].join('\n');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const i18n = ['en', 'nl']
  .map((l) => readFileSync(new URL(`../src/i18n/${l}.js`, import.meta.url), 'utf8'))
  .join('\n');

test('task 5 wiring exists for playful explorer wizard and warmup flow', () => {
  assert.match(screens, /id="new-explorer-wizard"/);
  assert.match(screens, /data-starter-pet/);
  assert.match(screens, /data-learning-trail/);
  assert.doesNotMatch(screens, /id="new-age"/);
  assert.doesNotMatch(screens, /id="new-birth-date"/);
  assert.match(screens, /id="new-pack"/);
  assert.match(screens, /createProfile\(name, \{ age, packId, avatarPet, avatarCreature, placementWarmup \}\)/);
  assert.match(screens, /let explorerName = '';/);
  assert.match(screens, /explorerName = wizard\.querySelector\('#new-name'\)\?\.value\.trim\(\) \|\| explorerName;/);
  assert.match(screens, /playerCard\.classList\.add\('hidden'\)/);
  assert.match(screens, /playerCard\.classList\.remove\('hidden'\)/);
  assert.match(screens, /id="wizard-cancel"/);
  assert.match(screens, /class="menu-row title-menu"/);
  assert.match(screens, /el\.classList\.add\('wizard-active'\)/);
  assert.match(screens, /el\.classList\.remove\('wizard-active'\)/);
  assert.match(screens, /if \(el\.classList\.contains\('wizard-active'\)\)/);
  assert.match(screens, /refreshLanguageButtons\(\)/);
  assert.match(screens, /if \(!rawName\)/);
  assert.match(screens, /title\.name_required/);
  assert.match(screens, /export function showWarmup/);
  assert.match(main, /needsWarmup\(profile = this\.profile\)/);
  assert.match(main, /profile\?\.flags\?\.needsPlacementWarmup/);
  assert.match(main, /startWarmupThenHub\(\)/);
  assert.match(main, /applyWarmupResult/);
  assert.match(main, /eligibleSkillIds/);
  assert.match(main, /this\.startWarmupThenHub\(\)/);
  assert.match(main, /else if \(this\.needsWarmup\(\)\)/);
});

test('task 5 i18n keys exist in english and dutch', () => {
  for (const key of [
    'title.wizard_name_title',
    'title.wizard_pet_title',
    'title.wizard_trail_title',
    'title.name_required',
    'title.trail_sprout',
    'title.trail_climber',
    'title.trail_explorer',
    'title.trail_unsure',
    'placement.title',
    'placement.body',
    'placement.start',
    'placement.skip',
    'placement.done',
    'placement.answer',
  ]) {
    const n = i18n.split(`'${key}'`).length - 1;
    assert.ok(n >= 2, `${key} needs EN and NL entries (found ${n})`);
  }
});

test('applyWarmupResult can preserve partial warmup without completing it', () => {
  const curriculum = createCurriculumState({ age: 8 });
  const updated = applyWarmupResult(
    curriculum,
    [{ skill: 'add_20', correct: true }],
    { completed: false, skillIds: ['add_20', 'sub_20', 'tables_a'] },
  );

  assert.equal(updated.warmup.completed, false);
  assert.deepEqual(updated.warmup.results, [{ skill: 'add_20', correct: true }]);
  assert.deepEqual(updated.warmup.skillIds, ['add_20', 'sub_20', 'tables_a']);
});

test('showWarmup ignores repeated clicks after a choice or skip is already handled', async () => {
  const originalDocument = globalThis.document;
  const originalWindow = globalThis.window;
  const originalLocalStorage = globalThis.localStorage;
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  const originalRequestAnimationFrame = globalThis.requestAnimationFrame;
  const originalCancelAnimationFrame = globalThis.cancelAnimationFrame;
  const navigatorDesc = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

  class MockButton {
    constructor(attrs = {}) {
      this.dataset = attrs.dataset || {};
      this.disabled = false;
      this.textContent = '';
      this.listeners = {};
    }

    addEventListener(type, handler) {
      this.listeners[type] = handler;
    }

    click() {
      this.listeners.click?.({ preventDefault() {}, stopPropagation() {} });
    }
  }

  const toastHost = { appendChild() {} };
  let currentScreen = null;
  let currentHtml = '';
  const makeScreen = (html) => {
    const buttons = [];
    const byId = new Map();
    const byValue = [];
    for (const match of html.matchAll(/<button\b([^>]*)>/g)) {
      const attrs = match[1];
      const id = /id="([^"]+)"/.exec(attrs)?.[1];
      const value = /data-value="([^"]+)"/.exec(attrs)?.[1];
      const btn = new MockButton({
        dataset: value ? { value } : {},
      });
      if (id) byId.set(id, btn);
      if (value) byValue.push(btn);
      buttons.push(btn);
    }
    return {
      querySelector(selector) {
        if (selector.startsWith('#')) return byId.get(selector.slice(1)) || null;
        if (selector === '[data-value]') return byValue[0] || null;
        if (selector === 'button') return buttons[0] || null;
        return null;
      },
      querySelectorAll(selector) {
        if (selector === '[data-value]') return byValue.slice();
        if (selector === 'button') return buttons.slice();
        return [];
      },
    };
  };

  const host = {
    get firstElementChild() {
      return currentScreen;
    },
    set innerHTML(html) {
      currentHtml = html;
      currentScreen = makeScreen(html);
    },
  };

  globalThis.document = {
    getElementById(id) {
      if (id === 'screens') return host;
      if (id === 'toasts') return toastHost;
      return null;
    },
    createElement() {
      return {
        className: '',
        textContent: '',
        remove() {},
      };
    },
  };
  globalThis.window = {
    addEventListener() {},
    removeEventListener() {},
    navigator: { getGamepads: () => [] },
  };
  Object.defineProperty(globalThis, 'navigator', {
    value: { language: 'en' },
    configurable: true,
    writable: true,
  });
  globalThis.localStorage = {
    getItem() { return null; },
    setItem() {},
  };
  globalThis.setTimeout = (fn) => {
    fn?.();
    return 0;
  };
  globalThis.clearTimeout = () => {};
  globalThis.requestAnimationFrame = () => 0;
  globalThis.cancelAnimationFrame = () => {};

  try {
    const { showWarmup } = await import('../src/screens.js');

    let answerCalls = 0;
    let doneCalls = 0;
    let skipCalls = 0;

    showWarmup({
      problems: [{
        answer: '4',
        equation: '2 + 2 = ?',
        prompt: { key: 'q.compare', vars: {} },
        choices: [{ value: '4' }, { value: '5' }],
      }],
      onAnswer: () => { answerCalls += 1; },
      onDone: () => { doneCalls += 1; },
      onSkip: () => { skipCalls += 1; },
    });

    currentScreen.querySelector('#warmup-start').click();
    assert.match(currentHtml, /Question 1 of 1/);
    assert.match(currentHtml, /Choose the largest fraction\./);
    const finalChoice = currentScreen.querySelectorAll('[data-value]')[0];
    finalChoice.click();
    finalChoice.click();

    assert.equal(answerCalls, 1);
    assert.equal(doneCalls, 1);

    answerCalls = 0;
    doneCalls = 0;
    skipCalls = 0;
    currentScreen = null;

    showWarmup({
      problems: [],
      onAnswer: () => { answerCalls += 1; },
      onDone: () => { doneCalls += 1; },
      onSkip: () => { skipCalls += 1; },
    });

    const skipButton = currentScreen.querySelector('#warmup-skip');
    skipButton.click();
    skipButton.click();

    assert.equal(answerCalls, 0);
    assert.equal(doneCalls, 0);
    assert.equal(skipCalls, 1);
  } finally {
    globalThis.document = originalDocument;
    globalThis.window = originalWindow;
    globalThis.localStorage = originalLocalStorage;
    globalThis.setTimeout = originalSetTimeout;
    globalThis.clearTimeout = originalClearTimeout;
    globalThis.requestAnimationFrame = originalRequestAnimationFrame;
    globalThis.cancelAnimationFrame = originalCancelAnimationFrame;
    if (navigatorDesc) Object.defineProperty(globalThis, 'navigator', navigatorDesc);
    else delete globalThis.navigator;
  }
});
