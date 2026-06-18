// Screen-relative input mapping on the iso diamond (TODO_10). Guards two things
// the old code got wrong: the keyboard arrows must move the monkey in a
// direction that carries the key's own screen component, and the swipe map must
// bucket the swipe angle into the four grid hops 1:1 — no duplicate or dead
// buckets, the way the old `Math.round(ang / (PI/2))` octant table did.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { screenDirToGridStep } from '../src/world.js';

const key = (s) => (s ? `${s[0]},${s[1]}` : 'null');

// The four grid hops as they appear on screen under the iso camera. The board
// is a 45°-rotated diamond, so each hop lands on a screen diagonal. These are
// the directions the keyboard arrows are meant to produce.
const HOP = {
  upRight: [0, -1],   // screen ≈ +45°  → arrow Up
  upLeft: [-1, 0],    // screen ≈ 135°  → arrow Left
  downRight: [1, 0],  // screen ≈ -45°  → arrow Right
  downLeft: [0, 1],   // screen ≈ -135° → arrow Down
};

// A screen direction pointing well inside each diagonal bucket (sx = right+,
// sy = up+). cos/sin of the bucket centre, but any interior point works.
const C = Math.SQRT1_2;

test('each screen diagonal resolves to the hop that travels that way (round-trip)', () => {
  assert.deepEqual(screenDirToGridStep(C, C), HOP.upRight);    // up + right
  assert.deepEqual(screenDirToGridStep(-C, C), HOP.upLeft);    // up + left
  assert.deepEqual(screenDirToGridStep(C, -C), HOP.downRight); // down + right
  assert.deepEqual(screenDirToGridStep(-C, -C), HOP.downLeft); // down + left
});

test('keyboard intent: Up moves the monkey toward the top of the screen', () => {
  // The whole point of the fix — a push toward the top-of-screen must select
  // the hop the Up arrow is bound to, not a sideways/downward one.
  assert.deepEqual(screenDirToGridStep(C, C), HOP.upRight);
  // ...and that hop genuinely has an upward screen component: the bucket that
  // owns "straight up" (sy>0, sx=0 falls on a boundary) is one of the two
  // up-facing hops, never a down-facing one.
  const straightUp = screenDirToGridStep(0, 1);
  assert.ok(
    key(straightUp) === key(HOP.upRight) || key(straightUp) === key(HOP.upLeft),
    `straight-up should resolve to an up-facing hop, got ${key(straightUp)}`,
  );
});

test('swipe buckets are total and 1:1 — every angle hits exactly one of four hops', () => {
  const seen = new Map();
  for (let deg = 0; deg < 360; deg += 1) {
    const a = (deg * Math.PI) / 180;
    const step = screenDirToGridStep(Math.cos(a), Math.sin(a));
    assert.ok(step, `angle ${deg}° produced no step (dead bucket)`);
    seen.set(key(step), (seen.get(key(step)) || 0) + 1);
  }
  // exactly the four grid hops are reachable, no more, no fewer
  const reachable = [...seen.keys()].sort();
  assert.deepEqual(
    reachable,
    [HOP.upRight, HOP.upLeft, HOP.downRight, HOP.downLeft].map(key).sort(),
  );
  // and each owns a contiguous ~90° wedge (no lossy double-mapping like the old
  // octant table, where both +2 and -2 collapsed onto "left")
  for (const [, count] of seen) assert.ok(count >= 80 && count <= 100, `bucket width ${count}° off`);
});

test('zero vector resolves to null (a tap, not a swipe)', () => {
  assert.equal(screenDirToGridStep(0, 0), null);
});
