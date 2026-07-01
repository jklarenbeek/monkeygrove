// Story-mode pacing & reflection helpers — pure, thin wrappers over the yijingjs
// transforms the story bible names as its deep mechanics (docs/story/README.md
// §4 & §8). Kept separate so the selector/echo CAN call them, without forcing the
// proven adaptive math engine to change.
//
// - echoShadow: the Gray Echo Realm is the island's INVERSION (yijing_invert) —
//   the flip/shadow world where review ("tending") happens. Drawing the shadow of
//   the founding hexagram gives the realm its look.
// - neighborHexes / gentle ramp: the kindest difficulty ramp is a gray-code walk
//   of the hexagram cube — the next step is exactly ONE line away
//   (yijing_neighbors). This expresses the "one knob harder, never a cliff"
//   principle; problem selection still flows through mathengine's Elo targeting,
//   which already implements that ramp. These helpers ready the spine for a future
//   story-driven selector without overriding the tested pedagogy today.
import '../polyfills.js'; // MUST precede the vendored engine: it shims Object.groupBy
import { yijing_invert, yijing_neighbors, yijing_distance } from '../yijing/yijing.js';

// The shadow/echo of a hexagram: every line flipped (yin<->yang). Used to render
// the Gray Echo Realm as the island's mirror.
export const echoShadow = (hexagram) => yijing_invert(hexagram);

// The six hexagrams exactly one line away — the gentle-ramp neighbourhood.
export const neighborHexes = (hexagram) => yijing_neighbors(hexagram);

// How many lines differ between two island states (0..6).
export const stepDistance = (a, b) => yijing_distance(a, b);

// True when b is one gentle line-change from a (the anti-anxiety step size).
export const isGentleStep = (a, b) => yijing_distance(a, b) === 1;

// The gray-code selector (SUPER_PROMPT Phase 6 / the Book's "one line at a time").
// Given the current knob-state as a 6-bit hexagram and several candidate next states,
// pick the GENTLEST gray-code step: never the same state, prefer exactly one line
// different (a single knob turned), else the closest available. Deterministic ties
// (lowest hex) so replays are byte-identical. A caller maps a problem's parameters
// (tier, kind, scaffold, magnitude...) to knob bits; this keeps consecutive problems a
// single gentle change apart instead of a cliff, the way yijing_neighbors walks the cube.
export function gentleNextHex(currentHex, optionHexes = []) {
  let best = null;
  let bestDist = Infinity;
  for (const h of optionHexes) {
    const d = yijing_distance(currentHex, h);
    if (d === 0) continue; // never serve the exact same knob-state twice in a row
    if (d < bestDist || (d === bestDist && (best === null || h < best))) {
      best = h;
      bestDist = d;
    }
  }
  return best;
}
