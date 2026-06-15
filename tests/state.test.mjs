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
  const p = state.createProfile('Ari', { age: 8, today: '2026-06-15' });
  assert.equal(p.curriculum.packId, 'NL_PO');
  assert.equal(p.curriculum.ageAtStart, 8);
  assert.equal(p.curriculum.ageCapturedOn, '2026-06-15');
  assert.equal(p.curriculum.estimatedStage, 'grade_5');
  assert.equal(p.curriculum.confirmedStage, 'grade_5');
});

test('createProfile accepts birthday for long-term age progression', async () => {
  const state = await freshStateModule();
  const p = state.createProfile('Ari', { birthDate: '2018-06-15', today: '2026-06-15' });
  assert.equal(p.curriculum.birthDate, '2018-06-15');
  assert.equal(p.curriculum.ageAtStart, 8);
  assert.equal(p.curriculum.ageCapturedOn, '2026-06-15');
  assert.equal(p.curriculum.estimatedStage, 'grade_5');
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

test('refreshProfileCurriculum advances auto profiles when birthday moves the child up', async () => {
  const state = await freshStateModule();
  const p = state.createProfile('Ari', { birthDate: '2018-06-15', today: '2026-06-15' });
  p.curriculum.warmup = { completed: true, results: [{ correct: true }], skillIds: ['tables_b'] };

  const changed = state.refreshProfileCurriculum(p, '2027-06-15');

  assert.equal(changed, true);
  assert.equal(p.curriculum.estimatedStage, 'grade_6');
  assert.equal(p.curriculum.confirmedStage, 'grade_6');
  assert.equal(p.curriculum.lastPromotion.toStage, 'grade_6');
  assert.equal(p.curriculum.warmup.completed, false);
});

test('refreshProfileCurriculum preserves parent override while updating suggested stage', async () => {
  const state = await freshStateModule();
  const p = state.createProfile('Ari', { birthDate: '2018-06-15', today: '2026-06-15' });
  p.curriculum.confirmedStage = 'grade_4';
  p.curriculum.stageSource = 'parent';

  state.refreshProfileCurriculum(p, '2027-06-15');

  assert.equal(p.curriculum.estimatedStage, 'grade_6');
  assert.equal(p.curriculum.confirmedStage, 'grade_4');
  assert.equal(p.curriculum.stageSource, 'parent');
});

test('old saves heal curriculum fields additively', async () => {
  localStorage.setItem('monkeygrove.save', JSON.stringify({
    v: 1,
    profiles: [{ id: 'p1', name: 'Old', created: Date.parse('2026-06-15T00:00:00') }],
    activeProfile: 'p1',
    settings: { lang: 'en', sfx: true, music: true },
  }));
  const state = await freshStateModule();
  const p = state.activeProfile();
  assert.equal(p.curriculum.packId, 'NL_PO');
  assert.equal(p.curriculum.strictness, 'soft');
  assert.equal(p.curriculum.estimatedStage, null);
  assert.equal(p.curriculum.stageSource, 'auto');
});

test('old saves with null stats and avatar keep the profile and heal objects', async () => {
  localStorage.setItem('monkeygrove.save', JSON.stringify({
    v: 1,
    profiles: [{ id: 'p1', name: 'Old', created: Date.parse('2026-06-15T00:00:00'), stats: null, avatar: null }],
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
      created: Date.parse('2026-06-15T00:00:00'),
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
  assert.equal(p.curriculum.ageCapturedOn, '2026-06-15');
  assert.equal(p.curriculum.estimatedStage, 'grade_6');
  assert.equal(p.curriculum.confirmedStage, 'grade_4');
  assert.equal(p.curriculum.stageSource, 'parent');
  assert.equal(p.curriculum.strictness, 'soft');
  assert.equal(p.curriculum.warmup.completed, false);
  assert.deepEqual(p.curriculum.warmup.results, [{ correct: true }]);
  assert.deepEqual(p.curriculum.warmup.scored, { band: 'ahead' });
});

test('migration uses profile creation date to age old age-only profiles', async () => {
  localStorage.setItem('monkeygrove.save', JSON.stringify({
    v: 1,
    profiles: [{
      id: 'p1',
      name: 'Old',
      created: Date.parse('2024-06-15T00:00:00'),
      curriculum: {
        ageAtStart: 8,
        estimatedStage: 'grade_5',
        confirmedStage: 'grade_5',
      },
    }],
    activeProfile: 'p1',
    settings: { lang: 'en', sfx: true, music: true },
  }));

  const state = await freshStateModule();
  const save = state.loadSave();
  const p = save.profiles[0];

  assert.equal(p.curriculum.ageCapturedOn, '2024-06-15');
  state.refreshProfileCurriculum(p, '2026-06-15');
  assert.equal(p.curriculum.estimatedStage, 'grade_7');
  assert.equal(p.curriculum.confirmedStage, 'grade_7');
});

test('migration preserves and normalizes saved curriculum pack ids', async () => {
  localStorage.setItem('monkeygrove.save', JSON.stringify({
    v: 1,
    profiles: [{
      id: 'p1',
      name: 'Old',
      created: Date.parse('2026-06-15T00:00:00'),
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
