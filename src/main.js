// Monkey Grove — the Game shell: boot, the frame loop, scene switching, and the
// shared state every collaborator reaches through (profile, place, player, …).
// The flows live beside it: appflow.js (title/parents/settings screens),
// checkupflow.js (Mimi's Check), story/flow.js (hub-entry ceremonies), and the
// controllers it constructs (hub, chamber, input, avatar, rewards).
import { World } from './world.js';
import {
  loadSave, settings, persist, persistNow,
} from './state.js';
import { SCENES } from './scenes/registry.js';
import { enterHub } from './story/flow.js';
import { runCheckup } from './checkupflow.js';
import * as appflow from './appflow.js';
import * as hud from './hud.js';
import { audio } from './audio.js';
import { applyComfortSettings } from './a11y.js';
import { updateTweens } from './anim.js';
import { Rng } from './rng.js';
import { AvatarRig } from './avatar.js';
import { InputController } from './input.js';
import { RewardService } from './rewards.js';
import { HubController } from './hub.js';
import { ChamberFlow } from './chamberflow.js';
import { runSceneTransition } from './scene-transition.js';

class Game {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.world = new World(this.canvas);
    // Dev-only graphics tuning panel + perf overlay (gfxdev.js). Lazy + DEV-gated so
    // Vite keeps it out of the production bundle entirely.
    this._gfxdev = null;
    if (import.meta.env.DEV) {
      import('./gfxdev.js').then((m) => { this._gfxdev = m.createGfxDev(this); }).catch(() => {});
    }
    this.profile = null;
    this.mode = 'title';
    this.scene = null; // the active scene controller (registry contract); null on title/cutscene
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
    this.rng = new Rng((Math.random() * 2 ** 31) >>> 0);
    this.chamberRng = this.rng;   // seeded per-chamber in duels for fairness
    this.sessionStart = performance.now();
    this.duel = null;   // set by duel mode
    this.pickups = [];  // scattered banana pickups (crab yoinks are recoverable)
    this.flowToken = 0; // invalidates delayed flow transitions across mode switches
    this.mimiChat = 0;  // cycles Mimi's advice lines across taps this session
    this.talkCooldown = 0; // debounces bump-to-talk while keys are held
    this.hubWelcomed = false; // the hub greeting page shows once per session
    this.talkBtn = null;   // current hub action-button icon ('💬' | null)
    this.business = null; // BusinessController; set by its enter() (debug/e2e surface)
    this.stage = null; // StageController; set by its enter() (debug/e2e surface)
    this.lastHubEntry = null; // portal/build anchor used when returning from a scene
    this.transitioning = false; // blocks repeated gate/shop entry during transition
    this.avatar = new AvatarRig(this); // player monkey + pet mesh lifecycle (shared by scenes)
    this.input = new InputController(this); // keyboard/touch/camera input + retained zoom
    this.rewards = new RewardService(this); // banana/egg/combo/chest/treat payouts + juice
    this.hub = new HubController(this); // island hub: build, NPC talk, taps, menus
    this.chamber = new ChamberFlow(this); // chamber run: build, present, score, reward, complete
  }

  // ---------- boot ----------

  boot() {
    loadSave();
    applyComfortSettings();
    hud.initHud({
      onHint: () => this.inputHint(),
      onAction: () => this.inputAction(),
      onHome: () => this.confirmHome(),
      onSettings: () => this.openSettings(),
      onResetCamera: () => this.world.resetCamera(),
    });
    this.input.bind();
    this.showTitle();
    // audio unlock on first gesture
    const unlock = () => {
      audio.init();
      audio.setSfx(settings().sfx);
      audio.setMusic(settings().music);
      audio.setAmbience(settings().ambience);
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
      this._gfxdev?.tick(dt);
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

  // ---------- screens & flows (owned by appflow / checkupflow / story/flow) ----------

  showTitle() { appflow.showTitle(this); }

  openSettings(devOpen = false) { return appflow.openSettings(this, devOpen); }

  // Onboarding (appflow) forces a check exactly once; Mimi's talk ladder in the
  // hub (hub.js) and a parent request re-offer it later.
  startCheckupThenHub() { runCheckup(this, { onDone: () => this.startHub() }); }

  startCheckupFromHub() { runCheckup(this, { onDone: () => this.startHub() }); }

  // Hub entry routes through the story flow: newly earned hexagram lines play
  // their ceremonies (and the one-shot narrative beats) before the hub builds.
  startHub() { enterHub(this); }

  afterLanguageChange() {
    hud.refreshLabels();
    this.refreshHudCounts();
    this.scene?.refreshLanguage?.();
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
    if (this.scene?.onHome?.()) return; // the hub's home is the title
    this.verb?.destroy();
    this.verb = null;
    this.transitionTo(() => this.startHub(), { kind: 'portal' });
  }

  // ---------- scene switching (scenes/registry.js) ----------

  // The active scene controller. Entries that bypass switchTo (the hub's
  // ceremony gate, the chamber flow, the title) register through here so the
  // dispatch below always has one current scene (or null).
  setScene(scene) {
    if (this.scene && this.scene !== scene) this.scene.exit?.();
    this.scene = scene;
  }

  // Switch to a registered activity scene behind the portal transition. The
  // guard/mode/token/lazy-load choreography mirrors what the shop entry always
  // did: guard first (mode untouched when refused), then flip the mode, then
  // fetch the chunk — bailing if the child navigated away mid-load.
  switchTo(id, params = {}, { kind = 'portal' } = {}) {
    return this.transitionTo(() => this._enterScene(SCENES[id], id, params), { kind });
  }

  async _enterScene(entry, id, params) {
    if (entry.canEnter && !entry.canEnter(this, params)) return false;
    this.mode = id;
    const token = ++this.flowToken;
    const mod = entry.load ? await entry.load() : null;
    if (token !== this.flowToken) return false;
    this.setScene(entry.make(mod, this, params));
    return this.scene.enter();
  }

  refreshHudCounts() {
    hud.setBananas(this.profile.bananas);
    hud.setStreak(this.profile.streak.count);
    hud.setEgg(this.profile.egg.points, this.profile.egg.goal);
  }

  // ---------- chamber run (owned by ChamberFlow) ----------

  // Mode entry: open the world's first chamber. ChamberFlow owns the run; the
  // Game shell keeps the shared chamber fields and routes the entry points so
  // duel.js (g.runChamber) and the debug hook stay location-agnostic.
  enterWorld(worldId) {
    this.currentWorld = worldId;
    this.chamberIndex = 0;
    this.combo = 0;
    this.runChamber();
  }

  async transitionTo(fn, opts = {}) {
    if (this.transitioning) return false;
    this.transitioning = true;
    this.player?.stop();
    if (this.player) this.player.locked = true;
    try {
      let result = true;
      await runSceneTransition(async () => { result = await fn(); }, opts);
      return result !== false;
    } finally {
      this.transitioning = false;
      if (this.player) this.player.locked = false;
    }
  }

  enterWorldFromPortal(worldId) {
    this.lastHubEntry = { type: 'portal', worldId };
    audio.sfx('door');
    return this.transitionTo(() => this.enterWorld(worldId), { kind: 'portal' });
  }

  runChamber() { this.chamber.runChamber(); }

  // Debug/test surface (window.__game.debugChamber): force a skill/kind chamber.
  debugChamber(skill, kind) { return this.chamber.debugChamber(skill, kind); }

  afterResult(then) { this.rewards.afterResult(then); }

  // ---------- story cutscenes ----------

  // Play a story beat as a directed 3D scene (lazy `cutscene-*` chunk, like the
  // shop/stage; the runners live in the chunk too). The cutscene layer must
  // NEVER block story flow (anti-anxiety): if the chunk can't load or the scene
  // is unknown, `fallback` (the eager DOM card version, which calls the
  // continuation itself) plays instead; a play failure mid-scene still reaches
  // `onDone`. Skip and finish both land here.
  async playCutscene(id, onDone, fallback = null) {
    let mod;
    try { mod = await import('./cutscene.js'); } catch { mod = null; }
    const scene = mod?.CUTSCENES?.[id];
    if (!scene) { (fallback || onDone)(); return; }
    try {
      if (scene.staged) await mod.playStaged(this, scene);
      else await mod.playPlaced(this, scene);
    } catch (e) {
      if (import.meta.env.DEV) console.error('[cutscene] play failed:', e);
    }
    onDone();
  }

  // ---------- duel ----------

  async startDuelSetup() {
    const { showDuelSetup } = await import('./duel.js');
    showDuelSetup(this);
  }

  // ---------- input intents (from InputController) ----------
  // Each intent asks the active scene first; what it leaves falls through to
  // the shared machinery (the verb, walking). New scenes never edit these.

  // Space/Enter (or the action button).
  inputAction() {
    if (this.scene?.onAction?.()) return;
    this.verb?.onAction();
  }

  // E key (or the hint button). The chamber fallback keeps the key harmlessly
  // inert outside chambers (useHint self-guards on verb/problem).
  inputHint() {
    if (this.scene?.onHint?.()) return;
    this.chamber.useHint();
  }

  // A tap landed on a grid cell: scene first, then the active verb, else walk there.
  inputTapCell(cell) {
    if (this.scene?.onTap?.(cell.x, cell.z)) return;
    if (this.verb?.onCellTap(cell.x, cell.z, false)) return;
    this.player?.pathTo(cell.x, cell.z);
  }

  // ---------- frame update ----------

  update(dt) {
    if (!this.place) return;
    this.place.update(dt);
    this.input?.update(dt);
    this.player?.update(dt);
    this.pet?.update(dt);
    this.particles?.update(dt);
    this.verb?.update?.(dt);
    // scene frame work: the hub's talk-prompt beat, the chamber's crab bumps
    this.scene?.update?.(dt);
    // path-preview expiry + contextual prompt/action button (input.js)
    this.input?.updateUX(dt);
    // cosmetic trail while hopping (avatar.js)
    this.avatar.updateTrail(dt);
  }

  clearPlace() {
    // Freeze the outgoing player: an in-flight hop's onArrive/onBump must not
    // fire into the scene we're tearing down (e.g. a queued hub hop landing
    // after enterWorld already swapped the place to a chamber). Locking makes
    // its next _next() drop the queue instead of hopping on.
    if (this.player) { this.player.stop(); this.player.locked = true; }
    this.verb?.destroy?.();
    this.verb = null;
    this.problem = null;
    this.crabs = [];
    this.pickups = [];
    this.input.clearPathPreview();
    this.helper = null;
    this.helpKind = null;
    if (this.place) { this.place.dispose(); this.place = null; }
    this.particles = null;
  }
}

const game = new Game();
game.boot();
if (import.meta.env.DEV) window.__game = game; // debugging hook (DEV-only)
