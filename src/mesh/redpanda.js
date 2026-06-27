export const redpanda = {
  id: 'redpanda',
  nameKey: 'pet.redpanda',
  rarity: 'rare',
  model: {
    palette: { O: '#e8875a', f: '#fff1dc', d: '#5d4037', E: '#2e2433' },
    layers: [
      ['.......', '.d...d.', '.......', '.d...d.'],
      ['...O...', '.OOOOO.', '.OOOOO.', '.OOOOO.'],
      ['...d...', '.OOOOO.', '.OOOOO.', '.OOOOO.'], // ringed tail
      ['...O...', '..OOO..', '.OOOOO.', '.OfffO.'],
      ['.......', '..OOO..', '.OOOOO.', '.fEOEf.', '...d...'],
      ['.......', '.......', '..OOO..', '..OOO..'],
      ['.......', '.......', '..d.d..'],
    ],
  },
  // Full-body standee (avatar / set-dressing): cream face mask, ringed tail.
  modelFull: {
    palette: { O: '#e8875a', f: '#fff1dc', d: '#5d4037', E: '#2e2433' },
    layers: [
      ['.........', '.........', '..d...d..', '..d...d..'], // y0 paws
      ['......d..', '.........', '..OOOOO..', '..OfffO..'], // y1 legs + tail
      ['......O..', '.........', '.OOOOOOO.', '.OfffffO.'], // y2 body + tail ring
      ['......d..', '.........', 'OOOOOOOOO', '.OfffffO.'], // y3 body + arms + tail
      ['......O..', '.........', '.OOOOOOO.', '.OfffffO.'], // y4 chest + tail
      ['.........', '..OOOOO..', '.OOOOOOO.', '.OfffffO.'], // y5 head
      ['.........', '..OOOOO..', '.OfffffO.', '..ffdff..'], // y6 muzzle + dark nose
      ['.........', '..OOOOO..', '.OfffffO.', '.fEf.fEf.'], // y7 eyes (cream mask)
      ['.........', '..OOOOO..', '.OOOOOOO.', '.OOOOOOO.'], // y8 head top
      ['.........', '.O.....O.', '.f.....f.', '.f.....f.'], // y9 ear tufts
    ],
  },
};
