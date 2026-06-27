// @vitest-environment happy-dom
// Real-DOM coverage of the line-draw ceremony screen: it renders the founding
// hexagram + balance dial, steps through each event, and calls onDone at the end.
// happy-dom is the only layer that catches a render/innerHTML throw the pure
// chapter tests can't.
import { test, beforeEach } from 'vitest';
import assert from 'node:assert/strict';
import { setLang } from '../src/i18n.js';
import { showLineCeremony } from '../src/screens.js';
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

  host().querySelector('#story-next').click(); // only one event -> done
  assert.equal(done, true);
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
