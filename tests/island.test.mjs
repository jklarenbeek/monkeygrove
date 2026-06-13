// Island restoration: blueprint gating (mastery unlocks, bananas pay),
// hub plot integrity, bridge walkability, perks, and announce-once logic.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  BUILDS, buildById, freshIsland, progressPoints, buildState, islandStatus,
  newBlueprints, markSeen, canFund, fund, playerCost, grantDailyPerks,
  applyIslandRows,
} from '../src/island.js';
import { TEMPLATES, parseLayout } from '../src/chamber.js';

const HUB = TEMPLATES.hub[0];

// Fake masteryReport with a given total of progress points (0..4).
function report(pts) {
  const each = pts / 4;
  return {
    worlds: {
      tide: { pct: each }, garden: { pct: each },
      stump: { pct: each }, vines: { pct: each },
    },
  };
}

function profile({ bananas = 0, built = [] } = {}) {
  return { bananas, island: { ...freshIsland(), built: [...built] }, flags: {} };
}

test('every build has a unique id and exactly one plot in the hub template', () => {
  const ids = new Set();
  for (const b of BUILDS) {
    assert.ok(!ids.has(b.id), `duplicate id ${b.id}`);
    ids.add(b.id);
    const count = HUB.join('').split(b.char).length - 1;
    assert.equal(count, 1, `plot '${b.char}' (${b.id}) must appear exactly once`);
    assert.equal(buildById(b.id), b);
  }
});

test('blueprint thresholds ascend and stay reachable (< 4.0 total points)', () => {
  let prev = -1;
  for (const b of BUILDS) {
    assert.ok(b.points > prev, `${b.id} threshold must ascend`);
    assert.ok(b.points < 4, `${b.id} threshold must be reachable`);
    prev = b.points;
    assert.ok(playerCost(b) > 0 && playerCost(b) <= b.cost);
  }
  assert.equal(progressPoints(report(2.0)).toFixed(2), '2.00');
});

test('bridge gap is open water before the bridge, plank tiles after', () => {
  const before = applyIslandRows(HUB, []);
  const after = applyIslandRows(HUB, ['bridge']);
  assert.ok(!before.join('').includes('w') && !after.join('').includes('w'));
  assert.ok(!before.join('').includes('V'));
  const planks = after.join('').split('V').length - 1;
  assert.ok(planks >= 2, 'bridge needs at least 2 plank tiles');
});

function reachable(rows) {
  const { cells, markers, w, d } = parseLayout(rows);
  const start = markers.P[0];
  const seen = new Set([start.x + ',' + start.z]);
  const queue = [start];
  while (queue.length) {
    const { x, z } = queue.shift();
    const from = cells[z][x];
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, nz = z + dz;
      if (nx < 0 || nz < 0 || nx >= w || nz >= d || seen.has(nx + ',' + nz)) continue;
      const to = cells[nz][nx];
      if (!to || to.walk === false || Math.abs(to.h - from.h) > 1) continue;
      seen.add(nx + ',' + nz);
      queue.push({ x: nx, z: nz });
    }
  }
  return seen;
}

test('the festival islet is unreachable until the bridge is built', () => {
  const plaza = parseLayout(HUB).markers.j[0];
  const without = reachable(applyIslandRows(HUB, []));
  const withBridge = reachable(applyIslandRows(HUB, ['bridge']));
  assert.ok(!without.has(plaza.x + ',' + plaza.z), 'plaza must be cut off pre-bridge');
  assert.ok(withBridge.has(plaza.x + ',' + plaza.z), 'bridge must open the islet');
});

test('mastery unlocks the blueprint; bananas pay the materials', () => {
  const lanterns = buildById('lanterns');
  const poor = profile({ bananas: 0 });
  assert.equal(buildState(poor, lanterns, report(0)), 'locked');
  assert.equal(buildState(poor, lanterns, report(0.3)), 'unlocked');
  assert.ok(!canFund(poor, lanterns, report(0.3)), 'no bananas, no build');
  // a rich profile still cannot buy a locked blueprint (no farming the story)
  const rich = profile({ bananas: 9999 });
  assert.ok(!fund(rich, lanterns, report(0)));
  assert.equal(rich.bananas, 9999);
  // unlocked + funded: bananas drop, build lands
  assert.ok(fund(rich, lanterns, report(0.3)));
  assert.equal(rich.bananas, 9999 - lanterns.cost);
  assert.equal(buildState(rich, lanterns, report(0.3)), 'built');
});

test('the plaza needs the bridge and the Crab King pays half', () => {
  const plaza = buildById('plaza');
  assert.equal(playerCost(plaza), plaza.cost - plaza.contribution);
  assert.equal(playerCost(plaza) * 2, plaza.cost, 'half from the hoard');
  const p = profile({ bananas: 1000 });
  assert.equal(buildState(p, plaza, report(3.9)), 'locked', 'no bridge yet');
  p.island.built.push('bridge');
  assert.equal(buildState(p, plaza, report(3.9)), 'unlocked');
  assert.ok(fund(p, plaza, report(3.9)));
  assert.equal(p.bananas, 1000 - playerCost(plaza));
});

test('choices sequence, never exclude: all builds stay available', () => {
  const p = profile({ bananas: 100000 });
  const r = report(3.9);
  // fund in definition order — everything is eventually buildable
  for (const b of BUILDS) assert.ok(fund(p, b, r), `${b.id} must be fundable`);
  assert.equal(islandStatus(p, r).filter((b) => b.state === 'built').length, BUILDS.length);
});

test('new blueprints are announced exactly once', () => {
  const p = profile();
  const r = report(0.8); // lanterns + fruitstand visible
  const fresh = newBlueprints(p, r);
  assert.deepEqual(fresh.map((b) => b.id), ['lanterns', 'fruitstand']);
  markSeen(p, fresh.map((b) => b.id));
  assert.equal(newBlueprints(p, r).length, 0);
  // more progress reveals more, again only once
  assert.deepEqual(newBlueprints(p, report(1.3)).map((b) => b.id), ['garden']);
});

test('daily perks come only from finished builds, once per day', () => {
  const p = profile({ built: ['lanterns', 'fruitstand'] });
  const day1 = grantDailyPerks(p, '2026-06-12');
  assert.deepEqual(day1, [{ id: 'fruitstand', kind: 'bananas', n: 8 }]);
  assert.equal(grantDailyPerks(p, '2026-06-12').length, 0, 'same day grants nothing');
  p.island.built.push('bakery');
  const day2 = grantDailyPerks(p, '2026-06-13');
  assert.deepEqual(day2.map((x) => x.kind).sort(), ['bananas', 'egg']);
});

test('old saves heal: ensureIsland is additive via islandStatus', () => {
  const legacy = { bananas: 50, flags: {} }; // pre-island profile
  const status = islandStatus(legacy, report(0));
  assert.equal(status.length, BUILDS.length);
  assert.ok(Array.isArray(legacy.island.built));
});
