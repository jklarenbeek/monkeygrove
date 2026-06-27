export const duckling = {
  id: 'duckling',
  nameKey: 'pet.duckling',
  rarity: 'common',
  model: {
    palette: { Y: '#ffe28a', y: '#f0c95e', O: '#f5a25d', E: '#2e2433' },
    layers: [
      ['.......', '.......', '..O.O..'],
      ['...y...', '.YYYYY.', '.YYYYY.', '..YYY..'],
      ['.......', '.YYYYY.', 'yYYYYYy', '..YYY..'],
      ['.......', '..YYY..', '.YYYYY.', '..YYY..'],
      ['.......', '..YYY..', '.YYYYY.', '..EYE..', '...O...'],
      ['.......', '.......', '..YYY..', '...Y...'],
    ],
  },
  // Full-body standee (avatar / set-dressing). Orange webbed feet + beak.
  modelFull: {
    palette: { Y: '#ffe28a', y: '#f0c95e', O: '#f5a25d', E: '#2e2433' },
    layers: [
      ['.........', '.........', '..O...O..', '..O...O..'], // y0 webbed feet
      ['.........', '.........', '..YYYYY..', '..YyyyY..'], // y1 legs
      ['.........', '.........', '.YYYYYYY.', '.YyyyyyY.'], // y2 body
      ['.........', '.........', 'YYYYYYYYY', '.YyyyyyY.'], // y3 body + wings
      ['.........', '.........', '.YYYYYYY.', '.YYYYYYY.'], // y4 chest
      ['.........', '..YYYYY..', '.YYYYYYY.', '.YYYYYYY.'], // y5 head bottom
      ['.........', '..YYYYY..', '.YYYYYYY.', '..YYYYY..', '...OOO...'], // y6 head + beak
      ['.........', '..YYYYY..', '.YYYYYYY.', '.YEYYYEY.'], // y7 eyes
      ['.........', '..YYYYY..', '.YYYYYYY.', '.YYYYYYY.'], // y8 head top
      ['.........', '...YYY...', '..YYYYY..', '..YYYYY..'], // y9 crown
      ['.........', '.........', '....y....', '....Y....'], // y10 tuft
    ],
  },
};
