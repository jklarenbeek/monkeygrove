import { test } from 'vitest';
import assert from 'node:assert/strict';
import { makeContactShadow } from '../src/blobshadow.js';

test('a contact shadow is a flat quad sized to its radius, lifted off the floor', () => {
  const blob = makeContactShadow({ radius: 0.5, yOffset: 0.02 });
  assert.ok(blob.isMesh);
  assert.ok(Math.abs(blob.rotation.x + Math.PI / 2) < 1e-6, 'lies flat on the ground (XZ)');
  assert.equal(blob.scale.x, 1.0, 'width = 2·radius');
  assert.equal(blob.scale.y, 1.0, 'depth = 2·radius (pre-rotation Y)');
  assert.equal(blob.position.y, 0.02, 'lifted to avoid z-fighting');
  assert.equal(blob.userData.contactShadow, true);
});

test('geometry is a shared singleton marked _cached (Place.dispose skips it)', () => {
  const a = makeContactShadow({ radius: 0.3 });
  const b = makeContactShadow({ radius: 0.9 });
  assert.strictEqual(a.geometry, b.geometry, 'one shared geometry across all blobs');
  assert.equal(a.geometry._cached, true, 'cached → never disposed with a place');
});

test('materials are shared per opacity bucket and are NOT _owned (dispose leaves them)', () => {
  const a = makeContactShadow({ opacity: 0.28 });
  const b = makeContactShadow({ opacity: 0.28 });
  const c = makeContactShadow({ opacity: 0.18 });
  assert.strictEqual(a.material, b.material, 'same opacity → shared material singleton');
  assert.notStrictEqual(a.material, c.material, 'different opacity → its own bucket');
  for (const m of [a.material, c.material]) {
    assert.ok(!m._owned, 'shared singleton must not be _owned (Place.dispose would free it)');
    assert.equal(m.transparent, true);
    assert.equal(m.depthWrite, false, 'never occludes the scene');
  }
  assert.ok(Math.abs(a.material.opacity - 0.28) < 1e-9);
  assert.ok(Math.abs(c.material.opacity - 0.18) < 1e-9);
});

test('the per-blob mesh is disposable-safe: only the lightweight wrapper is per-place', () => {
  // Simulate Place.dispose()'s rule: dispose geometry only if !_cached, material only
  // if _owned. The shared blob singletons must survive that pass untouched.
  const blob = makeContactShadow({ radius: 0.4 });
  const wouldDisposeGeo = blob.geometry && !blob.geometry._cached;
  const wouldDisposeMat = !!blob.material?._owned;
  assert.equal(wouldDisposeGeo, false, 'shared geometry survives dispose');
  assert.equal(wouldDisposeMat, false, 'shared material survives dispose');
});
