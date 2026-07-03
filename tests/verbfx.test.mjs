import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import * as verbfx from '../src/verbs/verbfx.js';
import { WORLD_THEME } from '../src/config.js';

const src = readFileSync(new URL('../src/verbs/verbfx.js', import.meta.url), 'utf8');
// The verbs layer is split into src/verbs/*.js — read every module so the
// "each verb calls its helper" assertions stay location-agnostic.
const verbs = readdirSync(new URL('../src/verbs/', import.meta.url))
  .filter((f) => f.endsWith('.js'))
  .map((f) => readFileSync(new URL(`../src/verbs/${f}`, import.meta.url), 'utf8'))
  .join('\n');

test('verbfx never imports mathengine — the math logic stays pure', () => {
  assert.doesNotMatch(src, /\bimport\b[^;]*mathengine/, 'no import of the pure math engine');
});

test('themeAccent pulls from WORLD_THEME (never hardcoded), with a hub fallback', () => {
  const { themeAccent } = verbfx;
  assert.equal(themeAccent('tide'), WORLD_THEME.tide.accent);
  assert.equal(themeAccent('vines'), WORLD_THEME.vines.accent);
  assert.equal(themeAccent('nope'), WORLD_THEME.hub.accent, 'unknown world → hub accent');
});

test('verbfx exports the full chamber-juice helper contract', () => {
  for (const name of [
    'fxFetchCorrect',
    'fxArrayGrowCell',
    'fxNumberLinePulse',
    'fxShareDeal',
    'themeAccent',
    'fxThemeAmbience',
    'fxCorrectSequence',
    'fxNotYetSequence',
  ]) {
    assert.equal(typeof verbfx[name], 'function', `${name} is exported`);
  }
});

test('each chamber verb calls its matching chamber-juice helper', () => {
  assert.match(verbs, /fxFetchCorrect\(/, 'Fetch calls fxFetchCorrect');
  assert.match(verbs, /fxArrayGrowCell\(/, 'Array calls fxArrayGrowCell');
  assert.match(verbs, /fxNumberLinePulse\(/, 'Number line calls fxNumberLinePulse');
  assert.match(verbs, /fxShareDeal\(/, 'Share calls fxShareDeal');
});

test('verbfx emits the visual-event vocabulary from the chamber flow, not a parallel bus', () => {
  const flow = readFileSync(new URL('../src/chamberflow.js', import.meta.url), 'utf8');
  assert.match(flow, /visualEvent\?\.\((?:correct|\s|\?|:|'|")*'correct-answer'/, 'emits correct-answer');
  assert.match(flow, /'wrong-answer'/, 'emits wrong-answer');
});

test('mathengine.js is untouched by the juice layer (still declares itself pure)', () => {
  const eng = readFileSync(new URL('../src/mathengine.js', import.meta.url), 'utf8');
  assert.match(eng.slice(0, 200), /pure/i, 'mathengine still documents its purity');
});
