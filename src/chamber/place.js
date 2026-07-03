// Place: an ASCII-template diorama — instanced tile floor, shader water, themed
// decoration, landmark + islets, and the pickable/reactor/entity plumbing every
// scene shares. The base class behind chambers (chamberflow), the hub (HubPlace),
// and the business/cutscene/stage scenes; buildFrom(rows) turns a template into a
// live board. Marker vocabulary and template data live in templates.js/layout.js.
import * as THREE from 'three';
import { TILE, STEP_H, PALETTE, WORLD_THEME, FLOOR_CHARS } from '../config.js';
import { makeProp } from '../entities.js';
import { PROPS } from '../models.js';
import { buildScatter, decorateSpot } from '../scatter.js';
import { Rng } from '../rng.js';
import { GFX, ambientMotionScale } from '../gfx.js';
import { reducedMotion } from '../a11y.js';
import { makeContactShadow } from '../blobshadow.js';
import { createWaterSurface } from '../water.js';
import { parseLayout } from './layout.js';

// Hero props that may gently sway (CPU path A). Rocks/coconuts/lanterns/shells stay
// rock-still; only foliage breathes.
const SWAYABLE = new Set(['palm', 'palmSmall', 'flowerPink', 'flowerYellow', 'flowerBlue', 'bush', 'sprout']);

export class Place {
  constructor(world, theme = 'hub') {
    this.world = world;
    this.theme = theme;
    this.group = new THREE.Group();
    this.entities = [];          // anything with update(dt)
    this._reactors = [];         // anything with react(type, payload) — the world-reactivity event bus
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
    // Water lives in water.js. 'flat' (low) reproduces today's two planes +
    // bob exactly; 'animated' (med/high) adds shimmer, sparkle, foam, and theme tint.
    this.water = createWaterSurface(this, {
      size: this.size, quality: GFX.water, palette: PALETTE, theme: this.theme,
    });
    this.group.add(this.water.group);
  }

  _decorate(opts) {
    const rng = new Rng(opts.seed ?? 1234);
    this.swayProps = []; // capped hero-prop sway list (gentle foliage breathing)
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
    if (this.theme !== 'hub') {
      this._landmark(rng);
      this._islets(rng);
    }
  }

  // Every walkable tile reachable from (any) start over the |dh|<=1 hop graph —
  // used to prove a landmark can block its cell without pinching off a path.
  _reachableWalk(blocked) {
    const { w, d } = this.size;
    let start = null;
    for (let z = 0; z < d && !start; z++) {
      for (let x = 0; x < w && !start; x++) {
        const c = this.cellAt(x, z);
        if (c && c.walk && !(blocked && x === blocked.x && z === blocked.z)) start = { x, z };
      }
    }
    const seen = new Set(start ? [start.x + ',' + start.z] : []);
    const q = start ? [start] : [];
    while (q.length) {
      const { x, z } = q.pop();
      const from = this.cellAt(x, z);
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, nz = z + dz;
        if (blocked && nx === blocked.x && nz === blocked.z) continue;
        const to = this.cellAt(nx, nz);
        if (!to || !to.walk || seen.has(nx + ',' + nz)) continue;
        if (Math.abs(to.h - from.h) > 1) continue;
        seen.add(nx + ',' + nz);
        q.push({ x: nx, z: nz });
      }
    }
    return seen;
  }

  // One recognizable set piece per world — a postcard silhouette so two
  // chambers in different worlds can never be mistaken for each other:
  // Tide Pools a lighthouse, Banana Garden a mushroom ring, Sharing Stump a
  // grand old palm, Vine Heights a flowering arch. Placed on a shore-side
  // plain tile far from every task cell; the tile is blocked like a tree, and
  // only when blocking it provably cuts off nothing (same reachability rule
  // the coastline carver uses). Seeded rng → duel boards stay identical.
  _landmark(rng) {
    const build = {
      tide: (g) => g.add({ key: 'lighthouse', h: 1.7 }),
      garden: (g) => {
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2 + 0.4;
          g.add({ key: 'mushroom', s: 0.055 + rng.float() * 0.02, dx: Math.cos(a) * 0.34, dz: Math.sin(a) * 0.34 });
        }
        g.add({ key: 'sprout', s: 0.06 });
      },
      stump: (g) => {
        g.add({ key: 'palm', s: 0.095 });
        g.add({ key: 'coconut', s: 0.05, dx: 0.3, dz: 0.18 });
        g.add({ key: 'coconut', s: 0.05, dx: -0.26, dz: 0.3 });
      },
      vines: (g) => g.add({ key: 'vineArch', h: 1.5 }),
    }[this.theme];
    if (!build) return;
    const { w, d } = this.size;
    const m = this.markers;
    const keep = [];
    for (const ch of 'APMsmBVDopc') keep.push(...(m[ch] || []));
    const spots = [];
    for (let z = 1; z < d - 1; z++) {
      for (let x = 1; x < w - 1; x++) {
        const c = this.cellAt(x, z);
        if (!c || !c.walk || c.h !== 0 || !FLOOR_CHARS.has(c.ch)) continue;
        if (!keep.every((q) => Math.abs(q.x - x) + Math.abs(q.z - z) >= 3)) continue;
        let coast = false;
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          if (!this.cellAt(x + dx, z + dz)) coast = true;
        }
        if (coast) spots.push({ x, z });
      }
    }
    for (const spot of rng.shuffle(spots)) {
      const before = this._reachableWalk();
      const after = this._reachableWalk(spot);
      if (after.size < before.size - 1) continue; // would pinch a path — next spot
      const p = this.worldPos(spot.x, spot.z);
      const group = {
        add: ({ key, h, s, dx = 0, dz = 0 }) => {
          const prop = makeProp(PROPS[key], h, 'prop:' + key);
          if (s) prop.scale.setScalar(s);
          prop.position.set(p.x + dx, p.y, p.z + dz);
          prop.rotation.y = rng.float() * Math.PI * 2;
          this.group.add(prop);
        },
      };
      build(group);
      this.cellAt(spot.x, spot.z).walk = false;
      this.addGroundShadow(spot.x, spot.z, { radius: 0.42, opacity: 0.22 });
      return;
    }
  }

  // A few tiny uninhabited islets drifting past the board — they fill the open
  // water that portrait screens frame around the island, and give every
  // chamber a slightly different horizon. Pure backdrop: never walkable, never
  // pickable, skipped entirely at decorDensity 0 (low tier stays lean).
  _islets(rng) {
    if (!GFX.decorDensity) return;
    const { w, d } = this.size;
    const n = rng.int(2, 3 + Math.min(1, GFX.decorDensity));
    for (let i = 0; i < n; i++) {
      const a = rng.float() * Math.PI * 2;
      const dist = Math.max(w, d) * 0.5 + 2.5 + rng.float() * 3.5;
      const cx = Math.cos(a) * dist, cz = Math.sin(a) * dist;
      const size = 0.9 + rng.float() * 0.8;
      const geo = new THREE.BoxGeometry(size * 1.25, 0.6, size);
      const mat = new THREE.MeshLambertMaterial({ color: rng.chance(0.5) ? PALETTE.sand : PALETTE.sandDark });
      mat._owned = true;
      const base = new THREE.Mesh(geo, mat);
      base.rotation.y = rng.float() * Math.PI * 2;
      base.position.set(cx, -0.32, cz);
      this.group.add(base);
      const key = rng.pick(['palmSmall', 'palmSmall', 'palm', 'rockB', 'bush']);
      const prop = makeProp(PROPS[key], undefined, 'prop:' + key);
      prop.scale.setScalar(key === 'palm' ? 0.06 : 0.05 + rng.float() * 0.012);
      prop.position.set(cx, -0.02, cz);
      prop.rotation.y = rng.float() * Math.PI * 2;
      this.group.add(prop);
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

  // Cosmetic micro-prop carpet — see scatter.js. Skipped at low tier so the
  // floor is identical to before; never mutates cell.walk (pathing-safe).
  _scatter(opts = {}) { buildScatter(this, opts); }

  // Dress a build plot/spot into a small inhabited "place" (non-blocking).
  decorateSpot(spot, opts) { decorateSpot(this, spot, opts); }

  addEntity(e) { this.entities.push(e); return e; }

  // Perception-first tap targets. A child taps the THING they see — the altar,
  // a stone's floating number, a friend, a building — not the floor tile the
  // iso-projected ray would reach behind it. Registering an object here makes
  // its 3D body raycastable (nearest hit wins, so it beats the floor behind it)
  // and lets picking resolve the tap to the cell the object stands on.
  // `cell` is {x, z}, or a function returning it for wanderers (Mimi, NPCs).
  // opts.magnet: screen-px radius of the "they meant this" snap for taps that
  // land NEAR the object (0 opts out — e.g. secondary meshes of one target).
  // opts.anchorY: world-units lift for the magnet anchor (≈ the visual middle).
  registerPickable(obj, cell, opts = {}) {
    if (!obj) return obj;
    obj.userData.pickCell = typeof cell === 'function' ? cell : { x: cell.x, z: cell.z };
    obj.userData.pickMagnet = opts.magnet ?? 26;
    obj.userData.pickAnchorY = opts.anchorY ?? 0.35;
    this.world.pickables.push(obj);
    return obj;
  }

  unregisterPickable(obj) {
    if (!obj) return;
    const i = this.world.pickables.indexOf(obj);
    if (i >= 0) this.world.pickables.splice(i, 1);
  }

  // Move a registration from a swapped-out mesh to its replacement (label
  // sprites are rebuilt on language change and count updates).
  transferPickable(from, to) {
    if (!from?.userData?.pickCell || !to) return;
    to.userData.pickCell = from.userData.pickCell;
    to.userData.pickMagnet = from.userData.pickMagnet;
    to.userData.pickAnchorY = from.userData.pickAnchorY;
    this.unregisterPickable(from);
    this.world.pickables.push(to);
  }

  // Visual-event bus. Reactors opt in via react(type, payload); those that also
  // need per-frame work expose update() and get ticked in the entities loop. The bus
  // never touches game state, RNG, scoring, or pathing — purely cosmetic broadcast.
  addReactor(r) { this._reactors.push(r); if (r.update) this.addEntity(r); return r; }

  visualEvent(type, payload = {}) {
    this.water?.react?.(type, payload);
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
