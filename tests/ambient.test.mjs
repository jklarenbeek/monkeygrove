import { test } from 'vitest';
import assert from 'node:assert/strict';
import { ambientExtras, AMBIENT_CAPS } from '../src/ambient.js';

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
