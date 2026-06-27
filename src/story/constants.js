// Story-mode spine — the canonical, single-source mapping that turns the four
// math worlds into "The Book of Banana Changes" (see docs/story/README.md).
//
// This file is PURE DATA + tiny lookups: no DOM, no three.js, no engine state.
// It is the one place the chapter <-> world <-> hexagram-line <-> trigram <->
// friend tables live, so the scattered per-world tables never have to grow a
// sixth copy. The numbers here are cross-checked against the battle-tested
// @yijingjs/core engine in tests/story.test.mjs — if the cosmology drifts, a
// test fails rather than the meaning quietly rotting.
//
// AUTHOR/PARENT vocabulary only (yijing, trigram, line, hexagram). None of these
// strings reach the child UI — the child hears "the One, the Two Modes, the Four
// Directions, the Eight Friends, the Wheel, the Great Grid, the Balance" via i18n.

// ---------------------------------------------------------------------------
// The founding hexagram.
//
// The island falls to Kun-doubled (000000, all yin, entropy 0). Each numbered
// chapter restores ONE line, bottom -> top, alternating yang/yin, until the six
// lines spell Ji Ji / "After Completion" (King Wen #63), which is decimal 42 and
// one of the four cosmic roots. yijing_isRoot(42) === true; yijing_toWen(42) === 63.
export const FOUNDING_HEXAGRAM = 42; // 0b101010 = Water over Fire = After Completion

// Line index 0..5 maps to bottom..top line. yijingjs packs the lower trigram
// (lines 1-3) into bits 3-5 and the upper trigram (lines 4-6) into bits 0-2, so
// the bottom-to-top line order is NOT the bit order. This table is that mapping;
// it is verified against FOUNDING_HEXAGRAM in the tests.
export const LINE_BIT = [3, 4, 5, 0, 1, 2];

// The target yang(1)/yin(0) value each line settles to in the founding hexagram.
// Derived from FOUNDING_HEXAGRAM so it can never disagree with it.
export const LINE_POLARITY = LINE_BIT.map((bit) => (FOUNDING_HEXAGRAM >> bit) & 1);

// ---------------------------------------------------------------------------
// The seven chapters (docs/story/README.md section 2).
//
// Chapters 0 and 6 frame the arc; chapters 1-5 are the doubling 2->4->8->5->64.
// Four of the six restorable lines are MATH WORLDS (their line is drawn by
// mastery); two are NARRATIVE lines (the Four-Directions reveal and the Festival
// finale) whose draw is a story beat, not a math gate.
//
//   line | chapter | world  | polarity | how it is drawn
//   -----+---------+--------+----------+------------------
//     1  |  Ch01   | tide   |  yang    | mastery (band-aware)
//     2  |  Ch02   |  —     |  yin     | narrative (the reveal)
//     3  |  Ch03   | garden |  yang    | mastery (band-aware)
//     4  |  Ch04   | stump  |  yin     | mastery (band-aware)
//     5  |  Ch05   | vines  |  yang    | mastery (band-aware)
//     6  |  Ch06   |  —     |  yin     | narrative (the finale)
export const CHAPTERS = [
  { ch: 0, key: 'taiji',   line: null, lineIndex: null, world: null,     narrative: true  },
  { ch: 1, key: 'liangyi', line: 1,    lineIndex: 0,    world: 'tide',   narrative: false },
  { ch: 2, key: 'sixiang', line: 2,    lineIndex: 1,    world: null,     narrative: true  },
  { ch: 3, key: 'bagua',   line: 3,    lineIndex: 2,    world: 'garden', narrative: false },
  { ch: 4, key: 'wuxing',  line: 4,    lineIndex: 3,    world: 'stump',  narrative: false },
  { ch: 5, key: 'gua',     line: 5,    lineIndex: 4,    world: 'vines',  narrative: false },
  { ch: 6, key: 'roots',   line: 6,    lineIndex: 5,    world: null,     narrative: true  },
];

export const LAST_CHAPTER = CHAPTERS[CHAPTERS.length - 1].ch;

// lineIndex (0..5) -> world id, for the four lines a math world draws.
export const LINE_WORLD = {};
// world id -> lineIndex, the inverse.
export const WORLD_LINE = {};
// lineIndex values that are drawn by narrative beat, not by mastery.
export const NARRATIVE_LINES = [];
for (const c of CHAPTERS) {
  if (c.lineIndex == null) continue;
  if (c.world) {
    LINE_WORLD[c.lineIndex] = c.world;
    WORLD_LINE[c.world] = c.lineIndex;
  } else {
    NARRATIVE_LINES.push(c.lineIndex);
  }
}

// ---------------------------------------------------------------------------
// The Eight Friends are the Eight Trigrams (docs/story/README.md section 3).
//
// `friend` ids are the existing mesh/creatures roster (one source of truth in
// src/mesh/creatures.js); `trigram`/`binary`/`element` are cross-checked against
// @yijingjs/core/bagua in the tests so this table can't drift from the engine.
// Mimi (the Taiji memory) and the player's monkey (the moving line) are NOT here.
export const FRIEND_TRIGRAMS = [
  { friend: 'dragon',   trigram: 'qian', glyph: '☰', binary: 0b111, element: 'metal' },
  { friend: 'turtle',   trigram: 'kun',  glyph: '☷', binary: 0b000, element: 'earth' },
  { friend: 'kitten',   trigram: 'zhen', glyph: '☳', binary: 0b100, element: 'wood'  },
  { friend: 'duckling', trigram: 'kan',  glyph: '☵', binary: 0b010, element: 'water' },
  { friend: 'redpanda', trigram: 'gen',  glyph: '☶', binary: 0b001, element: 'earth' },
  { friend: 'owl',      trigram: 'xun',  glyph: '☴', binary: 0b011, element: 'wood'  },
  { friend: 'piglet',   trigram: 'li',   glyph: '☲', binary: 0b101, element: 'fire'  },
  { friend: 'bunny',    trigram: 'dui',  glyph: '☱', binary: 0b110, element: 'metal' },
];

const _friendByTrigram = {};
const _trigramByFriend = {};
for (const f of FRIEND_TRIGRAMS) {
  _friendByTrigram[f.trigram] = f;
  _trigramByFriend[f.friend] = f;
}
export const friendForTrigram = (trigram) => _friendByTrigram[trigram] || null;
export const trigramForFriend = (friend) => _trigramByFriend[friend] || null;
