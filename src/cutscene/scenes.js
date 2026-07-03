// Story cutscene scripts — pure data, no three.js/DOM imports (unit-testable).
//
// Each scene is a declarative timeline the CutsceneDirector plays on the real
// 3D engine: voxel actors walk the grid, the camera glides, the island grays
// or blooms, and the story prose (the SAME i18n keys the old DOM cards used)
// appears in a tap-to-continue dialog bar. The child paces every page — no
// timers, no fail state, always skippable (DESIGN.md anti-anxiety contract).
//
// Scene shape:
//   { id, place: { rows, theme, seed, daylight, startGray }, camera: { to, span },
//     actors: [...], beats: [...] }
// A scene with `staged: true` has NO `place`/`camera` — the director plays it on
// the CURRENT live place (the hub), so the Crab King can interrupt the plaza
// funding on the island the child is standing on.
//
// Positions (resolved by director.resolvePos):
//   [x, z]                  literal grid cell
//   '@actorId'              an actor's current cell
//   { marker: 'M', dx, dz } a template marker (+offset) of the live place
//   { nearPlayer: n }       a free cell ~n steps from the player (0 = the player)
//
// Actors: { id, kind: 'char'|'creature'|'avatar', model, at, h?, look? }
//   'char'     → CHARS[model]        (mimi, crabKing, crab, monkey)
//   'creature' → getCreature(model)  (any pet roster friend)
//   'avatar'   → the child's own equipped explorer (their creature + fur + hat)
//
// Beats — BLOCKING (await): say, walk, pause. FIRE-AND-GLIDE: camera, turn,
// fx, sfx, emote (the scene flows on while they play out):
//   { say: i18nKey, who: 'mimi'|'crabking'|null, face: '🐒' }   tap to continue
//   { walk: actorId, to: POS }                                  grid-hop walk
//   { pause: ms }                                               short beat (capped)
//   { camera: POS, span?, ms?, follow?: true }                  glide the view
//   { turn: actorId, toward: POS }                              face something
//   { fx: 'gray'|'bloom'|'confetti'|'sparkle'|'shake'|'numbers', at?, ms?, level? }
//   { emote: actorId }                                          a little joy-hop
//   { sfx: name }                                               one audio.sfx cue

// A small cozy grove for the intro — plain floor ('.'), shade (','), and decor
// spots ('d') only, so every scripted cell below stays reliably walkable.
const GROVE_ROWS = [
  '################',
  '##,..d.....d,.##',
  '#..............#',
  '#..d.........d.#',
  '#..............#',
  '#..............#',
  '#..............#',
  '#.d..........d.#',
  '#..............#',
  '#..,.d....d.,..#',
  '##............##',
  '################',
];

// A narrow gray shore for the Crab King sighting (tide theme: sand + islets).
const SHORE_ROWS = [
  '##############',
  '###,.....d,.##',
  '#..........,.#',
  '#.d.........d#',
  '#............#',
  '#..,.d....,..#',
  '##..........##',
  '##############',
];

// An open square for the Four-Directions reveal — sparkles wake N/E/S/W.
const COMPASS_ROWS = [
  '#############',
  '##,..d.d..,##',
  '#...........#',
  '#.d.......d.#',
  '#...........#',
  '#...........#',
  '#...........#',
  '#.d.......d.#',
  '#...........#',
  '##,..d.d..,##',
  '#############',
];

export const CUTSCENES = {
  // Chapter 0 — "The One": the theft. Mimi and the child's own explorer stand
  // in the blooming grove; the Crab King scuttles in, pinches the numbers
  // (they visibly fly off), flees to the shore, and the island drains to gray.
  intro: {
    id: 'intro',
    place: { rows: GROVE_ROWS, theme: 'hub', seed: 11, daylight: 'golden' },
    camera: { to: [7, 5], span: 10 },
    actors: [
      { id: 'mimi', kind: 'char', model: 'mimi', at: [5, 5], look: [9, 7] },
      { id: 'hero', kind: 'avatar', at: [4, 7], look: [9, 7] },
      { id: 'crabKing', kind: 'char', model: 'crabKing', at: [13, 9], look: [5, 5] },
    ],
    beats: [
      { pause: 600 },
      { camera: '@crabKing', span: 8, ms: 900 },
      { walk: 'crabKing', to: [9, 6] },
      { say: 'story.1', who: 'mimi', face: '🐒' },
      { sfx: 'sparkle' },
      { fx: 'numbers', at: '@crabKing' },
      { emote: 'crabKing' },
      { pause: 700 },
      { turn: 'crabKing', toward: [13, 9] },
      { walk: 'crabKing', to: [13, 9] },
      { fx: 'gray', ms: 1600 },
      { camera: [7, 5], span: 10, ms: 900 },
      { say: 'story.2', who: 'mimi', face: '🌫️' },
      { camera: '@hero', span: 7, ms: 900 },
      { turn: 'mimi', toward: '@hero' },
      { say: 'story.3', who: 'mimi', face: '🐒' },
      { sfx: 'sparkle' },
      { fx: 'sparkle', at: '@hero' },
      { fx: 'bloom', level: 0.3, ms: 1200 },
      { say: 'story.4', who: 'mimi', face: '☯️' },
    ],
  },

  // The Four-Directions reveal (draws line 2): the compass wakes — one sparkle
  // per direction — and a first wash of colour returns to the gray square.
  reveal: {
    id: 'reveal',
    place: { rows: COMPASS_ROWS, theme: 'hub', seed: 22, daylight: 'morning', startGray: true },
    camera: { to: [6, 4], span: 9 },
    actors: [
      { id: 'mimi', kind: 'char', model: 'mimi', at: [6, 4], look: [6, 8] },
      { id: 'hero', kind: 'avatar', at: [5, 5], look: [6, 2] },
    ],
    beats: [
      { pause: 500 },
      { say: 'story.beat.reveal.1', who: 'mimi', face: '🧭' },
      { sfx: 'sparkle' },
      { fx: 'sparkle', at: [6, 1] },
      { pause: 450 },
      { fx: 'sparkle', at: [11, 4] },
      { pause: 450 },
      { fx: 'sparkle', at: [6, 8] },
      { pause: 450 },
      { fx: 'sparkle', at: [1, 4] },
      { sfx: 'bloom' },
      { fx: 'bloom', level: 0.4, ms: 1400 },
      { pause: 600 },
      { say: 'story.beat.reveal.2', who: 'mimi', face: '✨' },
    ],
  },

  // The Crab King sighting: a slow camera push across the gray shore to two
  // big pincers in the mist. He notices, holds still, and never comes closer.
  sighting: {
    id: 'sighting',
    place: { rows: SHORE_ROWS, theme: 'tide', seed: 33, daylight: 'morning', startGray: true },
    camera: { to: [4, 4], span: 8 },
    actors: [
      { id: 'mimi', kind: 'char', model: 'mimi', at: [3, 4], look: [11, 2] },
      { id: 'hero', kind: 'avatar', at: [2, 5], look: [11, 2] },
      { id: 'crabKing', kind: 'char', model: 'crabKing', at: [11, 2], look: [3, 4] },
    ],
    beats: [
      { pause: 600 },
      { camera: [9, 2], span: 6.5, ms: 1600 },
      { say: 'story.beat.sighting.1', who: null, face: '👀' },
      { turn: 'crabKing', toward: '@mimi' },
      { pause: 600 },
      { camera: [6, 3], span: 8, ms: 1100 },
      { say: 'story.beat.sighting.2', who: 'mimi', face: '🌫️' },
      { turn: 'crabKing', toward: [11, 1] },
    ],
  },

  // The finale — STAGED ON THE LIVE HUB: the Crab King interrupts the plaza
  // funding, walks up to the child, confesses, and pays half from his hoard.
  finale: {
    id: 'finale',
    staged: true,
    actors: [
      { id: 'crabKing', kind: 'char', model: 'crabKing', at: { nearPlayer: 4 }, look: { nearPlayer: 0 } },
    ],
    beats: [
      { sfx: 'boop' },
      { camera: '@crabKing', span: 8, ms: 800, follow: true },
      { walk: 'crabKing', to: { nearPlayer: 1 } },
      { say: 'finale.1', who: 'crabking', face: '🦀' },
      { say: 'finale.2', who: 'crabking', face: '🦀' },
      { emote: 'crabKing' },
      { sfx: 'coin' },
      { say: 'finale.3', who: 'crabking', face: '🦀' },
      { sfx: 'chest' },
      { fx: 'confetti', at: '@crabKing' },
      { say: 'finale.4', who: null, face: '🐵' },
    ],
  },
};
