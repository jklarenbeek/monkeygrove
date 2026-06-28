// Prop density — a cosmetic micro-prop carpet rendered as one
// InstancedMesh per type. Pure planning (deterministic, testable) + the GL build,
// kept out of chamber.js to stay within its size budget.
//
// HARD rules: never set cell.walk, never land on or beside an interactable, and never
// touch the chamber/problem Rng (a forked one is used) — so pathing, crab patrols,
// and duel determinism are all unaffected.
import * as THREE from 'three';
import { TILE } from './config.js';
import { GFX } from './gfx.js';
import { Rng } from './rng.js';
import { PROPS } from './models.js';
import { makeProp } from './entities.js';
import { buildVoxelMesh, windMaterial } from './voxel.js';

// Base micro-props every theme gets, plus a small themed accent set. `base` is the
// per-eligible-cell placement probability (before tier/bloom scaling); `cap` bounds
// the instance count per type so a big floor can't blow up draw cost; `h` is the
// target world height (these stay tiny — floor texture, not objects).
const SCATTER_BASE = [
  { key: 'grassA', base: 0.30, cap: 240, h: 0.16 },
  { key: 'grassB', base: 0.18, cap: 180, h: 0.22 },
  { key: 'pebble', base: 0.12, cap: 120, h: 0.08 },
];
const SCATTER_THEME = {
  hub: [{ key: 'flowerPink', base: 0.05, cap: 50, h: 0.18 }, { key: 'flowerBlue', base: 0.04, cap: 40, h: 0.18 }],
  tide: [{ key: 'shell', base: 0.10, cap: 70, h: 0.14 }, { key: 'pebble', base: 0.12, cap: 110, h: 0.08 }],
  garden: [{ key: 'flowerPink', base: 0.12, cap: 90, h: 0.18 }, { key: 'flowerYellow', base: 0.08, cap: 70, h: 0.18 }],
  stump: [{ key: 'coconut', base: 0.05, cap: 35, h: 0.16 }, { key: 'grassB', base: 0.10, cap: 90, h: 0.22 }],
  vines: [{ key: 'mushroom', base: 0.10, cap: 70, h: 0.16 }, { key: 'crystal', base: 0.06, cap: 45, h: 0.20 }],
};

export function scatterTypes(theme) {
  return [...SCATTER_BASE, ...(SCATTER_THEME[theme] || SCATTER_THEME.hub)];
}

// Eligible cells: interior, plain floor ('.'/','), ground level, walkable, AND every
// neighbour also plain floor (or water/out-of-bounds) — that all-plain neighbourhood
// is the 1-tile clearance ring that keeps decor away from any marker, raised tile, or
// interactable while still allowing the shore (water neighbours are fine).
export function eligibleScatterCells(cells, w, d) {
  const at = (x, z) => (x < 0 || z < 0 || x >= w || z >= d) ? null : (cells[z]?.[x] || null);
  const plain = (c) => !!c && (c.ch === '.' || c.ch === ',') && c.h === 0;
  const out = [];
  for (let z = 1; z < d - 1; z++) {
    for (let x = 1; x < w - 1; x++) {
      const c = at(x, z);
      if (!c || c.walk === false || !plain(c)) continue;
      let ok = true;
      for (let dz = -1; dz <= 1 && ok; dz++) {
        for (let dx = -1; dx <= 1 && ok; dx++) {
          if (!dx && !dz) continue;
          const n = at(x + dx, z + dz);
          if (n && !plain(n)) ok = false; // a marker / raised / occupied neighbour → keep clear
        }
      }
      if (ok) out.push({ x, z });
    }
  }
  return out;
}

// Deterministic placement plan: for each type, a density-scaled subset of eligible
// cells with a jittered offset, scale, and rotation. Pure (rng-driven) so the same
// seed reproduces the same field. `mult` folds in tier density and region bloom.
export function planScatter(eligible, types, rng, mult) {
  const out = [];
  for (const type of types) {
    const frac = Math.min(0.85, type.base * mult);
    if (frac <= 0) continue;
    const cells = rng.shuffle(eligible.slice());
    let count = 0;
    for (const cell of cells) {
      if (count >= type.cap) break;
      if (!rng.chance(frac)) continue;
      out.push({
        key: type.key, x: cell.x, z: cell.z,
        jx: (rng.float() - 0.5) * 0.6, jz: (rng.float() - 0.5) * 0.6,
        scale: 0.8 + rng.float() * 0.5, rot: rng.float() * Math.PI * 2, h: type.h,
      });
      count++;
    }
  }
  return out;
}

// Build the scatter field for a place. Skipped entirely at low tier
// (GFX.decorDensity === 0) → the floor is identical to before.
export function buildScatter(place, opts = {}) {
  const density = GFX.decorDensity | 0;
  if (!density) return; // Low tier: unchanged
  const bloom = Math.max(0, Math.min(1, opts.bloom ?? place.storyBloom ?? 0.6));
  const mult = density * (0.35 + 0.65 * bloom);
  const rng = new Rng((opts.seed ?? 1234) ^ 0x5ca77e7);
  const eligible = eligibleScatterCells(place.cells, place.size.w, place.size.d);
  if (!eligible.length) return;
  const plan = planScatter(eligible, scatterTypes(place.theme), rng, mult);
  if (!plan.length) return;
  const byKey = new Map();
  for (const p of plan) { if (!byKey.has(p.key)) byKey.set(p.key, []); byKey.get(p.key).push(p); }
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const pos = new THREE.Vector3();
  const scl = new THREE.Vector3();
  for (const [key, items] of byKey) {
    const model = PROPS[key];
    if (!model) continue;
    const geo = buildVoxelMesh(model, { cacheKey: 'scatter:' + key }).geometry;
    // windMaterial → the whole field sways on the GPU; amp 0 = static.
    const inst = new THREE.InstancedMesh(geo, windMaterial(), items.length);
    items.forEach((it, i) => {
      const wp = place.worldPos(it.x, it.z);
      const s = (it.h / model.layers.length) * it.scale;
      pos.set(wp.x + it.jx * TILE, wp.y, wp.z + it.jz * TILE);
      q.setFromAxisAngle(up, it.rot);
      scl.setScalar(s);
      m4.compose(pos, q, scl);
      inst.setMatrixAt(i, m4);
    });
    inst.instanceMatrix.needsUpdate = true;
    inst.castShadow = false;     // micro-props: skip the shadow-map cost
    inst.receiveShadow = false;
    inst.frustumCulled = false;
    place.group.add(inst);       // shared geo (_cached) + shared material → dispose-safe
  }
}

// Dress a build plot (or hand-tuned spot) with a few non-blocking sprinkles on the
// surrounding floor ring — turning a plot into a small inhabited "place". Cosmetic
// only (never sets walk). Deterministic from the spot coords. Skipped at low tier.
export function decorateSpot(place, spot, { role = 'near-build', bloom = 0.7 } = {}) {
  const density = GFX.decorDensity | 0;
  if (!density) return;
  const rng = new Rng((((spot.x + 1) * 92837) ^ ((spot.z + 1) * 689287) ^ 0x5ca77e7) >>> 0);
  const accents = role === 'festival'
    ? ['flowerPink', 'flowerYellow', 'flowerBlue', 'crystal']
    : ['grassA', 'grassB', 'flowerPink', 'pebble'];
  const ring = [];
  for (let dz = -1; dz <= 1; dz++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dz) continue;
      const c = place.cellAt(spot.x + dx, spot.z + dz);
      if (c && c.walk !== false && c.h === 0 && (c.ch === '.' || c.ch === ',')) {
        ring.push({ x: spot.x + dx, z: spot.z + dz });
      }
    }
  }
  const n = Math.min(ring.length, Math.round((role === 'festival' ? 5 : 3) * density * (0.4 + 0.6 * bloom)));
  for (const cell of rng.shuffle(ring).slice(0, n)) {
    const key = rng.pick(accents);
    const model = PROPS[key];
    if (!model) continue;
    const prop = makeProp(model, 0.18 * (0.8 + rng.float() * 0.5), 'prop:' + key);
    const p = place.worldPos(cell.x, cell.z);
    prop.position.set(p.x + (rng.float() - 0.5) * 0.4, p.y, p.z + (rng.float() - 0.5) * 0.4);
    prop.rotation.y = rng.float() * Math.PI * 2;
    prop.castShadow = false;
    place.group.add(prop); // never blocks: cell.walk untouched
  }
}
