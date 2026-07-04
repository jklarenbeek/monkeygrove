// Ambient critters — the island's living touches (src/ambient.js). Pure data,
// consumed via src/models.js. Two frames per critter; flapping toggles between the
// cached meshes. B/b (bird body) and W (butterfly wings) are recolor slots via
// withPalette. See models.js for the palette + bottom-up Y-layer model format.

// Songbird, wings spread (gliding / flap-down frame). Faces +Z, beak in front.
const birdSpread = {
  palette: { B: '#7fb8e8', b: '#5e9ed0', C: '#fff4e0', O: '#f5a25d', E: '#2e2433' },
  layers: [
    [ // y0 belly
      '.......',
      '..CCC..',
      '..CCC..',
    ],
    [ // y1 tail + wings out + body
      '...b...',
      'BBBBBBB',
      'bBBBBBb',
      '..BBB..',
    ],
    [ // y2 head, eyes in front, beak pokes out
      '.......',
      '..BBB..',
      '..BBB..',
      '..EBE..',
      '...O...',
    ],
  ],
};

// Same bird, wings tucked (perched / flap-up frame).
const birdFold = {
  palette: { B: '#7fb8e8', b: '#5e9ed0', C: '#fff4e0', O: '#f5a25d', E: '#2e2433' },
  layers: [
    [ // y0 belly
      '.......',
      '..CCC..',
      '..CCC..',
    ],
    [ // y1 tail + folded wings hugging the body
      '...b...',
      '.bBBBb.',
      '.bBBBb.',
      '..BBB..',
    ],
    [ // y2 head
      '.......',
      '..BBB..',
      '..BBB..',
      '..EBE..',
      '...O...',
    ],
  ],
};

// Butterfly seen from above, wings open. Body runs along Z.
const butterflyOpen = {
  palette: { W: '#ffb3c6', B: '#5a4a52' },
  layers: [
    [
      'WW.WW',
      'WWBWW',
      '.WBW.',
    ],
  ],
};

// Wings folded together above the body (the other flap frame).
const butterflyClosed = {
  palette: { W: '#ffb3c6', B: '#5a4a52' },
  layers: [
    [
      '.....',
      '..B..',
      '..B..',
    ],
    [
      '.....',
      '..W..',
      '..W..',
    ],
  ],
};

export const AMBIENT = { birdSpread, birdFold, butterflyOpen, butterflyClosed };
