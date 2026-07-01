// Music-stage overlays: the song menu and the three song panels (Echo Song, Counting
// Song, Beat Bar). Like the business panels, these only build prompts + controls and
// submit the exact `action` shape the engine grades — grading lives in src/stage/engine.js
// (gradeStageRound). A wrong answer keeps the panel open and reveals a gentle hint.
import { render, backBtn, esc } from './core.js';
import { t } from '../i18n.js';
import { ECHO_PADS, NOTE_TILES } from '../stage/data.js';

// The song menu: every song, playable ones tappable, locked ones showing their grade.
export function showStageSongs({ songs, gradeLabel, onPlay, onExit }) {
  const el = render(`
    <div class="business-panel">
      <div class="business-head">
        <h2>${t('stage.songs')}</h2>
        <button class="round-btn" id="stage-close" aria-label="${esc(t('nav.close'))}">✖️</button>
      </div>
      <div class="card">
        ${songs.map((song) => `
          <div class="skill-row">
            <div class="t-icon">${esc(song.face)}</div>
            <div class="s-name">${t(song.titleKey)}<div class="tagline">${t(song.titleKey + '.desc')}</div></div>
            ${song.unlocked
              ? `<button class="btn green" data-song="${esc(song.id)}">${t('stage.play')}</button>`
              : `<div class="curriculum-count">🔒 ${t('stage.locked', { grade: gradeLabel(song.unlocksStage) })}</div>`}
          </div>`).join('')}
      </div>
    </div>
  `, 'business-screen');
  for (const btn of el.querySelectorAll('[data-song]')) {
    btn.addEventListener('click', () => onPlay?.(btn.dataset.song));
  }
  el.querySelector('#stage-close').addEventListener('click', onExit);
}

// Shared wiring: the 💡 hint + Done button, with a wrong answer keeping the panel open
// and revealing a mode-specific nudge (onSubmit returns { correct }). Mirrors the business
// panels so the two minigames feel the same.
function wireStagePanel(el, { round, action, submit, onSubmit, onClose }) {
  el.querySelector('#scr-back').addEventListener('click', onClose);
  const feedback = el.querySelector('#stage-feedback');
  const reveal = (msg) => { feedback.textContent = msg; feedback.hidden = false; };
  const hint = () => t('stage.hint.' + round.mode);
  el.querySelector('#stage-hint').addEventListener('click', () => reveal(hint()));
  el.querySelector('#stage-done').addEventListener('click', () => {
    const res = onSubmit?.(submit());
    if (res && res.correct === false && !res.handled) reveal(`${t('stage.almost')} ${hint()}`);
  });
  return { reveal };
}

function panelShell(mode, prompt, controls) {
  return render(`
    ${backBtn(null, '←')}
    <h2>${t('stage.song.' + mode)}</h2>
    <div class="card">
      <p class="business-prompt">${esc(prompt)}</p>
      ${controls}
      <div class="stage-feedback business-feedback" id="stage-feedback" hidden></div>
      <div class="menu-row">
        <button class="btn soft" id="stage-hint">💡</button>
        <button class="btn green" id="stage-done">${t('stage.done')}</button>
      </div>
    </div>
  `);
}

// Echo Song: watch Kiki's pattern (Listen), then tap the pads back in order.
export function showStageEcho({ round, onNote, onSubmit, onClose }) {
  const action = { sequence: [] };
  const el = panelShell('echo', t('stage.echo.prompt'), `
    <div class="menu-row">
      <button class="btn soft" id="stage-listen">${t('stage.listen')}</button>
      <button class="btn soft" id="stage-clear">${t('stage.clear')}</button>
    </div>
    <div class="stage-pads">
      ${ECHO_PADS.map((pad) => `
        <button class="stage-pad" data-pad="${pad.id}" style="--pad:${pad.color}" aria-label="pad ${pad.id + 1}">
          <span class="stage-pad-label">${pad.id + 1}</span>
        </button>`).join('')}
    </div>
    <div class="tagline"><span id="stage-echo-count">0</span> / ${round.length}</div>
  `);
  const pads = [...el.querySelectorAll('[data-pad]')];
  const countLabel = el.querySelector('#stage-echo-count');
  const flash = (i) => {
    const pad = pads[i];
    if (!pad) return;
    pad.classList.add('lit');
    setTimeout(() => pad.classList.remove('lit'), 240);
  };
  // Listen: play Kiki's sequence with light + sound, one note every 520ms.
  el.querySelector('#stage-listen').addEventListener('click', () => {
    round.sequence.forEach((note, i) => setTimeout(() => { flash(note); onNote?.(note); }, 180 + i * 520));
  });
  el.querySelector('#stage-clear').addEventListener('click', () => {
    action.sequence = [];
    countLabel.textContent = '0';
  });
  for (const pad of pads) {
    pad.addEventListener('click', () => {
      const i = Number(pad.dataset.pad);
      action.sequence.push(i);
      countLabel.textContent = String(action.sequence.length);
      flash(i);
      onNote?.(i);
    });
  }
  wireStagePanel(el, { round, action, submit: () => ({ sequence: [...action.sequence] }), onSubmit, onClose });
}

// Counting Song: ring the gong on every beat that is a multiple of `step`. A "Count"
// metronome walks 1..N so the child can HEAR and SEE the skip-count rhythm (a marimba
// accent + gong pulse on each multiple) — an opt-in aid that never reveals the answer
// as a persistent marker, so the exercise itself stays intact (P2-6/P2-8).
export function showStageCount({ round, onNote, onCount, onSubmit, onClose }) {
  const chosen = new Set();
  const el = panelShell('count', t('stage.count.prompt', { step: round.step }), `
    <div class="stage-beats">
      ${Array.from({ length: round.beats }, (_, k) => k + 1).map((n) => `
        <button class="stage-beat" data-beat="${n}">${n}</button>`).join('')}
    </div>
    <div class="menu-row"><button class="btn soft" id="stage-count-play">▶ ${t('stage.count.play')}</button></div>
  `);
  const beatBtns = [...el.querySelectorAll('[data-beat]')];
  for (const btn of beatBtns) {
    btn.addEventListener('click', () => {
      const n = Number(btn.dataset.beat);
      if (chosen.has(n)) { chosen.delete(n); btn.classList.remove('equipped'); } else {
        chosen.add(n); btn.classList.add('equipped'); onNote?.(n % 4);
      }
    });
  }
  // The metronome: step a transient highlight through the beats, sounding each count.
  let counting = false;
  el.querySelector('#stage-count-play').addEventListener('click', () => {
    if (counting) return;
    counting = true;
    let k = 0;
    const tick = () => {
      if (k > 0) beatBtns[k - 1]?.classList.remove('counting');
      if (k >= round.beats || !el.isConnected) { counting = false; return; }
      k += 1;
      beatBtns[k - 1]?.classList.add('counting');
      onCount?.(k, k % round.step === 0);
      setTimeout(tick, 380);
    };
    tick();
  });
  wireStagePanel(el, { round, action: chosen, submit: () => ({ beats: [...chosen] }), onSubmit, onClose });
}

// A small drawn note glyph: a pie showing this note's fraction of a whole bar. The old
// Unicode music symbols (𝅗𝅥 𝅘𝅥𝅮 …) rendered inconsistently across fonts; drawing the
// fraction magnitude instead is font-proof AND quietly reinforces what a 1/4 note *is*.
function noteGlyph(num, den) {
  const r = 11, cx = 13, cy = 13, frac = num / den;
  if (frac >= 1) {
    return `<svg class="note-glyph" viewBox="0 0 26 26" aria-hidden="true"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#f6a609" stroke="#00000022"/></svg>`;
  }
  const a = frac * 2 * Math.PI;
  const ex = (cx + r * Math.sin(a)).toFixed(2);
  const ey = (cy - r * Math.cos(a)).toFixed(2);
  const large = frac > 0.5 ? 1 : 0;
  return `<svg class="note-glyph" viewBox="0 0 26 26" aria-hidden="true">`
    + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="#00000022"/>`
    + `<path d="M${cx},${cy} L${cx},${cy - r} A${r},${r} 0 ${large},1 ${ex},${ey} Z" fill="#f6a609"/>`
    + `</svg>`;
}

// A running units total (in 24ths) shown as a reduced fraction: 0, 1/2, 3/4, … , 1 (whole).
function fractionLabel(units, whole) {
  if (units <= 0) return '0';
  if (units >= whole) return t('stage.beat.whole');
  const g = ((a, b) => { while (b) { [a, b] = [b, a % b]; } return a; })(units, whole);
  return `${units / g}/${whole / g}`;
}

// Beat Bar: choose note values that add up to exactly one whole bar (fraction addition).
export function showStageBeat({ round, onNote, onSubmit, onClose }) {
  const action = { tiles: [] };
  const el = panelShell('beat', t('stage.beat.prompt'), `
    <div class="stage-bar"><div class="stage-bar-fill" id="stage-bar-fill" style="width:0%"></div></div>
    <div class="business-price">${t('stage.beat.total')}: <span id="stage-beat-total">0</span> / ${t('stage.beat.whole')}</div>
    <div class="stage-notes">
      ${round.tiles.map((id) => `
        <button class="tile pressable" data-note="${esc(id)}">
          <div class="t-icon">${noteGlyph(NOTE_TILES[id].num, NOTE_TILES[id].den)}</div>
          <div class="t-name">${NOTE_TILES[id].num}/${NOTE_TILES[id].den}</div>
        </button>`).join('')}
    </div>
    <div class="menu-row"><button class="btn soft" id="stage-clear">${t('stage.clear')}</button></div>
  `);
  const totalLabel = el.querySelector('#stage-beat-total');
  const fill = el.querySelector('#stage-bar-fill');
  const refresh = () => {
    const units = action.tiles.reduce((sum, id) => sum + NOTE_TILES[id].units, 0);
    totalLabel.textContent = fractionLabel(units, round.target);
    fill.style.width = `${Math.min(100, Math.round((units / round.target) * 100))}%`;
  };
  for (const btn of el.querySelectorAll('[data-note]')) {
    btn.addEventListener('click', () => { action.tiles.push(btn.dataset.note); refresh(); onNote?.(action.tiles.length); });
  }
  el.querySelector('#stage-clear').addEventListener('click', () => { action.tiles = []; refresh(); });
  wireStagePanel(el, { round, action, submit: () => ({ tiles: [...action.tiles] }), onSubmit, onClose });
}
