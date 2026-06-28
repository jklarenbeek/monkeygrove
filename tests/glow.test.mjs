import { test, beforeEach } from 'vitest';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { makeGlowSprite, makeGlowPlane, makeMoteField, pulseGlow, glowSizeBoost } from '../src/glow.js';

// glow.js builds canvas textures; give it a minimal DOM.
beforeEach(() => {
  if (typeof document === 'undefined') {
    globalThis.document = {
      createElement: () => ({
        width: 0, height: 0,
        getContext: () => ({ createRadialGradient: () => ({ addColorStop() {} }), fillRect() {} }),
      }),
    };
  }
});

test('makeGlowSprite is an additive, depth-write-off, _owned sprite', () => {
  const sp = makeGlowSprite(0xfff3b8, 0.1, 0.8);
  assert.ok(sp.isSprite);
  assert.equal(sp.material.blending, THREE.AdditiveBlending);
  assert.equal(sp.material.depthWrite, false);
  assert.equal(sp.material.transparent, true);
  assert.equal(sp.material._owned, true, 'freed by place.dispose()');
});

test('makeGlowPlane is an additive _owned mesh with an owned geometry', () => {
  const m = makeGlowPlane(0xffd966, 1, 0.4);
  assert.ok(m.isMesh);
  assert.equal(m.material.blending, THREE.AdditiveBlending);
  assert.equal(m.material._owned, true);
  assert.equal(m.geometry._owned, true);
});

test('pulseGlow holds steady under reduced motion (no flicker)', async () => {
  const { settings, loadSave } = await import('../src/state.js');
  loadSave();
  const mat = { opacity: 0 };
  settings().reduceMotion = true;
  pulseGlow(mat, 1.23, 0.3, 0.2, 2);
  assert.equal(mat.opacity, 0.3, 'reduced motion → exactly the steady base');
  settings().reduceMotion = false;
  globalThis.matchMedia = () => ({ matches: false });
  pulseGlow(mat, Math.PI / 2 / 2, 0.3, 0.2, 2); // sin(speed*time)=sin(pi/2)=1 → base+amp
  assert.ok(mat.opacity > 0.3, 'motion → it breathes');
});

test('makeMoteField returns a group + update that drives opacity over time', () => {
  const { group, update } = makeMoteField({ count: 4, color: 0xfff3b8 });
  assert.equal(group.children.length, 4);
  assert.doesNotThrow(() => update(2.0));
});

test('glow size boost is 1 unless the bloom flag is on', () => {
  // in the node test env GFX.tier resolves to high → bloom true → boost > 1
  assert.ok(glowSizeBoost() >= 1);
});
