import { test } from 'vitest';
import assert from 'node:assert/strict';
import { screenDirToGridStep } from '../src/world.js';

// Phase 12 guards: camera "moments" animate span/target only — never the angle — so
// the screen→grid input mapping must be exactly what it is today. This truth table is
// the regression fence: if a camera change ever rotates input, it breaks here.
test('screenDirToGridStep maps the four screen diagonals to four distinct grid hops', () => {
  // The board is a 45°-rotated diamond, so each cell-to-cell hop travels on a screen
  // DIAGONAL — those four swipes resolve cleanly to the four distinct hops.
  const ne = screenDirToGridStep(1, 1);
  const nw = screenDirToGridStep(-1, 1);
  const se = screenDirToGridStep(1, -1);
  const sw = screenDirToGridStep(-1, -1);
  for (const s of [ne, nw, se, sw]) assert.ok(Array.isArray(s) && s.length === 2, 'resolves to a [dx,dz] hop');
  const set = new Set([ne, nw, se, sw].map((s) => s.join(',')));
  assert.equal(set.size, 4, 'four distinct hops, no dead/duplicate buckets');
  assert.equal(screenDirToGridStep(0, 0), null, 'a zero vector resolves to nothing');
});

test('input mapping is deterministic (identical inputs → identical hop)', () => {
  for (const [sx, sy] of [[0.7, 0.7], [-0.4, 0.9], [1, -0.2], [-1, -1]]) {
    assert.deepEqual(screenDirToGridStep(sx, sy), screenDirToGridStep(sx, sy));
  }
});
