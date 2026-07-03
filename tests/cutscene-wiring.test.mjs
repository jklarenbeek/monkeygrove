// Wiring guards (source-level, like chamber.test.mjs): the cutscene chunk must
// stay lazy, every story dialog must route through playCutscene WITH its DOM
// fallback, and the staged path must hand the hub back exactly as it found it.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const main = read('../src/main.js');
const hub = read('../src/hub.js');
// The flows that trigger cutscenes moved out of main.js: the intro plays from
// appflow.js (player select), the beats from story/flow.js, and the runners
// themselves live inside the lazy chunk (cutscene/run.js).
const appflow = read('../src/appflow.js');
const storyflow = read('../src/story/flow.js');
const run = read('../src/cutscene/run.js');

test('main.js reaches the cutscenes ONLY via the dynamic import (stays a lazy chunk)', () => {
  assert.match(main, /await import\('\.\/cutscene\.js'\)/);
  assert.doesNotMatch(main, /^import .*['"]\.\/cutscene(\.js|\/)/m, 'no static import from the entry');
  assert.doesNotMatch(hub, /^import .*['"]\.\/cutscene(\.js|\/)/m, 'no static import from the hub');
  assert.doesNotMatch(appflow, /^import .*['"]\.\/cutscene(\.js|\/)/m, 'no static import from the app flows');
  assert.doesNotMatch(storyflow, /^import .*['"]\.\.\/cutscene(\.js|\/)/m, 'no static import from the story flow');
});

test('the intro plays as a cutscene with the DOM story cards as fallback', () => {
  assert.match(
    appflow,
    /game\.playCutscene\('intro', continueFromIntro, \(\) => screens\.showStory\(continueFromIntro\)\)/,
  );
});

test('the reveal and sighting beats keep their latch-then-show order and DOM fallback', () => {
  assert.match(
    storyflow,
    /drawNarrativeLine\(story, revealIdx\);\s*persist\(\);\s*game\.playCutscene\('reveal', done, \(\) => screens\.showStoryBeat\('reveal', \{ story \}, done\)\)/s,
  );
  assert.match(
    storyflow,
    /markBeat\(story, 'crab_sighting'\);\s*persist\(\);\s*game\.playCutscene\('sighting', done, \(\) => screens\.showStoryBeat\('sighting', \{ story \}, done\)\)/s,
  );
});

test('the finale interrupts the plaza funding on the LIVE hub with showFinale as fallback', () => {
  assert.match(
    hub,
    /g\.playCutscene\('finale', afterConfession, \(\) => screens\.showFinale\(afterConfession\)\)/,
  );
  assert.match(hub, /hud\.toast\(t\('island\.crab_pays', \{ n: def\.contribution \}\)\);\s*doFund\(\);/s, 'crab still pays half before funding');
});

test('a failed load falls back to the DOM cards; a mid-scene failure still reaches onDone', () => {
  assert.match(main, /if \(!scene\) \{ \(fallback \|\| onDone\)\(\); return; \}/);
  assert.match(main, /catch \(e\) \{\s*if \(import\.meta\.env\.DEV\) console\.error\('\[cutscene\] play failed:', e\);\s*\}\s*onDone\(\);/s);
});

test('the staged path freezes the player and restores camera, lock, mode, and HUD', () => {
  const staged = run.slice(run.indexOf('export async function playStaged'));
  assert.match(staged, /game\.player\.stop\(\); game\.player\.locked = true;/);
  assert.match(staged, /world\.followObj = prev\.followObj;/);
  assert.match(staged, /world\.setSpan\(prev\.span\);/);
  assert.match(staged, /game\.mode = prev\.mode;/);
  assert.match(staged, /hud\.showHud\(true\);/);
});
