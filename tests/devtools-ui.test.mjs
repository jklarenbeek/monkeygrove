import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const mainSource = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const screensSource = readFileSync(new URL('../src/screens.js', import.meta.url), 'utf8');

test('developer tools are dynamically loaded only in Vite dev mode', () => {
  assert.doesNotMatch(mainSource, /import .*['"]\.\/devtools\.js['"]/);
  assert.match(mainSource, /if \(import\.meta\.env\.DEV\)/);
  assert.match(mainSource, /import\(['"]\.\/devtools\.js['"]\)/);
});

test('settings screen gates developer tools behind an explicit reveal button', () => {
  assert.match(screensSource, /export function showSettings\(\{ onClose, onSwitchPlayer, onLangChange, devTools \}\)/);
  assert.match(screensSource, /settings-extra-toggle/);
  assert.match(screensSource, /data-settings-preset/);
  assert.match(screensSource, /settings-manual-devtools/);
  assert.match(screensSource, /devTools\?\.onManual\?/);
  assert.doesNotMatch(screensSource, /Developer tools|Warmup done|Bakery built|Festival complete|devtools-panel/);
});
