// Monkey Grove — game controller: boot, loop, flow, input, juice.
import * as THREE from 'three';
import { World } from './world.js';
import {
  Place, HubPlace, TEMPLATES, ensureHostable, varyLayout, scatterFetchSpots,
} from './chamber.js';
import { Player, PetFollower } from './player.js';
import {
  Particles, Crab, Altar, makeCharacter, makeProp, flyEmojiToHud, floatLabel,
} from './entities.js';
import { VERBS } from './verbs.js';
import { CHARS, PETS, HATS, FURS, PROPS, MONKEY_HAT_Y } from './models.js';
import { buildVoxelMesh } from './voxel.js';
import { nextProblem, recordResult, masteryReport } from './mathengine.js';
import {
  loadSave, settings, activeProfile, selectProfile, touchDailyStreak,
  addBananas, addEggPoints, hatchEgg, persist, persistNow, todayString,
} from './state.js';
import {
  islandStatus, newBlueprints, markSeen, fund as fundIsland, buildById,
  grantDailyPerks, BUILDS,
} from './island.js';
import { mimiLines } from './mimi.js';
import { AmbientLife } from './ambient.js';
import { t, pickCorrectLine } from './i18n.js';
import * as hud from './hud.js';
import * as screens from './screens.js';
import { audio } from './audio.js';
import { updateTweens, delay, tween, ease } from './anim.js';
import { Rng } from './rng.js';
import { BALANCE, WORLD_THEME, TILE, portalStage } from './config.js';

const TRAIL_COLORS = { sparkle: 0xffd966, petal: 0xffb3c6, bubble: 0x9bd6ff, star: 0xc9a6ff };

// Friendly chamber guides: one pet local per world who explains the task,
// cheers, and delivers the "why" after a miss — kids always have a buddy.
const HELPERS = {
  tide: { pet: 'turtle', face: '🐢', nameKey: 'helper.turtle' },
  garden: { pet: 'bunny', face: '🐰', nameKey: 'helper.bunny' },
  stump: { pet: 'duckling', face: '🐥', nameKey: 'helper.duckling' },
  vines: { pet: 'owl', face: '🦉', nameKey: 'helper.owl' },
};

class Game {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.world = new World(this.canvas);
    this.profile = null;
    this.mode = 'title';
    this.place = null;
    this.player = null;
    this.pet = null;
    this.particles = null;
    this.verb = null;
    this.problem = null;
    this.crabs = [];
    this.combo = 0;
    this.solvedInChamber = 0;
    this.chamberIndex = 0;
    this.pendingEcho = false;
    this.isEcho = false;
    this.currentWorld = null;
    this.pauseUntil = 0;
    this.problemStart = 0;
    this.usedHint = false;
    this.rewards = [];
    this.rng = new Rng((Math.random() * 2 ** 31) >>> 0);
    this.chamberRng = this.rng;   // seeded per-chamber in duels for fairness
    this.trailT = 0;
    this.sessionStart = performance.now();
    this.duel = null;   // set by duel mode
    this.pickups = [];  // scattered banana pickups (crab yoinks are recoverable)
    this.flowToken = 0; // invalidates delayed flow transitions across mode switches
    this.mimiChat = 0;  // cycles Mimi's advice lines across taps this session
    this.talkCooldown = 0; // debounces bump-to-talk while keys are held
    this.hubWelcomed = false; // the hub greeting page shows once per session
    this.talkBtn = null;   // current hub action-button icon ('💬' | null)
  }

  // ---------- boot ----------

  boot() {
    loadSave();
    hud.initHud({
      onHint: () => this.useHint(),
      onAction: () => (this.mode === 'hub' ? this.hubAction() : this.verb?.onAction()),
      onHome: () => this.confirmHome(),
      onSettings: () => this.openSettings(),
    });
    this.bindInput();
    this.showTitle();
    // audio unlock on first gesture
    const unlock = () => {
      audio.init();
      audio.setSfx(settings().sfx);
      audio.setMusic(settings().music);
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
    window.addEventListener('pointerdown', unlock);
    window.addEventListener('keydown', unlock);
    // main loop
    let last = performance.now();
    const loop = (now) => {
      requestAnimationFrame(loop);
      let dt = Math.min(50, now - last);
      last = now;
      if (now < this.pauseUntil) { this.world.update(0); return; }
      updateTweens(dt);
      this.update(dt);
      this.world.update(dt);
    };
    requestAnimationFrame(loop);
    // track time played (only while actually visible)
    setInterval(() => {
      if (this.profile && this.mode !== 'title' && document.visibilityState === 'visible') {
        this.profile.stats.msPlayed += 10000;
        persist();
      }
    }, 10000);
    window.addEventListener('beforeunload', () => persistNow());
  }

  // ---------- screens & flow ----------

  showTitle() {
    this.mode = 'title';
    this.flowToken++;
    this.hubWelcomed = false;
    hud.showHud(false);
    this.clearPlace();
    this.player = null;
    this.pet = null;
    audio.music(null);
    // the island itself is the title screen: a fully bloomed grove, alive
    // behind the logo — the game advertising the game
    this.buildAttractIsland();

    const showParents = () => {
      const p = activeProfile();
      screens.showParents({
        report: p ? masteryReport(p.math) : null,
        profile: p,
        onClose: () => this.showTitle(),
      });
    };
    const showPlayerSelect = () => screens.showTitle({
      onPlay: (pid, isNew) => {
        this.profile = selectProfile(pid);
        if (!this.profile) return;
        if (isNew || !this.profile.flags.introSeen) {
          screens.showStory(() => {
            this.profile.flags.introSeen = true;
            persist();
            this.startHub();
          });
        } else {
          this.startHub();
        }
      },
      onParents: showParents,
      onDuel: () => this.startDuelSetup(),
    });

    screens.showAttract({
      onStart: showPlayerSelect,
      onParents: showParents,
      onDuel: () => this.startDuelSetup(),
    });
  }

  // The attract diorama: the grove at its dreamiest — every build standing,
  // festival lit, gates in full bloom — while a demo monkey (random outfit,
  // pet in tow) explores it and little equations pop like treasure. This is
  // the promise the title screen makes: "this place becomes yours."
  buildAttractIsland() {
    const pct = { tide: 1, garden: 1, stump: 1, vines: 1 };
    this.place = new HubPlace(this.world, pct, {
      built: BUILDS.map((b) => b.id),
      unlocked: [],
      crabKing: true,
      festival: true,
    }, {});
    this.particles = new Particles(this.place.group);
    this.place.fx = this.particles;
    // the demo hero is exactly the monkey the player knows: the last-played
    // profile's outfit, or the classic starter monkey — never a random
    // costume that could read as a stranger (or as a second Mimi)
    const known = activeProfile();
    const mesh = this.makeMonkeyMesh(known?.avatar);
    this.player = new Player(mesh);
    this.player.headH = 0.95;
    this.player.sfx = false;
    const spawn = (this.place.markers.P || [{ x: 11, z: 11 }])[0];
    this.player.setPlace(this.place, spawn.x, spawn.z);
    this.player.onArrive = (x, z) => this.pet?.notePlayerAt(x, z);
    this.place.playerAt = () => (this.player ? { x: this.player.x, z: this.player.z } : null);
    // returning kids see their own equipped pet (or none, like in their game);
    // first-time visitors get the bunny — the helper they'll soon meet
    const petId = known ? known.avatar.pet : 'bunny';
    const petDef = petId ? PETS.find((p) => p.id === petId) : null;
    if (petDef) {
      this.pet = new PetFollower(makeCharacter(petDef.model, 0.45, null, 'pet:' + petDef.id));
      const petSpot = this.findFreeNear(spawn.x, spawn.z) || spawn;
      this.pet.setPlace(this.place, petSpot.x, petSpot.z);
    }
    this.world.follow(this.player.mesh, 10.5);
    // the island at full life: butterflies, birds dropping in, clouds
    // overhead — all the same AmbientLife the real hub runs
    this.place.addEntity(new AmbientLife(this.place, this.rng, {
      butterflies: 7,
      birds: 3,
      clouds: 4,
      playerPos: () => this.player?.mesh.position,
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
    for (const [wid, spot] of Object.entries(this.place.portals)) {
      pois.push({ x: spot.x, z: spot.z, label: EQ[wid] });
    }
    const nest = (this.place.markers.N || [])[0];
    if (nest) pois.push({ x: nest.x, z: nest.z });
    for (const spot of Object.values(this.place.buildSpots || {})) {
      const near = this.findFreeNear(spot.x, spot.z);
      if (near) pois.push({ x: near.x, z: near.z });
    }
    const demo = { wait: 1400, target: null, last: null };
    this.place.addEntity({
      update: (dt) => {
        if (this.mode !== 'title' || !this.player) return;
        if (this.player.hopping || this.player.queue.length) return;
        demo.wait -= dt;
        if (demo.wait > 0) return;
        if (demo.target) {
          // arrived: a quiet burst of confetti, sometimes a math sparkle
          const at = this.player.mesh.position.clone().add(new THREE.Vector3(0, 0.9, 0));
          this.particles?.emit(at, 14, { speed: 1.4, up: 2.2, life: 750, spread: 0.3 });
          if (demo.target.label) floatLabel(this.world, at, demo.target.label[0], demo.target.label[1]);
          this.pet?.celebrate();
          demo.target = null;
          demo.wait = 1600 + this.rng.float() * 2400;
          return;
        }
        const next = this.rng.pick(pois.filter((p) => p !== demo.last)) || pois[0];
        if (next && this.player.pathTo(next.x, next.z)) {
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
    this.mode = 'hub';
    this.flowToken++;
    this.isEcho = false;
    this.duel = null;
    screens.closeScreen();
    this.buildHub();
    hud.showHud(true);
    hud.hideBanner();
    hud.setAction(null);
    this.talkBtn = null;
    hud.setVerbPanel(null);
    hud.showHintButton(false);
    this.refreshHudCounts();
    audio.music('island');
    // daily streak
    const res = touchDailyStreak(this.profile);
    if (res.kind === 'extended') hud.toast(t('hub.streak_extended', { n: this.profile.streak.count }));
    else if (res.kind === 'frozen') hud.toast(t('hub.streak_frozen', { n: this.profile.streak.count }));
    if (res.gift) {
      delay(800, () => {
        const g = 6 + Math.min(14, this.profile.streak.count * 2);
        hud.toast(`🎁 ${t('hub.daily_gift')} +${g} 🍌`);
        addBananas(this.profile, g);
        addEggPoints(this.profile, 2);
        this.refreshHudCounts();
        audio.sfx('chest');
      });
    }
    // greeting pages, one confirm each: streak news (if any), a once-per-visit
    // welcome, then Mimi's most useful advice — read at the child's own pace
    const pages = [];
    if (res.kind === 'reset' && this.profile.stats.days > 1) pages.push(t('hub.streak_reset'));
    if (!this.hubWelcomed) {
      this.hubWelcomed = true;
      pages.push(t('hub.welcome', { name: screens.esc(this.profile.name) }));
    }
    pages.push(this.mimiLine());
    hud.say(pages);
    // island: daily perks from finished builds (granted now, toasted shortly)
    const perks = grantDailyPerks(this.profile, todayString());
    if (perks.length) {
      for (const perk of perks) {
        if (perk.kind === 'bananas') addBananas(this.profile, perk.n);
        else if (perk.kind === 'egg') addEggPoints(this.profile, perk.n);
      }
      persist();
      this.refreshHudCounts();
      perks.forEach((perk, i) => delay(1700 + i * 1100, () => {
        hud.toast(perk.kind === 'bananas'
          ? t('island.daily_fruit', { n: perk.n })
          : t('island.daily_bread'));
        audio.sfx('coin');
      }));
    }
    // island: announce blueprints Mimi just dreamed up (once each)
    const fresh = newBlueprints(this.profile, masteryReport(this.profile.math));
    if (fresh.length) {
      markSeen(this.profile, fresh.map((b) => b.id));
      persist();
      const tok = this.flowToken;
      delay(2600, () => {
        if (tok !== this.flowToken) return;
        audio.sfx('sparkle');
        for (const b of fresh) hud.toast(t('island.new_blueprint', { name: t('build.' + b.id) }), 'gem');
        hud.say(`<b>Mimi:</b> ${t('island.mimi_worktable')}`);
      });
    }
  }

  buildHub() {
    this.clearPlace();
    const report = masteryReport(this.profile.math);
    const pct = {};
    for (const [w, info] of Object.entries(report.worlds)) pct[w] = info.pct;
    const status = islandStatus(this.profile, report);
    // living gates are built at their last celebrated stage, so growth since
    // the previous visit can pop in before the player's eyes (never shrinks)
    const gateStages = this.profile.flags.portalStages || (this.profile.flags.portalStages = {});
    this.place = new HubPlace(this.world, pct, {
      built: status.filter((b) => b.state === 'built').map((b) => b.id),
      unlocked: status.filter((b) => b.state === 'unlocked').map((b) => b.id),
      crabKing: !!this.profile.flags.festivalDone,
      festival: !!this.profile.flags.festivalDone,
    }, gateStages);
    this.particles = new Particles(this.place.group);
    this.place.fx = this.particles;
    this.celebrateGateGrowth(pct, gateStages);
    this.spawnAvatar();
    const spawn = (this.place.markers.P || [{ x: 11, z: 11 }])[0];
    this.player.setPlace(this.place, spawn.x, spawn.z);
    this.spawnPet(spawn);
    this.world.follow(this.player.mesh, 13);
    this.player.onArrive = (x, z) => this.hubArrive(x, z);
    this.player.onBump = (x, z) => this.hubBump(x, z);
    this.place.playerAt = () => (this.player ? { x: this.player.x, z: this.player.z } : null);
    // the island literally comes alive as it blooms: more butterflies and
    // birds with mastery, the flower garden build invites extra butterflies
    const builtIds = status.filter((b) => b.state === 'built').map((b) => b.id);
    const avgPct = (pct.tide + pct.garden + pct.stump + pct.vines) / 4 || 0;
    this.place.addEntity(new AmbientLife(this.place, this.rng, {
      butterflies: 2 + Math.round(avgPct * 4) + (builtIds.includes('garden') ? 2 : 0),
      birds: 1 + (builtIds.length >= 3 ? 1 : 0) + (this.profile.flags.festivalDone ? 1 : 0),
      clouds: 2, // same sky the title screen promises
      playerPos: () => this.player?.mesh.position,
    }));
  }

  // Gates that crossed a mastery threshold since the last hub visit bloom one
  // by one: vines pop in, sparkles fall, a toast names the gate. The saved
  // stage only ever rises — a rating dip can never wilt a gate.
  celebrateGateGrowth(pct, gateStages) {
    const tok = this.flowToken;
    let i = 0;
    for (const [worldId, gate] of Object.entries(this.place.gates || {})) {
      const target = portalStage(pct[worldId] ?? 0);
      if (target <= (gateStages[worldId] ?? 0)) continue;
      gateStages[worldId] = target;
      delay(1500 + i++ * 1100, () => {
        if (tok !== this.flowToken) return;
        gate.celebrate(target);
        hud.toast(t('portal.stage' + target, { name: t('world.' + worldId) }), 'gem');
      });
    }
    if (i) persist();
  }

  hubArrive(x, z) {
    this.pet?.notePlayerAt(x, z);
    for (const [worldId, spot] of Object.entries(this.place.portals)) {
      if (spot.x === x && spot.z === z) {
        audio.sfx('door');
        this.enterWorld(worldId);
        return;
      }
    }
    const n = (this.place.markers.N || [])[0];
    if (n && n.x === x && n.z === z) this.openPets();
  }

  hubTap(x, z) {
    const m = this.place.markers;
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
    for (const [id, spot] of Object.entries(this.place.buildSpots || {})) {
      if (spot.x !== x || spot.z !== z) continue;
      if (spot.state === 'unlocked') { this.openIsland(); return true; }
      if (spot.state === 'built') {
        audio.sfx(id === 'stage' ? 'gong' : 'sparkle');
        this.particles?.confetti(this.place.worldPos(x, z, 0.8), 18);
        return true;
      }
      return false; // locked plot is just floor
    }
    return false;
  }

  // ---------- avatar ----------

  spawnAvatar() {
    this.player = new Player(this.makeMonkeyMesh(this.profile.avatar));
    this.player.headH = 0.95;
  }

  makeMonkeyMesh(avatar) {
    const fur = FURS.find((f) => f.id === avatar?.fur) || FURS[0];
    const g = makeCharacter(CHARS.monkey, 0.85, fur.palette, 'char:monkey');
    const hat = avatar?.hat ? HATS.find((h) => h.id === avatar.hat) : null;
    if (hat) {
      const hm = buildVoxelMesh(hat.model, { cacheKey: 'hat:' + hat.id });
      const vs = g.userData.voxelScale;
      hm.scale.setScalar(vs);
      hm.position.y = (MONKEY_HAT_Y + (hat.dy || 0)) * vs;
      g.add(hm);
    }
    return g;
  }

  refreshAvatar() {
    if (!this.player || !this.place) return;
    const { x, z } = this.player;
    const old = this.player.mesh;
    old.removeFromParent();
    const mesh = this.makeMonkeyMesh(this.profile.avatar);
    this.player.mesh = mesh;
    this.player.baseScale = mesh.scale.x || 1;
    this.player.setPlace(this.place, x, z);
    this.respawnPet();
  }

  spawnPet(near) {
    const petId = this.profile.avatar.pet;
    if (!petId) { this.pet = null; return; }
    const def = PETS.find((p) => p.id === petId);
    if (!def) { this.pet = null; return; }
    const mesh = makeCharacter(def.model, 0.45, null, 'pet:' + def.id);
    this.pet = new PetFollower(mesh);
    const spot = this.findFreeNear(near.x, near.z) || near;
    this.pet.setPlace(this.place, spot.x, spot.z);
  }

  respawnPet() {
    if (this.pet) { this.pet.mesh.removeFromParent(); this.pet = null; }
    if (this.player) this.spawnPet({ x: this.player.x, z: this.player.z });
  }

  findFreeNear(x, z) {
    for (const [dx, dz] of [[0, 1], [1, 0], [-1, 0], [0, -1], [1, 1], [-1, -1]]) {
      const c = this.place.cellAt(x + dx, z + dz);
      if (c && c.walk) return { x: x + dx, z: z + dz };
    }
    return null;
  }

  // ---------- chamber run ----------

  enterWorld(worldId) {
    this.currentWorld = worldId;
    this.chamberIndex = 0;
    this.combo = 0;
    this.runChamber();
  }

  runChamber() {
    this.mode = 'chamber';
    this.flowToken++;
    screens.closeScreen();
    this.solvedInChamber = 0;
    this.rewards = [];
    this.chamberIndex++;
    let problem;
    if (this.duel) {
      problem = this.duel.nextProblem();
    } else {
      const opts = this.isEcho ? { echo: true } : { world: this.currentWorld };
      problem = ensureHostable(nextProblem(this.profile.math, opts), this.profile.math, opts);
    }
    this.buildChamber(problem);
    hud.showHud(true);
    hud.showHintButton(true);
    this.presentProblem(problem);
    audio.music('chamber');
    if (this.isEcho) hud.toast('✨ ' + t('play.echo_door'));
  }

  buildChamber(problem) {
    this.clearPlace();
    const kind = problem.kind;
    const templates = TEMPLATES[kind] || TEMPLATES.fetch;
    // duels: layout + stone placement must be identical for both players
    this.chamberRng = this.duel
      ? new Rng(this.duel.seed * 131 + this.duel.round * 17 + 5)
      : this.rng;
    // every chamber is a fresh board: flipped/sprinkled layout, stones
    // scattered to new spots — all seeded, so duels stay perfectly fair
    const rows = varyLayout(this.chamberRng.pick(templates), this.chamberRng);
    this.place = new Place(this.world, this.currentWorld || 'garden');
    this.place.buildFrom(rows, { seed: this.chamberRng.int(1, 1e9) });
    scatterFetchSpots(this.place, this.chamberRng);
    this.particles = new Particles(this.place.group);
    // a touch of life, kept subtle in chambers (AmbientLife forks its own
    // rng stream, so duel-critical draws stay perfectly aligned)
    this.place.addEntity(new AmbientLife(this.place, this.chamberRng, { butterflies: 2 }));
    this.spawnAvatar();
    const spawn = (this.place.markers.P || [{ x: 2, z: 2 }])[0];
    this.player.setPlace(this.place, spawn.x, spawn.z);
    this.spawnPet(spawn);
    // static, centered diorama: the whole board (every stone, the altar, the
    // full number line) stays on screen at any window aspect
    this.world.frameBoard(new THREE.Vector3(0, 0, 0), this.place.size.w, this.place.size.d);
    this.player.onArrive = (x, z) => {
      this.pet?.notePlayerAt(x, z);
      this.collectPickupAt(x, z);
      this.verb?.onArrive(x, z);
    };
    this.player.onBump = (x, z) => this.verb?.onBump(x, z);
    // altar & crabs
    this.altar = null;
    if ((this.place.markers.A || []).length) {
      const aSpot = this.place.markers.A[0];
      this.altar = new Altar(this.place, aSpot.x, aSpot.z);
      this.place.addEntity(this.altar);
      // the altar is a real thing in the world: solid like trees and rocks —
      // offerings happen by walking INTO it, never through it
      this.place.cellAt(aSpot.x, aSpot.z).walk = false;
    }
    this.crabs = [];
    for (const c of this.place.markers.c || []) {
      // patrol along the longest clear axis through the spawn point
      const reachX = this.patrolReach(c, 'x'), reachZ = this.patrolReach(c, 'z');
      const axis = reachX.len >= reachZ.len ? 'x' : 'z';
      const reach = axis === 'x' ? reachX : reachZ;
      if (reach.len < 2) continue;
      const crab = new Crab(this.place, c.x, c.z, axis, reach.min, reach.max, 1.3 + this.rng.float() * 0.7);
      this.crabs.push(crab);
      this.place.addEntity(crab);
    }
    // helper NPC: a friendly local who explains the task and cheers you on
    this.helper = null;
    this.helpKind = null;
    const mSpot = (this.place.markers.M || [])[0];
    if (mSpot) {
      const def = HELPERS[this.currentWorld] || HELPERS.garden;
      const petDef = PETS.find((p) => p.id === def.pet);
      const mesh = makeCharacter(petDef.model, 0.62, null, 'helper:' + def.pet);
      mesh.position.copy(this.place.worldPos(mSpot.x, mSpot.z));
      this.place.group.add(mesh);
      this.place.cellAt(mSpot.x, mSpot.z).walk = false;
      const helper = { ...def, x: mSpot.x, z: mSpot.z, mesh, t: 0, excite: 0 };
      const baseY = mesh.position.y;
      this.place.addEntity({
        update: (dt) => {
          helper.t += dt / 1000;
          helper.excite = Math.max(0, helper.excite - dt / 900);
          mesh.position.y = baseY
            + Math.abs(Math.sin(helper.t * (2 + helper.excite * 5))) * (0.05 + helper.excite * 0.28);
        },
      });
      this.helper = helper;
    }
  }

  // Everything the helper says goes through here: name tag + their face.
  helperSay(html, opts = {}) {
    if (!this.helper) { hud.say(html, opts); return; }
    hud.say(`<b>${t(this.helper.nameKey)}:</b> ${html}`, { ...opts, face: this.helper.face });
  }

  helperTap() {
    if (!this.helper) return;
    audio.sfx('click');
    this.helper.excite = 1;
    this.helperSay(t(`helper.cheer.${1 + Math.floor(Math.random() * 4)}`), { transient: true, ms: 3600 });
  }

  // ---------- hub talk (Animal-Crossing-style) ----------

  // The NPC standing on cell (x,z): Mimi or a friend who moved in with a
  // build. includePrev also matches Mimi's previous cell (taps mid-hop).
  hubNpcAt(x, z, includePrev = false) {
    const mp = this.place.mimiPos;
    if (mp && ((mp.x === x && mp.z === z)
      || (includePrev && this.place.mimiPrev?.x === x && this.place.mimiPrev?.z === z))) {
      return { kind: 'mimi', x: mp.x, z: mp.z };
    }
    const npc = (this.place.npcs || []).find((n) => n.x === x && n.z === z);
    return npc ? { kind: 'npc', npc, x: npc.x, z: npc.z } : null;
  }

  // An NPC on a neighboring cell — powers the 💬 button and Space/Enter.
  hubNpcNear() {
    if (!this.player || !this.place?.mimiPos) return null;
    for (const [dx, dz] of [[0, 1], [1, 0], [-1, 0], [0, -1]]) {
      const found = this.hubNpcAt(this.player.x + dx, this.player.z + dz);
      if (found) return found;
    }
    return null;
  }

  // Talk: turn toward each other, then the line — Mimi's advice ladder, or a
  // friend's chatter. When Mimi says "enough bananas for X!", her worktable
  // opens right after the line, like a villager walking you to the counter.
  hubTalk(target) {
    audio.sfx('click');
    const dx = target.x - this.player.x, dz = target.z - this.player.z;
    this.player.face(dx, dz);
    if (target.kind === 'mimi') {
      if (this.place.mimi && (dx || dz)) this.place.mimi.rotation.y = Math.atan2(-dx, -dz);
      const line = this.mimiNext();
      const tok = this.flowToken;
      // "enough bananas for X!" walks you to the worktable the moment you
      // confirm her line — like a villager leading you to the counter
      hud.say(line.html, {
        onDone: line.key === 'mimi.build_ready'
          ? () => { if (tok === this.flowToken && this.mode === 'hub') this.openIsland(); }
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
    const found = this.hubNpcAt(x, z);
    if (!found) return;
    if (performance.now() < this.talkCooldown) return; // held arrow keys re-bump
    this.talkCooldown = performance.now() + 900;
    this.hubTalk(found);
  }

  // Mimi's next line: the advice ladder (mimi.js), cycled across talks so the
  // first one carries what matters and repeat talks keep the chat going. The
  // hub greeting peeks without consuming, so talking to her in person still
  // opens with the line that matters.
  _mimiPick(consume) {
    const report = masteryReport(this.profile.math);
    const lines = mimiLines(this.profile, report, islandStatus(this.profile, report));
    const line = lines[this.mimiChat % lines.length];
    if (consume) this.mimiChat++;
    if (!this.profile.flags.mimiMet) { this.profile.flags.mimiMet = true; persist(); }
    const vars = { ...(line.vars || {}) };
    if (line.buildId) vars.name = t('build.' + line.buildId);
    if (line.worldId) vars.world = t('world.' + line.worldId);
    return { key: line.key, html: `<b>Mimi:</b> ${t(line.key, vars)}` };
  }

  mimiNext() { return this._mimiPick(true); }

  mimiLine() { return this._mimiPick(false).html; }

  canHost(kind) {
    const m = this.place.markers;
    if (kind === 'fetch') return (m.s || []).length + (m.p || []).length >= 4 && (m.A || []).length > 0;
    if (kind === 'array') return (m.o || []).length > 0;
    if (kind === 'numberline') return (m.V || []).length >= 8;
    if (kind === 'share') return (m.B || []).length >= 2 && (m.m || []).length > 0;
    return false;
  }

  patrolReach(c, axis) {
    const probe = (dir) => {
      let n = 0;
      for (let i = 1; i < 12; i++) {
        const x = axis === 'x' ? c.x + dir * i : c.x;
        const z = axis === 'z' ? c.z + dir * i : c.z;
        const cell = this.place.cellAt(x, z);
        if (!cell || !cell.walk || cell.h !== this.place.cellAt(c.x, c.z).h || 'AsPpBmMVoTON'.includes(cell.ch)) break;
        n = i;
      }
      return n;
    };
    const lo = probe(-1), hi = probe(1);
    const base = axis === 'x' ? c.x : c.z;
    return { min: base - lo, max: base + hi, len: lo + hi };
  }

  presentProblem(problem) {
    this.problem = problem;
    this.usedHint = false;
    this.problemStart = performance.now();
    hud.hideModelPanel();
    hud.hideBubble();
    this.verb?.destroy();
    const VerbClass = VERBS[problem.kind] || VERBS.fetch;
    this.verb = new VerbClass({
      world: this.world,
      place: this.place,
      player: this.player,
      particles: this.particles,
      altar: this.altar,
      hud,
      problem,
      rng: this.chamberRng,
      resolve: (correct, info) => this.onResolve(correct, info),
      onTreat: (kind, n, pos) => this.onTreat(kind, n, pos),
      onCarry: (carrying) => this.setCrabsFrozen(carrying),
      hintUsed: () => { this.usedHint = true; },
    });
    this.verb.begin();
    const vars = this.promptVars(problem);
    hud.setBanner(t(problem.prompt.key, vars), problem.equation);
    // the helper explains each task type the first time it shows up here
    if (this.helper && problem.kind !== this.helpKind) {
      this.helpKind = problem.kind;
      const tok = this.flowToken;
      delay(800, () => { if (tok === this.flowToken) this.helperSay(t('helper.' + problem.kind)); });
    }
    // strong scaffold: show the model right away
    if (problem.scaffold === 0) delay(700, () => this.verb?.showModel());
  }

  promptVars(problem) {
    const v = { ...(problem.meta || {}), ...(problem.model?.params || {}), ...(problem.prompt?.vars || {}) };
    if (v.n !== undefined && v.d !== undefined) v.frac = `${v.n}/${v.d}`;
    v.answer = problem.answer;
    return v;
  }

  onResolve(correct, info) {
    const ms = performance.now() - this.problemStart;
    const res = recordResult(this.profile.math, this.problem, {
      correct, usedHint: this.usedHint, ms,
    });
    this.profile.stats[correct ? 'correct' : 'wrong']++;
    persist();
    if (correct) this.onCorrect(res, info);
    else this.onWrong(res, info);
  }

  onCorrect(res, info) {
    this.combo++;
    this.solvedInChamber++;
    if (this.duel) this.duel.scoreCorrect(this.combo);
    // hit-pause then celebration
    this.pauseUntil = performance.now() + 110;
    audio.sfx('correct');
    audio.comboTone(this.combo);
    hud.solveBanner(this.problem.equation.replace(/[?⬚]/, String(this.problem.answer)));
    hud.setCombo(this.combo);
    this.pet?.celebrate();
    const apos = this.player.mesh.position.clone().add(new THREE.Vector3(0, 0.8, 0));
    this.particles.confetti(apos, 30);
    // banana fountain
    const base = this.rng.int(BALANCE.bananasPerCorrect[0], BALANCE.bananasPerCorrect[1]);
    const bonus = Math.min(10, (this.combo - 1) * BALANCE.comboBonus);
    let n = base + bonus;
    if (this.profile.avatar.pet) n = Math.round(n * (1 + BALANCE.petBananaBonus));
    flyEmojiToHud(this.world, apos, '🍌', document.getElementById('banana-count'), Math.min(n, 8),
      () => audio.sfx('coin'));
    addBananas(this.profile, n);
    const eggFull = addEggPoints(this.profile, BALANCE.eggPerCorrect);
    this.refreshHudCounts();
    hud.say(`<b>${pickCorrectLine()}</b>`, { transient: true, ms: 1800 });
    // gems & mastery toasts
    for (const gem of res.newGems || []) {
      hud.toast('💎 ' + t('result.gem', { fact: gem.replace('x', ' × ') }), 'gem');
      audio.sfx('sparkle');
    }
    if (res.masteredSkill) {
      hud.toast('🌟 ' + t('result.mastered', { skill: t('skill.' + res.masteredSkill) }));
      audio.sfx('bloom');
    }
    const tok = this.flowToken;
    delay(1500, () => {
      // a Home press (or any mode switch) during the celebration invalidates
      // this pending transition — without the guard it would pop a result
      // screen over the hub
      if (tok !== this.flowToken) return;
      const goal = this.duel ? BALANCE.problemsPerChamber
        : (this.isEcho ? BALANCE.echoProblems : BALANCE.problemsPerChamber);
      if (this.solvedInChamber >= goal || (this.duel && !this.duel.hasMore())) {
        this.completeChamber(eggFull);
      } else {
        let next;
        if (this.duel) {
          next = this.duel.nextProblem();
        } else {
          const opts = this.isEcho
            ? { echo: true, kind: this.problem.kind }
            : { world: this.currentWorld, kind: this.problem.kind };
          next = ensureHostable(nextProblem(this.profile.math, opts), this.profile.math, opts);
        }
        // the chamber was built for problem 1's verb; reroute kinds the
        // current layout cannot host. A constructed problem (choices:null)
        // can't simply be re-labelled 'fetch' — regenerate it properly.
        if (next.kind !== this.problem.kind && !this.canHost(next.kind)) {
          if (this.canHost('fetch')) {
            next = next.choices
              ? { ...next, kind: 'fetch' }
              : ensureHostable(
                nextProblem(this.profile.math, { world: next.world, skill: next.skillId, kind: 'fetch' }),
                this.profile.math, { world: next.world },
              );
          } else {
            next = { ...next, kind: this.problem.kind };
          }
        }
        this.presentProblem(next);
      }
    });
  }

  onWrong(res, info) {
    this.combo = 0;
    if (this.duel) this.duel.scoreWrong();
    hud.setCombo(0);
    audio.sfx('boop');
    hud.wiggleBanner();
    const vars = this.promptVars(this.problem);
    if (info.arrayInfo) {
      const a = info.arrayInfo;
      const key = a.tag === 'shape' ? 'ex.array_shape' : 'ex.array_count';
      this.helperSay(t(key, { ...vars, value: a.n }));
    } else {
      let key = 'ex.' + (info.tag === 'random' ? 'near_miss' : info.tag);
      // ex.off_by_table states a multiplication fact ("{a} rows of {b} makes
      // {answer}") that is FALSE for division-family problems where answer is
      // the quotient — those carry their own truthful line in explain.key.
      if (key === 'ex.off_by_table' && this.problem.explain?.key !== 'ex.off_by_table') {
        key = this.problem.explain.key;
      }
      const line = t(key, { ...vars, ...(this.problem.explain?.vars || {}) });
      this.helperSay(line === key ? t(this.problem.explain?.key || 'ex.generic', vars) : line);
    }
    // materialize the visual model — the world teaches; if the floor can't
    // host it, a DOM panel guarantees the child still SEES the why
    delay(450, () => {
      if (this.verb && !this.verb.showModel()) hud.showModelPanel(this.problem.model);
    });
  }

  onTreat(kind, n, pos) {
    if (kind === 'bananas') {
      flyEmojiToHud(this.world, pos, '🍌', document.getElementById('banana-count'), n, () => audio.sfx('coin'));
      addBananas(this.profile, n);
    } else if (kind === 'berry') {
      flyEmojiToHud(this.world, pos, '🍓', document.getElementById('egg-fill').parentElement, n, () => audio.sfx('egg'));
      addEggPoints(this.profile, n * BALANCE.eggPerBerry);
      this.profile.stats.berries += n;
    }
    this.refreshHudCounts();
  }

  setCrabsFrozen(frozen) {
    for (const c of this.crabs) c.frozen = frozen;
  }

  completeChamber(eggFull) {
    this.profile.stats.chambers++;
    this.verb?.destroy();
    this.verb = null;
    audio.music('celebrate');
    // chest rewards
    const chestBananas = BALANCE.bananasChestBase + this.rng.int(0, 6) + Math.min(12, this.chamberIndex * 2);
    addBananas(this.profile, chestBananas);
    const rewards = [`🍌 +${chestBananas}`];
    if (this.rng.chance(BALANCE.hatRandomChestChance)) {
      const unowned = HATS.filter((h) => !this.profile.owned.hats.includes(h.id));
      if (unowned.length) {
        const hat = this.rng.pick(unowned);
        this.profile.owned.hats.push(hat.id);
        rewards.push(`${screens.HAT_EMOJI[hat.id] || '🎩'} ${t(hat.nameKey)}!`);
      }
    }
    const r2 = this.rng.int(1, 3);
    addEggPoints(this.profile, r2);
    rewards.push(`🥚 +${r2}`);
    persist();
    this.refreshHudCounts();
    this.pendingEcho = !this.isEcho && this.rng.chance(BALANCE.echoDoorChance);
    const wasEcho = this.isEcho;
    this.isEcho = false;

    if (this.duel) { this.duel.chamberDone(); return; }

    hud.showHud(false);
    screens.showResult({
      rewards,
      onNext: () => this.afterResult(() => {
        if (this.pendingEcho) { this.pendingEcho = false; this.isEcho = true; }
        this.runChamber();
      }),
      onHome: () => this.afterResult(() => this.startHub()),
    });
  }

  afterResult(then) {
    const p = this.profile;
    if (p.egg.points >= p.egg.goal) {
      const pet = hatchEgg(p, PETS);
      screens.showHatch(pet, () => {
        if (pet && !p.avatar.pet) p.avatar.pet = pet.id;
        this.refreshHudCounts();
        then();
      });
    } else {
      then();
    }
  }

  // ---------- hint ----------

  useHint() {
    if (!this.verb || !this.problem) return;
    this.usedHint = true;
    this.verb.hintShown = true;
    audio.sfx('click');
    const shown = this.verb.showModel();
    if (!shown) hud.showModelPanel(this.problem.model);
    this.helperSay(t('hint.look'), 3600);
  }

  // ---------- menus from hub ----------

  openGems() {
    audio.sfx('click');
    screens.showGems({
      report: masteryReport(this.profile.math),
      onClose: () => screens.closeScreen(),
    });
  }

  openShop() {
    audio.sfx('click');
    screens.showShop({
      onClose: () => { screens.closeScreen(); this.refreshAvatar(); this.refreshHudCounts(); },
      onChanged: () => this.refreshHudCounts(),
    });
  }

  openPets() {
    audio.sfx('click');
    screens.showPets({
      onClose: () => { screens.closeScreen(); this.respawnPet(); },
      onChanged: () => {},
      onHatch: () => this.afterResult(() => {
        screens.showPets({
          onClose: () => { screens.closeScreen(); this.respawnPet(); },
          onChanged: () => {},
          onHatch: () => {},
        });
      }),
    });
  }

  openIsland() {
    audio.sfx('click');
    const report = masteryReport(this.profile.math);
    screens.showIsland({
      profile: this.profile,
      status: islandStatus(this.profile, report),
      onClose: () => screens.closeScreen(),
      onFund: (id) => this.fundBuild(id),
    });
  }

  fundBuild(id) {
    const def = buildById(id);
    if (!def) return;
    const doFund = () => {
      if (!fundIsland(this.profile, def, masteryReport(this.profile.math))) {
        audio.sfx('boop');
        return;
      }
      persistNow();
      screens.closeScreen();
      this.celebrateBuild(def);
    };
    if (def.finale && !this.profile.flags.festivalDone) {
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
    if (def.finale) { this.profile.flags.festivalDone = true; persist(); }
    this.buildHub(); // rebuild the hub with the new build standing
    hud.showHud(true);
    this.refreshHudCounts();
    const spot = this.place.buildSpots[def.id];
    const tok = this.flowToken;
    if (spot) {
      // stand the player by the fresh build so the camera frames the moment
      const near = this.findFreeNear(spot.x, spot.z);
      if (near) { this.player.setPlace(this.place, near.x, near.z); this.respawnPet(); }
      const pos = this.place.worldPos(spot.x, spot.z, 0.9);
      audio.sfx('bloom');
      delay(250, () => this.particles?.confetti(pos, 44));
      delay(850, () => this.particles?.confetti(pos.clone().add(new THREE.Vector3(0.4, 0.3, -0.3)), 28));
    }
    if (def.finale) {
      audio.music('celebrate');
      delay(1200, () => {
        if (tok !== this.flowToken) return;
        hud.say(t('finale.festival', { name: screens.esc(this.profile.name) }), { face: '🦀' });
      });
      delay(1700, () => {
        if (tok !== this.flowToken || !spot) return;
        this.particles?.confetti(this.place.worldPos(spot.x, spot.z, 1.5), 60);
      });
      delay(4200, () => { if (tok === this.flowToken) audio.music('island'); });
    } else {
      delay(1300, () => {
        if (tok !== this.flowToken) return;
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

  openSettings() {
    screens.showSettings({
      onClose: () => screens.closeScreen(),
      onSwitchPlayer: () => this.showTitle(),
      onLangChange: () => {},
    });
  }

  confirmHome() {
    if (this.duel) {
      // abandoning a duel goes back to the title, not into the other
      // player's hub with the wrong profile active
      this.duel = null;
      this.verb?.destroy();
      this.verb = null;
      this.showTitle();
      return;
    }
    if (this.mode === 'hub') { this.showTitle(); return; }
    this.verb?.destroy();
    this.verb = null;
    this.startHub();
  }

  refreshHudCounts() {
    hud.setBananas(this.profile.bananas);
    hud.setStreak(this.profile.streak.count);
    hud.setEgg(this.profile.egg.points, this.profile.egg.goal);
  }

  // Debug/test surface: jump straight into a chamber for a forced skill/kind.
  debugChamber(skill, kind) {
    const p = ensureHostable(
      nextProblem(this.profile.math, { skill, kind }),
      this.profile.math, {},
    );
    this.currentWorld = p.world;
    this.mode = 'chamber';
    screens.closeScreen();
    this.solvedInChamber = 0;
    this.rewards = [];
    this.buildChamber(p);
    hud.showHud(true);
    hud.showHintButton(true);
    this.presentProblem(p);
    return { kind: p.kind, eq: p.equation, skill: p.skillId };
  }

  // ---------- duel ----------

  async startDuelSetup() {
    const { showDuelSetup } = await import('./duel.js');
    showDuelSetup(this);
  }

  // ---------- input ----------

  bindInput() {
    window.addEventListener('keydown', (e) => {
      if (this.mode === 'title' || document.querySelector('#screens .screen')) return;
      const code = e.code;
      // an open dialogue eats the confirm key first, Zelda-style
      if ((code === 'Space' || code === 'Enter') && hud.advanceBubble()) {
        e.preventDefault();
        return;
      }
      if (this.verb?.onKey?.(code)) { e.preventDefault(); return; }
      const dirs = {
        ArrowUp: [0, -1], KeyW: [0, -1],
        ArrowDown: [0, 1], KeyS: [0, 1],
        ArrowLeft: [-1, 0], KeyA: [-1, 0],
        ArrowRight: [1, 0], KeyD: [1, 0],
      };
      if (dirs[code]) {
        e.preventDefault();
        // camera-relative: iso view rotates input 45°; keep plain mapping (playtests fine)
        this.player?.tryStep(dirs[code][0], dirs[code][1]);
      } else if (code === 'Space' || code === 'Enter') {
        e.preventDefault();
        if (this.mode === 'hub') this.hubAction();
        else this.verb?.onAction();
      } else if (code === 'KeyE') {
        this.useHint();
      }
    });

    let downPos = null, dragging = false;
    this.canvas.addEventListener('pointerdown', (e) => {
      downPos = { x: e.clientX, y: e.clientY };
      dragging = false;
    });
    this.canvas.addEventListener('pointermove', (e) => {
      if (!downPos) return;
      const dx = e.clientX - downPos.x, dy = e.clientY - downPos.y;
      if (Math.hypot(dx, dy) > 14) dragging = true;
    });
    this.canvas.addEventListener('pointerup', (e) => {
      if (!downPos) return;
      const dx = e.clientX - downPos.x, dy = e.clientY - downPos.y;
      const wasDrag = dragging;
      downPos = null; dragging = false;
      if (this.mode === 'title') return;
      if (!wasDrag) {
        const cell = this.pickCell(e.clientX, e.clientY);
        if (!cell) return;
        if (this.mode === 'hub' && this.hubTap(cell.x, cell.z)) return;
        if (this.helper && cell.x === this.helper.x && cell.z === this.helper.z) {
          this.helperTap();
          return;
        }
        if (this.verb?.onCellTap(cell.x, cell.z, false)) return;
        this.player?.pathTo(cell.x, cell.z);
      } else if (Math.hypot(dx, dy) > 30) {
        // swipe = one step
        const ang = Math.atan2(dy, dx);
        const oct = Math.round(ang / (Math.PI / 2));
        const map = { 0: [1, 0], 1: [0, 1], 2: [-1, 0], '-1': [0, -1], '-2': [-1, 0] };
        const d = map[oct] || [0, 0];
        this.player?.tryStep(d[0], d[1]);
      }
    });
  }

  pickCell(cx, cy) {
    const hit = this.world.pick(cx, cy);
    if (!hit) return null;
    if (hit.object === this.place?.floor && hit.instanceId !== undefined) {
      const it = this.place.floorList[hit.instanceId];
      if (it) return { x: it.x, z: it.z };
    }
    // fall back: derive from point
    const p = hit.point;
    const x = Math.floor(p.x / TILE + this.place.size.w / 2);
    const z = Math.floor(p.z / TILE + this.place.size.d / 2);
    if (this.place.cellAt(x, z)) return { x, z };
    return null;
  }

  // ---------- frame update ----------

  update(dt) {
    if (!this.place) return;
    this.place.update(dt);
    this.player?.update(dt);
    this.pet?.update(dt);
    this.particles?.update(dt);
    this.verb?.update?.(dt);
    // AC-style talk prompt: the action button becomes 💬 beside a friend
    // (checked on a beat — Mimi wanders, so adjacency changes on its own)
    if (this.mode === 'hub' && this.player) {
      this.talkBtnT = (this.talkBtnT || 0) + dt;
      if (this.talkBtnT > 140) {
        this.talkBtnT = 0;
        const want = this.hubNpcNear() ? '💬' : null;
        if (want !== this.talkBtn) { this.talkBtn = want; hud.setAction(want); }
      }
    }
    // crab bumps
    if (this.mode === 'chamber' && this.player && !this.player.locked) {
      for (const crab of this.crabs) {
        if (crab.frozen || crab.cooldown > 0) continue;
        if (crab.x === this.player.x && crab.z === this.player.z) {
          crab.cooldown = 2200;
          const steal = Math.min(BALANCE.crabSteal, this.profile.bananas);
          if (steal > 0) {
            addBananas(this.profile, -steal);
            this.refreshHudCounts();
            floatLabel(this.world, this.player.mesh.position.clone(), `-${steal} 🍌`, '#c2497a');
            // the crab SCATTERS the bananas nearby — they can all be grabbed
            // back, so the yoink is playful, never a real loss
            for (let i = 0; i < steal; i++) {
              const fx = this.player.x + this.rng.int(-3, 3);
              const fz = this.player.z + this.rng.int(-3, 3);
              const c = this.place.cellAt(fx, fz);
              const spot = (c && c.walk && !(fx === this.player.x && fz === this.player.z))
                ? { x: fx, z: fz }
                : this.findFreeNear(this.player.x, this.player.z);
              if (spot) this.spawnBananaPickup(spot.x, spot.z);
            }
          }
          audio.sfx('crab');
          this.world.shake(0.12);
          hud.say(t('play.crab_yoink', { n: steal }), { transient: true, ms: 2200, face: '🦀' });
          // knockback to a free neighbor
          const free = this.findFreeNear(this.player.x, this.player.z);
          if (free) this.player.pathTo(free.x, free.z);
        }
      }
    }
    // cosmetic trail while hopping
    const trailId = this.profile?.avatar.trail;
    if (trailId && this.player?.hopping && this.particles) {
      this.trailT += dt;
      if (this.trailT > 70) {
        this.trailT = 0;
        this.particles.emit(this.player.mesh.position.clone().add(new THREE.Vector3(0, 0.3, 0)), 2, {
          colors: [TRAIL_COLORS[trailId] || 0xffd966], speed: 0.4, up: 0.8, life: 500, spread: 0.1,
        });
      }
    }
  }

  clearPlace() {
    this.verb?.destroy?.();
    this.verb = null;
    this.problem = null;
    this.crabs = [];
    this.pickups = [];
    this.helper = null;
    this.helpKind = null;
    if (this.place) { this.place.dispose(); this.place = null; }
    this.particles = null;
  }

  // ---------- scattered banana pickups (crab yoinks are recoverable) ----------

  spawnBananaPickup(x, z) {
    const mesh = makeProp(PROPS.bananas, 0.32, 'prop:bananas', { castShadow: false });
    const base = this.place.worldPos(x, z, 0.08);
    mesh.position.copy(base);
    this.place.group.add(mesh);
    const pu = {
      x, z, mesh, t: Math.random() * 6,
      update: (dt) => {
        pu.t += dt / 1000;
        mesh.position.y = base.y + 0.06 + Math.abs(Math.sin(pu.t * 3)) * 0.07;
        mesh.rotation.y += dt * 0.002;
      },
    };
    this.place.addEntity(pu);
    this.pickups.push(pu);
  }

  collectPickupAt(x, z) {
    const i = this.pickups.findIndex((p) => p.x === x && p.z === z);
    if (i < 0) return;
    const pu = this.pickups.splice(i, 1)[0];
    this.place.group.remove(pu.mesh);
    const ei = this.place.entities.indexOf(pu);
    if (ei >= 0) this.place.entities.splice(ei, 1);
    this.onTreat('bananas', 1, pu.mesh.position.clone());
  }
}

const game = new Game();
game.boot();
window.__game = game; // debugging hook
