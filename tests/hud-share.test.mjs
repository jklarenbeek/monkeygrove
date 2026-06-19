// @vitest-environment happy-dom
import { beforeEach, test } from 'vitest';
import assert from 'node:assert/strict';
import { setLang } from '../src/i18n.js';
import { setVerbPanel } from '../src/hud.js';

beforeEach(() => {
  setLang('en');
  document.body.innerHTML = '<div id="verb-panel" class="hidden"></div>';
});

test('share panel explains that remainder coconuts stay as leftovers', () => {
  setVerbPanel({ kind: 'share', pile: 2, remainder: 2, counts: [4, 4, 4, 4, 4] });

  const panel = document.getElementById('verb-panel');
  assert.equal(panel.classList.contains('hidden'), false);
  assert.match(panel.textContent, /leftovers/i);
  assert.match(panel.textContent, /2/);
});
