import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as THREE from 'three';
import { createWaterSurface } from '../src/water.js';
import { PALETTE } from '../src/config.js';

function fakePlace(w, d) {
  const cells = Array.from({ length: d }, () => Array.from({ length: w }, () => ({ h: 0, walk: true, ch: '.' })));
  return {
    size: { w, d },
    cellAt: (x, z) => (x < 0 || z < 0 || x >= w || z >= d) ? null : cells[z][x],
    worldPos: (x, z) => new THREE.Vector3(x, 0, z),
  };
}

function stubCanvas() {
  globalThis.document = {
    createElement: () => ({
      width: 0, height: 0,
      getContext: () => ({
        clearRect() {}, beginPath() {}, moveTo() {}, bezierCurveTo() {}, stroke() {},
        fillRect() {}, fill() {}, set strokeStyle(v) {}, set lineWidth(v) {}, set fillStyle(v) {},
        createRadialGradient: () => ({ addColorStop() {} }),
      }),
    }),
  };
}

async function waitForWaterFx(water) {
  for (let i = 0; i < 50 && water.lifeAnchors.length === 0; i++) {
    await new Promise((resolve) => setTimeout(resolve, 0));
    water.update(16);
  }
}

test('flat water reproduces today: exactly two planes in the base palette', () => {
  const place = fakePlace(8, 8);
  const water = createWaterSurface(place, { size: place.size, quality: 'flat', palette: PALETTE, theme: 'tide' });
  const meshes = water.group.children.filter((o) => o.isMesh);
  assert.equal(meshes.length, 2, 'surface + deep only');
  assert.equal(water.surface.material.color.getHex(), new THREE.Color(PALETTE.water).getHex(), 'flat uses the base palette, not a theme tint');
});

test('flat water bobs gently and exposes the helper contract', () => {
  const place = fakePlace(8, 8);
  const water = createWaterSurface(place, { size: place.size, quality: 'flat', palette: PALETTE });
  const y0 = water.surface.position.y;
  water.update(500);
  assert.notEqual(water.surface.position.y, y0, 'the surface bobs');
  for (const fn of ['update', 'dispose', 'spawnFishShadow', 'spawnBubble', 'spawnSparkle']) {
    assert.equal(typeof water[fn], 'function', `exposes ${fn}`);
  }
});

test('flat water spawns nothing (hooks are no-ops without the animated tier)', () => {
  const place = fakePlace(8, 8);
  const water = createWaterSurface(place, { size: place.size, quality: 'flat', palette: PALETTE });
  const before = water.group.children.length;
  water.spawnFishShadow({ x: 0, z: 0 });
  water.spawnBubble({ x: 0, z: 0 });
  water.spawnShoreRipple({ x: 0, z: 0 });
  assert.equal(water.lifeAnchors.length, 0, 'flat water has no active water-life anchors');
  assert.equal(water.group.children.length, before, 'no spawns on flat water');
});

test('animated water lazy-loads shimmer + foam overlays beyond the two base planes', async () => {
  const prevDoc = globalThis.document;
  stubCanvas();
  try {
    const place = fakePlace(8, 8);
    const water = createWaterSurface(place, { size: place.size, quality: 'animated', palette: PALETTE, theme: 'tide' });
    assert.equal(water.group.children.filter((o) => o.isMesh).length, 2, 'animated water starts as readable base planes');
    await waitForWaterFx(water);
    assert.ok(water.group.children.length > 2, 'overlays/foam added on animated water');
    assert.doesNotThrow(() => water.update(300));
  } finally {
    if (prevDoc === undefined) delete globalThis.document; else globalThis.document = prevDoc;
  }
});

test('animated water exposes safe shoreline anchors for ambient life', async () => {
  const prevDoc = globalThis.document;
  stubCanvas();
  try {
    const place = fakePlace(6, 6);
    const water = createWaterSurface(place, { size: place.size, quality: 'animated', palette: PALETTE, theme: 'hub' });
    await waitForWaterFx(water);
    assert.ok(water.lifeAnchors.length > 0, 'shoreline anchors are exposed');
    assert.ok(water.lifeAnchors.every((a) => Number.isFinite(a.x) && Number.isFinite(a.z)), 'anchors have world positions');
    assert.ok(water.lifeAnchors.every((a) => Number.isFinite(a.outX) && Number.isFinite(a.outZ)), 'anchors include outward water direction');
    assert.ok(water.lifeAnchors.every((a) => a.kind === 'shore'), 'anchors are typed');
  } finally {
    if (prevDoc === undefined) delete globalThis.document; else globalThis.document = prevDoc;
  }
});

test('animated water can spawn shoreline ripples and dispose them', async () => {
  const prevDoc = globalThis.document;
  stubCanvas();
  try {
    const place = fakePlace(6, 6);
    const water = createWaterSurface(place, { size: place.size, quality: 'animated', palette: PALETTE, theme: 'hub' });
    await waitForWaterFx(water);
    const before = water.group.children.length;
    water.spawnShoreRipple(water.lifeAnchors[0]);
    assert.ok(water.group.children.length > before, 'a local shoreline ripple was added');
    water.dispose();
    assert.equal(water.group.children.length, before, 'dispose clears active water moments');
  } finally {
    if (prevDoc === undefined) delete globalThis.document; else globalThis.document = prevDoc;
  }
});

test('animated water reacts to world events with local ripples', async () => {
  const prevDoc = globalThis.document;
  stubCanvas();
  try {
    const place = fakePlace(6, 6);
    const water = createWaterSurface(place, { size: place.size, quality: 'animated', palette: PALETTE, theme: 'hub' });
    await waitForWaterFx(water);
    const before = water.group.children.length;
    water.react('correct-answer', { position: { x: 0, z: 0 } });
    assert.ok(water.group.children.length > before, 'correct-answer creates a local water response');
  } finally {
    if (prevDoc === undefined) delete globalThis.document; else globalThis.document = prevDoc;
  }
});

test('animated water effects are loaded through a lazy chunk', () => {
  const src = readFileSync(new URL('../src/water.js', import.meta.url), 'utf8');
  assert.match(src, /import\(['"]\.\/waterfx\.js['"]\)/, 'water.js dynamically imports waterfx');
  assert.doesNotMatch(src, /from ['"]\.\/waterfx\.js['"]/, 'waterfx must not be statically imported');
});
