// Unified creature roster: the 10 playable creatures (monkey, mimi + the 8
// pets) that can be a player AVATAR (full-size) and/or a FOLLOWER pet (chibi).
//
// crab/crabKing are deliberately NOT here — they stay narrative NPCs/enemies
// (the Crab King and his little minions), reachable only via CHARS in
// ./index.js. Nothing in this file can ever give them an avatar/pet role.
//
// Each descriptor carries BOTH meshes so any creature renders at either size:
//   small — chibi follower form (~0.45 world height)
//   full  — full-body standee form (avatar ~0.85; set-dressing ~0.55–0.85)
// Consumers resolve via getCreature(id) and pick .small / .full. Cache keys
// MUST stay size-discriminated ('creature:<id>:s' vs ':f') so the two meshes
// of one creature never share geometry.

import { PETS } from './index.js';
import { monkey, monkeyChibi } from './monkey.js';
import { mimi, mimiChibi } from './mimi.js';

// Monkey full-body crown layer — hats anchor here. Mirrors MONKEY_HAT_Y in
// models.js; kept inline to avoid an import cycle through models.js.
const MONKEY_HAT_LAYER = 11;

// The two story characters double as companions: always-owned, fur-tintable,
// and (monkey only) hat-wearing. They are never in the egg-hatch pool.
const monkeyCreature = {
  id: 'monkey', nameKey: 'pet.monkey', rarity: 'companion',
  small: monkeyChibi, full: monkey,
  canBeAvatar: true, canBePet: true, companion: true, isDefault: true,
  fur: true, hat: true, hatY: MONKEY_HAT_LAYER,
};
const mimiCreature = {
  id: 'mimi', nameKey: 'pet.mimi', rarity: 'companion',
  small: mimiChibi, full: mimi,
  canBeAvatar: true, canBePet: true, companion: true, isDefault: false,
  fur: true, hat: false,
};

// Pets come straight from the PETS registry so the two can never drift: same
// id/nameKey/rarity, small = the chibi model, full = the new full-body mesh
// (falling back to the scaled-up chibi if a full mesh is ever missing).
const petCreatures = PETS.map((p) => ({
  id: p.id, nameKey: p.nameKey, rarity: p.rarity,
  small: p.model, full: p.modelFull || p.model,
  canBeAvatar: true, canBePet: true, companion: false, isDefault: false,
  fur: false, hat: false,
}));

// Order: the star first, then his companion, then the collectible pets in
// their collection order. Monkey stays the default avatar.
export const CREATURES = [monkeyCreature, mimiCreature, ...petCreatures];

const BY_ID = new Map(CREATURES.map((c) => [c.id, c]));
export const CREATURE_IDS = CREATURES.map((c) => c.id);
export const DEFAULT_CREATURE_ID = 'monkey';
// Companions are granted to every explorer for free (they're "already yours").
export const COMPANION_IDS = CREATURES.filter((c) => c.companion).map((c) => c.id);

// Resolve a creature by id, falling back to the default (monkey) for an
// unknown/legacy id so a bad save can never leave the player bodiless.
export function getCreature(id) {
  return BY_ID.get(id) || BY_ID.get(DEFAULT_CREATURE_ID);
}

export const AVATAR_CREATURES = CREATURES.filter((c) => c.canBeAvatar);
export const PET_CREATURES = CREATURES.filter((c) => c.canBePet);
