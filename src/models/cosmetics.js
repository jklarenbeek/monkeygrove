// Cosmetic voxel data: hats, fur recolors, and movement trails. Pure data +
// metadata (id / nameKey / price), consumed via src/models.js. See models.js for
// the model format (palette + bottom-up Y layers of +Z-facing voxels).

// Hat models are positioned with their y0 at this monkey layer (the small
// crown cap at y11 lets hats hug the head instead of hovering).
export const MONKEY_HAT_Y = 11;

// ---------------------------------------------------------------------------
// Hats — small models whose y0 sits at MONKEY_HAT_Y (+ dy).
// ---------------------------------------------------------------------------

export const HATS = [
  {
    id: 'cap',
    nameKey: 'hat.cap',
    price: 25,
    dy: 0,
    model: {
      palette: { C: '#6fb7e8', c: '#5a9fd0' },
      layers: [
        ['.......', '.CCCCC.', '.CCCCC.', '.CCCCC.', '.ccccc.'], // brim forward
        ['.......', '..CCC..', '.CCCCC.', '..CCC..'],
        ['.......', '.......', '...C...'],
      ],
    },
  },
  {
    id: 'bow',
    nameKey: 'hat.bow',
    price: 40,
    dy: 0,
    model: {
      palette: { P: '#f7a8c4', p: '#e88bb0' },
      layers: [
        ['.......', '.......', 'PPPpPPP', 'PP...PP'],
        ['.......', '.......', 'PP...PP'],
      ],
    },
  },
  {
    id: 'beanie',
    nameKey: 'hat.beanie',
    price: 60,
    dy: 0,
    model: {
      palette: { B: '#f0907a', b: '#d97863', w: '#fdf6ec' },
      layers: [
        ['.......', '.bbbbb.', '.bbbbb.', '.bbbbb.'],
        ['.......', '..BBB..', '.BBBBB.', '..BBB..'],
        ['.......', '.......', '..BBB..'],
        ['.......', '.......', '...w...'], // pompom
      ],
    },
  },
  {
    id: 'party',
    nameKey: 'hat.party',
    price: 80,
    dy: 0,
    model: {
      palette: { A: '#8fd0e8', P: '#f7a8c4', w: '#fff7e0' },
      layers: [
        ['.......', '..AAA..', '.AAAAA.', '..AAA..'],
        ['.......', '...P...', '..PPP..', '...P...'],
        ['.......', '.......', '...A...'],
        ['.......', '.......', '...w...'],
      ],
    },
  },
  {
    id: 'flowercrown',
    nameKey: 'hat.flowercrown',
    price: 120,
    dy: 0,
    model: {
      palette: { V: '#7cc08a', P: '#ffb3c6', Y: '#ffe28a', L: '#c9a6ff' },
      layers: [
        ['.......', '.VPYPV.', '.Y...Y.', '.VLYLV.'],
      ],
    },
  },
  {
    id: 'pirate',
    nameKey: 'hat.pirate',
    price: 150,
    dy: 0,
    model: {
      palette: { D: '#4a5a78', B: '#ffe28a' },
      layers: [
        ['.......', '.DDDDD.', 'DDDDDDD', '.DDBDD.'], // banana emblem, friendly pirates only
        ['.......', '.......', 'D.DDD.D'],
        ['.......', '.......', '..DDD..'],
      ],
    },
  },
  {
    id: 'wizard',
    nameKey: 'hat.wizard',
    price: 200,
    dy: 0,
    model: {
      palette: { Z: '#9b8ad0', S: '#ffe28a' },
      layers: [
        ['.ZZZZZ.', 'ZZZZZZZ', 'ZZZZZZZ', 'ZZZZZZZ', '.ZZZZZ.'],
        ['.......', '.ZZZZZ.', '.ZZSZZ.', '.ZZZZZ.'],
        ['.......', '..ZZZ..', '..ZZZ..', '..ZZZ..'],
        ['.......', '.......', '...Z...'],
        ['.......', '.......', '....Z..'], // floppy tip
      ],
    },
  },
  {
    id: 'crown',
    nameKey: 'hat.crown',
    price: 300,
    dy: 0,
    model: {
      palette: { G: '#f4c95d', J: '#f78bb0' },
      layers: [
        ['.......', '.GGGGG.', '.G...G.', '.GGGGG.'],
        ['.......', '.G.G.G.', '.......', '.G.G.G.'],
        ['.......', '.......', '.......', '...J...'], // jewel on the front point
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Fur recolors — palette overrides for the monkey's F/f slots.
// ---------------------------------------------------------------------------

export const FURS = [
  { id: 'classic', nameKey: 'fur.classic', price: 0, palette: { F: '#8a5a3b', f: '#f0d6b3' } },
  { id: 'golden', nameKey: 'fur.golden', price: 60, palette: { F: '#e8b04f', f: '#ffe9b8' } },
  { id: 'snow', nameKey: 'fur.snow', price: 60, palette: { F: '#f0ede6', f: '#ffffff' } },
  { id: 'pink', nameKey: 'fur.pink', price: 80, palette: { F: '#f49bbb', f: '#ffd9e6' } },
  { id: 'lavender', nameKey: 'fur.lavender', price: 80, palette: { F: '#b39ddb', f: '#e6dcf5' } },
  { id: 'mint', nameKey: 'fur.mint', price: 80, palette: { F: '#8fd4ae', f: '#dcf5e8' } },
  { id: 'redpanda', nameKey: 'fur.redpanda', price: 100, palette: { F: '#e8875a', f: '#fff1dc' } },
  { id: 'midnight', nameKey: 'fur.midnight', price: 150, palette: { F: '#4a4a6a', f: '#9b9bc4' } },
];

// ---------------------------------------------------------------------------
// Trails — particle colors for the movement trail cosmetic.
// ---------------------------------------------------------------------------

export const TRAILS = [
  { id: 'sparkle', nameKey: 'trail.sparkle', price: 60, color: '#ffd966' },
  { id: 'petal', nameKey: 'trail.petal', price: 100, color: '#ffb3c6' },
  { id: 'bubble', nameKey: 'trail.bubble', price: 100, color: '#9bd6ff' },
  { id: 'star', nameKey: 'trail.star', price: 200, color: '#c9a6ff' },
  // Memory Grove cosmetic (docs/06 §5, Phase 2): a grove-green trail of little
  // leaves, earned with the same bananas as everything else.
  { id: 'grove', nameKey: 'trail.grove', price: 150, color: '#7ccf7c' },
];
