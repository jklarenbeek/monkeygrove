// Character and pet voxel models — one file each — reassembled into the two
// registries the game consumes. Note the two shapes living side by side here:
//   CHARS — a name->model map. Each value is a bare model ({ palette, layers });
//           the monkey's F/f slots get recolored at render via voxel.withPalette.
//   PETS  — an ordered list of collectible descriptors
//           ({ id, nameKey, rarity, model }). Order is the collection order
//           shown to players, so keep it stable.
import { monkey } from './monkey.js';
import { mimi } from './mimi.js';
import { crab } from './crab.js';
import { crabKing } from './crabKing.js';
import { bunny } from './bunny.js';
import { duckling } from './duckling.js';
import { kitten } from './kitten.js';
import { piglet } from './piglet.js';
import { redpanda } from './redpanda.js';
import { turtle } from './turtle.js';
import { owl } from './owl.js';
import { dragon } from './dragon.js';

export const CHARS = { monkey, mimi, crab, crabKing };

export const PETS = [
  bunny,
  duckling,
  kitten,
  piglet,
  redpanda,
  turtle,
  owl,
  dragon,
];
