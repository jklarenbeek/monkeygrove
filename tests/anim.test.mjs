import { test } from 'vitest';
import assert from 'node:assert/strict';
import { dampRotateToward, lookAtYaw, idleBob, hopArc, squashPulse, wobble } from '../src/anim.js';
import { getCreature, CREATURE_IDS } from '../src/mesh/creatures.js';

const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

test('dampRotateToward takes the shortest arc and wraps across ±π', () => {
  // from 3.0 to -3.0 is shorter going forward through π than back through 0
  const stepped = dampRotateToward(3.0, -3.0, 1);
  assert.ok(close(((stepped % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI), ((-3.0 % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI), 1e-6), 'reaches target at k=1');
  // partial step stays on the short side (delta ~ +0.283), not the long way (~ -6.0)
  const partial = dampRotateToward(3.0, -3.0, 0.5);
  assert.ok(partial > 3.0, 'short arc goes the +direction, not all the way around');
});

test('lookAtYaw matches atan2(dx, dz) (+Z facing convention)', () => {
  assert.ok(close(lookAtYaw(0, 0, 1, 0), Math.atan2(1, 0)));
  assert.ok(close(lookAtYaw(2, 2, 2, 5), Math.atan2(0, 3)));
});

test('hopArc is 0 at the ends and peaks at the middle', () => {
  assert.ok(close(hopArc(0, 2), 0));
  assert.ok(close(hopArc(1, 2), 0, 1e-9));
  assert.ok(close(hopArc(0.5, 2), 2));
});

test('squashPulse and wobble start and settle at neutral', () => {
  const a = squashPulse(0); const b = squashPulse(1);
  assert.ok(close(a.sy, 1) && close(a.sxz, 1), 'pulse neutral at k=0');
  assert.ok(close(b.sy, 1) && close(b.sxz, 1), 'pulse neutral at k=1');
  assert.ok(close(wobble(0), 0), 'wobble starts at 0');
  assert.ok(close(wobble(1), 0), 'wobble settles at 0');
  assert.ok(Math.abs(wobble(0.1, 0.3, 5)) > 0, 'wobble is non-zero mid-swing');
});

test('idleBob is a small non-negative additive offset', () => {
  assert.ok(idleBob(0) === 0);
  assert.ok(idleBob(1.2, 2, 0.04) >= 0 && idleBob(1.2, 2, 0.04) <= 0.04);
});

test('every roster creature has an anim profile; crab/crabKing are not creatures', () => {
  for (const id of CREATURE_IDS) {
    const a = getCreature(id).anim;
    assert.ok(a && typeof a.celebrate === 'string', `${id} has an anim profile`);
  }
  assert.ok(!CREATURE_IDS.includes('crab') && !CREATURE_IDS.includes('crabKing'), 'crab/crabKing are not roster creatures');
  // getCreature falls back to monkey for an unknown id → never a crab profile
  assert.equal(getCreature('crab').id, 'monkey', 'crab cannot resolve to a crab profile');
});
