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
const MAIN_PATH = join(ROOT, 'src', 'main.js');
const SCREENS_PATH = join(ROOT, 'src', 'screens.js');
const I18N_PATH = join(ROOT, 'src', 'i18n.js');
const STATION_NAMES = ['counter', 'prep', 'oven', 'pantry', 'coinTray', 'orderBoard'];
const BUSINESS_SCREEN_NAMES = ['showBusinessOrder', 'showBusinessStock', 'showBusinessUpgrades'];
const INTERACTIVE_BUSINESS_SCREEN_NAMES = ['showBusinessPrep', 'showBusinessPayment'];
const BUSINESS_I18N_KEYS = [
  'business.title',
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
  return readFileSync(MAIN_PATH, 'utf8');
}

function screensSource() {
  return readFileSync(SCREENS_PATH, 'utf8');
}

function i18nSource() {
  return readFileSync(I18N_PATH, 'utf8');
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
  const startBusiness = source.slice(source.indexOf('  startBusiness()'), source.indexOf('  startNextBusinessOrder()'));

  assert.match(startBusiness, /business\.activeOrder\?\.tasks\?\.length/, 'startBusiness checks for a resumable active order');
  assert.ok(
    startBusiness.indexOf('resumeBusinessOrder') >= 0
      && startBusiness.indexOf('resumeBusinessOrder') < startBusiness.indexOf('startNextBusinessOrder'),
    'startBusiness resumes the active order before generating a new one',
  );
  assert.match(source, /resumeBusinessOrder\s*\(\s*business\s*\)/, 'resume helper receives current business state');
  assert.match(source, /this\.businessAttempts\s*=\s*\[\s*\]/, 'resume/new order runtime attempts start empty to avoid replayed persisted attempts');
});

test('business close-day flow does not discard active unfinished orders', () => {
  const source = mainSource();
  const showPanel = source.slice(source.indexOf('  showBusinessOrderPanel()'), source.indexOf('  nextOpenBusinessTask('));
  const requestEnd = source.slice(source.indexOf('  requestEndBusinessDay()'), source.indexOf('  endBusinessDay()'));
  const endDay = source.slice(source.indexOf('  endBusinessDay()'), source.indexOf('  businessTap('));

  assert.ok(showPanel.includes('onCloseDay: () => this.requestEndBusinessDay()'), 'order panel close uses guarded end-day request');
  assert.match(requestEnd, /business\.activeOrder[\s\S]*this\.showBusinessOrderPanel\(\)/, 'guard keeps live order panel open');
  assert.match(requestEnd, /hud\.toast/, 'guard gives feedback when close-day is blocked');
  assert.match(endDay, /business\.activeOrder[\s\S]*return/, 'endBusinessDay defensively refuses live active orders');
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
  for (const attr of ['data-money', 'data-paid', 'data-change']) {
    assert.ok(screens.includes(attr), `payment panel exposes ${attr} controls`);
  }
  assert.ok(!main.includes('correctBusinessAction(task)'), 'main no longer submits generated correct actions');
  assert.ok(!main.includes('correctBusinessAction('), 'main removes the correctBusinessAction helper entirely');
});

test('business order panel gates prep and payment callbacks by task kind', () => {
  const source = screensSource();

  assert.match(source, /task\.kind\s*===\s*['"]prep['"]/, 'prep action checks for prep tasks');
  assert.match(source, /task\.kind\s*===\s*['"]payment['"]/, 'pay action checks for payment tasks');
  assert.match(source, /business-prep[\s\S]*disabled/, 'prep button can be disabled when task kind does not match');
  assert.match(source, /business-pay[\s\S]*disabled/, 'pay button can be disabled when task kind does not match');
});

test('future business i18n keys exist in both English and Dutch dictionaries', () => {
  const source = i18nSource();

  for (const key of BUSINESS_I18N_KEYS) {
    assert.ok(countQuotedKey(source, key) >= 2, `src/i18n.js includes EN/NL key ${key}`);
  }
});
