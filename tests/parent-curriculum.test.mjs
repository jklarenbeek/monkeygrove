import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

// Screens were split into src/screens/*.js (TODO_16); read the barrel + every family
// module so these structural assertions stay location-agnostic.
const screensSource = [
  readFileSync(new URL('../src/screens.js', import.meta.url), 'utf8'),
  ...readdirSync(new URL('../src/screens/', import.meta.url)).filter((f) => f.endsWith('.js'))
    .map((f) => readFileSync(new URL(`../src/screens/${f}`, import.meta.url), 'utf8')),
].join('\n');
const i18nSource = ['en', 'nl']
  .map((l) => readFileSync(new URL(`../src/i18n/${l}.js`, import.meta.url), 'utf8'))
  .join('\n');
const mainSource = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');

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
  assert.match(screensSource, /listPacks/);
  assert.match(screensSource, /curriculumCoverageHtml/);
  assert.match(screensSource, /businessReport = null/);
  assert.match(screensSource, /coverageForReport\(pack\.id, report, \{ business: businessReport, stage: stageReport \}\)/);
});

test('task 8 parent business reporting is wired and translated', () => {
  assert.match(screensSource, /businessReport/);
  assert.match(screensSource, /parentBusinessHtml/);
  assert.match(screensSource, /parentBusinessHtml\(businessReport\)/);
  assert.match(mainSource, /aggregateBusinessReport/);
  assert.match(mainSource, /businessReport:\s*p\?\.business\s*\?\s*aggregateBusinessReport\(p\)\s*:\s*null/);

  for (const key of [
    'parents.business',
    'business.profit',
  ]) {
    const n = i18nSource.split(`'${key}'`).length - 1;
    assert.ok(n >= 2, `${key} needs EN and NL entries (found ${n})`);
  }
});
test('parent entry asks which child to view before opening results', () => {
  assert.match(screensSource, /showParentProfileSelect/);
  assert.match(screensSource, /parents\.choose_child/);
  assert.match(screensSource, /data-parent-profile/);
  assert.match(mainSource, /showParentSelect\(/);
  assert.match(mainSource, /onParents:\s*\(\) => this\.showParentSelect/);
  assert.match(mainSource, /showParents\(profileId = null, onClose/);
  assert.match(mainSource, /profiles\(\)\.find\(\(profile\) => profile\.id === profileId\)/);
});

test('task 7 i18n keys exist in english and dutch', () => {
  for (const key of [
    'title.curriculum_prompt',
    'title.curriculum_help',
    'parents.choose_child',
    'parents.no_profiles',
    'parents.curriculum',
    'parents.curriculum_pack',
    'parents.stage',
    'parents.coverage',
    'parents.covered',
    'parents.partial',
    'parents.playable',
    'parents.planned',
    'curriculum.country.nl',
    'curriculum.nl_po.title',
    'curriculum.domain.operations',
    'curriculum.nl_po.objective.add_sub_to_20',
    'curriculum.nl_po.objective.tables_2_5_10',
  ]) {
    const n = i18nSource.split(`'${key}'`).length - 1;
    assert.ok(n >= 2, `${key} needs EN and NL entries (found ${n})`);
  }
});

test('parent curriculum controls expose stage and strictness change wiring', () => {
  assert.match(screensSource, /data-pack/);
  assert.match(screensSource, /data-birth-date/);
  assert.match(screensSource, /data-stage/);
  assert.match(screensSource, /data-strictness/);
  assert.match(screensSource, /onCurriculumChange/);
  assert.match(mainSource, /rest\.stageSource\s*=\s*patch\.confirmedStage === p\.curriculum\?\.estimatedStage\s*\?\s*'auto'\s*:\s*'parent'/);
});

test('new explorer wizard sends trail placement and default curriculum pack into profile creation', () => {
  assert.match(screensSource, /id="new-pack"/);
  assert.doesNotMatch(screensSource, /id="new-birth-date"/);
  assert.match(screensSource, /const trail = TRAIL_CHOICES\.find\(\(choice\) => choice\.id === selectedTrail\)/);
  assert.match(screensSource, /const packId = el\.querySelector\('#new-pack'\)\.value/);
  assert.match(screensSource, /createProfile\(name, \{ age, packId, avatarPet, avatarCreature, placementWarmup \}\)/);
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
    const {
      showBusinessOrder,
      showBusinessPayment,
      showBusinessPrep,
      showParents,
    } = await import('../src/screens.js');
    const { setLang } = await import('../src/i18n.js');

    const profile = {
      name: 'Ari',
      curriculum: {
        packId: 'NL_PO',
        birthDate: '2018-06-15',
        ageAtStart: 8,
        ageCapturedOn: '2026-06-15',
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
    assert.match(currentHtml, /Country: Netherlands/);
    assert.match(currentHtml, /Learning path: Dutch primary math \(NL_PO\)/);
    assert.match(currentHtml, /Birthday: 2018-06-15/);
    assert.match(currentHtml, /Stage: Grade 5/);
    assert.match(currentHtml, /Operations/);
    assert.match(currentHtml, /Add and subtract to 20 · covered/);
    assert.match(currentHtml, /Tables of 2, 5, and 10 · started/);
    assert.ok(!currentHtml.includes('nl_po.grade3.add_sub_to_20'));
    assert.ok(!currentHtml.includes('curriculum.domain.operations'));
    assert.ok(!currentHtml.includes('grade_5'));

    showParents({
      report,
      profile,
      businessReport: {
        ordersServed: 3,
        profitCents: 450,
        modes: {
          money_make_amounts: { coverage: 'covered' },
          recipe_measure_whole: { coverage: 'partial' },
        },
      },
      onClose() {},
    });
    assert.match(currentHtml, /Bakery\/pizzeria practice/);
    assert.match(currentHtml, /3 orders served/);
    assert.match(currentHtml, /Profit: €4\.50/);
    assert.match(currentHtml, /Money amounts to 100 · covered/);
    assert.match(currentHtml, /Measurement units · started/);
    assert.ok(!currentHtml.includes('money_make_amounts'));
    assert.ok(!currentHtml.includes('recipe_measure_whole'));

    showParents({
      report,
      profile,
      businessReport: { ordersServed: 0, profitCents: 0 },
      onClose() {},
    });
    assert.match(currentHtml, /Bakery\/pizzeria practice/);
    assert.ok(!currentHtml.includes('undefined'));

    const task = {
      id: 'pay',
      kind: 'payment',
      mode: 'money_make_amounts',
      objectiveId: 'nl_po.grade4.money_to_100',
      expected: { amountCents: 450, paidCents: 500, changeCents: 50 },
    };
    showBusinessOrder({
      order: { recipeId: 'margherita', priceCents: 450, tasks: [task] },
      customerName: 'Sam',
      activeTask: task,
      onCloseDay() {},
    });
    assert.ok(!currentHtml.includes('money_make_amounts'));
    assert.ok(!currentHtml.includes('grade_4'));

    showBusinessPrep({
      task: { ...task, kind: 'prep', mode: 'recipe_measure_whole', objectiveId: 'nl_po.grade5.measurement_units_intro' },
      onSubmit() {},
      onClose() {},
    });
    assert.ok(!currentHtml.includes('recipe_measure_whole'));
    assert.ok(!currentHtml.includes('grade_5'));

    showBusinessPayment({ task, onSubmit() {}, onClose() {} });
    assert.ok(!currentHtml.includes('money_make_amounts'));
    assert.ok(!currentHtml.includes('grade_4'));

    setLang('nl');
    showParents({ report, profile, onClose() {} });
    assert.match(currentHtml, /Leerlijn/);
    assert.match(currentHtml, /Land: Nederland/);
    assert.match(currentHtml, /Leerpad: Nederlands basisschoolrekenen \(NL_PO\)/);
    assert.match(currentHtml, /Verjaardag: 2018-06-15/);
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
