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

test('a corrupt (unparseable) save recovers to a clean, playable state and backs up the bad data', async () => {
  localStorage.setItem('monkeygrove.save', '{ this is not valid json ');
  const state = await freshStateModule();

  const save = state.loadSave();
  assert.ok(Array.isArray(save.profiles), 'recovered to a valid save shape instead of crashing');
  assert.equal(localStorage.getItem('monkeygrove.save.corrupt'), '{ this is not valid json ',
    'the bad payload is preserved for recovery, not lost');
  // and the game is genuinely playable after recovery
  const p = state.createProfile('Ari', { age: 8, today: '2026-06-15' });
  assert.ok(p.id, 'a child can still start a fresh profile');
});

test('a parseable save with the wrong shape is backed up, not silently dropped', async () => {
  const junk = JSON.stringify({ hello: 'world' });
  localStorage.setItem('monkeygrove.save', junk);
  const state = await freshStateModule();

  const save = state.loadSave();
  assert.ok(Array.isArray(save.profiles), 'recovered to a clean save');
  assert.equal(localStorage.getItem('monkeygrove.save.corrupt'), junk, 'wrong-shape data is backed up too');
});

test('the version-step ladder migrates a changed field shape, then heals additively', async () => {
  const state = await freshStateModule();

  // A fabricated old save where `egg` was a bare points number (the kind of *changed*
  // shape a fresh-profile heal cannot fix — it would never overwrite a present field).
  const old = {
    v: 1,
    profiles: [{
      id: 'p1', name: 'Old', created: Date.parse('2026-06-15T00:00:00'),
      egg: 42,
    }],
    activeProfile: 'p1',
    settings: { lang: 'en', sfx: true, music: true },
  };

  // Synthetic ladder: v1 -> v2 restructures `egg` from a number into { points, goal }.
  const steps = {
    1: (s) => {
      for (const p of s.profiles) {
        p.egg = { points: typeof p.egg === 'number' ? p.egg : 0, goal: 100 };
      }
      return s;
    },
  };

  const migrated = state.migrate(old, steps, 2);

  assert.equal(migrated.v, 2, 'the save is stamped at the version the ladder reached');
  assert.deepEqual(migrated.profiles[0].egg, { points: 42, goal: 100 },
    'the changed-shape field was migrated by the step, not healed-over');
  // and the additive heal still ran as the final step:
  assert.equal(migrated.profiles[0].bananas, 0, 'missing fields are healed against a fresh profile');
  assert.ok(Array.isArray(migrated.profiles[0].pets));
  assert.equal(migrated.profiles[0].curriculum.packId, 'NL_PO');
});

test('a throwing version step is not swallowed by the ladder', async () => {
  const state = await freshStateModule();
  const steps = { 1: () => { throw new Error('bad migration'); } };
  assert.throws(
    () => state.migrate({ v: 1, profiles: [], settings: {} }, steps, 2),
    /bad migration/,
    'the throw propagates to loadSave so it can back up and fall back',
  );
});

test('a save that breaks migration is backed up and recovers to a clean, playable state', async () => {
  // profiles[] passes the shape guard, but a null profile makes migration throw mid-heal —
  // exercising the same fall-back path a throwing version step would take.
  const bad = JSON.stringify({ v: 1, profiles: [null], activeProfile: 'p1', settings: {} });
  localStorage.setItem('monkeygrove.save', bad);
  const state = await freshStateModule();

  const save = state.loadSave();
  assert.ok(Array.isArray(save.profiles), 'recovered to a valid save shape instead of crashing');
  assert.equal(save.profiles.length, 0, 'fell back to a clean save');
  assert.equal(localStorage.getItem('monkeygrove.save.corrupt'), bad,
    'the raw payload that broke migration is preserved for recovery');
  // and the game is genuinely playable after recovery
  const p = state.createProfile('Ari', { age: 8, today: '2026-06-15' });
  assert.ok(p.id, 'a child can still start a fresh profile');
});

test('loadSave never throws even when storage itself is unavailable', async () => {
  globalThis.localStorage = {
    getItem() { throw new Error('storage disabled'); },
    setItem() { throw new Error('storage disabled'); },
    removeItem() {}, clear() {},
  };
  const state = await freshStateModule();

  let save;
  assert.doesNotThrow(() => { save = state.loadSave(); }, 'boot survives unreadable storage');
  assert.ok(Array.isArray(save.profiles), 'falls back to a clean in-memory save');
});
