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
