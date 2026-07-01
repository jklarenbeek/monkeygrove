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
    'stage.count.play',
    'stage.hint.echo', 'stage.hint.count', 'stage.hint.beat',
  ]) {
    assert.equal(countKey(i18n, key), 2, `${key} is defined in both en and nl`);
  }
});

test('a correct round feeds the shared mathengine mastery, gated by song', () => {
  const controller = read('src', 'stage', 'controller.js');
  assert.ok(controller.includes("import { reinforceSkill } from '../mathengine.js'"), 'controller imports reinforceSkill');
  assert.match(controller, /STAGE_MODES\[this\.songId\]\?\.reinforceSkill/, 'the song names which skill it reinforces');
  assert.match(controller, /reinforceSkill\(this\.game\.profile\.math, skill, true/, 'a correct round nudges that skill');
});

test('the count song reinforces tables, the beat song reinforces fractions, echo neither', () => {
  const data = read('src', 'stage', 'data.js');
  assert.match(data, /count:[\s\S]*?reinforceSkill:\s*'tables_a'/, 'the Counting Song feeds tables_a');
  assert.match(data, /beat:[\s\S]*?reinforceSkill:\s*'frac_magnitude'/, 'the Beat Bar feeds frac_magnitude');
  assert.match(data, /echo:[\s\S]*?reinforceSkill:\s*null/, 'Echo reinforces no chamber skill');
});

test('the skip-count wonder fires deliberately from the Counting Song only', () => {
  const controller = read('src', 'stage', 'controller.js');
  const fn = controller.slice(controller.indexOf('maybeStageWonder()'));
  assert.match(fn, /this\.songId !== 'count'[\s\S]*?return/, 'maybeStageWonder is gated to the count song');
});

test('the 3D stage pulses on each note (gong + Kiki), reduced-motion safe', () => {
  const scene = read('src', 'stage', 'scene.js');
  const controller = read('src', 'stage', 'controller.js');
  assert.match(scene, /pulseStage\s*\(\s*\)/, 'the scene exposes a pulse');
  assert.ok(scene.includes('reducedMotion'), 'the pulse respects reduced motion');
  assert.ok(controller.includes('pulseStage'), 'the controller pulses the stage on notes');
});
