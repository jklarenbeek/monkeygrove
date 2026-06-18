// Chamber template integrity: every layout must be able to host its verb,
// fetch chambers must seat all six choices on visible pedestals, and the
// seeded board variation must never disturb task cells.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { TEMPLATES, parseLayout, varyLayout, HOST_LIMITS } from '../src/chamber.js';
import { SOLID_MARKERS, OCCUPIED_MARKERS } from '../src/config.js';
import { Rng } from '../src/rng.js';

const KNOWN = new Set('#.,12PAspcDdoBmVMTONtguylfehkbjw'.split(''));

function eachTemplate(fn) {
  for (const [kind, list] of Object.entries(TEMPLATES)) {
    list.forEach((rows, i) => fn(kind, rows, `${kind}[${i}]`));
  }
}

test('templates are rectangular and use only known chars', () => {
  eachTemplate((kind, rows, ctx) => {
    const w = rows[0].length;
    for (const row of rows) {
      assert.equal(row.length, w, `${ctx} ragged row`);
      for (const ch of row) assert.ok(KNOWN.has(ch), `${ctx} unknown char '${ch}'`);
    }
  });
});

test('every chamber has a spawn and a helper spot', () => {
  eachTemplate((kind, rows, ctx) => {
    if (kind === 'hub') return;
    const { markers } = parseLayout(rows);
    assert.equal((markers.P || []).length, 1, `${ctx} needs exactly one spawn`);
    assert.ok((markers.M || []).length >= 1, `${ctx} needs a helper spot`);
  });
});

test('fetch chambers seat all six choices on visible pedestals', () => {
  for (const [i, rows] of TEMPLATES.fetch.entries()) {
    const { markers } = parseLayout(rows);
    assert.ok((markers.s || []).length >= 6, `fetch[${i}] needs ≥6 pedestals`);
    assert.ok((markers.A || []).length >= 1, `fetch[${i}] needs an altar`);
  }
});

test('every chamber can host rerouted fetch problems (≥4 spots + altar)', () => {
  eachTemplate((kind, rows, ctx) => {
    if (kind === 'hub') return;
    const { markers } = parseLayout(rows);
    const spots = (markers.s || []).length + (markers.p || []).length;
    assert.ok(spots >= 4, `${ctx} has ${spots} fetch spots`);
    assert.ok((markers.A || []).length >= 1, `${ctx} needs an altar`);
  });
});

test('array chambers host the full soil bed; share chambers all baskets', () => {
  for (const [i, rows] of TEMPLATES.array.entries()) {
    const { markers } = parseLayout(rows);
    const xs = markers.o.map((s) => s.x), zs = markers.o.map((s) => s.z);
    const w = Math.max(...xs) - Math.min(...xs) + 1;
    const d = Math.max(...zs) - Math.min(...zs) + 1;
    assert.equal(markers.o.length, w * d, `array[${i}] soil bed must be a full rect`);
    assert.ok(w >= HOST_LIMITS.arrayCols && d >= HOST_LIMITS.arrayRows, `array[${i}] bed ${w}×${d}`);
  }
  for (const [i, rows] of TEMPLATES.share.entries()) {
    const { markers } = parseLayout(rows);
    assert.ok((markers.B || []).length >= HOST_LIMITS.baskets, `share[${i}] baskets`);
    assert.equal((markers.m || []).length, 1, `share[${i}] stump`);
  }
  for (const [i, rows] of TEMPLATES.numberline.entries()) {
    const { markers } = parseLayout(rows);
    assert.ok((markers.V || []).length >= 8, `numberline[${i}] bridge too short`);
    const zs = new Set(markers.V.map((s) => s.z));
    assert.equal(zs.size, 1, `numberline[${i}] bridge must be one row`);
  }
});

// The altar is solid in-game (offerings happen by bumping into it, never by
// walking through). It must never wall off task cells or its own doorstep.
test('solid altar: all task cells stay reachable, altar keeps a doorstep', () => {
  const BLOCKED = new Set(['A', 'M', 'm', 'd']); // altar, helper, stump, decor (worst case)
  const reachableFrom = (rows) => {
    const { w, d, cells, markers } = parseLayout(rows);
    const ok = (x, z) => {
      const c = z >= 0 && z < d && x >= 0 && x < w ? cells[z][x] : null;
      return c && !BLOCKED.has(c.ch) ? c : null;
    };
    const start = markers.P[0];
    const seen = new Set([`${start.x},${start.z}`]);
    const q = [start];
    while (q.length) {
      const { x, z } = q.shift();
      const from = cells[z][x];
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, nz = z + dz, key = `${nx},${nz}`;
        const to = ok(nx, nz);
        if (!to || seen.has(key) || Math.abs(to.h - from.h) > 1) continue;
        seen.add(key);
        q.push({ x: nx, z: nz });
      }
    }
    return { markers, seen };
  };
  eachTemplate((kind, rows, ctx) => {
    if (kind === 'hub') return;
    for (let seed = 0; seed < 20; seed++) {
      const varied = seed === 0 ? rows : varyLayout(rows, new Rng(seed));
      const { markers, seen } = reachableFrom(varied);
      for (const ch of 'spoBVD') {
        for (const spot of markers[ch] || []) {
          assert.ok(seen.has(`${spot.x},${spot.z}`), `${ctx} seed ${seed}: '${ch}' at ${spot.x},${spot.z} unreachable`);
        }
      }
      for (const a of markers.A || []) {
        const doorstep = [[1, 0], [-1, 0], [0, 1], [0, -1]]
          .some(([dx, dz]) => seen.has(`${a.x + dx},${a.z + dz}`));
        assert.ok(doorstep, `${ctx} seed ${seed}: altar at ${a.x},${a.z} has no reachable doorstep`);
      }
    }
  });
});

// Guard the consolidated marker sets (config.js) against silent drift. These
// are the exact literals the patrol blocker (main.js patrolReach) and the
// paint blocker (verbs.js FloorModel._free) each hard-coded before TODO_03
// folded them into one source of truth. The two intentionally differ by 'c'
// (crab) and 'D' (door) — a crab patrol ignores both, but a painted model must
// avoid both — so pin each independently and pin the difference itself.
test('SOLID/OCCUPIED marker sets match the historical call-site literals', () => {
  const SOLID_WAS = 'AsPpBmMVoTON';      // main.js patrolReach
  const OCCUPIED_WAS = 'AsPpcDmMBVoTON'; // verbs.js FloorModel._free
  const pin = (set, lit) => {
    assert.equal(set.size, new Set(lit).size, `'${lit}': set has extra/missing markers`);
    for (const ch of lit) assert.ok(set.has(ch), `set is missing '${ch}'`);
  };
  pin(SOLID_MARKERS, SOLID_WAS);
  pin(OCCUPIED_MARKERS, OCCUPIED_WAS);
  // the deliberate difference is exactly the crab and the door, nothing else
  const extra = [...OCCUPIED_MARKERS].filter((ch) => !SOLID_MARKERS.has(ch)).sort();
  assert.deepEqual(extra, ['D', 'c'], 'OCCUPIED must add exactly crab + door over SOLID');
});

test('varyLayout: deterministic, preserves markers, only dresses plain floor', () => {
  eachTemplate((kind, rows, ctx) => {
    if (kind === 'hub') return;
    for (let seed = 0; seed < 20; seed++) {
      const a = varyLayout(rows, new Rng(seed));
      const b = varyLayout(rows, new Rng(seed));
      assert.deepEqual(a, b, `${ctx} seed ${seed} not deterministic`);
      assert.equal(a.length, rows.length, ctx);
      assert.equal(a[0].length, rows[0].length, ctx);
      const count = (rs, ch) => rs.join('').split('').filter((c) => c === ch).length;
      // task markers survive variation, in equal numbers
      for (const ch of 'PAspcDoBmVM') {
        assert.equal(count(a, ch), count(rows, ch), `${ctx} seed ${seed} lost '${ch}'`);
      }
      // sprinkles only ever replace plain floor — never water
      assert.equal(count(a, '#'), count(rows, '#'), `${ctx} water changed`);
    }
  });
});
