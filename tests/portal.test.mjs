// Living-gate stage ladder: mastery pct -> portal growth stage (0..4).
// Pure config — no three.js needed.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { PORTAL_STAGES, portalStage } from '../src/config.js';

test('four rising thresholds inside (0, 1)', () => {
  assert.equal(PORTAL_STAGES.length, 4);
  for (let i = 0; i < PORTAL_STAGES.length; i++) {
    assert.ok(PORTAL_STAGES[i] > 0 && PORTAL_STAGES[i] < 1);
    if (i) assert.ok(PORTAL_STAGES[i] > PORTAL_STAGES[i - 1], 'thresholds ascend');
  }
});

test('portalStage maps pct to 0..4 monotonically', () => {
  assert.equal(portalStage(0), 0);
  assert.equal(portalStage(PORTAL_STAGES[0] - 0.001), 0);
  assert.equal(portalStage(PORTAL_STAGES[0]), 1);
  assert.equal(portalStage(PORTAL_STAGES[1]), 2);
  assert.equal(portalStage(PORTAL_STAGES[2]), 3);
  assert.equal(portalStage(PORTAL_STAGES[3]), 4);
  assert.equal(portalStage(1), 4);
  let prev = 0;
  for (let p = 0; p <= 1.0001; p += 0.01) {
    const s = portalStage(p);
    assert.ok(s >= prev, 'stage never drops as pct rises');
    prev = s;
  }
});

test('missing mastery reads as a sleeping gate, not a crash', () => {
  assert.equal(portalStage(undefined), 0);
  assert.equal(portalStage(null), 0);
});
