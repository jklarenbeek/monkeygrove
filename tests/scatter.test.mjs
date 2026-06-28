import { test } from 'vitest';
import assert from 'node:assert/strict';
import { TEMPLATES, parseLayout } from '../src/chamber.js';
import { eligibleScatterCells, planScatter, scatterTypes } from '../src/scatter.js';
import { OCCUPIED_MARKERS, FLOOR_CHARS } from '../src/config.js';
import { Rng } from '../src/rng.js';

const fetchRows = TEMPLATES.fetch[0];

function eligibleFor(rows) {
  const { w, d, cells } = parseLayout(rows);
  return { cells, w, d, eligible: eligibleScatterCells(cells, w, d) };
}

test('eligible scatter cells are plain, ground-level, walkable floor — never an interactable', () => {
  const { cells, eligible } = eligibleFor(fetchRows);
  assert.ok(eligible.length > 0, 'a fetch board has open floor to dress');
  for (const { x, z } of eligible) {
    const c = cells[z][x];
    assert.ok(FLOOR_CHARS.has(c.ch), `(${x},${z}) is plain floor`);
    assert.equal(c.h, 0, 'ground level only');
    assert.notEqual(c.walk, false, 'walkable');
    assert.ok(!OCCUPIED_MARKERS.has(c.ch), 'never an occupied/interactable cell');
  }
});

test('every eligible cell keeps a 1-tile clearance ring from any marker/raised tile', () => {
  const { cells, w, d, eligible } = eligibleFor(fetchRows);
  const at = (x, z) => (x < 0 || z < 0 || x >= w || z >= d) ? null : (cells[z]?.[x] || null);
  const plain = (c) => !!c && FLOOR_CHARS.has(c.ch) && c.h === 0;
  for (const { x, z } of eligible) {
    for (let dz = -1; dz <= 1; dz++) {
      for (let dx = -1; dx <= 1; dx++) {
        const n = at(x + dx, z + dz);
        assert.ok(n === null || plain(n), `clearance: neighbour of (${x},${z}) is plain or water`);
      }
    }
  }
});

test('scatter is deterministic: same seed → identical plan', () => {
  const { eligible } = eligibleFor(fetchRows);
  const types = scatterTypes('garden');
  const a = planScatter(eligible, types, new Rng(4242), 2);
  const b = planScatter(eligible, types, new Rng(4242), 2);
  assert.deepEqual(a, b, 'identical seed reproduces the exact field');
  const c = planScatter(eligible, types, new Rng(9999), 2);
  assert.notDeepEqual(a, c, 'a different seed gives a different field');
});

test('density multiplier scales the field monotonically (more density → more props)', () => {
  const { eligible } = eligibleFor(fetchRows);
  const types = scatterTypes('garden');
  const low = planScatter(eligible, types, new Rng(7), 1).length;
  const high = planScatter(eligible, types, new Rng(7), 2).length;
  assert.ok(high >= low, `mult 2 (${high}) places at least as many as mult 1 (${low})`);
});

test('planScatter never references a non-eligible cell and never mutates the grid', () => {
  const { cells, eligible } = eligibleFor(fetchRows);
  const before = JSON.stringify(cells);
  const set = new Set(eligible.map((c) => `${c.x},${c.z}`));
  const plan = planScatter(eligible, scatterTypes('tide'), new Rng(1), 2);
  for (const p of plan) assert.ok(set.has(`${p.x},${p.z}`), `placement (${p.x},${p.z}) is an eligible cell`);
  assert.equal(JSON.stringify(cells), before, 'planning is pure — the grid is untouched (walkability safe)');
});
