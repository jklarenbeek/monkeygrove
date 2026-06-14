import { test } from 'vitest';
import assert from 'node:assert/strict';
import { languageButton } from '../src/langFlags.js';

test('Dutch language button uses an app-rendered flag icon', () => {
  const html = languageButton('nl', 'nl');

  assert.match(html, /data-lang="nl"/);
  assert.match(html, /aria-label="Nederlands"/);
  assert.match(html, /class="[^"]*active/);
  assert.match(html, /flag-icon flag-nl/);
  assert.doesNotMatch(html, /🇳🇱|>NL</);
});

test('English language button uses an app-rendered flag icon', () => {
  const html = languageButton('en', 'nl');

  assert.match(html, /data-lang="en"/);
  assert.match(html, /aria-label="English"/);
  assert.doesNotMatch(html, /class="[^"]*active/);
  assert.match(html, /flag-icon flag-gb/);
  assert.doesNotMatch(html, /🇬🇧|>GB</);
});
