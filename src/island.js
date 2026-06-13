// Island restoration — pure logic, no DOM, no three.js.
//
// The ACNH-style build loop on top of the math core: mastery unlocks each
// blueprint (so story progress can never be farmed with easy chambers),
// bananas pay the materials (so the child still chooses build vs. hat).
// Choices only ever sequence content — nothing is ever missable.
//
// Blueprint gating uses "progress points": the sum of the four world mastery
// percentages from masteryReport (0..4). It rises smoothly with ratings even
// before full mastery, so a new blueprint is always quietly getting closer.

// Each build: a plot char in the hub template (chamber.js), a banana cost,
// a points threshold, and optionally an NPC who moves in and a daily perk.
// The finale (plaza) additionally needs the bridge and the Crab King pays
// half from his returned hoard (`contribution`).
export const BUILDS = [
  { id: 'lanterns', char: 'l', cost: 30, points: 0.25, emoji: '🏮' },
  {
    id: 'fruitstand', char: 'f', cost: 60, points: 0.7, emoji: '🍉',
    npc: { pet: 'redpanda', face: '🦊' },
    perk: { kind: 'bananas', n: 8 },
  },
  { id: 'garden', char: 'e', cost: 90, points: 1.2, emoji: '🌺' },
  {
    id: 'stage', char: 'h', cost: 120, points: 1.8, emoji: '🎵',
    npc: { pet: 'kitten', face: '🐱' },
  },
  {
    id: 'bakery', char: 'k', cost: 150, points: 2.4, emoji: '🥐',
    npc: { pet: 'piglet', face: '🐷' },
    perk: { kind: 'egg', n: 3 },
  },
  { id: 'bridge', char: 'b', cost: 200, points: 3.0, emoji: '🌉' },
  {
    id: 'plaza', char: 'j', cost: 500, contribution: 250, points: 3.4,
    needs: ['bridge'], emoji: '🎪', finale: true,
  },
];

export const BUILD_TOTAL = BUILDS.length;

const byId = {};
for (const b of BUILDS) byId[b.id] = b;
export const buildById = (id) => byId[id] || null;

export function freshIsland() {
  return { built: [], seen: [], perkDay: null };
}

// Heal saves from before the island existed (and keep migrate() additive).
export function ensureIsland(profile) {
  if (!profile.island) profile.island = freshIsland();
  for (const [k, v] of Object.entries(freshIsland())) {
    if (profile.island[k] === undefined) profile.island[k] = v;
  }
  return profile.island;
}

// Sum of world mastery percentages (masteryReport().worlds[w].pct), 0..4.
export function progressPoints(report) {
  let pts = 0;
  for (const info of Object.values(report.worlds)) pts += info.pct;
  return pts;
}

export const isBuilt = (profile, id) => ensureIsland(profile).built.includes(id);

// What the child pays: the Crab King's contribution comes off the top.
export const playerCost = (build) => build.cost - (build.contribution || 0);

// 'built' | 'unlocked' (blueprint on the worktable) | 'locked' (still a dream)
export function buildState(profile, build, report) {
  if (isBuilt(profile, build.id)) return 'built';
  if (progressPoints(report) < build.points) return 'locked';
  for (const need of build.needs || []) {
    if (!isBuilt(profile, need)) return 'locked';
  }
  return 'unlocked';
}

// Full status list in build order, for the worktable screen and the hub.
export function islandStatus(profile, report) {
  return BUILDS.map((b) => ({
    ...b,
    state: buildState(profile, b, report),
    playerCost: playerCost(b),
  }));
}

// Blueprints that just became visible and were never announced yet.
export function newBlueprints(profile, report) {
  const island = ensureIsland(profile);
  return islandStatus(profile, report).filter(
    (b) => b.state === 'unlocked' && !island.seen.includes(b.id),
  );
}

export function markSeen(profile, ids) {
  const island = ensureIsland(profile);
  for (const id of ids) if (!island.seen.includes(id)) island.seen.push(id);
}

export function canFund(profile, build, report) {
  return buildState(profile, build, report) === 'unlocked'
    && profile.bananas >= playerCost(build);
}

// Spend and build. Caller persists and rebuilds the hub.
export function fund(profile, build, report) {
  if (!canFund(profile, build, report)) return false;
  profile.bananas -= playerCost(build);
  ensureIsland(profile).built.push(build.id);
  return true;
}

// Daily perks from finished builds (fruit stand bananas, bakery bread for
// the egg). Granted at most once per calendar day; caller applies + toasts.
export function grantDailyPerks(profile, today) {
  const island = ensureIsland(profile);
  if (island.perkDay === today) return [];
  island.perkDay = today;
  return BUILDS
    .filter((b) => b.perk && island.built.includes(b.id))
    .map((b) => ({ id: b.id, ...b.perk }));
}

// Hub template transform: 'w' cells are the bridge gap — open water until
// the bridge is built, plank tiles ('V') afterwards. Runs before parseLayout
// so walkability and floor rendering stay honest.
export function applyIslandRows(rows, built) {
  const bridge = built.includes('bridge');
  return rows.map((r) => r.replace(/w/g, bridge ? 'V' : '#'));
}
