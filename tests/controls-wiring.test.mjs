import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

test('game wiring previews paths, refreshes prompts, and updates held joystick movement', () => {
  const main = root('src/main.js');
  const input = root('src/input.js');

  assert.match(input, /this\.previewTapCell\(cell\)/, 'input previews a picked cell before tap release');
  assert.match(input, /softVibrate\(12\)/, 'joystick direction changes can give a tiny haptic tick');
  assert.match(input, /hint\.controls/, 'touch onboarding names the kid-friendly controls');
  assert.match(input, /previewTapCell\(cell\)/, 'input owns the tap preview handler');
  assert.match(input, /showPathPreview\(cell/, 'input tints reachable and path cells');
  assert.match(input, /refreshControlPrompt\(\)/, 'input refreshes contextual prompt/action state');
  assert.match(main, /this\.input\?\.update\(dt\)/, 'game updates held joystick movement each frame');
  assert.match(main, /this\.input\?\.updateUX\(dt\)/, 'game drives the preview expiry + prompt refresh each frame');
});

test('control CSS exposes touch joystick and proximity prompt without stealing pointer events', () => {
  const css = root('style.css');
  const html = root('index.html');

  assert.match(html, /id="joystick"/, 'joystick DOM exists');
  assert.match(html, /id="proximity-prompt"/, 'proximity prompt DOM exists');
  assert.match(css, /#joystick[\s\S]*pointer-events:\s*none/, 'joystick overlay does not block taps');
  assert.match(css, /joystick-idle-pulse/, 'idle joystick has a visible discovery pulse');
  assert.match(css, /#btn-action\.ready[\s\S]*0 0 0 10px/, 'ready action button gets a stronger contextual glow');
  assert.match(css, /@media \(hover:\s*none\), \(pointer:\s*coarse\)[\s\S]*#joystick\s*\{\s*display:\s*flex/, 'joystick shows on coarse pointers');
  assert.match(css, /@media \(max-width:\s*760px\)[\s\S]*#joystick\s*\{\s*display:\s*flex/, 'joystick also shows in narrow mobile-sized viewports');
});
