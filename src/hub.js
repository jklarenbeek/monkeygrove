// HubController — owns the island hub: building the bloomed grove (and the
// title-screen attract diorama), the living-gate growth celebration, the
// Animal-Crossing-style NPC talk, hub taps (gates, nest, build plots), and the
// menus reached from it (gems, shop, pets, island worktable, build funding).
// The Game shell switches modes and wires this in; the controller reaches back
// through `this.game` for the shared scene (world/place/player/pet/particles/
// rng/profile), the avatar/HUD helpers, and the chamber/business entry points.
import * as THREE from 'three';
import { HubPlace } from './chamber.js';
import { Player, PetFollower } from './player.js';
import { Particles, makeCharacter, floatLabel } from './entities.js';
import { getCreature } from './models.js';
import { masteryReport } from './mathengine.js';
import {
  addBananas, addEggPoints, touchDailyStreak, persist, persistNow, todayString, activeProfile,
} from './state.js';
import {
  islandStatus, newBlueprints, markSeen, fund as fundIsland, buildById,
  grantDailyPerks, BUILDS, isBuilt,
} from './island.js';
import { mimiLines } from './mimi.js';
import { eligibleSkillIds } from './curriculum/placement.js';
import {
  ensureStory, drawNarrativeLine, islandBloom,
  refreshStoryLines, storyProgressReport, storyFinaleReady,
} from './story/engine.js';
import { AmbientLife } from './ambient.js';
import { t } from './i18n.js';
import * as hud from './hud.js';
import * as screens from './screens.js';
import { audio } from './audio.js';
import { delay } from './anim.js';
import { portalStage } from './config.js';

export class HubController {
  constructor(game) {
    this.game = game;
  }

  // The attract diorama: the grove at its dreamiest — every build standing,
  // festival lit, gates in full bloom — while a demo monkey (random outfit,
  // pet in tow) explores it and little equations pop like treasure. This is
  // the promise the title screen makes: "this place becomes yours."
  buildAttractIsland() {
    const g = this.game;
    const pct = { tide: 1, garden: 1, stump: 1, vines: 1 };
    g.place = new HubPlace(g.world, pct, {
      built: BUILDS.map((b) => b.id),
      unlocked: [],
      crabKing: true,
      festival: true,
    }, {});
    g.particles = new Particles(g.place.group);
    g.place.fx = g.particles;
    // the demo hero is exactly the monkey the player knows: the last-played
    // profile's outfit, or the classic starter monkey — never a random
    // costume that could read as a stranger (or as a second Mimi)
    const known = activeProfile();
    const mesh = g.avatar.makeAvatarMesh(known?.avatar);
    g.player = new Player(mesh);
    g.player.headH = 0.95;
    g.player.sfx = false;
    const spawn = (g.place.markers.P || [{ x: 11, z: 11 }])[0];
    g.player.setPlace(g.place, spawn.x, spawn.z);
    g.player.onArrive = (x, z) => g.pet?.notePlayerAt(x, z);
    g.place.playerAt = () => (g.player ? { x: g.player.x, z: g.player.z } : null);
    // returning kids see their own equipped pet (or none, like in their game);
    // first-time visitors get the bunny — the helper they'll soon meet
    const petId = known ? known.avatar.pet : 'bunny';
    const creature = petId ? getCreature(petId) : null;
    if (creature && creature.id === petId) {
      g.pet = new PetFollower(makeCharacter(creature.small, 0.45, null, 'creature:' + creature.id + ':s'));
      const petSpot = g.avatar.findFreeNear(spawn.x, spawn.z) || spawn;
      g.pet.setPlace(g.place, petSpot.x, petSpot.z);
    }
    g.world.defaultZoom = 1; // the title shows the whole island, full bloom
    g.world.follow(g.player.mesh, 10.5);
    // the island at full life: butterflies, birds dropping in, clouds
    // overhead — all the same AmbientLife the real hub runs
    g.place.addEntity(new AmbientLife(g.place, g.rng, {
      butterflies: 7,
      birds: 3,
      clouds: 4,
      pets: ['bunny', 'duckling', 'redpanda', 'kitten'],
      petCount: 3,
      playerPos: () => g.player?.mesh.position,
    }));
    // tour stops: the four gates (each pops its world's math as a sparkle
    // label — multiplication shown as something you FIND, not fill in),
    // plus the egg nest and the village builds
    const EQ = {
      tide: ['8 + 7 = 15', '#3f8fb0'],
      garden: ['3 × 4 = 12', '#58b368'],
      stump: ['12 ÷ 3 = 4', '#b46a3c'],
      vines: ['¾', '#9b6bd6'],
    };
    const pois = [];
    for (const [wid, spot] of Object.entries(g.place.portals)) {
      pois.push({ x: spot.x, z: spot.z, label: EQ[wid] });
    }
    const nest = (g.place.markers.N || [])[0];
    if (nest) pois.push({ x: nest.x, z: nest.z });
    for (const spot of Object.values(g.place.buildSpots || {})) {
      const near = g.avatar.findFreeNear(spot.x, spot.z);
      if (near) pois.push({ x: near.x, z: near.z });
    }
    const demo = { wait: 1400, target: null, last: null };
    g.place.addEntity({
      update: (dt) => {
        if (g.mode !== 'title' || !g.player) return;
        if (g.player.hopping || g.player.queue.length) return;
        demo.wait -= dt;
        if (demo.wait > 0) return;
        if (demo.target) {
          // arrived: a quiet burst of confetti, sometimes a math sparkle
          const at = g.player.mesh.position.clone().add(new THREE.Vector3(0, 0.9, 0));
          g.particles?.emit(at, 14, { speed: 1.4, up: 2.2, life: 750, spread: 0.3 });
          if (demo.target.label) floatLabel(g.world, at, demo.target.label[0], demo.target.label[1]);
          g.pet?.celebrate();
          demo.target = null;
          demo.wait = 1600 + g.rng.float() * 2400;
          return;
        }
        const next = g.rng.pick(pois.filter((p) => p !== demo.last)) || pois[0];
        if (next && g.player.pathTo(next.x, next.z)) {
          demo.target = next;
          demo.last = next;
          demo.wait = 350; // settles right after the last hop
        } else {
          demo.wait = 900;
        }
      },
    });
  }

  startHub() {
    const g = this.game;
    g.mode = 'hub';
    g.flowToken++;
    g.isEcho = false;
    g.duel = null;
    screens.closeScreen();
    this.buildHub();
    hud.showHud(true);
    hud.hideBanner();
    hud.setAction(null);
    g.talkBtn = null;
    hud.setVerbPanel(null);
    hud.showHintButton(false);
    g.refreshHudCounts();
    audio.music('island');
    g.input.maybeGestureHint();
    // daily streak
    const res = touchDailyStreak(g.profile);
    if (res.kind === 'extended') {
      hud.toast(t('hub.streak_extended', { n: g.profile.streak.count }));
      audio.sfx('streak');
    } else if (res.kind === 'frozen') {
      hud.toast(t('hub.streak_frozen', { n: g.profile.streak.count }));
      audio.sfx('streak', { pitch: 0.86 }); // gentler, lower chime — the streak was rescued, not grown
    }
    if (res.gift) {
      delay(800, () => {
        const gift = 6 + Math.min(14, g.profile.streak.count * 2);
        hud.toast(`🎁 ${t('hub.daily_gift')} +${gift} 🍌`);
        addBananas(g.profile, gift);
        addEggPoints(g.profile, 2);
        g.refreshHudCounts();
        audio.sfx('chest');
      });
    }
    // greeting pages, one confirm each: streak news (if any), a once-per-visit
    // welcome, then Mimi's most useful advice — read at the child's own pace
    const pages = [];
    if (res.kind === 'reset' && g.profile.stats.days > 1) pages.push(t('hub.streak_reset'));
    if (!g.hubWelcomed) {
      g.hubWelcomed = true;
      pages.push(t('hub.welcome', { name: screens.esc(g.profile.name) }));
    }
    pages.push(this.mimiLine());
    hud.say(pages);
    // island: daily perks from finished builds (granted now, toasted shortly)
    const perks = grantDailyPerks(g.profile, todayString());
    if (perks.length) {
      for (const perk of perks) {
        if (perk.kind === 'bananas') addBananas(g.profile, perk.n);
        else if (perk.kind === 'egg') addEggPoints(g.profile, perk.n);
      }
      persist();
      g.refreshHudCounts();
      perks.forEach((perk, i) => delay(1700 + i * 1100, () => {
        hud.toast(perk.kind === 'bananas'
          ? t('island.daily_fruit', { n: perk.n })
          : t('island.daily_bread'));
        audio.sfx('coin');
      }));
    }
    // island: announce blueprints Mimi just dreamed up (once each)
    const { buildReport, finaleReady } = this.islandGatingInputs();
    const fresh = newBlueprints(g.profile, buildReport, { finaleReady });
    if (fresh.length) {
      markSeen(g.profile, fresh.map((b) => b.id));
      persist();
      const tok = g.flowToken;
      delay(2600, () => {
        if (tok !== g.flowToken) return;
        audio.sfx('sparkle');
        for (const b of fresh) hud.toast(t('island.new_blueprint', { name: t('build.' + b.id) }), 'gem');
        hud.say(`<b>Mimi:</b> ${t('island.mimi_worktable')}`);
      });
    }
  }

  // Build-gating inputs that make the island restoration loop age-aware. The
  // `buildReport` credits an older child's "remembered" (below-band) worlds as
  // restored so the festival/finale is actually reachable without grinding baby
  // math; `finaleReady` keeps the finale locked until the prior lines are home.
  // Bloom and living gates still read the RAW report (visual mastery), so this
  // only moves which blueprints unlock — never how the island looks.
  islandGatingInputs() {
    const g = this.game;
    const report = masteryReport(g.profile.math);
    const eligible = eligibleSkillIds(g.profile.curriculum);
    const story = ensureStory(g.profile);
    return {
      report,
      buildReport: storyProgressReport(report, eligible),
      finaleReady: storyFinaleReady(story),
      story,
    };
  }

  buildHub() {
    const g = this.game;
    g.clearPlace();
    const { report, buildReport, finaleReady, story } = this.islandGatingInputs();
    const pct = {};
    for (const [w, info] of Object.entries(report.worlds)) pct[w] = info.pct; // raw -> bloom + gates
    const status = islandStatus(g.profile, buildReport, { finaleReady });
    // living gates are built at their last celebrated stage, so growth since
    // the previous visit can pop in before the player's eyes (never shrinks)
    const gateStages = g.profile.flags.portalStages || (g.profile.flags.portalStages = {});
    const storyBloom = islandBloom(story).wholeness;
    g.place = new HubPlace(g.world, pct, {
      built: status.filter((b) => b.state === 'built').map((b) => b.id),
      unlocked: status.filter((b) => b.state === 'unlocked').map((b) => b.id),
      crabKing: !!g.profile.flags.festivalDone,
      festival: !!g.profile.flags.festivalDone,
    }, gateStages, storyBloom);
    g.particles = new Particles(g.place.group);
    g.place.fx = g.particles;
    this.celebrateGateGrowth(pct, gateStages);
    g.avatar.spawnAvatar();
    const spawn = (g.place.markers.P || [{ x: 11, z: 11 }])[0];
    if (!this.placePlayerAtHubReturn()) {
      g.player.setPlace(g.place, spawn.x, spawn.z);
      g.avatar.spawnPet(spawn);
    }
    g.world.defaultZoom = g.input.sceneZoom('hub');
    g.world.follow(g.player.mesh, 13, { x: g.place.size.w * 0.5, z: g.place.size.d * 0.5 });
    g.player.onArrive = (x, z) => this.hubArrive(x, z);
    g.player.onBump = (x, z) => this.hubBump(x, z);
    g.place.playerAt = () => (g.player ? { x: g.player.x, z: g.player.z } : null);
    // the island literally comes alive as it blooms: more butterflies and
    // birds with mastery, the flower garden build invites extra butterflies
    const builtIds = status.filter((b) => b.state === 'built').map((b) => b.id);
    const avgPct = (pct.tide + pct.garden + pct.stump + pct.vines) / 4 || 0;
    // A few full-size pets amble around as the grove wakes — never the creature
    // you ARE, nor the pet already following you (no walking copies of yourself).
    const avatar = g.profile.avatar || {};
    const wanderRoster = ['bunny', 'duckling', 'kitten', 'redpanda', 'turtle', 'owl']
      .filter((id) => id !== avatar.creature && id !== avatar.pet);
    g.place.addEntity(new AmbientLife(g.place, g.rng, {
      butterflies: 2 + Math.round(avgPct * 4) + (builtIds.includes('garden') ? 2 : 0),
      birds: 1 + (builtIds.length >= 3 ? 1 : 0) + (g.profile.flags.festivalDone ? 1 : 0),
      clouds: 2, // same sky the title screen promises
      pets: wanderRoster,
      petCount: 1 + Math.round(avgPct * 2) + (builtIds.length >= 3 ? 1 : 0),
      playerPos: () => g.player?.mesh.position,
    }));
  }

  // Gates that crossed a mastery threshold since the last hub visit bloom one
  // by one: vines pop in, sparkles fall, a toast names the gate. The saved
  // stage only ever rises — a rating dip can never wilt a gate.
  celebrateGateGrowth(pct, gateStages) {
    const g = this.game;
    const tok = g.flowToken;
    let i = 0;
    for (const [worldId, gate] of Object.entries(g.place.gates || {})) {
      const target = portalStage(pct[worldId] ?? 0);
      if (target <= (gateStages[worldId] ?? 0)) continue;
      gateStages[worldId] = target;
      delay(1500 + i++ * 1100, () => {
        if (tok !== g.flowToken) return;
        gate.celebrate(target);
        hud.toast(t('portal.stage' + target, { name: t('world.' + worldId) }), 'gem');
      });
    }
    if (i) persist();
  }

  findHubReturnSpot(anchor) {
    const place = this.game.place;
    if (!place || !anchor) return null;
    let target = null;
    if (anchor.type === 'portal') target = place.portals?.[anchor.worldId] ?? null;
    else if (anchor.type === 'build') target = place.buildSpots?.[anchor.id] ?? null;
    if (!target) return null;

    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];
    for (const [dx, dz] of dirs) {
      const x = target.x + dx, z = target.z + dz;
      const c = place.cellAt(x, z);
      if (!c || !c.walk) continue;
      return { x, z, face: { dx: target.x - x, dz: target.z - z } };
    }
    return null;
  }

  placePlayerAtHubReturn() {
    const g = this.game;
    const spot = this.findHubReturnSpot(g.lastHubEntry);
    if (!spot) return false;
    g.player.setPlace(g.place, spot.x, spot.z);
    g.player.face(spot.face.dx, spot.face.dz);
    g.avatar.spawnPet({ x: spot.x, z: spot.z });
    g.lastHubEntry = null;
    return true;
  }

  hubArrive(x, z) {
    const g = this.game;
    if (g.mode !== 'hub' || !g.place?.portals) return; // stray hop after we left the hub
    g.pet?.notePlayerAt(x, z);
    for (const [worldId, spot] of Object.entries(g.place.portals)) {
      if (spot.x === x && spot.z === z) {
        g.place.gates?.[worldId]?.enter?.();
        g.enterWorldFromPortal(worldId);
        return;
      }
    }
    const n = (g.place.markers.N || [])[0];
    if (n && n.x === x && n.z === z) this.openPets();
  }

  buildAt(x, z) {
    for (const [id, spot] of Object.entries(this.game.place?.buildSpots || {})) {
      if (spot.x === x && spot.z === z) return { id, ...spot };
    }
    return null;
  }

  hubTap(x, z) {
    const g = this.game;
    const m = g.place.markers;
    const at = (list) => (list || []).some((s) => s.x === x && s.z === z);
    if (at(m.T)) { this.openGems(); return true; }
    if (at(m.O)) { this.openShop(); return true; }
    if (at(m.N)) { this.openPets(); return true; }
    // friends talk — Mimi's advice ladder (which walks you to the worktable
    // when a build is funded up), the moved-in friends' banter
    const who = this.hubNpcAt(x, z, true);
    if (who) {
      this.hubTalk(who);
      return true;
    }
    // build plots: unlocked opens the worktable, finished ones react playfully
    const build = this.buildAt(x, z);
    if (build) {
      if (build.id === 'bakery' && isBuilt(g.profile, 'bakery')) {
        hud.toast(t('business.open'));
        g.startBusinessFromHub('bakery');
        return true;
      }
      if (build.state === 'unlocked') { this.openIsland(); return true; }
      if (build.state === 'built') {
        audio.sfx(build.id === 'stage' ? 'gong' : 'sparkle');
        g.particles?.confetti(g.place.worldPos(x, z, 0.8), 18);
        return true;
      }
      return false; // locked plot is just floor
    }
    return false;
  }

  // ---------- hub talk (Animal-Crossing-style) ----------

  // The NPC standing on cell (x,z): Mimi or a friend who moved in with a
  // build. includePrev also matches Mimi's previous cell (taps mid-hop).
  hubNpcAt(x, z, includePrev = false) {
    const place = this.game.place;
    const mp = place.mimiPos;
    if (mp && ((mp.x === x && mp.z === z)
      || (includePrev && place.mimiPrev?.x === x && place.mimiPrev?.z === z))) {
      return { kind: 'mimi', x: mp.x, z: mp.z };
    }
    const npc = (place.npcs || []).find((n) => n.x === x && n.z === z);
    return npc ? { kind: 'npc', npc, x: npc.x, z: npc.z } : null;
  }

  // An NPC on a neighboring cell — powers the 💬 button and Space/Enter.
  hubNpcNear() {
    const g = this.game;
    if (!g.player || !g.place?.mimiPos) return null;
    for (const [dx, dz] of [[0, 1], [1, 0], [-1, 0], [0, -1]]) {
      const found = this.hubNpcAt(g.player.x + dx, g.player.z + dz);
      if (found) return found;
    }
    return null;
  }

  // Talk: turn toward each other, then the line — Mimi's advice ladder, or a
  // friend's chatter. When Mimi says "enough bananas for X!", her worktable
  // opens right after the line, like a villager walking you to the counter.
  hubTalk(target) {
    const g = this.game;
    audio.sfx('click');
    const dx = target.x - g.player.x, dz = target.z - g.player.z;
    g.player.face(dx, dz);
    if (target.kind === 'mimi') {
      if (g.place.mimi && (dx || dz)) g.place.mimi.rotation.y = Math.atan2(-dx, -dz);
      const line = this.mimiNext();
      const tok = g.flowToken;
      // "enough bananas for X!" walks you to the worktable the moment you
      // confirm her line — like a villager leading you to the counter
      hud.say(line.html, {
        onDone: line.key === 'mimi.build_ready'
          ? () => { if (tok === g.flowToken && g.mode === 'hub') this.openIsland(); }
          : null,
      });
    } else {
      const npc = target.npc;
      if (dx || dz) npc.mesh.rotation.y = Math.atan2(-dx, -dz);
      const line = t(`npc.${npc.id}.${1 + Math.floor(Math.random() * 2)}`);
      hud.say(`<b>${t('npc.' + npc.id)}:</b> ${line}`, { face: npc.face });
    }
  }

  // Space/Enter (or the 💬 button) next to a friend starts the chat.
  hubAction() {
    const near = this.hubNpcNear();
    if (near) this.hubTalk(near);
  }

  // Walking straight into a friend also talks — the zero-tutorial way in.
  hubBump(x, z) {
    const g = this.game;
    if (g.mode !== 'hub' || !g.place?.mimiPos) return; // stray hop after we left the hub
    const found = this.hubNpcAt(x, z);
    if (!found) return;
    if (performance.now() < g.talkCooldown) return; // held arrow keys re-bump
    g.talkCooldown = performance.now() + 900;
    this.hubTalk(found);
  }

  // Mimi's next line: the advice ladder (mimi.js), cycled across talks so the
  // first one carries what matters and repeat talks keep the chat going. The
  // hub greeting peeks without consuming, so talking to her in person still
  // opens with the line that matters.
  _mimiPick(consume) {
    const g = this.game;
    // Use the age-aware build report so Mimi's advice (next build, banana gap,
    // weakest world) matches what the worktable actually offers an older child.
    const { buildReport, finaleReady } = this.islandGatingInputs();
    const lines = mimiLines(g.profile, buildReport, islandStatus(g.profile, buildReport, { finaleReady }));
    const line = lines[g.mimiChat % lines.length];
    if (consume) g.mimiChat++;
    if (!g.profile.flags.mimiMet) { g.profile.flags.mimiMet = true; persist(); }
    const vars = { ...(line.vars || {}) };
    if (line.buildId) vars.name = t('build.' + line.buildId);
    if (line.worldId) vars.world = t('world.' + line.worldId);
    return { key: line.key, html: `<b>Mimi:</b> ${t(line.key, vars)}` };
  }

  mimiNext() { return this._mimiPick(true); }

  mimiLine() { return this._mimiPick(false).html; }

  // ---------- menus from the hub ----------

  openGems() {
    audio.sfx('click');
    screens.showGems({
      // the child's Gem Tree only ever rises (anti-anxiety, same contract as the
      // gate bloom): pass NO clock so a faded skill's 🌟 never reverts to 🌱.
      // Decay stays honest where decisions are made — the parent dashboard and
      // the engine's selection/scoring. The faded skill is still quietly reviewed
      // by Echo Doors and re-lights on its own.
      report: masteryReport(this.game.profile.math),
      onClose: () => screens.closeScreen(),
    });
  }

  openShop() {
    const g = this.game;
    audio.sfx('click');
    screens.showShop({
      onClose: () => { screens.closeScreen(); g.avatar.refreshAvatar(); g.refreshHudCounts(); },
      onChanged: () => g.refreshHudCounts(),
    });
  }

  openPets() {
    const g = this.game;
    audio.sfx('click');
    screens.showPets({
      onClose: () => { screens.closeScreen(); g.avatar.respawnPet(); },
      onChanged: () => {},
      onHatch: () => g.afterResult(() => {
        screens.showPets({
          onClose: () => { screens.closeScreen(); g.avatar.respawnPet(); },
          onChanged: () => {},
          onHatch: () => {},
        });
      }),
    });
  }

  openIsland() {
    const g = this.game;
    audio.sfx('click');
    const { buildReport, finaleReady, story } = this.islandGatingInputs();
    screens.showIsland({
      profile: g.profile,
      status: islandStatus(g.profile, buildReport, { finaleReady }),
      bloom: islandBloom(story),
      onClose: () => screens.closeScreen(),
      onFund: (id) => this.fundBuild(id),
      onAltar: () => screens.showAltar({
        story,
        onClose: () => this.openIsland(),
      }),
    });
  }

  fundBuild(id) {
    const g = this.game;
    const def = buildById(id);
    if (!def) return;
    const doFund = () => {
      const { buildReport, finaleReady } = this.islandGatingInputs();
      if (!fundIsland(g.profile, def, buildReport, { finaleReady })) {
        audio.sfx('boop');
        return;
      }
      persistNow();
      screens.closeScreen();
      this.celebrateBuild(def);
    };
    if (def.finale && !g.profile.flags.festivalDone) {
      // the Crab King interrupts: apology, and he pays half from his hoard
      screens.showFinale(() => {
        hud.toast(t('island.crab_pays', { n: def.contribution }));
        doFund();
      });
    } else {
      doFund();
    }
  }

  celebrateBuild(def) {
    const g = this.game;
    if (def.finale) {
      g.profile.flags.festivalDone = true;
      // The festival draws the founding hexagram's top line — the yielding sixth
      // line: the island is made whole by sharing it (letting the Crab King in),
      // not by hoarding. Normal play already gates the plaza on storyFinaleReady,
      // but backfill defensively so the capstone always lands on a WHOLE hexagram
      // even on a dev-seeded / migrated / interrupted path: latch every earned or
      // remembered world line, then the Four-Directions reveal, then the finale.
      const story = ensureStory(g.profile);
      const report = masteryReport(g.profile.math);
      refreshStoryLines(story, report, eligibleSkillIds(g.profile.curriculum));
      drawNarrativeLine(story, 1); // the Four-Directions reveal (line 2)
      drawNarrativeLine(story, 5); // the yielding top line (line 6)
      story.crabKingReconciled = true;
      persist();
    }
    // Drop just the new build onto its plot — no teardown/rebuild of the whole
    // hub, so the single most celebratory moment never hitches on a cheap
    // phone. Two builds reshape the entire island (the bridge re-floors the
    // gap, the finale reblooms it all and moves the Crab King in); addBuild
    // declines those and we fall back to the full rebuild for them.
    if (!g.place.addBuild(def.id)) this.buildHub();
    hud.showHud(true);
    g.refreshHudCounts();
    const spot = g.place.buildSpots[def.id];
    const tok = g.flowToken;
    if (spot) {
      // stand the player by the fresh build so the camera frames the moment
      const near = g.avatar.findFreeNear(spot.x, spot.z);
      if (near) { g.player.setPlace(g.place, near.x, near.z); g.avatar.respawnPet(); }
      const pos = g.place.worldPos(spot.x, spot.z, 0.9);
      audio.sfx('bloom');
      delay(250, () => g.particles?.confetti(pos, 44));
      delay(850, () => g.particles?.confetti(pos.clone().add(new THREE.Vector3(0.4, 0.3, -0.3)), 28));
    }
    if (def.finale) {
      audio.music('celebrate');
      delay(1200, () => {
        if (tok !== g.flowToken) return;
        hud.say(t('finale.festival', { name: screens.esc(g.profile.name) }), { face: '🦀' });
      });
      delay(1700, () => {
        if (tok !== g.flowToken || !spot) return;
        g.particles?.confetti(g.place.worldPos(spot.x, spot.z, 1.5), 60);
      });
      delay(4200, () => { if (tok === g.flowToken) audio.music('island'); });
    } else {
      delay(1300, () => {
        if (tok !== g.flowToken) return;
        // one celebration talk: Mimi's pride, then the new friend introduces
        // themselves on the next page (their own face on the bubble)
        const pages = [`<b>Mimi:</b> ${t('island.built_say')}`];
        if (def.npc) {
          pages.push({
            html: `<b>${t('npc.' + def.id)}:</b> ${t(`npc.${def.id}.hello`)}`,
            face: def.npc.face,
          });
        }
        hud.say(pages);
      });
    }
  }
}
