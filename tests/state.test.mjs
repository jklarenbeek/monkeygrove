import { beforeEach, test } from 'vitest';
import assert from 'node:assert/strict';

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
  return import(/* @vite-ignore */ `../src/state.js?stateTest=${Date.now()}${Math.random()}`);
}

beforeEach(() => {
  Object.defineProperty(globalThis, 'navigator', {
    value: { language: 'en-US' },
    configurable: true,
  });
  globalThis.localStorage = mockStorage();
});

test('createProfile accepts age and creates curriculum state', async () => {
  const state = await freshStateModule();
  const p = state.createProfile('Ari', { age: 8 });
  assert.equal(p.curriculum.packId, 'NL_PO');
  assert.equal(p.curriculum.ageAtStart, 8);
  assert.equal(p.curriculum.estimatedStage, 'grade_5');
  assert.equal(p.curriculum.confirmedStage, 'grade_5');
});

test('createProfile carries the selected curriculum pack into profile state', async () => {
  const { CURRICULUM_PACKS } = await import('../src/curriculum/index.js');
  CURRICULUM_PACKS.TEST_COUNTRY = {
    id: 'TEST_COUNTRY',
    titleKey: 'curriculum.test.title',
    countryCode: 'TT',
    countryKey: 'curriculum.country.test',
    fallbackStagePrefixKey: 'curriculum.stage',
    stages: [
      { id: 'level_a', order: 1, minAge: 4, maxAge: 9, labelKey: 'curriculum.stage' },
      { id: 'level_b', order: 2, minAge: 9, maxAge: 14, labelKey: 'curriculum.stage' },
    ],
    domains: [],
    objectives: [],
  };

  try {
    const state = await freshStateModule();
    const p = state.createProfile('Ari', { age: 8, packId: 'TEST_COUNTRY' });
    assert.equal(p.curriculum.packId, 'TEST_COUNTRY');
    assert.equal(p.curriculum.estimatedStage, 'level_a');
    assert.equal(p.curriculum.confirmedStage, 'level_a');
  } finally {
    delete CURRICULUM_PACKS.TEST_COUNTRY;
  }
});

test('old saves heal curriculum fields additively', async () => {
  localStorage.setItem('monkeygrove.save', JSON.stringify({
    v: 1,
    profiles: [{ id: 'p1', name: 'Old', created: 1 }],
    activeProfile: 'p1',
    settings: { lang: 'en', sfx: true, music: true },
  }));
  const state = await freshStateModule();
  const p = state.activeProfile();
  assert.equal(p.curriculum.packId, 'NL_PO');
  assert.equal(p.curriculum.strictness, 'soft');
  assert.equal(p.curriculum.estimatedStage, null);
});

test('old saves with null stats and avatar keep the profile and heal objects', async () => {
  localStorage.setItem('monkeygrove.save', JSON.stringify({
    v: 1,
    profiles: [{ id: 'p1', name: 'Old', created: 1, stats: null, avatar: null }],
    activeProfile: 'p1',
    settings: { lang: 'en', sfx: true, music: true },
  }));
  const state = await freshStateModule();
  const p = state.activeProfile();
  assert.equal(p.id, 'p1');
  assert.equal(p.stats.chambers, 0);
  assert.equal(p.stats.correct, 0);
  assert.equal(p.avatar.fur, 'classic');
  assert.equal(p.avatar.hat, null);
});

test('partial curriculum preserves placement choices and warmup detail', async () => {
  localStorage.setItem('monkeygrove.save', JSON.stringify({
    v: 1,
    profiles: [{
      id: 'p1',
      name: 'Old',
      created: 1,
      curriculum: {
        ageAtStart: 9,
        confirmedStage: 'grade_4',
        warmup: {
          results: [{ correct: true }],
          scored: { band: 'ahead' },
        },
      },
    }],
    activeProfile: 'p1',
    settings: { lang: 'en', sfx: true, music: true },
  }));
  const state = await freshStateModule();
  const p = state.activeProfile();
  assert.equal(p.curriculum.packId, 'NL_PO');
  assert.equal(p.curriculum.ageAtStart, 9);
  assert.equal(p.curriculum.estimatedStage, 'grade_6');
  assert.equal(p.curriculum.confirmedStage, 'grade_4');
  assert.equal(p.curriculum.strictness, 'soft');
  assert.equal(p.curriculum.warmup.completed, false);
  assert.deepEqual(p.curriculum.warmup.results, [{ correct: true }]);
  assert.deepEqual(p.curriculum.warmup.scored, { band: 'ahead' });
});

test('migration preserves and normalizes saved curriculum pack ids', async () => {
  localStorage.setItem('monkeygrove.save', JSON.stringify({
    v: 1,
    profiles: [{
      id: 'p1',
      name: 'Old',
      created: 1,
      curriculum: {
        packId: 'UNKNOWN',
        ageAtStart: 8,
        estimatedStage: 'level_b',
        confirmedStage: 'level_b',
      },
    }],
    activeProfile: 'p1',
    settings: { lang: 'en', sfx: true, music: true },
  }));

  const state = await freshStateModule();
  const p = state.activeProfile();
  assert.equal(p.curriculum.packId, 'NL_PO');
  assert.equal(p.curriculum.estimatedStage, 'grade_5');
  assert.equal(p.curriculum.confirmedStage, 'grade_5');
});
