// Monkey Grove math engine — pure logic, no DOM, no three.js, and no ambient
// entropy or clock: callers inject the rng (nextProblem) and the timestamp
// (recordResult), so every output is reproducible from its inputs.
// Owns the profile.math subtree: per-skill Elo-lite ratings, times-table fact
// gems (Banyan Gem Tree), and a ring-buffer practice log.
//
// This is the public barrel. The engine is split under src/math/ (TODO_12):
//   config.js       worlds, skill ladder, tuning constants, createMathState
//   rating.js       Elo / forgetting-decay / mastery scalar math
//   choices.js      distractor pools + problem-construction helpers
//   generators/*    per-skill problem generators, split by math domain
//   selection.js    skill selection + nextProblem (the main entry point)
//   results.js      scoring, fact gems, masteryReport
//
// Pedagogy notes (docs/01-learn.md, docs/02-adaptive.md):
// - Items are parameterized; params are chosen so expected success ≈ 0.6–0.7
//   by targeting an item difficulty ~108 Elo points under the skill rating.
// - Every fetch distractor is misconception-tagged so the UI can materialize
//   the right visual model and Mimi can explain the *specific* error.
// - Scaffold fades with rating (0 model visible, 1 on demand, 2 bare).
// - frac_compare design: FOUR fraction choices, find the LARGEST (richer
//   misconception distractors than a pair comparison). Equation shows the
//   candidates in stone order: '2/5 · 1/2 · 3/4 · 1/8 → ?'.

export {
  WORLDS, BUSINESS_WORLD, ALL_WORLDS, SKILLS, createMathState,
} from './math/config.js';
export { expectedSuccess } from './math/rating.js';
export { skillSupportsKind, nextProblem } from './math/selection.js';
export {
  recordResult, recordCalibration, reinforceSkill, masteryReport, FACT_SKILLS,
} from './math/results.js';
