export const turtle = {
  id: 'turtle',
  nameKey: 'pet.turtle',
  rarity: 'rare',
  model: {
    palette: { G: '#7cc08a', g: '#5fa46e', K: '#cfe8a8', E: '#2e2433' },
    layers: [
      ['.......', '.K...K.', '.......', '.K...K.'],
      ['.......', '.GGGGG.', '.GGGGG.', '.GGGGG.', '..KKK..'],
      ['.......', '.GGGGG.', '.GGGGG.', '.GGGGG.', '..EKE..'],
      ['.......', '..GgG..', '.gGGGg.', '..GgG..'],
      ['.......', '.......', '..GGG..'],
      ['.......', '.......', '...g...'],
    ],
  },
  // Full-body standee (avatar / set-dressing): domed patterned shell, four
  // stubby legs, head poking forward with eyes. 11 wide, low and wide.
  modelFull: {
    palette: { G: '#7cc08a', g: '#5fa46e', K: '#cfe8a8', E: '#2e2433' },
    layers: [
      ['...........', '...........', '.gg.....gg.', '.gg.....gg.'], // y0 four legs
      ['...........', '..GGGGGGG..', '.GGGGGGGGG.', '.GGGGGGGGG.', '....KKK....'], // y1 shell rim + neck
      ['...........', '..GKGKGKG..', '.GGGGGGGGG.', '..GGGGGGG..', '...KEKEK...'], // y2 shell pattern + head
      ['...........', '...GGGGG...', '..GgGgGgG..', '...GGGGG...'], // y3 dome
      ['...........', '...........', '....GGG....', '....ggg....'], // y4 dome top
    ],
  },
};
