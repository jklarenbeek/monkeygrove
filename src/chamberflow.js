// ChamberFlow — owns a single math chamber from build to clear: choosing the
// problem, constructing the diorama for its verb, presenting it, scoring the
// answer (correct/​wrong), paying out via the RewardService, picking the next
// problem (rerouting kinds the board can't host), and completing the chamber.
// It also owns the chamber-only frame work: crab bumps and banana pickups. The
// Game shell switches modes and keeps the shared scene state (world/place/
// player/pet/particles/rng/profile and the chamber fields combo/solvedInChamber/
// currentWorld/isEcho/problem/...); this controller reads and writes them
// through `this.game`.
import * as THREE from 'three';
import { Place, TEMPLATES, ensureHostable, varyLayout, scatterFetchSpots } from './chamber.js';
import { Particles, Crab, Altar, makeCharacter, makeProp, floatLabel } from './entities.js';
import { VERBS } from './verbs.js';
import { PROPS, getCreature } from './models.js';
import { nextProblem, recordResult } from './mathengine.js';
import { eligibleSkillIds } from './curriculum/placement.js';
import { addBananas, persist } from './state.js';
import { t } from './i18n.js';
import * as hud from './hud.js';
import * as screens from './screens.js';
import { audio } from './audio.js';
import { AmbientLife } from './ambient.js';
import { delay } from './anim.js';
import { Rng } from './rng.js';
import { BALANCE, SOLID_MARKERS } from './config.js';

// Friendly chamber guides: one pet local per world who explains the task,
// cheers, and delivers the "why" after a miss — kids always have a buddy.
const HELPERS = {
  tide: { pet: 'turtle', face: '🐢', nameKey: 'helper.turtle' },
  garden: { pet: 'bunny', face: '🐰', nameKey: 'helper.bunny' },
  stump: { pet: 'duckling', face: '🐥', nameKey: 'helper.duckling' },
  vines: { pet: 'owl', face: '🦉', nameKey: 'helper.owl' },
};

export class ChamberFlow {
  constructor(game) {
    this.game = game;
  }

  runChamber() {
    const g = this.game;
    g.mode = 'chamber';
    g.flowToken++;
    screens.closeScreen();
    g.solvedInChamber = 0;
    g.chamberIndex++;
    let problem;
    if (g.duel) {
      problem = g.duel.nextProblem();
    } else {
      const allowedSkills = eligibleSkillIds(g.profile.curriculum);
      const opts = g.isEcho
        ? { echo: true, allowedSkills, rng: g.rng, now: Date.now() }
        : { world: g.currentWorld, allowedSkills, rng: g.rng, now: Date.now() };
      problem = ensureHostable(nextProblem(g.profile.math, opts), g.profile.math, opts);
      if (problem?.world) g.currentWorld = problem.world;
    }
    this.buildChamber(problem);
    hud.showHud(true);
    hud.showHintButton(true);
    this.presentProblem(problem);
    audio.music(problem.world ? `chamber:${problem.world}` : 'chamber');
    g.input.maybeGestureHint();
    if (g.isEcho) hud.toast('✨ ' + t('play.echo_door'));
  }

  buildChamber(problem) {
    const g = this.game;
    g.clearPlace();
    const kind = problem.kind;
    const templates = TEMPLATES[kind] || TEMPLATES.fetch;
    // duels: layout + stone placement must be identical for both players
    g.chamberRng = g.duel
      ? new Rng(g.duel.seed * 131 + g.duel.round * 17 + 5)
      : g.rng;
    // every chamber is a fresh board: flipped/sprinkled layout, stones
    // scattered to new spots — all seeded, so duels stay perfectly fair
    const rows = varyLayout(g.chamberRng.pick(templates), g.chamberRng);
    g.place = new Place(g.world, g.currentWorld || 'garden');
    g.place.buildFrom(rows, { seed: g.chamberRng.int(1, 1e9) });
    scatterFetchSpots(g.place, g.chamberRng);
    g.particles = new Particles(g.place.group);
    // a touch of life, kept subtle in chambers (AmbientLife forks its own
    // rng stream, so duel-critical draws stay perfectly aligned)
    g.place.addEntity(new AmbientLife(g.place, g.chamberRng, { butterflies: 2 }));
    g.avatar.spawnAvatar();
    const spawn = (g.place.markers.P || [{ x: 2, z: 2 }])[0];
    g.player.setPlace(g.place, spawn.x, spawn.z);
    g.avatar.spawnPet(spawn);
    // static, centered diorama: the whole board (every stone, the altar, the
    // full number line) stays on screen at any window aspect. Passing the player
    // lets the camera trail them — on mobile it opens at a comfortable zoom that
    // already trails them; the number line stays fit so both ends show.
    g.world.defaultZoom = g.input.sceneZoom(kind);
    g.world.frameBoard(new THREE.Vector3(0, 0, 0), g.place.size.w, g.place.size.d, g.player.mesh);
    g.player.onArrive = (x, z) => {
      g.pet?.notePlayerAt(x, z);
      this.collectPickupAt(x, z);
      g.verb?.onArrive(x, z);
    };
    g.player.onBump = (x, z) => g.verb?.onBump(x, z);
    // crabs read the player's cell to colour their wandering with curiosity
    g.place.playerAt = () => (g.player ? { x: g.player.x, z: g.player.z } : null);
    // altar & crabs
    g.altar = null;
    if ((g.place.markers.A || []).length) {
      const aSpot = g.place.markers.A[0];
      g.altar = new Altar(g.place, aSpot.x, aSpot.z);
      g.place.addEntity(g.altar);
      // the altar is a real thing in the world: solid like trees and rocks —
      // offerings happen by walking INTO it, never through it
      g.place.cellAt(aSpot.x, aSpot.z).walk = false;
    }
    g.crabs = [];
    for (const c of g.place.markers.c || []) {
      // need room on at least one side to roam — skip a crab boxed in a pocket
      if (this.patrolReach(c, 'x').len + this.patrolReach(c, 'z').len < 2) continue;
      const crab = new Crab(g.place, c.x, c.z, {
        speed: 1.3 + g.rng.float() * 0.7,
        rng: new Rng(g.rng.int(1, 1e9)),
      });
      g.crabs.push(crab);
      g.place.addEntity(crab);
    }
    // helper NPC: a friendly local who explains the task and cheers you on
    g.helper = null;
    g.helpKind = null;
    const mSpot = (g.place.markers.M || [])[0];
    if (mSpot) {
      const def = HELPERS[g.currentWorld] || HELPERS.garden;
      const creature = getCreature(def.pet);
      const mesh = makeCharacter(creature.full, 0.62, null, 'creature:' + creature.id + ':f');
      mesh.position.copy(g.place.worldPos(mSpot.x, mSpot.z));
      g.place.group.add(mesh);
      g.place.cellAt(mSpot.x, mSpot.z).walk = false;
      const helper = { ...def, x: mSpot.x, z: mSpot.z, mesh, t: 0, excite: 0 };
      const baseY = mesh.position.y;
      g.place.addEntity({
        update: (dt) => {
          helper.t += dt / 1000;
          helper.excite = Math.max(0, helper.excite - dt / 900);
          mesh.position.y = baseY
            + Math.abs(Math.sin(helper.t * (2 + helper.excite * 5))) * (0.05 + helper.excite * 0.28);
        },
      });
      g.helper = helper;
    }
  }

  // Everything the helper says goes through here: name tag + their face.
  helperSay(html, opts = {}) {
    const helper = this.game.helper;
    if (!helper) { hud.say(html, opts); return; }
    hud.say(`<b>${t(helper.nameKey)}:</b> ${html}`, { ...opts, face: helper.face });
  }

  helperTap() {
    const helper = this.game.helper;
    if (!helper) return;
    audio.sfx('click');
    helper.excite = 1;
    this.helperSay(t(`helper.cheer.${1 + Math.floor(Math.random() * 4)}`), { transient: true, ms: 3600 });
  }

  canHost(kind) {
    const m = this.game.place.markers;
    if (kind === 'fetch') return (m.s || []).length + (m.p || []).length >= 4 && (m.A || []).length > 0;
    if (kind === 'array') return (m.o || []).length > 0;
    if (kind === 'numberline') return (m.V || []).length >= 8;
    if (kind === 'share') return (m.B || []).length >= 2 && (m.m || []).length > 0;
    return false;
  }

  patrolReach(c, axis) {
    const place = this.game.place;
    const probe = (dir) => {
      let n = 0;
      for (let i = 1; i < 12; i++) {
        const x = axis === 'x' ? c.x + dir * i : c.x;
        const z = axis === 'z' ? c.z + dir * i : c.z;
        const cell = place.cellAt(x, z);
        if (!cell || !cell.walk || cell.h !== place.cellAt(c.x, c.z).h || SOLID_MARKERS.has(cell.ch)) break;
        n = i;
      }
      return n;
    };
    const lo = probe(-1), hi = probe(1);
    const base = axis === 'x' ? c.x : c.z;
    return { min: base - lo, max: base + hi, len: lo + hi };
  }

  presentProblem(problem) {
    const g = this.game;
    g.problem = problem;
    g.usedHint = false;
    g.problemStart = performance.now();
    hud.hideModelPanel();
    hud.hideBubble();
    g.verb?.destroy();
    const VerbClass = VERBS[problem.kind] || VERBS.fetch;
    g.verb = new VerbClass({
      world: g.world,
      place: g.place,
      player: g.player,
      particles: g.particles,
      altar: g.altar,
      hud,
      problem,
      rng: g.chamberRng,
      resolve: (correct, info) => this.onResolve(correct, info),
      onTreat: (kind, n, pos) => this.onTreat(kind, n, pos),
      onCarry: (carrying) => { if (carrying) this.startleCrabs(); },
      hintUsed: () => { g.usedHint = true; },
    });
    g.verb.begin();
    const vars = this.promptVars(problem);
    hud.setBanner(t(problem.prompt.key, vars), problem.equation);
    // the helper explains each task type the first time it shows up here
    if (g.helper && problem.kind !== g.helpKind) {
      g.helpKind = problem.kind;
      const tok = g.flowToken;
      delay(800, () => { if (tok === g.flowToken) this.helperSay(t('helper.' + problem.kind)); });
    }
    // strong scaffold: show the model right away
    if (problem.scaffold === 0) delay(700, () => g.verb?.showModel());
  }

  refreshLanguage() {
    const g = this.game;
    if (g.mode !== 'chamber' || !g.problem) return;
    const vars = this.promptVars(g.problem);
    hud.setBanner(t(g.problem.prompt.key, vars), g.problem.equation);
    g.verb?.refreshLanguage?.();
  }

  promptVars(problem) {
    const v = { ...(problem.meta || {}), ...(problem.model?.params || {}), ...(problem.prompt?.vars || {}) };
    if (v.n !== undefined && v.d !== undefined) v.frac = `${v.n}/${v.d}`;
    v.answer = problem.answer;
    return v;
  }

  onResolve(correct, info) {
    const g = this.game;
    const ms = performance.now() - g.problemStart;
    const res = recordResult(g.profile.math, g.problem, {
      correct, usedHint: g.usedHint, ms,
    }, { now: Date.now() });
    g.profile.stats[correct ? 'correct' : 'wrong']++;
    persist();
    if (correct) this.onCorrect(res, info);
    else this.onWrong(res, info);
  }

  onCorrect(res, info) {
    const g = this.game;
    g.combo++;
    g.solvedInChamber++;
    if (g.duel) g.duel.scoreCorrect(g.combo);
    // hit-pause then celebration
    g.pauseUntil = performance.now() + 110;
    audio.sfx('correct');
    audio.comboTone(g.combo);
    hud.solveBanner(g.problem.equation.replace(/[?⬚]/, String(g.problem.answer)));
    hud.setCombo(g.combo);
    g.pet?.celebrate();
    // confetti, banana fountain, egg fill, gem/mastery toasts (egg-just-filled
    // result decides whether completeChamber hatches)
    const eggFull = g.rewards.payCorrect(g.combo, res);
    const tok = g.flowToken;
    delay(1500, () => {
      // a Home press (or any mode switch) during the celebration invalidates
      // this pending transition — without the guard it would pop a result
      // screen over the hub
      if (tok !== g.flowToken) return;
      const goal = g.duel ? BALANCE.problemsPerChamber
        : (g.isEcho ? BALANCE.echoProblems : BALANCE.problemsPerChamber);
      if (g.solvedInChamber >= goal || (g.duel && !g.duel.hasMore())) {
        this.completeChamber(eggFull);
      } else {
        let next;
        if (g.duel) {
          next = g.duel.nextProblem();
        } else {
          const allowedSkills = eligibleSkillIds(g.profile.curriculum);
          const opts = g.isEcho
            ? { echo: true, kind: g.problem.kind, allowedSkills, rng: g.rng, now: Date.now() }
            : { world: g.currentWorld, kind: g.problem.kind, allowedSkills, rng: g.rng, now: Date.now() };
          next = ensureHostable(nextProblem(g.profile.math, opts), g.profile.math, opts);
        }
        this.presentProblem(this.pickNextHostableProblem(next));
      }
    });
  }

  // Reroute a correct-answer follow-up whose kind the already-built chamber
  // can't host. The board was constructed for problem 1's verb, so a different
  // kind only works when its markers happen to be present. A constructed
  // problem (choices: null) can't simply be re-labelled 'fetch' — it must be
  // regenerated as a proper fetch in its own world/skill; a multiple-choice one
  // can be relabelled in place. If not even fetch fits this layout, force the
  // original kind so the existing board still works. Returns the problem to
  // present (possibly the original `next`, unchanged).
  pickNextHostableProblem(next) {
    const g = this.game;
    if (next.kind === g.problem.kind || this.canHost(next.kind)) return next;
    if (!this.canHost('fetch')) return { ...next, kind: g.problem.kind };
    if (next.choices) return { ...next, kind: 'fetch' };
    const allowedSkills = eligibleSkillIds(g.profile.curriculum);
    return ensureHostable(
      nextProblem(g.profile.math, {
        world: next.world,
        skill: next.skillId,
        kind: 'fetch',
        allowedSkills,
        rng: g.rng,
        now: Date.now(),
      }),
      g.profile.math, { world: next.world, allowedSkills, rng: g.rng, now: Date.now() },
    );
  }

  onWrong(res, info) {
    const g = this.game;
    g.combo = 0;
    if (g.duel) g.duel.scoreWrong();
    hud.setCombo(0);
    audio.sfx('boop');
    hud.wiggleBanner();
    const vars = this.promptVars(g.problem);
    if (info.arrayInfo) {
      const a = info.arrayInfo;
      const key = a.tag === 'shape' ? 'ex.array_shape' : 'ex.array_count';
      this.helperSay(t(key, { ...vars, value: a.n }));
    } else {
      let key = 'ex.' + (info.tag === 'random' ? 'near_miss' : info.tag);
      // ex.off_by_table states a multiplication fact ("{a} rows of {b} makes
      // {answer}") that is FALSE for division-family problems where answer is
      // the quotient — those carry their own truthful line in explain.key.
      if (key === 'ex.off_by_table' && g.problem.explain?.key !== 'ex.off_by_table') {
        key = g.problem.explain.key;
      }
      const line = t(key, { ...vars, ...(g.problem.explain?.vars || {}) });
      this.helperSay(line === key ? t(g.problem.explain?.key || 'ex.generic', vars) : line);
    }
    // materialize the visual model — the world teaches; if the floor can't
    // host it, a DOM panel guarantees the child still SEES the why
    delay(450, () => {
      if (g.verb && !g.verb.showModel()) hud.showModelPanel(g.problem.model);
    });
  }

  onTreat(kind, n, pos) {
    this.game.rewards.payTreat(kind, n, pos);
  }

  // The player just picked up an answer stone: every crab does a brief startled
  // freeze, then resumes roaming. Delivering the answer stays safe regardless —
  // the steal is suppressed while carrying (see updateChamber).
  startleCrabs() {
    for (const c of this.game.crabs) c.startle();
  }

  completeChamber(eggFull) {
    const g = this.game;
    g.profile.stats.chambers++;
    g.verb?.destroy();
    g.verb = null;
    audio.music('celebrate');
    // chest rewards: bananas, a chance at a hat, egg points
    const rewards = g.rewards.payChest(g.chamberIndex);
    persist();
    g.refreshHudCounts();
    g.pendingEcho = !g.isEcho && g.rng.chance(BALANCE.echoDoorChance);
    g.isEcho = false;

    if (g.duel) { g.duel.chamberDone(); return; }

    hud.showHud(false);
    screens.showResult({
      rewards,
      onNext: () => g.afterResult(() => {
        if (g.pendingEcho) { g.pendingEcho = false; g.isEcho = true; }
        this.runChamber();
      }),
      onHome: () => g.afterResult(() => g.startHub()),
    });
  }

  useHint() {
    const g = this.game;
    if (!g.verb || !g.problem) return;
    g.usedHint = true;
    g.verb.hintShown = true;
    audio.sfx('click');
    const shown = g.verb.showModel();
    if (!shown) hud.showModelPanel(g.problem.model);
    this.helperSay(t('hint.look'), 3600);
  }

  // Debug/test surface: jump straight into a chamber for a forced skill/kind.
  debugChamber(skill, kind) {
    const g = this.game;
    const p = ensureHostable(
      nextProblem(g.profile.math, { skill, kind, rng: g.rng, now: Date.now() }),
      g.profile.math, { rng: g.rng, now: Date.now() },
    );
    g.currentWorld = p.world;
    g.mode = 'chamber';
    screens.closeScreen();
    g.solvedInChamber = 0;
    this.buildChamber(p);
    hud.showHud(true);
    hud.showHintButton(true);
    this.presentProblem(p);
    audio.music(p.world ? `chamber:${p.world}` : 'chamber');
    return { kind: p.kind, eq: p.equation, skill: p.skillId };
  }

  // ---------- chamber frame work (ticked from Game.update) ----------

  // Crab bumps: a crab sharing the player's cell yoinks a few bananas, scatters
  // them as recoverable pickups, shakes the camera, and knocks the player back.
  updateChamber(dt) {
    const g = this.game;
    if (g.mode !== 'chamber' || !g.player || g.player.locked) return;
    for (const crab of g.crabs) {
      // carrying an answer stone keeps you safe — crabs still amble about, they
      // just won't snatch while you're focused on reaching the altar
      if (crab.frozen || crab.cooldown > 0 || g.player.carrying) continue;
      if (crab.x === g.player.x && crab.z === g.player.z) {
        crab.cooldown = 2200;
        const steal = Math.min(BALANCE.crabSteal, g.profile.bananas);
        if (steal > 0) {
          addBananas(g.profile, -steal);
          g.refreshHudCounts();
          floatLabel(g.world, g.player.mesh.position.clone(), `-${steal} 🍌`, '#c2497a');
          // the crab SCATTERS the bananas nearby — they can all be grabbed
          // back, so the yoink is playful, never a real loss
          for (let i = 0; i < steal; i++) {
            const fx = g.player.x + g.rng.int(-3, 3);
            const fz = g.player.z + g.rng.int(-3, 3);
            const c = g.place.cellAt(fx, fz);
            const spot = (c && c.walk && !(fx === g.player.x && fz === g.player.z))
              ? { x: fx, z: fz }
              : g.avatar.findFreeNear(g.player.x, g.player.z);
            if (spot) this.spawnBananaPickup(spot.x, spot.z);
          }
        }
        audio.sfx('crab');
        g.world.shake(0.12);
        hud.say(t('play.crab_yoink', { n: steal }), { transient: true, ms: 2200, face: '🦀' });
        // knockback to a free neighbor
        const free = g.avatar.findFreeNear(g.player.x, g.player.z);
        if (free) g.player.pathTo(free.x, free.z);
      }
    }
  }

  // ---------- scattered banana pickups (crab yoinks are recoverable) ----------

  spawnBananaPickup(x, z) {
    const place = this.game.place;
    const mesh = makeProp(PROPS.bananas, 0.32, 'prop:bananas', { castShadow: false });
    const base = place.worldPos(x, z, 0.08);
    mesh.position.copy(base);
    place.group.add(mesh);
    const pu = {
      x, z, mesh, t: Math.random() * 6,
      update: (dt) => {
        pu.t += dt / 1000;
        mesh.position.y = base.y + 0.06 + Math.abs(Math.sin(pu.t * 3)) * 0.07;
        mesh.rotation.y += dt * 0.002;
      },
    };
    place.addEntity(pu);
    this.game.pickups.push(pu);
  }

  collectPickupAt(x, z) {
    const place = this.game.place;
    const i = this.game.pickups.findIndex((p) => p.x === x && p.z === z);
    if (i < 0) return;
    const pu = this.game.pickups.splice(i, 1)[0];
    place.group.remove(pu.mesh);
    const ei = place.entities.indexOf(pu);
    if (ei >= 0) place.entities.splice(ei, 1);
    this.onTreat('bananas', 1, pu.mesh.position.clone());
  }
}
