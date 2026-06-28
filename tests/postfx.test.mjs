import { test, beforeEach } from 'vitest';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { BLOOM_LAYER, tagBloom, untagBloom, makeGlowSprite, makeGlowPlane } from '../src/glow.js';
import { createComposer } from '../src/postfx.js';

// glow.js builds canvas textures; give it a minimal DOM when running headless.
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

// A camera masked to ONLY the bloom layer is exactly what the bloom pass uses; a
// default camera is the main pass. These two masks are the whole selective-bloom
// contract: tagged objects show in both, untagged objects show only in the main pass.
function bloomOnlyCam() {
  const c = new THREE.Camera();
  c.layers.set(BLOOM_LAYER);
  return c;
}

test('BLOOM_LAYER is a valid, non-default render layer', () => {
  assert.equal(typeof BLOOM_LAYER, 'number');
  assert.ok(BLOOM_LAYER > 0 && BLOOM_LAYER < 32, 'a usable three.js layer index, not layer 0');
});

test('tagBloom adds the bloom layer WITHOUT dropping layer 0 (still renders normally)', () => {
  const o = new THREE.Object3D();
  const mainCam = new THREE.Camera();        // default mask = layer 0
  assert.equal(mainCam.layers.test(o.layers), true, 'untagged: visible to the main camera');
  assert.equal(bloomOnlyCam().layers.test(o.layers), false, 'untagged: NOT in the bloom pass');

  tagBloom(o);
  assert.equal(mainCam.layers.test(o.layers), true, 'tagged: STILL visible to the main camera');
  assert.equal(bloomOnlyCam().layers.test(o.layers), true, 'tagged: now also in the bloom pass');
});

test('tagBloom is recursive over a subtree by default', () => {
  const parent = new THREE.Group();
  const child = new THREE.Object3D();
  const grandchild = new THREE.Object3D();
  child.add(grandchild);
  parent.add(child);
  tagBloom(parent);
  for (const o of [parent, child, grandchild]) {
    assert.equal(bloomOnlyCam().layers.test(o.layers), true, 'every descendant is tagged');
  }
});

test('untagBloom removes the bloom layer but keeps the object on layer 0', () => {
  const o = new THREE.Object3D();
  tagBloom(o);
  untagBloom(o);
  assert.equal(bloomOnlyCam().layers.test(o.layers), false, 'no longer in the bloom pass');
  assert.equal(new THREE.Camera().layers.test(o.layers), true, 'still rendered by the main camera');
});

test('tagBloom/untagBloom tolerate null', () => {
  assert.doesNotThrow(() => tagBloom(null));
  assert.doesNotThrow(() => untagBloom(null));
});

// The bloom language IS the tagging surface: every glow-helper output must be a bloom
// target so portals/motes/rewards light up on High without per-call-site tagging.
test('glow-language factories emit bloom-tagged objects', () => {
  assert.equal(bloomOnlyCam().layers.test(makeGlowSprite(0xfff3b8, 0.1, 0.8).layers), true, 'glow sprite blooms');
  assert.equal(bloomOnlyCam().layers.test(makeGlowPlane(0xffd966, 1, 0.4).layers), true, 'glow plane blooms');
});

test('createComposer is exported as a factory and degrades to null without a GL context', async () => {
  assert.equal(typeof createComposer, 'function');
  // No real WebGLRenderer here → construction can't complete; it must resolve to null
  // (never throw), so world.js cleanly falls back to the direct render path.
  const c = await createComposer(null, { width: 800, height: 600, halfRes: true });
  assert.equal(c, null, 'graceful null, not an exception, when there is no GL context');
});
