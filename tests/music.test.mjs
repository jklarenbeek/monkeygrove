// Guards the per-chamber + title melody banks: every note must stay inside its
// world's pentatonic scale and register, motifs must stay sparse with no jarring
// leaps, and each chamber must offer real variety. This is the durable contract
// behind "always relaxing, themed, and ever-changing" — the organic engine only
// rotates and octave-shifts these motifs, both of which preserve pitch-class, so
// if the data is clean the music can never turn harsh.
import { describe, it, expect } from 'vitest';
import { MUSIC_TEST } from '../src/audio.js';

const { scales, melodies } = MUSIC_TEST;
const pc = (midi) => ((midi % 12) + 12) % 12;
const notesOf = (motif) => Object.entries(motif).map(([s, m]) => [Number(s), m]);

describe('music banks stay relaxing and in-scale', () => {
  for (const world of Object.keys(melodies)) {
    const { pcs, lo, hi } = scales[world];
    const pool = melodies[world];

    it(`${world}: every note is in the pentatonic scale and register`, () => {
      for (const motif of pool) {
        for (const [step, midi] of notesOf(motif)) {
          expect(step, `${world} step ${step}`).toBeGreaterThanOrEqual(0);
          expect(step, `${world} step ${step}`).toBeLessThan(64);
          expect(pcs.includes(pc(midi)), `${world}: note ${midi} (pc ${pc(midi)}) not in [${pcs}]`).toBe(true);
          expect(midi >= lo && midi <= hi, `${world}: note ${midi} outside register ${lo}-${hi}`).toBe(true);
        }
      }
    });

    it(`${world}: motifs are sparse so the music breathes`, () => {
      for (const motif of pool) {
        const n = Object.keys(motif).length;
        expect(n).toBeGreaterThanOrEqual(3);
        expect(n).toBeLessThanOrEqual(14);
      }
    });

    it(`${world}: no leap larger than an octave between consecutive notes`, () => {
      for (const motif of pool) {
        const seq = notesOf(motif).sort((a, b) => a[0] - b[0]);
        for (let k = 1; k < seq.length; k++) {
          const leap = Math.abs(seq[k][1] - seq[k - 1][1]);
          expect(leap, `${world}: leap of ${leap} semitones`).toBeLessThanOrEqual(12);
        }
      }
    });
  }

  it('each chamber offers real variety (>= 6 distinct motifs to rotate)', () => {
    for (const world of ['tide', 'garden', 'stump', 'vines']) {
      expect(melodies[world].length).toBeGreaterThanOrEqual(6);
    }
  });
});
