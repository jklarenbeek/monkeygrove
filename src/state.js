// Save/load, profiles, settings, streak, economy. localStorage under monkeygrove.*
import { createMathState } from './mathengine.js';
import { freshIsland } from './island.js';
import { BALANCE, RARITY_WEIGHTS } from './config.js';
import { createCurriculumState, estimateStageFromAge, refreshCurriculumForDate } from './curriculum/placement.js';
import { getPack } from './curriculum/index.js';
import { createBusinessState, ensureBusinessState } from './business/engine.js';

const KEY = 'monkeygrove.save';
const VERSION = 1;

let save = null;
let saveTimer = null;

function freshProfile(name, opts = {}) {
  return {
    id: 'p' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36),
    name,
    avatar: { fur: 'classic', hat: null, trail: null, pet: null },
    bananas: 0,
    egg: { points: 0, goal: BALANCE.eggGoal },
    pets: [],
    owned: { hats: [], furs: ['classic'], trails: [] },
    streak: { count: 0, lastDay: null, freezes: 0, giftDay: null },
    island: freshIsland(),
    curriculum: createCurriculumState({
      age: opts.age,
      birthDate: opts.birthDate,
      packId: opts.packId,
      today: opts.today || dayString(),
    }),
    business: createBusinessState(),
    math: createMathState(),
    stats: { chambers: 0, correct: 0, wrong: 0, msPlayed: 0, berries: 0, days: 0 },
    flags: {},
    created: Date.now(),
  };
}

// reduceMotion null = follow the OS (prefers-reduced-motion); true/false = explicit.
function settingsDefaults() {
  return {
    lang: detectLang(), sfx: true, music: true,
    reduceMotion: null, dyslexiaFont: false, highContrast: false,
    colorblind: false, textScale: 1,
  };
}

function freshSave() {
  return {
    v: VERSION,
    profiles: [],
    activeProfile: null,
    settings: settingsDefaults(),
  };
}

function detectLang() {
  const l = (navigator.language || 'en').toLowerCase();
  return l.startsWith('nl') ? 'nl' : 'en';
}

// A corrupt or unreadable save must never hand a child a blank screen. Any failure
// path — storage disabled, bad JSON, wrong shape, or a migration that throws —
// preserves the bad payload under BACKUP_KEY (for recovery/debugging) and falls back
// to a clean, playable save.
const BACKUP_KEY = 'monkeygrove.save.corrupt';

function backupCorruptSave(raw) {
  if (!raw) return;
  try { localStorage.setItem(BACKUP_KEY, raw); } catch { /* storage may be unavailable */ }
}

export function loadSave() {
  if (save) return save;
  let raw = null;
  try { raw = localStorage.getItem(KEY); } catch { raw = null; } // storage can be disabled
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.v >= 1 && Array.isArray(parsed.profiles)) {
        save = migrate(parsed);
        return save;
      }
      backupCorruptSave(raw); // parseable but not our shape — don't silently drop it
    } catch {
      backupCorruptSave(raw); // unreadable JSON, or migrate() threw
    }
  }
  save = freshSave();
  return save;
}

// ---------- save migration ----------
// Version-step ladder. STEPS[n] upgrades a v(n) save to v(n+1); migrate() runs them
// in order from the save's stored version up to VERSION, then heals. Reach for a step
// when a fresh-profile heal can't express the change — a *renamed, moved, or
// restructured* field. (Healing only fills in fields that are missing; it can't
// rename `coins`→`bananas` or turn a bare number into `{ points, goal }`.) The ladder
// is empty today because v1 is the only shipped format, but the rails — and the test
// that drives a synthetic old save through them — exist so the first real v2 step
// lands on tested machinery instead of a hopeful comment.
//
//   const STEPS = {
//     1: (s) => { for (const p of s.profiles) { p.egg = { points: p.eggPoints ?? 0, goal: BALANCE.eggGoal }; delete p.eggPoints; } return s; },
//     2: (s) => …,   // v2 -> v3 lives here, and so on
//   };
const STEPS = {};

// Upgrade a parsed save to the current shape: run version steps, then heal missing
// fields against a fresh profile (the final, additive step). A step may mutate `s` in
// place or return a new object — either is fine. `steps`/`target` are injectable so
// the ladder can be exercised by tests before a real step ships. A step that throws
// propagates to loadSave(), which backs up the raw payload and falls back to a fresh
// save — a child never sees a blank screen.
export function migrate(s, steps = STEPS, target = VERSION) {
  let v = Number.isFinite(s.v) ? s.v : 1;
  while (v < target) {
    const step = steps[v];
    if (!step) break; // gap in the ladder: the heal below still normalizes what it can
    s = step(s) || s;
    v += 1;
  }
  healSave(s);
  s.v = v;
  return s;
}

// Final migration step: additively heal any field missing against a fresh profile.
// Additive-only by contract — it never renames or restructures (that's a step's job),
// so it stays safe to re-run on every load.
function healSave(s) {
  const ref = freshProfile('x');
  for (const p of s.profiles) {
    for (const k of Object.keys(ref)) if (p[k] === undefined) p[k] = structuredClone(ref[k]);
    if (!isObject(p.stats)) p.stats = structuredClone(ref.stats);
    if (!isObject(p.avatar)) p.avatar = structuredClone(ref.avatar);
    for (const k of Object.keys(ref.stats)) if (p.stats[k] === undefined) p.stats[k] = 0;
    for (const k of Object.keys(ref.avatar)) if (p.avatar[k] === undefined) p.avatar[k] = ref.avatar[k];
    if (!isObject(p.curriculum)) p.curriculum = createCurriculumState();
    const ageCapturedOn = p.curriculum.ageCapturedOn || dayFromTimestamp(p.created);
    const cref = createCurriculumState({
      age: p.curriculum.ageAtStart,
      birthDate: p.curriculum.birthDate,
      packId: p.curriculum.packId,
      today: ageCapturedOn,
    });
    for (const k of Object.keys(cref)) {
      if (p.curriculum[k] === undefined) p.curriculum[k] = structuredClone(cref[k]);
    }
    p.curriculum.packId = cref.packId;
    const fallbackStage = cref.estimatedStage
      || estimateStageFromAge(cref.packId, p.curriculum.ageAtStart);
    if (p.curriculum.estimatedStage === undefined || p.curriculum.estimatedStage === null) {
      p.curriculum.estimatedStage = fallbackStage;
    }
    if (p.curriculum.confirmedStage === undefined || p.curriculum.confirmedStage === null) {
      p.curriculum.confirmedStage = cref.confirmedStage || fallbackStage;
    }
    const stageIds = new Set(getPack(p.curriculum.packId).stages.map((stage) => stage.id));
    if (!stageIds.has(p.curriculum.estimatedStage)) p.curriculum.estimatedStage = fallbackStage;
    if (!stageIds.has(p.curriculum.confirmedStage)) p.curriculum.confirmedStage = cref.confirmedStage || fallbackStage;
    p.curriculum.stageSource = p.curriculum.confirmedStage !== p.curriculum.estimatedStage
      ? 'parent'
      : (p.curriculum.stageSource || 'auto');
    if (!isObject(p.curriculum.warmup)) p.curriculum.warmup = {};
    if (p.curriculum.warmup.completed === undefined) p.curriculum.warmup.completed = false;
    if (p.curriculum.warmup.results === undefined) p.curriculum.warmup.results = [];
    if (p.curriculum.warmup.skillIds === undefined) p.curriculum.warmup.skillIds = [];
    ensureBusinessState(p);
  }
  // heal settings so saves from before comfort/accessibility options get the defaults
  if (!isObject(s.settings)) s.settings = settingsDefaults();
  else {
    const d = settingsDefaults();
    for (const k of Object.keys(d)) if (s.settings[k] === undefined) s.settings[k] = d[k];
  }
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function dayFromTimestamp(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  const d = new Date(n);
  if (Number.isNaN(d.getTime())) return null;
  return dayString(d);
}

export function persist() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    try { localStorage.setItem(KEY, JSON.stringify(save)); } catch {}
  }, 250);
}

export function persistNow() {
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
  try { localStorage.setItem(KEY, JSON.stringify(save)); } catch {}
}

export function settings() { return loadSave().settings; }

export function profiles() { return loadSave().profiles; }

export function activeProfile() {
  const s = loadSave();
  const p = s.profiles.find((profile) => profile.id === s.activeProfile) || null;
  if (p && refreshProfileCurriculum(p)) persist();
  return p;
}

export function refreshProfileCurriculum(p, today = dayString()) {
  if (!p?.curriculum) return false;
  const before = JSON.stringify(p.curriculum);
  p.curriculum = refreshCurriculumForDate(p.curriculum, today);
  return JSON.stringify(p.curriculum) !== before;
}

export function createProfile(name, opts = {}) {
  const s = loadSave();
  const p = freshProfile(name, opts);
  s.profiles.push(p);
  s.activeProfile = p.id;
  persistNow();
  return p;
}

export function selectProfile(id) {
  const s = loadSave();
  s.activeProfile = id;
  persistNow();
  return activeProfile();
}

export function deleteProfile(id) {
  const s = loadSave();
  s.profiles = s.profiles.filter((p) => p.id !== id);
  if (s.activeProfile === id) s.activeProfile = s.profiles[0]?.id || null;
  persistNow();
}

// ---------- daily streak ----------
function dayString(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function todayString() { return dayString(); }

// Returns {kind: 'same'|'extended'|'frozen'|'reset'|'first', gift: bool}
export function touchDailyStreak(p) {
  const today = dayString();
  const st = p.streak;
  if (st.lastDay === today) return { kind: 'same', gift: st.giftDay !== today ? false : false };
  const yesterday = dayString(new Date(Date.now() - 864e5));
  let kind;
  if (!st.lastDay) { st.count = 1; kind = 'first'; }
  else if (st.lastDay === yesterday) { st.count += 1; kind = 'extended'; }
  else if (st.freezes > 0) { st.freezes -= 1; st.count += 1; kind = 'frozen'; }
  else { st.count = 1; kind = 'reset'; }
  st.lastDay = today;
  p.stats.days += 1;
  const gift = st.giftDay !== today;
  st.giftDay = today;
  persist();
  return { kind, gift };
}

// ---------- economy ----------
export function addBananas(p, n) {
  p.bananas = Math.max(0, p.bananas + n);
  persist();
  return p.bananas;
}

export function spendBananas(p, n) {
  if (p.bananas < n) return false;
  p.bananas -= n;
  persist();
  return true;
}

export function addEggPoints(p, n) {
  if (!p.egg) p.egg = { points: 0, goal: BALANCE.eggGoal };
  p.egg.points += n;
  persist();
  return p.egg.points >= p.egg.goal;
}

// Roll a pet the profile doesn't own yet (weighted by rarity); null if all owned.
export function rollPet(p, allPets, rng = Math.random) {
  const unowned = allPets.filter((pet) => !p.pets.includes(pet.id));
  if (!unowned.length) return null;
  const weighted = [];
  for (const pet of unowned) {
    const w = RARITY_WEIGHTS[pet.rarity] || 10;
    for (let i = 0; i < w; i++) weighted.push(pet);
  }
  return weighted[Math.floor(rng() * weighted.length)];
}

export function hatchEgg(p, allPets) {
  const pet = rollPet(p, allPets);
  p.egg.points = Math.max(0, p.egg.points - p.egg.goal);
  p.egg.goal = Math.round(p.egg.goal * 1.25); // each egg a little bigger
  if (pet) {
    p.pets.push(pet.id);
    if (!p.avatar.pet) p.avatar.pet = pet.id;
  }
  persist();
  return pet;
}

export function ownItem(p, kind, id) {
  const list = p.owned[kind];
  if (list && !list.includes(id)) list.push(id);
  persist();
}

export function equip(p, slot, id) {
  p.avatar[slot] = id;
  persist();
}
