// @vitest-environment happy-dom
// Real-DOM coverage of the music-stage panels: render each song panel, click through it,
// and assert it submits the exact action the engine grades (gradeStageRound). Mirrors
// tests/business-panels.dom.test.mjs — the DOM layer the source-based tests can't reach.
import { test, beforeEach } from 'vitest';
import assert from 'node:assert/strict';
import { setLang } from '../src/i18n.js';
import {
  showStageSongs, showStageEcho, showStageCount, showStageBeat,
} from '../src/screens.js';

const host = () => document.getElementById('screens');
const q = (sel) => host().querySelector(sel);
const qa = (sel) => [...host().querySelectorAll(sel)];

beforeEach(() => {
  document.body.innerHTML = '<div id="screens"></div>';
  setLang('en');
});

test('song menu: playable songs are tappable, locked songs show their grade', () => {
  let played = null;
  let exited = false;
  showStageSongs({
    songs: [
      { id: 'echo', titleKey: 'stage.song.echo', face: '🎵', unlocked: true, unlocksStage: 'grade_1' },
      { id: 'beat', titleKey: 'stage.song.beat', face: '🥁', unlocked: false, unlocksStage: 'grade_5' },
    ],
    gradeLabel: (stageId) => stageId,
    onPlay: (id) => { played = id; },
    onExit: () => { exited = true; },
  });
  assert.ok(q('[data-song="echo"]'), 'the unlocked song has a Play button');
  assert.equal(q('[data-song="beat"]'), null, 'the locked song has no Play button');
  assert.ok(host().textContent.includes('grade_5'), 'the locked song shows the grade it unlocks in');

  q('[data-song="echo"]').click();
  assert.equal(played, 'echo');
  q('#stage-close').click();
  assert.equal(exited, true);
});

test('echo: tapping the pads builds the sequence and submits {sequence}', () => {
  let submitted = null;
  showStageEcho({
    round: { mode: 'echo', sequence: [0, 2, 1], length: 3 },
    onNote: () => {},
    onSubmit: (a) => { submitted = a; return { correct: true }; },
    onClose: () => {},
  });
  assert.equal(qa('.stage-pad').length, 4, 'four coloured pads');
  q('[data-pad="0"]').click();
  q('[data-pad="2"]').click();
  q('[data-pad="1"]').click();
  assert.equal(q('#stage-echo-count').textContent, '3', 'the tap count updates');
  q('#stage-done').click();
  assert.deepEqual(submitted, { sequence: [0, 2, 1] });
});

test('counting: tapping beats toggles them and submits the chosen {beats}', () => {
  let submitted = null;
  showStageCount({
    round: { mode: 'count', step: 3, beats: 9, targets: [3, 6, 9] },
    onNote: () => {},
    onSubmit: (a) => { submitted = a; return { correct: true }; },
    onClose: () => {},
  });
  assert.equal(qa('.stage-beat').length, 9, 'a button per beat 1..9');
  for (const n of [3, 6, 9]) q(`[data-beat="${n}"]`).click();
  q('[data-beat="6"]').click(); // toggle 6 back off
  q('[data-beat="6"]').click(); // and on again
  q('#stage-done').click();
  assert.deepEqual(submitted.beats.sort((a, b) => a - b), [3, 6, 9]);
});

test('beat bar: tapping notes fills the bar and submits the chosen {tiles}', () => {
  let submitted = null;
  showStageBeat({
    round: { mode: 'beat', target: 24, tiles: ['half', 'quarter'], answer: ['half', 'quarter', 'quarter'] },
    onNote: () => {},
    onSubmit: (a) => { submitted = a; return { correct: true }; },
    onClose: () => {},
  });
  q('[data-note="half"]').click();
  q('[data-note="half"]').click();
  assert.equal(q('#stage-beat-total').textContent, '1 whole', 'the running total shows one whole');
  q('#stage-done').click();
  assert.deepEqual(submitted, { tiles: ['half', 'half'] });
});

test('a wrong answer keeps the panel open and reveals a hint', () => {
  showStageBeat({
    round: { mode: 'beat', target: 24, tiles: ['half', 'quarter'], answer: ['half', 'half'] },
    onNote: () => {},
    onSubmit: () => ({ correct: false }), // engine says wrong
    onClose: () => {},
  });
  q('[data-note="quarter"]').click();
  q('#stage-done').click();
  const fb = q('#stage-feedback');
  assert.equal(fb.hidden, false, 'feedback area is revealed');
  assert.ok(fb.textContent.trim().length, 'a hint message is shown');
  assert.ok(q('#stage-done'), 'the panel stays open for another try');
});
