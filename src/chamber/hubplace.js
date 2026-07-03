// HubPlace: the island hub as a Place — world portals with living gates, the gem
// tree, shop stand, egg nest, wandering Mimi, region bloom by mastery, and the
// island-restoration builds (plots, finished builds, move-in NPCs, Crab King).
import * as THREE from 'three';
import { TILE, PALETTE, WORLD_THEME, MARKERS, FLOOR_CHARS } from '../config.js';
import { makeProp, makeCharacter, makeTextSprite, LivingPortal } from '../entities.js';
import { PROPS, CHARS, getCreature } from '../models.js';
import { BUILDS, applyIslandRows } from '../island.js';
import { GFX } from '../gfx.js';
import { t } from '../i18n.js';
import { makeGlowSprite } from '../glow.js';
import { attachBuildIdle, attachNestGlow } from '../reactive.js';
import { attachNpcRoutine } from '../npc.js';
import { Place } from './place.js';
import { TEMPLATES, HUB_PORTALS } from './templates.js';

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
      this.registerPickable(this.tree, tree, { anchorY: 1.2, magnet: 30 });
      this.addGroundShadow(tree.x, tree.z, { radius: 0.7, opacity: 0.22 });
      // a soft magic glow crowns the gem tree on high tier (additive glow sprite);
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
      this.registerPickable(stand, shop, { anchorY: 0.45 });
      this.addGroundShadow(shop.x, shop.z, { radius: 0.4 });
    }
    const nest = (this.markers.N || [])[0];
    if (nest) {
      const egg = makeProp(PROPS.egg, 0.6, 'prop:egg');
      egg.position.copy(this.worldPos(nest.x, nest.z));
      this.group.add(egg);
      this.registerPickable(egg, nest, { anchorY: 0.3 });
      this.addGroundShadow(nest.x, nest.z, { radius: 0.34 });
      attachNestGlow(this, nest.x, nest.z); // warm breathing nest glow (med/high)
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
    // not fall through to the floor tile behind them (iso projection!). Mimi
    // and the NPCs wander, so their registrations read the LIVE cell.
    const mimiCell = () => this.mimiPos;
    if (this.mimi) this.registerPickable(this.mimi, mimiCell, { anchorY: 0.4, magnet: 30 });
    if (this.mimiTag) this.registerPickable(this.mimiTag, mimiCell, { magnet: 0 });
    for (const n of this.npcs) {
      this.registerPickable(n.mesh, () => ({ x: n.x, z: n.z }), { anchorY: 0.35, magnet: 30 });
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
    this.registerPickable(sign, spot, { anchorY: 0.4 });
    this.registerPickable(tag, spot, { magnet: 0 });
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
    for (const n of this.npcs.slice(npcBefore)) {
      this.registerPickable(n.mesh, () => ({ x: n.x, z: n.z }), { anchorY: 0.35, magnet: 30 });
    }
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
      this.unregisterPickable(o);
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
      // Non-blocking dressing turns the plot into a small inhabited place;
      // the plaza is the festival centerpiece → richest density.
      this.decorateSpot(spot, { role: def.id === 'plaza' ? 'festival' : 'near-build', bloom: this.storyBloom || 0.75 });
      attachBuildIdle(this, def, spot); // a lived-in idle effect per build
    }
    // a tap anywhere on a build's 3D silhouette (the bakery's roof, the
    // stall's awning) must read as "this build", never the tile behind it —
    // register every prop standing on the plot with the plot's cell
    const reg = (prop, anchorY = 0.4) => this.registerPickable(prop, spot, { anchorY });
    if (def.id === 'lanterns') {
      for (const dx of [-1, 0, 1]) {
        if (this.cellAt(x + dx, z)) { reg(this._prop('lantern', 0.55, x + dx, z), 0.3); block(x + dx, z); }
      }
    } else if (def.id === 'fruitstand') {
      reg(this._prop('stall', 1.15, x, z), 0.6);
      reg(this._prop('basket', 0.3, x, z, 0.62, 0.45), 0.2);
      block(x, z);
    } else if (def.id === 'garden') {
      reg(this._prop('flowerPink', 0.34, x, z), 0.2);
      reg(this._prop('flowerYellow', 0.32, x, z, 0.55, 0.3), 0.2);
      reg(this._prop('flowerBlue', 0.32, x, z, -0.5, 0.32), 0.2);
      reg(this._prop('bush', 0.42, x, z, 0.12, -0.5), 0.2);
      reg(this._prop('sprout', 0.3, x, z, -0.45, -0.35), 0.2);
      reg(this._prop('flowerPink', 0.3, x, z, 0.5, -0.28), 0.2);
      block(x, z);
    } else if (def.id === 'stage') {
      reg(this._prop('gong', 1.0, x, z), 0.55);
      reg(this._prop('lantern', 0.5, x, z, 0.85, 0.2), 0.3);
      reg(this._prop('lantern', 0.5, x, z, -0.85, 0.2), 0.3);
      block(x, z);
    } else if (def.id === 'bakery') {
      // a cozy Dutch/German stepped-gable bakery townhouse (not a bare oven)
      reg(this._prop('bakeryBuilding', 2.2, x, z), 1.0);
      reg(this._prop('basket', 0.3, x, z, 0.78, 0.5), 0.2);
      block(x, z);
    } else if (def.id === 'pizzeria') {
      // a typical Italian trattoria: ochre walls, tricolore awning, tiled roof + chimney
      reg(this._prop('pizzeriaBuilding', 2.2, x, z), 1.0);
      reg(this._prop('pizzaPan', 0.3, x, z, 0.82, 0.5), 0.2);
      reg(this._prop('toppingCrate', 0.3, x, z, -0.72, 0.42), 0.2);
      block(x, z);
    } else if (def.id === 'plaza') {
      reg(this._prop('portal', 1.7, x, z), 0.9);
      reg(this._prop('lantern', 0.5, x, z, 1.0, 0.4), 0.3);
      reg(this._prop('lantern', 0.5, x, z, -1.0, 0.4), 0.3);
      reg(this._prop('flowerYellow', 0.3, x, z, 0.9, -0.5), 0.2);
      reg(this._prop('flowerPink', 0.3, x, z, -0.9, -0.5), 0.2);
      const tag = makeTextSprite('🎪', { scale: 0.8 });
      tag.position.copy(this.worldPos(x, z, 2.3));
      this.group.add(tag);
      this.registerPickable(tag, spot, { magnet: 0 });
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
    // a small loop of life around the build (NPC routine). 'limited' (low) = today's bob.
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
    // (the constructor's npc registration sweep runs after this and picks him up)
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
