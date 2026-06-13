// Banana Duel: hot-seat pass-and-play + seeded challenge codes (no server).
// Fairness: each round's problems are pre-generated from a neutral math state
// with a shared seed, so both players face IDENTICAL chambers. Answers are
// still recorded into each player's real profile (duel practice counts).
import { createMathState, nextProblem, recordResult } from './mathengine.js';
import { ensureHostable } from './chamber.js';
import { profiles, selectProfile } from './state.js';
import { t } from './i18n.js';
import { Rng } from './rng.js';
import { audio } from './audio.js';
import { BALANCE } from './config.js';
import { esc } from './screens.js';

const $ = (id) => document.getElementById(id);
const host = () => $('screens');
const WORLD_EMOJI = { tide: '🌊', garden: '🌱', stump: '🥥', vines: '🍇' };
const ROUNDS = 3;

function render(html) {
  host().innerHTML = `<div class="screen opaque">${html}</div>`;
  return host().firstElementChild;
}

// Pre-generate identical problem sets: rounds × problemsPerChamber.
export function generateDuelProblems(seed, world, rounds = ROUNDS) {
  const out = [];
  for (let r = 0; r < rounds; r++) {
    const math = createMathState();
    const rng = new Rng(seed * 31 + r * 7 + 1);
    const probs = [];
    for (let i = 0; i < BALANCE.problemsPerChamber; i++) {
      // all problems in a round share the first problem's kind so the chamber
      // can host them all — keeps duels deterministic (no mid-round rerolls)
      const opts = i > 0 ? { world, rng, kind: probs[0].kind } : { world, rng };
      let p = ensureHostable(nextProblem(math, opts), math, { world, rng });
      if (i > 0 && p.kind !== probs[0].kind) {
        p = ensureHostable(
          nextProblem(math, { world, rng, kind: 'fetch', skill: p.skillId }),
          math, { world, rng },
        );
      }
      probs.push(p);
      // advance the neutral state so the round ramps a little
      recordResult(math, p, { correct: true, usedHint: false, ms: 4000 });
    }
    out.push(probs);
  }
  return out;
}

export class Duel {
  constructor(game, playerIds, world, seed, { soloChallenge = false, code = null } = {}) {
    this.game = game;
    this.world = world;
    this.seed = seed;
    this.code = code;
    this.solo = soloChallenge;
    this.players = playerIds.map((id) => ({
      id, name: profiles().find((p) => p.id === id)?.name || '?', score: 0,
    }));
    this.roundsProblems = generateDuelProblems(seed, world);
    this.round = 0;       // 0-based
    this.turn = 0;        // index into players
    this.queue = [];
    this.rng = new Rng(seed ^ 0x5eed);
  }

  start() { this._interstitial(); }

  _interstitial() {
    const pl = this.players[this.turn];
    const el = render(`
      <div style="flex:1"></div>
      <h2>⚔️ ${t('duel.title')}</h2>
      <div class="card" style="text-align:center">
        <div style="font-size:42px">${this.turn === 0 ? '🐵' : '🙈'}</div>
        <div style="font-size:22px;font-weight:900;margin:8px 0">${t('duel.turn', { name: esc(pl.name) })}</div>
        <div style="color:var(--ink-soft);font-weight:700">${t('duel.round', { n: this.round + 1, total: this.roundsProblems.length })}</div>
        <div style="margin-top:8px">${this.players.map((p) => `<span style="margin:0 8px;font-weight:900">${esc(p.name)}: 🍌 ${p.score}</span>`).join('')}</div>
      </div>
      <button class="btn green" id="duel-go">${t('title.start')}</button>
      <div style="flex:2"></div>
    `);
    el.querySelector('#duel-go').addEventListener('click', () => {
      audio.sfx('click');
      this._playTurn();
    });
  }

  _playTurn() {
    const pl = this.players[this.turn];
    this.queue = this.roundsProblems[this.round].slice();
    const g = this.game;
    g.profile = selectProfile(pl.id);
    g.duel = this;
    g.currentWorld = this.world;
    g.combo = 0;
    g.chamberIndex = this.round;
    g.refreshHudCounts();
    g.runChamber();
  }

  nextProblem() { return this.queue.shift(); }
  hasMore() { return this.queue.length > 0; }

  scoreCorrect(combo) {
    const pl = this.players[this.turn];
    pl.score += 10 + Math.min(10, (combo - 1) * 2);
  }

  scoreWrong() { /* no penalty — kindness everywhere */ }

  chamberDone() {
    const g = this.game;
    g.duel = null; // detach while showing screens
    if (!this.solo && this.turn < this.players.length - 1) {
      this.turn++;
      const next = this.players[this.turn];
      const el = render(`
        <div style="flex:1"></div>
        <div class="card" style="text-align:center">
          <div style="font-size:42px">🔄</div>
          <div style="font-size:22px;font-weight:900">${t('duel.pass', { name: esc(next.name) })}</div>
        </div>
        <button class="btn green" id="duel-go">${t('ui.ok')}</button>
        <div style="flex:2"></div>
      `);
      el.querySelector('#duel-go').addEventListener('click', () => this._interstitial());
      return;
    }
    this.turn = 0;
    this.round++;
    if (this.round < this.roundsProblems.length) {
      this._interstitial();
      return;
    }
    this._finish();
  }

  _finish() {
    const g = this.game;
    let html;
    if (this.solo) {
      const me = this.players[0];
      html = `
        <div style="flex:1"></div>
        <h2>🏁 ${t('duel.title')}</h2>
        <div class="card" style="text-align:center">
          <div style="font-size:48px">🍌</div>
          <div style="font-size:26px;font-weight:900">${esc(me.name)}: ${me.score}</div>
          ${this.code ? `<div style="margin-top:10px;font-weight:700;color:var(--ink-soft)">${t('duel.code')}: <b>${this.code}</b></div>` : ''}
        </div>
        <button class="btn green" id="duel-done">🏝️ ${t('result.home')}</button>
        <div style="flex:2"></div>`;
    } else {
      const [a, b] = this.players;
      const winner = a.score === b.score ? null : (a.score > b.score ? a : b);
      audio.sfx('chest');
      html = `
        <div style="flex:1"></div>
        <h2>🏆 ${t('duel.title')}</h2>
        <div class="card" style="text-align:center">
          <div style="font-size:48px">${winner ? '🏆' : '🤝'}</div>
          <div style="font-size:22px;font-weight:900;margin:8px 0">
            ${winner ? t('duel.winner', { name: esc(winner.name), score: winner.score }) : t('duel.tie')}
          </div>
          <div>${this.players.map((p) => `<span style="margin:0 8px;font-weight:800">${esc(p.name)}: 🍌 ${p.score}</span>`).join('')}</div>
        </div>
        <button class="btn green" id="duel-done">${t('ui.ok')}</button>
        <div style="flex:2"></div>`;
    }
    const el = render(html);
    el.querySelector('#duel-done').addEventListener('click', () => g.showTitle());
  }
}

// ---------- codes: W R SEED in base36, e.g. "G3-K7QZ2" ----------

export function makeCode(world, seed) {
  const w = { tide: 'T', garden: 'G', stump: 'S', vines: 'V' }[world] || 'G';
  return `${w}${ROUNDS}-${seed.toString(36).toUpperCase()}`;
}

export function parseCode(code) {
  const m = String(code).trim().toUpperCase().match(/^([TGSV])(\d)-([0-9A-Z]+)$/);
  if (!m) return null;
  const world = { T: 'tide', G: 'garden', S: 'stump', V: 'vines' }[m[1]];
  const seed = parseInt(m[3], 36);
  if (!world || !Number.isFinite(seed)) return null;
  return { world, seed };
}

// ---------- setup screen ----------

export function showDuelSetup(game) {
  const ps = profiles();
  let picked = [];
  let world = 'garden';
  const draw = () => {
    const el = render(`
      <button class="round-btn screen-close" id="duel-back">✖️</button>
      <h2>⚔️ ${t('duel.title')}</h2>
      <div class="tagline">${t('duel.sub')}</div>
      <div class="card">
        <h3>${t('duel.pick2')}</h3>
        <div class="tile-grid">
          ${ps.map((p) => `
            <div class="tile pressable ${picked.includes(p.id) ? 'equipped' : ''}" data-pid="${p.id}">
              <div class="t-icon">🐵</div><div class="t-name">${esc(p.name)}</div>
            </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="menu-row">
          ${Object.entries(WORLD_EMOJI).map(([w, e]) =>
            `<button class="btn soft" data-world="${w}" ${w === world ? 'style="outline:4px solid var(--sun)"' : ''}>${e} ${t('world.' + w)}</button>`).join('')}
        </div>
      </div>
      <div class="menu-row">
        <button class="btn green" id="duel-start" ${picked.length === 2 ? '' : 'disabled'}>⚔️ ${t('title.start')}</button>
      </div>
      <div class="card">
        <h3>🔗 ${t('duel.code')}</h3>
        <div style="font-size:14px;color:var(--ink-soft);font-weight:700;margin-bottom:8px">${t('duel.code_desc')}</div>
        <div class="menu-row">
          <button class="btn soft" id="code-make">✨ ${t('duel.code')}</button>
          <input id="code-in" placeholder="${t('duel.enter_code')}" maxlength="12"
            style="font-family:inherit;font-size:17px;font-weight:800;padding:10px 14px;border-radius:14px;border:3px solid var(--cream-2);pointer-events:auto;user-select:text;width:170px;text-transform:uppercase">
          <button class="btn soft" id="code-play">▶️ ${t('duel.play_code')}</button>
        </div>
        <div id="code-out" style="margin-top:10px;font-size:24px;font-weight:900;text-align:center"></div>
      </div>
    `);
    el.querySelector('#duel-back').addEventListener('click', () => game.showTitle());
    for (const tile of el.querySelectorAll('[data-pid]')) {
      tile.addEventListener('click', () => {
        const id = tile.dataset.pid;
        picked = picked.includes(id) ? picked.filter((x) => x !== id) : [...picked, id].slice(-2);
        audio.sfx('click');
        draw();
      });
    }
    for (const b of el.querySelectorAll('[data-world]')) {
      b.addEventListener('click', () => { world = b.dataset.world; audio.sfx('click'); draw(); });
    }
    el.querySelector('#duel-start').addEventListener('click', () => {
      const seed = (Math.random() * 2 ** 30) >>> 0;
      new Duel(game, picked, world, seed).start();
    });
    el.querySelector('#code-make').addEventListener('click', () => {
      const seed = (Math.random() * 2 ** 30) >>> 0;
      const code = makeCode(world, seed);
      el.querySelector('#code-out').textContent = code;
      el.querySelector('#code-in').value = code;
      audio.sfx('sparkle');
    });
    el.querySelector('#code-play').addEventListener('click', () => {
      const parsed = parseCode(el.querySelector('#code-in').value);
      if (!parsed) { audio.sfx('boop'); return; }
      const me = picked[0] || game.profile?.id || ps[0]?.id;
      if (!me) return;
      new Duel(game, [me], parsed.world, parsed.seed, {
        soloChallenge: true, code: makeCode(parsed.world, parsed.seed),
      }).start();
    });
  };
  draw();
}
