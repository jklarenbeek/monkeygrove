// Memory Grove — the anchor-image catalog (docs/06 §4.3). Pure data, no DOM.
//
// Each anchor pairs one hard times-table fact with one island landmark (a locus)
// and a bilingual "silly picture" story (the i18n key holds EN + NL copy). The
// method of loci needs a place + a vivid image; the story lives in i18n/*.js, the
// wiring lives here. Adoption is offered ONLY for facts the child has already
// mastered — an anchor speeds up remembering, it never replaces understanding.
//
// Fact keys are canonical (smaller × larger, e.g. '7x8'); commutative twins share
// the anchor (the engine checks both orders). loci ids match real hub landmarks
// (src/chamber/hubplace.js markers + src/island.js builds), so an image always
// lives somewhere the child has actually stood — some of them literally earned
// through math (a build joins the palace when restored).

// The floor at which Mimi offers the Grove: groep 6 / age ≈ 9 (grade_6, order 6),
// the youngest the child evidence for self-generated imagery mnemonics supports
// (docs/06 §2.3, §4.2). Parents can override earlier from the dashboard.
export const MEMORY_MIN_ORDER = 6;

// Enough gems lit that there is something worth anchoring before Mimi offers.
export const MEMORY_MIN_GEMS = 6;

// Landmark → the emoji shown on the anchor card / hint bubble. Hub markers first,
// then the eight restoration builds (emoji mirror src/island.js BUILDS).
export const LOCI_EMOJI = {
  gemtree: '🌳', shop: '🪧', nest: '🥚', mimi: '🐒',
  lanterns: '🏮', fruitstand: '🍉', garden: '🌺', stage: '🎵',
  bakery: '🥐', pizzeria: '🍕', bridge: '🌉', plaza: '🎪',
};

// The hardest table cluster every child fights (docs/06 §2.3): the big products
// away from the easy ×1/×2/×5/×10 lanes. ~18 to start — the "ship the 8–10
// hardest first" rule (§6) means this list can grow without touching code.
// imageKey resolves to `memory.anchor.<factKey>` in i18n/en.js + nl.js.
export const ANCHORS = [
  { factKey: '7x8', loci: 'gemtree' },
  { factKey: '6x7', loci: 'fruitstand' },
  { factKey: '6x8', loci: 'bakery' },
  { factKey: '6x9', loci: 'garden' },
  { factKey: '7x9', loci: 'pizzeria' },
  { factKey: '8x9', loci: 'bridge' },
  { factKey: '8x8', loci: 'nest' },
  { factKey: '7x7', loci: 'mimi' },
  { factKey: '9x9', loci: 'plaza' },
  { factKey: '6x6', loci: 'lanterns' },
  { factKey: '4x7', loci: 'shop' },
  { factKey: '4x8', loci: 'stage' },
  { factKey: '4x9', loci: 'garden' },
  { factKey: '3x7', loci: 'shop' },
  { factKey: '3x8', loci: 'lanterns' },
  { factKey: '3x9', loci: 'nest' },
  { factKey: '4x6', loci: 'fruitstand' },
  { factKey: '3x6', loci: 'mimi' },
].map((a) => ({ ...a, imageKey: `memory.anchor.${a.factKey}` }));

export const ANCHOR_BY_FACT = Object.fromEntries(ANCHORS.map((a) => [a.factKey, a]));

// Both orders of a fact ('7x8' and '8x7') resolve to the same catalog anchor,
// since commutative twins light together in math.facts.
export function anchorEntry(factKey) {
  if (ANCHOR_BY_FACT[factKey]) return ANCHOR_BY_FACT[factKey];
  const m = /^(\d+)x(\d+)$/.exec(String(factKey || ''));
  if (!m) return null;
  return ANCHOR_BY_FACT[`${m[2]}x${m[1]}`] || null;
}

// Human label for a fact key: '7x8' → '7 × 8'.
export function formatFact(factKey) {
  const m = /^(\d+)x(\d+)$/.exec(String(factKey || ''));
  return m ? `${m[1]} × ${m[2]}` : String(factKey || '');
}

// ---------- memory walks (docs/06 §4.4) ----------
// A memory walk is a true loci journey: the child physically walks a route over
// restored landmarks and answers one ordered step per stop. The first content is
// skip-counting — the spatial twin of Kiki's Counting Song (the same skip-count
// spine, so a correct stop reinforces the same times-table skill via reinforceSkill).

// The order a route visits landmarks (Appendix A). The first four always exist;
// the builds join the palace as the island is restored — loci literally earned.
export const LOCI_ORDER = [
  'gemtree', 'shop', 'nest', 'mimi',
  'lanterns', 'fruitstand', 'garden', 'stage', 'bakery', 'pizzeria', 'bridge', 'plaza',
];

export const ALWAYS_LOCI = ['gemtree', 'shop', 'nest', 'mimi'];

export const WALK_MIN_STOPS = 3; // start N = 3 (docs/06 §4.4)
export const WALK_MAX_STOPS = 6;

// Skip-count step pools by placement order (grade), mirroring the stage's
// Counting Song bands: easy landmark counts first (2/5/10), then the middle
// tables, then the hard ones. A higher-grade child still meets the easy steps.
export const WALK_STEPS = [
  { minOrder: 3, steps: [2, 5, 10] },
  { minOrder: 5, steps: [3, 4, 6] },
  { minOrder: 6, steps: [7, 8, 9] },
];
