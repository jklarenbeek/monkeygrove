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
};

export const RARITY_WEIGHTS = { common: 60, rare: 25, epic: 12, legendary: 3 };
export const RARITY_STARS = { common: '⭐', rare: '🌟', epic: '💜', legendary: '🌈' };

export const IS_TOUCH = typeof window !== 'undefined' &&
  ('ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0);

export const QUALITY = (() => {
  if (typeof window === 'undefined') return 'high';
  const dpr = window.devicePixelRatio || 1;
  const small = Math.min(window.screen?.width || 1024, window.screen?.height || 768) < 480;
  return (IS_TOUCH && (small || dpr > 2.5)) ? 'low' : 'high';
})();
