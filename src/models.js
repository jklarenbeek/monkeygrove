// Voxel model definitions: pure data + metadata.
// Format (consumed by src/voxel.js):
//   { palette: { char: '#rrggbb' }, layers: [ bottom-up Y layers ] }
// Each layer is an array of Z-row strings (z = 0 is the back), each char an
// X voxel. '.' and ' ' are empty. Characters face +Z (face on the high-Z side).
// Character and pet model files live in src/mesh.

import { CHARS, PETS } from './mesh/index.js';

export { CHARS, PETS };

// Unified creature roster (monkey, mimi + 8 pets), each with a small (chibi)
// and full (full-body) mesh + avatar/pet role flags. crab/crabKing are NOT in
// here — see src/mesh/creatures.js. Avatar/pet/set-dressing code resolves
// creatures through getCreature() instead of reaching into CHARS/PETS directly.
export {
  CREATURES, CREATURE_IDS, DEFAULT_CREATURE_ID, COMPANION_IDS,
  AVATAR_CREATURES, PET_CREATURES, getCreature,
} from './mesh/creatures.js';

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
];

// ---------------------------------------------------------------------------
// Props & scenery
// ---------------------------------------------------------------------------

const palm = {
  palette: {
    T: '#b08a5f', t: '#8f6d49', // trunk + ring shade
    L: '#5fb46a', l: '#8fd18a', // fronds + light tips
    C: '#7a5a3f', // coconuts
  },
  layers: [
    ['............', '............', '............', '............', '............', '.....TT.....', '.....TT.....'],
    ['............', '............', '............', '............', '............', '.....TT.....', '.....TT.....'],
    ['............', '............', '............', '............', '............', '.....tt.....', '.....tt.....'],
    ['............', '............', '............', '............', '............', '.....TT.....', '.....TT.....'],
    ['............', '............', '............', '............', '............', '.....TT.....', '.....TT.....'],
    ['............', '............', '............', '............', '............', '.....tt.....', '.....tt.....'],
    ['............', '............', '............', '............', '............', '.....TT.....', '.....TT.....'],
    ['............', '............', '............', '............', '............', '.....TT.....', '.....TT.....'],
    ['............', '............', '............', '............', '............', '.....tt.....', '.....tt.....'],
    ['............', '............', '............', '............', '............', '.....TT.....', '.....TT.....'],
    ['............', '............', '............', '............', '............', '.....TT.....', '.....TT.....'],
    [ // y11 trunk top, drooping frond tips, hanging coconuts
      '.....ll.....',
      '.l........l.',
      '............',
      '............',
      '............',
      'l....TT....l',
      'l....TT....l',
      '.....CC.....',
      '............',
      '............',
      '.l........l.',
      '.....ll.....',
    ],
    [ // y12 frond arms in 8 directions
      '............',
      '.....LL.....',
      '..l..LL..l..',
      '...l.LL.l...',
      '.....LL.....',
      '.LLL.LL.LLL.',
      '.LLL.LL.LLL.',
      '.....LL.....',
      '...l.LL.l...',
      '..l..LL..l..',
      '.....LL.....',
    ],
    [ // y13 inner canopy
      '............',
      '............',
      '............',
      '....LLLL....',
      '...LLLLLL...',
      '...LLLLLL...',
      '...LLLLLL...',
      '...LLLLLL...',
      '....LLLL....',
    ],
    [ // y14 light crown
      '............',
      '............',
      '............',
      '............',
      '....llll....',
      '....llll....',
      '....llll....',
      '....llll....',
    ],
  ],
};

const palmSmall = {
  palette: { T: '#b08a5f', t: '#8f6d49', L: '#5fb46a', l: '#8fd18a', C: '#7a5a3f' },
  layers: [
    ['........', '........', '........', '...TT...', '...TT...'],
    ['........', '........', '........', '...TT...', '...TT...'],
    ['........', '........', '........', '...tt...', '...tt...'],
    ['........', '........', '........', '...TT...', '...TT...'],
    ['........', '........', '........', '...TT...', '...TT...'],
    [ // y5 trunk top + drooping tips + coconut
      '...ll...',
      '........',
      '........',
      'l..TT..l',
      'l..TT..l',
      '...C....',
      '........',
      '...ll...',
    ],
    [ // y6 frond spread
      '........',
      '...LL...',
      '..LLLL..',
      '.LLLLLL.',
      '.LLLLLL.',
      '..LLLL..',
      '...LL...',
    ],
    [ // y7 light crown
      '........',
      '........',
      '........',
      '..llll..',
      '..llll..',
    ],
  ],
};

const bush = {
  palette: { L: '#5fb46a', l: '#8fd18a', P: '#f7b8cf' },
  layers: [
    ['.......', '.LLLLL.', 'LLLLLLL', 'LLLLLLL', 'LLLLLLL', '.LLLLL.'],
    ['.......', '.LLLLL.', 'LLLLLLL', 'LLLLLLL', 'LLLLLLL', '.LLLPL.'], // one blossom
    ['.......', '.......', '.LLLLL.', '.LlLlL.', '.LLLLL.'],
    ['.......', '.......', '.......', '..lll..'],
  ],
};

const flowerPink = {
  palette: { V: '#6aa84f', P: '#f7a8c4', C: '#ffe28a' },
  layers: [
    ['...', '.V.'],
    ['...', '.V.'],
    ['.P.', 'PCP', '.P.'],
  ],
};

const flowerYellow = {
  palette: { V: '#6aa84f', P: '#ffd966', C: '#e8924f' },
  layers: [
    ['...', '.V.'],
    ['...', '.V.'],
    ['.P.', 'PCP', '.P.'],
  ],
};

const flowerBlue = {
  palette: { V: '#6aa84f', P: '#9bb8ff', C: '#fff1c4' },
  layers: [
    ['...', '.V.'],
    ['...', '.V.'],
    ['.P.', 'PCP', '.P.'],
  ],
};

// ---------------------------------------------------------------------------
// Micro-props (Phase 3) — tiny cosmetic dressing scattered via InstancedMesh.
// Chunky, low-voxel shapes that read as floor *texture*, never as interactables.
// ---------------------------------------------------------------------------
const grassA = {
  palette: { g: '#7fc26a', G: '#5fb46a' },
  layers: [
    ['.g.', 'gGg', '.g.'],
    ['...', '.G.', '...'],
  ],
};
const grassB = {
  palette: { g: '#86c970', G: '#62b06a' },
  layers: [
    ['g.g', '.G.', 'g.g'],
    ['...', '.G.', '...'],
    ['...', '.g.', '...'],
  ],
};
const pebble = {
  palette: { p: '#b8b2a8', d: '#9a948a' },
  layers: [
    ['.pp.', 'pddp', '.pp.'],
  ],
};
const mushroom = {
  palette: { S: '#f4f0e6', C: '#e0728a', c: '#c85a72' },
  layers: [
    ['...', '.S.', '...'],
    ['.C.', 'CcC', '.C.'],
  ],
};
const crystal = {
  palette: { C: '#c9a6ff', t: '#e6d6ff' },
  layers: [
    ['...', '.C.', '...'],
    ['...', '.C.', '...'],
    ['...', '.t.', '...'],
  ],
};

// Round clay pot with a hollow rim — number stones hide inside.
const pot = {
  palette: { D: '#d9906f', d: '#b8714f', c: '#e8a988' },
  layers: [
    ['.......', '.......', '.ddddd.', '.ddddd.', '.ddddd.'],
    ['.......', '.DDDDD.', 'DDDDDDD', 'DDDDDDD', 'DDDDDDD', '.DDDDD.'],
    ['.......', '.DDDDD.', 'DDDDDDD', 'DDDDDDD', 'DDDDDDD', '.DDDDD.'],
    ['.......', '..DDD..', '.DDDDD.', '.DDDDD.', '.DDDDD.', '..DDD..'],
    ['.......', '..ccc..', '.c...c.', '.c...c.', '.c...c.', '..ccc..'],
  ],
};

// Number stone: rounded pale tablet. The front (+Z) face is deliberately flat
// and blank — the game overlays the number sprite there.
const stone = {
  palette: { S: '#e8e2d4', s: '#cfc8b8' },
  layers: [
    ['.sssss.', 'sssssss', 'sssssss'],
    ['.SSSSS.', 'SSSSSSS', 'SSSSSSS'],
    ['.SSSSS.', 'SSSSSSS', 'SSSSSSS'],
    ['.SSSSS.', 'SSSSSSS', 'SSSSSSS'],
    ['..sss..', '.SSSSS.', '.SSSSS.'],
  ],
};

// Golden pedestal with a recessed slot on top for the answer stone.
const altar = {
  palette: { G: '#f4c95d', g: '#d9a83f', h: '#ffe9a8' },
  layers: [
    ['.ggggggg.', 'ggggggggg', 'ggggggggg', 'ggggggggg', 'ggggggggg', 'ggggggggg', 'ggggggggg', 'ggggggggg', '.ggggggg.'],
    ['.........', '.........', '..GGGGG..', '..GGGGG..', '..GGGGG..', '..GGGGG..', '..GGGGG..'],
    ['.........', '.........', '..GGGGG..', '..GGGGG..', '..GGGGG..', '..GGGGG..', '..GGGGG..'],
    ['.........', '.........', '..GGGGG..', '..GGGGG..', '..GGGGG..', '..GGGGG..', '..GGGGG..'],
    ['.........', '.GGGGGGG.', '.GGGGGGG.', '.GGGGGGG.', '.GGGGGGG.', '.GGGGGGG.', '.GGGGGGG.', '.GGGGGGG.'],
    ['.........', '.hhhhhhh.', '.h.....h.', '.h.....h.', '.h.....h.', '.h.....h.', '.h.....h.', '.hhhhhhh.'],
  ],
};

const chestBase = {
  palette: { W: '#b07a4a', w: '#8f5f38', G: '#f4c95d' },
  layers: [
    ['wwwwwww', 'wwwwwww', 'wwwwwww', 'wwwwwww', 'wwwwwww'],
    ['WWWWWWW', 'W.....W', 'W.....W', 'W.....W', 'WWWWWWW'],
    ['WWWWWWW', 'W.....W', 'W.....W', 'W.....W', 'WWWGWWW'], // gold clasp on front
  ],
};

const chestLid = {
  palette: { W: '#b07a4a', w: '#8f5f38', G: '#f4c95d' },
  layers: [
    ['WWWWWWW', 'WWWWWWW', 'WWWWWWW', 'WWWWWWW', 'WWWGWWW'],
    ['.......', '.WWWWW.', '.WWWWW.', '.WWWWW.'],
  ],
};

const egg = {
  palette: { Q: '#fdf2e0', M: '#bfe8d2' },
  layers: [
    ['.....', '.QQQ.', '.QQQ.', '.QQQ.'],
    ['.QQQ.', 'QQQQQ', 'QQQQQ', 'QQQQQ', '.QQQ.'],
    ['.QQQ.', 'MQQQQ', 'QQQQQ', 'QQQQQ', '.QMQ.'], // mint speckles
    ['.QQQ.', 'QQQQQ', 'QQQQM', 'QQQQQ', '.QQQ.'],
    ['.....', '.QQQ.', '.QQQ.', '.QMQ.'],
    ['.....', '.....', '..Q..'],
  ],
};

const basket = {
  palette: { B: '#c9985f', b: '#a87a45' },
  layers: [
    ['.BBBB.', 'BBBBBB', 'BBBBBB', 'BBBBBB', 'BBBBBB', '.BBBB.'],
    ['.bBBb.', 'B....B', 'b....b', 'B....B', 'b....b', '.bBBb.'], // alternating weave
    ['.BbbB.', 'b....b', 'B....B', 'b....b', 'B....B', '.BbbB.'],
    ['.bbbb.', 'b....b', 'b....b', 'b....b', 'b....b', '.bbbb.'],
  ],
};

const coconut = {
  palette: { C: '#8a6845', c: '#6e5236' },
  layers: [
    ['....', '.cc.', '.cc.'],
    ['.CC.', 'CCCC', 'CCCC', '.CC.'],
    ['....', '.CC.', '.CC.'],
  ],
};

const bananas = {
  palette: { Y: '#ffd95e', y: '#e8b840', g: '#6aa84f' },
  layers: [
    ['.....', '.YYY.'],
    ['.....', 'YYYYY', '.YYY.'],
    ['.....', '.yYy.', '..Y..'],
    ['.....', '..g..'],
  ],
};

const stump = {
  palette: { K: '#9a6b4f', k: '#7d5540', D: '#d9b88f', d: '#c4a070' },
  layers: [
    ['.......', '.KKKKK.', 'KKKKKKK', 'KKKKKKK', 'KKKKKKK', '.KKKKK.'],
    ['.......', '.KKKKK.', 'kKKKKKk', 'KKKKKKK', 'kKKKKKk', '.KKKKK.'],
    ['.......', '.KKKKK.', 'KKKKKKK', 'KKKKKKK', 'KKKKKKK', '.KKKKK.'],
    [ // growth rings on top
      '.......',
      '.DDDDD.',
      'DDdddDD',
      'DDdDdDD',
      'DDdddDD',
      '.DDDDD.',
    ],
  ],
};

// Wooden stand holding a golden disc that faces +Z (ring it on the number line).
const gong = {
  palette: { K: '#9a6b4f', G: '#f4c95d', g: '#d9a83f' },
  layers: [
    ['KK...KK', 'KK...KK'],
    ['.......', 'K.....K', '..GGG..'],
    ['.......', 'K.....K', '.GGGGG.'],
    ['.......', 'K.....K', '.GGgGG.'], // darker boss in the middle
    ['.......', 'K.....K', '.GGGGG.'],
    ['.......', 'K.....K', '..GGG..'],
    ['.......', 'KKKKKKK', '...K...'], // crossbar + hanger
  ],
};

const plank = {
  palette: { W: '#c9985f', w: '#a87a45' },
  layers: [
    ['WWWWWWW', 'WwWWWwW', 'WWWWWWW'],
  ],
};

// Stone arch; Q voxels are the inner glow film (recolor per region via withPalette).
const portal = {
  palette: { P: '#b8b2a8', p: '#948e84', Q: '#a8e8ff' },
  layers: [
    ['PP.....PP', 'PPQQQQQPP'],
    ['PP.....PP', 'PPQQQQQPP'],
    ['pp.....pp', 'ppQQQQQpp'],
    ['PP.....PP', 'PPQQQQQPP'],
    ['PP.....PP', 'PPQQQQQPP'],
    ['pP.....Pp', 'pPQQQQQPp'],
    ['PPP...PPP', 'PPPQQQPPP'],
    ['.PPPPPPP.', '.PPPPPPP.'],
    ['..PPPPP..', '..ppppp..'],
    ['...PPP...', '...PPP...'],
  ],
};

// Living-gate growth overlays (entities.js LivingPortal): vines that bloom on
// the portal arch as a world's mastery grows. Registration contract with the
// arch above — every stage is 11 wide × 4 deep and shares the arch's center:
//   x: overlay x = arch x + 1, so x0/x10 hug the pillars' outer faces
//   z: z1 = arch back row, z2 = arch front row (all stone/film there — keep
//      empty below the cap), z3 floats flush in front of the arch face
// F is the flower slot (recolored per world via withPalette), C the bud heart.
const portalVine1 = {
  palette: { v: '#4e8c4a', L: '#8fd18a' },
  layers: [
    ['...........', 'v.........v', '...........', '.L.......L.'],
    ['...........', 'v.........v', '...........', '.L.........'],
    ['...........', 'v..........', 'L..........', '...........'],
    ['...........', 'L..........', '...........', '...........'],
  ],
};

const portalVine2 = {
  palette: { v: '#4e8c4a', L: '#8fd18a', F: '#f7b8cf' },
  layers: [
    ['...........', 'v.........v', '...........', '.L.......L.'],
    ['...........', 'v.........v', '...........', '.F.........'],
    ['...........', 'v.........v', 'L.........L', '...........'],
    ['...........', 'v.........v', '...........', '.L.......F.'],
    ['...........', 'v.........v', '...........', '.F.........'],
    ['...........', 'v.........v', 'L.........L', '...........'],
    ['...........', 'L.........L', '...........', '...........'],
  ],
};

const portalVine3 = {
  palette: { v: '#4e8c4a', L: '#8fd18a', F: '#f7b8cf', C: '#fff3b8' },
  layers: [
    ['...........', 'v.........v', '...........', '.L.......L.'],
    ['...........', 'v.........v', '...........', '.F.......L.'],
    ['...........', 'v.........v', 'L.........L', '.........F.'],
    ['...........', 'v.........v', '...........', '.L.......F.'],
    ['...........', 'v.........v', '...........', '.F.......L.'],
    ['...........', 'v.........v', 'L.........L', '.L.......L.'],
    ['...........', 'v.........v', '...........', '..L..F..L..'],
    ['...........', 'vL.......Lv', '...........', '..LFLFLFL..'],
    ['...........', '.L.......L.', '..L.....L..', '...........'],
    ['...........', '...L...L...', '...........', '....F.F....'],
    ['...........', '...LFLFL...', '....LLL....', '...........'],
    ['...........', '....LFL....', '.....L.....', '...........'],
    ['...........', '.....C.....', '...........', '...........'],
  ],
};

const sign = {
  palette: { W: '#c9985f', w: '#a87a45' },
  layers: [
    ['..w..'],
    ['..w..'],
    ['.....', 'WWWWW'],
    ['.....', 'WWWWW'],
    ['.....', '.WWW.'],
  ],
};

const rockA = {
  palette: { R: '#b8b2a8', r: '#948e84', s: '#cfc9bf' },
  layers: [
    ['.RRR.', 'RRRRR', 'RRRRR', '.RRr.'],
    ['.....', '.RRR.', '.RRRR'],
    ['.....', '.....', '..sR.'],
  ],
};

const rockB = {
  palette: { R: '#b8b2a8', r: '#948e84' },
  layers: [
    ['.RR.', 'RRRR', 'rRRr'],
    ['....', '.RR.', '.Rr.'],
  ],
};

const lantern = {
  palette: { Y: '#ffdf8a', y: '#f0b94f', w: '#a87a45', k: '#7d5540' },
  layers: [
    ['.....', '..w..'],
    ['.yyy.', 'yYYYy', '.yyy.'],
    ['.yYy.', 'YYYYY', '.yYy.'],
    ['.yyy.', 'yYYYy', '.yyy.'],
    ['.....', '..k..'],
  ],
};

const shell = {
  palette: { S: '#ffd9e0', s: '#f0b0c0' },
  layers: [
    ['.SSS.', 'SSSSS', '.sSs.', '..s..'],
    ['.....', '.sSs.'],
  ],
};

const sprout = {
  palette: { g: '#6aa84f', L: '#8fd18a' },
  layers: [
    ['...', '.g.'],
    ['...', 'LgL'],
    ['...', '.L.'],
  ],
};

// Remainder berry: exactly 2 voxels, pink with a green top.
const berry = {
  palette: { B: '#f78bb0', g: '#6aa84f' },
  layers: [
    ['B'],
    ['g'],
  ],
};

// Market stall with striped awning + goods on the counter (island builds).
const stall = {
  palette: { W: '#b08550', w: '#8a6238', R: '#ef7d6d', C: '#fff4e0', Y: '#ffd966', G: '#7ccf7c' },
  layers: [
    ['WWWWW', 'WWWWW'],
    ['WwWwW', 'WWWWW'],
    ['Y.G.Y', 'w...w'],
    ['.....', 'w...w'],
    ['.....', 'w...w'],
    ['RCRCR', 'RCRCR'],
    ['.....', 'RCRCR'],
  ],
};

// Round stone bread oven with a warm glowing mouth + chimney (bakery build).
const oven = {
  palette: { S: '#cfc8bb', s: '#a39d93', F: '#ffb066', f: '#f5854f' },
  layers: [
    ['SSSSS', 'SSSSS'],
    ['SFfFS', 'SsSsS'],
    ['SFFFS', 'SsSsS'],
    ['SSSSS', 'SSSSS'],
    ['.SSS.', '.SsS.'],
    ['..S..', '.....'],
    ['..s..', '.....'],
  ],
};

const counter = {
  palette: { W: '#b08550', w: '#8a6238', T: '#e6c48a', t: '#caa06a' },
  layers: [
    ['WWWWWWWW', 'WWWWWWWW', 'WWWWWWWW'],
    ['WwwwwwWW', 'W......W', 'WWwwwwWW'],
    ['WWWWWWWW', 'W......W', 'WWWWWWWW'],
    ['TTTTTTTT', 'TttttttT', 'TTTTTTTT'],
  ],
};

const prepBoard = {
  palette: { B: '#f2d7a2', b: '#cfab73', F: '#fff2d0' },
  layers: [
    ['.......', '.bbbbb.', '.bbbbb.', '.bbbbb.', '.......'],
    ['.......', '.BBBBB.', '.BFFFB.', '.BBBBB.', '.......'],
  ],
};

const pizzaPan = {
  palette: { P: '#8f8f98', p: '#c9c9d1', C: '#f2c36b', R: '#d95f55' },
  layers: [
    ['.....', '.PPP.', 'PPPPP', '.PPP.', '.....'],
    ['.....', '.pCp.', 'pCRCp', '.pCp.', '.....'],
  ],
};

const doughBowl = {
  palette: { B: '#8fc7d8', b: '#5fa2b8', D: '#fff1cc', d: '#e8cf9a' },
  layers: [
    ['.....', '.bbb.', 'bbbbb', '.bbb.', '.....'],
    ['.....', '.BBB.', 'B...B', '.BBB.', '.....'],
    ['.....', '..D..', '.DdD.', '..D..', '.....'],
  ],
};

const toppingCrate = {
  palette: { W: '#b08550', w: '#8a6238', R: '#e75d5d', G: '#7ccf7c', Y: '#ffd966' },
  layers: [
    ['WWWWWW', 'WWWWWW', 'WWWWWW', 'WWWWWW'],
    ['WwWwWW', 'W....W', 'W....W', 'WWwWwW'],
    ['......', '.R.G..', '..Y.R.', '......'],
  ],
};

const coinTray = {
  palette: { T: '#b8b2a8', t: '#948e84', G: '#f4c95d', g: '#d9a83f' },
  layers: [
    ['.....', '.ttt.', 'ttttt', '.ttt.', '.....'],
    ['.....', '.TGT.', 'TGgGT', '.TGT.', '.....'],
  ],
};

const orderBoard = {
  palette: { W: '#8a6238', B: '#4a5a78', b: '#64789b', C: '#fff4e0', R: '#ef7d6d' },
  layers: [
    ['...W...', '...W...'],
    ['...W...', '...W...'],
    ['.BBBBB.', '.BCCCCB.'],
    ['.BCCCBB', '.BCRCCB.'],
    ['.BBBBB.', '.BBBBB.'],
  ],
};

const shopTable = {
  palette: { W: '#b08550', w: '#8a6238', T: '#d9b27c' },
  layers: [
    ['W.....W', '.......', '.......', 'W.....W'],
    ['W.....W', '.......', '.......', 'W.....W'],
    ['TTTTTTT', 'TTTTTTT', 'TTTTTTT', 'TTTTTTT'],
  ],
};

export const PROPS = {
  palm, palmSmall, bush, flowerPink, flowerYellow, flowerBlue,
  pot, stone, altar, chestBase, chestLid, egg, basket, coconut,
  bananas, stump, gong, plank, portal, portalVine1, portalVine2, portalVine3,
  sign, rockA, rockB,
  lantern, shell, sprout, berry, stall, oven,
  counter, prepBoard, pizzaPan, doughBowl, toppingCrate, coinTray, orderBoard, shopTable,
  grassA, grassB, pebble, mushroom, crystal,
};

// ---------------------------------------------------------------------------
// Ambient critters — the island's living touches (src/ambient.js).
// Two frames per critter; flapping toggles between the cached meshes.
// B/b (bird body) and W (butterfly wings) are recolor slots via withPalette.
// ---------------------------------------------------------------------------

// Songbird, wings spread (gliding / flap-down frame). Faces +Z, beak in front.
const birdSpread = {
  palette: { B: '#7fb8e8', b: '#5e9ed0', C: '#fff4e0', O: '#f5a25d', E: '#2e2433' },
  layers: [
    [ // y0 belly
      '.......',
      '..CCC..',
      '..CCC..',
    ],
    [ // y1 tail + wings out + body
      '...b...',
      'BBBBBBB',
      'bBBBBBb',
      '..BBB..',
    ],
    [ // y2 head, eyes in front, beak pokes out
      '.......',
      '..BBB..',
      '..BBB..',
      '..EBE..',
      '...O...',
    ],
  ],
};

// Same bird, wings tucked (perched / flap-up frame).
const birdFold = {
  palette: { B: '#7fb8e8', b: '#5e9ed0', C: '#fff4e0', O: '#f5a25d', E: '#2e2433' },
  layers: [
    [ // y0 belly
      '.......',
      '..CCC..',
      '..CCC..',
    ],
    [ // y1 tail + folded wings hugging the body
      '...b...',
      '.bBBBb.',
      '.bBBBb.',
      '..BBB..',
    ],
    [ // y2 head
      '.......',
      '..BBB..',
      '..BBB..',
      '..EBE..',
      '...O...',
    ],
  ],
};

// Butterfly seen from above, wings open. Body runs along Z.
const butterflyOpen = {
  palette: { W: '#ffb3c6', B: '#5a4a52' },
  layers: [
    [
      'WW.WW',
      'WWBWW',
      '.WBW.',
    ],
  ],
};

// Wings folded together above the body (the other flap frame).
const butterflyClosed = {
  palette: { W: '#ffb3c6', B: '#5a4a52' },
  layers: [
    [
      '.....',
      '..B..',
      '..B..',
    ],
    [
      '.....',
      '..W..',
      '..W..',
    ],
  ],
};

export const AMBIENT = { birdSpread, birdFold, butterflyOpen, butterflyClosed };
