import { test } from 'vitest';
import assert from 'node:assert/strict';
import { ambientExtras, AmbientLife, AMBIENT_CAPS } from '../src/ambient.js';
import { Rng } from '../src/rng.js';

test('low tier drops bees entirely and keeps glow tiny', () => {
  const low = ambientExtras({ mode: 'hub', tier: 'low', ambientScale: 0.35, portalStages: 8, avgPct: 0.5, garden: true });
  assert.equal(low.bees, 0, 'no bees on low');
  assert.ok(low.fireflies < AMBIENT_CAPS.fireflies, 'fireflies stay modest on low');
  assert.ok(low.motes <= AMBIENT_CAPS.motes);
});

test('high festival hub is the richest, but every count stays within its cap', () => {
  const hi = ambientExtras({ mode: 'hub', tier: 'high', ambientScale: 1, portalStages: 16, avgPct: 1, garden: true, festival: true });
  assert.ok(hi.fireflies > 0 && hi.bees > 0 && hi.motes > 0, 'all three new actors present');
  assert.ok(hi.fireflies <= AMBIENT_CAPS.fireflies);
  assert.ok(hi.bees <= AMBIENT_CAPS.bees);
  assert.ok(hi.motes <= AMBIENT_CAPS.motes);
  assert.ok(hi.water[0] > 0 && hi.water[1] > 0 && hi.water[2] > 0, 'water life participates on lively hubs');
  assert.ok(hi.water[0] <= AMBIENT_CAPS.water[0]);
  assert.ok(hi.water[1] <= AMBIENT_CAPS.water[1]);
  assert.ok(hi.water[2] <= AMBIENT_CAPS.water[2]);
});

test('chambers stay very sparse — the puzzle owns the screen', () => {
  const ch = ambientExtras({ mode: 'chamber', tier: 'high', ambientScale: 1 });
  assert.ok(ch.fireflies <= 4 && ch.motes <= 4, 'chamber glow is minimal');
  const chLow = ambientExtras({ mode: 'chamber', tier: 'low', ambientScale: 0.35 });
  assert.equal(chLow.bees, 0);
});

test('reducedMotion keeps bees calm/few', () => {
  const calm = ambientExtras({ mode: 'hub', tier: 'high', ambientScale: 1, garden: true, reducedMotion: true });
  assert.ok(calm.bees <= 2, 'bees reined in under reduced motion');
  assert.deepEqual(calm.water, [0, 0, 0], 'animated water moments are skipped under reduced motion');
});

test('counts scale monotonically with ambientScale', () => {
  const ctx = { mode: 'hub', tier: 'high', portalStages: 16, avgPct: 1, garden: true, festival: true };
  const med = ambientExtras({ ...ctx, ambientScale: 0.75 });
  const hi = ambientExtras({ ...ctx, ambientScale: 1 });
  assert.ok(hi.fireflies >= med.fireflies && hi.motes >= med.motes && hi.bees >= med.bees);
});

test('the resolver is pure: identical inputs → identical output', () => {
  const ctx = { mode: 'hub', tier: 'high', ambientScale: 1, portalStages: 10, avgPct: 0.6, garden: true };
  assert.deepEqual(ambientExtras(ctx), ambientExtras(ctx));
});

test('AmbientLife drives water moments from shoreline anchors', () => {
  const calls = [];
  const place = {
    size: { w: 5, d: 5 },
    group: { add() {} },
    markers: {},
    cellAt: (x, z) => (x < 0 || z < 0 || x >= 5 || z >= 5) ? null : { h: 0, walk: true, ch: '.' },
    worldPos: (x, z, lift = 0) => ({ x, y: lift, z }),
    water: {
      lifeAnchors: [
        { x: 0, z: 1, outX: -1, outZ: 0, kind: 'shore' },
        { x: 4, z: 3, outX: 1, outZ: 0, kind: 'shore' },
      ],
      spawnShoreRipple: () => calls.push('ripple'),
      spawnBubble: () => calls.push('bubble'),
      spawnFishShadow: () => calls.push('fish'),
    },
  };
  const life = new AmbientLife(place, new Rng(12), {
    water: [1, 1, 1],
  });
  life.update(5000);
  assert.ok(calls.includes('ripple'), 'shoreline ripples are scheduled');
  assert.ok(calls.includes('bubble'), 'bubbles are scheduled');
  assert.ok(calls.includes('fish'), 'fish shadows are scheduled');
});
