import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const screensSource = readFileSync(new URL('../src/screens.js', import.meta.url), 'utf8');
const i18nSource = readFileSync(new URL('../src/i18n.js', import.meta.url), 'utf8');

function mockStorage() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
    clear: () => data.clear(),
  };
}

test('task 7 wiring exists for curriculum coverage on the parent screen', () => {
  assert.match(screensSource, /coverageForReport/);
  assert.match(screensSource, /getPack/);
  assert.match(screensSource, /curriculumCoverageHtml/);
  assert.match(screensSource, /\$\{curriculumCoverageHtml\(profile, report\)\}/);
});

test('task 7 i18n keys exist in english and dutch', () => {
  for (const key of [
    'parents.curriculum',
    'parents.curriculum_pack',
    'parents.stage',
    'parents.coverage',
    'parents.covered',
    'parents.partial',
    'parents.playable',
    'parents.planned',
    'curriculum.nl_po.title',
    'curriculum.domain.operations',
    'curriculum.nl_po.objective.add_sub_to_20',
    'curriculum.nl_po.objective.tables_2_5_10',
  ]) {
    const n = i18nSource.split(`'${key}'`).length - 1;
    assert.ok(n >= 2, `${key} needs EN and NL entries (found ${n})`);
  }
});

test('showParents renders translated curriculum coverage without exposing internal ids', async () => {
  const originalDocument = globalThis.document;
  const originalWindow = globalThis.window;
  const originalNavigator = globalThis.navigator;
  const originalLocalStorage = globalThis.localStorage;

  let currentHtml = '';
  let currentScreen = null;
  const makeScreen = () => {
    const buttons = new Map();
    return {
      querySelector(selector) {
        if (selector.startsWith('#')) {
          const id = selector.slice(1);
          if (!buttons.has(id)) buttons.set(id, { addEventListener() {} });
          return buttons.get(id);
        }
        return null;
      },
      querySelectorAll() {
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
      currentScreen = makeScreen();
    },
  };

  globalThis.document = {
    getElementById(id) {
      if (id === 'screens') return host;
      return null;
    },
  };
  globalThis.window = {
    addEventListener() {},
    removeEventListener() {},
    navigator: { getGamepads: () => [] },
  };
  Object.defineProperty(globalThis, 'navigator', {
    value: { language: 'en-US' },
    configurable: true,
  });
  globalThis.localStorage = mockStorage();

  try {
    const { showParents } = await import('../src/screens.js');
    const { setLang } = await import('../src/i18n.js');

    const profile = {
      name: 'Ari',
      curriculum: {
        packId: 'NL_PO',
        estimatedStage: 'grade_5',
        confirmedStage: 'grade_5',
      },
    };
    const report = {
      worlds: {
        tide: {
          skills: [
            { id: 'add_20', nameKey: 'skill.add_20', mastered: true, n: 12, acc10: 1 },
            { id: 'sub_20', nameKey: 'skill.sub_20', mastered: true, n: 11, acc10: 0.9 },
          ],
        },
        garden: {
          skills: [
            { id: 'tables_a', nameKey: 'skill.tables_a', mastered: false, n: 3, acc10: 0.5 },
          ],
        },
        stump: { skills: [] },
        vines: { skills: [] },
      },
    };

    setLang('en');
    showParents({ report, profile, onClose() {} });
    assert.match(currentHtml, /Curriculum/);
    assert.match(currentHtml, /Learning path: Dutch primary math \(NL_PO\)/);
    assert.match(currentHtml, /Stage: Groep 5/);
    assert.match(currentHtml, /Operations/);
    assert.match(currentHtml, /Add and subtract to 20 · covered/);
    assert.match(currentHtml, /Tables of 2, 5, and 10 · started/);
    assert.ok(!currentHtml.includes('nl_po.grade3.add_sub_to_20'));
    assert.ok(!currentHtml.includes('curriculum.domain.operations'));
    assert.ok(!currentHtml.includes('grade_5'));

    setLang('nl');
    showParents({ report, profile, onClose() {} });
    assert.match(currentHtml, /Leerlijn/);
    assert.match(currentHtml, /Leerpad: Nederlands basisschoolrekenen \(NL_PO\)/);
    assert.match(currentHtml, /Groep: Groep 5/);
    assert.match(currentHtml, /Bewerkingen/);
    assert.match(currentHtml, /Plussommen en minsommen tot 20 · beheerst/);
    assert.match(currentHtml, /Tafels van 2, 5 en 10 · gestart/);
  } finally {
    globalThis.document = originalDocument;
    globalThis.window = originalWindow;
    globalThis.localStorage = originalLocalStorage;
    if (originalNavigator === undefined) delete globalThis.navigator;
    else {
      Object.defineProperty(globalThis, 'navigator', {
        value: originalNavigator,
        configurable: true,
      });
    }
  }
});
