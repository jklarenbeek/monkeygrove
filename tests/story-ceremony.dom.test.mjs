// @vitest-environment happy-dom
// Real-DOM coverage of the line-draw ceremony screen: it renders the founding
// hexagram + balance dial, steps through each event, and calls onDone at the end.
// happy-dom is the only layer that catches a render/innerHTML throw the pure
// chapter tests can't.
import { test, beforeEach } from 'vitest';
import assert from 'node:assert/strict';
import { setLang } from '../src/i18n.js';
import { showLineCeremony, showStoryBeat, showAltar, showIsland, showGems, showResult } from '../src/screens.js';
import { freshStory } from '../src/story/engine.js';
import { lineCeremonies } from '../src/story/chapters.js';

const host = () => document.getElementById('screens');

beforeEach(() => {
  document.body.innerHTML = '<div id="screens"></div>';
  setLang('en');
});

test('renders an earned ceremony and reaches onDone after its single step', () => {
  const story = freshStory();
  story.lines[0] = true; // tide line drawn
  const events = lineCeremonies([0], { tide: 'earned' });
  let done = false;
  showLineCeremony(events, { story }, () => { done = true; });

  assert.ok(host().querySelector('#story-hex'), 'hexagram renders');
  assert.ok(host().querySelector('#story-balance').textContent.includes('1 of 6'));
  assert.match(host().querySelector('#story-text').innerHTML, /Tide Pools/);
  // Phase 6: the returning friend (the Tide line brings the duckling home) renders as
  // its REAL voxel model — an <svg> in the face slot — not an emoji stand-in.
  const face = host().querySelector('#story-face');
  assert.ok(face.querySelector('svg'), 'the friend arrives as a voxel mesh, not an emoji');
  assert.ok(face.querySelector('.story-friend'), 'friend is wrapped for its walk-home entrance');

  host().querySelector('#story-next').click(); // only one event -> done
  assert.equal(done, true);
});

test('a remembered (no-friend) beat keeps its emoji face, not a mesh', () => {
  const story = freshStory();
  story.lines[0] = true;
  const events = lineCeremonies([0], { tide: 'remembered' });
  showLineCeremony(events, { story }, () => {});
  const face = host().querySelector('#story-face');
  assert.equal(face.querySelector('svg'), null, 'remembered shores show the emoji, no friend mesh');
});

test('steps through a multi-event batch before finishing', () => {
  const story = freshStory();
  story.lines[0] = true; story.lines[4] = true;
  const events = lineCeremonies([0, 4], { tide: 'remembered', vines: 'earned' });
  assert.equal(events.length, 2);
  let done = false;
  showLineCeremony(events, { story }, () => { done = true; });

  host().querySelector('#story-next').click(); // advance past event 1
  assert.equal(done, false, 'not done after the first of two events');
  host().querySelector('#story-next').click(); // finish event 2
  assert.equal(done, true);
});

test('empty plan calls onDone immediately and renders nothing', () => {
  let done = false;
  showLineCeremony([], { story: freshStory() }, () => { done = true; });
  assert.equal(done, true);
  assert.equal(host().querySelector('#story-next'), null);
});

test('the reveal beat steps through its prose pages then finishes', () => {
  const story = freshStory();
  story.lines[0] = true; story.lines[1] = true; // tide + reveal drawn
  let done = false;
  showStoryBeat('reveal', { story }, () => { done = true; });
  assert.ok(host().querySelector('#story-hex'), 'hexagram renders');
  assert.match(host().querySelector('#story-text').innerHTML, /four|Four/);
  host().querySelector('#story-next').click(); // page 2
  assert.equal(done, false);
  host().querySelector('#story-next').click(); // finish
  assert.equal(done, true);
});

test('the worktable shows the persistent bloom chip and opens the Altar', () => {
  let altarOpened = false;
  showIsland({
    profile: { bananas: 10 },
    status: [{ id: 'lanterns', state: 'unlocked', emoji: '🏮', playerCost: 30 }],
    bloom: { linesDrawn: 3 },
    onClose: () => {},
    onFund: () => {},
    onAltar: () => { altarOpened = true; },
  });
  assert.match(host().textContent, /3 of 6/, 'bloom chip shows lines drawn');
  const altarBtn = host().querySelector('#island-altar');
  assert.ok(altarBtn, 'altar button renders');
  altarBtn.click();
  assert.equal(altarOpened, true);
});

test('the result screen offers a wonder door after the chest; opening it marks it seen', () => {
  const wonder = { id: 'twin_gem', titleKey: 'wonder.twin_gem.title', bodyKey: 'wonder.twin_gem.body' };
  let openedId = null;
  showResult({ rewards: ['🍌 5'], wonder, onWonderOpen: (id) => { openedId = id; }, onNext: () => {}, onHome: () => {} });
  // the door stays hidden until the chest is opened (never competes with the reward)
  assert.ok(host().querySelector('#result-wonder').classList.contains('hidden'));
  host().querySelector('#result-chest').click();
  assert.ok(!host().querySelector('#result-wonder').classList.contains('hidden'), 'door appears after the chest');
  // the card stays hidden until the child chooses to open the door (opt-in)
  assert.ok(host().querySelector('#wonder-card').classList.contains('hidden'));
  host().querySelector('#result-wonder').click();
  assert.ok(!host().querySelector('#wonder-card').classList.contains('hidden'), 'the card reveals on tap');
  assert.match(host().querySelector('#wonder-card').textContent, /mirror twin/i);
  assert.equal(openedId, 'twin_gem', 'opening the door marks the wonder discovered');
});

test('no wonder means no door on the result screen', () => {
  showResult({ rewards: ['🍌 5'], onNext: () => {}, onHome: () => {} });
  assert.equal(host().querySelector('#result-wonder'), null);
});

test('the Gem Tree renders the secret 64 as an 8×8 hexagram grid that fills with gems', () => {
  const skills = [{ id: 'add_20', nameKey: 'skill.add_20', rating: 700, mastered: false, n: 4 }];
  const worlds = { tide: { pct: 0.2, skills }, garden: { pct: 0, skills: [] }, stump: { pct: 0, skills: [] }, vines: { pct: 0, skills: [] } };
  // 32 of 100 facts lit -> ~ round(64 * .32) = 20 hexagrams lit.
  const lit = [];
  for (let r = 1; r <= 10 && lit.length < 32; r++) for (let c = 1; c <= 10 && lit.length < 32; c++) lit.push(`${r}x${c}`);
  showGems({ report: { worlds, gems: { lit, total: 100 } }, onClose: () => {} });

  assert.equal(host().querySelectorAll('.hx').length, 64, 'the full 64 render');
  assert.equal(host().querySelectorAll('.hx.lit').length, Math.round(64 * 0.32), 'lit hexagrams track the gems');
  assert.match(host().textContent, /secret 64|I Ching|64/i);
  // every glyph is a real six-line hexagram
  assert.equal(host().querySelector('.hx').querySelectorAll('.hx-line').length, 6);
});

test('the Altar renders the balance reading and closes', () => {
  const full = freshStory();
  full.lines = [true, true, true, true, true, true]; // Even Grove
  let closed = false;
  showAltar({ story: full, onClose: () => { closed = true; } });
  assert.match(host().querySelector('h2').textContent, /Balance Dial/);
  assert.match(host().textContent, /In balance/); // complete => in balance
  host().querySelector('#scr-back').click();
  assert.equal(closed, true);
});
