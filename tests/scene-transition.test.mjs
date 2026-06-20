// @vitest-environment happy-dom
import { beforeEach, test, vi } from 'vitest';
import assert from 'node:assert/strict';
import { hideSceneTransition, runSceneTransition, showSceneTransition } from '../src/scene-transition.js';

beforeEach(() => {
  vi.useFakeTimers();
  document.body.innerHTML = '<div id="scene-transition" class="hidden" aria-hidden="true"><div class="scene-transition-core"></div></div>';
});

test('scene transition can show a magical portal state and then hide', async () => {
  const shown = showSceneTransition('portal');

  assert.equal(shown.classList.contains('hidden'), false);
  assert.equal(shown.classList.contains('portal'), true);
  assert.equal(shown.getAttribute('aria-hidden'), 'true');

  hideSceneTransition();
  await vi.runAllTimersAsync();

  assert.equal(shown.classList.contains('hidden'), true);
  vi.useRealTimers();
});

test('runSceneTransition covers the scene while the swap callback runs', async () => {
  const order = [];
  const promise = runSceneTransition(() => { order.push('swap'); }, { kind: 'portal', inMs: 10, outMs: 10 });

  order.push(document.getElementById('scene-transition').classList.contains('hidden') ? 'hidden' : 'shown');
  await vi.advanceTimersByTimeAsync(10);
  order.push(document.getElementById('scene-transition').classList.contains('hidden') ? 'hidden-after-in' : 'shown-after-in');
  await vi.advanceTimersByTimeAsync(10);
  await promise;

  assert.deepEqual(order, ['shown', 'swap', 'shown-after-in']);
  assert.equal(document.getElementById('scene-transition').classList.contains('hidden'), true);
  vi.useRealTimers();
});
