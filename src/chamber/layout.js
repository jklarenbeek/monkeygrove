// Layout pipeline: parse an ASCII template into cells + markers, vary it per
// chamber (seeded mirror flips, sprinkles, and coastline carving), scatter extra
// fetch spots, and reshape problems the templates cannot physically host.
// All pure over their (rows, rng) / (problem, math) inputs — no THREE, no scene.
import { FLOOR_CHARS } from '../config.js';
import { nextProblem } from '../mathengine.js';

// What the hand-authored templates can physically host.
export const HOST_LIMITS = { arrayRows: 8, arrayCols: 10, baskets: 6 };

// Reshape or regenerate problems the chamber templates cannot host, and give
// tide problems a paintable strip model (the engine emits 'none' for those).
export function ensureHostable(problem, math, opts = {}) {
  let p = problem;
  if (p.kind === 'array') {
    const prm = p.model.params;
    const fits = (r, c) => r <= HOST_LIMITS.arrayRows && c <= HOST_LIMITS.arrayCols;
    if (!fits(prm.rows, prm.cols)) {
      if (prm.given !== 'rows' && fits(prm.cols, prm.rows)) {
        const r0 = prm.rows;
        prm.rows = prm.cols; prm.cols = r0;
        if (p.prompt?.vars) { p.prompt.vars.rows = prm.rows; p.prompt.vars.cols = prm.cols; }
      } else {
        p = nextProblem(math, { ...opts, skill: p.skillId, kind: 'fetch' });
      }
    }
  } else if (p.kind === 'share' && p.model.params.baskets > HOST_LIMITS.baskets) {
    p = nextProblem(math, { ...opts, skill: p.skillId, kind: 'fetch' });
  }
  if (p.world === 'tide' && (!p.model || p.model.kind === 'none')) {
    const m = p.meta || {};
    const op = p.equation.includes('−') ? '−' : '+';
    const a = m.a, b = m.b !== undefined ? m.b : (m.c !== undefined ? m.c - m.a : undefined);
    if (a !== undefined && b !== undefined) {
      p.model = { kind: 'strip', params: { a, b: Math.abs(b), op } };
    }
  }
  return p;
}

const MARKER_CHARS = 'PAspcDdoBmVMTON tguy lfehkbjz'.replace(/ /g, '');
const HEIGHTS = { '.': 0, ',': 0, 1: 1, 2: 2 };

// Seeded per-chamber variation so no two boards look alike: random mirror
// flips, plus coastal knolls / shade patches / greenery sprinkled on plain
// floor whose whole neighborhood is plain (never near task cells, never able
// to cut off a path). Same rng seed = same board (duel & challenge fairness).
export function varyLayout(rows, rng) {
  let r = rows.slice();
  if (rng.chance(0.5)) r = r.map((s) => s.split('').reverse().join(''));
  if (rng.chance(0.5)) r = r.slice().reverse();
  const grid = r.map((s) => s.split(''));
  const d = grid.length, w = grid[0].length;
  const plain = (ch) => ch === '.' || ch === ',';
  const open = [], coast = [];
  for (let z = 1; z < d - 1; z++) {
    for (let x = 1; x < w - 1; x++) {
      if (grid[z][x] !== '.') continue;
      let water = 0, other = 0;
      for (let dz = -1; dz <= 1; dz++) {
        for (let dx = -1; dx <= 1; dx++) {
          const ch = grid[z + dz][x + dx];
          if (ch === '#') water++;
          else if (!plain(ch)) other++;
        }
      }
      if (other > 0) continue;
      (water > 0 ? coast : open).push({ x, z });
    }
  }
  const spread = []; // pairwise-spaced picks so sprinkles never wall up
  const take = (pool, n, ch) => {
    for (const s of rng.shuffle(pool)) {
      if (n <= 0) break;
      if (!spread.every((q) => Math.abs(q.x - s.x) + Math.abs(q.z - s.z) >= 3)) continue;
      spread.push(s);
      grid[s.z][s.x] = ch;
      n--;
    }
  };
  take(coast, rng.int(2, 4), '1');   // walkable knolls hugging the shore
  take(open, rng.int(1, 3), 'd');    // extra greenery (open field: safe to block)
  take(open, rng.int(2, 5), ',');    // shade patches, purely cosmetic

  // Carve the coastline itself: a few shore tiles return to the sea, so the
  // island SILHOUETTE varies between chambers (bites and little coves) — the
  // outline is what makes two boards read as different at a glance. A carve may
  // only take a plain '.' whose whole 3×3 is plain floor or water (never beside
  // a marker, knoll, or path tile), and is reverted unless every tile the
  // player could reach before is still reachable after (same |dh|<=1 hop graph
  // the player walks) — so no stone, altar, or corridor is ever pinched off.
  const hOf = (ch) => HEIGHTS[ch] ?? 0;
  const reachable = () => {
    let start = null;
    for (let z = 0; z < d && !start; z++) {
      for (let x = 0; x < w && !start; x++) {
        if (grid[z][x] === 'P') start = { x, z };
      }
    }
    for (let z = 0; z < d && !start; z++) {
      for (let x = 0; x < w && !start; x++) {
        if (grid[z][x] !== '#') start = { x, z };
      }
    }
    const seen = new Set(start ? [start.x + ',' + start.z] : []);
    const q = start ? [start] : [];
    while (q.length) {
      const { x, z } = q.pop();
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, nz = z + dz;
        if (nx < 0 || nz < 0 || nx >= w || nz >= d) continue;
        const ch = grid[nz][nx];
        if (ch === '#' || seen.has(nx + ',' + nz)) continue;
        if (Math.abs(hOf(ch) - hOf(grid[z][x])) > 1) continue;
        seen.add(nx + ',' + nz);
        q.push({ x: nx, z: nz });
      }
    }
    return seen;
  };
  let bites = rng.int(0, 3);
  if (bites > 0) {
    const shoreline = [];
    for (let z = 1; z < d - 1; z++) {
      for (let x = 1; x < w - 1; x++) {
        if (grid[z][x] !== '.') continue;
        let sea = false, clean = true;
        for (let dz = -1; dz <= 1; dz++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ch = grid[z + dz][x + dx];
            if (!plain(ch) && ch !== '#') clean = false;
            if ((dx === 0) !== (dz === 0) && ch === '#') sea = true;
          }
        }
        if (sea && clean) shoreline.push({ x, z });
      }
    }
    for (const s of rng.shuffle(shoreline)) {
      if (bites <= 0) break;
      const before = reachable();
      grid[s.z][s.x] = '#';
      const after = reachable();
      const lost = before.has(s.x + ',' + s.z) ? 1 : 0;
      if (after.size >= before.size - lost) bites--;
      else grid[s.z][s.x] = '.';
    }
  }
  return grid.map((g) => g.join(''));
}

// Extra invisible stone pedestals (and a pot spot) scattered on open floor —
// fetch stones then land somewhere new every single chamber.
export function scatterFetchSpots(place, rng, { stones = 4, pots = 1 } = {}) {
  const { w, d } = place.size;
  const m = place.markers;
  const keep = [...(m.A || []), ...(m.P || []), ...(m.M || []), ...(m.m || []), ...(m.B || []), ...(m.D || [])];
  const far = (x, z, list, min) => list.every((q) => Math.abs(q.x - x) + Math.abs(q.z - z) >= min);
  const free = [];
  for (let z = 1; z < d - 1; z++) {
    for (let x = 1; x < w - 1; x++) {
      const c = place.cellAt(x, z);
      if (!c || !c.walk || c.h !== 0 || !FLOOR_CHARS.has(c.ch)) continue;
      if (!far(x, z, keep, 2)) continue;
      free.push({ x, z });
    }
  }
  let left = stones + pots;
  const placed = [];
  for (const spot of rng.shuffle(free)) {
    if (left <= 0) break;
    if (!far(spot.x, spot.z, [...placed, ...(m.s || []), ...(m.p || [])], 2)) continue;
    placed.push(spot);
    left--;
    const ch = placed.length <= stones ? 's' : 'p';
    (m[ch] = m[ch] || []).push(spot);
    place.cellAt(spot.x, spot.z).ch = ch; // keeps crab patrols & floor models honest
  }
}

export function parseLayout(rows) {
  const d = rows.length, w = rows[0].length;
  const cells = [];
  const markers = {};
  for (let z = 0; z < d; z++) {
    cells.push([]);
    for (let x = 0; x < w; x++) {
      const ch = rows[z][x] || '#';
      if (ch === '#') { cells[z].push(null); continue; }
      const h = HEIGHTS[ch] ?? 0;
      const cell = { h, walk: true, ch, alt: ch === ',' };
      cells[z].push(cell);
      if (MARKER_CHARS.includes(ch)) {
        (markers[ch] = markers[ch] || []).push({ x, z });
      }
    }
  }
  return { w, d, cells, markers };
}
