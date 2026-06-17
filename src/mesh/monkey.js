// Player monkey. 12 voxels tall, head is 7 of them (y5..y11) for that
// big-headed chibi look. Palette slots F/f/S/E/W/N are the recolor contract:
// FURS entries override F and f via voxel.withPalette().
export const monkey = {
  palette: {
    F: '#8a5a3b', // primary fur
    f: '#f0d6b3', // light fur: belly, muzzle, inner ears
    S: '#ffd9b0', // face skin
    E: '#2e2433', // eyes
    W: '#ffffff', // eye glints
    N: '#b87a5e', // nose
  },
  layers: [
    [ // y0 feet
      '...........',
      '...........',
      '...FF.FF...',
      '...ff.ff...',
    ],
    [ // y1 legs + tail base
      '...........',
      '.....F.....',
      '...FFFFF...',
      '...FfffF...',
    ],
    [ // y2 body + arms
      '...........',
      '.....F.....',
      '..FFFFFFF..',
      '...FfffF...',
    ],
    [ // y3 body + arms, tail tip curls back
      '.....F.....',
      '...........',
      '..FFFFFFF..',
      '...FfffF...',
    ],
    [ // y4 shoulders
      '...........',
      '...........',
      '...FFFFF...',
      '...FFFFF...',
    ],
    [ // y5 head bottom (chamfered) + light jaw
      '...........',
      '...FFFFF...',
      '..FFFFFFF..',
      '..FFFFFFF..',
      '...fffff...',
    ],
    [ // y6 head, muzzle + nose poke out front
      '...FFFFF...',
      '..FFFFFFF..',
      '.FFFFFFFFF.',
      '.FFFFFFFFF.',
      '..FSSSSSF..',
      '....fNf....',
    ],
    [ // y7 head, lower eye row + ears
      '...FFFFF...',
      '..FFFFFFF..',
      'fFFFFFFFFFf',
      '.FFFFFFFFF.',
      '..FEESEEF..',
    ],
    [ // y8 head, upper eye row with glints + ears
      '...FFFFF...',
      '..FFFFFFF..',
      'fFFFFFFFFFf',
      '.FFFFFFFFF.',
      '..FWESWEF..',
    ],
    [ // y9 brow with a light tuft
      '...FFFFF...',
      '..FFFFFFF..',
      '.FFFFFFFFF.',
      '.FFFFFFFFF.',
      '..FFFfFFF..',
    ],
    [ // y10 head top (chamfered)
      '...........',
      '...FFFFF...',
      '..FFFFFFF..',
      '..FFFFFFF..',
      '...FFFFF...',
    ],
    [ // y11 crown — hats sit here
      '...........',
      '...........',
      '....FFF....',
      '....FFF....',
    ],
  ],
};
