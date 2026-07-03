// resolvePos is the director's grid brain — every scripted position flows
// through it. Test it pure, against a minimal place shape (like npc.test.mjs).
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { resolvePos } from '../src/cutscene/director.js';

function makePlace({ w = 9, d = 9, markers = {}, blocked = [] } = {}) {
  const cells = Array.from({ length: d }, () => Array.from({ length: w }, () => ({ h: 0, walk: true, ch: '.' })));
  for (const [x, z] of blocked) cells[z][x].walk = false;
  return {
    size: { w, d },
    markers,
    cellAt: (x, z) => (x < 0 || z < 0 || x >= w || z >= d) ? null : cells[z][x],
  };
}

test('literal [x, z] positions pass through', () => {
  assert.deepEqual(resolvePos([3, 5], { place: makePlace() }), { x: 3, z: 5 });
});

test("'@actor' reads the actor's live cell; unknown actors resolve null", () => {
  const actors = { crabKing: { x: 6, z: 2 } };
  assert.deepEqual(resolvePos('@crabKing', { place: makePlace(), actors }), { x: 6, z: 2 });
  assert.equal(resolvePos('@ghost', { place: makePlace(), actors }), null);
});

test('{marker} resolves the template marker plus offset; missing markers resolve null', () => {
  const place = makePlace({ markers: { j: [{ x: 7, z: 4 }] } });
  assert.deepEqual(resolvePos({ marker: 'j' }, { place }), { x: 7, z: 4 });
  assert.deepEqual(resolvePos({ marker: 'j', dx: -1, dz: 2 }, { place }), { x: 6, z: 6 });
  assert.equal(resolvePos({ marker: 'Q' }, { place }), null);
});

test('{nearPlayer: 0} is the player cell; without a player it resolves null', () => {
  assert.deepEqual(resolvePos({ nearPlayer: 0 }, { place: makePlace(), playerAt: { x: 4, z: 4 } }), { x: 4, z: 4 });
  assert.equal(resolvePos({ nearPlayer: 3 }, { place: makePlace(), playerAt: null }), null);
});

test('{nearPlayer: n} lands on a free cell exactly n steps away when one exists', () => {
  const got = resolvePos({ nearPlayer: 3 }, { place: makePlace(), playerAt: { x: 4, z: 4 } });
  assert.ok(got, 'found a cell');
  assert.equal(Math.abs(got.x - 4) + Math.abs(got.z - 4), 3, 'manhattan distance is n');
});

test('{nearPlayer} skips blocked cells and falls inward until it finds floor', () => {
  // wall off the entire distance-2 ring around (4,4); distance 1 stays open
  const ring2 = [];
  for (let dx = -2; dx <= 2; dx++) {
    const dz = 2 - Math.abs(dx);
    ring2.push([4 + dx, 4 + dz]);
    if (dz) ring2.push([4 + dx, 4 - dz]);
  }
  const place = makePlace({ blocked: ring2 });
  const got = resolvePos({ nearPlayer: 2 }, { place, playerAt: { x: 4, z: 4 } });
  assert.ok(got, 'still found a cell');
  assert.equal(Math.abs(got.x - 4) + Math.abs(got.z - 4), 1, 'fell back to the open ring');
});

test('unknown specs resolve null instead of throwing (a broken beat must not crash a scene)', () => {
  assert.equal(resolvePos(undefined, { place: makePlace() }), null);
  assert.equal(resolvePos({ somewhere: true }, { place: makePlace() }), null);
  assert.equal(resolvePos(7, { place: makePlace() }), null);
});
