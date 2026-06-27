export const owl = {
  id: 'owl',
  nameKey: 'pet.owl',
  rarity: 'epic',
  model: {
    palette: {
      O: '#a99bc9', o: '#8d7fb0', f: '#f5ead7',
      B: '#f5a25d', E: '#2e2433', W: '#ffffff',
    },
    layers: [
      ['.......', '.......', '..B.B..'],
      ['.......', '.OOOOO.', '.OOOOO.', '.OfffO.'],
      ['.......', '.OOOOO.', 'oOOOOOo', '.OfffO.'],
      ['.......', '.OOOOO.', 'oOOOOOo', '.OfffO.'],
      ['.......', '.OOOOO.', '.OOOOO.', '.fEfEf.', '...B...'],
      ['.......', '.OOOOO.', '.OOOOO.', '.fWfWf.'], // big glinted eyes
      ['.......', '..OOO..', '.OOOOO.', '..OOO..'],
      ['.......', '.......', '.o...o.'],
    ],
  },
  // Full-body standee (avatar / set-dressing): folded wings, big glinted eyes,
  // orange beak + talons, ear tufts.
  modelFull: {
    palette: {
      O: '#a99bc9', o: '#8d7fb0', f: '#f5ead7',
      B: '#f5a25d', E: '#2e2433', W: '#ffffff',
    },
    layers: [
      ['.........', '.........', '..B...B..', '..B...B..'], // y0 talons
      ['.........', '.........', '..OOOOO..', '..OfffO..'], // y1 lower body
      ['.........', '.........', 'oOOOOOOOo', '.OfffffO.'], // y2 body + wings
      ['.........', '.........', 'oOOOOOOOo', '.OfffffO.'], // y3 body + wings
      ['.........', '.........', '.OOOOOOO.', '.OfffffO.'], // y4 chest
      ['.........', '..OOOOO..', '.OfffffO.', '.OfffffO.'], // y5 face disk
      ['.........', '..OOOOO..', '.OfffffO.', '.EEfBfEE.'], // y6 eyes + beak
      ['.........', '..OOOOO..', '.OfffffO.', '.WWfffWW.'], // y7 eye glints
      ['.........', 'o.......o', '.OOOOOOO.', '.OOOOOOO.'], // y8 head top + ear tufts
    ],
  },
};
