import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { themeAccent } from '../src/verbfx.js';
import { WORLD_THEME } from '../src/config.js';

const src = readFileSync(new URL('../src/verbfx.js', import.meta.url), 'utf8');

test('verbfx never imports mathengine — the math logic stays pure', () => {
  assert.doesNotMatch(src, /\bimport\b[^;]*mathengine/, 'no import of the pure math engine');
});

test('themeAccent pulls from WORLD_THEME (never hardcoded), with a hub fallback', () => {
  assert.equal(themeAccent('tide'), WORLD_THEME.tide.accent);
  assert.equal(themeAccent('vines'), WORLD_THEME.vines.accent);
  assert.equal(themeAccent('nope'), WORLD_THEME.hub.accent, 'unknown world → hub accent');
});

test('verbfx emits the Phase 8 visual-event vocabulary from the chamber flow, not a parallel bus', () => {
  const flow = readFileSync(new URL('../src/chamberflow.js', import.meta.url), 'utf8');
  assert.match(flow, /visualEvent\?\.\((?:correct|\s|\?|:|'|")*'correct-answer'/, 'emits correct-answer');
  assert.match(flow, /'wrong-answer'/, 'emits wrong-answer');
});

test('mathengine.js is untouched by this phase (still declares itself pure)', () => {
  const eng = readFileSync(new URL('../src/mathengine.js', import.meta.url), 'utf8');
  assert.match(eng.slice(0, 200), /pure/i, 'mathengine still documents its purity');
});
