// Wiring guards (source-level, like chamber.test.mjs): the cutscene chunk must
// stay lazy, every story dialog must route through playCutscene WITH its DOM
// fallback, and the staged path must hand the hub back exactly as it found it.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');
const main = read('../src/main.js');
const hub = read('../src/hub.js');

test('main.js reaches the cutscenes ONLY via the dynamic import (stays a lazy chunk)', () => {
  assert.match(main, /await import\('\.\/cutscene\.js'\)/);
  assert.doesNotMatch(main, /^import .*['"]\.\/cutscene(\.js|\/)/m, 'no static import from the entry');
  assert.doesNotMatch(hub, /^import .*['"]\.\/cutscene(\.js|\/)/m, 'no static import from the hub');
});

test('the intro plays as a cutscene with the DOM story cards as fallback', () => {
  assert.match(
    main,
    /this\.playCutscene\('intro', continueFromIntro, \(\) => screens\.showStory\(continueFromIntro\)\)/,
  );
});

test('the reveal and sighting beats keep their latch-then-show order and DOM fallback', () => {
  assert.match(
    main,
    /drawNarrativeLine\(story, revealIdx\);\s*persist\(\);\s*this\.playCutscene\('reveal', done, \(\) => screens\.showStoryBeat\('reveal', \{ story \}, done\)\)/s,
  );
  assert.match(
    main,
    /markBeat\(story, 'crab_sighting'\);\s*persist\(\);\s*this\.playCutscene\('sighting', done, \(\) => screens\.showStoryBeat\('sighting', \{ story \}, done\)\)/s,
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
  const staged = main.slice(main.indexOf('_playStagedCutscene'));
  assert.match(staged, /this\.player\.stop\(\); this\.player\.locked = true;/);
  assert.match(staged, /world\.followObj = prev\.followObj;/);
  assert.match(staged, /world\.setSpan\(prev\.span\);/);
  assert.match(staged, /this\.mode = prev\.mode;/);
  assert.match(staged, /hud\.showHud\(true\);/);
});
