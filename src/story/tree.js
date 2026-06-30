// The Tree of Learning — the skill-progression layer beneath the seven chapters.
// See docs/story/TREE_OF_LEARNING.md. Ten learning NODES + 22 PATHS, folded out of
// the 64 hexagrams: the King Wen sequence cut into 32 consecutive pairs, split into
// 10 *balanced* pairs (the nodes — states of mastery) and 22 *unbalanced* pairs (the
// paths — the learning you do to move between nodes). "balance = mastery; imbalance
// = a path you are still walking."
//
// PURE DATA + tiny lookups: no DOM, no three.js, no engine import. Like constants.js,
// the fold here is hand-written but CROSS-CHECKED against the @yijingjs/core engine in
// tests/tree.test.mjs (the pairs must reproduce from YIJING_KINGWEN_SEQUENCE, every
// skill id must be a real mathengine skill, the 18 shipped skills must all be covered).
// If the cosmology drifts, a test fails rather than the meaning quietly rotting.
//
// PROVENANCE / naming: this is the structure historically called the "Tree of Life"
// (the sefirot and the 22 paths between them) — the fold computed by yijingjs's
// SefirotPanel. We keep ONLY its mathematics and rename every node for what it
// *teaches*; no folklore reaches the game. The `sefira` field exists purely so the
// engine mapping stays checkable; it is AUTHOR vocabulary and never child-facing.

// ---------------------------------------------------------------------------
// The fold (verbatim from the engine; reproduced in the test from the King Wen
// sequence so it can never silently disagree). Each entry is a [hexA, hexB] pair.
//
//   balanced[i]   -> NODES[i]   (the 10 sefirot, in SefirotPanel NODES order)
//   unbalanced[i] -> PATHS[i]   (the 22 paths,   in SefirotPanel PATHS order)
export const PAIRS = Object.freeze({
  balanced: [[56, 7], [38, 25], [37, 41], [14, 28], [49, 35], [22, 26], [11, 52], [44, 13], [19, 50], [42, 21]],
  unbalanced: [
    [63, 0], [34, 17], [58, 23], [16, 2], [59, 55], [47, 61], [8, 4], [48, 3],
    [1, 32], [39, 57], [33, 30], [18, 45], [15, 60], [5, 40], [43, 53], [10, 20],
    [62, 31], [6, 24], [46, 29], [36, 9], [27, 54], [51, 12],
  ],
});

// ---------------------------------------------------------------------------
// The ten nodes, in SefirotPanel NODES order (index 0 = crown, 9 = kingdom). Each
// is a *balanced* King Wen pair = a state of consolidated understanding. `pillar`
// is the Tree's three columns, which (read secularly) are the curriculum's shape:
//   middle = number-sense spine · right = building up (×, generating) · left =
//   breaking down (÷, overcoming).
export const NODE_IDS = [
  'integration', 'proportion', 'precision', 'growth', 'sharing',
  'balance', 'fluency', 'procedure', 'foundation', 'whole',
];

const NODE_META = [
  { id: 'integration', sefira: 'keter',    pillar: 'middle', milestone: 'mastery, balance-as-practice (1S)', world: null,       grade: '8'   },
  { id: 'proportion',  sefira: 'chokhmah', pillar: 'right',  milestone: 'ratio, %, scale',                   world: 'business', grade: '7-8' },
  { id: 'precision',   sefira: 'binah',    pillar: 'left',   milestone: 'decimals, deep place value',        world: 'business', grade: '5-7' },
  { id: 'growth',      sefira: 'chesed',   pillar: 'right',  milestone: 'multiplication, building up',       world: 'garden',   grade: '4-5' },
  { id: 'sharing',     sefira: 'gevurah',  pillar: 'left',   milestone: 'division, taking apart fairly',     world: 'stump',    grade: '4-6' },
  { id: 'balance',     sefira: 'tiferet',  pillar: 'middle', milestone: 'fractions & magnitude (the centre)', world: 'vines',   grade: '6'   },
  { id: 'fluency',     sefira: 'netzach',  pillar: 'right',  milestone: 'fact automaticity & rhythm',        world: 'garden',   grade: '4-5' },
  { id: 'procedure',   sefira: 'hod',      pillar: 'left',   milestone: '+/- structure & strategy',          world: 'tide',     grade: '3-4' },
  { id: 'foundation',  sefira: 'yesod',    pillar: 'middle', milestone: 'number bonds & place value',        world: 'tide',     grade: '2-3' },
  { id: 'whole',       sefira: 'malkuth',  pillar: 'middle', milestone: 'the unit, the manifest island',     world: 'tide',     grade: '1-2' },
];

export const NODES = NODE_META.map((m, i) => Object.freeze({ ...m, index: i, pair: PAIRS.balanced[i] }));

// ---------------------------------------------------------------------------
// The 22 paths, in SefirotPanel PATHS order. `nodes` are the two NODE indices a
// path bridges; `pair` is its *unbalanced* King Wen pair. `skills` are the REAL
// mathengine.js ids the path practises (validated in the test); a `planned` path
// has none yet — it is curriculum the four shipped worlds do not cover (decimals,
// %, scale, big numbers, number bonds), with the doc-04 `steps` it will live on.
// Together the 22 paths cover all 18 shipped skills exactly once.
const PATH_META = [
  { nodes: [0, 1], cluster: '% advanced (>100%, back-calculate), proportion', world: 'business', grade: '8',   domain: 'VERHOUDINGEN', steps: [62],                 skills: [],                                  planned: true  },
  { nodes: [0, 2], cluster: 'big numbers (miljoen/miljard), standard form',   world: 'business', grade: '8',   domain: 'GETALLEN',     steps: [40, 48, 56],         skills: [],                                  planned: true  },
  { nodes: [0, 5], cluster: 'estimation & "does this make sense?" check',     world: null,       grade: '7-8', domain: 'GETALLEN',     steps: [34, 49],             skills: [],                                  planned: true  },
  { nodes: [1, 2], cluster: 'fraction <-> decimal <-> % conversion',          world: 'business', grade: '7-8', domain: 'VERHOUDINGEN', steps: [50],                 skills: [],                                  planned: true  },
  { nodes: [1, 3], cluster: 'scale & enlargement (1:100; x2 -> area x4)',     world: 'business', grade: '7-8', domain: 'VERHOUDINGEN', steps: [54, 63],             skills: [],                                  planned: true  },
  { nodes: [1, 5], cluster: 'percent of a quantity (25% of EUR 80)',          world: 'business', grade: '7',   domain: 'VERHOUDINGEN', steps: [52, 53],             skills: [],                                  planned: true  },
  { nodes: [2, 4], cluster: 'decimal division, / by 10/100/1000',             world: 'business', grade: '7-8', domain: 'GETALLEN',     steps: [58],                 skills: [],                                  planned: true  },
  { nodes: [2, 5], cluster: 'decimals on the line, compare (0,4 vs 0,12)',    world: 'business', grade: '6',   domain: 'GETALLEN',     steps: [44],                 skills: [],                                  planned: true  },
  { nodes: [3, 4], cluster: 'inverse x/ & missing factor (fact families)',    world: 'stump',    grade: '5-6', domain: 'GETALLEN',     steps: [21, 30, 43],         skills: ['missing_factor'],                  planned: false },
  { nodes: [3, 5], cluster: 'fraction of a quantity (3/4 of 24)',             world: 'vines',    grade: '6-7', domain: 'VERHOUDINGEN', steps: [47],                 skills: ['frac_of_n'],                       planned: false },
  { nodes: [3, 6], cluster: 'multi-digit x (area model)',                     world: 'garden',   grade: '5-7', domain: 'GETALLEN',     steps: [37, 42],             skills: ['mult_2digit'],                     planned: false },
  { nodes: [4, 5], cluster: 'division with remainder',                        world: 'stump',    grade: '6',   domain: 'GETALLEN',     steps: [42],                 skills: ['div_remainder'],                   planned: false },
  { nodes: [4, 7], cluster: 'division facts & fair sharing',                  world: 'stump',    grade: '5-6', domain: 'GETALLEN',     steps: [30],                 skills: ['div_facts', 'share'],              planned: false },
  { nodes: [5, 6], cluster: 'fraction equivalence (1/2 = 2/4 = 3/6)',         world: 'vines',    grade: '6-7', domain: 'VERHOUDINGEN', steps: [46, 50, 51],         skills: ['frac_equiv'],                      planned: false },
  { nodes: [5, 7], cluster: 'fraction notation (teller/noemer), on the line', world: 'vines',    grade: '6',   domain: 'VERHOUDINGEN', steps: [45],                 skills: [],                                  planned: true  },
  { nodes: [5, 8], cluster: 'fraction magnitude & compare (1/8 vs 1/4 trap)', world: 'vines',    grade: '5-6', domain: 'VERHOUDINGEN', steps: [38, 45, 46],         skills: ['frac_magnitude', 'frac_compare'],  planned: false },
  { nodes: [6, 7], cluster: 'all-tables automaticity (maintenance)',          world: 'garden',   grade: '5',   domain: 'GETALLEN',     steps: [41],                 skills: ['tables_mix'],                      planned: false },
  { nodes: [6, 8], cluster: 'tables x6-9, skip-count fluency',                world: 'garden',   grade: '4-5', domain: 'GETALLEN',     steps: [35],                 skills: ['tables_c'],                        planned: false },
  { nodes: [6, 9], cluster: 'tables x2,5,10,3,4 -> intro x',                  world: 'garden',   grade: '4',   domain: 'GETALLEN',     steps: [22, 27, 28, 29],     skills: ['tables_a', 'tables_b'],            planned: false },
  { nodes: [7, 8], cluster: '+/- to 100 & to 1.000 (column)',                 world: 'tide',     grade: '4-5', domain: 'GETALLEN',     steps: [24, 25, 26, 32, 33, 34], skills: ['add_100', 'sub_100'],          planned: false },
  { nodes: [7, 9], cluster: '+/- to 20, missing addend, strategy',            world: 'tide',     grade: '3',   domain: 'GETALLEN',     steps: [10, 11, 17, 18, 19, 20], skills: ['add_20', 'sub_20', 'missing_addend'], planned: false },
  { nodes: [8, 9], cluster: 'counting, splits of 10, the unit',               world: 'tide',     grade: '1-2', domain: 'GETALLEN',     steps: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], skills: [],                          planned: true  },
];

export const PATHS = PATH_META.map((m, i) => Object.freeze({
  ...m, index: i, pathNo: i + 1, pair: PAIRS.unbalanced[i],
  from: NODE_IDS[m.nodes[0]], to: NODE_IDS[m.nodes[1]],
}));

// ---------------------------------------------------------------------------
// Which chapter lights which region of the Tree (docs README/TREE_OF_LEARNING §4).
// The seven-chapter spine is unchanged; each chapter simply illuminates nodes and
// paths as its world blooms. Node ids + 0-based path indices (pathNo = index + 1).
// Together they cover every node and every path exactly once (checked in the test).
export const CHAPTER_REGIONS = Object.freeze({
  taiji:   { nodes: ['whole'],                                  paths: [] },
  liangyi: { nodes: ['foundation', 'procedure'],               paths: [21, 20, 19] },
  sixiang: { nodes: [],                                         paths: [] },
  bagua:   { nodes: ['fluency', 'growth'],                     paths: [18, 17, 16, 10] },
  wuxing:  { nodes: ['sharing'],                               paths: [8, 12, 11] },
  gua:     { nodes: ['balance'],                               paths: [15, 14, 7, 13, 9] },
  roots:   { nodes: ['precision', 'proportion', 'integration'], paths: [6, 5, 3, 4, 2, 1, 0] },
});

// ---------------------------------------------------------------------------
// Tiny lookups (no logic, like constants.js).
const _nodeById = {};
for (const n of NODES) _nodeById[n.id] = n;
export const nodeById = (id) => _nodeById[id] || null;

const _pathsBySkill = {};
for (const p of PATHS) for (const s of p.skills) (_pathsBySkill[s] ||= []).push(p);
export const pathsForSkill = (id) => _pathsBySkill[id] || [];

// The planned paths are exactly the curriculum the four shipped worlds do not yet
// cover (decimals, %, scale, big numbers, number bonds) — the gap doc 04 names.
export const PLANNED_PATHS = PATHS.filter((p) => p.planned);
