import { beforeEach, test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import * as THREE from 'three';
import { BUSINESS_CUSTOMERS, CUSTOMER_IDS } from '../src/business/data.js';
import { PETS } from '../src/models.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(HERE);
const SCENE_PATH = join(ROOT, 'src', 'business', 'scene.js');
// Business runtime flow now lives in the BusinessController; the Game shell only
// sets up the scene, and the hub controller owns the bakery-entry tap. Read them
// all so wiring assertions are location-agnostic.
const MAIN_PATHS = [
  join(ROOT, 'src', 'main.js'),
  join(ROOT, 'src', 'business', 'controller.js'),
  join(ROOT, 'src', 'hub.js'),
];
const SCREENS_PATH = join(ROOT, 'src', 'screens.js');
const I18N_PATHS = [join(ROOT, 'src', 'i18n', 'en.js'), join(ROOT, 'src', 'i18n', 'nl.js')];
const STYLE_PATH = join(ROOT, 'style.css');
const STATION_NAMES = ['counter', 'prep', 'oven', 'pantry', 'coinTray', 'orderBoard'];
const BUSINESS_SCREEN_NAMES = ['showBusinessOrder', 'showBusinessStock', 'showBusinessUpgrades'];
const INTERACTIVE_BUSINESS_SCREEN_NAMES = ['showBusinessPrep', 'showBusinessPayment'];
const BUSINESS_I18N_KEYS = [
  'business.title',
  'business.zone.bakery',
  'business.zone.pizzeria',
  'business.order_ready',
  'business.order',
  'business.stock',
  'business.upgrades',
  'business.pay',
  'business.prep',
  'business.done',
];

function sceneSource() {
  return readFileSync(SCENE_PATH, 'utf8');
}

function mainSource() {
  return MAIN_PATHS.map((p) => readFileSync(p, 'utf8')).join('\n');
}

function screensSource() {
  return readFileSync(SCREENS_PATH, 'utf8');
}

function i18nSource() {
  // Per-language dictionaries are separate files now; concatenate so a key shared
  // by both locales still counts as 2.
  return I18N_PATHS.map((p) => readFileSync(p, 'utf8')).join('\n');
}

function styleSource() {
  return readFileSync(STYLE_PATH, 'utf8');
}

function countQuotedKey(source, key) {
  return (source.match(new RegExp(`['"]${key.replaceAll('.', '\\.')}['"]`, 'g')) || []).length;
}

function fakeWorld() {
  return {
    scene: new THREE.Group(),
    pickables: [],
  };
}

function stubCanvasDocument() {
  const context = {
    font: '',
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 0,
    textAlign: '',
    textBaseline: '',
    measureText: (text) => ({ width: String(text).length * 28 }),
    scale() {},
    beginPath() {},
    roundRect() {},
    fill() {},
    stroke() {},
    fillText() {},
  };
  globalThis.document = {
    createElement(tag) {
      assert.equal(tag, 'canvas');
      return {
        width: 0,
        height: 0,
        getContext: () => context,
      };
    },
  };
}

beforeEach(() => {
  stubCanvasDocument();
});

test('business data names the four helper customers and maps them to pet models', () => {
  assert.deepEqual(CUSTOMER_IDS, ['turtle', 'bunny', 'duckling', 'owl']);
  for (const id of CUSTOMER_IDS) {
    const customer = BUSINESS_CUSTOMERS[id];
    assert.equal(customer.id, id);
    assert.equal(customer.petId, id);
    assert.equal(customer.nameKey, `helper.${id}`);
    assert.ok(PETS.some((pet) => pet.id === customer.petId && pet.model), `${id} reuses an existing pet model`);
  }
});

test('business scene source declares the place, factories, and customer model wiring', () => {
  const source = sceneSource();

  assert.match(source, /export\s+class\s+BusinessPlace\s+extends\s+Place/);
  assert.match(source, /from\s+['"]\.\.\/chamber\.js['"]/);
  assert.match(source, /from\s+['"]\.\.\/entities\.js['"]/);
  assert.match(source, /from\s+['"]\.\.\/models\.js['"]/);
  assert.match(source, /from\s+['"]\.\/data\.js['"]/);
  assert.ok(source.includes('makeCharacter(petDef.model'), 'spawnCustomer uses the helper pet model');
  assert.match(source, /spawnCustomer\s*\(\s*customerId\s*,\s*queueIndex\s*=\s*0\s*\)/);
  assert.match(source, /clearCustomers\s*\(/);
  assert.match(source, /stationAt\s*\(\s*x\s*,\s*z\s*\)/);
});

test('business scene source names all station markers and business props', () => {
  const source = sceneSource();

  for (const station of STATION_NAMES) {
    assert.ok(source.includes(station), `scene source names ${station}`);
  }
  for (const prop of ['counter', 'prepBoard', 'pizzaPan', 'doughBowl', 'toppingCrate', 'coinTray', 'orderBoard', 'shopTable', 'oven']) {
    assert.ok(source.includes(`PROPS.${prop}`) || source.includes(`'${prop}'`) || source.includes(`"${prop}"`),
      `scene source references ${prop}`);
  }
});

test('business scene localizes station labels in both locales', () => {
  const scene = sceneSource();
  const i18n = i18nSource();

  assert.ok(scene.includes("'business.station.' + name"),
    'station labels resolve through t(business.station.*), not the raw English key');
  for (const name of STATION_NAMES) {
    assert.equal(countQuotedKey(i18n, `business.station.${name}`), 2,
      `business.station.${name} is defined in both en and nl`);
  }
});

test('BusinessPlace builds unwalkable stations and finds stations by nearby grid cells', async () => {
  const { BusinessPlace } = await import(/* @vite-ignore */ `../src/business/scene.js?task4=${Date.now()}${Math.random()}`);
  const place = new BusinessPlace(fakeWorld());

  assert.deepEqual(Object.keys(place.stations).sort(), [...STATION_NAMES].sort());
  for (const name of STATION_NAMES) {
    const station = place.stations[name];
    assert.ok(Number.isInteger(station.x), `${name} has an x marker`);
    assert.ok(Number.isInteger(station.z), `${name} has a z marker`);
    assert.equal(place.stationAt(station.x, station.z), name);
    assert.equal(place.stationAt(station.x + 1, station.z), name);
    assert.equal(place.cellAt(station.x, station.z).walk, false, `${name} marker is blocked`);
  }
  assert.equal(place.stationAt(0, 0), null);
});

test('BusinessPlace separates bakery and pizzeria into visible mini-game zones', async () => {
  const { BusinessPlace } = await import(/* @vite-ignore */ `../src/business/scene.js?zones=${Date.now()}${Math.random()}`);
  const place = new BusinessPlace(fakeWorld());

  assert.deepEqual(Object.keys(place.miniGameZones).sort(), ['bakery', 'pizzeria']);
  assert.equal(place.miniGameZones.bakery.titleKey, 'business.zone.bakery');
  assert.equal(place.miniGameZones.pizzeria.titleKey, 'business.zone.pizzeria');
  assert.ok(place.miniGameZones.bakery.stations.prep.x < place.miniGameZones.pizzeria.stations.prep.x,
    'bakery prep is visually in the left wing and pizzeria prep in the right wing');
  assert.ok(place.miniGameZones.bakery.props.includes('doughBowl'), 'bakery wing reuses dough bowl visuals');
  assert.ok(place.miniGameZones.bakery.props.includes('basket'), 'bakery wing reuses bread/basket display visuals');
  assert.ok(place.miniGameZones.pizzeria.props.includes('pizzaPan'), 'pizzeria wing reuses pizza pan visuals');
  assert.ok(place.miniGameZones.pizzeria.props.includes('toppingCrate'), 'pizzeria wing reuses topping crate visuals');
  assert.equal(place.stationAt(
    place.miniGameZones.bakery.stations.prep.x,
    place.miniGameZones.bakery.stations.prep.z,
  ), 'prep');
  assert.equal(place.stationAt(
    place.miniGameZones.pizzeria.stations.prep.x,
    place.miniGameZones.pizzeria.stations.prep.z,
  ), 'prep');
});

test('BusinessPlace can move the active order focus between bakery and pizzeria wings', async () => {
  const { BusinessPlace } = await import(/* @vite-ignore */ `../src/business/scene.js?activeZone=${Date.now()}${Math.random()}`);
  const place = new BusinessPlace(fakeWorld());

  place.setActiveRecipe('flatbread');
  assert.equal(place.activeMiniGame, 'bakery');
  assert.deepEqual(place.activeStations.prep, place.miniGameZones.bakery.stations.prep);

  place.setActiveRecipe('margherita');
  assert.equal(place.activeMiniGame, 'pizzeria');
  assert.deepEqual(place.activeStations.prep, place.miniGameZones.pizzeria.stations.prep);
});

test('spawnCustomer creates labeled bobbing helper customers in queue order and clearCustomers removes them', async () => {
  const { BusinessPlace } = await import(/* @vite-ignore */ `../src/business/scene.js?task4=${Date.now()}${Math.random()}`);
  const place = new BusinessPlace(fakeWorld());
  const queue0 = place.queueMarkers[0];
  const queue1 = place.queueMarkers[1];

  const bunny = place.spawnCustomer('bunny');
  const owl = place.spawnCustomer('owl', 1);

  assert.equal(bunny.id, 'bunny');
  assert.equal(bunny.nameKey, 'helper.bunny');
  assert.equal(bunny.petId, 'bunny');
  assert.equal(bunny.x, queue0.x);
  assert.equal(bunny.z, queue0.z);
  assert.equal(owl.x, queue1.x);
  assert.equal(owl.z, queue1.z);
  assert.equal(place.customers.length, 2);
  assert.ok(place.entities.length >= 2, 'customer bobbing entities are registered');
  assert.ok(bunny.mesh.userData.headH > 0, 'spawned helper is a character mesh');
  assert.ok(bunny.label, 'spawned helper has a label');

  place.clearCustomers();

  assert.deepEqual(place.customers, []);
});

test('clearCustomers disposes transient customer label sprite resources', () => {
  const source = sceneSource();
  const cleanupSource = source.slice(source.indexOf('clearCustomers()'));

  assert.ok(source.includes('label.material?.map?.dispose'), 'customer label texture map is disposed');
  assert.ok(source.includes('label.material?.dispose'), 'customer label material is disposed');
  assert.ok(cleanupSource.includes('_disposeCustomerLabel(customer.label)'), 'clearCustomers disposes each label');
  assert.ok(!cleanupSource.includes('customer.mesh.dispose'), 'cached customer voxel meshes are not over-disposed');
});

test('future main business runtime wiring is declared', () => {
  const source = mainSource();

  for (const name of ['startBusiness', 'businessTap', 'endBusinessDay']) {
    assert.ok(source.includes(name), `src/main.js includes ${name}`);
  }
  assert.ok(source.includes("isBuilt(this.profile, 'bakery')"), 'bakery entry is gated by built island state');
  assert.ok(source.includes("'business.open'"), 'bakery entry announces the shop opening');
});

test('business runtime resumes unfinished active orders before generating a new one', () => {
  const source = mainSource();
  const startBusiness = source.slice(source.indexOf('async startBusiness()'), source.indexOf('  startNextBusinessOrder()'));

  assert.match(startBusiness, /business\.activeOrder\?\.tasks\?\.length/, 'startBusiness checks for a resumable active order');
  assert.ok(
    startBusiness.indexOf('resumeBusinessOrder') >= 0
      && startBusiness.indexOf('resumeBusinessOrder') < startBusiness.indexOf('startNextBusinessOrder'),
    'startBusiness resumes the active order before generating a new one',
  );
  assert.match(source, /resumeBusinessOrder\s*\(\s*business\s*\)/, 'resume helper receives current business state');
  assert.match(source, /this\.businessAttempts\s*=\s*\[\s*\]/, 'resume/new order runtime attempts start empty to avoid replayed persisted attempts');
});

test('business entry leaves the voxel mini game visible before opening order UI', () => {
  const source = mainSource();
  const resumeOrder = source.slice(source.indexOf('  resumeBusinessOrder(business)'), source.indexOf('  startNextBusinessOrder()'));
  const startOrder = source.slice(source.indexOf('  startNextBusinessOrder()'), source.indexOf('  showBusinessOrderPanel()'));

  assert.ok(resumeOrder.includes('this.announceBusinessOrder(order)'), 'resumed orders announce from the 3D scene');
  assert.ok(!resumeOrder.includes('this.showBusinessOrderPanel()'), 'resumed orders do not immediately cover the shop scene');
  assert.ok(startOrder.includes('this.announceBusinessOrder(order)'), 'new orders announce from the 3D scene');
  assert.ok(!startOrder.includes('this.showBusinessOrderPanel()'), 'new orders do not immediately cover the shop scene');
  assert.match(source, /announceBusinessOrder\s*\(\s*order\s*\)/, 'runtime has a dedicated non-modal business order announcement');
  assert.ok(source.includes("'business.order_ready'"), 'announcement is localized');
});

test('business close-day flow does not discard active unfinished orders', () => {
  const source = mainSource();
  const showPanel = source.slice(source.indexOf('  showBusinessOrderPanel()'), source.indexOf('  nextOpenBusinessTask('));
  const requestEnd = source.slice(source.indexOf('  requestEndBusinessDay()'), source.indexOf('  endBusinessDay()'));
  const endDay = source.slice(source.indexOf('  endBusinessDay()'), source.indexOf('  businessTap('));

  assert.ok(showPanel.includes('onExit: () => this.leaveBusiness()'), 'order panel x exits to the island');
  assert.match(requestEnd, /business\.activeOrder[\s\S]*this\.showBusinessOrderPanel\(\)/, 'guard keeps live order panel open');
  assert.match(requestEnd, /hud\.toast/, 'guard gives feedback when close-day is blocked');
  assert.match(endDay, /business\.activeOrder[\s\S]*return/, 'endBusinessDay defensively refuses live active orders');
});

test('business order close button is separate from guarded close-day flow', () => {
  const source = readFileSync(new URL('../src/screens.js', import.meta.url), 'utf8');
  const orderScreen = source.slice(source.indexOf('export function showBusinessOrder'), source.indexOf('function choiceValues'));

  assert.match(orderScreen, /onExit/, 'showBusinessOrder accepts an exit callback');
  assert.match(orderScreen, /#business-close'\)\.addEventListener\('click', onExit\)/, 'x uses the exit callback');
});

test('future business screen entry points are declared', () => {
  const source = screensSource();

  for (const name of BUSINESS_SCREEN_NAMES) {
    assert.ok(source.includes(name), `src/screens.js includes ${name}`);
  }
});

test('interactive business prep and payment panels collect explicit player choices', () => {
  const screens = screensSource();
  const main = mainSource();

  for (const name of INTERACTIVE_BUSINESS_SCREEN_NAMES) {
    assert.ok(screens.includes(name), `src/screens.js includes ${name}`);
  }
  for (const attr of ['data-slices', 'data-topping', 'data-total', 'data-ingredient', 'data-amount', 'data-scale-ingredient']) {
    assert.ok(screens.includes(attr), `prep panel exposes ${attr} controls`);
  }
  for (const attr of ['data-money', 'data-change', 'data-final']) {
    assert.ok(screens.includes(attr), `payment panel exposes ${attr} controls`);
  }
  assert.ok(!main.includes('correctBusinessAction(task)'), 'main no longer submits generated correct actions');
  assert.ok(!main.includes('correctBusinessAction('), 'main removes the correctBusinessAction helper entirely');
});

test('each prep mode has its own panel view and a localized prompt in both locales', () => {
  const screens = screensSource();
  const i18n = i18nSource();

  // One PREP_VIEWS branch per prep mode — no silent fallback to the portion panel.
  const PREP_MODES = [
    'portion_halves_quarters',
    'repeated_addition_orders',
    'recipe_measure_whole',
    'fraction_of_quantity_recipe',
    'scale_recipe',
  ];
  const viewsBlock = screens.slice(
    screens.indexOf('const PREP_VIEWS'),
    screens.indexOf('export function showBusinessPrep'),
  );
  assert.ok(viewsBlock.length > 0, 'screens.js defines a PREP_VIEWS registry before showBusinessPrep');
  for (const mode of PREP_MODES) {
    assert.ok(viewsBlock.includes(`${mode}:`), `PREP_VIEWS defines a dedicated panel for ${mode}`);
  }

  // Every prep/unit string the panels render must exist in BOTH en and nl.
  const PREP_KEYS = [
    'business.prep.portion', 'business.prep.repeat', 'business.prep.measure',
    'business.prep.fraction', 'business.prep.scale', 'business.prep.pieces',
    'business.prep.total', 'business.unit.cups', 'business.unit.amount',
  ];
  for (const key of PREP_KEYS) {
    assert.equal(countQuotedKey(i18n, key), 2, `${key} is defined in both en and nl`);
  }
});

test('each payment mode has its own panel view and a localized prompt in both locales', () => {
  const screens = screensSource();
  const i18n = i18nSource();

  // One PAYMENT_VIEWS branch per payment mode — no silent fallback to make-amount.
  const PAY_MODES = ['money_make_amounts', 'decimal_money_change', 'percentage_discount'];
  const viewsBlock = screens.slice(
    screens.indexOf('const PAYMENT_VIEWS'),
    screens.indexOf('export function showBusinessPayment'),
  );
  assert.ok(viewsBlock.length > 0, 'screens.js defines a PAYMENT_VIEWS registry before showBusinessPayment');
  for (const mode of PAY_MODES) {
    assert.ok(viewsBlock.includes(`${mode}:`), `PAYMENT_VIEWS defines a dedicated panel for ${mode}`);
  }

  const PAY_KEYS = [
    'business.pay.make', 'business.pay.total', 'business.pay.reset',
    'business.pay.change', 'business.pay.discount',
  ];
  for (const key of PAY_KEYS) {
    assert.equal(countQuotedKey(i18n, key), 2, `${key} is defined in both en and nl`);
  }
});

test('each review mode has its own day-summary view and a localized prompt in both locales', () => {
  const screens = screensSource();
  const i18n = i18nSource();

  const REVIEW_MODES = ['profit_margin', 'demand_chart', 'unit_conversion_stock', 'price_compare'];
  const viewsBlock = screens.slice(
    screens.indexOf('const REVIEW_VIEWS'),
    screens.indexOf('export function showBusinessDaySummary'),
  );
  assert.ok(viewsBlock.length > 0, 'screens.js defines a REVIEW_VIEWS registry before showBusinessDaySummary');
  for (const mode of REVIEW_MODES) {
    assert.ok(viewsBlock.includes(`${mode}:`), `REVIEW_VIEWS defines a panel for ${mode}`);
  }

  const REVIEW_KEYS = [
    'business.review.profit', 'business.review.demand', 'business.review.convert',
    'business.review.grams', 'business.review.compare', 'business.review.pack',
  ];
  for (const key of REVIEW_KEYS) {
    assert.equal(countQuotedKey(i18n, key), 2, `${key} is defined in both en and nl`);
  }
});

test('prep and payment panels offer a hint and keep the child on the panel to retry', () => {
  const screens = screensSource();
  const i18n = i18nSource();
  const main = mainSource();

  assert.ok(screens.includes('id="business-hint"'), 'panels include a hint button');
  assert.ok(screens.includes('business-feedback'), 'panels include a feedback/hint area');
  assert.ok(screens.includes("'business.hint.' + task.mode"), 'hints are mode-specific');
  // A wrong answer is reported back (panel stays); only a correct answer advances.
  assert.match(main, /return \{ correct: true \}/, 'a correct answer advances the flow');
  assert.match(main, /return \{ correct: false \}/, 'a wrong answer is reported so the panel can stay open');

  const HINT_KEYS = [
    'business.almost',
    'business.hint.portion_halves_quarters', 'business.hint.repeated_addition_orders',
    'business.hint.recipe_measure_whole', 'business.hint.fraction_of_quantity_recipe',
    'business.hint.scale_recipe', 'business.hint.money_make_amounts',
    'business.hint.decimal_money_change', 'business.hint.percentage_discount',
  ];
  for (const key of HINT_KEYS) {
    assert.equal(countQuotedKey(i18n, key), 2, `${key} is defined in both en and nl`);
  }
});

test('the anti-soft-lock supply message is wired and localized', () => {
  const main = mainSource();
  const i18n = i18nSource();

  assert.ok(main.includes('ensureOrderMakeable'), 'main guarantees orders are makeable');
  assert.ok(main.includes('business.supplied'), 'a supplied order is announced to the child');
  assert.equal(countQuotedKey(i18n, 'business.supplied'), 2, 'business.supplied exists in both locales');
});

test('the oven bake step is wired, gated, and localized', () => {
  const main = mainSource(); // main.js + business/controller.js
  const i18n = i18nSource();

  assert.ok(main.includes("station === 'oven'") && main.includes('tapOven'), 'tapping the oven starts the bake');
  assert.ok(main.includes('bakeDurationMs'), 'bake time comes from the oven count');
  assert.match(main, /bakeStatus\s*!==\s*'ready'/, 'serve is gated until the dish is baked');
  assert.ok(main.includes('emit(') || main.includes('emitSteam'), 'baking puffs steam from the oven');

  const BAKE_KEYS = [
    'business.bake.raw', 'business.bake.baking', 'business.bake.ready',
    'business.bake.prep_first', 'business.bake.first',
  ];
  for (const key of BAKE_KEYS) {
    assert.equal(countQuotedKey(i18n, key), 2, `${key} is defined in both en and nl`);
  }
});

test('business order panel gates prep and payment callbacks by task kind', () => {
  const source = screensSource();

  assert.match(source, /task\.kind\s*===\s*['"]prep['"]/, 'prep action checks for prep tasks');
  assert.match(source, /task\.kind\s*===\s*['"]payment['"]/, 'pay action checks for payment tasks');
  assert.match(source, /business-prep[\s\S]*disabled/, 'prep button can be disabled when task kind does not match');
  assert.match(source, /business-pay[\s\S]*disabled/, 'pay button can be disabled when task kind does not match');
});

test('business order panel titles the active mini game by recipe kind', () => {
  const source = screensSource();
  const orderScreen = source.slice(source.indexOf('export function showBusinessOrder'), source.indexOf('function choiceValues'));

  assert.match(orderScreen, /recipe\.kind\s*===\s*['"]pizza['"]/, 'order panel checks the active recipe kind');
  assert.ok(orderScreen.includes('business.zone.pizzeria'), 'pizza orders title the pizzeria mini game');
  assert.ok(orderScreen.includes('business.zone.bakery'), 'bakery orders title the bakery mini game');
});

test('business order screen keeps the voxel shop visible behind the panel', () => {
  const screens = screensSource();
  const styles = styleSource();
  const orderScreen = screens.slice(screens.indexOf('export function showBusinessOrder'), screens.indexOf('function choiceValues'));

  assert.match(screens, /function render\s*\(\s*html\s*,\s*extraClass\s*=\s*['"]['"]\s*\)/, 'screen renderer supports contextual classes');
  assert.match(orderScreen, /render\([\s\S]*['"]business-screen['"]\)/, 'business order panel uses the business overlay class');
  assert.match(styles, /\.screen\.business-screen[\s\S]*backdrop-filter:\s*none/, 'business overlay does not blur the 3D shop');
});

test('future business i18n keys exist in both English and Dutch dictionaries', () => {
  const source = i18nSource();

  for (const key of BUSINESS_I18N_KEYS) {
    assert.ok(countQuotedKey(source, key) >= 2, `src/i18n.js includes EN/NL key ${key}`);
  }
});
