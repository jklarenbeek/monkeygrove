// Mimi the guide: warmer fur, one arm raised in a wave, flower on her head.
export const mimi = {
  palette: {
    F: '#9c6b4a',
    f: '#f5dfc0',
    S: '#ffdcb8',
    E: '#2e2433',
    W: '#ffffff',
    N: '#c08a6a',
    P: '#ffb3c6', // flower petals
    Y: '#ffe28a', // flower heart
  },
  layers: [
    [ // y0 feet
      '...........',
      '...........',
      '...FF.FF...',
      '...ff.ff...',
    ],
    [ // y1 legs + tail
      '...........',
      '.....F.....',
      '...FFFFF...',
      '...FfffF...',
    ],
    [ // y2 left arm down, right arm starting to lift
      '...........',
      '.....F.....',
      '..FFFFFF...',
      '...FfffF...',
    ],
    [ // y3 right arm rising past the shoulder
      '.....F.....',
      '...........',
      '...FFFFFF..',
      '...FfffF...',
    ],
    [ // y4 shoulders + raised arm
      '...........',
      '...........',
      '...FFFFFF..',
      '...FFFFF...',
    ],
    [ // y5 head bottom + waving hand beside the head
      '...........',
      '...FFFFF...',
      '..FFFFFFFf.',
      '..FFFFFFF..',
      '...fffff...',
    ],
    [ // y6 head, muzzle + nose
      '...FFFFF...',
      '..FFFFFFF..',
      '.FFFFFFFFF.',
      '.FFFFFFFFF.',
      '..FSSSSSF..',
      '....fNf....',
    ],
    [ // y7 lower eyes + ears
      '...FFFFF...',
      '..FFFFFFF..',
      'fFFFFFFFFFf',
      '.FFFFFFFFF.',
      '..FEESEEF..',
    ],
    [ // y8 upper eyes with glints + ears
      '...FFFFF...',
      '..FFFFFFF..',
      'fFFFFFFFFFf',
      '.FFFFFFFFF.',
      '..FWESWEF..',
    ],
    [ // y9 brow
      '...FFFFF...',
      '..FFFFFFF..',
      '.FFFFFFFFF.',
      '.FFFFFFFFF.',
      '..FFFfFFF..',
    ],
    [ // y10 head top
      '...........',
      '...FFFFF...',
      '..FFFFFFF..',
      '..FFFFFFF..',
      '...FFFFF...',
    ],
    [ // y11 crown
      '...........',
      '...........',
      '....FFF....',
      '....FFF....',
    ],
    [ // y12 flower
      '...........',
      '...........',
      '.....P.....',
      '....PYP....',
      '.....P.....',
    ],
  ],
};

// Chibi blob: Mimi's small follower form (height ~0.45) when she tags along as
// a pet instead of guiding from the hub. Keeps her warmer fur + flower.
export const mimiChibi = {
  palette: {
    F: '#9c6b4a', f: '#f5dfc0', S: '#ffdcb8', E: '#2e2433',
    W: '#ffffff', N: '#c08a6a', P: '#ffb3c6', Y: '#ffe28a',
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
    ['.......', '...P...', '..PYP..', '...P...'],                  // y8 flower
  ],
};
