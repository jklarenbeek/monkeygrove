// audio.js — procedural WebAudio: cozy pentatonic SFX + lightweight music loops.
// No samples, no network. Node-import-safe: no AudioContext/document access
// happens until init() is called from a user gesture.

import { reducedMotion } from './a11y.js';

const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);
const cents = (c) => 2 ** (c / 1200);
const rcents = (spread) => cents((Math.random() * 2 - 1) * spread);

let ctx = null;
let master, comp, sfxBus, musicBus, ambienceBus, noiseBuf;
let sfxOn = true;
let musicOn = true;
let ambienceOn = true;
let ambienceKey = null;     // active scene bed: 'hub' | 'title' | 'chamber*' | 'bakery' | null
let ambienceTimer = null;   // self-scheduling bed runner handle
let currentTrack = null;
let requestedMusic = null; // last music() request, honored when (re)enabled

// ---------------------------------------------------------------- voices ---

function tone({ freq, type = 'sine', t, dur, gain, attack = 0.004, dest, ramps }) {
  const g = ctx.createGain();
  g.connect(dest || sfxBus);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(Math.max(gain, 0.0002), t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (ramps) for (const [f, at] of ramps) o.frequency.exponentialRampToValueAtTime(f, t + at);
  o.connect(g);
  o.start(t);
  o.stop(t + dur + 0.1);
}

// Detuned sine pair + short 4x "tine" transient = soft marimba/kalimba pluck.
function marimba(freq, t, gain, dur = 0.7, dest = sfxBus) {
  tone({ freq: freq * cents(-3), t, dur, gain, dest });
  tone({ freq: freq * cents(3), t, dur: dur * 0.9, gain: gain * 0.6, dest });
  tone({ freq: freq * 4, t, dur: 0.07, gain: gain * 0.16, dest });
}

const kal = (midi, t, gain, dur, dest) => marimba(hz(midi), t, gain, dur, dest);

// Brighter triangle pluck for the chamber track.
function pluck(midi, t, gain, dest) {
  tone({ freq: hz(midi), type: 'triangle', t, dur: 0.4, gain, dest });
  tone({ freq: hz(midi) * 2, t, dur: 0.08, gain: gain * 0.25, dest });
}

function noise({ t, dur, gain, type = 'bandpass', freq = 1000, q = 1, sweepTo, dest = sfxBus }) {
  const src = ctx.createBufferSource();
  src.buffer = noiseBuf;
  src.loop = true;
  src.loopEnd = noiseBuf.duration;
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.setValueAtTime(freq, t);
  f.Q.value = q;
  if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f);
  f.connect(g);
  g.connect(dest);
  src.start(t, Math.random() * 0.5); // random offset so repeats don't phase
  src.stop(t + dur + 0.05);
}

// Slow warm chord bed for music phrases (per-note detuned sine pairs).
function pad(midis, t, dur, gain, dest) {
  const slope = Math.min(1.5, dur / 3);
  for (const m of midis) {
    for (const d of [-4, 4]) {
      const g = ctx.createGain();
      g.connect(dest);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(gain, t + slope);
      g.gain.setValueAtTime(gain, t + dur - slope);
      g.gain.linearRampToValueAtTime(0.0001, t + dur);
      const o = ctx.createOscillator();
      o.frequency.value = hz(m);
      o.detune.value = d;
      o.connect(g);
      o.start(t);
      o.stop(t + dur + 0.1);
    }
  }
}

// ------------------------------------------------------------------- sfx ---
// Each def: (t = start time, p = pitch multiplier, g = gain multiplier).

const SFX = {
  hop(t, p, g) {
    tone({ freq: 170 * p * rcents(30), type: 'triangle', t, dur: 0.07, gain: 0.22 * g });
    noise({ t, dur: 0.03, gain: 0.05 * g, type: 'lowpass', freq: 700 });
  },
  pick(t, p, g) {
    tone({ freq: 392 * p, t, dur: 0.16, gain: 0.3 * g, ramps: [[622 * p, 0.09]] });
    tone({ freq: 1568 * p, t, dur: 0.05, gain: 0.06 * g });
  },
  drop(t, p, g) {
    tone({ freq: 523 * p, t, dur: 0.16, gain: 0.28 * g, ramps: [[330 * p, 0.1]] });
  },
  place(t, p, g) {
    marimba(131 * p, t, 0.5 * g, 0.6);
    noise({ t, dur: 0.07, gain: 0.18 * g, type: 'lowpass', freq: 240 });
  },
  correct(t, p, g) {
    [523.25, 659.26, 783.99].forEach((f, i) => marimba(f * p, t + i * 0.09, 0.3 * g, 0.55));
    tone({ freq: 2093 * p, t: t + 0.27, dur: 0.25, gain: 0.07 * g });
  },
  boop(t, p, g) {
    // Friendly descending minor third — never a buzzer.
    tone({ freq: 330 * p, t, dur: 0.18, gain: 0.22 * g, attack: 0.02 });
    tone({ freq: 277 * p, t: t + 0.15, dur: 0.3, gain: 0.2 * g, attack: 0.02 });
  },
  pop(t, p, g) {
    noise({ t, dur: 0.14, gain: 0.5 * g, freq: 950 * p, q: 1.4, sweepTo: 320 * p });
    tone({ freq: 240 * p, t, dur: 0.1, gain: 0.18 * g, ramps: [[110 * p, 0.09]] });
  },
  chest(t, p, g) {
    [523.25, 659.26, 783.99, 1046.5].forEach((f, i) =>
      marimba(f * p, t + i * 0.13, 0.32 * g, i === 3 ? 1 : 0.5));
    for (const f of [261.63, 329.63, 392]) {
      tone({ freq: f * p, t, dur: 1.1, gain: 0.06 * g, attack: 0.08 });
    }
  },
  coin(t, p, g) {
    const scale = [1046.5, 1174.7, 1318.5, 1568, 1760]; // C-pentatonic, octave 6
    marimba(scale[(Math.random() * scale.length) | 0] * p * rcents(12), t, 0.26 * g, 0.35);
  },
  hatch(t, p, g) {
    tone({ freq: 440 * p, t, dur: 0.6, gain: 0.18 * g, attack: 0.05, ramps: [[1760 * p, 0.5]] });
    marimba(1568 * p, t + 0.5, 0.28 * g, 0.8);
    marimba(2093 * p, t + 0.64, 0.22 * g, 0.9);
    tone({ freq: 3520 * p, t: t + 0.74, dur: 0.3, gain: 0.06 * g });
  },
  splash(t, p, g) {
    noise({ t, dur: 0.5, gain: 0.55 * g, type: 'lowpass', freq: 1400 * p, sweepTo: 180 });
    tone({ freq: 300 * p, t: t + 0.02, dur: 0.25, gain: 0.15 * g, ramps: [[90, 0.2]] });
  },
  gong(t, p, g) {
    for (const [mult, gn, dur] of [[1, 0.5, 3], [2.02, 0.18, 2.2], [2.96, 0.08, 1.4], [4.2, 0.04, 0.8]]) {
      tone({ freq: 98 * p * mult, t, dur, gain: gn * g, attack: 0.008 });
    }
    noise({ t, dur: 0.05, gain: 0.06 * g, type: 'lowpass', freq: 500 });
  },
  crab(t, p, g) {
    tone({
      freq: 330 * p, type: 'triangle', t, dur: 0.32, gain: 0.22 * g,
      ramps: [[700 * p, 0.1], [392 * p, 0.28]],
    });
  },
  click(t, p, g) {
    tone({ freq: 1800 * p, t, dur: 0.035, gain: 0.12 * g });
  },
  bloom(t, p, g) {
    [261.63, 329.63, 392, 523.25].forEach((f, i) => {
      tone({ freq: f * p * cents(-3), t, dur: 2, gain: 0.1 * g, attack: 0.5 + i * 0.12 });
      tone({ freq: f * p * cents(3), t, dur: 2, gain: 0.07 * g, attack: 0.5 + i * 0.12 });
    });
    marimba(1046.5 * p, t + 0.9, 0.12 * g, 1);
  },
  door(t, p, g) {
    [1318.5, 1568, 2093, 2349, 2637].forEach((f, i) =>
      marimba(f * p * rcents(8), t + i * 0.07 + Math.random() * 0.02, 0.12 * g, 0.6));
  },
  plant(t, p, g) {
    marimba(620 * p * rcents(30), t, 0.22 * g, 0.18);
    noise({ t, dur: 0.04, gain: 0.07 * g, freq: 2400 });
  },
  sparkle(t, p, g) {
    tone({ freq: 2637 * p * rcents(15), t, dur: 0.12, gain: 0.09 * g });
    tone({ freq: 3520 * p * rcents(15), t: t + 0.05, dur: 0.15, gain: 0.06 * g });
  },
  streak(t, p, g) {
    marimba(392 * p, t, 0.3 * g, 0.4);
    marimba(523.25 * p, t + 0.12, 0.32 * g, 0.6);
  },
  egg(t, p, g) {
    noise({ t, dur: 0.035, gain: 0.22 * g, type: 'highpass', freq: 2500 });
    tone({ freq: 700 * p * rcents(20), type: 'triangle', t, dur: 0.04, gain: 0.1 * g });
  },
  swoosh(t, p, g) {
    noise({ t, dur: 0.3, gain: 0.32 * g, freq: 400 * p, q: 0.7, sweepTo: 2600 * p });
  },
};

// ----------------------------------------------------------------- music ---
// 8-step bars (8th notes), 64-step loops = 8 bars. Melody maps are sparse
// {step: midi}; 2-3 patterns cycle per loop so 20 minutes stays gentle.

const ISLAND_MELODIES = [
  { 0: 76, 3: 79, 8: 81, 14: 79, 16: 72, 22: 74, 24: 76, 32: 81, 35: 84, 40: 81, 46: 79, 48: 76, 56: 74 },
  { 0: 72, 6: 74, 8: 76, 16: 79, 20: 76, 28: 74, 32: 76, 38: 81, 44: 79, 48: 84, 52: 81, 60: 79 },
  { 0: 67, 8: 72, 14: 74, 24: 76, 36: 79, 44: 81, 52: 79, 58: 76 },
];

const CHAMBER_MELODIES = [
  { 0: 76, 2: 79, 6: 81, 12: 84, 16: 79, 22: 76, 24: 74, 32: 81, 34: 84, 38: 86, 44: 81, 48: 79, 54: 76, 56: 74 },
  { 0: 72, 4: 74, 6: 76, 12: 79, 16: 76, 20: 74, 28: 72, 32: 76, 36: 79, 38: 81, 44: 84, 48: 81, 52: 79, 60: 74 },
];

// Per-world music identity, one entry per chamber. Each holds a POOL of sparse
// pentatonic motifs (sparse {step: midi} maps over a 64-step / 8-bar loop) plus
// a chord palette, register, tempo and a signature ambience. The shared engine
// (makeChamberTrack) rotates the pool and breathes a slow "energy" envelope so
// the track keeps changing organically across a long session while staying
// relaxing. Every melody note is in the world's scale, so any motif sounds fine
// over any chord and octave shifts can never go off-key.
const CHAMBER_MUSIC = {
  // Tide Pools (add/subtract) — calm tidal water, C-pentatonic, mid register,
  // soft water-trickle texture.
  tide: {
    bpm: 68, lowpass: 3000, voice: 'kal', accentNote: 88,
    padGain: 0.046, bassGain: 0.28, bassDur: 1.8, bassEvery: 16, melGain: 0.25,
    chords: [[45, 52, 57, 60], [48, 52, 55, 60], [43, 50, 55, 62], [38, 45, 50, 57], [40, 52, 55, 60]],
    melodies: [
      { 0: 60, 10: 62, 20: 64, 34: 62, 44: 60, 56: 64 },
      { 0: 67, 12: 69, 22: 72, 32: 69, 42: 67, 52: 64, 60: 67 },
      { 4: 72, 16: 74, 26: 76, 40: 74, 50: 72, 62: 69 },
      { 0: 64, 14: 72, 24: 69, 36: 76, 46: 72, 56: 69, 62: 64 },
      { 0: 76, 12: 74, 24: 72, 36: 69, 48: 67, 58: 64 },
      { 2: 69, 12: 67, 20: 69, 30: 72, 40: 69, 50: 67, 60: 64 },
      { 0: 79, 14: 81, 26: 84, 38: 81, 48: 79, 58: 76, 62: 79 },
      { 0: 60, 12: 64, 24: 67, 36: 69, 48: 67, 60: 64 },
    ],
    texture(tr, i, t, d, e) {
      if (i % 16 === 6) noise({ t, dur: 0.42, gain: 0.02 + 0.014 * e, type: 'bandpass', freq: 820 + Math.random() * 260, q: 0.55, sweepTo: 540, dest: d });
    },
  },
  // Banana Garden (multiply) — sunny + bright, C-pentatonic up high, airy
  // high-leaf sparkle, kalimba that sometimes brightens to a pluck.
  garden: {
    bpm: 74, lowpass: 3600, voice: 'kal', altVoice: 'pluck', accentNote: 88,
    padGain: 0.043, bassGain: 0.24, bassDur: 1.15, bassEvery: 8, melGain: 0.26,
    chords: [[48, 52, 55, 60], [50, 57, 62, 69], [55, 62, 67, 74], [45, 52, 57, 60], [48, 55, 60, 64]],
    melodies: [
      { 0: 72, 12: 74, 24: 76, 40: 79, 56: 76 },
      { 0: 79, 16: 76, 28: 74, 44: 72, 60: 69 },
      { 4: 84, 20: 81, 36: 84, 52: 86, 60: 84 },
      { 0: 67, 14: 72, 26: 74, 38: 76, 50: 74, 62: 72 },
      { 2: 76, 18: 79, 34: 81, 48: 79, 58: 76 },
      { 0: 69, 16: 72, 32: 74, 48: 72, 60: 69 },
      { 6: 72, 22: 76, 30: 79, 46: 81, 54: 79, 62: 76 },
      { 8: 81, 24: 84, 40: 86, 52: 84, 60: 81 },
    ],
    texture(tr, i, t, d, e) {
      if (i % 16 === 10) noise({ t, dur: 0.08, gain: 0.02 + 0.01 * e, type: 'highpass', freq: 4200, q: 0.8, dest: d });
    },
  },
  // Sharing Stump (divide) — earthy A-minor pentatonic, the lowest/darkest/
  // slowest world, soft wood-knock texture.
  stump: {
    bpm: 64, lowpass: 2600, voice: 'kal', accentNote: 81,
    padGain: 0.048, bassGain: 0.25, bassDur: 1.25, bassEvery: 8, melGain: 0.25,
    chords: [[45, 52, 57, 60], [45, 48, 55, 60], [48, 55, 60, 64], [43, 50, 55, 57], [38, 45, 50, 57]],
    melodies: [
      { 0: 57, 8: 60, 20: 57, 32: 55, 44: 57, 52: 60, 60: 57 },
      { 0: 69, 10: 72, 18: 74, 30: 72, 40: 69, 48: 67, 56: 69 },
      { 2: 60, 14: 64, 26: 67, 38: 69, 48: 67, 58: 64 },
      { 0: 72, 16: 76, 24: 74, 36: 72, 48: 74, 60: 69 },
      { 0: 55, 12: 57, 24: 60, 36: 57, 44: 55, 56: 57 },
      { 0: 64, 16: 67, 28: 69, 40: 67, 52: 64 },
      { 0: 67, 12: 69, 20: 72, 34: 76, 44: 72, 54: 69, 62: 67 },
      { 4: 74, 16: 72, 28: 69, 40: 72, 50: 69, 60: 57 },
    ],
    texture(tr, i, t, d, e) {
      if (i % 16 === 8) noise({ t, dur: 0.055, gain: 0.035 + 0.015 * e, type: 'lowpass', freq: 360, q: 0.7, dest: d });
    },
  },
  // Vine Heights (fractions) — airy D-major pentatonic, the highest/brightest
  // world, bright pluck lead, high sustained wind tone, kalimba alt voice.
  vines: {
    bpm: 70, lowpass: 4100, voice: 'pluck', altVoice: 'kal', accentNote: 93,
    padGain: 0.04, bassGain: 0.2, bassDur: 1.5, bassEvery: 16, melGain: 0.23,
    chords: [[38, 45, 50, 54], [43, 50, 55, 59], [45, 52, 57, 61], [47, 54, 59, 62], [40, 47, 52, 55]],
    melodies: [
      { 0: 78, 10: 76, 22: 74, 36: 71, 50: 74, 60: 69 },
      { 0: 74, 8: 78, 20: 81, 34: 78, 44: 74, 56: 76 },
      { 2: 83, 14: 86, 28: 88, 40: 86, 52: 83, 62: 81 },
      { 0: 69, 12: 74, 26: 78, 40: 81, 54: 83, 60: 86 },
      { 4: 81, 16: 78, 24: 81, 38: 83, 48: 81, 58: 78 },
      { 0: 86, 18: 88, 34: 90, 48: 86, 58: 88 },
      { 0: 83, 10: 81, 20: 78, 32: 76, 44: 74, 56: 71, 62: 69 },
      { 6: 76, 18: 78, 30: 81, 44: 78, 58: 83 },
    ],
    texture(tr, i, t, d, e) {
      if (i % 16 === 12) tone({ freq: hz(88 + (tr.loops % 2) * 2), t, dur: 0.22, gain: 0.018 + 0.012 * e, attack: 0.04, dest: d });
    },
  },
};

// Title / intro theme data — a real "welcome home" tune (A-A-B-A) with a soft
// counter line, unlike the ambient chamber loops. Warm C major pentatonic.
const TITLE_A = { 0: 72, 6: 74, 12: 76, 20: 74, 24: 72, 32: 69, 40: 72, 48: 76, 54: 74, 60: 72 };
const TITLE_B = { 0: 67, 8: 72, 14: 74, 24: 76, 30: 74, 36: 72, 44: 69, 52: 67, 58: 69 };
const TITLE_COUNTER = { 2: 79, 16: 81, 26: 79, 34: 76, 48: 79, 56: 76 };
const TITLE_CHORDS = [[36, 43, 48, 52], [33, 45, 52, 57], [43, 48, 52, 55], [38, 45, 50, 57], [36, 48, 55, 60]];

const CELEBRATE_NOTES = { 0: 72, 2: 76, 4: 79, 6: 84, 9: 88 };

function human(gain, spread = 0.24) {
  return gain * (1 - spread / 2 + Math.random() * spread);
}

const VOICES = {
  kal: (m, t, g, d) => kal(m, t, g, 1.0, d),
  pluck: (m, t, g, d) => pluck(m, t, g, d),
};

// pick an index in [0, len) that differs from prev — non-repeating variation
function pickOther(len, prev) {
  if (len <= 1) return 0;
  const k = (Math.random() * (len - 1)) | 0;
  return k >= prev ? k + 1 : k;
}

// Build a looping chamber track from a CHAMBER_MUSIC config. The arrangement
// re-casts itself every two loops (new lead + counter motif, occasional sparkle
// octave, sometimes a different voice) and a slow two-sine "energy" envelope
// fades the counter-melody, pad richness and high sparkle in and out — so it
// drifts and breathes without ever speeding up or leaving the scale.
function makeChamberTrack(cfg) {
  const voices = cfg.altVoice ? [cfg.voice, cfg.voice, cfg.altVoice] : [cfg.voice];
  return {
    stepDur: 60 / cfg.bpm / 2,
    length: 64,
    loop: true,
    lowpass: cfg.lowpass,
    init(tr) {
      tr.phase = Math.random() * 6.28;
      tr.melA = (Math.random() * cfg.melodies.length) | 0;
      tr.melB = pickOther(cfg.melodies.length, tr.melA);
      tr.chordI = (Math.random() * cfg.chords.length) | 0;
      tr.voiceI = 0;
      tr.oct = 0;
    },
    step(tr, i, t) {
      const d = tr.dest;
      if (i === 0 && tr.loops > 0 && tr.loops % 2 === 0) {
        tr.melA = pickOther(cfg.melodies.length, tr.melA);
        tr.melB = pickOther(cfg.melodies.length, tr.melA);
        tr.oct = Math.random() < 0.16 ? 12 : 0;
        if (voices.length > 1) tr.voiceI = (Math.random() * voices.length) | 0;
      }
      // two slow sines → a wandering, non-repeating energy swell (~0.05..0.95)
      const x = tr.loops + tr.phase;
      const e = 0.5 + 0.3 * Math.sin(x * 0.5) + 0.15 * Math.sin(x * 0.23 + tr.phase);
      // harmony: a fresh chord each half-loop, never the same one twice running
      if (i % 32 === 0) {
        tr.chordI = i === 0 ? pickOther(cfg.chords.length, tr.chordI) : (tr.chordI + 1) % cfg.chords.length;
        pad(cfg.chords[tr.chordI], t, 32 * this.stepDur + 0.6, cfg.padGain * (0.8 + 0.4 * e), d);
      }
      // soft low pulse on the current chord root
      if (i % cfg.bassEvery === 0) kal(cfg.chords[tr.chordI][0], t, cfg.bassGain * (0.82 + 0.28 * e), cfg.bassDur, d);
      // the world's signature ambience (water / leaves / wood / wind)
      cfg.texture?.(tr, i, t, d, e);
      // lead voice
      const lead = cfg.melodies[tr.melA][i];
      if (lead != null) {
        const g = human(cfg.melGain * (0.74 + 0.46 * e), 0.26);
        VOICES[voices[tr.voiceI]](lead + tr.oct, t + Math.random() * 0.016, g, d);
        if (e > 0.84 && Math.random() < 0.22) kal(lead + 12 + tr.oct, t + 0.02, g * 0.28, 0.7, d);
      }
      // a second motif (octave down) fades in only while energy is high
      if (e > 0.56) {
        const c = cfg.melodies[tr.melB][i];
        if (c != null && Math.random() < 0.8) pluck(c - 12, t + 0.02, human(cfg.melGain * 0.32 * (e - 0.35), 0.3), d);
      }
      // gentle high sparkle near phrase ends
      if (e > 0.6 && i % 32 === 26 && Math.random() < e) kal(cfg.accentNote, t + 0.04, 0.05 * e, 0.7, d);
    },
  };
}

const TITLE_TRACK = {
  stepDur: 60 / 69 / 2,
  length: 64,
  loop: true,
  lowpass: 3400,
  init(tr) { tr.phase = Math.random() * 6.28; tr.chordI = TITLE_CHORDS.length - 1; },
  step(tr, i, t) {
    const d = tr.dest;
    const section = [TITLE_A, TITLE_A, TITLE_B, TITLE_A][tr.loops % 4];
    const withCounter = tr.loops % 4 >= 2; // counter joins on the B phrase and final A
    const e = 0.62 + 0.22 * Math.sin((tr.loops + tr.phase) * 0.55);
    if (i % 16 === 0) {
      tr.chordI = (tr.chordI + 1) % TITLE_CHORDS.length;
      pad(TITLE_CHORDS[tr.chordI], t, 16 * this.stepDur + 0.5, 0.05 * (0.85 + 0.3 * e), d);
    }
    if (i % 8 === 0) kal(TITLE_CHORDS[tr.chordI][0], t, 0.3, 1.1, d);
    const m = section[i];
    if (m != null) kal(m, t + Math.random() * 0.012, human(0.34 * (0.85 + 0.3 * e), 0.2), 1.1, d);
    if (withCounter) { const c = TITLE_COUNTER[i]; if (c != null) pluck(c, t + 0.02, 0.12 * e, d); }
    if (i === 56 && tr.loops % 2 === 1) kal(88, t + 0.04, 0.06, 0.8, d);
  },
};

// Exposed for tests only (no runtime use): every melody note must stay inside
// its world's pentatonic scale + register so the music can never turn harsh.
export const MUSIC_TEST = {
  scales: {
    tide: { pcs: [0, 2, 4, 7, 9], lo: 55, hi: 88 },
    garden: { pcs: [0, 2, 4, 7, 9], lo: 64, hi: 91 },
    stump: { pcs: [0, 2, 4, 7, 9], lo: 52, hi: 84 },
    vines: { pcs: [2, 4, 6, 9, 11], lo: 67, hi: 96 },
    title: { pcs: [0, 2, 4, 7, 9], lo: 57, hi: 88 },
  },
  melodies: {
    tide: CHAMBER_MUSIC.tide.melodies,
    garden: CHAMBER_MUSIC.garden.melodies,
    stump: CHAMBER_MUSIC.stump.melodies,
    vines: CHAMBER_MUSIC.vines.melodies,
    title: [TITLE_A, TITLE_B, TITLE_COUNTER],
  },
};

const TRACKS = {
  island: {
    stepDur: 60 / 72 / 2,
    length: 64,
    loop: true,
    lowpass: 2800,
    step(tr, i, t) {
      const d = tr.dest;
      if (i % 32 === 0) {
        const chord = i === 0 ? [48, 52, 55, 59] : [53, 57, 60, 64]; // Cmaj7 / Fmaj7
        pad(chord, t, 32 * this.stepDur + 0.5, 0.055, d);
      }
      if (i % 16 === 0) kal(i < 32 ? 36 : 41, t, 0.45, 1.6, d);
      const m = ISLAND_MELODIES[tr.loops % ISLAND_MELODIES.length][i];
      if (m) kal(m, t, 0.38 * (0.85 + Math.random() * 0.3), 1.1, d);
    },
  },
  chamber: {
    stepDur: 60 / 84 / 2,
    length: 64,
    loop: true,
    lowpass: 3800,
    step(tr, i, t) {
      const d = tr.dest;
      if (i % 32 === 0) {
        const chord = i === 0 ? [45, 52, 55, 60] : [41, 48, 52, 57]; // Am7 / Fmaj7
        pad(chord, t, 32 * this.stepDur + 0.5, 0.05, d);
      }
      if (i % 8 === 0) kal(i < 32 ? 45 : 41, t, 0.4, 1.2, d);
      if (i % 4 === 2) noise({ t, dur: 0.025, gain: 0.04 + Math.random() * 0.02, type: 'highpass', freq: 5000, dest: d });
      if (i % 16 === 8) noise({ t, dur: 0.05, gain: 0.06, type: 'lowpass', freq: 400, dest: d });
      const m = CHAMBER_MELODIES[tr.loops % CHAMBER_MELODIES.length][i];
      if (m) pluck(m, t, 0.3 * (0.85 + Math.random() * 0.3), d);
    },
  },
  'chamber:tide': makeChamberTrack(CHAMBER_MUSIC.tide),
  'chamber:garden': makeChamberTrack(CHAMBER_MUSIC.garden),
  'chamber:stump': makeChamberTrack(CHAMBER_MUSIC.stump),
  'chamber:vines': makeChamberTrack(CHAMBER_MUSIC.vines),
  title: TITLE_TRACK,
  celebrate: {
    stepDur: 0.115,
    length: 26, // ~3s sting, then auto-silence
    loop: false,
    lowpass: 4500,
    step(tr, i, t) {
      const d = tr.dest;
      const m = CELEBRATE_NOTES[i];
      if (m) kal(m, t, 0.55, 0.8, d);
      if (i === 12) {
        for (const c of [60, 64, 67, 72]) tone({ freq: hz(c), t, dur: 1.6, gain: 0.12, attack: 0.05, dest: d });
        kal(91, t + 0.1, 0.22, 0.6, d);
        kal(96, t + 0.25, 0.18, 0.7, d);
      }
    },
  },
};

function pump(tr) {
  if (!ctx || tr.done) return;
  const ahead = ctx.currentTime + 0.2;
  while (tr.nextTime < ahead && !tr.done) {
    tr.def.step(tr, tr.step, tr.nextTime);
    tr.nextTime += tr.def.stepDur;
    tr.step += 1;
    if (tr.step >= tr.def.length) {
      if (tr.def.loop) {
        tr.step = 0;
        tr.loops += 1;
      } else {
        tr.done = true;
        endTrack(tr);
      }
    }
  }
}

function startTrack(name) {
  stopTrack(0.5);
  const def = TRACKS[name];
  const t = ctx.currentTime;
  const out = ctx.createGain();
  out.gain.setValueAtTime(0.0001, t);
  out.gain.linearRampToValueAtTime(1, t + 0.5); // crossfade in
  out.connect(musicBus);
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = def.lowpass;
  filter.connect(out);
  const tr = { name, def, out, dest: filter, step: 0, loops: 0, nextTime: t + 0.06, done: false, timer: 0 };
  tr.timer = setInterval(() => pump(tr), 100);
  currentTrack = tr;
  def.init?.(tr); // let a track seed per-run state (organic-variation engine)
  pump(tr);
}

function stopTrack(fade = 0.5) {
  const tr = currentTrack;
  if (!tr) return;
  currentTrack = null;
  tr.done = true;
  clearInterval(tr.timer);
  const t = ctx.currentTime;
  tr.out.gain.cancelScheduledValues(t);
  tr.out.gain.setValueAtTime(Math.max(tr.out.gain.value, 0.0001), t);
  tr.out.gain.linearRampToValueAtTime(0.0001, t + fade);
  setTimeout(() => { try { tr.out.disconnect(); } catch { /* context may be gone */ } }, fade * 1000 + 200);
}

function endTrack(tr) {
  clearInterval(tr.timer);
  if (currentTrack === tr) {
    currentTrack = null;
    if (requestedMusic === tr.name) requestedMusic = null; // sting does not resume itself
  }
  setTimeout(() => { try { tr.out.disconnect(); } catch { /* context may be gone */ } }, 4000);
}

// ----------------------------------------------------------- ambient beds ---
// Quiet, sparse, generative texture (not melody) on ambienceBus. Self-scheduling
// short one-shots only — no persistent oscillators — so a scene change just stops
// rescheduling (nothing to leak). Cooldowns randomised so it never patterns; density
// drops under reducedMotion(). Every cue is well below music/sfx level.
function bedTick() {
  ambienceTimer = null;
  if (!ctx || !ambienceOn || !ambienceKey) return;
  const t = ctx.currentTime + 0.05;
  const calm = reducedMotion();
  const key = ambienceKey;
  if (key === 'hub' || key === 'title') {
    noise({ t, dur: 1.6, gain: 0.05, type: 'lowpass', freq: 600, dest: ambienceBus }); // shore swell
    if (Math.random() < (calm ? 0.15 : 0.4)) {
      tone({ freq: hz(84 + ((Math.random() * 5) | 0) * 2), type: 'triangle', t: t + Math.random() * 1.2, dur: 0.18, gain: 0.03, dest: ambienceBus });
    }
  } else if (key && key.startsWith('chamber')) {
    if (Math.random() < 0.4) tone({ freq: hz(79 + ((Math.random() * 4) | 0) * 2), type: 'triangle', t, dur: 0.16, gain: 0.022, dest: ambienceBus });
  } else if (key === 'bakery') {
    tone({ freq: hz(40), type: 'sine', t, dur: 1.8, gain: 0.04, dest: ambienceBus }); // warm oven hum
    if (Math.random() < 0.25) noise({ t: t + 0.4, dur: 0.3, gain: 0.03, type: 'lowpass', freq: 400, dest: ambienceBus });
  }
  ambienceTimer = setTimeout(bedTick, (calm ? 5000 : 3000) + Math.random() * 4000);
}

function startBeds() {
  if (ambienceTimer || !ctx || !ambienceOn || !ambienceKey) return;
  ambienceTimer = setTimeout(bedTick, 400);
}

function stopBeds() {
  if (ambienceTimer) { clearTimeout(ambienceTimer); ambienceTimer = null; }
}

// Per-name bounded randomness so a repeated cue never grates on a child (or parent).
const VARY = {
  hop: { pitch: 40, gain: 0.12 }, pick: { pitch: 30, gain: 0.1 }, coin: { pitch: 30, gain: 0.1 },
  sparkle: { pitch: 40, gain: 0.12 }, correct: { pitch: 20, gain: 0.08 }, chest: { pitch: 20, gain: 0.08 },
  plant: { pitch: 50, gain: 0.12 }, drop: { pitch: 40, gain: 0.1 }, place: { pitch: 40, gain: 0.1 },
  bloom: { pitch: 30, gain: 0.1 }, streak: { pitch: 30, gain: 0.1 }, pop: { pitch: 40, gain: 0.12 },
};

// ------------------------------------------------------------- public api ---

export const audio = {
  init() {
    if (ctx) {
      if (ctx.state === 'suspended') ctx.resume();
      return;
    }
    const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();

    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
    comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -20;
    comp.knee.value = 12;
    comp.ratio.value = 5;
    comp.attack.value = 0.003;
    comp.release.value = 0.25;
    comp.connect(master);
    sfxBus = ctx.createGain();
    sfxBus.gain.value = 0.8;
    sfxBus.connect(comp);
    musicBus = ctx.createGain();
    musicBus.gain.value = 0.25;
    musicBus.connect(comp);
    ambienceBus = ctx.createGain();        // quiet generative beds, under everything
    ambienceBus.gain.value = 0.18;
    ambienceBus.connect(comp);

    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate); // 1s shared white noise
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (!ctx) return;
        if (document.hidden) ctx.suspend();
        else ctx.resume();
      });
    }
    if (ctx.state === 'suspended') ctx.resume();
    if (musicOn && requestedMusic && TRACKS[requestedMusic]?.loop
      && currentTrack?.name !== requestedMusic) startTrack(requestedMusic);
    if (ambienceOn && ambienceKey) startBeds();
  },

  sfx(name, opts = {}) {
    if (!ctx || !sfxOn) return;
    const def = SFX[name];
    if (!def) return;
    def(ctx.currentTime, opts.pitch ?? 1, opts.gain ?? 1);
  },

  comboTone(n) {
    if (!ctx || !sfxOn) return;
    const ladder = [72, 74, 76, 79, 81, 84, 86, 88]; // pentatonic C5..E6
    const i = Math.min(Math.max(1, n | 0), ladder.length) - 1;
    const t = ctx.currentTime;
    marimba(hz(ladder[i]), t, 0.3, 0.5);
    if (i >= 4) tone({ freq: hz(ladder[i]) * 4, t: t + 0.04, dur: 0.18, gain: 0.05 });
  },

  // A single music-stage pad note (Echo Song): pads 0..3 map to a warm major triad +
  // octave (C E G C), so any pattern Kiki plays or the child echoes back sounds nice.
  pad(i) {
    if (!ctx || !sfxOn) return;
    const scale = [60, 64, 67, 72];
    marimba(hz(scale[((i | 0) % scale.length + scale.length) % scale.length]), ctx.currentTime, 0.4, 0.6);
  },

  // Counting Song metronome tone: beat `n` (1-based) sounds a rising C-pentatonic pitch
  // so counting up is heard going up; a multiple of the step gets a warm marimba accent
  // (the skip-count you're practicing), a plain beat gets a soft tick. Reinforces
  // skip-counting aurally (the "ring the gong on the multiples" rhythm), never graded.
  count(n, isMultiple) {
    if (!ctx || !sfxOn) return;
    const scale = [60, 62, 64, 67, 69]; // C D E G A — C major pentatonic
    const k = Math.max(1, n | 0) - 1;
    const midi = scale[k % scale.length] + 12 * Math.floor(k / scale.length);
    const t = ctx.currentTime;
    if (isMultiple) marimba(hz(midi), t, 0.32, 0.5);
    else tone({ freq: hz(midi), type: 'triangle', t, dur: 0.13, gain: 0.12 });
  },

  music(name) {
    requestedMusic = name;
    if (!ctx || !musicOn) return;
    if (name === null) {
      stopTrack();
      return;
    }
    if (!TRACKS[name]) return;
    if (currentTrack && currentTrack.name === name) return;
    startTrack(name);
  },

  // Like sfx(), but adds small bounded pitch/gain jitter so repeats breathe.
  variation(name, opts = {}) {
    if (!ctx || !sfxOn) return;
    const r = VARY[name] || { pitch: 20, gain: 0.08 };
    const pitch = (opts.pitch ?? 1) * rcents(r.pitch);
    const gain = (opts.gain ?? 1) * (1 + (Math.random() * 2 - 1) * r.gain);
    this.sfx(name, { pitch, gain });
  },

  // Start/cross to a scene's ambient bed; null stops it. Mirrors music().
  ambience(key) {
    ambienceKey = key || null;
    stopBeds();
    if (!ctx || !ambienceOn || !ambienceKey) return;
    startBeds();
  },

  // Subscribe to the world-reactivity visual-event bus as a pure listener (never owns state).
  // Safe no-op if the bus is absent. Maps only events not already sounded elsewhere,
  // so cues never double up; degrades to nothing until those events are emitted.
  attachEvents(place) {
    if (!place || typeof place.addReactor !== 'function') return;
    place.addReactor({
      react: (type) => {
        if (!ctx) return;
        if (type === 'build-complete') this.variation('bloom');
        else if (type === 'portal-stage-up') this.variation('sparkle');
      },
    });
  },

  setSfx(on) {
    sfxOn = !!on;
  },

  setAmbience(on) {
    ambienceOn = !!on;
    if (!ambienceOn) stopBeds();
    else if (ctx && ambienceKey) startBeds();
  },

  setMusic(on) {
    musicOn = !!on;
    if (!musicOn) stopTrack(0.3);
    else if (ctx && requestedMusic && TRACKS[requestedMusic]?.loop
      && currentTrack?.name !== requestedMusic) startTrack(requestedMusic);
  },

  get ready() {
    return !!ctx;
  },
};
