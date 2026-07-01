import { beforeEach, test } from 'vitest';
import assert from 'node:assert/strict';
import { SHOPS } from '../src/business/data.js';

function mockStorage() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
    clear: () => data.clear(),
  };
}

async function freshStateModule() {
  return import(/* @vite-ignore */ `../src/state.js?businessStateTest=${Date.now()}${Math.random()}`);
}

beforeEach(() => {
  Object.defineProperty(globalThis, 'navigator', {
    value: { language: 'en-US' },
    configurable: true,
  });
  globalThis.localStorage = mockStorage();
});

test('new profiles include two stocked, independent shops', async () => {
  const state = await freshStateModule();

  const profile = state.createProfile('Ari', { age: 8 });

  // The business is now a container of two independent shops.
  assert.deepEqual(Object.keys(profile.business).sort(), ['bakery', 'pizzeria']);
  for (const id of ['bakery', 'pizzeria']) {
    const shop = profile.business[id];
    assert.equal(shop.id, id);
    assert.equal(shop.level, 1);
    assert.equal(shop.shopCoins, 0);
    assert.deepEqual(shop.stock, SHOPS[id].startingStock);
    assert.deepEqual(shop.progress, {});
  }
});

test('old saves heal both shops additively', async () => {
  localStorage.setItem('monkeygrove.save', JSON.stringify({
    v: 1,
    profiles: [{ id: 'p1', name: 'Old', bananas: 12, created: 1 }],
    activeProfile: 'p1',
    settings: { lang: 'en', sfx: true, music: true },
  }));

  const state = await freshStateModule();
  const profile = state.activeProfile();

  assert.equal(profile.id, 'p1');
  assert.equal(profile.bananas, 12);
  assert.equal(profile.business.bakery.level, 1);
  assert.equal(profile.business.bakery.shopCoins, 0);
  assert.deepEqual(profile.business.bakery.stock, SHOPS.bakery.startingStock);
  assert.deepEqual(profile.business.pizzeria.stock, SHOPS.pizzeria.startingStock);
});

test('a pre-split flat business migrates into the bakery, seeding a fresh pizzeria', async () => {
  // v2 and earlier stored one flat shop; the v2->v3 step wraps it as the bakery.
  localStorage.setItem('monkeygrove.save', JSON.stringify({
    v: 2,
    profiles: [{
      id: 'p1',
      name: 'Partial',
      created: 1,
      business: {
        shopCoins: 555,
        stock: { flour: 2 },
        progress: {
          money_make_amounts: { attempts: 4, correct: 3 },
        },
      },
    }],
    activeProfile: 'p1',
    settings: { lang: 'en', sfx: true, music: true },
  }));

  const state = await freshStateModule();
  const profile = state.activeProfile();

  // the old flat shop is now the bakery: coins + progress preserved, stock healed
  assert.equal(profile.business.bakery.shopCoins, 555);
  assert.equal(profile.business.bakery.stock.flour, 2);
  assert.equal(profile.business.bakery.stock.berries, SHOPS.bakery.startingStock.berries);
  assert.equal(profile.business.bakery.stock.milk, SHOPS.bakery.startingStock.milk);
  assert.deepEqual(profile.business.bakery.progress, {
    money_make_amounts: { attempts: 4, correct: 3 },
  });
  assert.equal(profile.business.bakery.level, 1);
  assert.equal(profile.business.bakery.currentDay, 1);
  // and a fresh pizzeria appears beside it
  assert.deepEqual(profile.business.pizzeria.stock, SHOPS.pizzeria.startingStock);
  assert.deepEqual(profile.business.pizzeria.progress, {});
});
