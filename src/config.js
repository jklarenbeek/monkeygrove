// Central knobs: palette, grid metrics, timing, balance.

export const TILE = 1;              // world units per grid cell
export const STEP_H = 0.45;         // world units per height level
export const HOP_MS = 190;          // player hop duration
export const HOP_ARC = 0.38;        // hop arc height

export const PALETTE = {
  skyTop: 0xbfe8f7,
  water: 0x7ec8e3,
  waterDeep: 0x5fb0d4,
  sand: 0xf2e3c6,
  sandDark: 0xe4d0a8,
  grass: 0x8fd18a,
  grassDark: 0x6dbd72,
  gray: 0xb8b2a8,      // unbloomed island tint
  grayDark: 0xa39d93,
  soil: 0xb98a5e,
  soilDark: 0xa1764e,
  stone: 0xcfc8bb,
  gold: 0xf4c95d,
  glow: 0xfff3b8,
  pink: 0xf7b8cf,
  crab: 0xff9b85,
};

// world theming: floor colors, deco prop sets, accent, gate-flower color
export const WORLD_THEME = {
  hub:    { floor: 'grass', accent: 0xffd966, bloom: '#ffd966', emoji: '🏝️' },
  tide:   { floor: 'sand',  accent: 0x8fd0e8, bloom: '#8fd0e8', emoji: '🌊' },
  garden: { floor: 'grass', accent: 0x7ccf7c, bloom: '#ffd966', emoji: '🌱' },
  stump:  { floor: 'sand',  accent: 0xd9906f, bloom: '#ffb38a', emoji: '🥥' },
  vines:  { floor: 'grass', accent: 0xc9a6ff, bloom: '#c9a6ff', emoji: '🍇' },
};

// ---- Cell markers ---------------------------------------------------------
// Single-character codes the chamber/hub templates use for special cells (see
// chamber.js for the full template legend + marker extraction). These named
// constants and the two membership sets below are the ONE source of truth for
// "what does this cell char mean": call sites ask the sets, never hand-rolled
// string literals, so adding or renaming a marker can't silently drift apart
// between files (the old bug: two near-identical 'AsPp…' strings, one per file).
export const MARKERS = {
  PLAYER: 'P', ALTAR: 'A', STONE: 's', POT: 'p', CRAB: 'c', DOOR: 'D',
  DECO: 'd', SOIL: 'o', BASKET: 'B', STUMP: 'm', VINE: 'V', HELPER: 'M',
  GEM_TREE: 'T', SHOP: 'O', NEST: 'N',
};

// Plain walkable floor — the only tiles ambient critters, scattered fetch
// stones, and wandering NPCs may settle on. '.' = floor, ',' = alt shade.
export const FLOOR_CHARS = new Set(['.', ',']);

// SOLID: cells a crab patrol can't cross (main.js patrolReach). Note what is
// deliberately ABSENT — 'c' (other crabs are mobile; their marker is just the
// floor they spawned on) and 'D' (the exit door is open ground a crab may
// wander over). 'P' (player spawn) IS solid, so a patrol never paces onto the
// cell the monkey appears on.
export const SOLID_MARKERS = new Set([
  MARKERS.ALTAR, MARKERS.STONE, MARKERS.PLAYER, MARKERS.POT, MARKERS.BASKET,
  MARKERS.STUMP, MARKERS.HELPER, MARKERS.VINE, MARKERS.SOIL,
  MARKERS.GEM_TREE, MARKERS.SHOP, MARKERS.NEST,
]);

// OCCUPIED: cells a painted floor model (array bed, share baskets, number
// strip) can't be laid on (verbs.js FloorModel._free). Everything SOLID, PLUS
// 'c' and 'D': you may block a crab's *path* with a math model, but never
// paint one UNDER a crab's home cell or OVER the exit door's portal art.
export const OCCUPIED_MARKERS = new Set([...SOLID_MARKERS, MARKERS.CRAB, MARKERS.DOOR]);

// Living gates: each hub portal blooms in stages with that world's mastery
// pct (the same number that drives the island bloom). Stages never go down —
// mistakes can't wilt a gate.
export const PORTAL_STAGES = [0.12, 0.35, 0.6, 0.88];

export function portalStage(pct) {
  let stage = 0;
  for (const th of PORTAL_STAGES) if ((pct ?? 0) >= th) stage++;
  return stage; // 0..4
}

export const BALANCE = {
  problemsPerChamber: 3,
  bananasPerCorrect: [3, 5],        // min..max banana pickups that fountain out
  bananasChestBase: 10,
  comboBonus: 2,                    // extra bananas per combo step
  crabSteal: 3,
  eggPerCorrect: 1,
  eggPerBerry: 1,
  eggGoal: 30,                      // egg points to hatch
  echoDoorChance: 0.30,
  echoProblems: 2,
  hatRandomChestChance: 0.05,
  streakFreezePrice: 40,
  petBananaBonus: 0.1,              // +10% bananas with a pet equipped
  businessOrdersPerDay: 4,
  businessMaxQueue: 3,
  businessBananaReward: [2, 4],
  bakeMs: 4500,                     // bake time for one oven; extra ovens bake faster
  businessStartingStock: {
    dough: 6,
    sauce: 6,
    cheese: 6,
    tomato: 4,
    flour: 6,
    berries: 4,
    milk: 4,
  },
};

export const RARITY_WEIGHTS = { common: 60, rare: 25, epic: 12, legendary: 3 };
export const RARITY_STARS = { common: '⭐', rare: '🌟', epic: '💜', legendary: '🌈' };

export const IS_TOUCH = typeof window !== 'undefined' &&
  ('ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0);

// Startup zoom on portrait phones, where the whole-board fit sits too far back
// to feel inviting. Desktop & landscape keep 1 (full board); the number line
// also stays at 1 so both ends remain visible for magnitude estimation. Pinch
// always overrides. Tune these to taste.
export const MOBILE_DEFAULT_ZOOM = { hub: 1.8, chamber: 1.5 };

export const QUALITY = (() => {
  if (typeof window === 'undefined') return 'high';
  const dpr = window.devicePixelRatio || 1;
  const small = Math.min(window.screen?.width || 1024, window.screen?.height || 768) < 480;
  return (IS_TOUCH && (small || dpr > 2.5)) ? 'low' : 'high';
})();
