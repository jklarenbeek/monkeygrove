// Source-level wiring guard for Kiki's music stage: the pieces the DOM/engine tests can't
// see — the hub entry, the Game shell's start flow, the lazy chunk, and the localized keys.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(HERE);
const read = (...p) => readFileSync(join(ROOT, ...p), 'utf8');
const countKey = (src, key) => (src.match(new RegExp(`['"]${key.replaceAll('.', '\\.')}['"]`, 'g')) || []).length;

test('the hub opens the stage minigame from the built stage plot', () => {
  const hub = read('src', 'hub.js');
  assert.match(hub, /build\.id === 'stage'/);
  assert.match(hub, /startStageFromHub\(\)/);
});

test('the Game shell starts the stage in its own lazy chunk, gated by the build', () => {
  const main = read('src', 'main.js');
  assert.ok(main.includes('startStageFromHub'), 'main exposes the hub entry');
  assert.ok(main.includes('async startStage()'), 'main has the stage start flow');
  assert.ok(main.includes("isBuilt(this.profile, 'stage')"), 'stage entry is gated by the built stage');
  assert.ok(main.includes("import('./stage.js')"), 'the stage scene is a lazily-fetched chunk');
  assert.ok(main.includes('this.stage.stageTap'), 'taps route to the stage controller');
});

test('the lazy barrel exports the stage place and controller', () => {
  const barrel = read('src', 'stage.js');
  assert.match(barrel, /export \{ StagePlace \} from '\.\/stage\/scene\.js'/);
  assert.match(barrel, /export \{ StageController \} from '\.\/stage\/controller\.js'/);
});

test('the stage scene is a Place with a tappable gong and Kiki', () => {
  const scene = read('src', 'stage', 'scene.js');
  assert.match(scene, /export\s+class\s+StagePlace\s+extends\s+Place/);
  assert.match(scene, /isGong\s*\(\s*x\s*,\s*z\s*\)/);
  assert.ok(scene.includes('PROPS.gong'), 'the gong prop is placed');
  assert.ok(scene.includes("getCreature('kitten')"), 'Kiki the Kitten is on stage');
});

test('the screens barrel exports the four stage panels', () => {
  const screens = read('src', 'screens.js');
  for (const name of ['showStageSongs', 'showStageEcho', 'showStageCount', 'showStageBeat']) {
    assert.ok(screens.includes(name), `screens.js exports ${name}`);
  }
});

test('stage strings are defined in both English and Dutch', () => {
  const i18n = read('src', 'i18n', 'en.js') + '\n' + read('src', 'i18n', 'nl.js');
  for (const key of [
    'stage.songs', 'stage.play', 'stage.locked', 'stage.listen', 'stage.correct',
    'stage.song.echo', 'stage.song.count', 'stage.song.beat',
    'stage.echo.prompt', 'stage.count.prompt', 'stage.beat.prompt',
    'stage.hint.echo', 'stage.hint.count', 'stage.hint.beat',
  ]) {
    assert.equal(countKey(i18n, key), 2, `${key} is defined in both en and nl`);
  }
});
