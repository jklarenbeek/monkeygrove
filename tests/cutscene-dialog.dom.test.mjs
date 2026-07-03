// @vitest-environment happy-dom
// The cutscene dialog bar: tap-anywhere paging, the arm delay that protects a
// fresh page from a stale double-tap, Skip/Escape, and screen-reader mirroring.
import { beforeEach, test } from 'vitest';
import assert from 'node:assert/strict';
import {
  openCutsceneUi, showCutscenePage, advancePage, closeCutsceneUi, cutsceneUiOpen,
} from '../src/cutscene/dialog.js';

beforeEach(() => {
  closeCutsceneUi();
  document.body.innerHTML = '<div id="ui"></div><div id="sr-announce"></div>';
});

test('open builds the overlay once, labels Skip, and close hides it again', () => {
  openCutsceneUi({ onSkip: () => {} });
  const root = document.getElementById('cutscene-ui');
  assert.ok(root, 'overlay exists');
  assert.equal(root.classList.contains('hidden'), false);
  assert.match(document.getElementById('cutscene-skip').textContent, /Skip/);
  assert.equal(cutsceneUiOpen(), true);

  openCutsceneUi({ onSkip: () => {} }); // idempotent — still exactly one overlay
  assert.equal(document.querySelectorAll('#cutscene-ui').length, 1);

  closeCutsceneUi();
  assert.equal(root.classList.contains('hidden'), true);
  assert.equal(cutsceneUiOpen(), false);
});

test('a page shows name/face/text, mirrors to the screen reader, and resolves on advance', async () => {
  openCutsceneUi({ onSkip: () => {} });
  const page = showCutscenePage({ name: 'Mimi', html: 'The <b>Crab King</b> pinched…', face: '🐒', armMs: 0 });
  assert.equal(document.getElementById('cutscene-face').textContent, '🐒');
  assert.equal(document.getElementById('cutscene-name').textContent, 'Mimi');
  assert.match(document.getElementById('cutscene-text').innerHTML, /<b>Crab King<\/b>/);
  assert.match(document.getElementById('sr-announce').textContent, /Mimi: The Crab King pinched/);
  assert.equal(document.getElementById('cutscene-dialog').classList.contains('hidden'), false);

  advancePage();
  await page; // resolved — the scene may flow on
  closeCutsceneUi();
});

test('narrator pages hide the name line', () => {
  openCutsceneUi({ onSkip: () => {} });
  showCutscenePage({ html: 'Two big pincers glint…', face: '👀', armMs: 0 });
  assert.equal(document.getElementById('cutscene-name').classList.contains('hidden'), true);
  closeCutsceneUi();
});

test('the arm delay swallows a tap that lands right after the page appears', async () => {
  openCutsceneUi({ onSkip: () => {} });
  let resolved = false;
  const page = showCutscenePage({ html: 'page', armMs: 60_000 }).then(() => { resolved = true; });
  advancePage(); // too early — ignored
  await new Promise((r) => setTimeout(r, 0));
  assert.equal(resolved, false, 'early tap ignored');
  closeCutsceneUi();
  void page;
});

test('Escape and the Skip button both fire onSkip', () => {
  let skips = 0;
  openCutsceneUi({ onSkip: () => { skips++; } });
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  document.getElementById('cutscene-skip').click();
  assert.equal(skips, 2);
  closeCutsceneUi();
  // once closed, keys are unbound
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  assert.equal(skips, 2);
});

test('Space/Enter advance the open page like a tap', async () => {
  openCutsceneUi({ onSkip: () => {} });
  const page = showCutscenePage({ html: 'page', armMs: 0 });
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  await page;
  closeCutsceneUi();
});
