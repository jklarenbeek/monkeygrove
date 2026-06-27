// Story-mode spine: the constants are cross-checked against the @yijingjs/core
// engine (so the cosmology can't drift), the founding hexagram builds line by
// line to After Completion, and narrative progress is decoupled from content
// difficulty (the age fix) — older kids' lower worlds are "remembered", younger
// kids' higher worlds stay future, and drawn lines only ever rise.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  yijing_isRoot, yijing_isCosmic, yijing_toWen,
  yijing_balance, yijing_lineCount,
} from '../src/yijing/yijing.js';
import { bagua_fromName, bagua_toWuxing } from '../src/yijing/bagua.js';
import { SKILLS, WORLDS } from '../src/mathengine.js';
import {
  FOUNDING_HEXAGRAM, LINE_BIT, LINE_POLARITY, FRIEND_TRIGRAMS,
  CHAPTERS, LINE_WORLD, NARRATIVE_LINES,
} from '../src/story/constants.js';
import {
  freshStory, ensureStory, worldBands, refreshStoryLines,
  drawNarrativeLine, islandHexagram, islandBloom, advancePhase, markBeat,
} from '../src/story/engine.js';
import { CHAPTER_LOOK, chapterForLine, lineCeremonies } from '../src/story/chapters.js';

// A masteryReport skeleton with a chosen set of mastered skill ids.
function reportWith(mastered = []) {
  const set = new Set(mastered);
  const worlds = {};
  for (const w of WORLDS) worlds[w] = { pct: 0, skills: [] };
  for (const id of Object.keys(SKILLS)) {
    worlds[SKILLS[id].world].skills.push({ id, mastered: set.has(id) });
  }
  return { worlds };
}
const worldSkills = (w) => Object.keys(SKILLS).filter((id) => SKILLS[id].world === w);
const allSkills = () => Object.keys(SKILLS);

// ---------------------------------------------------------------------------
// Constants cross-checked against the battle-tested engine.

test('the founding hexagram is After Completion, a cosmic root (King Wen #63)', () => {
  assert.equal(FOUNDING_HEXAGRAM, 42);
  assert.ok(yijing_isRoot(FOUNDING_HEXAGRAM));
  assert.ok(yijing_isCosmic(FOUNDING_HEXAGRAM));
  assert.equal(yijing_toWen(FOUNDING_HEXAGRAM), 63);
  assert.equal(yijing_lineCount(FOUNDING_HEXAGRAM), 3); // three yang, three yin
});

test('LINE_BIT is a permutation of the six bit positions', () => {
  assert.deepEqual([...LINE_BIT].sort((a, b) => a - b), [0, 1, 2, 3, 4, 5]);
});

test('lines alternate yang, yin, ... starting yang (bottom to top)', () => {
  assert.deepEqual(LINE_POLARITY, [1, 0, 1, 0, 1, 0]);
});

test('each Friend maps to its trigram exactly as the bagua engine encodes it', () => {
  assert.equal(FRIEND_TRIGRAMS.length, 8);
  const friends = new Set();
  const trigrams = new Set();
  for (const f of FRIEND_TRIGRAMS) {
    assert.equal(f.binary, bagua_fromName(f.trigram), `${f.friend} binary`);
    assert.equal(f.element, bagua_toWuxing(f.binary), `${f.friend} element`);
    friends.add(f.friend);
    trigrams.add(f.trigram);
  }
  assert.equal(friends.size, 8, 'eight distinct friends');
  assert.equal(trigrams.size, 8, 'eight distinct trigrams');
});

test('four math worlds and two narrative lines fill exactly the six lines', () => {
  assert.equal(Object.keys(LINE_WORLD).length, 4);
  assert.equal(NARRATIVE_LINES.length, 2);
  const idx = [...Object.keys(LINE_WORLD).map(Number), ...NARRATIVE_LINES].sort();
  assert.deepEqual(idx, [0, 1, 2, 3, 4, 5]);
  // every world line points at a real world
  for (const w of Object.values(LINE_WORLD)) assert.ok(WORLDS.includes(w));
  // the four chapters that own a world are exactly the math worlds
  const chapterWorlds = CHAPTERS.filter((c) => c.world).map((c) => c.world).sort();
  assert.deepEqual(chapterWorlds, [...WORLDS].sort());
});

// ---------------------------------------------------------------------------
// The founding hexagram builds line by line.

test('a fresh island is the fallen Kun-doubled (000000) and all lines drawn is After Completion', () => {
  const s = freshStory();
  assert.equal(islandHexagram(s), 0);
  s.lines = [true, true, true, true, true, true];
  assert.equal(islandHexagram(s), FOUNDING_HEXAGRAM);
  const bloom = islandBloom(s);
  assert.equal(bloom.complete, true);
  assert.equal(bloom.balance, 0.5);   // perfectly balanced
  assert.equal(bloom.entropy, 1.0);   // maximal entropy = balance
  assert.equal(bloom.wholeness, 1);
});

test('only the three yang world-lines move the hexagram value; yin lines hold at 0', () => {
  const s = freshStory();
  // draw the three yang worlds (tide=0, garden=2, vines=4) and nothing else
  s.lines = [true, false, true, false, true, false];
  assert.equal(islandHexagram(s), FOUNDING_HEXAGRAM);
  assert.equal(yijing_balance(islandHexagram(s)), 0.5);
  // adding the yin lines (stump=3, narrative 1 & 5) keeps the same value...
  s.lines = [true, true, true, true, true, true];
  assert.equal(islandHexagram(s), FOUNDING_HEXAGRAM);
});

// ---------------------------------------------------------------------------
// The age fix: narrative progress decoupled from content difficulty.

test('unconstrained (no curriculum): a world line draws on full mastery', () => {
  const s = freshStory();
  // master everything except vines
  const mastered = allSkills().filter((id) => SKILLS[id].world !== 'vines');
  const newly = refreshStoryLines(s, reportWith(mastered), []);
  // tide(0), garden(2), stump(3) drawn; vines(4) not
  assert.deepEqual(newly, [0, 2, 3]);
  assert.deepEqual(s.lines, [true, false, true, true, false, false]);
});

test('older child: worlds below the band are "remembered" and draw for free', () => {
  const s = freshStory();
  const eligible = worldSkills('vines'); // grade band sits at fractions only
  const bands = worldBands(reportWith([]), eligible);
  assert.equal(bands.tide.band, 'below');
  assert.equal(bands.garden.band, 'below');
  assert.equal(bands.stump.band, 'below');
  assert.equal(bands.vines.band, 'in');
  assert.equal(bands.tide.satisfied, true);   // remembered — no baby math required
  assert.equal(bands.vines.satisfied, false); // still has to be mastered in-band

  // refresh draws the three remembered world lines immediately, not vines
  const newly = refreshStoryLines(s, reportWith([]), eligible);
  assert.deepEqual(newly, [0, 2, 3]);
  // ...and vines lights once its in-band skills are mastered
  const after = refreshStoryLines(s, reportWith(worldSkills('vines')), eligible);
  assert.deepEqual(after, [4]);
  assert.deepEqual(s.lines, [true, false, true, true, true, false]);
});

test('younger child: worlds above the band stay future (not drawn for free)', () => {
  const s = freshStory();
  const eligible = worldSkills('tide');
  const bands = worldBands(reportWith([]), eligible);
  assert.equal(bands.tide.band, 'in');
  assert.equal(bands.garden.band, 'above');
  assert.equal(bands.vines.band, 'above');
  assert.equal(bands.vines.satisfied, false);
  // nothing draws until tide is mastered; higher worlds never draw for free
  assert.deepEqual(refreshStoryLines(s, reportWith([]), eligible), []);
  assert.deepEqual(refreshStoryLines(s, reportWith(worldSkills('tide')), eligible), [0]);
});

test('drawn lines only ever rise — a later weaker report never un-draws', () => {
  const s = freshStory();
  refreshStoryLines(s, reportWith(allSkills()), []);
  assert.deepEqual(s.lines.slice(0, 1).concat(s.lines[2], s.lines[3], s.lines[4]), [true, true, true, true]);
  // mastery collapses (decay) — lines stay drawn
  const newly = refreshStoryLines(s, reportWith([]), []);
  assert.deepEqual(newly, []);
  assert.equal(s.lines[0] && s.lines[2] && s.lines[3] && s.lines[4], true);
});

// ---------------------------------------------------------------------------
// Narrative lines, phase, beats, healing.

test('narrative lines can only be drawn through the beat, not earned by mastery', () => {
  const s = freshStory();
  // refreshStoryLines never touches narrative indices even with everything mastered
  refreshStoryLines(s, reportWith(allSkills()), []);
  assert.equal(s.lines[1], false);
  assert.equal(s.lines[5], false);
  // a world line index is refused by drawNarrativeLine
  assert.equal(drawNarrativeLine(s, 0), false);
  // the two narrative lines accept exactly one draw each
  assert.equal(drawNarrativeLine(s, 1), true);
  assert.equal(drawNarrativeLine(s, 1), false);
  assert.equal(drawNarrativeLine(s, 5), true);
});

test('phase only advances; beats record once', () => {
  const s = freshStory();
  assert.equal(advancePhase(s, 3), true);
  assert.equal(s.phase, 3);
  assert.equal(advancePhase(s, 2), false); // never goes back
  assert.equal(advancePhase(s, 99), true); // clamped to the last chapter
  assert.equal(s.phase, 6);
  assert.equal(markBeat(s, 'theft'), true);
  assert.equal(markBeat(s, 'theft'), false);
});

// ---------------------------------------------------------------------------
// Chapter presentation + ceremony planning.

test('every chapter has a look, and each line maps back to its chapter', () => {
  for (const c of CHAPTERS) assert.ok(CHAPTER_LOOK[c.key], `look for ${c.key}`);
  assert.equal(chapterForLine(0).world, 'tide');
  assert.equal(chapterForLine(0).key, 'liangyi');
  assert.equal(chapterForLine(1).world, null);     // narrative line
  assert.equal(chapterForLine(4).world, 'vines');
});

test('a single mastered world is one warm "earned" ceremony with its friend', () => {
  const events = lineCeremonies([0], { tide: 'earned' });
  assert.equal(events.length, 1);
  assert.equal(events[0].kind, 'earned');
  assert.equal(events[0].world, 'tide');
  assert.equal(events[0].lineIndex, 0);
  assert.equal(events[0].friend, 'duckling');
});

test('a multi-world remembered catch-up collapses into one gentle beat', () => {
  const events = lineCeremonies([0, 2, 3], {
    tide: 'remembered', garden: 'remembered', stump: 'remembered',
  });
  assert.equal(events.length, 1);
  assert.equal(events[0].kind, 'remembered_batch');
  assert.deepEqual(events[0].worlds, ['tide', 'garden', 'stump']);
  assert.deepEqual(events[0].lineIndices, [0, 2, 3]);
});

test('one remembered world is not batched; mixed batches lead with the remembered', () => {
  assert.equal(lineCeremonies([0], { tide: 'remembered' })[0].kind, 'remembered');
  const mixed = lineCeremonies([0, 4], { tide: 'remembered', vines: 'earned' });
  assert.deepEqual(mixed.map((e) => e.kind), ['remembered', 'earned']);
  assert.equal(mixed[1].world, 'vines');
});

test('narrative line indices produce no mastery ceremony', () => {
  assert.deepEqual(lineCeremonies([1, 5], {}), []);
});

test('ensureStory heals a save that predates story mode', () => {
  const p = {};
  const story = ensureStory(p);
  assert.deepEqual(story, freshStory());
  // partial / corrupt lines are repaired
  p.story = { lines: [true], phase: 2 };
  const healed = ensureStory(p);
  assert.equal(healed.lines.length, 6);
  assert.equal(healed.phase, 2);
  assert.ok(Array.isArray(healed.beats));
});
