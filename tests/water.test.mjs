import { test } from 'vitest';
import assert from 'node:assert/strict';
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
  assert.equal(water.group.children.length, before, 'no spawns on flat water');
});

test('animated water adds shimmer + foam overlays beyond the two base planes', () => {
  const prevDoc = globalThis.document;
  stubCanvas();
  try {
    const place = fakePlace(8, 8);
    const water = createWaterSurface(place, { size: place.size, quality: 'animated', palette: PALETTE, theme: 'tide' });
    assert.ok(water.group.children.length > 2, 'overlays/foam added on animated water');
    assert.doesNotThrow(() => water.update(300));
  } finally {
    if (prevDoc === undefined) delete globalThis.document; else globalThis.document = prevDoc;
  }
});
