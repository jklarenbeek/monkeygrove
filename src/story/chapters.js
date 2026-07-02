// Story-mode presentation + ceremony planning — pure logic (no DOM/three).
//
// constants.js owns the cosmology (which line is which world/trigram). THIS file
// owns how a chapter is *shown*: the face emoji, the friend that returns, and the
// pure plan for what line-draw ceremony to play when one or more lines light up.
//
// Child-safe by construction: the only text is i18n KEYS (resolved in the screen
// layer), never school words. Names come from each chapter's "Localization" table
// in docs/story/CHAPTER_NN.md.
import { CHAPTERS } from './constants.js';

// Per-chapter look. `friend` (a mesh/creatures id) is the companion that comes
// home when a math world's line is drawn — flavour, chosen from docs README §3:
//   tide=water/tides (duckling), garden=skip-counting tables (kitten),
//   stump=sharing evenly (piglet), vines=estimation/ratios (owl).
// Narrative chapters (taiji/sixiang/roots) have no single friend.
export const CHAPTER_LOOK = {
  taiji:   { face: '☯️', friend: null },
  liangyi: { face: '🌊', friend: 'duckling' },
  sixiang: { face: '🧭', friend: null },
  bagua:   { face: '🌱', friend: 'kitten' },
  wuxing:  { face: '🥥', friend: 'piglet' },
  gua:     { face: '🍇', friend: 'owl' },
  roots:   { face: '🎪', friend: 'crab' },
};

const CHAPTER_BY_LINE = {};
for (const c of CHAPTERS) if (c.lineIndex != null) CHAPTER_BY_LINE[c.lineIndex] = c;

export const chapterForLine = (lineIndex) => CHAPTER_BY_LINE[lineIndex] || null;

// The story-beat cards and how they are shown. Their prose pages live in i18n
// under story.beat.<id>.* (child-safe). Beats WITH a lineIndex draw a narrative
// line: `reveal` (line 2, the Four Directions) fires once the first shore is
// home; `finale` (line 6, the yielding top line) is drawn by the Crab King
// festival flow, not auto-triggered. Beats with lineIndex null draw nothing —
// they are the mid-game mystery drip: `sighting` (the Crab King watching from
// the gray shore, once the Eight are home) and `echo` (the Gray Echo Realm
// intro, played once before the first Echo Door; shadow:true renders the
// island's INVERSION — echoShadow — instead of the founding hexagram).
export const NARRATIVE_BEATS = {
  reveal:   { lineIndex: 1, pages: ['story.beat.reveal.1', 'story.beat.reveal.2'], faces: ['🧭', '✨'] },
  sighting: { lineIndex: null, pages: ['story.beat.sighting.1', 'story.beat.sighting.2'], faces: ['🦀', '🌫️'] },
  echo:     { lineIndex: null, shadow: true, pages: ['story.beat.echo.1', 'story.beat.echo.2'], faces: ['🌫️', '✨'] },
  finale:   { lineIndex: 5, pages: ['finale.1', 'finale.2', 'finale.3', 'finale.4'], faces: ['🦀', '🦀', '🦀', '🐵'] },
};

// Which narrative beat is due to play now, or null. Only `reveal` auto-fires
// (after the Tide line is drawn and before its own line is). The finale is gated
// on the plaza build, so the hub flow triggers it explicitly — never here.
export function dueNarrativeBeat(story) {
  if (story.lines[0] && !story.lines[1]) return 'reveal';
  return null;
}

// The Crab King sighting is due once the garden line (Ch03, the Eight Friends)
// is home and the beat has not played — the mid-game glimpse that keeps the
// mystery alive between the theft and the confession. The caller marks the
// beat when it actually shows (so a silent bootstrap never consumes it).
export function dueSightingBeat(story) {
  return story.lines[2] && !story.beats.includes('crab_sighting');
}

// Plan the ceremony for a batch of newly-drawn line indices.
//
// `kindByWorld` maps a world id -> 'earned' (mastered in the child's band) or
// 'remembered' (a world below their band that drew itself). A single mastery is
// one warm beat. A first-entry catch-up (an older child whose lower worlds all
// "remember" at once) is collapsed into ONE gentle "you already know these
// shores" beat instead of a pile of pop-ups — anti-overwhelm, like the rest of
// the game. Returns an ordered array of ceremony events the screen renders:
//   { kind:'earned',      lineIndex, chapterKey, world, friend, face }
//   { kind:'remembered',  lineIndex, chapterKey, world, friend, face }
//   { kind:'remembered_batch', lineIndices:[…], worlds:[…], face:'✨' }
export function lineCeremonies(newly = [], kindByWorld = {}) {
  const events = [];
  const remembered = [];
  for (const lineIndex of [...newly].sort((a, b) => a - b)) {
    const c = chapterForLine(lineIndex);
    if (!c || !c.world) continue; // narrative lines are drawn by their own beat
    const look = CHAPTER_LOOK[c.key] || {};
    const kind = kindByWorld[c.world] === 'remembered' ? 'remembered' : 'earned';
    const event = {
      kind, lineIndex, chapterKey: c.key, world: c.world,
      friend: look.friend || null, face: look.face || '✨',
    };
    if (kind === 'remembered') remembered.push(event);
    else events.push(event);
  }
  if (remembered.length === 1) {
    events.unshift(remembered[0]);
  } else if (remembered.length > 1) {
    events.unshift({
      kind: 'remembered_batch',
      lineIndices: remembered.map((e) => e.lineIndex),
      worlds: remembered.map((e) => e.world),
      face: '✨',
    });
  }
  return events;
}
