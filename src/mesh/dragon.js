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
};
