// The 64-step mastery ladder — the canonical SEQUENCE the three pillars share
// (SUPER_PROMPT §5, docs/04-64-step-ladder.md). 64 steps, id 0..63, in 8 bands of 8;
// `grade = (step >> 3) + 1`. Each step is a *named level of thinking* (not a getal-
// grootte bucket), with the visual model, the domain, the world it is played in, the
// misconception traps it can spring, and the legacy 18-skill `legacyGroup` whose Elo
// rating seeds it on the 18->64 migration.
//
// This is the missing backbone the §3 audit named ("the 64-step ladder is paper-only").
// It is PURE DATA: no DOM, no engine import. It is cross-checked against the Tree of
// Learning in tests/ladder-coherence.test.mjs — every GETALLEN/VERHOUDINGEN step sits
// on exactly one Tree path, and a step and its path always agree on the SLO domain.
//
// The Tree (the sefirot fold) is a Getallen+Verhoudingen structure by nature, so the
// METEN_MEETKUNDE and VERBANDEN steps (coins, measures, graphs, patterns) live OFF the
// Tree — in the curriculum's measurement/data objectives and the business world — and
// are deliberately not on any path. Nothing is orphaned and nothing is double-claimed:
// that invariant is the coherence test.
import { SLO_DOMAINS } from './domains.js';

// Each entry: [domain, world, name (author level-of-thinking), model, legacyGroup,
// misconception[]]. world is where it is *played* (tide/garden/stump/vines/business/hub);
// legacyGroup is the engine skill that seeds it (null = cold-start, no 18-skill parent,
// per docs/04 §5). Index in this array IS the step id 0..63.
const STEP_DATA = [
  // Band 0 — grade 1 (steps 0-7) · foundations
  ['GETALLEN',        'tide',     'Number-word sayer: rote count to 10',                 'count',        'counting',      []],
  ['GETALLEN',        'tide',     'Count objects to 5 (1:1 correspondence)',             'count',        'counting',      []],
  ['GETALLEN',        'tide',     'Subitise to 4 (see how many without counting)',       'subitise',     'counting',      []],
  ['GETALLEN',        'tide',     'Compare: more / less / same',                         'compare',      'counting',      []],
  ['GETALLEN',        'tide',     'Count to 20; count back from 10',                     'number_track', 'counting',      []],
  ['GETALLEN',        'tide',     'Part-part-whole to 5 (split a small set)',            'ten_frame',    'number_bonds',  []],
  ['GETALLEN',        'tide',     'Ordinal & position: first/second, before/after',     'sequence',     null,            []],
  ['VERBANDEN',       'hub',      'Recognise & extend a simple repeating pattern',       'pattern',      null,            []],
  // Band 1 — grade 2 (steps 8-15) · beginning number
  ['GETALLEN',        'tide',     'Subitise to 6; read numerals 0-10',                   'dot_cards',    'counting',      []],
  ['GETALLEN',        'tide',     'Number bonds / splits of 10 (make-ten facts)',        'ten_frame',    'number_bonds',  []],
  ['GETALLEN',        'tide',     'Add within 12 by counting on from the larger',        'number_line',  'add_20',        []],
  ['GETALLEN',        'tide',     'Subtract within 12 by counting back / difference',    'number_line',  'sub_20',        []],
  ['GETALLEN',        'tide',     'Compare & order numbers to 20',                       'number_track', 'counting',      []],
  ['VERHOUDINGEN',    'vines',    'Halves & quarters of a small set (share fairly)',     'grouping',     null,            []],
  ['METEN_MEETKUNDE', 'business', 'Coins to €10; make a total',                          'coins',        null,            []],
  ['VERBANDEN',       'business', 'Read a picture/bar graph; tally',                     'graph',        null,            []],
  // Band 2 — grade 3 (steps 16-23) · formal +/- to 20
  ['GETALLEN',        'tide',     'Numbers to 100: read, place on the line',             'number_line',  'add_100',       []],
  ['GETALLEN',        'tide',     'Make-ten / bridging through 10 for addition',         'ten_frame',    'add_20',        []],
  ['GETALLEN',        'tide',     'Bridging through 10 for subtraction',                 'number_line',  'sub_20',        []],
  ['GETALLEN',        'tide',     'Near-doubles & doubles',                              'double_bar',   'add_20',        []],
  ['GETALLEN',        'tide',     '+/- within 20 automatic (derived-fact fluency)',      'none',         'missing_addend', []],
  ['GETALLEN',        'tide',     'Inverse relationship + and − (fact families)',        'bar_model',    'missing_addend', []],
  ['GETALLEN',        'garden',   'Repeated addition → intro × (equal groups)',          'rows',         'tables_a',      []],
  ['GETALLEN',        'stump',    'Fair sharing → intro ÷ (deal into groups)',           'baskets',      'share',         []],
  // Band 3 — grade 4 (steps 24-31) · to 100, tables start
  ['GETALLEN',        'tide',     'Place value to 100 (tens & ones; split)',             'place_value',  'add_100',       []],
  ['GETALLEN',        'tide',     '+/- to 100 by splitting (rijgen/splitsen)',           'number_line',  'add_100',       []],
  ['GETALLEN',        'tide',     '+/- to 100 by compensating',                          'number_line',  'sub_100',       []],
  ['GETALLEN',        'garden',   'Tables ×2, ×5, ×10 (skip-count structure)',           'array',        'tables_a',      []],
  ['GETALLEN',        'garden',   '× as array; commutativity (4×6 = 6×4)',               'array',        'tables_a',      []],
  ['GETALLEN',        'garden',   'Tables ×3, ×4 via derived facts',                     'array',        'tables_b',      []],
  ['GETALLEN',        'stump',    '÷ with equal groups; ÷ as missing factor',            'baskets',      'div_facts',     []],
  ['VERHOUDINGEN',    'vines',    'Quarter of a quantity; simple ratio (recipe)',        'bar',          'frac_of_n',     []],
  // Band 4 — grade 5 (steps 32-39) · to 1.000, intro decimals
  ['GETALLEN',        'tide',     'Place value to 1.000; round to hundreds',             'place_value',  'add_100',       []],
  ['GETALLEN',        'tide',     'Column +/- to 1.000 (cijferen) with regrouping',      'column',       'add_100',       []],
  ['GETALLEN',        'tide',     'Estimate +/- and judge plausibility',                 'rounding_line', 'sub_100',      []],
  ['GETALLEN',        'garden',   'Tables 6-9 → all tables to 10 automatic (eind gr 5)', 'array',        'tables_c',      []],
  ['METEN_MEETKUNDE', 'business', 'Decimals in money (2 places): read, +/-',             'price',        null,            []],
  ['GETALLEN',        'garden',   '×/÷ informal beyond 20 (chunking)',                   'array',        'mult_2digit',   []],
  ['VERHOUDINGEN',    'vines',    'Fraction as part of a whole; place 1/2, 1/4 on line', 'number_line',  'frac_magnitude', []],
  ['METEN_MEETKUNDE', 'business', 'mm/dm/km; herleiden (2 m 40 cm = 240 cm)',            'ruler',        null,            []],
  // Band 5 — grade 6 (steps 40-47) · decimals, fractions, fluency
  ['GETALLEN',        'tide',     'Numbers to ±100.000; order & round',                  'place_value',  'big_numbers',   []],
  ['GETALLEN',        'garden',   'Tables to 10 — maintenance / retention',              'array',        'tables_mix',    []],
  ['GETALLEN',        'stump',    'Efficient ×/÷ with remainder; interpret the rest',    'baskets',      'div_remainder', ['remainder_ignored']],
  ['GETALLEN',        'stump',    'Inverse ×/÷ as a check (missing factor)',             'bar',          'missing_factor', []],
  ['GETALLEN',        'business', 'Decimals to 2 places: meaning, compare (0,4 vs 0,12)', 'place_value', 'dec_compare',   ['decimal_length_bias']],
  ['VERHOUDINGEN',    'vines',    'Fraction notation: teller/noemer; named on the line', 'number_line',  'frac_magnitude', []],
  ['VERHOUDINGEN',    'vines',    'Compare fractions (1/8 vs 1/4 trap); equivalence',    'pie',          'frac_compare',  ['whole_number_bias']],
  ['VERHOUDINGEN',    'vines',    'Fraction of a quantity (2/3 of 300); 1/4 = 25%',      'bar',          'frac_of_n',     []],
  // Band 6 — grade 7 (steps 48-55) · refinement, %, scale
  ['GETALLEN',        'tide',     'Numbers to ±1 miljoen; decimals to 2 places',         'place_value',  'big_numbers',   []],
  ['GETALLEN',        'tide',     'Efficient all four operations; estimate & check',     'mixed',        null,            []],
  ['VERHOUDINGEN',    'business', 'Fraction ↔ decimal (1/5 = 0,2); simplify (9/12=3/4)', 'number_line',  'frac_dec_pct',  []],
  ['VERHOUDINGEN',    'vines',    'Equivalent fractions, self-generated',                'number_line',  'frac_equiv',    []],
  ['VERHOUDINGEN',    'business', 'Percent basics (25%, 50%); % of a quantity',          'bar',          'percent_of',    []],
  ['VERHOUDINGEN',    'business', 'Discount problem (25% off €80 = €60)',                'price',        'percent_of',    []],
  ['VERHOUDINGEN',    'business', 'Scale notation (1:100 → real length)',                'scale',        'scale',         []],
  ['METEN_MEETKUNDE', 'business', 'Area/perimeter reasoning; line graph from a table',   'grid',         null,            []],
  // Band 7 — grade 8 (steps 56-63) · integration, 1S, VO-ready
  ['GETALLEN',        'tide',     'Numbers to millions/billions; decimals to thousandths', 'place_value', 'big_numbers',  []],
  ['GETALLEN',        'business', '+/- decimals fluently (align comma; reason zeros)',   'column',       'dec_addsub',    ['comma_misalign']],
  ['GETALLEN',        'business', '×/÷ by 10/100/1000; ×/÷ decimals',                    'place_value',  'dec_muldiv',    ['comma_misalign']],
  ['GETALLEN',        'tide',     'Order of operations & brackets (4 + 5×6)',            'expression',   null,            []],
  ['VERHOUDINGEN',    'vines',    'Fractions +/- unlike denominators (gelijknamig)',     'bar',          null,            ['add_tops_bottoms']],
  ['VERHOUDINGEN',    'vines',    'Fraction × and ÷ (by whole or fraction)',             'area',         null,            []],
  ['VERHOUDINGEN',    'business', 'Percent advanced: 1%-rule, >100%, back-calculate',    'business',     'percent_adv',   []],
  ['VERHOUDINGEN',    'business', 'Scale calculation; derived quantities; data critique', 'graph',       'scale',         []],
];

export const LADDER_STEPS = STEP_DATA.map(([domain, world, name, model, legacyGroup, misconception], id) => Object.freeze({
  id,
  band: id >> 3,
  grade: (id >> 3) + 1,
  domain,
  world,
  name,
  model,
  legacyGroup,
  misconception: Object.freeze([...misconception]),
  // Strictly linear ladder: each step's supporting prerequisite is the step before it.
  prereq: id === 0 ? Object.freeze([]) : Object.freeze([id - 1]),
}));

export const LADDER_SIZE = LADDER_STEPS.length; // 64

const _byId = {};
for (const s of LADDER_STEPS) _byId[s.id] = s;
export const ladderStep = (id) => _byId[id] || null;

// The SLO domains that live ON the Tree (Getallen + Verhoudingen). Measurement and
// data steps are taught off-Tree, in the curriculum's business/measurement objectives.
export const TREE_DOMAINS = Object.freeze(['GETALLEN', 'VERHOUDINGEN']);
export const isTreeStep = (step) => TREE_DOMAINS.includes(step.domain);

// Re-export so callers reading the ladder get the same SLO vocabulary.
export { SLO_DOMAINS };
