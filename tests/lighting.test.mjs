import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as THREE from 'three';
import { makeSky, SKY_TOP, SKY_HORIZON } from '../src/sky.js';
import { resolveGfx, GFX_TUNING } from '../src/gfx.js';

const read = (p) => readFileSync(new URL(`../src/${p}`, import.meta.url), 'utf8');

// --- sky dome --------------------------------------------------------------
test('the skydome is a shared, backdrop-only gradient mesh (no asset, no haze on itself)', () => {
  const sky = makeSky();
  assert.ok(sky.isMesh, 'returns a Mesh');
  assert.equal(sky.name, 'skydome');
  assert.equal(sky.material.side, THREE.BackSide, 'seen from the inside');
  assert.equal(sky.material.fog, false, 'the dome itself is never fogged');
  assert.equal(sky.material.vertexColors, true, 'gradient is baked into vertex colors');
  assert.equal(sky.material.depthWrite, false, 'never occludes the scene');
  assert.equal(sky.renderOrder, -1, 'drawn behind everything');
  assert.equal(sky.frustumCulled, false, 'always present around the camera');
  const col = sky.geometry.getAttribute('color');
  assert.ok(col, 'has a color attribute');
  assert.equal(col.count, sky.geometry.getAttribute('position').count, 'a color per vertex');
});

test('the sky gradient runs horizon → top (bright, not dark)', () => {
  const sky = makeSky({ radius: 100 });
  const pos = sky.geometry.getAttribute('position');
  const col = sky.geometry.getAttribute('color');
  const top = new THREE.Color(SKY_TOP);
  const hor = new THREE.Color(SKY_HORIZON);
  let topI = 0, botI = 0;
  for (let i = 0; i < pos.count; i++) {
    if (pos.getY(i) > pos.getY(topI)) topI = i;
    if (pos.getY(i) < pos.getY(botI)) botI = i;
  }
  // the topmost vertex matches the top color, the bottom matches the horizon band
  assert.ok(Math.abs(col.getX(topI) - top.r) < 0.02 && Math.abs(col.getZ(topI) - top.b) < 0.02, 'apex ≈ top color');
  assert.ok(Math.abs(col.getX(botI) - hor.r) < 0.02 && Math.abs(col.getZ(botI) - hor.b) < 0.02, 'nadir ≈ horizon color');
});

// --- tier gating: low stays byte-identical ---------------------------------
test('atmosphere flags are off at low and on at medium/high', () => {
  const low = resolveGfx({ tier: 'low', setting: 'low' });
  assert.equal(low.toneMap, false);
  assert.equal(low.fog, false);
  for (const tier of ['medium', 'high']) {
    const g = resolveGfx({ tier: 'high', setting: tier });
    assert.equal(g.toneMap, true, `${tier} grades color`);
    assert.equal(g.fog, true, `${tier} has distance haze`);
  }
});

test('the default light rig values are today\'s exact intensities (low tier is unchanged)', () => {
  // world.js only overrides these when GFX.toneMap is on; the defaults must match
  // the original renderer so low tier renders identically.
  assert.equal(GFX_TUNING.sunIntensity, 1.25);
  assert.equal(GFX_TUNING.fillIntensity, 0.25);
  assert.equal(GFX_TUNING.hemiIntensity, 0.95);
});

// --- world wiring (structural; World needs a GL context to instantiate) -----
test('world.js wires tone mapping, sky, and fog behind the tier flags', () => {
  const w = read('world.js');
  assert.match(w, /import \{ makeSky, SKY_HORIZON \} from '\.\/sky\.js'/, 'imports the shared sky');
  assert.match(w, /this\.toneMap = GFX\.toneMap/, 'tone mapping tracks the tier flag');
  assert.match(w, /if \(this\.toneMap\)[\s\S]*ACESFilmicToneMapping/, 'ACES filmic tone mapping gated by toneMap');
  assert.match(w, /toneMappingExposure = GFX_TUNING\.exposure/, 'exposure is tunable');
  assert.match(w, /if \(this\.toneMap\)[\s\S]*makeSky\(\)/, 'the dome is added only when grading is on');
  assert.match(w, /if \(GFX\.fog\)[\s\S]*new THREE\.Fog\(SKY_HORIZON/, 'fog gated by GFX.fog, colored to the horizon');
  // Fog distances are derived from the active camera distance (CAM_DIST for ortho, the
  // computed perspDist for the perspective hub) so the framed board always stays crisp.
  assert.match(w, /this\.fog\.near = camDist/, 'fog distances are derived from the framing so the board stays crisp');
});

test('the light rig reads its intensities from GFX_TUNING (dev-tunable, low = defaults)', () => {
  const w = read('world.js');
  assert.match(w, /HemisphereLight\([^)]*GFX_TUNING\.hemiIntensity\)/);
  assert.match(w, /DirectionalLight\(0xfff2d8, GFX_TUNING\.sunIntensity\)/);
  assert.match(w, /DirectionalLight\(0xbfd8ff, GFX_TUNING\.fillIntensity\)/);
});
