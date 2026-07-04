// Memory Grove — pure engine (docs/06 §4.3/§4.5). No DOM, no three.js, no clock:
// callers pass `now`, so every output replays from its inputs. Owns the
// profile.memory subtree (anchor images the child has adopted, and — Phase 2 —
// memory walks). It reads the math engine's fact gems but never mutates them:
// understanding and the Elo/Echo review stay the single source of truth; anchors
// are an encoding aid layered on top.
import { getPack } from '../curriculum/index.js';
import { FACT_SKILLS } from '../mathengine.js';
import {
  ANCHORS, ANCHOR_BY_FACT, anchorEntry, MEMORY_MIN_ORDER, MEMORY_MIN_GEMS,
  LOCI_ORDER, ALWAYS_LOCI, WALK_STEPS, WALK_MIN_STOPS, WALK_MAX_STOPS,
} from './data.js';

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

// profile.memory shape (docs/06 §4.3), healed additively by ensureMemory():
//   enabled : Mimi offer accepted / parent toggle
//   anchors : factKey -> { lociId, adoptedAt, recalls, lastOk }
//   walks   : journeyId -> { built, bestStreak, lastAt }   (Phase 2)
export function createMemoryState() {
  return { enabled: false, anchors: {}, walks: {} };
}

// Fill any missing field from a fresh state — safe to re-run on every load, the
// same additive contract as ensureIsland/ensureStageState (state.js calls this).
export function ensureMemory(profile) {
  if (!isObject(profile.memory)) profile.memory = createMemoryState();
  const ref = createMemoryState();
  for (const k of Object.keys(ref)) {
    if (profile.memory[k] === undefined) profile.memory[k] = ref[k];
  }
  return profile.memory;
}

// ---------- gating (docs/06 §4.2) ----------

// The child's effective placement, as a stage order (1..8): the strongest signal
// wins — a parent override or child-said groep beats the age estimate. Mirrors the
// floor logic in curriculum/placement.js resolveLowerBoundOrder without importing
// its internals.
export function placementOrder(curriculum = null) {
  if (!curriculum?.packId) return null;
  const pack = getPack(curriculum.packId);
  const stageId = curriculum.stageSource === 'parent'
    ? curriculum.confirmedStage
    : (curriculum.confirmedStage || curriculum.estimatedStage);
  const stageOrd = pack.stages.find((s) => s.id === stageId)?.order ?? null;
  const groep = Number.isInteger(curriculum.groep) ? curriculum.groep : null;
  const order = Math.max(stageOrd ?? 0, groep ?? 0);
  return order || null;
}

// Old enough for the Grove: groep 6 / age ≈ 9 (grade_6). The child evidence for
// self-generated imagery mnemonics does not start below ~9 (docs/06 §2.3).
export function memoryGateReached(curriculum = null) {
  const order = placementOrder(curriculum);
  return order != null && order >= MEMORY_MIN_ORDER;
}

// The feature is live for this profile (Mimi's offer accepted or parent-enabled).
export function memoryUnlocked(profile = null) {
  return !!profile?.memory?.enabled;
}

// A gem is lit when its fact reads mastered in the times-table history
// (mirrors gemLit in math/results.js: ok >= 3 and the last attempt was correct).
function litFact(f) {
  return !!f && f.ok >= 3 && f.lastOk;
}

export function litFactCount(math = null) {
  const facts = math?.facts || {};
  return Object.keys(facts).filter((k) => litFact(facts[k])).length;
}

// The stored fact record for a key, honoring commutative twins (either order).
function factRecord(math, factKey) {
  const facts = math?.facts || {};
  if (facts[factKey]) return facts[factKey];
  const m = /^(\d+)x(\d+)$/.exec(String(factKey || ''));
  return m ? facts[`${m[2]}x${m[1]}`] || null : null;
}

// Whether Mimi should offer the Grove right now: old enough, not yet enabled, and
// there are already a handful of lit gems worth anchoring (docs/06 §4.2).
export function memoryOfferReady(profile = null) {
  if (!profile || memoryUnlocked(profile)) return false;
  if (!memoryGateReached(profile.curriculum)) return false;
  return litFactCount(profile.math) >= MEMORY_MIN_GEMS;
}

// Turn the feature on/off (Mimi's accepted offer, or the parent toggle).
export function setMemoryEnabled(profile, on) {
  const mem = ensureMemory(profile);
  mem.enabled = !!on;
  return mem.enabled;
}

// ---------- adoption (anchor CRUD) ----------

// A fact whose gem has lit has been *understood* — the only precondition for an
// anchor (docs/06 §4.1.2). `wobbly` (lit once, but the last attempt slipped)
// sorts to the top so the sparkle points at what genuinely needs shoring up.
function factSolved(f) {
  return !!f && f.ok >= 3;
}

function factWobbly(f) {
  return factSolved(f) && !f.lastOk;
}

// The anchors the child can adopt now: catalog facts they've solved and not yet
// anchored, wobbly ones first. Pure — returns a fresh sorted array.
export function adoptableFacts(math = null, memory = null) {
  const anchors = memory?.anchors || {};
  const out = [];
  for (const a of ANCHORS) {
    if (anchors[a.factKey]) continue;
    const f = factRecord(math, a.factKey);
    if (!factSolved(f)) continue;
    out.push({ factKey: a.factKey, loci: a.loci, imageKey: a.imageKey, wobbly: factWobbly(f) });
  }
  out.sort((p, q) => (q.wobbly - p.wobbly));
  return out;
}

// The anchors already adopted, newest first — for the Gem Tree browser and the
// parents screen.
export function adoptedAnchors(memory = null) {
  const anchors = memory?.anchors || {};
  return Object.keys(anchors)
    .map((factKey) => ({
      factKey,
      lociId: anchors[factKey].lociId,
      imageKey: (ANCHOR_BY_FACT[factKey] || anchorEntry(factKey))?.imageKey || `memory.anchor.${factKey}`,
      ...anchors[factKey],
    }))
    .sort((p, q) => (q.adoptedAt || 0) - (p.adoptedAt || 0));
}

// Save an anchor. Only catalog facts can be adopted; lociId defaults to the
// catalog landmark but a child can pin the image elsewhere (Phase 2 browser).
export function adoptAnchor(memory, factKey, { lociId = null, now = 0 } = {}) {
  if (!memory) return null;
  const entry = anchorEntry(factKey);
  if (!entry) return null;
  memory.anchors = memory.anchors || {};
  memory.anchors[entry.factKey] = {
    lociId: lociId || entry.loci,
    adoptedAt: now,
    recalls: 0,
    lastOk: null,
  };
  return memory.anchors[entry.factKey];
}

// Move an adopted anchor's image to a different landmark (the browser's swap,
// docs/06 §4.6). Accepts either fact order; no-op for an un-adopted fact.
export function swapAnchorLoci(memory, factKey, lociId) {
  const entry = anchorEntry(factKey);
  const a = entry && memory?.anchors?.[entry.factKey];
  if (!a || !lociId) return null;
  a.lociId = lociId;
  return a;
}

// Record whether the anchored fact was answered correctly this time (feeds the
// anchored-vs-unanchored evaluation, docs/06 §7). Accepts either fact order.
export function recordAnchorRecall(memory, factKey, ok) {
  const entry = anchorEntry(factKey);
  const a = entry && memory?.anchors?.[entry.factKey];
  if (!a) return null;
  a.recalls = (a.recalls || 0) + 1;
  a.lastOk = !!ok;
  return a;
}

// ---------- hint dispatch (docs/06 §4.3) ----------

// The fact keys a problem could match — both commutative orders — but only for a
// genuine times-table/division fact problem (a,b ≤ 10). Empty for anything else,
// so the memory hint never fires outside its lane.
export function factKeysFor(problem = null) {
  if (!problem || !FACT_SKILLS.has(problem.skillId)) return [];
  const { a, b } = problem.meta || {};
  if (!Number.isInteger(a) || !Number.isInteger(b) || a > 10 || b > 10) return [];
  return a === b ? [`${a}x${b}`] : [`${a}x${b}`, `${b}x${a}`];
}

// A wobbly adopted anchor to bias the next Echo Door toward (docs/06 §4.5): a
// fact the child anchored whose gem has since slipped (was lit, last attempt
// missed). Returns a factKey (e.g. '7x8') or null. Deterministic from inputs —
// pass the seeded rng to vary which wobbly fact is picked when several qualify.
export function echoTargetFact(profile = null, rng = null) {
  if (!memoryUnlocked(profile)) return null;
  const anchors = profile.memory.anchors || {};
  const wobbly = Object.keys(anchors).filter((k) => factWobbly(factRecord(profile.math, k)));
  if (!wobbly.length) return null;
  if (rng?.pick) return rng.pick(wobbly);
  return wobbly[0];
}

// The adopted anchor for the current problem, or null. Used by useHint() to show
// the anchor card as the FIRST hint before the conceptual model (docs/06 §4.3).
export function anchorForProblem(memory = null, problem = null) {
  if (!memory?.enabled) return null;
  for (const key of factKeysFor(problem)) {
    const saved = memory.anchors?.[key];
    if (saved) {
      const entry = ANCHOR_BY_FACT[key] || anchorEntry(key);
      return { factKey: key, imageKey: entry?.imageKey || `memory.anchor.${key}`, ...saved };
    }
  }
  return null;
}

// ---------- memory walks (docs/06 §4.4) ----------

// The landmarks the child can walk, in route order: the four permanent loci plus
// any restored builds (loci earned through math). Deduped, LOCI_ORDER order.
export function availableLoci(profile = null) {
  const built = new Set(profile?.island?.built || []);
  return LOCI_ORDER.filter((id) => ALWAYS_LOCI.includes(id) || built.has(id));
}

// Skip-count steps unlocked at the child's placement order (grade band), e.g. a
// groep-6 child gets 2/5/10, 3/4/6, and 7/8/9.
export function walkStepsForOrder(order = 0) {
  const pool = WALK_STEPS.filter((b) => order >= b.minOrder).flatMap((b) => b.steps);
  return pool.length ? pool : [2];
}

// The steps this profile can walk right now (needs the feature on and ≥3 loci).
export function availableWalkSteps(profile = null) {
  if (!memoryUnlocked(profile) || availableLoci(profile).length < WALK_MIN_STOPS) return [];
  return walkStepsForOrder(placementOrder(profile.curriculum) ?? 0);
}

// The times-table skill a correct skip-count stop reinforces (shared with the
// Counting Song, docs/06 §4.4): 2/5/10 → tables_a, 3/4/6 → tables_b, 7/8/9 → c.
export function walkSkillForStep(step) {
  if (step === 7 || step === 8 || step === 9) return 'tables_c';
  if (step === 3 || step === 4 || step === 6) return 'tables_b';
  return 'tables_a';
}

// Lay a skip-counting route: one stop per landmark (up to WALK_MAX_STOPS), each
// asking the next multiple of `step`. Pure — the controller supplies the loci.
export function buildSkipWalk({ step, loci = [], maxStops = WALK_MAX_STOPS } = {}) {
  const n = Math.max(WALK_MIN_STOPS, Math.min(maxStops, loci.length));
  const stops = loci.slice(0, n).map((lociId, i) => ({ lociId, index: i, answer: step * (i + 1) }));
  return { id: `skip-${step}`, kind: 'skip', step, reinforceSkill: walkSkillForStep(step), stops };
}

export function gradeWalkStop(stop = null, value = null) {
  return { correct: stop != null && Number(value) === stop.answer };
}

// Persist a finished walk to profile.memory.walks (docs/06 §4.3 shape): mark it
// built, keep the best streak, stamp the last-walked time.
export function recordWalk(memory, walkId, { streak = 0, now = 0 } = {}) {
  if (!memory) return null;
  memory.walks = memory.walks || {};
  const w = memory.walks[walkId] || { built: false, bestStreak: 0, lastAt: null };
  w.built = true;
  w.bestStreak = Math.max(w.bestStreak || 0, streak);
  w.lastAt = now;
  memory.walks[walkId] = w;
  return w;
}

// ---------- analytics for the parents screen (docs/06 §4.7 / §7) ----------

// Recall accuracy on anchored vs comparable unanchored facts (the primary
// evaluation signal), plus adoption + walk-streak tallies. Pure, from the save.
export function memoryAnalytics(profile = null) {
  const memory = profile?.memory || {};
  const anchorKeys = Object.keys(memory.anchors || {});
  const sum = (keys) => keys.reduce((acc, k) => {
    const f = factRecord(profile?.math, k);
    return f ? { n: acc.n + (f.n || 0), ok: acc.ok + (f.ok || 0) } : acc;
  }, { n: 0, ok: 0 });
  const anchored = sum(anchorKeys);
  // Comparable unanchored facts: the rest of the hard catalog the child has tried.
  const unanchoredKeys = ANCHORS.map((a) => a.factKey)
    .filter((k) => !memory.anchors?.[k] && factRecord(profile?.math, k));
  const unanchored = sum(unanchoredKeys);
  const rate = (t) => (t.n ? t.ok / t.n : null);
  const walks = memory.walks || {};
  const walkList = Object.keys(walks);
  const bestStreak = walkList.reduce((m, id) => Math.max(m, walks[id].bestStreak || 0), 0);
  return {
    anchorsAdopted: anchorKeys.length,
    walksBuilt: walkList.filter((id) => walks[id].built).length,
    bestWalkStreak: bestStreak,
    anchoredRate: rate(anchored),
    unanchoredRate: rate(unanchored),
    anchoredN: anchored.n,
    unanchoredN: unanchored.n,
  };
}
