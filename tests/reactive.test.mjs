import { test, beforeEach } from 'vitest';
import assert from 'node:assert/strict';
import { makePulse, onPlayerNear, makeReactiveProp } from '../src/reactive.js';

function mockSettings() {
  const data = new Map();
  globalThis.localStorage = {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => data.set(k, String(v)),
    removeItem: (k) => data.delete(k),
  };
  globalThis.matchMedia = () => ({ matches: false });
}
beforeEach(mockSettings);

test('onPlayerNear fires once per approach and re-arms only past the radius', () => {
  const player = { x: 10, z: 10 };
  let fired = 0;
  const r = onPlayerNear(() => player, () => ({ x: 0, z: 0 }), 2, () => fired++, 0);
  r.update(16); assert.equal(fired, 0, 'far away → no fire');
  player.x = 1; player.z = 0; // within radius 2
  r.update(16); assert.equal(fired, 1, 'approach fires once');
  r.update(16); assert.equal(fired, 1, 'still close → does not re-fire');
  player.x = 10; r.update(16); // leave well past radius+hysteresis → re-arm
  player.x = 1; r.update(16); assert.equal(fired, 2, 're-approach fires again');
});

test('makeReactiveProp.kick springs out then damps back to its stored base', () => {
  const mesh = { position: { x: 5, y: 1, z: 5, clone() { return { ...this }; }, set(x, y, z) { this.x = x; this.y = y; this.z = z; } } };
  const rp = makeReactiveProp(mesh, { maxOffset: 0.1 });
  rp.kick(1, 0, 0.6);
  rp.update(16);
  assert.notEqual(mesh.position.x, 5, 'kick displaces the prop');
  assert.ok(Math.abs(mesh.position.x - 5) <= 0.1 + 1e-6, 'offset stays within maxOffset');
  for (let i = 0; i < 200; i++) rp.update(16); // let it settle
  assert.ok(Math.abs(mesh.position.x - 5) < 0.005, 'damps back to base');
});

test('makePulse collapses to a steady base under reduced motion (no flicker)', async () => {
  const { settings, loadSave } = await import('../src/state.js');
  loadSave();
  settings().reduceMotion = true;
  const target = { material: { opacity: 0 } };
  const p = makePulse(target, { prop: 'opacity', base: 0.3, amp: 0.4, hz: 2 });
  p.update(123); assert.equal(target.material.opacity, 0.3);
  p.update(456); assert.equal(target.material.opacity, 0.3, 'stays put, never breathes');
  settings().reduceMotion = false;
});

test('makeReactiveProp.kick is a no-op under reduced motion', async () => {
  const { settings, loadSave } = await import('../src/state.js');
  loadSave();
  settings().reduceMotion = true;
  const mesh = { position: { x: 0, y: 0, z: 0, clone() { return { ...this }; }, set(x, y, z) { this.x = x; this.z = z; } } };
  const rp = makeReactiveProp(mesh);
  rp.kick(1, 0, 1);
  rp.update(16);
  assert.ok(Math.abs(mesh.position.x) < 1e-6, 'no displacement when motion is reduced');
  settings().reduceMotion = false;
});
