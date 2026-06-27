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
  };
}

// Heal saves from before story mode (keeps state.js migration additive).
export function ensureStory(profile) {
  if (!profile.story || typeof profile.story !== 'object') profile.story = freshStory();
  const ref = freshStory();
  for (const [k, v] of Object.entries(ref)) {
    if (profile.story[k] === undefined) profile.story[k] = structuredClone(v);
  }
  if (!Array.isArray(profile.story.lines) || profile.story.lines.length !== 6) {
    profile.story.lines = freshStory().lines;
  }
  if (!Array.isArray(profile.story.beats)) profile.story.beats = [];
  return profile.story;
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
  const unconstrained = eligible.size === 0;

  // Which worlds host at least one eligible skill, by ladder order.
  const eligibleIdx = [];
  WORLDS.forEach((world, i) => {
    const skills = report.worlds[world]?.skills || [];
    const has = unconstrained ? skills.length > 0 : skills.some((s) => eligible.has(s.id));
    if (has) eligibleIdx.push(i);
  });
  const maxEligible = eligibleIdx.length ? Math.max(...eligibleIdx) : -1;

  const out = {};
  WORLDS.forEach((world, i) => {
    const skills = report.worlds[world]?.skills || [];
    const inBand = unconstrained ? skills : skills.filter((s) => eligible.has(s.id));
    let band;
    if (inBand.length) band = 'in';
    else if (maxEligible >= 0 && i < maxEligible) band = 'below';
    else band = 'above';

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
    complete: hexagram === FOUNDING_HEXAGRAM,
  };
}
