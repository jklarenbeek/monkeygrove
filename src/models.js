// Voxel model definitions: pure data + metadata.
// Format (consumed by src/voxel.js):
//   { palette: { char: '#rrggbb' }, layers: [ bottom-up Y layers ] }
// Each layer is an array of Z-row strings (z = 0 is the back), each char an
// X voxel. '.' and ' ' are empty. Characters face +Z (face on the high-Z side).
//
// This module is the stable public surface for all model data. The definitions
// live beside it in src/models/ (cosmetics, props, ambient) and src/mesh/
// (characters & pets); everything is re-exported here so callers keep importing
// from './models.js' regardless of where a given model is defined.

import { CHARS, PETS } from './mesh/index.js';

export { CHARS, PETS };

// Unified creature roster (monkey, mimi + 8 pets), each with a small (chibi)
// and full (full-body) mesh + avatar/pet role flags. crab/crabKing are NOT in
// here — see src/mesh/creatures.js. Avatar/pet/set-dressing code resolves
// creatures through getCreature() instead of reaching into CHARS/PETS directly.
export {
  CREATURES, CREATURE_IDS, DEFAULT_CREATURE_ID, COMPANION_IDS,
  AVATAR_CREATURES, PET_CREATURES, getCreature,
} from './mesh/creatures.js';

// Cosmetics (hats, fur recolors, trails) and the monkey hat mount layer.
export { MONKEY_HAT_Y, HATS, FURS, TRAILS } from './models/cosmetics.js';

// Props & scenery, world landmarks, and the hub shop buildings.
export { PROPS } from './models/props.js';

// Ambient critters (songbirds, butterflies) with their two flap frames each.
export { AMBIENT } from './models/ambient.js';
