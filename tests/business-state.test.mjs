import { beforeEach, test } from 'vitest';
import assert from 'node:assert/strict';
import { BALANCE } from '../src/config.js';

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

test('new profiles include stocked business state', async () => {
  const state = await freshStateModule();

  const profile = state.createProfile('Ari', { age: 8 });

  assert.equal(profile.business.level, 1);
  assert.equal(profile.business.shopCoins, 0);
  assert.deepEqual(profile.business.stock, BALANCE.businessStartingStock);
  assert.deepEqual(profile.business.progress, {});
});

test('old saves heal business state additively', async () => {
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
  assert.equal(profile.business.level, 1);
  assert.equal(profile.business.shopCoins, 0);
  assert.deepEqual(profile.business.stock, BALANCE.businessStartingStock);
});

test('partial business saves preserve values and heal missing stock keys', async () => {
  localStorage.setItem('monkeygrove.save', JSON.stringify({
    v: 1,
    profiles: [{
      id: 'p1',
      name: 'Partial',
      created: 1,
      business: {
        shopCoins: 555,
        stock: { dough: 2 },
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

  assert.equal(profile.business.shopCoins, 555);
  assert.equal(profile.business.stock.dough, 2);
  assert.equal(profile.business.stock.sauce, BALANCE.businessStartingStock.sauce);
  assert.equal(profile.business.stock.cheese, BALANCE.businessStartingStock.cheese);
  assert.deepEqual(profile.business.progress, {
    money_make_amounts: { attempts: 4, correct: 3 },
  });
  assert.equal(profile.business.level, 1);
  assert.equal(profile.business.currentDay, 1);
});
