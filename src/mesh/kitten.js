export const kitten = {
  id: 'kitten',
  nameKey: 'pet.kitten',
  rarity: 'common',
  model: {
    palette: { G: '#cfd4dd', g: '#aeb4c0', P: '#ffc2d1', E: '#2e2433' },
    layers: [
      ['.......', '.GGGGG.', '.GGGGG.', '.GGGGG.'],
      ['.g.....', '.GGGGG.', '.GGGGG.', '.GGGGG.'],
      ['.g.....', '..GGG..', '.GGGGG.', '.GEPEG.'],
      ['.g.....', '..GGG..', '.GGGGG.', '.GGGGG.'],
      ['.......', '.......', '..GGG..', '..GGG..'],
      ['.......', '.......', '..G.G..'],
      ['.......', '.......', '..P.P..'],
    ],
  },
  // Full-body standee (avatar / set-dressing): triangle ears, curling tail.
  modelFull: {
    palette: { G: '#cfd4dd', g: '#aeb4c0', P: '#ffc2d1', E: '#2e2433' },
    layers: [
      ['.........', '.........', '..GG.GG..', '..gg.gg..'], // y0 feet
      ['.....g...', '.........', '..GGGGG..', '..GgggG..'], // y1 legs + tail base
      ['......g..', '.........', '.GGGGGGG.', '.GgggggG.'], // y2 body + tail
      ['......g..', '.........', 'GGGGGGGGG', '.GgggggG.'], // y3 body + arms + tail
      ['.........', '.........', '.GGGGGGG.', '.GGGGGGG.'], // y4 chest
      ['.........', '..GGGGG..', '.GGGGGGG.', '.GGGGGGG.'], // y5 head
      ['.........', '..GGGGG..', '.GGGGGGG.', '..GGPGG..'], // y6 pink nose
      ['.........', '..GGGGG..', '.GGGGGGG.', '.GEG.GEG.'], // y7 eyes
      ['.........', '..GGGGG..', '.GGGGGGG.', '.GGGGGGG.'], // y8 head top
      ['.........', '.G.....G.', '.GGGGGGG.', '.GGGGGGG.'], // y9 ear base
      ['.........', '.........', '.g.....g.', '.g.....g.'], // y10 ear tips
    ],
  },
};
