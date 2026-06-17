// Cheeky pastel-red crab: dome body, forward claws, big eyes on stalks.
export const crab = {
  palette: {
    R: '#f08a7a',
    r: '#ffb3a0',
    d: '#d96b5d',
    E: '#2e2433',
    W: '#ffffff',
  },
  layers: [
    [ // y0 legs
      '.........',
      '.d.....d.',
      '.........',
      '.d.....d.',
    ],
    [ // y1 body + claw arms forward
      '..RRRRR..',
      '.RRRRRRR.',
      '.RRRRRRR.',
      '.RRRRRRR.',
      'r.rrrrr.r',
      'r.......r',
    ],
    [ // y2 body + open pincers
      '.........',
      '..RRRRR..',
      '.RRRRRRR.',
      '..RRRRR..',
      'r.......r',
      'r.......r',
    ],
    [ // y3 dome top
      '.........',
      '.........',
      '..RRRRR..',
      '..RRRRR..',
    ],
    [ // y4 eye stalks
      '.........',
      '.........',
      '.........',
      '..d...d..',
    ],
    [ // y5 eyes
      '.........',
      '.........',
      '.........',
      '.EE...EE.',
    ],
    [ // y6 eye tops with glints
      '.........',
      '.........',
      '.........',
      '.WE...WE.',
    ],
  ],
};
