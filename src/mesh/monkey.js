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

// Chibi blob: the small follower form used when the monkey is someone else's
// pet (height ~0.45). Keeps the F/f/S/E/W/N recolor contract so FURS still
// tint a follower monkey, and a flat head top so it sits like the pet chibis.
export const monkeyChibi = {
  palette: {
    F: '#8a5a3b', f: '#f0d6b3', S: '#ffd9b0',
    E: '#2e2433', W: '#ffffff', N: '#b87a5e',
  },
  layers: [
    ['.......', '.......', '..F.F..', '..f.f..'],                  // y0 feet
    ['.......', '.FFFFF.', '.FFFFF.', '.FfffF.'],                  // y1 body
    ['.......', '.FFFFF.', 'fFFFFFf', '.FfffF.'],                  // y2 body + arms
    ['.......', '..FFF..', '.FFFFF.', '..FFF..'],                  // y3 neck
    ['.FFFFF.', 'FFFFFFF', 'FFFFFFF', '.FSSSF.', '..fNf..'],       // y4 head + muzzle + nose
    ['.FFFFF.', 'fFFFFFf', 'FFFFFFF', 'FEESEEF'],                  // y5 lower eyes + ears
    ['.FFFFF.', 'fFFFFFf', 'FFFFFFF', 'FWESEWF'],                  // y6 upper eyes + glints
    ['.......', '.FFFFF.', '.FFFFF.', '..FFF..'],                  // y7 head top
  ],
};
