// Perception-first tap picking. Children tap the THING they see — the altar's
// golden body, a stone's floating number, a friend — and under the fixed iso
// camera a ray through a tall object's upper half lands on the floor tile
// visually BEHIND it. These tests fence the fix in three layers:
//   1. pickCellFromHit resolves a hit on any registered interactable (or a
//      child mesh of it) to the cell the interactable STANDS ON, marked
//      target:true so pickCell trusts it over the forgiveness heuristics;
//   2. Place.registerPickable stamps that contract onto meshes (static cells,
//      live-cell functions for wanderers) and unregister/transfer keep the
//      world's pickable list honest as meshes are smashed or swapped;
//   3. World.magnetPick snaps a near-miss tap to the closest interactable
//      within its fingertip radius, so "almost the altar" never reads as
//      "walk behind the altar".
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { pickCellFromHit } from '../src/input.js';
import { World } from '../src/world.js';
import { Place } from '../src/chamber/index.js';

const registerOn = (world) => (obj, cell, opts) =>
  Place.prototype.registerPickable.call({ world }, obj, cell, opts);

// ---------- pickCellFromHit ----------

test('a hit on a child mesh of a registered interactable resolves to its cell, flagged target', () => {
  const group = { userData: { pickCell: { x: 4, z: 7 } }, parent: null };
  const child = { userData: {}, parent: group };
  const cell = pickCellFromHit({ object: child }, {});
  assert.deepEqual(cell, { x: 4, z: 7, target: true });
});

test('a live-cell registration (wandering Mimi) resolves to the CURRENT cell', () => {
  const pos = { x: 2, z: 3 };
  const mesh = { userData: { pickCell: () => pos }, parent: null };
  assert.deepEqual(pickCellFromHit({ object: mesh }, {}), { x: 2, z: 3, target: true });
  pos.x = 5; // she hopped
  assert.deepEqual(pickCellFromHit({ object: mesh }, {}), { x: 5, z: 3, target: true });
});

test('floor instances still resolve through gridList by instanceId (no target flag)', () => {
  const floor = { userData: { gridList: [{ x: 1, z: 1 }, { x: 8, z: 2 }] }, parent: null };
  const cell = pickCellFromHit({ object: floor, instanceId: 1 }, {});
  assert.deepEqual(cell, { x: 8, z: 2 });
});

test('unregistered hits fall back to deriving the cell from the hit point', () => {
  const place = {
    size: { w: 10, d: 10 },
    cellAt: (x, z) => (x >= 0 && z >= 0 && x < 10 && z < 10 ? {} : null),
  };
  const bare = { userData: {}, parent: null };
  const cell = pickCellFromHit({ object: bare, point: { x: 1.4, z: -0.6 } }, place);
  assert.deepEqual(cell, { x: 6, z: 4 });
});

// ---------- Place registry ----------

test('registerPickable stamps the tap contract and joins the pickable list', () => {
  const world = { pickables: [] };
  const obj = { userData: {} };
  registerOn(world)(obj, { x: 3, z: 9 }, { anchorY: 0.7, magnet: 32 });
  assert.equal(world.pickables[0], obj);
  assert.deepEqual(obj.userData.pickCell, { x: 3, z: 9 });
  assert.equal(obj.userData.pickMagnet, 32);
  assert.equal(obj.userData.pickAnchorY, 0.7);
});

test('unregisterPickable removes exactly that mesh (a smashed pot stops catching taps)', () => {
  const world = { pickables: [] };
  const a = { userData: {} }, b = { userData: {} };
  registerOn(world)(a, { x: 0, z: 0 });
  registerOn(world)(b, { x: 1, z: 1 });
  Place.prototype.unregisterPickable.call({ world }, a);
  assert.deepEqual(world.pickables, [b]);
  // removing something never registered is harmless
  Place.prototype.unregisterPickable.call({ world }, a);
  assert.deepEqual(world.pickables, [b]);
});

test('transferPickable moves a registration onto a swapped label sprite', () => {
  const world = { pickables: [] };
  const host = Object.create(Place.prototype);
  host.world = world;
  const old = { userData: {} }, next = { userData: {} };
  registerOn(world)(old, { x: 5, z: 5 }, { magnet: 0 });
  Place.prototype.transferPickable.call(host, old, next);
  assert.deepEqual(world.pickables, [next]);
  assert.deepEqual(next.userData.pickCell, { x: 5, z: 5 });
  assert.equal(next.userData.pickMagnet, 0);
});

// ---------- World.magnetPick ----------

// A magnet-test world: screenPos maps world x/z straight to pixels so the
// geometry is easy to reason about; anchors carry their own world position.
const magnetWorld = (objects) => ({
  pickables: objects,
  screenPos: (v) => ({ x: v.x * 100, y: v.z * 100 }),
});
const anchorAt = (x, z, cell, opts = {}) => ({
  visible: true,
  parent: {},
  userData: {
    pickCell: cell ?? { x: Math.round(x), z: Math.round(z) },
    pickMagnet: opts.magnet ?? 26,
    pickAnchorY: 0,
    ...opts.userData,
  },
  getWorldPosition: (v) => { v.set(x, 0, z); return v; },
});

test('a tap within the fingertip radius snaps to the interactable, outside it does not', () => {
  const w = magnetWorld([anchorAt(2, 3, { x: 2, z: 3 })]);
  // 20px away → claimed; 40px away → plain floor keeps the tap
  assert.deepEqual(World.prototype.magnetPick.call(w, 220, 300), { x: 2, z: 3 });
  assert.equal(World.prototype.magnetPick.call(w, 240, 300), null);
});

test('the nearest anchor wins when two interactables are both in reach', () => {
  const near = anchorAt(2, 3, { x: 2, z: 3 });
  const far = anchorAt(2.2, 3, { x: 9, z: 9 });
  const w = magnetWorld([far, near]);
  assert.deepEqual(World.prototype.magnetPick.call(w, 202, 300), { x: 2, z: 3 });
});

test('magnet 0 opts a mesh out and detached meshes never attract taps', () => {
  const silent = anchorAt(2, 3, { x: 2, z: 3 }, { magnet: 0 });
  const detached = { ...anchorAt(2, 3, { x: 2, z: 3 }), parent: null };
  const w = magnetWorld([silent, detached]);
  assert.equal(World.prototype.magnetPick.call(w, 200, 300), null);
});

test('live-cell anchors resolve their cell at tap time', () => {
  const pos = { x: 1, z: 1 };
  const w = magnetWorld([anchorAt(2, 3, () => pos)]);
  pos.x = 7;
  assert.deepEqual(World.prototype.magnetPick.call(w, 200, 300), { x: 7, z: 1 });
});
