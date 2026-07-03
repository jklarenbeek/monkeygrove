// Hand-authored chamber layouts + the hub island, as ASCII dioramas. One template
// list per verb kind (fetch/array/numberline/share) plus the single hub board;
// varyLayout (layout.js) flips/carves a picked template so no two boards look alike.
//
// Template chars:
//   #  void (water)          .  floor      ,  floor (alt shade)
//   1  raised h1 (decor path; walkable)    2  raised h2
//   P  player spawn   A  altar   s  stone pedestal   p  pot (hides a stone)
//   c  crab patrol    D  exit door/portal  d  themed decoration
//   o  soil cell (array verb)   B  basket (share)   m  stump (share)
//   V  vine-bridge tile (numberline)   M  helper spot (mimi in the hub,
//   a friendly pet NPC in chambers)
//   hub only: T gem tree, O shop stand, N egg nest, t/g/u/y world portals,
//   l/f/e/h/k/z/b/j island build plots (island.js BUILDS; k bakery, z pizzeria),
//   w bridge-gap water
//   (becomes 'V' planks once the bridge is built, '#' before — island.js)

export const TEMPLATES = {
  fetch: [
    [
      '##############',
      '#,.d......d.,#',
      '#..s......s..#',
      '#..........M.#',
      '#.s....A...s.#',
      '#............#',
      '#...c........#',
      '#.p........p.#',
      '#..s......s..#',
      '#......P.....#',
      '#.d........d.#',
      '##############',
    ],
    [
      '#############',
      '##,.d...d.,##',
      '#.s.......s.#',
      '#...11111...#',
      '#.s.1...1.s.#',
      '#.....A..M..#',
      '#.....c.....#',
      '#,p.......p,#',
      '#.s..P....s.#',
      '##.d.....d.##',
      '#############',
    ],
    [
      '################',
      '#,.d.......s..,#',
      '#..p...A...p...#',
      '#.s..........s.#',
      '#....c.....c...#',
      '#..........M...#',
      '#.s..........s.#',
      '#......P....s..#',
      '#.,d........d,.#',
      '################',
    ],
  ],
  array: [
    [
      '##################',
      '#,.d..........d.,#',
      '#..oooooooooo..s.#',
      '#..oooooooooo....#',
      '#..oooooooooo..A.#',
      '#..oooooooooo....#',
      '#..oooooooooo..s.#',
      '#..oooooooooo....#',
      '#..oooooooooo..M.#',
      '#..oooooooooo..s.#',
      '#..s....P........#',
      '#.d............d.#',
      '##################',
    ],
    [
      '##################',
      '#,.d...........d,#',
      '#..s...........s.#',
      '#...oooooooooo...#',
      '#...oooooooooo.A.#',
      '#...oooooooooo...#',
      '#...oooooooooo.M.#',
      '#...oooooooooo...#',
      '#...oooooooooo.s.#',
      '#...oooooooooo...#',
      '#...oooooooooo...#',
      '#.s.....P......d.#',
      '##################',
    ],
  ],
  numberline: [
    [
      '##########################',
      '#,d....................d,#',
      '#..M..s............s..A,.#',
      '#.,VVVVVVVVVVVVVVVVVVVVV.#',
      '#......................,.#',
      '#..P..s............s...d.#',
      '##########################',
    ],
    [
      '########################',
      '#,d..................d,#',
      '#...s..........s....M..#',
      '#..VVVVVVVVVVVVVVVVVV..#',
      '#....,.............,...#',
      '#..P....s........s...A.#',
      '########################',
    ],
  ],
  share: [
    [
      '###############',
      '#,.d.......d.,#',
      '#..B...B...B..#',
      '#.s....M....s.#',
      '#......m......#',
      '#....c....A...#',
      '#..B...B...B..#',
      '#.s...P....s..#',
      '#.,d.......d,.#',
      '###############',
    ],
    [
      '###############',
      '#,.d..M....d.,#',
      '#..B..B..B....#',
      '#.s........s..#',
      '#....m....A...#',
      '#.s........s..#',
      '#..B..B..B....#',
      '#....P.....c..#',
      '#.,d.......d,.#',
      '###############',
    ],
  ],
  hub: [
    // East of the shore: the festival islet, reached over the 'w' bridge gap
    // once the bridge build is funded (island.js applyIslandRows).
    [
      '################################',
      '###,.....dd......d.,############',
      '##..t...........g..f.###########',
      '#..........d..........##########',
      '#.d.....1111111......d.#########',
      '#.......1,,,,,1........#########',
      '#.h.d...1,,T,,1...N....#########',
      '#.......1,,,,,1........###....##',
      '#.......1111111.l..d...##......#',
      '#..d.........M........bwww..j..#',
      '#......................##......#',
      '#...O.......P......d...###....##',
      '#.......k.z.......e....#########',
      '#.d..........,,....d...#########',
      '##..u...........y....###########',
      '###,....dd.....d..,#############',
      '################################',
    ],
  ],
};

export const HUB_PORTALS = { t: 'tide', g: 'garden', u: 'stump', y: 'vines' };
