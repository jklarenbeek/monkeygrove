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
  storyProgressReport, storyFinaleReady,
} from '../src/story/engine.js';
import {
  CHAPTER_LOOK, chapterForLine, lineCeremonies, dueNarrativeBeat, NARRATIVE_BEATS,
} from '../src/story/chapters.js';
import { echoShadow, neighborHexes, stepDistance, isGentleStep } from '../src/story/pacing.js';

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

test('the three yang lines read as balanced but NOT complete — the finale is still owed', () => {
  const s = freshStory();
  // the yang trio alone already spells 42, so a value-only check would lie here
  s.lines = [true, false, true, false, true, false];
  const b = islandBloom(s);
  assert.equal(b.hexagram, FOUNDING_HEXAGRAM);
  assert.equal(b.balance, 0.5);        // perfectly balanced...
  assert.equal(b.isRoot, true);
  assert.equal(b.complete, false);     // ...but only 3/6 lines are home
  assert.equal(b.wholeness, 0.5);
  // even at 5/6 (lines 1-5 home, the finale still owed) it must not say "complete"
  s.lines = [true, true, true, true, true, false];
  assert.equal(islandBloom(s).complete, false);
  assert.equal(islandBloom(s).wholeness, 5 / 6);
  // only all six lines is complete
  s.lines = [true, true, true, true, true, true];
  assert.equal(islandBloom(s).complete, true);
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

test('worldBands: a curriculum gap world is "remembered", never a soft-lock', () => {
  // eligible in tide (0) and stump (2), nothing in garden (1) -> garden is a gap
  const eligible = [...worldSkills('tide'), ...worldSkills('stump')];
  const bands = worldBands(reportWith([]), eligible);
  assert.equal(bands.tide.band, 'in');
  assert.equal(bands.garden.band, 'below');  // gap beneath the frontier -> drawn free, not stuck
  assert.equal(bands.stump.band, 'in');
  assert.equal(bands.vines.band, 'above');   // beyond the frontier -> future
});

test('worldBands: an empty / unmapped band falls back to full mastery (no soft-lock)', () => {
  const bands = worldBands(reportWith([]), ['no_such_skill']);
  for (const w of WORLDS) assert.equal(bands[w].band, 'in');
});

// ---------------------------------------------------------------------------
// The age fix, completed: the finale must be REACHABLE for an older child and
// can only land on a whole hexagram.

test('storyFinaleReady is true exactly when lines 1-5 are home (line 6 is the finale)', () => {
  const s = freshStory();
  assert.equal(storyFinaleReady(s), false);
  s.lines = [true, true, true, true, true, false];
  assert.equal(storyFinaleReady(s), true);
  s.lines = [true, true, true, false, true, false]; // a hole at line 4
  assert.equal(storyFinaleReady(s), false);
});

test('storyProgressReport credits remembered worlds so the festival/finale is reachable', () => {
  // older child: band sits at fractions; tide/garden/stump are below (remembered)
  const eligible = worldSkills('vines');
  const report = reportWith(worldSkills('vines'));
  report.worlds.vines.pct = 1; // vines fully mastered; lower worlds content-gated -> pct 0
  const raw = WORLDS.reduce((sum, w) => sum + report.worlds[w].pct, 0);
  assert.ok(raw < 3.4, `raw progress ${raw} can never reach the plaza (3.4)`);
  const credited = WORLDS.reduce((sum, w) => sum + storyProgressReport(report, eligible).worlds[w].pct, 0);
  assert.ok(credited >= 3.4, `band-aware progress ${credited} reaches the plaza`);
  // a young child (no below-band worlds) is returned unchanged
  const young = reportWith([]);
  const adj = storyProgressReport(young, worldSkills('tide'));
  for (const w of WORLDS) assert.equal(adj.worlds[w].pct, young.worlds[w].pct);
});

test('finale backfill: latching world lines + narratives yields a whole hexagram', () => {
  const s = freshStory();
  const eligible = worldSkills('vines');
  // older child at the festival: lower worlds remembered, vines mastered
  refreshStoryLines(s, reportWith(worldSkills('vines')), eligible);
  assert.equal(storyFinaleReady(s), false);     // the reveal (line 2) is still owed
  drawNarrativeLine(s, 1);                       // backfill the reveal
  assert.equal(storyFinaleReady(s), true);
  drawNarrativeLine(s, 5);                       // the finale
  assert.deepEqual(s.lines, [true, true, true, true, true, true]);
  assert.equal(islandBloom(s).complete, true);
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

test('the reveal beat is due once the first shore is home, then never again', () => {
  const s = freshStory();
  assert.equal(dueNarrativeBeat(s), null);          // nothing drawn yet
  s.lines[0] = true;                                // tide line home
  assert.equal(dueNarrativeBeat(s), 'reveal');
  drawNarrativeLine(s, NARRATIVE_BEATS.reveal.lineIndex);
  assert.equal(dueNarrativeBeat(s), null);          // reveal already drawn
});

test('narrative beats point at the two narrative lines', () => {
  assert.equal(NARRATIVE_BEATS.reveal.lineIndex, 1);
  assert.equal(NARRATIVE_BEATS.finale.lineIndex, 5);
  assert.ok(NARRATIVE_BEATS.reveal.pages.length >= 1);
});

// ---------------------------------------------------------------------------
// Pacing & reflection helpers (the Gray Echo Realm + the gentle ramp).

test('the Echo Realm is the island inverted, and roots invert to roots', () => {
  assert.equal(echoShadow(0), 63);                  // all-yin -> all-yang
  assert.equal(echoShadow(FOUNDING_HEXAGRAM), 21);  // After Completion <-> Before Completion (both roots)
  assert.equal(echoShadow(echoShadow(42)), 42);     // inversion is its own undo
});

test('the gentle ramp is a one-line (gray-code) step', () => {
  const six = neighborHexes(FOUNDING_HEXAGRAM);
  assert.equal(six.length, 6);
  for (const n of six) {
    assert.equal(stepDistance(FOUNDING_HEXAGRAM, n), 1, 'each neighbour is one line away');
    assert.equal(isGentleStep(FOUNDING_HEXAGRAM, n), true);
  }
  assert.equal(isGentleStep(0, 63), false);         // the whole flip is NOT gentle
  assert.equal(stepDistance(0, 63), 6);
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

test('ensureStory coerces corrupt shapes (truthy-string lines, out-of-range phase, junk beats)', () => {
  const p = {
    story: {
      lines: ['yes', 1, {}, 0, '', false], // 6 long but NONE are literal true
      phase: 99,
      beats: [1, 'theft', null, 'reveal'],
      crabKingReconciled: 'sure',
    },
  };
  const s = ensureStory(p);
  assert.deepEqual(s.lines, [false, false, false, false, false, false]); // no truthy string reads as drawn
  assert.equal(islandBloom(s).complete, false);                          // so the island can't fake "whole"
  assert.equal(s.phase, 6);                  // clamped down to LAST_CHAPTER
  assert.deepEqual(s.beats, ['theft', 'reveal']); // only string ids survive
  assert.equal(s.crabKingReconciled, false); // coerced to a real boolean

  // a genuinely-drawn line survives; a negative phase clamps up; line 6 alone is not complete
  const p2 = { story: { lines: [true, false, false, false, false, false], phase: -5 } };
  const s2 = ensureStory(p2);
  assert.equal(s2.lines[0], true);
  assert.equal(s2.phase, 0);

  // an array masquerading as the story object is replaced wholesale
  const p3 = { story: [] };
  assert.deepEqual(ensureStory(p3), freshStory());
});
