export const piglet = {
  id: 'piglet',
  nameKey: 'pet.piglet',
  rarity: 'common',
  model: {
    palette: { P: '#f9b8c4', p: '#e895a8', N: '#e87a96', E: '#2e2433' },
    layers: [
      ['.......', '.PPPPP.', '.PPPPP.', '.PPPPP.'],
      ['...p...', '.PPPPP.', '.PPPPP.', '.PPPPP.', '..NNN..'],
      ['.......', '..PPP..', '.PPPPP.', '.PEPEP.'],
      ['.......', '..PPP..', '.PPPPP.', '..PPP..'],
      ['.......', '.......', '..PPP..'],
      ['.......', '.......', '..p.p..'],
    ],
  },
  // Full-body standee (avatar / set-dressing): snout pokes out, curly tail.
  modelFull: {
    palette: { P: '#f9b8c4', p: '#e895a8', N: '#e87a96', E: '#2e2433' },
    layers: [
      ['.........', '.........', '..PP.PP..', '..pp.pp..'], // y0 feet
      ['......p..', '.........', '..PPPPP..', '..PpppP..'], // y1 legs + tail
      ['......p..', '.........', '.PPPPPPP.', '.PpppppP.'], // y2 body
      ['.........', '.........', 'PPPPPPPPP', '.PpppppP.'], // y3 body + arms
      ['.........', '.........', '.PPPPPPP.', '.PPPPPPP.'], // y4 chest
      ['.........', '..PPPPP..', '.PPPPPPP.', '.PPPPPPP.'], // y5 head
      ['.........', '..PPPPP..', '.PPPPPPP.', '..PPPPP..', '...NNN...'], // y6 snout
      ['.........', '..PPPPP..', '.PPPPPPP.', '.PEPPPEP.'], // y7 eyes
      ['.P.....P.', '..PPPPP..', '.PPPPPPP.', '.PPPPPPP.'], // y8 head top + ear tips
      ['.........', '.........', '.p.....p.', '.p.....p.'], // y9 ears
    ],
  },
};
