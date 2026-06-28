import { test } from 'vitest';
import assert from 'node:assert/strict';
import { npcSteppable, NpcRoutine } from '../src/npc.js';
import { Rng } from '../src/rng.js';

// minimal place: a grid of plain floor with a few special cells.
function makePlace(over = {}) {
  const w = 7, d = 7;
  const cells = Array.from({ length: d }, () => Array.from({ length: w }, () => ({ h: 0, walk: true, ch: '.' })));
  const place = {
    size: { w, d },
    cellAt: (x, z) => (x < 0 || z < 0 || x >= w || z >= d) ? null : cells[z][x],
    worldPos: (x, z) => ({ x, y: 0, z, clone() { return { x, y: 0, z, lerpVectors() {} }; } }),
    npcs: [], entities: [], _reactors: [],
    addEntity(e) { this.entities.push(e); return e; },
    playerAt: () => null,
  };
  over.cells?.(cells);
  return place;
}

const home = { x: 3, z: 3 };

test('npcSteppable rejects off-floor, raised, occupied, out-of-radius, and the player cell', () => {
  const place = makePlace({ cells: (c) => { c[3][4].ch = 'A'; c[4][3].h = 1; } });
  assert.equal(npcSteppable(place, 3, 4, home, 1, null), false, 'altar marker (occupied) rejected');
  assert.equal(npcSteppable(place, 3, 4 + 0, home, 1, null), false);
  assert.equal(npcSteppable(place, 3, 4, home, 1, null), false);
  assert.equal(npcSteppable(place, 4, 3, home, 1, null), false, 'raised cell rejected');
  assert.equal(npcSteppable(place, 2, 3, home, 1, null), true, 'plain adjacent floor ok');
  assert.equal(npcSteppable(place, 2, 3, home, 1, { x: 2, z: 3 }), false, 'player cell rejected');
  assert.equal(npcSteppable(place, 0, 0, home, 1, null), false, 'out of radius rejected');
  assert.equal(npcSteppable(place, 3, 4, home, 1, null), false);
});

test("'limited' tier never commits a move (Low = today's bob in place)", () => {
  const place = makePlace();
  const mesh = { position: { x: 3, y: 0, z: 3, clone() { return { ...this }; }, lerpVectors() {} }, rotation: { y: 0 } };
  const r = new NpcRoutine(place, mesh, { home, anchor: home, playerAt: () => null, rng: new Rng(5), tier: 'limited', entry: { x: 3, z: 3 } });
  for (let i = 0; i < 500; i++) r.update(100);
  assert.equal(r.pos.x, 3, 'never left home x');
  assert.equal(r.pos.z, 3, 'never left home z');
  assert.equal(r.hop, null, 'never hops');
});

test("'full' tier eventually steps within its home radius, updating the npcs entry", () => {
  const place = makePlace();
  const entry = { id: 'fruitstand', x: 3, z: 3 };
  const mesh = { position: { x: 3, y: 0, z: 3, clone() { return { x: 3, y: 0, z: 3, lerpVectors() {} }; }, lerpVectors() {} }, rotation: { y: 0 } };
  const r = new NpcRoutine(place, mesh, { home, anchor: home, playerAt: () => null, rng: new Rng(7), tier: 'full', entry, radius: 1 });
  let moved = false;
  for (let i = 0; i < 4000 && !moved; i++) { r.update(100); if (r.pos.x !== 3 || r.pos.z !== 3) moved = true; }
  assert.ok(moved, 'a full-tier NPC takes a step');
  assert.ok(Math.abs(r.pos.x - 3) + Math.abs(r.pos.z - 3) <= 1, 'stays within its home radius');
  assert.equal(entry.x, r.pos.x, 'tap-to-talk entry kept in sync');
});

test('identical seed → identical step sequence (deterministic, no shared RNG)', () => {
  const run = () => {
    const place = makePlace();
    const mesh = { position: { x: 3, y: 0, z: 3, clone() { return { x: 3, y: 0, z: 3, lerpVectors() {} }; }, lerpVectors() {} }, rotation: { y: 0 } };
    const r = new NpcRoutine(place, mesh, { home, anchor: home, playerAt: () => null, rng: new Rng(42), tier: 'full', entry: { x: 3, z: 3 }, radius: 2 });
    const seq = [];
    for (let i = 0; i < 1500; i++) { r.update(100); seq.push(`${r.pos.x},${r.pos.z}`); }
    return seq.join('|');
  };
  assert.equal(run(), run(), 'same seed reproduces the same walk');
});
