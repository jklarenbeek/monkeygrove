import { test } from 'vitest';
import assert from 'node:assert/strict';
import { resolveGfx, GFX, GRAPHICS_SETTINGS, detectDeviceTier, ambientMotionScale } from '../src/gfx.js';

// Phase 0 guarantee: the `low` tier reproduces today's renderer (shadows were on only
// at high QUALITY). Phase 2 then raised the high-tier shadow map 1024 → 2048 and added
// always-on contact shadows. So the tier→map mapping is now low 0 / medium 1024 /
// high 2048, and contactShadows is true at every tier.

test('low tier reproduces today: no shadows', () => {
  const low = resolveGfx({ tier: 'low', setting: 'auto', reducedMotion: false });
  assert.equal(low.tier, 'low');
  assert.equal(low.shadows, false);
  assert.equal(low.shadowMapSize, 0);
});

test('shadow map size maps low→0 / medium→1024 / high→2048 (Phase 2)', () => {
  assert.equal(resolveGfx({ tier: 'high', setting: 'low' }).shadowMapSize, 0);
  assert.equal(resolveGfx({ tier: 'high', setting: 'medium' }).shadowMapSize, 1024);
  assert.equal(resolveGfx({ tier: 'high', setting: 'high' }).shadowMapSize, 2048);
  const high = resolveGfx({ tier: 'high', setting: 'auto', reducedMotion: false });
  assert.equal(high.shadows, true);
  assert.equal(high.shadowMapSize, 2048);
});

test('contact (blob) shadows are ON at every tier — grounding low-end devices rely on', () => {
  for (const setting of ['low', 'medium', 'high', 'auto']) {
    assert.equal(resolveGfx({ tier: 'low', setting }).contactShadows, true, `${setting} keeps contact shadows`);
    assert.equal(resolveGfx({ tier: 'high', setting }).contactShadows, true, `${setting} keeps contact shadows`);
  }
});

test("'auto' setting follows the detected device tier", () => {
  assert.equal(resolveGfx({ tier: 'low', setting: 'auto' }).tier, 'low');
  assert.equal(resolveGfx({ tier: 'high', setting: 'auto' }).tier, 'high');
});

test('an explicit setting overrides the device tier', () => {
  // low device, but the player asked for high → high flags
  assert.equal(resolveGfx({ tier: 'low', setting: 'high' }).tier, 'high');
  assert.equal(resolveGfx({ tier: 'low', setting: 'high' }).shadows, true);
  // high device, but the player asked for low → today's renderer
  assert.equal(resolveGfx({ tier: 'high', setting: 'low' }).tier, 'low');
  assert.equal(resolveGfx({ tier: 'high', setting: 'low' }).shadows, false);
});

test('truth table: every (tier × setting) yields a valid, complete flag set', () => {
  const tiers = ['low', 'high'];
  const keys = ['tier', 'shadows', 'shadowMapSize', 'toneMap', 'fog', 'bloom',
    'glowSprites', 'water', 'decorDensity', 'ambientScale', 'npcRoutines',
    'cameraMoments', 'reducedMotion'];
  for (const tier of tiers) {
    for (const setting of GRAPHICS_SETTINGS) {
      const g = resolveGfx({ tier, setting, reducedMotion: false });
      for (const k of keys) assert.ok(k in g, `${tier}/${setting} has ${k}`);
      const effective = setting === 'auto' ? tier : setting;
      assert.equal(g.tier, effective, `${tier}/${setting} resolves to ${effective}`);
    }
  }
});

test('reducedMotion folds motion-heavy flags down but leaves static look intact', () => {
  const calm = resolveGfx({ tier: 'high', setting: 'high', reducedMotion: true });
  // motion is reined in
  assert.equal(calm.reducedMotion, true);
  assert.ok(calm.ambientScale <= 0.35, 'ambient critters/sway budget is reduced');
  assert.equal(calm.dof, false, 'no depth-of-field motion');
  assert.equal(calm.cameraMoments, 'minimal', 'no camera swoops');
  assert.equal(calm.water, 'flat', 'no animated water');
  assert.equal(calm.npcRoutines, 'limited', 'NPC routines are calmed, not killed');
  // but the static, non-moving prettiness is untouched
  const lively = resolveGfx({ tier: 'high', setting: 'high', reducedMotion: false });
  assert.equal(calm.bloom, lively.bloom, 'static bloom is not disabled by reduce-motion');
  assert.equal(calm.fog, lively.fog, 'static fog is not disabled by reduce-motion');
  assert.equal(calm.toneMap, lively.toneMap, 'tone mapping is not disabled by reduce-motion');
});

test('Phase 9/10 contract: only High enables the bloom/DoF composer path', () => {
  // Low/Medium MUST stay on the plain renderer.render() path (bloom false), so the
  // postprocessing chunk is never even loaded; High turns on selective bloom (half-res)
  // and depth-of-field. perspectiveHub is a real boolean flag on every tier (default
  // off — a feature-flagged opt-in per the rollout plan).
  const low = resolveGfx({ tier: 'high', setting: 'low' });
  const medium = resolveGfx({ tier: 'high', setting: 'medium' });
  const high = resolveGfx({ tier: 'high', setting: 'high' });

  assert.equal(low.bloom, false, 'low: direct render, no composer');
  assert.equal(medium.bloom, false, 'medium: direct render, no composer');
  assert.equal(high.bloom, true, 'high: selective bloom on');
  assert.equal(high.bloomHalfRes, true, 'high blooms at half-res for fill-rate');
  assert.equal(high.dof, true, 'high can depth-of-field the perspective hub');

  for (const g of [low, medium, high]) {
    assert.equal(typeof g.perspectiveHub, 'boolean', 'perspectiveHub is always a boolean flag');
  }
});

test('ambient motion scale keeps low tier decor and wind fully static', () => {
  const low = resolveGfx({ tier: 'high', setting: 'low', reducedMotion: false });
  const high = resolveGfx({ tier: 'high', setting: 'high', reducedMotion: false });

  assert.equal(low.ambientScale, 0.35, 'low still has a sparse ambient-life budget');
  assert.equal(ambientMotionScale(low, false), 0, 'low disables decorative sway/wind');
  assert.equal(ambientMotionScale(high, true), 0, 'reduced motion disables decorative sway/wind');
  assert.equal(ambientMotionScale(high, false), high.ambientScale, 'high keeps its motion budget');
});

test('the resolved object is frozen so a stray write cannot drift the tier', () => {
  const g = resolveGfx({ tier: 'high', setting: 'auto' });
  assert.throws(() => { 'use strict'; g.shadows = false; });
});

test('the live GFX export is a resolved, frozen flags object', () => {
  assert.ok(GFX && typeof GFX === 'object');
  assert.ok(Object.isFrozen(GFX));
  assert.ok(['low', 'medium', 'high'].includes(GFX.tier));
  // in the node test environment there is no window → detected tier is high
  assert.equal(detectDeviceTier(), 'high');
});

test('GRAPHICS_SETTINGS is the four-option set the UI offers', () => {
  assert.deepEqual(GRAPHICS_SETTINGS, ['auto', 'low', 'medium', 'high']);
});
