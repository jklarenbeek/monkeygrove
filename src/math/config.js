// Math engine — worlds, skill ladder, tuning constants, and the fresh-state
// factory. This is the shared vocabulary every other math/* module builds on:
// pure data, no DOM, no three.js, no clock. Keep it dependency-free (a leaf
// module) so config can be imported anywhere without risking an import cycle.

// The four story worlds — each maps to one line of the founding hexagram (story
// constants LINE_WORLD), so this list is load-bearing for the cosmology and stays four.
export const WORLDS = ['tide', 'garden', 'stump', 'vines'];

// The business world is a FIFTH skill group that lives OUTSIDE the six-line hexagram:
// it holds the upper-grade decimals/%/scale adaptive skills (SUPER_PROMPT Phase 2,
// the Tree's precision/proportion paths, world: 'business'). It is deliberately not in
// WORLDS, so the four story worlds' mastery gates, the island progress points, and the
// six story lines are untouched; masteryReport surfaces it under its own `business`
// group for the parent dashboard and curriculum coverage.
export const BUSINESS_WORLD = 'business';

export const LADDER = {
  // tide grew the bottom (counting, number bonds — grades 1-2) and the top
  // (big_numbers — grade 8 place value) of the number-sense world, filling the two
  // ends of the Tree the 64-step ladder names (docs/04; SUPER_PROMPT Phase 1). Order
  // is the in-world climb; the canonical cross-grade sequence lives in curriculum/ladder.js.
  tide: ['counting', 'number_bonds', 'add_20', 'sub_20', 'missing_addend', 'add_100', 'sub_100', 'big_numbers'],
  garden: ['tables_a', 'tables_b', 'tables_c', 'tables_mix', 'mult_2digit'],
  stump: ['div_facts', 'share', 'div_remainder', 'missing_factor'],
  vines: ['frac_magnitude', 'frac_compare', 'frac_equiv', 'frac_of_n'],
  // Phase 2: decimals/%/scale as first-class adaptive maths (groep 6-8). These feed the
  // business-world Tree paths and the parent coverage, not the four story worlds.
  business: ['dec_compare', 'dec_addsub', 'dec_muldiv', 'frac_dec_pct', 'percent_of', 'percent_adv', 'scale'],
};

// All worlds that carry skills (the four story worlds + the business group). SKILLS is
// built from this so the business skills are real, generatable, and rated; only the
// story-coupled systems read the four-world WORLDS.
export const ALL_WORLDS = Object.keys(LADDER);

export const SKILLS = {};
for (const world of ALL_WORLDS) {
  LADDER[world].forEach((id, order) => {
    SKILLS[id] = {
      id,
      world,
      order,
      // Prereq chains are strictly linear inside a world; cross-world: none.
      prereqs: order === 0 ? [] : [LADDER[world][order - 1]],
      nameKey: `skill.${id}`,
    };
  });
}

export const START_RATING = 600;
export const MASTERY_RATING = 850;
export const MASTERY_ACC = 0.8;
export const MASTERY_MIN_N = 10;
export const HIST_MAX = 10;
export const LOG_MAX = 200;
export const TARGET_OFFSET = 108; // expected ≈ 0.65 when item sits this far under rating
export const COLD_N = 8;

// Forgetting curve (TODO_09). A skill's rating drifts back toward the START
// baseline the longer it goes unpracticed, so "mastered" comes to mean *recently*
// mastered and Echo Doors re-target genuinely-fading skills. Deliberately gentle:
// a grace window then a long half-life, so a week away barely nudges while a
// couple of months clearly fades a once-mastered skill back into review range.
// It only ever pulls DOWN toward the floor (a struggling skill below the floor is
// never inflated), and never below a fresh start. Computed lazily from elapsed
// days — never on a timer — so it behaves identically for offline play.
export const DAY_MS = 86400000;
export const DECAY_FLOOR = START_RATING;     // rust never drops a skill below a fresh start
export const DECAY_GRACE_DAYS = 2;           // just-practiced still counts as fresh
export const DECAY_HALFLIFE_DAYS = 60;       // slow on purpose — far slower than Elo gain

export function createMathState() {
  const skills = {};
  for (const id of Object.keys(SKILLS)) skills[id] = { r: START_RATING, n: 0, hist: [] };
  return { skills, facts: {}, log: [] };
}
