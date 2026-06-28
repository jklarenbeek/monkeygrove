// Places: ASCII-template dioramas (chambers + hub island), instanced tile
// floors, water, themed decoration, marker extraction.
//
// Template chars:
//   #  void (water)          .  floor      ,  floor (alt shade)
//   1  raised h1 (decor path; walkable)    2  raised h2
//   P  player spawn   A  altar   s  stone pedestal   p  pot (hides a stone)
//   c  crab patrol    D  exit door/portal  d  themed decoration
//   o  soil cell (array verb)   B  basket (share)   m  stump (share)
//   V  vine-bridge tile (numberline)   M  helper spot (mimi in the hub,
//   a friendly pet NPC in chambers)
//   hub only: T gem tree, O shop stand, N egg nest, t/g/u/y world portals,
//   l/f/e/h/k/b/j island build plots (island.js BUILDS), w bridge-gap water
//   (becomes 'V' planks once the bridge is built, '#' before — island.js)
import * as THREE from 'three';
import { TILE, STEP_H, PALETTE, WORLD_THEME, MARKERS, FLOOR_CHARS } from './config.js';
import { makeProp, makeCharacter, makeTextSprite, LivingPortal } from './entities.js';
import { PROPS, CHARS, getCreature } from './models.js';
import { buildScatter, decorateSpot } from './scatter.js';
import { BUILDS, applyIslandRows } from './island.js';
import { Rng } from './rng.js';
import { nextProblem } from './mathengine.js';
import { t } from './i18n.js';
import { GFX, ambientMotionScale } from './gfx.js';
import { reducedMotion } from './a11y.js';
import { makeContactShadow } from './blobshadow.js';
import { makeGlowSprite } from './glow.js';
import { createWaterSurface } from './water.js';
import { attachBuildIdle, attachNestGlow } from './reactive.js';
import { attachNpcRoutine } from './npc.js';

// Hero props that may gently sway (CPU path A). Rocks/coconuts/lanterns/shells stay
// rock-still; only foliage breathes.
const SWAYABLE = new Set(['palm', 'palmSmall', 'flowerPink', 'flowerYellow', 'flowerBlue', 'bush', 'sprout']);

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

const MARKER_CHARS = 'PAspcDdoBmVMTON tguy lfehkbj'.replace(/ /g, '');
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

export class Place {
  constructor(world, theme = 'hub') {
    this.world = world;
    this.theme = theme;
    this.group = new THREE.Group();
    this.entities = [];          // anything with update(dt)
    this._reactors = [];         // anything with react(type, payload) — Phase 8 event bus
    this.size = { w: 0, d: 0 };
    this.cells = [];
    this.markers = {};
    world.scene.add(this.group);
  }

  worldPos(x, z, lift = 0) {
    const c = this.cellAt(x, z);
    const h = c ? c.h : 0;
    return new THREE.Vector3(
      (x - this.size.w / 2 + 0.5) * TILE,
      h * STEP_H + lift,
      (z - this.size.d / 2 + 0.5) * TILE,
    );
  }

  cellAt(x, z) {
    if (x < 0 || z < 0 || z >= this.size.d || x >= this.size.w) return null;
    return this.cells[z]?.[x] || null;
  }

  canWalk(from, to) {
    if (!from || !to) return false;
    return Math.abs(to.h - from.h) <= 1 && to.walk !== false;
  }

  center() {
    return new THREE.Vector3(0, 0, 0);
  }

  buildFrom(rows, opts = {}) {
    const { w, d, cells, markers } = parseLayout(rows);
    this.size = { w, d };
    this.cells = cells;
    this.markers = markers;
    this._buildFloor(opts);
    this._buildWater();
    this._decorate(opts);
    this._scatter(opts);
    return this;
  }

  _floorColors(cell, x, z, opts) {
    const theme = WORLD_THEME[this.theme] || WORLD_THEME.hub;
    const checker = (x + z) % 2 === 0;
    let base;
    if (cell.ch === 'o') base = checker ? PALETTE.soil : PALETTE.soilDark;
    else if (theme.floor === 'sand') base = checker ? PALETTE.sand : PALETTE.sandDark;
    else if (theme.floor === 'soil') base = checker ? PALETTE.soil : PALETTE.soilDark;
    else base = checker ? PALETTE.grass : PALETTE.grassDark;
    if (cell.h > 0) base = checker ? PALETTE.stone : PALETTE.sandDark;
    if (cell.alt) base = PALETTE.sandDark;
    return base;
  }

  _buildFloor(opts) {
    const { w, d } = this.size;
    const list = [];
    for (let z = 0; z < d; z++) {
      for (let x = 0; x < w; x++) {
        const c = this.cells[z][x];
        if (!c || c.ch === 'V') continue; // bridge tiles get planks, not floor
        list.push({ x, z, c });
      }
    }
    const geo = new THREE.BoxGeometry(1, 1, 1); // per-place, disposed with it
    const mat = new THREE.MeshLambertMaterial();
    mat._owned = true;
    const inst = new THREE.InstancedMesh(geo, mat, list.length);
    const m4 = new THREE.Matrix4();
    const color = new THREE.Color();
    list.forEach((it, i) => {
      const top = it.c.h * STEP_H;
      const depth = top + 0.55;
      m4.makeScale(TILE, depth, TILE);
      m4.setPosition(
        (it.x - w / 2 + 0.5) * TILE,
        top - depth / 2,
        (it.z - d / 2 + 0.5) * TILE,
      );
      inst.setMatrixAt(i, m4);
      color.setHex(this._floorColors(it.c, it.x, it.z, opts));
      inst.setColorAt(i, color);
      it.c.instanceId = i;
    });
    inst.receiveShadow = true;
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    this.floor = inst;
    this.floorList = list;
    this.group.add(inst);
    this.world.pickables = [inst];
    inst.userData.place = this;
    inst.userData.gridList = list;

    // bridge planks
    for (const v of this.markers.V || []) {
      const plank = makeProp(PROPS.plank, 0.15, 'prop:plank');
      const p = this.worldPos(v.x, v.z);
      plank.position.set(p.x, -0.06, p.z);
      this.group.add(plank);
    }
    if ((this.markers.V || []).length) {
      const bridgeList = this.markers.V.slice();
      const pickGeo = new THREE.BoxGeometry(1, 1, 1);
      const pickMat = new THREE.MeshBasicMaterial({
        color: 0xffffff, transparent: true, opacity: 0, depthWrite: false,
      });
      pickGeo._owned = true;
      pickMat._owned = true;
      const pick = new THREE.InstancedMesh(pickGeo, pickMat, bridgeList.length);
      bridgeList.forEach((v, i) => {
        const p = this.worldPos(v.x, v.z);
        m4.makeScale(TILE, 0.16, TILE);
        m4.setPosition(p.x, 0.02, p.z);
        pick.setMatrixAt(i, m4);
      });
      pick.instanceMatrix.needsUpdate = true;
      pick.userData.place = this;
      pick.userData.gridList = bridgeList;
      this.bridgePick = pick;
      this.group.add(pick);
      this.world.pickables.push(pick);
    }
  }

  tintCell(x, z, hex) {
    const c = this.cellAt(x, z);
    if (!c || c.instanceId === undefined || !this.floor.instanceColor) return;
    const col = new THREE.Color(hex);
    this.floor.setColorAt(c.instanceId, col);
    this.floor.instanceColor.needsUpdate = true;
  }

  resetCellTint(x, z) {
    const c = this.cellAt(x, z);
    if (!c) return;
    this.tintCell(x, z, this._floorColors(c, x, z, {}));
  }

  _buildWater() {
    // Water lives in water.js (Phase 7). 'flat' (low) reproduces today's two planes +
    // bob exactly; 'animated' (med/high) adds shimmer, sparkle, foam, and theme tint.
    this.water = createWaterSurface(this, {
      size: this.size, quality: GFX.water, palette: PALETTE, theme: this.theme,
    });
    this.group.add(this.water.group);
  }

  _decorate(opts) {
    const rng = new Rng(opts.seed ?? 1234);
    this.swayProps = []; // capped hero-prop sway list (Phase 5)
    const themed = {
      hub: ['palm', 'flowerPink', 'flowerYellow', 'bush', 'palmSmall', 'flowerBlue'],
      tide: ['shell', 'rockA', 'palmSmall', 'flowerBlue', 'rockB'],
      garden: ['bush', 'flowerYellow', 'sprout', 'palmSmall', 'flowerPink'],
      stump: ['rockA', 'bush', 'coconut', 'rockB', 'lantern'],
      vines: ['flowerPink', 'flowerBlue', 'bush', 'lantern', 'flowerYellow'],
    }[this.theme] || ['bush'];
    for (const spot of this.markers.d || []) {
      const key = rng.pick(themed);
      const model = PROPS[key];
      if (!model) continue;
      const prop = makeProp(model, undefined, 'prop:' + key);
      const s = 0.06 + rng.float() * 0.015;
      prop.scale.setScalar(s);
      const p = this.worldPos(spot.x, spot.z);
      prop.position.copy(p);
      prop.rotation.y = rng.float() * Math.PI * 2;
      this.group.add(prop);
      // a small, capped set of foliage props sway (CPU); everything else stays still
      if (SWAYABLE.has(key) && this.swayProps.length < 8) {
        this.swayProps.push({ mesh: prop, phase: rng.float() * Math.PI * 2, amp: 0.05 + rng.float() * 0.05, freq: 0.6 + rng.float() * 0.5 });
      }
      const cell = this.cellAt(spot.x, spot.z);
      if (key === 'palm' || key === 'rockA' || key === 'rockB') cell.walk = false;
    }
  }

  // Gentle "breathing" tilt for the capped hero-prop set. Scaled by GFX.ambientScale;
  // fully still under reduced-motion or low tier (props rest at neutral). Blocking is
  // on the cell, not the mesh, so a swaying prop never drifts off a readable tile.
  _updateSway(dtMs) {
    const props = this.swayProps;
    if (!props || !props.length) return;
    const k = ambientMotionScale(GFX, reducedMotion());
    if (!k) {
      if (this._swaying) { for (const s of props) s.mesh.rotation.z = 0; this._swaying = false; }
      return;
    }
    this._swaying = true;
    this._swayT = (this._swayT || 0) + dtMs / 1000;
    for (const s of props) s.mesh.rotation.z = Math.sin(this._swayT * s.freq + s.phase) * s.amp * k;
  }

  // Drop a soft contact shadow on the floor under cell (x,z) — for static fixtures,
  // NPCs, and build clusters. On at every tier (GFX.contactShadows); shared
  // singletons (blobshadow.js) so dispose() needs no special handling.
  addGroundShadow(x, z, { radius = 0.4, opacity = 0.28, yOffset = 0.02 } = {}) {
    if (!GFX.contactShadows) return null;
    const blob = makeContactShadow({ radius, opacity, yOffset });
    const p = this.worldPos(x, z);
    blob.position.set(p.x, p.y + yOffset, p.z);
    this.group.add(blob);
    return blob;
  }

  // Cosmetic micro-prop carpet (Phase 3) — see scatter.js. Skipped at low tier so the
  // floor is identical to before; never mutates cell.walk (pathing-safe).
  _scatter(opts = {}) { buildScatter(this, opts); }

  // Dress a build plot/spot into a small inhabited "place" (non-blocking).
  decorateSpot(spot, opts) { decorateSpot(this, spot, opts); }

  addEntity(e) { this.entities.push(e); return e; }

  // Phase 8 visual-event bus. Reactors opt in via react(type, payload); those that also
  // need per-frame work expose update() and get ticked in the entities loop. The bus
  // never touches game state, RNG, scoring, or pathing — purely cosmetic broadcast.
  addReactor(r) { this._reactors.push(r); if (r.update) this.addEntity(r); return r; }

  visualEvent(type, payload = {}) {
    for (const r of this._reactors) r.react?.(type, payload); // unknown types are no-ops
  }

  update(dtMs) {
    for (const e of this.entities) e.update?.(dtMs);
    if (this.water) this.water.update(dtMs);
    this._updateSway(dtMs);
  }

  dispose() {
    this.water?.dispose?.(); // free any in-flight water-life spawns before the sweep
    this.world.scene.remove(this.group);
    this.group.traverse((o) => {
      if (o.isInstancedMesh) o.dispose(); // frees instanceMatrix/instanceColor GL buffers
      if (o.geometry && !o.geometry._cached) o.geometry.dispose?.();
      if (o.material?._owned) { o.material.map?.dispose?.(); o.material.dispose?.(); }
    });
    this.world.pickables = [];
  }
}

// ---------- chamber templates ----------

export const TEMPLATES = {
  fetch: [
    [
      '##############',
      '#,.d......d.,#',
      '#..s......s..#',
      '#..........M.#',
      '#.s....A...s.#',
      '#............#',
      '#...c........#',
      '#.p........p.#',
      '#..s......s..#',
      '#......P.....#',
      '#.d........d.#',
      '##############',
    ],
    [
      '#############',
      '##,.d...d.,##',
      '#.s.......s.#',
      '#...11111...#',
      '#.s.1...1.s.#',
      '#.....A..M..#',
      '#.....c.....#',
      '#,p.......p,#',
      '#.s..P....s.#',
      '##.d.....d.##',
      '#############',
    ],
    [
      '################',
      '#,.d.......s..,#',
      '#..p...A...p...#',
      '#.s..........s.#',
      '#....c.....c...#',
      '#..........M...#',
      '#.s..........s.#',
      '#......P....s..#',
      '#.,d........d,.#',
      '################',
    ],
  ],
  array: [
    [
      '##################',
      '#,.d..........d.,#',
      '#..oooooooooo..s.#',
      '#..oooooooooo....#',
      '#..oooooooooo..A.#',
      '#..oooooooooo....#',
      '#..oooooooooo..s.#',
      '#..oooooooooo....#',
      '#..oooooooooo..M.#',
      '#..oooooooooo..s.#',
      '#..s....P........#',
      '#.d............d.#',
      '##################',
    ],
    [
      '##################',
      '#,.d...........d,#',
      '#..s...........s.#',
      '#...oooooooooo...#',
      '#...oooooooooo.A.#',
      '#...oooooooooo...#',
      '#...oooooooooo.M.#',
      '#...oooooooooo...#',
      '#...oooooooooo.s.#',
      '#...oooooooooo...#',
      '#...oooooooooo...#',
      '#.s.....P......d.#',
      '##################',
    ],
  ],
  numberline: [
    [
      '##########################',
      '#,d....................d,#',
      '#..M..s............s..A,.#',
      '#.,VVVVVVVVVVVVVVVVVVVVV.#',
      '#......................,.#',
      '#..P..s............s...d.#',
      '##########################',
    ],
    [
      '########################',
      '#,d..................d,#',
      '#...s..........s....M..#',
      '#..VVVVVVVVVVVVVVVVVV..#',
      '#....,.............,...#',
      '#..P....s........s...A.#',
      '########################',
    ],
  ],
  share: [
    [
      '###############',
      '#,.d.......d.,#',
      '#..B...B...B..#',
      '#.s....M....s.#',
      '#......m......#',
      '#....c....A...#',
      '#..B...B...B..#',
      '#.s...P....s..#',
      '#.,d.......d,.#',
      '###############',
    ],
    [
      '###############',
      '#,.d..M....d.,#',
      '#..B..B..B....#',
      '#.s........s..#',
      '#....m....A...#',
      '#.s........s..#',
      '#..B..B..B....#',
      '#....P.....c..#',
      '#.,d.......d,.#',
      '###############',
    ],
  ],
  hub: [
    // East of the shore: the festival islet, reached over the 'w' bridge gap
    // once the bridge build is funded (island.js applyIslandRows).
    [
      '################################',
      '###,.....dd......d.,############',
      '##..t...........g..f.###########',
      '#..........d..........##########',
      '#.d.....1111111......d.#########',
      '#.......1,,,,,1........#########',
      '#.h.d...1,,T,,1...N....#########',
      '#.......1,,,,,1........###....##',
      '#.......1111111.l..d...##......#',
      '#..d.........M........bwww..j..#',
      '#......................##......#',
      '#...O.......P......d...###....##',
      '#.................e....#########',
      '#.d..k..d....,,....d...#########',
      '##..u...........y....###########',
      '###,....dd.....d..,#############',
      '################################',
    ],
  ],
};

export const HUB_PORTALS = { t: 'tide', g: 'garden', u: 'stump', y: 'vines' };

// Builds the hub: portals, gem tree, shop stand, egg nest, mimi, bloom
// tinting, and the island-restoration builds (plots, finished builds, NPCs).
// island: { built: [ids], unlocked: [ids], crabKing: bool, festival: bool }
// gateStages: last celebrated living-gate stage per world (the display floor —
// gates are built at this stage so a fresh stage-up can visibly grow in).
export class HubPlace extends Place {
  constructor(world, masteryPct, island = {}, gateStages = {}, storyBloom = 0) {
    super(world, 'hub');
    this.island = { built: [], unlocked: [], crabKing: false, festival: false, ...island };
    // story-mode wholeness (0..1): an island-wide bloom floor so the whole grove
    // — including the village center far from any world portal — gently gains
    // colour as the founding hexagram is restored. 0 keeps the pre-story behaviour.
    this.storyBloom = storyBloom;
    this.buildFrom(applyIslandRows(TEMPLATES.hub[0], this.island.built), { seed: 777 });
    this.portals = {};
    this.gates = {};
    for (const [ch, worldId] of Object.entries(HUB_PORTALS)) {
      const spot = (this.markers[ch] || [])[0];
      if (!spot) continue;
      const theme = WORLD_THEME[worldId];
      const pct = this.island.festival ? 1 : Math.min(1, masteryPct?.[worldId] ?? 0);
      const stage = this.island.festival ? 4
        : Math.min(4, Math.max(0, gateStages[worldId] ?? 0));
      this.gates[worldId] = new LivingPortal(this, spot, {
        worldId,
        label: `${theme.emoji} ${t('world.' + worldId)}`,
        accent: theme.accent,
        bloom: theme.bloom,
        pct,
        stage,
      });
      this.portals[worldId] = spot;
    }
    const tree = (this.markers.T || [])[0];
    if (tree) {
      this.tree = makeProp(PROPS.palm, 2.6, 'prop:bigpalm');
      this.tree.position.copy(this.worldPos(tree.x, tree.z));
      this.group.add(this.tree);
      this.addGroundShadow(tree.x, tree.z, { radius: 0.7, opacity: 0.22 });
      // a soft magic glow crowns the gem tree on high tier (glow language, Phase 6);
      // gated to bloom so low/medium stay exactly as today
      if (GFX.bloom) {
        const glow = makeGlowSprite(0xfff3b8, 0.5, 0.5);
        glow.position.copy(this.worldPos(tree.x, tree.z)).add(new THREE.Vector3(0, 2.2, 0));
        this.group.add(glow);
      }
      this.cellAt(tree.x, tree.z).walk = false;
    }
    const shop = (this.markers.O || [])[0];
    if (shop) {
      const stand = makeProp(PROPS.sign, 0.85, 'prop:sign');
      stand.position.copy(this.worldPos(shop.x, shop.z));
      this.group.add(stand);
      this.addGroundShadow(shop.x, shop.z, { radius: 0.4 });
    }
    const nest = (this.markers.N || [])[0];
    if (nest) {
      const egg = makeProp(PROPS.egg, 0.6, 'prop:egg');
      egg.position.copy(this.worldPos(nest.x, nest.z));
      this.group.add(egg);
      this.addGroundShadow(nest.x, nest.z, { radius: 0.34 });
      attachNestGlow(this, nest.x, nest.z); // Phase 8: warm breathing nest glow (med/high)
    }
    const mimi = (this.markers.M || [])[0];
    if (mimi) {
      this.mimi = makeCharacter(CHARS.mimi, 0.8, null, 'char:mimi');
      this.mimi.position.copy(this.worldPos(mimi.x, mimi.z));
      this.group.add(this.mimi);
      this.addGroundShadow(mimi.x, mimi.z, { radius: 0.34 }); // companion, on-roster
      this.cellAt(mimi.x, mimi.z).walk = false;
      this.mimiHome = { x: mimi.x, z: mimi.z };
      this.mimiPos = { x: mimi.x, z: mimi.z };
      this.mimiPrev = { x: mimi.x, z: mimi.z };
      this.playerAt = null; // set by the game so Mimi never hops onto the player
      // floating tag: she's tappable — 📜 when blueprints wait at the worktable
      this.mimiTag = makeTextSprite(
        this.island.unlocked.length ? '📜' : '💬',
        { bg: '#fff8ecdd', scale: 0.55, fontSize: 44 },
      );
      this.group.add(this.mimiTag);
      this._mimiWander();
    }
    this.buildSpots = {};   // build id -> {x, z, state} for hub taps
    this.npcs = [];         // tappable friends who moved in with builds
    this._plotSigns = {};   // unlocked-plot id -> [sign, tag], cleared by addBuild
    this._placeBuilds();
    if (this.island.crabKing) this._placeCrabKing();
    this.applyBloom(masteryPct);
    // friends (and Mimi's tag) are pickable too — a tap on a character must
    // not fall through to the floor tile behind them (iso projection!)
    for (const o of [this.mimi, this.mimiTag, ...this.npcs.map((n) => n.mesh)]) {
      if (o) this.world.pickables.push(o);
    }
  }

  refreshLanguage() {
    for (const [worldId, gate] of Object.entries(this.gates || {})) {
      const theme = WORLD_THEME[worldId];
      gate.updateLabel(`${theme.emoji} ${t('world.' + worldId)}`);
    }
  }

  // Gentle idle bounce shared by every standing friend in the hub.
  _bob(mesh, speed = 2, amp = 0.04) {
    const baseY = mesh.position.y;
    const ent = {
      t: Math.random() * 6,
      update: (dt) => {
        ent.t += dt / 1000;
        mesh.position.y = baseY + Math.abs(Math.sin(ent.t * speed)) * amp;
      },
    };
    this.addEntity(ent);
  }

  // Mimi lives near her worktable: idle bob, little hops around her home
  // spot, turns to greet the player when they come close. Her speech tag
  // follows her so kids can see she's tappable.
  _mimiWander() {
    const mesh = this.mimi;
    const st = { t: Math.random() * 6, wait: 1800 + Math.random() * 2600, hop: null };
    this.addEntity({
      update: (dt) => {
        st.t += dt / 1000;
        this.mimiTag.position.set(
          mesh.position.x,
          mesh.position.y + 1.3 + Math.sin(st.t * 2) * 0.05,
          mesh.position.z,
        );
        if (st.hop) {
          st.hop.k += dt / 280;
          const k = Math.min(1, st.hop.k);
          mesh.position.lerpVectors(st.hop.from, st.hop.to, k);
          mesh.position.y += Math.sin(k * Math.PI) * 0.3;
          if (k >= 1) st.hop = null;
          return;
        }
        const base = this.worldPos(this.mimiPos.x, this.mimiPos.z);
        mesh.position.y = base.y + Math.abs(Math.sin(st.t * 2)) * 0.04;
        // greet: face the player when they're nearby
        const p = this.playerAt?.();
        if (p && Math.abs(p.x - this.mimiPos.x) + Math.abs(p.z - this.mimiPos.z) <= 2) {
          const want = Math.atan2(p.x - this.mimiPos.x, p.z - this.mimiPos.z);
          mesh.rotation.y += (want - mesh.rotation.y) * Math.min(1, dt / 160);
        }
        st.wait -= dt;
        if (st.wait > 0) return;
        st.wait = 2200 + Math.random() * 3800;
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]].sort(() => Math.random() - 0.5);
        for (const [dx, dz] of dirs) {
          const nx = this.mimiPos.x + dx, nz = this.mimiPos.z + dz;
          if (Math.abs(nx - this.mimiHome.x) + Math.abs(nz - this.mimiHome.z) > 2) continue;
          const c = this.cellAt(nx, nz);
          if (!c || !c.walk || c.h !== 0 || !(FLOOR_CHARS.has(c.ch) || c.ch === MARKERS.HELPER)) continue;
          if (p && p.x === nx && p.z === nz) continue;
          // claim the new cell, free the old (taps check both during the hop)
          this.cellAt(this.mimiPos.x, this.mimiPos.z).walk = true;
          c.walk = false;
          this.mimiPrev = { ...this.mimiPos };
          this.mimiPos = { x: nx, z: nz };
          mesh.rotation.y = Math.atan2(dx, dz);
          st.hop = { from: mesh.position.clone(), to: this.worldPos(nx, nz), k: 0 };
          break;
        }
      },
    });
  }

  _prop(key, targetH, x, z, dx = 0, dz = 0, lift = 0) {
    const prop = makeProp(PROPS[key], targetH, 'prop:' + key);
    const p = this.worldPos(x, z, lift);
    prop.position.set(p.x + dx * TILE, p.y, p.z + dz * TILE);
    this.group.add(prop);
    return prop;
  }

  _placeBuilds() {
    for (const def of BUILDS) {
      const spot = (this.markers[def.char] || [])[0];
      if (!spot) continue;
      const state = this.island.built.includes(def.id) ? 'built'
        : this.island.unlocked.includes(def.id) ? 'unlocked' : 'locked';
      this.buildSpots[def.id] = { x: spot.x, z: spot.z, state };
      if (state === 'built') this._placeBuilt(def, spot);
      else if (state === 'unlocked') this._placePlotSign(def, spot);
    }
  }

  // An unlocked plot: wooden sign + a floating "🔨" tag, tap to fund. Both
  // meshes are tracked per build so addBuild() can clear them when the build
  // itself takes the plot (the incremental fund-a-build path).
  _placePlotSign(def, spot) {
    const sign = this._prop('sign', 0.8, spot.x, spot.z);
    const tag = makeTextSprite(`🔨 ${def.emoji}`, { bg: '#fff8ecdd', scale: 0.7, fontSize: 44 });
    tag.position.copy(this.worldPos(spot.x, spot.z, 1.45));
    this.group.add(tag);
    this.cellAt(spot.x, spot.z).walk = false;
    this._plotSigns[def.id] = [sign, tag];
  }

  // Raise one funded build on its existing plot — drop just this build's meshes
  // (and any move-in friend) in place, touching nothing else in the scene. This
  // is the no-hitch path behind the fund-a-build celebration, and it mirrors
  // what _placeBuilds() does for a single build on a fresh load so the
  // incremental and from-scratch hubs agree. Returns the build's spot, or null
  // when the build reshapes the whole island and the caller must fall back to a
  // full rebuild: the bridge re-floors the water gap into plank tiles (a
  // template-level change, see applyIslandRows) and the finale reblooms the
  // entire island, maxes the gates, and moves the Crab King in.
  addBuild(buildId) {
    const def = BUILDS.find((b) => b.id === buildId);
    if (!def || def.finale || buildId === 'bridge') return null;
    const spot = (this.markers[def.char] || [])[0];
    if (!spot) return null;
    this._clearPlotSign(buildId); // the unlocked-plot sign + 🔨 tag give way
    if (!this.island.built.includes(buildId)) this.island.built.push(buildId);
    this.buildSpots[buildId] = { x: spot.x, z: spot.z, state: 'built' };
    const npcBefore = this.npcs.length;
    this._placeBuilt(def, spot);
    // a friend who just moved in must be tappable too — the constructor does
    // this for every npc; here we add only the ones _placeBuilt just pushed
    for (const n of this.npcs.slice(npcBefore)) this.world.pickables.push(n.mesh);
    return this.buildSpots[buildId];
  }

  // Clear the unlocked-plot dressing (wooden sign + floating 🔨 tag) once the
  // build takes the plot, disposing exactly as Place.dispose() would: shared
  // cached geometry and shared materials are left alone, the tag's owned canvas
  // texture is freed.
  _clearPlotSign(buildId) {
    const meshes = this._plotSigns[buildId];
    if (!meshes) return;
    for (const o of meshes) {
      this.group.remove(o);
      o.traverse((c) => {
        if (c.geometry && !c.geometry._cached) c.geometry.dispose?.();
        if (c.material?._owned) { c.material.map?.dispose?.(); c.material.dispose?.(); }
      });
    }
    delete this._plotSigns[buildId];
  }

  _placeBuilt(def, spot) {
    const { x, z } = spot;
    const block = (bx, bz) => { const c = this.cellAt(bx, bz); if (c) c.walk = false; };
    // One larger, softer blob grounds the whole cluster as a single mass (cheaper and
    // reads better than a blob per prop). The bridge has no prop at its plot.
    if (def.id !== 'bridge') {
      this.addGroundShadow(x, z, { radius: 0.85, opacity: 0.18 });
      // Non-blocking dressing turns the plot into a small inhabited place (Phase 3);
      // the plaza is the festival centerpiece → richest density.
      this.decorateSpot(spot, { role: def.id === 'plaza' ? 'festival' : 'near-build', bloom: this.storyBloom || 0.75 });
      attachBuildIdle(this, def, spot); // a lived-in idle effect per build (Phase 8)
    }
    if (def.id === 'lanterns') {
      for (const dx of [-1, 0, 1]) {
        if (this.cellAt(x + dx, z)) { this._prop('lantern', 0.55, x + dx, z); block(x + dx, z); }
      }
    } else if (def.id === 'fruitstand') {
      this._prop('stall', 1.15, x, z);
      this._prop('basket', 0.3, x, z, 0.62, 0.45);
      block(x, z);
    } else if (def.id === 'garden') {
      this._prop('flowerPink', 0.34, x, z);
      this._prop('flowerYellow', 0.32, x, z, 0.55, 0.3);
      this._prop('flowerBlue', 0.32, x, z, -0.5, 0.32);
      this._prop('bush', 0.42, x, z, 0.12, -0.5);
      this._prop('sprout', 0.3, x, z, -0.45, -0.35);
      this._prop('flowerPink', 0.3, x, z, 0.5, -0.28);
      block(x, z);
    } else if (def.id === 'stage') {
      this._prop('gong', 1.0, x, z);
      this._prop('lantern', 0.5, x, z, 0.85, 0.2);
      this._prop('lantern', 0.5, x, z, -0.85, 0.2);
      block(x, z);
    } else if (def.id === 'bakery') {
      this._prop('oven', 1.0, x, z);
      this._prop('basket', 0.3, x, z, 0.7, 0.35);
      block(x, z);
    } else if (def.id === 'plaza') {
      this._prop('portal', 1.7, x, z);
      this._prop('lantern', 0.5, x, z, 1.0, 0.4);
      this._prop('lantern', 0.5, x, z, -1.0, 0.4);
      this._prop('flowerYellow', 0.3, x, z, 0.9, -0.5);
      this._prop('flowerPink', 0.3, x, z, -0.9, -0.5);
      const tag = makeTextSprite('🎪', { scale: 0.8 });
      tag.position.copy(this.worldPos(x, z, 2.3));
      this.group.add(tag);
      block(x, z);
    }
    // 'bridge' renders through the V plank cells — nothing at the plot itself.
    if (def.npc) this._placeNpc(def, spot);
  }

  // A friend moves in next to their build: idle bounce, tap for a chat.
  _placeNpc(def, spot) {
    const creature = getCreature(def.npc.pet);
    let home = null;
    for (const [dx, dz] of [[0, 1], [1, 0], [-1, 0], [0, -1]]) {
      const c = this.cellAt(spot.x + dx, spot.z + dz);
      if (c && c.walk && FLOOR_CHARS.has(c.ch)) { home = { x: spot.x + dx, z: spot.z + dz }; break; }
    }
    if (!home) return;
    const mesh = makeCharacter(creature.full, 0.62, null, 'creature:' + creature.id + ':f');
    mesh.position.copy(this.worldPos(home.x, home.z));
    this.group.add(mesh);
    this.addGroundShadow(home.x, home.z, { radius: 0.3 }); // on-roster build friend
    this.cellAt(home.x, home.z).walk = false;
    const entry = { id: def.id, face: def.npc.face, x: home.x, z: home.z, mesh };
    this.npcs.push(entry);
    // a small loop of life around the build (Phase 9). 'limited' (low) = today's bob.
    attachNpcRoutine(this, mesh, spot, entry, this.npcs.length);
  }

  // After the festival the Crab King stays on the islet, sheepish forever.
  _placeCrabKing() {
    const plaza = (this.markers.j || [])[0];
    if (!plaza) return;
    const c = this.cellAt(plaza.x - 1, plaza.z);
    if (!c || !c.walk) return;
    const mesh = makeCharacter(CHARS.crabKing, 0.95, null, 'char:crabKing');
    mesh.position.copy(this.worldPos(plaza.x - 1, plaza.z));
    this.group.add(mesh);
    c.walk = false;
    this._bob(mesh, 1.4, 0.03);
    this.npcs.push({ id: 'crabking', face: '🦀', x: plaza.x - 1, z: plaza.z, mesh });
  }

  // masteryPct: {tide:0..1, garden:.., stump:.., vines:..} — desaturate regions by progress.
  // After the festival the whole island blooms for good.
  applyBloom(pct) {
    const gray = new THREE.Color(PALETTE.gray);
    const color = new THREE.Color();
    // island-wide bloom floor from story progress (whole grove blooms together)
    const floor = this.island.festival ? 1 : Math.min(1, this.storyBloom || 0);
    for (const it of this.floorList) {
      // nearest portal decides the region
      let best = null, bestD = 1e9;
      for (const [worldId, spot] of Object.entries(this.portals)) {
        const dd = Math.abs(it.x - spot.x) + Math.abs(it.z - spot.z);
        if (dd < bestD) { bestD = dd; best = worldId; }
      }
      const regional = (best !== null && bestD <= 7)
        ? Math.min(1, (pct?.[best] ?? 0) * 1.15) : 0;
      const p = this.island.festival ? 1 : Math.max(regional, floor);
      if (p <= 0) continue; // still pure gray — far from any world and no story bloom yet
      color.setHex(this._floorColors(it.c, it.x, it.z, {}));
      color.lerpColors(gray, color, 0.25 + 0.75 * p);
      this.floor.setColorAt(it.c.instanceId, color);
    }
    if (this.floor.instanceColor) this.floor.instanceColor.needsUpdate = true;
  }
}
