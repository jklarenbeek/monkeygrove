export const bunny = {
  id: 'bunny',
  nameKey: 'pet.bunny',
  rarity: 'common',
  model: {
    palette: { B: '#fdf6ec', b: '#e8dcc8', P: '#ffc2d1', E: '#2e2433' },
    layers: [
      ['...b...', '.BBBBB.', '.BBBBB.', '.BBBBB.'],
      ['.......', '.BBBBB.', '.BBBBB.', '.BBBBB.'],
      ['.......', '..BBB..', '.BBBBB.', '.BEPEB.'],
      ['.......', '..BBB..', '..BBB..', '..BBB..'],
      ['.......', '.......', '..B.B..'],
      ['.......', '.......', '..B.B..'],
      ['.......', '.......', '..B.B..'],
      ['.......', '.......', '..P.P..'], // pink ear tips
    ],
  },
  // Full-body standee: used when the bunny is the chosen avatar or full-size
  // set-dressing. Same palette as the chibi so colors stay consistent.
  modelFull: {
    palette: { B: '#fdf6ec', b: '#e8dcc8', P: '#ffc2d1', E: '#2e2433' },
    layers: [
      ['.........', '.........', '..BB.BB..', '..bb.bb..'], // y0 feet
      ['.........', '.........', '..BBBBB..', '..BbbbB..'], // y1 legs
      ['.........', '.........', '.BBBBBBB.', '.BBbbbBB.'], // y2 lower body
      ['.........', '.........', 'BBBBBBBBB', '.BBbbbBB.'], // y3 belly + arms
      ['.........', '.........', '.BBBBBBB.', '.BBBBBBB.'], // y4 chest
      ['.........', '..BBBBB..', '.BBBBBBB.', '.BBBBBBB.'], // y5 head bottom
      ['.........', '..BBBBB..', '.BBBBBBB.', '..BBPBB..'], // y6 muzzle + pink nose
      ['.........', '..BBBBB..', '.BBBBBBB.', '.BEB.BEB.'], // y7 eyes
      ['.........', '..BBBBB..', '.BBBBBBB.', '.BBBBBBB.'], // y8 brow
      ['.........', '...BBB...', '..BBBBB..', '..BBBBB..'], // y9 head crown
      ['.........', '.........', '..B...B..', '..B...B..'], // y10 ear base
      ['.........', '.........', '..B...B..', '..B...B..'], // y11 ears
      ['.........', '.........', '..P...P..', '..P...P..'], // y12 pink ear tips
    ],
  },
};
