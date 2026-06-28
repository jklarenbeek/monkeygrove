import { test } from 'vitest';
import assert from 'node:assert/strict';
import { audio } from '../src/audio.js';

// Silent-audio safety: with no/blocked AudioContext, every new entry point must be a safe no-op
// so the game is fully playable in silence and import-safe in tests/SSR.
test('ambient/variation/event API never throws without an AudioContext', () => {
  assert.doesNotThrow(() => {
    audio.ambience('hub');
    audio.ambience('chamber:tide');
    audio.ambience(null);
    audio.variation('hop');
    audio.variation('correct', { gain: 0.5 });
    audio.setAmbience(false);
    audio.setAmbience(true);
  });
});

test('attachEvents tolerates a missing/!addReactor place and registers on a real one', () => {
  assert.doesNotThrow(() => { audio.attachEvents(null); audio.attachEvents({}); });
  const reactors = [];
  const place = { addReactor: (r) => reactors.push(r) };
  audio.attachEvents(place);
  assert.equal(reactors.length, 1, 'registers exactly one listener');
  assert.doesNotThrow(() => reactors[0].react('build-complete'), 'reacting is safe without ctx');
});

test('the engine still exposes the original audio surface', () => {
  for (const m of ['init', 'sfx', 'music', 'setSfx', 'setMusic', 'ambience', 'setAmbience', 'variation', 'attachEvents']) {
    assert.equal(typeof audio[m], 'function', `audio.${m} exists`);
  }
});
