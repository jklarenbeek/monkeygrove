import { test } from 'vitest';
import assert from 'node:assert/strict';
import { createMathState, masteryReport } from '../src/mathengine.js';
import { BUILDS, freshIsland, islandStatus } from '../src/island.js';
import { createCurriculumState } from '../src/curriculum/placement.js';
import { createBusinessState } from '../src/business/engine.js';
import { applyDevPreset, describeDevState, DEV_PRESETS } from '../src/devtools.js';

function setupProfile() {
  return {
    id: 'dev-profile',
    name: 'Dev',
    bananas: 0,
    egg: { points: 0, goal: 20 },
    pets: [],
    owned: { hats: [], furs: ['classic'], trails: [] },
    streak: { count: 0, lastDay: null, freezes: 0, giftDay: null },
    island: freshIsland(),
    curriculum: createCurriculumState({ age: 8, today: '2026-06-15' }),
    business: createBusinessState(),
    math: createMathState(),
    stats: { chambers: 0, correct: 0, wrong: 0, msPlayed: 0, berries: 0, days: 0 },
    flags: {},
    created: Date.parse('2026-06-15T00:00:00'),
  };
}

test('developer presets are a small ordered jump list', () => {
  assert.deepEqual(
    DEV_PRESETS.map((preset) => preset.id),
    ['warmup_done', 'bakery_unlocked', 'bakery_built', 'grade8_business', 'festival_complete'],
  );
});

test('bakery_unlocked advances mastery and bananas without building the bakery', () => {
  const profile = setupProfile();

  const result = applyDevPreset(profile, 'bakery_unlocked');
  const status = islandStatus(profile, masteryReport(profile.math));
  const bakery = status.find((build) => build.id === 'bakery');
  const bridge = status.find((build) => build.id === 'bridge');

  assert.equal(result.id, 'bakery_unlocked');
  assert.equal(profile.curriculum.warmup.completed, true);
  assert.equal(profile.flags.introSeen, true);
  assert.ok(profile.bananas >= bakery.playerCost);
  assert.equal(bakery.state, 'unlocked');
  assert.equal(bridge.state, 'locked');
  assert.equal(profile.island.built.includes('bakery'), false);
});

test('bakery_built makes the business playable and keeps later builds locked', () => {
  const profile = setupProfile();

  applyDevPreset(profile, 'bakery_built');
  const status = islandStatus(profile, masteryReport(profile.math));

  assert.deepEqual(profile.island.built, ['lanterns', 'fruitstand', 'garden', 'stage', 'bakery']);
  assert.equal(status.find((build) => build.id === 'bakery').state, 'built');
  assert.equal(status.find((build) => build.id === 'bridge').state, 'locked');
  assert.equal(profile.business.stock.dough > 0, true);
  assert.equal(profile.business.stock.flour > 0, true);
});

test('festival_complete builds everything and reports a useful summary', () => {
  const profile = setupProfile();

  applyDevPreset(profile, 'festival_complete');
  const report = masteryReport(profile.math);
  const summary = describeDevState(profile, report);

  assert.deepEqual(profile.island.built, BUILDS.map((build) => build.id));
  assert.equal(profile.flags.festivalDone, true);
  assert.ok(Object.values(report.worlds).every((world) => world.pct === 1));
  assert.equal(summary.builds, `${BUILDS.length}/${BUILDS.length}`);
  assert.equal(summary.warmup, 'done');
  assert.equal(summary.stage, 'grade_8');
});
