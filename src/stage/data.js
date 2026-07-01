// Music-stage minigame data — Kiki the Kitten's stage. Three "songs", each a distinct
// game that quietly practices real arithmetic, gated by the child's grade so difficulty
// ramps along the journey (SUPER_PROMPT: the music stage IS skip-counting rhythm; see
// src/story/wonders.js `music_skip_count`). Pure data + tiny lookups — no DOM, no three.js.
//
//   echo  — Echo Song: repeat back Kiki's growing note pattern (sequence memory & order).
//   count — Counting Song: ring the gong on the beats that land on a multiple (skip counting).
//   beat  — Beat Bar: fill one bar from note values that must add to a whole (fractions).
//
// Grading + round generation live in ./engine.js. Screen labels/controls in
// ../screens/stage.js. Keep the round shapes here in sync with both.

export const STAGE_ORDER = {
  grade_1: 1, grade_2: 2, grade_3: 3, grade_4: 4,
  grade_5: 5, grade_6: 6, grade_7: 7, grade_8: 8,
};

// The three songs, in unlock order. minStage gates the song on the child's grade so the
// stage grows harder as they climb. objectiveId ties each song to an NL_PO objective for
// parent coverage (the mode reinforces it; see ../curriculum/index.js stageCoverage).
export const STAGE_MODES = {
  echo: {
    id: 'echo', kind: 'sequence', minStage: 'grade_1',
    titleKey: 'stage.song.echo', face: '🎵',
    objectiveId: 'nl_po.grade1.counting_and_order',
  },
  count: {
    id: 'count', kind: 'skip', minStage: 'grade_3',
    titleKey: 'stage.song.count', face: '🔔',
    objectiveId: 'nl_po.grade4.tables_2_5_10',
  },
  beat: {
    id: 'beat', kind: 'notevalue', minStage: 'grade_5',
    titleKey: 'stage.song.beat', face: '🥁',
    objectiveId: 'nl_po.grade6.fraction_magnitude',
  },
};

export const STAGE_MODE_IDS = Object.keys(STAGE_MODES);

// Four coloured gong pads for the Echo Song, each a pentatonic note so any pattern
// sounds nice (C E G C — a warm major triad + octave).
export const ECHO_PADS = [
  { id: 0, color: '#ff9db0', midi: 60 },
  { id: 1, color: '#ffd166', midi: 64 },
  { id: 2, color: '#8ecae6', midi: 67 },
  { id: 3, color: '#a0e8af', midi: 72 },
];

// Skip-count step pools by grade band: easy landmark counts first (2s, 5s, 10s), then
// the middle tables, then the hard ones. nextStageRound picks a step from the band ≤ the
// child's grade so a grade-8 child still sees the easy ones sometimes (spaced review).
export const COUNT_STEPS = [
  { minStage: 'grade_3', steps: [2, 5, 10] },
  { minStage: 'grade_5', steps: [3, 4, 6] },
  { minStage: 'grade_6', steps: [7, 8, 9] },
];

// Note-value tiles for the Beat Bar. value is in twenty-fourths of a whole bar (LCM of
// 1/2, 1/3, 1/4, 1/6, 1/8 = 24), so every sum stays an exact integer — no float drift.
// A whole bar is WHOLE_BAR units. num/den are the child-facing fraction label.
export const WHOLE_BAR = 24;
export const NOTE_TILES = {
  whole: { id: 'whole', units: 24, num: 1, den: 1, icon: '𝅝' },
  half: { id: 'half', units: 12, num: 1, den: 2, icon: '𝅗𝅥' },
  third: { id: 'third', units: 8, num: 1, den: 3, icon: '⅓' },
  quarter: { id: 'quarter', units: 6, num: 1, den: 4, icon: '𝅘𝅥' },
  sixth: { id: 'sixth', units: 4, num: 1, den: 6, icon: '⅙' },
  eighth: { id: 'eighth', units: 3, num: 1, den: 8, icon: '𝅘𝅥𝅮' },
};

// Which note tiles a grade may use — halves & quarters first, then the finer values.
export const BEAT_TILES = [
  { minStage: 'grade_5', tiles: ['half', 'quarter'] },
  { minStage: 'grade_6', tiles: ['half', 'quarter', 'eighth'] },
  { minStage: 'grade_7', tiles: ['half', 'third', 'quarter', 'sixth', 'eighth'] },
];

export const stageOrder = (stageId) => STAGE_ORDER[stageId] ?? 4;
