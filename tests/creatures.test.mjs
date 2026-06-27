// Structural validation of the unified creature roster (monkey, mimi + 8 pets).
// Like models.test.mjs this is pure-data only — no voxel.js / three import.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  CHARS, PETS, CREATURES, CREATURE_IDS, DEFAULT_CREATURE_ID,
  COMPANION_IDS, AVATAR_CREATURES, PET_CREATURES, getCreature,
} from '../src/models.js';

const HEX = /^#[0-9a-f]{6}$/i;
const isEmptyChar = (c) => c === '.' || c === ' ';

function validateModel(name, model, { maxHeight = 20, maxVoxels = 900 } = {}) {
  assert.ok(model && typeof model === 'object', `${name}: model is an object`);
  assert.ok(model.palette && typeof model.palette === 'object', `${name}: has palette`);
  for (const [ch, hex] of Object.entries(model.palette)) {
    assert.equal(ch.length, 1, `${name}: palette key '${ch}' is a single char`);
    assert.match(String(hex), HEX, `${name}: palette['${ch}'] is #rrggbb`);
  }
  assert.ok(Array.isArray(model.layers) && model.layers.length > 0, `${name}: layers non-empty`);
  assert.ok(model.layers.length <= maxHeight, `${name}: height <= ${maxHeight}`);
  let count = 0;
  const used = new Set();
  for (const layer of model.layers) {
    assert.ok(Array.isArray(layer) && layer.length <= 20, `${name}: layer depth <= 20`);
    for (const row of layer) {
      assert.equal(typeof row, 'string', `${name}: every row is a string`);
      assert.ok(row.length <= 20, `${name}: row width <= 20`);
      for (const c of row) { if (!isEmptyChar(c)) { used.add(c); count++; } }
    }
  }
  assert.ok(count > 0, `${name}: has at least one voxel`);
  assert.ok(count <= maxVoxels, `${name}: voxel count ${count} <= ${maxVoxels}`);
  for (const ch of used) assert.ok(ch in model.palette, `${name}: char '${ch}' in palette`);
  return used;
}

test('CREATURES: exactly the 10-creature roster, crab/crabKing excluded', () => {
  const expected = ['monkey', 'mimi', ...PETS.map((p) => p.id)];
  assert.equal(CREATURES.length, 10);
  assert.deepEqual(CREATURE_IDS, expected, 'roster is monkey, mimi, then the pets in order');
  assert.ok(!CREATURE_IDS.includes('crab'), 'crab is NOT a roster creature');
  assert.ok(!CREATURE_IDS.includes('crabKing'), 'crabKing is NOT a roster creature');
  // crab/crabKing remain narrative NPCs, untouched in CHARS.
  assert.deepEqual(Object.keys(CHARS).sort(), ['crab', 'crabKing', 'mimi', 'monkey'].sort());
});

test('CREATURES: monkey is the default; monkey & mimi are the companions', () => {
  assert.equal(DEFAULT_CREATURE_ID, 'monkey');
  assert.deepEqual(COMPANION_IDS, ['monkey', 'mimi']);
  assert.equal(getCreature('monkey').isDefault, true);
  for (const id of COMPANION_IDS) {
    const c = getCreature(id);
    assert.equal(c.companion, true, `${id} is a companion`);
    assert.equal(c.fur, true, `${id} keeps the F/f fur recolor contract`);
  }
  assert.equal(getCreature('monkey').hat, true, 'only the monkey wears hats');
});

test('CREATURES: every creature has a valid small AND full mesh, and they differ', () => {
  for (const c of CREATURES) {
    assert.equal(typeof c.id, 'string');
    assert.equal(c.nameKey, c.companion ? `pet.${c.id}` : `pet.${c.id}`);
    assert.equal(c.canBeAvatar, true, `${c.id} can be an avatar`);
    assert.equal(c.canBePet, true, `${c.id} can be a pet`);
    const small = validateModel(`${c.id}.small`, c.small);
    validateModel(`${c.id}.full`, c.full);
    assert.notDeepEqual(c.small.layers, c.full.layers, `${c.id}: small and full are distinct meshes`);
    // companions keep the recolor slots so FURS still tints a follower form
    if (c.fur) for (const slot of ['F', 'f']) assert.ok(small.has(slot), `${c.id} chibi uses '${slot}'`);
  }
});

test('CREATURES: pet entries mirror the PETS registry (no drift)', () => {
  const pets = CREATURES.filter((c) => !c.companion);
  assert.deepEqual(pets.map((c) => c.id), PETS.map((p) => p.id));
  for (const c of pets) {
    const pet = PETS.find((p) => p.id === c.id);
    assert.equal(c.nameKey, pet.nameKey);
    assert.equal(c.rarity, pet.rarity);
    assert.equal(c.small, pet.model, `${c.id} small === PETS model`);
  }
});

test('getCreature: falls back to the default for unknown / out-of-scope ids', () => {
  assert.equal(getCreature('bunny').id, 'bunny');
  assert.equal(getCreature('nope').id, DEFAULT_CREATURE_ID, 'unknown id -> monkey');
  assert.equal(getCreature('crab').id, DEFAULT_CREATURE_ID, 'crab is not roster -> monkey');
  assert.equal(getCreature(undefined).id, DEFAULT_CREATURE_ID);
});

test('CREATURES: avatar and pet role views cover the whole roster', () => {
  assert.equal(AVATAR_CREATURES.length, 10);
  assert.equal(PET_CREATURES.length, 10);
});
