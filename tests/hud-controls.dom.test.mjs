// @vitest-environment happy-dom
import { beforeEach, test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { initHud, setAction, setJoystickActive, setJoystickVector, setProximityPrompt } from '../src/hud.js';
import { setLang } from '../src/i18n.js';

const html = readFileSync(join(process.cwd(), 'index.html'), 'utf8');

function bodyFromIndex() {
  document.body.innerHTML = html.match(/<body>([\s\S]*)<\/body>/)[1]
    .replace(/<script[\s\S]*?<\/script>/g, '');
}

beforeEach(() => {
  bodyFromIndex();
  setLang('en');
});

test('mobile control DOM exists with accessible labels after HUD init', () => {
  initHud({
    onHint: () => {},
    onAction: () => {},
    onHome: () => {},
    onSettings: () => {},
    onResetCamera: () => {},
  });

  assert.ok(document.getElementById('joystick'), 'joystick shell exists');
  assert.ok(document.getElementById('joystick-knob'), 'joystick knob exists');
  assert.ok(document.getElementById('btn-camera-reset'), 'camera reset button exists');
  assert.ok(document.getElementById('proximity-prompt'), 'proximity prompt exists');
  assert.equal(document.getElementById('btn-camera-reset').getAttribute('aria-label'), 'Reset camera');
});

test('HUD helpers move joystick knob and toggle prompt/action states', () => {
  setJoystickActive(true);
  setJoystickVector(0.5, -0.25);
  const joy = document.getElementById('joystick');
  const knob = document.getElementById('joystick-knob');
  assert.ok(joy.classList.contains('active'));
  assert.match(knob.style.transform, /translate\(/);

  setProximityPrompt('Talk');
  const prompt = document.getElementById('proximity-prompt');
  assert.equal(prompt.classList.contains('hidden'), false);
  assert.equal(prompt.textContent, 'Talk');

  setAction('💬', { label: 'Talk', ready: true, visibleWhenIdle: true });
  const action = document.getElementById('btn-action');
  assert.equal(action.classList.contains('hidden'), false);
  assert.equal(action.getAttribute('aria-label'), 'Talk');
  assert.ok(action.classList.contains('ready'));
});
