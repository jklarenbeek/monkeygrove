// Monkey Grove — game controller: boot, loop, flow, input, juice.
import * as THREE from 'three';
import { World } from './world.js';
import { Particles } from './entities.js';
import { PETS } from './models.js';
import { nextProblem, recordCalibration, masteryReport } from './mathengine.js';
import {
  loadSave, settings, profiles, activeProfile, selectProfile,
  hatchEgg, persist, persistNow, todayString, addBananas,
} from './state.js';
import {
  applyCheckupResult, checkupTarget, setCurriculumGroep, CONFIRM_TARGET,
  eligibleSkillIds, refreshCurriculumForDate, retargetCurriculumPack,
} from './curriculum/placement.js';
import {
  createCheckup, checkupNext, checkupRecord, checkupAbort, checkupResult,
} from './curriculum/checkup.js';
import { ladderStep } from './curriculum/ladder.js';
// ensureShop resolves one shop's healed state eagerly; aggregateBusinessReport merges
// both shops for the parent dashboard. The heavy bakery/pizzeria sim (BusinessPlace +
// BusinessController) is lazy-loaded in startBusiness(), so it ships in its own
// `business-*` chunk the title/hub never download.
import { aggregateBusinessReport, ensureShop } from './business/engine.js';
import { stageReport } from './stage/engine.js';
import { isBuilt } from './island.js';
import { ensureStory, refreshStoryLines, worldBands, drawNarrativeLine, markBeat } from './story/engine.js';
import { advanceMimiPhase } from './mimi.js';
import { lineCeremonies, dueNarrativeBeat, dueSightingBeat, NARRATIVE_BEATS } from './story/chapters.js';
import * as hud from './hud.js';
import * as screens from './screens.js';
import { t } from './i18n.js';
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

const TRAIL_COLORS = { sparkle: 0xffd966, petal: 0xffb3c6, bubble: 0x9bd6ff, star: 0xc9a6ff };

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
    this.trailT = 0;
    this.sessionStart = performance.now();
    this.duel = null;   // set by duel mode
    this.pickups = [];  // scattered banana pickups (crab yoinks are recoverable)
    this.flowToken = 0; // invalidates delayed flow transitions across mode switches
    this.mimiChat = 0;  // cycles Mimi's advice lines across taps this session
    this.talkCooldown = 0; // debounces bump-to-talk while keys are held
    this.hubWelcomed = false; // the hub greeting page shows once per session
    this.talkBtn = null;   // current hub action-button icon ('💬' | null)
    this.business = null; // BusinessController, created when entering a shop
    this.stage = null; // StageController, created when entering the music stage
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
      onHint: () => this.chamber.useHint(),
      onAction: () => (this.mode === 'hub' ? this.hub.hubAction() : this.verb?.onAction()),
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
    this.hub.buildAttractIsland();
    screens.showAttract({
      onStart: () => this.showPlayerSelect(),
      onParents: () => this.showParentSelect(),
      onDuel: () => this.startDuelSetup(),
      onLangChange: () => this.place?.refreshLanguage?.(),
    });
  }

  showParentSelect(onBack = () => this.showTitle()) {
    screens.showParentProfileSelect({
      profiles: profiles(),
      onChoose: (profileId) => this.showParents(profileId, () => this.showParentSelect(onBack)),
      onBack,
    });
  }

  // Parent dashboard: mastery + curriculum coverage, and the controls that edit
  // birthday / pack / stage / strictness (each re-renders this screen).
  showParents(profileId = null, onClose = () => this.showTitle()) {
    const p = profileId
      ? profiles().find((profile) => profile.id === profileId) || null
      : activeProfile();
    screens.showParents({
      report: p ? masteryReport(p.math, { now: Date.now() }) : null,
      profile: p,
      businessReport: p?.business ? aggregateBusinessReport(p) : null,
      stageReport: p?.stage ? stageReport(p.stage) : null,
      onCurriculumChange: (patch) => {
        if (!p) return;
        const { birthDate, packId, ...rest } = patch;
        const currentPack = p.curriculum?.packId;
        let base = packId && packId !== currentPack
          ? retargetCurriculumPack(p.curriculum, packId)
          : p.curriculum;
        if (birthDate !== undefined) {
          base = refreshCurriculumForDate({ ...base, birthDate: birthDate || null }, todayString());
        }
        if (patch.confirmedStage !== undefined) {
          rest.stageSource = patch.confirmedStage === p.curriculum?.estimatedStage ? 'auto' : 'parent';
        }
        p.curriculum = { ...base, ...rest };
        persistNow();
        this.showParents(p.id, onClose);
      },
      // Queues Mimi's offer for the child's next hub visit (docs/05 §3.1.4).
      onRequestCheckup: p ? () => {
        p.flags = p.flags || {};
        p.flags.checkupRequested = true;
        persistNow();
        this.showParents(p.id, onClose);
      } : null,
      onClose,
    });
  }

  // Player picker / new-explorer form: new or intro-unseen profiles go through
  // the story, then Mimi's Check if their curriculum needs placing, then the hub.
  showPlayerSelect() {
    screens.showTitle({
      onLangChange: () => this.place?.refreshLanguage?.(),
      onPlay: (pid, isNew) => {
        this.profile = selectProfile(pid);
        if (!this.profile) return;
        const continueFromIntro = () => {
          this.profile.flags.introSeen = true;
          persist();
          if (this.needsCheckup()) this.startCheckupThenHub();
          else this.startHub();
        };
        if (isNew || !this.profile.flags.introSeen) screens.showStory(continueFromIntro);
        else if (this.needsCheckup()) this.startCheckupThenHub();
        else this.startHub();
      },
      onParents: () => this.showParentSelect(() => this.showPlayerSelect()),
      onDuel: () => this.startDuelSetup(),
    });
  }

  // ---------- Mimi's Check (docs/05): adaptive placement & recalibration ----------

  // Onboarding forces a check exactly once; a completed check (or a legacy
  // completed warm-up) is never re-forced — recalibration goes through Mimi's
  // offers in the hub instead.
  needsCheckup(profile = this.profile) {
    const cur = profile?.curriculum;
    if (cur?.checkup?.completed || cur?.warmup?.completed) return false;
    return !!profile?.flags?.needsPlacementWarmup || cur?.ageAtStart != null;
  }

  startCheckupThenHub() {
    this.runCheckup({ onDone: () => this.startHub() });
  }

  // Invoked from Mimi's talk ladder in the hub (hub.js) or a parent request.
  startCheckupFromHub() {
    this.runCheckup({ onDone: () => this.startHub() });
  }

  // One check session: groep (always re-asked on a fresh run — it's one tap and
  // September changes it), birthday (once, optional), then the probe loop driven
  // by the pure state machine. Every answer persists into a resumable draft;
  // Elo calibration is batched at settle so a rushed streak or an unscored
  // bookend never writes ratings (docs/05 §3.4).
  runCheckup({ onDone }) {
    const profile = this.profile;
    let machine = null;
    let settled = false;
    const settleOnce = (fn) => {
      if (settled) return;
      settled = true;
      fn?.();
    };

    const screen = screens.showCheckup({
      onSkip: () => settleOnce(() => {
        // Skipped at the setup pages: mark the check handled (Mimi keeps
        // offering later), exactly like the old warm-up skip.
        profile.curriculum = applyCheckupResult(profile.curriculum, null, { mode: 'skipped' });
        if (profile.flags) profile.flags.needsPlacementWarmup = false;
        persist();
        onDone();
      }),
      onStop: () => {
        if (!machine || settled) return;
        checkupAbort(machine);
        settleOnce(() => this.settleCheckup(machine, screen, onDone, { quit: true }));
      },
    });

    const stepLoop = () => {
      if (settled) return;
      const req = checkupNext(machine);
      if (req.type !== 'item') {
        settleOnce(() => this.settleCheckup(machine, screen, onDone, {}));
        return;
      }
      const problem = nextProblem(profile.math, {
        skill: req.skillId,
        kind: 'fetch',
        probe: { targetSuccess: CONFIRM_TARGET, scaffold: req.scaffold ?? undefined },
        rng: new Rng(`checkup:${profile.id}:${machine.runId}:${machine.answers.length}:${req.stepId}`),
        now: Date.now(),
      });
      const count = machine.answers.filter((a) => !a.unscored).length;
      screen.presentItem(problem, { count }, ({ correct, ms, tag }) => {
        checkupRecord(machine, { correct, ms, tag, difficulty: problem.difficulty });
        profile.curriculum = { ...profile.curriculum, checkupDraft: { ...machine, on: todayString() } };
        persist();
        setTimeout(stepLoop, 600); // let the praise flash land before the next card
      });
    };

    const beginProbe = () => {
      if (settled) return;
      const { targetBand, ageBand, kleuter } = checkupTarget(profile.curriculum);
      // Groep 1-2 / age ≤ 5 is never probed (docs/05 §2.5) — Mimi just plays.
      if (kleuter) {
        screen.showKleuter(() => settleOnce(() => {
          profile.curriculum = applyCheckupResult(profile.curriculum, null, { mode: 'kleuter' });
          if (profile.flags) profile.flags.needsPlacementWarmup = false;
          persist();
          onDone();
        }));
        return;
      }
      const draft = profile.curriculum.checkupDraft;
      machine = draft?.v === 1 && draft.targetBand === targetBand
        ? draft
        : Object.assign(createCheckup({ targetBand, ageBand }), { runId: Date.now().toString(36) });
      stepLoop();
    };

    const askBirthdayThen = () => {
      if (settled) return;
      if (profile.curriculum.birthDate || profile.curriculum.checkup?.completed) {
        beginProbe();
        return;
      }
      screen.askBirthday({
        onPick: (ymd) => {
          if (ymd) {
            profile.curriculum = refreshCurriculumForDate({ ...profile.curriculum, birthDate: ymd }, todayString());
            persist();
          }
          beginProbe();
        },
      });
    };

    // A pending draft resumes straight into the probe; a fresh run re-asks groep.
    if (profile.curriculum.checkupDraft?.v === 1) {
      beginProbe();
      return;
    }
    screen.askGroep({
      onPick: (groep) => {
        profile.curriculum = setCurriculumGroep(profile.curriculum, groep, { on: todayString() });
        persist();
        askBirthdayThen();
      },
    });
  }

  // Conclude a check: batch the Elo calibration from the accepted evidence, then
  // either apply the measured placement (complete) or keep the draft (interrupted).
  settleCheckup(machine, screen, onDone, { quit = false } = {}) {
    const profile = this.profile;
    const result = checkupResult(machine);
    const now = Date.now();
    const from = machine.calibratedUpTo || 0;
    for (const a of machine.answers.slice(from)) {
      if (a.unscored || a.rushed || a.difficulty == null) continue;
      recordCalibration(
        profile.math,
        { skillId: a.skillId, difficulty: a.difficulty, answer: null, meta: {} },
        { correct: a.correct, ms: a.ms ?? 0 },
        { now },
      );
    }
    machine.calibratedUpTo = machine.answers.length;

    if (result.complete) {
      profile.curriculum = applyCheckupResult(profile.curriculum, result, { mode: 'probe' });
      if (profile.flags) {
        profile.flags.needsPlacementWarmup = false;
        profile.flags.checkupRequested = false;
      }
      addBananas(profile, 10); // completion reward — identical whatever the frontier
      persist();
      if (quit || result.flags.rushed) {
        onDone();
        return;
      }
      const world = result.frontier != null ? ladderStep(result.frontier)?.world : null;
      const worldEmoji = { ...screens.WORLD_EMOJI, business: '🥐', hub: '🌴' }[world] || '🌈';
      screen.showDone({ reward: 10, worldEmoji }, () => onDone());
      return;
    }
    // Interrupted before the frontier was bracketed: partial evidence is already
    // calibrated; the draft resumes next time (a rushed run starts over fresh).
    profile.curriculum = {
      ...profile.curriculum,
      checkupDraft: result.flags.rushed ? null : { ...machine, on: todayString() },
    };
    persist();
    onDone();
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
      await runSceneTransition(fn, opts);
      return true;
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

  async openSettings(devOpen = false) {
    hud.hideBubble();
    let devTools = null;
    if (import.meta.env.DEV) {
      const mod = await import('./devtools.js');
      const summary = mod.describeDevState(this.profile, this.profile ? masteryReport(this.profile.math, { now: Date.now() }) : null);
      devTools = {
        open: devOpen,
        ...mod.renderDevTools({ summary, presets: mod.DEV_PRESETS, open: devOpen }),
        onToggle: (open) => this.openSettings(open),
        onApply: (id) => {
          const preset = mod.applyDevPreset(this.profile, id);
          if (!preset) return;
          persistNow();
          this.afterDevPresetApplied(preset);
          this.openSettings(true);
        },
        onManual: (values) => {
          const result = mod.applyManualDevState(this.profile, values);
          if (!result) return;
          persistNow();
          this.afterDevPresetApplied(result);
          this.openSettings(true);
        },
      };
    }
    screens.showSettings({
      onClose: () => screens.closeScreen(),
      onSwitchPlayer: () => this.showTitle(),
      onLangChange: () => this.afterLanguageChange(),
      devTools,
    });
  }

  afterLanguageChange() {
    hud.refreshLabels();
    this.refreshHudCounts();
    if (this.mode === 'chamber') {
      this.chamber.refreshLanguage();
    } else if (this.mode === 'business') {
      this.business?.refreshLanguage?.();
    } else if (this.mode === 'stage') {
      this.stage?.refreshLanguage?.();
    } else if (this.mode === 'hub') {
      this.place?.refreshLanguage?.();
    }
  }

  afterDevPresetApplied(preset) {
    hud.toast(`Dev preset: ${preset.label}`);
    if (this.mode === 'hub') {
      this.hub.buildHub();
      hud.showHud(true);
      this.refreshHudCounts();
      return;
    }
    if (this.mode !== 'title') this.startHub();
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
    this.transitionTo(() => this.startHub(), { kind: 'portal' });
  }

  // Mode entry points the collaborators (and duel/business) call through the
  // Game shell, which routes them to the owning controller.
  //
  // Before the hub builds, draw any founding-hexagram lines the player just
  // earned (story mode). On a real transition into the hub — returning from a
  // chamber/business — play their line-draw ceremony first; on the first
  // title->hub bootstrap the lines are drawn silently (a remembered older-child
  // batch shouldn't front-load a pile of pop-ups before the kid even arrives).
  startHub() {
    const ceremonial = this.mode !== 'title' && this.mode !== 'hub';
    const queue = this.advanceStory(ceremonial);
    if (queue.length) { this.runStoryQueue(queue, () => this.hub.startHub()); return; }
    this.hub.startHub();
  }

  // Latch any story lines the player just earned (world mastery) and the auto
  // narrative reveal, persisting as it goes. With `withCeremony`, returns an
  // ordered queue of screen thunks (line-draw ceremony, then the reveal beat) to
  // play before the hub builds; without it, the lines are drawn silently (the
  // first title->hub bootstrap shouldn't front-load a pile of pop-ups). Pure
  // failures must never block hub entry, so the whole thing is defensive.
  advanceStory(withCeremony) {
    const queue = [];
    try {
      if (!this.profile) return queue;
      const report = masteryReport(this.profile.math, { now: Date.now() });
      const eligible = eligibleSkillIds(this.profile.curriculum);
      const story = ensureStory(this.profile);
      let changed = false;

      const newly = refreshStoryLines(story, report, eligible);
      // Mimi's healing arc tracks the returning friends (monotonic; never relapses).
      // Side-effect latch; it persists with the line-draw that triggered it.
      advanceMimiPhase(this.profile);
      if (newly.length) {
        changed = true;
        if (withCeremony) {
          const bands = worldBands(report, eligible);
          const kindByWorld = {};
          for (const [world, info] of Object.entries(bands)) {
            kindByWorld[world] = info.band === 'below' ? 'remembered' : 'earned';
          }
          const events = lineCeremonies(newly, kindByWorld);
          if (events.length) queue.push((done) => screens.showLineCeremony(events, { story }, done));
        }
      }

      // The Four-Directions reveal draws the second line once the first shore is
      // home — but ONLY ever through its ceremony. The beat is keyed off the line
      // state (dueNarrativeBeat), so latching the line silently on the title->hub
      // bootstrap would consume the beat and the child would never see it. On the
      // silent bootstrap we leave it pending; the next real hub transition (after a
      // chamber/business) plays it with the honest "2 of 6".
      if (withCeremony && dueNarrativeBeat(story) === 'reveal') {
        const revealIdx = NARRATIVE_BEATS.reveal.lineIndex;
        queue.push((done) => {
          drawNarrativeLine(story, revealIdx);
          persist();
          screens.showStoryBeat('reveal', { story }, done);
        });
      }

      // The Crab King sighting — the mid-game mystery drip. Once the garden line
      // (Ch03, the Eight Friends) is home, someone with big pincers starts
      // watching from the gray shore. One-shot, ceremony-gated like the reveal
      // (a silent bootstrap leaves it pending so the child never misses it),
      // and marked only when it actually shows.
      if (withCeremony && dueSightingBeat(story)) {
        queue.push((done) => {
          markBeat(story, 'crab_sighting');
          persist();
          screens.showStoryBeat('sighting', { story }, done);
        });
      }

      if (changed) persist();
    } catch (e) {
      // Story must never block hub entry (anti-anxiety), but a silent swallow hides
      // real regressions — surface it in dev/test so a broken spine is visible.
      if (import.meta.env.DEV) console.error('[story] advanceStory failed (hub entry continues):', e);
      return [];
    }
    return queue;
  }

  // Play a sequence of story-screen thunks (each calls its callback when done),
  // then the final continuation.
  runStoryQueue(queue, done) {
    const step = (i) => {
      if (i >= queue.length) { done(); return; }
      queue[i](() => step(i + 1));
    };
    step(0);
  }

  refreshHudCounts() {
    hud.setBananas(this.profile.bananas);
    hud.setStreak(this.profile.streak.count);
    hud.setEgg(this.profile.egg.points, this.profile.egg.goal);
  }

  // ---------- business ----------

  startBusinessFromHub(shopId = 'bakery') {
    this.lastHubEntry = { type: 'build', id: shopId };
    this.pendingShopId = shopId;
    return this.transitionTo(() => this.startBusiness(), { kind: 'portal' });
  }

  async startBusiness() {
    // Which shop the child walked into (bakery / pizzeria) — set by startBusinessFromHub.
    const shopId = this.pendingShopId || 'bakery';
    if (!isBuilt(this.profile, shopId)) return false;
    this.mode = 'business';
    const token = ++this.flowToken;
    // The shop sim lives in a lazily-fetched `business-*` chunk. The caller's
    // "Open shop" toast is the loading beat; on a slow connection the kid sees it
    // until the scene + controller arrive. If they navigate away mid-load (a newer
    // flow bumps flowToken), bail before touching any scene state.
    const { BusinessPlace, BusinessController } = await import('./business.js');
    if (token !== this.flowToken) return false;
    this.business = new BusinessController(this, shopId);
    screens.closeScreen();
    this.clearPlace();
    this.place = new BusinessPlace(this.world, { seed: 606, shopId });
    this.particles = new Particles(this.place.group);
    this.place.fx = this.particles;
    this.avatar.spawnAvatar();
    // Each shop has its own footprint, so it names its own spawn cell; fall back to the
    // generic bottom-left only if a scene ever omits one.
    const spawn = this.place.spawn || { x: 2, z: Math.max(1, this.place.size.d - 3) };
    this.player.setPlace(this.place, spawn.x, spawn.z);
    this.avatar.spawnPet(spawn);
    this.player.onArrive = (x, z) => this.pet?.notePlayerAt(x, z);
    this.player.onBump = (x, z) => this.business.businessTap(x, z);
    this.place.playerAt = () => (this.player ? { x: this.player.x, z: this.player.z } : null);
    this.world.defaultZoom = this.input.sceneZoom('hub');
    this.world.frameBoard(this.place.center(), this.place.size.w, this.place.size.d, this.player.mesh);
    hud.showHud(true);
    hud.hideBanner();
    hud.setAction(null);
    hud.setVerbPanel(null);
    hud.showHintButton(false);
    this.refreshHudCounts();
    audio.music('island');
    const business = ensureShop(this.profile, shopId);
    if (business.activeOrder?.tasks?.length) this.business.resumeBusinessOrder(business);
    else this.business.startNextBusinessOrder();
    return true;
  }

  // ---------- music stage ----------

  startStageFromHub() {
    this.lastHubEntry = { type: 'build', id: 'stage' };
    return this.transitionTo(() => this.startStage(), { kind: 'portal' });
  }

  async startStage() {
    if (!isBuilt(this.profile, 'stage')) return false;
    this.mode = 'stage';
    const token = ++this.flowToken;
    // The stage sim lives in its own lazily-fetched `stage-*` chunk (like the shop).
    const { StagePlace, StageController } = await import('./stage.js');
    if (token !== this.flowToken) return false;
    this.stage = new StageController(this);
    screens.closeScreen();
    this.clearPlace();
    this.place = new StagePlace(this.world, { seed: 808 });
    this.particles = new Particles(this.place.group);
    this.place.fx = this.particles;
    this.avatar.spawnAvatar();
    const spawn = { x: 6, z: Math.max(1, this.place.size.d - 2) };
    this.player.setPlace(this.place, spawn.x, spawn.z);
    this.avatar.spawnPet(spawn);
    this.player.onArrive = (x, z) => this.pet?.notePlayerAt(x, z);
    this.player.onBump = (x, z) => this.stage.stageTap(x, z);
    this.place.playerAt = () => (this.player ? { x: this.player.x, z: this.player.z } : null);
    this.world.defaultZoom = this.input.sceneZoom('hub');
    this.world.frameBoard(this.place.center(), this.place.size.w, this.place.size.d, this.player.mesh);
    hud.showHud(true);
    hud.hideBanner();
    hud.setAction(null);
    hud.setVerbPanel(null);
    hud.showHintButton(false);
    this.refreshHudCounts();
    audio.music('island');
    this.stage.open();
    return true;
  }

  // ---------- duel ----------

  async startDuelSetup() {
    const { showDuelSetup } = await import('./duel.js');
    showDuelSetup(this);
  }

  // ---------- input intents (from InputController) ----------

  // Space/Enter (or the action button): talk in the hub, otherwise the verb acts.
  inputAction() {
    if (this.mode === 'hub') this.hub.hubAction();
    else this.verb?.onAction();
  }

  // E key (or the hint button).
  inputHint() {
    this.chamber.useHint();
  }

  // A tap landed on grid cell — dispatch by mode: hub plots/NPCs, business
  // stations, the chamber helper, the active verb, else walk there.
  inputTapCell(cell) {
    if (this.mode === 'hub' && this.hub.hubTap(cell.x, cell.z)) return;
    if (this.mode === 'business' && this.business?.businessTap(cell.x, cell.z)) return;
    if (this.mode === 'stage' && this.stage?.stageTap(cell.x, cell.z)) return;
    if (this.helper && cell.x === this.helper.x && cell.z === this.helper.z) {
      this.chamber.helperTap();
      return;
    }
    if (this.verb?.onCellTap(cell.x, cell.z, false)) return;
    this.player?.pathTo(cell.x, cell.z);
  }

  previewTapCell(cell) {
    if (!cell || !this.player || !this.place) return;
    this.showPathPreview(cell, 1800);
  }

  clearPathPreview() {
    const cells = this.controlTintedCells || [];
    for (const c of cells) this.place?.resetCellTint?.(c.x, c.z);
    this.controlTintedCells = [];
    this.controlPreviewT = 0;
  }

  showPathPreview(cell, ttlMs = 1200) {
    if (!this.player || !this.place) return;
    this.clearPathPreview();
    const seen = new Set();
    const tint = (c, hex) => {
      const key = `${c.x},${c.z}`;
      if (!seen.has(key)) {
        seen.add(key);
        this.controlTintedCells.push({ x: c.x, z: c.z });
      }
      this.place.tintCell?.(c.x, c.z, hex);
    };
    for (const c of this.player.reachableCells?.(3) || []) tint(c, 0xfff3b8);
    const path = this.player.previewPathTo?.(cell.x, cell.z);
    if (path) for (const c of path) tint(c, 0xc9a6ff);
    this.controlPreviewT = ttlMs;
  }

  refreshControlPrompt() {
    if (!this.player || !this.place || this.mode === 'title') return;
    if (document.querySelector('#screens .screen')) return;
    if (this.mode === 'hub') {
      const near = this.hub.hubNpcNear();
      if (near) {
        hud.setAction('💬', { label: t('controls.talk'), ready: true, visibleWhenIdle: true });
        hud.setProximityPrompt(t('controls.talk'));
      } else {
        hud.setAction(null, { label: t('hud.action'), visibleWhenIdle: true });
        hud.setProximityPrompt(null);
      }
      return;
    }
    if (hud.hasActionContext?.()) {
      hud.setProximityPrompt(t('hud.action'));
    } else {
      hud.setAction(null, { label: t('hud.action'), visibleWhenIdle: true });
      hud.setProximityPrompt(null);
    }
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
    if (this.controlPreviewT > 0) {
      this.controlPreviewT -= dt;
      if (this.controlPreviewT <= 0) this.clearPathPreview();
    }
    // AC-style talk prompt: the action button becomes 💬 beside a friend
    // (checked on a beat — Mimi wanders, so adjacency changes on its own)
    if (this.mode === 'hub' && this.player) {
      this.talkBtnT = (this.talkBtnT || 0) + dt;
      if (this.talkBtnT > 140) {
        this.talkBtnT = 0;
        const want = this.hub.hubNpcNear() ? '💬' : null;
        if (want !== this.talkBtn) this.talkBtn = want;
      }
    }
    this.refreshControlPrompt();
    // crab bumps (chamber-only; the controller self-guards on mode/player)
    this.chamber.updateChamber(dt);
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
    this.clearPathPreview();
    this.helper = null;
    this.helpKind = null;
    if (this.place) { this.place.dispose(); this.place = null; }
    this.particles = null;
  }
}

const game = new Game();
game.boot();
if (import.meta.env.DEV) window.__game = game; // debugging hook (DEV-only)
