export const dragon = {
  id: 'dragon',
  nameKey: 'pet.dragon',
  rarity: 'legendary',
  model: {
    palette: {
      M: '#9fe2c0', w: '#cfeede', B: '#f7f3d7',
      P: '#ffb3c6', E: '#2e2433',
    },
    layers: [
      ['...MM....', '.........', '..MM.MM..'],
      ['....M....', '..MMMMM..', '..MMMMM..', '..MBBBM..'],
      ['.........', '..MMMMM..', '.wMMMMMw.', '..MBBBM..'],
      ['.........', '..MMMMM..', '.wMMMMMw.', '..MMMMM..'],
      ['.........', '..MMMMM..', '.MMMMMMM.', '..MMMMM..', '...BBB...'],
      ['.........', '..MMMMM..', '.MMMMMMM.', '.MEMMMEM.'],
      ['.........', '..MMMMM..', '.MMMMMMM.', '.MMMMMMM.'],
      ['.........', '.........', '..MMMMM..', '..MMMMM..'],
      ['.........', '.........', '...P.P...'], // tiny pink horns
    ],
  },
  // Full-body standee (avatar / set-dressing): spread wings, curling tail,
  // cream belly, pink horns + snout.
  modelFull: {
    palette: {
      M: '#9fe2c0', w: '#cfeede', B: '#f7f3d7',
      P: '#ffb3c6', E: '#2e2433',
    },
    layers: [
      ['.........', '.........', '..MM.MM..', '..ww.ww..'], // y0 feet
      ['......w..', '.........', '..MMMMM..', '..MBBBM..'], // y1 legs + tail
      ['.......w.', '.........', '.MMMMMMM.', '.MBBBBBM.'], // y2 body + tail
      ['......w..', '.........', 'MMMMMMMMM', '.MBBBBBM.'], // y3 body + arms
      ['.........', 'wM.....Mw', '.MMMMMMM.', '.MBBBBBM.'], // y4 chest + wings
      ['.........', '..MMMMM..', '.MMMMMMM.', '.MMMMMMM.'], // y5 head
      ['.........', '..MMMMM..', '.MMMMMMM.', '..MMMMM..', '...BBB...'], // y6 snout
      ['.........', '..MMMMM..', '.MMMMMMM.', '.MEMMMEM.'], // y7 eyes
      ['.........', '..MMMMM..', '.MMMMMMM.', '.MMMMMMM.'], // y8 head top
      ['.........', '.........', '..P...P..', '..P...P..'], // y9 horns
    ],
  },
};
