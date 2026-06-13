// audio.js — procedural WebAudio: cozy pentatonic SFX + lightweight music loops.
// No samples, no network. Node-import-safe: no AudioContext/document access
// happens until init() is called from a user gesture.

const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);
const cents = (c) => 2 ** (c / 1200);
const rcents = (spread) => cents((Math.random() * 2 - 1) * spread);

let ctx = null;
let master, comp, sfxBus, musicBus, noiseBuf;
let sfxOn = true;
let musicOn = true;
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

const CELEBRATE_NOTES = { 0: 72, 2: 76, 4: 79, 6: 84, 9: 88 };

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
    if (musicOn && requestedMusic && TRACKS[requestedMusic]?.loop) startTrack(requestedMusic);
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

  setSfx(on) {
    sfxOn = !!on;
  },

  setMusic(on) {
    musicOn = !!on;
    if (!musicOn) stopTrack(0.3);
    else if (ctx && requestedMusic && TRACKS[requestedMusic]?.loop) startTrack(requestedMusic);
  },

  get ready() {
    return !!ctx;
  },
};
