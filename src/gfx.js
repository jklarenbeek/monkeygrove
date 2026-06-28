// Quality tiers — the foundation every later "liveliness" phase keys off.
//
// Instead of the old binary QUALITY ('low' | 'high'), the renderer and every scene
// feature read a single resolved feature-flag object, `GFX`, computed ONCE per
// session from three inputs: the auto-detected device tier, the player's "Graphics"
// setting, and reducedMotion(). Later phases ask `GFX.bloom`, `GFX.fog`,
// `GFX.decorDensity`, … instead of scattering ad-hoc `if (QUALITY === 'high')`
// checks — and so there is a single, testable place that guarantees a clean
// rollback boundary.
//
// HARD RULES (tested in tests/gfx.test.mjs):
//   1. The `low` tier reproduces today's renderer exactly.
//   2. The default 'auto' setting leaves today's behaviour unchanged (on a desktop
//      that means today's `high`; on a low-end touch device today's `low`).
// Because of (1)/(2) the per-tier table below is intentionally conservative: only
// `shadows`/`shadowMapSize` are wired up in Phase 0 (world.js). Every other flag is
// declared so later phases have a home, but flipping one on is that phase's job, not
// this one's — so `high` keeps shadowMapSize at today's 1024 (Phase 2 raises it).
import { QUALITY } from './config.js';
import { settings } from './state.js';
import { reducedMotion as a11yReducedMotion } from './a11y.js';

// The valid values for the user-facing "Graphics" setting.
export const GRAPHICS_SETTINGS = ['auto', 'low', 'medium', 'high'];

// Auto device tier == today's QUALITY heuristic (touch + small screen or very high
// DPR → 'low', else 'high'). 'medium' is never auto-detected; it only appears when
// the player explicitly opts into it.
export function detectDeviceTier() { return QUALITY; }

// Per-tier flag sets. Tune per phase; keep the `low` column == today's renderer.
const TIERS = {
  low: {
    tier: 'low',
    shadows: false, shadowMapSize: 0, contactShadows: true,   // P2
    toneMap: false, fog: false,                                // P1
    bloom: false, bloomHalfRes: false, glowSprites: true,      // P6
    dof: false,                                                // P12
    decorDensity: 0, ambientScale: 0.35,                       // P3 / P4-P5
    water: 'flat',                                             // P7
    npcRoutines: 'limited', cameraMoments: 'minimal',          // P9 / P12
    perspectiveHub: false,                                     // P12 (optional)
  },
  medium: {
    tier: 'medium',
    shadows: true, shadowMapSize: 1024, contactShadows: true,
    toneMap: true, fog: true,
    bloom: false, bloomHalfRes: false, glowSprites: true,
    dof: false,
    decorDensity: 1, ambientScale: 0.75,
    water: 'animated',
    npcRoutines: 'full', cameraMoments: 'full',
    perspectiveHub: false,
  },
  high: {
    tier: 'high',
    // Phase 2 raised the high-tier sun shadow map 1024 → 2048 (crisper, with bias
    // re-tuned for the finer texel in world.js). Medium stays 1024; low stays off.
    shadows: true, shadowMapSize: 2048, contactShadows: true,
    toneMap: true, fog: true,
    bloom: true, bloomHalfRes: true, glowSprites: true,
    dof: true,
    decorDensity: 2, ambientScale: 1.0,
    water: 'animated',
    npcRoutines: 'full', cameraMoments: 'full',
    perspectiveHub: false,
  },
};

// Pure resolver — exported for testing. Given the device `tier`, the user `setting`
// ('auto' | 'low' | 'medium' | 'high'), and `reducedMotion`, return a frozen flags
// object. reducedMotion folds the *motion-heavy* flags down (it never disables
// static bloom/fog/tone mapping — those don't move, and a child on reduce-motion
// still deserves a pretty, calm island).
export function resolveGfx({ tier = 'high', setting = 'auto', reducedMotion = false } = {}) {
  const effective = setting === 'auto' ? tier : setting;
  const base = TIERS[effective] || TIERS[tier] || TIERS.high;
  const gfx = { ...base, reducedMotion: !!reducedMotion };
  if (reducedMotion) {
    gfx.ambientScale = Math.min(gfx.ambientScale, 0.35);
    gfx.dof = false;
    gfx.cameraMoments = 'minimal';
    gfx.water = 'flat';
    if (gfx.npcRoutines === 'full') gfx.npcRoutines = 'limited';
  }
  return Object.freeze(gfx);
}

// Read the persisted Graphics setting, defaulting to 'auto'. Defensive: settings()
// touches localStorage, which can be unavailable (SSR / tests before loadSave).
function readSetting() {
  try {
    const g = settings()?.graphics;
    return GRAPHICS_SETTINGS.includes(g) ? g : 'auto';
  } catch { return 'auto'; }
}

function currentReducedMotion() {
  try { return a11yReducedMotion(); } catch { return false; }
}

// Resolve once at module load from the live inputs.
export let GFX = resolveGfx({
  tier: detectDeviceTier(),
  setting: readSetting(),
  reducedMotion: currentReducedMotion(),
});

// Re-resolve after the player changes the Graphics setting (or reduce-motion). Live
// bindings mean callers that `import { GFX }` see the new object after this runs —
// but flags baked into GL state at construction (shadows, tone mapping, a composer)
// only take effect on the next scene/renderer build, so the settings UI shows a
// gentle "applies next launch" hint for those.
export function refreshGfx() {
  GFX = resolveGfx({
    tier: detectDeviceTier(),
    setting: readSetting(),
    reducedMotion: currentReducedMotion(),
  });
  return GFX;
}

// ---------------------------------------------------------------------------
// Dev-only live tuning overrides. The dev tuning panel (devtools.js) writes here;
// later phases read these so a value can be dialed in without a code edit. Defaults
// match today's look, so this object is a no-op until a slider is moved. NEVER read
// in production paths beyond the phase that owns each knob — it exists for tuning.
export const GFX_TUNING = {
  sunIntensity: 1.25,     // world.js DirectionalLight (today's low-tier value)
  fillIntensity: 0.25,    // world.js fill light (today's low-tier value)
  hemiIntensity: 0.95,    // world.js HemisphereLight (today's low-tier value)
  exposure: 1.18,         // P1 ACES toneMappingExposure (only when GFX.toneMap)
  bloomIntensity: 1.0,    // P6
  waterSpeed: 1.0,        // P7
  ambientScale: 1.0,      // multiplier on GFX.ambientScale (P4/P5)
};
