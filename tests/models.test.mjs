// Structural validation of the voxel model data. Deliberately does NOT import
// voxel.js or three — models.js must be consumable as pure data.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  CHARS, MONKEY_HAT_Y, PETS, HATS, FURS, TRAILS, PROPS, AMBIENT,
} from '../src/models.js';

const HEX = /^#[0-9a-f]{6}$/i;

function isEmptyChar(c) {
  return c === '.' || c === ' ';
}

function stats(model) {
  let count = 0;
  let maxX = 0;
  let maxZ = 0;
  const used = new Set();
  for (const layer of model.layers) {
    for (let z = 0; z < layer.length; z++) {
      const row = layer[z];
      for (let x = 0; x < row.length; x++) {
        const c = row[x];
        if (isEmptyChar(c)) continue;
        used.add(c);
        count++;
        if (x + 1 > maxX) maxX = x + 1;
        if (z + 1 > maxZ) maxZ = z + 1;
      }
    }
  }
  return { count, sizeX: maxX, sizeZ: maxZ, sizeY: model.layers.length, used };
}

function validateModel(name, model, { maxHeight = 20, maxVoxels = 600 } = {}) {
  assert.ok(model && typeof model === 'object', `${name}: model is an object`);

  assert.ok(model.palette && typeof model.palette === 'object', `${name}: has palette`);
  const entries = Object.entries(model.palette);
  assert.ok(entries.length > 0, `${name}: palette non-empty`);
  for (const [ch, hex] of entries) {
    assert.equal(ch.length, 1, `${name}: palette key '${ch}' is a single char`);
    assert.match(String(hex), HEX, `${name}: palette['${ch}'] = '${hex}' is #rrggbb`);
  }

  assert.ok(Array.isArray(model.layers) && model.layers.length > 0, `${name}: layers non-empty array`);
  for (const layer of model.layers) {
    assert.ok(Array.isArray(layer), `${name}: every layer is an array`);
    assert.ok(layer.length <= 20, `${name}: layer depth <= 20 rows`);
    for (const row of layer) {
      assert.equal(typeof row, 'string', `${name}: every row is a string`);
      assert.ok(row.length <= 20, `${name}: row width <= 20`);
    }
  }

  const s = stats(model);
  assert.ok(s.count > 0, `${name}: has at least one voxel`);
  assert.ok(s.sizeY <= maxHeight, `${name}: height ${s.sizeY} <= ${maxHeight}`);
  assert.ok(s.count <= maxVoxels, `${name}: voxel count ${s.count} <= ${maxVoxels}`);
  for (const ch of s.used) {
    assert.ok(ch in model.palette, `${name}: char '${ch}' used in layers exists in palette`);
  }
  return s;
}

test('CHARS: all four characters are valid models', () => {
  const expected = ['monkey', 'mimi', 'crab', 'crabKing'];
  assert.deepEqual(Object.keys(CHARS).sort(), [...expected].sort());
  for (const key of expected) {
    validateModel(`CHARS.${key}`, CHARS[key], { maxVoxels: 900 });
  }
});

test('monkey: palette slots, eye voxels, hat anchor', () => {
  const { monkey } = CHARS;
  const s = validateModel('monkey', monkey, { maxVoxels: 900 });

  for (const slot of ['F', 'f', 'S', 'E', 'W', 'N']) {
    assert.ok(slot in monkey.palette, `monkey palette has slot '${slot}'`);
  }
  for (const slot of ['F', 'f', 'S', 'E', 'W']) {
    assert.ok(s.used.has(slot), `monkey layers use slot '${slot}'`);
  }

  let eyeCount = 0;
  let glintCount = 0;
  for (const layer of monkey.layers) {
    for (const row of layer) {
      for (const c of row) {
        if (c === 'E') eyeCount++;
        if (c === 'W') glintCount++;
      }
    }
  }
  assert.ok(eyeCount >= 2, `monkey has >= 2 eye voxels (got ${eyeCount})`);
  assert.ok(glintCount >= 1, `monkey has >= 1 glint voxel (got ${glintCount})`);

  assert.ok(Number.isInteger(MONKEY_HAT_Y), 'MONKEY_HAT_Y is an integer');
  assert.ok(MONKEY_HAT_Y > 0 && MONKEY_HAT_Y < monkey.layers.length,
    `MONKEY_HAT_Y (${MONKEY_HAT_Y}) within monkey height (${monkey.layers.length})`);
});

test('PETS: 8 pets, unique ids, valid rarities, valid models', () => {
  assert.equal(PETS.length, 8);
  const rarities = new Set(['common', 'rare', 'epic', 'legendary']);
  const ids = new Set();
  for (const pet of PETS) {
    assert.equal(typeof pet.id, 'string');
    assert.ok(!ids.has(pet.id), `pet id '${pet.id}' is unique`);
    ids.add(pet.id);
    assert.equal(pet.nameKey, `pet.${pet.id}`);
    assert.ok(rarities.has(pet.rarity), `pet '${pet.id}' rarity '${pet.rarity}' valid`);
    validateModel(`pet.${pet.id}`, pet.model, { maxVoxels: 900 });
  }
});

test('HATS: 8 hats with numeric prices and offsets', () => {
  assert.equal(HATS.length, 8);
  const ids = new Set();
  for (const hat of HATS) {
    assert.equal(typeof hat.id, 'string');
    assert.ok(!ids.has(hat.id), `hat id '${hat.id}' is unique`);
    ids.add(hat.id);
    assert.equal(hat.nameKey, `hat.${hat.id}`);
    assert.equal(typeof hat.price, 'number');
    assert.ok(hat.price >= 25 && hat.price <= 300, `hat '${hat.id}' price in 25..300`);
    assert.ok(Number.isInteger(hat.dy), `hat '${hat.id}' dy is an integer`);
    validateModel(`hat.${hat.id}`, hat.model);
  }
});

test('FURS: 8 recolors, default first and free', () => {
  assert.equal(FURS.length, 8);
  assert.equal(FURS[0].price, 0, 'first fur (default) is free');
  const ids = new Set();
  for (const fur of FURS) {
    assert.ok(!ids.has(fur.id), `fur id '${fur.id}' is unique`);
    ids.add(fur.id);
    assert.equal(fur.nameKey, `fur.${fur.id}`);
    assert.equal(typeof fur.price, 'number');
    assert.match(fur.palette.F, HEX, `fur '${fur.id}' F is hex`);
    assert.match(fur.palette.f, HEX, `fur '${fur.id}' f is hex`);
  }
});

test('TRAILS: 4 trails with hex colors', () => {
  assert.equal(TRAILS.length, 4);
  for (const trail of TRAILS) {
    assert.equal(typeof trail.id, 'string');
    assert.equal(trail.nameKey, `trail.${trail.id}`);
    assert.equal(typeof trail.price, 'number');
    assert.match(trail.color, HEX, `trail '${trail.id}' color is hex`);
  }
});

test('PROPS: full contract key set, all valid models', () => {
  const required = [
    'palm', 'palmSmall', 'bush', 'flowerPink', 'flowerYellow', 'flowerBlue',
    'pot', 'stone', 'altar', 'chestBase', 'chestLid', 'egg', 'basket',
    'coconut', 'bananas', 'stump', 'gong', 'plank', 'portal', 'sign',
    'rockA', 'rockB', 'lantern', 'shell', 'sprout', 'berry',
    'portalVine1', 'portalVine2', 'portalVine3',
  ];
  for (const key of required) {
    assert.ok(key in PROPS, `PROPS.${key} exists`);
    const limits = key === 'palm'
      ? { maxHeight: 24, maxVoxels: 900 }
      : { maxHeight: 20, maxVoxels: 600 };
    validateModel(`props.${key}`, PROPS[key], limits);
  }
});

test('PROPS: business bakery and pizzeria props exist and validate', () => {
  const required = [
    'counter', 'prepBoard', 'pizzaPan', 'doughBowl', 'toppingCrate',
    'coinTray', 'orderBoard', 'shopTable',
  ];
  for (const key of required) {
    assert.ok(key in PROPS, `PROPS.${key} exists`);
    validateModel(`props.${key}`, PROPS[key], { maxHeight: 20, maxVoxels: 700 });
  }
});

test('berry is the tiny 2-voxel remainder berry', () => {
  assert.equal(stats(PROPS.berry).count, 2);
});

test('portal vine overlays keep the living-gate registration contract', () => {
  const stages = ['portalVine1', 'portalVine2', 'portalVine3'];
  // All stages share the arch's center: 11 wide (x0/x10 hug the pillars'
  // outsides) and 4 deep (z3 floats in front of the arch face).
  for (const key of stages) {
    const s = stats(PROPS[key]);
    assert.equal(s.sizeX, 11, `${key} is 11 wide`);
    assert.equal(s.sizeZ, 4, `${key} is 4 deep`);
    assert.ok(s.used.has('v') && s.used.has('L'), `${key} uses vine + leaf slots`);
  }
  // flowers (the per-world recolor slot) arrive at stage 2
  assert.ok(!stats(PROPS.portalVine1).used.has('F'), 'stage 1 has no flowers yet');
  assert.ok(stats(PROPS.portalVine2).used.has('F'), 'stage 2 buds');
  assert.ok(stats(PROPS.portalVine3).used.has('F'), 'stage 3 blooms');
  // growth is visible: each stage adds voxels, and full bloom crests the arch
  const counts = stages.map((k) => stats(PROPS[k]).count);
  assert.ok(counts[0] < counts[1] && counts[1] < counts[2], `counts grow: ${counts}`);
  assert.ok(PROPS.portalVine3.layers.length > PROPS.portal.layers.length,
    'full bloom rises above the arch');
});

test('portal vine overlays never intersect the arch stone or film', () => {
  // overlay (x, y, z) maps onto arch (x - 1, y, z - 1)
  const archAt = (x, y, z) => {
    const row = (PROPS.portal.layers[y] || [])[z];
    return !!row && !isEmptyChar(row[x] || '.');
  };
  for (const key of ['portalVine1', 'portalVine2', 'portalVine3']) {
    PROPS[key].layers.forEach((layer, y) => {
      layer.forEach((row, z) => {
        for (let x = 0; x < row.length; x++) {
          if (isEmptyChar(row[x])) continue;
          assert.ok(!archAt(x - 1, y, z - 1),
            `${key} voxel at x${x} y${y} z${z} collides with the arch`);
        }
      });
    });
  }
});

test('AMBIENT: bird & butterfly flap frames are valid tiny models', () => {
  const expected = ['birdSpread', 'birdFold', 'butterflyOpen', 'butterflyClosed'];
  assert.deepEqual(Object.keys(AMBIENT).sort(), [...expected].sort());
  for (const key of expected) {
    validateModel(`ambient.${key}`, AMBIENT[key], { maxVoxels: 120 });
  }
  // the frame pairs must actually differ, or the flap is invisible
  assert.notDeepEqual(AMBIENT.birdSpread.layers, AMBIENT.birdFold.layers);
  assert.notDeepEqual(AMBIENT.butterflyOpen.layers, AMBIENT.butterflyClosed.layers);
  // recolor contract: B/b on birds, W on butterflies (ambient.js withPalette)
  for (const k of ['birdSpread', 'birdFold']) {
    assert.ok('B' in AMBIENT[k].palette && 'b' in AMBIENT[k].palette, `${k} has B/b slots`);
  }
  for (const k of ['butterflyOpen', 'butterflyClosed']) {
    assert.ok('W' in AMBIENT[k].palette, `${k} has a W wing slot`);
  }
});

test('number stone front (+Z) face is flat and blank for the number sprite', () => {
  const { layers } = PROPS.stone;
  // Front face: each occupied layer's last row must be solid (no holes between
  // first and last voxel) so the sprite overlays a clean surface.
  let frontZ = 0;
  for (const layer of layers) frontZ = Math.max(frontZ, layer.length - 1);
  for (let y = 1; y < layers.length - 1; y++) {
    const row = layers[y][frontZ];
    assert.ok(row && !isEmptyChar(row[1]), `stone mid layer ${y} reaches the front plane`);
  }
});
