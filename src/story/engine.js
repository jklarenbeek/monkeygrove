// Story-mode engine — pure logic, no DOM, no three.js (mirrors island.js /
// mathengine.js). It turns the math core's mastery report into the founding
// hexagram of "The Book of Banana Changes" and owns the profile.story subtree.
//
// Two axes are kept deliberately separate (docs/story/README.md section 6,
// "the age problem"):
//   1. CONTENT difficulty  -> stays 100% curriculum-gated upstream (the caller
//      passes the already-computed eligibleSkillIds; this engine never lowers it).
//   2. NARRATIVE progress  -> a world's line is drawn by BAND-AWARE mastery, so a
//      12-13yo never has to grind a world that is below their grade. A world that
//      sits entirely below the child's band is "remembered" — its line is drawn
//      for free, preserving the esoteric beat without dragging them into baby math.
//
// Like flags.portalStages, story lines only ever RISE: once a line is drawn it
// stays drawn, even if the underlying skill later decays (forgetting curve).
import '../polyfills.js'; // MUST precede the vendored engine: it shims Object.groupBy
import {
  yijing_balance,
  yijing_entropy,
  yijing_isRoot,
} from '../yijing/yijing.js';
import { WORLDS } from '../mathengine.js';
import {
  FOUNDING_HEXAGRAM,
  LINE_BIT,
  LINE_WORLD,
  NARRATIVE_LINES,
  LAST_CHAPTER,
} from './constants.js';

export function freshStory() {
  return {
    lines: [false, false, false, false, false, false], // line 1..6, only ever rises
    phase: 0,                 // furthest chapter reached, 0..6, monotonic
    beats: [],                // story-beat ids already shown (no replay)
    crabKingReconciled: false,
    mimiPhase: 0,             // Mimi's healing arc: 0 anxious -> 1 opening -> 2 whole (monotonic)
  };
}

// Heal saves from before story mode (keeps state.js migration additive). Defends
// additively against partial/corrupt shapes: every field is coerced to its proper
// type so a stray truthy string in `lines` can never read as a drawn line and an
// out-of-range `phase` can never escape [0, LAST_CHAPTER].
export function ensureStory(profile) {
  const fresh = freshStory();
  if (!profile.story || typeof profile.story !== 'object' || Array.isArray(profile.story)) {
    profile.story = fresh;
    return profile.story;
  }
  const s = profile.story;
  // lines: exactly six booleans — only a literal `true` counts as drawn.
  s.lines = (Array.isArray(s.lines) && s.lines.length === 6)
    ? s.lines.map((v) => v === true)
    : fresh.lines;
  // phase: integer clamped to [0, LAST_CHAPTER], monotonic furthest-reached chapter.
  s.phase = Number.isFinite(s.phase) ? Math.max(0, Math.min(LAST_CHAPTER, Math.floor(s.phase))) : 0;
  // beats: array of string ids only (no replay of one-shot beats).
  s.beats = Array.isArray(s.beats) ? s.beats.filter((b) => typeof b === 'string') : [];
  // crabKingReconciled: a plain boolean flag.
  s.crabKingReconciled = s.crabKingReconciled === true;
  // mimiPhase: integer clamped to [0, 2], monotonic (healed for pre-arc saves).
  s.mimiPhase = Number.isFinite(s.mimiPhase) ? Math.max(0, Math.min(2, Math.floor(s.mimiPhase))) : 0;
  return s;
}

// ---------------------------------------------------------------------------
// Band-aware world classification (the age fix).
//
// Returns, per world id: { band, eligibleIds, mastered, satisfied } where
//   band      'in'    the world hosts skills inside the child's grade band
//             'below' the whole world sits below the band -> "remembered"
//             'above' the whole world sits above the band -> not reached yet
//   mastered  every in-band skill of the world is mastered (false for below/above)
//   satisfied the world's line should be drawn now (in+mastered, OR below/remembered)
//
// An empty eligibleSkillIds means "unconstrained" (no curriculum / migrated save):
// every world is 'in' and judged on full mastery, matching the math engine.
export function worldBands(report, eligibleSkillIds = []) {
  const eligible = new Set(eligibleSkillIds || []);

  // Which worlds host at least one eligible skill, by ladder order.
  const eligibleIdx = [];
  WORLDS.forEach((world, i) => {
    const skills = report.worlds[world]?.skills || [];
    if (skills.some((s) => eligible.has(s.id))) eligibleIdx.push(i);
  });
  // Unconstrained when there is no curriculum window OR the window names skills
  // that map to no world at all (empty/foreign pack): fall back to full-mastery on
  // every world rather than soft-locking the whole story behind an empty band.
  const unconstrained = eligible.size === 0 || eligibleIdx.length === 0;
  const maxEligible = eligibleIdx.length ? Math.max(...eligibleIdx) : -1;

  const out = {};
  WORLDS.forEach((world, i) => {
    const skills = report.worlds[world]?.skills || [];
    const inBand = unconstrained ? skills : skills.filter((s) => eligible.has(s.id));
    let band;
    if (inBand.length) band = 'in';                 // hosts in-band skills -> earn by mastery
    else if (i < maxEligible) band = 'below';       // beneath the child's frontier (incl. a
                                                    //   curriculum gap) -> "remembered", drawn free
    else band = 'above';                            // beyond the frontier -> still future

    const mastered = band === 'in' && inBand.every((s) => s.mastered);
    const satisfied = band === 'below' || mastered;
    out[world] = { band, eligibleIds: inBand.map((s) => s.id), mastered, satisfied };
  });
  return out;
}

// Latch any world line whose world is now satisfied. Monotonic — never clears a
// line. Returns the line indices newly drawn this call (for ceremony triggers).
// Narrative lines (the reveal, the finale) are NOT touched here; the UI draws
// those via drawNarrativeLine when their beat plays.
export function refreshStoryLines(story, report, eligibleSkillIds = []) {
  const bands = worldBands(report, eligibleSkillIds);
  const newly = [];
  for (const [idxStr, world] of Object.entries(LINE_WORLD)) {
    const idx = Number(idxStr);
    if (!story.lines[idx] && bands[world]?.satisfied) {
      story.lines[idx] = true;
      newly.push(idx);
    }
  }
  newly.sort((a, b) => a - b);
  return newly;
}

// Draw a narrative line (the Four-Directions reveal = line 2, the finale = line
// 6). Returns true if it actually changed. Refuses non-narrative line indices so
// a math world's line can only ever be earned through refreshStoryLines.
export function drawNarrativeLine(story, lineIndex) {
  if (!NARRATIVE_LINES.includes(lineIndex)) return false;
  if (story.lines[lineIndex]) return false;
  story.lines[lineIndex] = true;
  return true;
}

// Advance the furthest-reached chapter (monotonic). Returns true if it moved.
export function advancePhase(story, chapter) {
  const next = Math.min(chapter, LAST_CHAPTER);
  if (next > story.phase) { story.phase = next; return true; }
  return false;
}

// Record a one-time story beat as seen (so it never replays). Returns true the
// first time only.
export function markBeat(story, id) {
  if (story.beats.includes(id)) return false;
  story.beats.push(id);
  return true;
}

// ---------------------------------------------------------------------------
// The founding hexagram + the bloom, both real functions of the drawn lines.

// Build the hexagram value from the latched lines. Each drawn line contributes
// its founding-hexagram target value at its bit; undrawn lines stay yin (0), the
// fallen Kun-doubled island. All six drawn => FOUNDING_HEXAGRAM (After Completion).
export function islandHexagram(story) {
  let hex = 0;
  for (let i = 0; i < 6; i++) {
    if (story.lines[i]) hex |= ((FOUNDING_HEXAGRAM >> LINE_BIT[i]) & 1) << LINE_BIT[i];
  }
  return hex;
}

// The bloom meter: the whole island's color/balance is a real function of how
// balanced the restored skills are (README section 8). `balance` heads to 0.5 and
// `entropy` to 1.0 as the yang worlds light; `wholeness` is the gentler 6-line
// progress for a simple fill meter.
export function islandBloom(story) {
  const hexagram = islandHexagram(story);
  const drawn = story.lines.filter(Boolean).length;
  return {
    hexagram,
    balance: yijing_balance(hexagram),
    entropy: yijing_entropy(hexagram),
    isRoot: yijing_isRoot(hexagram),
    wholeness: drawn / 6,
    linesDrawn: drawn,
    // "Complete" means all SIX lines are home — NOT just hexagram === 42. The three
    // yin lines (the reveal, stump, the finale) never change the decimal value, so
    // the yang trio alone already spells 42; gating on the value would declare the
    // grove whole at 3/6 (before the finale). wholeness is the honest signal.
    complete: drawn === 6 && hexagram === FOUNDING_HEXAGRAM,
  };
}

// ---------------------------------------------------------------------------
// Finale reachability (the age fix, completed).
//
// Story LINE-DRAWS are band-aware (older kids' lower worlds are "remembered"), but
// the festival/finale is gated by island.js progress points over the FULL skill
// ladder. An older child is content-gated out of the lower worlds, so those worlds
// sit at pct 0 and the raw sum can never reach the plaza threshold — the finale
// (line 6) would be unreachable for exactly the audience the age fix serves.
//
// storyProgressReport credits a "remembered" (below-band) world as fully restored
// for BUILD GATING ONLY (bloom/gates still use the raw report), so the island
// restoration loop and the finale are reachable without grinding baby math. A
// young child has no below-band worlds, so their report is returned unchanged.
export function storyProgressReport(report, eligibleSkillIds = []) {
  const bands = worldBands(report, eligibleSkillIds);
  const worlds = {};
  for (const [w, info] of Object.entries(report.worlds)) {
    worlds[w] = bands[w]?.band === 'below' ? { ...info, pct: 1 } : info;
  }
  return { ...report, worlds };
}

// The story is ready for its capstone when lines 1-5 (indices 0..4) are all home;
// line 6 (index 5) is the finale itself. The plaza gates on this so the Crab King
// can never reconcile on a hexagram with a hole in it (older-child / migrated /
// dev-seeded paths included).
export function storyFinaleReady(story) {
  for (let i = 0; i < 5; i++) if (!story.lines[i]) return false;
  return true;
}
