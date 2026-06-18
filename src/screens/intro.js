// Intro flow overlays: the attract loop, the title / player-select, the story
// pages, and the Crab King finale.
import { render, esc } from './core.js';
import { t, setLang } from '../i18n.js';
import { languageButton } from '../langFlags.js';
import { audio } from '../audio.js';
import { profiles, settings, createProfile, deleteProfile, persistNow } from '../state.js';
import { listPacks } from '../curriculum/index.js';
import { curriculumPackLabel } from './parents.js';

// ---------- title ----------

export function showAttract({ onStart, onParents, onDuel }) {
  const ps = profiles();
  const s = settings();
  const beats = [
    ['🌱', t('attract.beat.garden')],
    ['🥥', t('attract.beat.share')],
    ['🥚', t('attract.beat.pets')],
    ['💎', t('attract.beat.gems')],
    ['🌈', t('attract.beat.bloom')],
  ];
  // the live island renders on the game canvas underneath; this overlay is
  // deliberately sparse — a logo up top, one promise at a time + the start
  // button down low, and the whole screen is the button
  const logo = ['🐵', 'Monkey', 'Grove', '🍌']
    .map((w, i) => `<span class="lw" style="--d:${i}"><span>${w}</span></span>`).join(' ');
  const el = render(`
    <div class="attract-shell" role="button" tabindex="0" aria-label="${t('attract.cta')}">
      <div class="attract-top">
        <h1 class="attract-logo">${logo}</h1>
        <div class="attract-tagline">${t('attract.tagline')}</div>
      </div>

      <div class="attract-bottom">
        <div class="attract-ticker"><span id="attract-beat"><span class="bi">${beats[0][0]}</span>${beats[0][1]}</span></div>
        <button class="btn green attract-start" id="attract-start">▶ ${t('attract.cta')}</button>
        <div class="attract-prompt">${t('attract.prompt')}</div>
        <div class="menu-row attract-menu" id="attract-menu">
          <div class="lang-toggle">
            ${languageButton('en', s.lang)}
            ${languageButton('nl', s.lang)}
          </div>
          ${ps.length >= 2 ? `<button class="btn soft" id="btn-duel">⚔️ ${t('title.duel')}</button>` : ''}
          <button class="btn soft" id="btn-parents">${t('title.parents')}</button>
        </div>
      </div>
    </div>
  `);
  el.classList.add('attract-screen');

  let closed = false;
  let padFrame = null;
  let beatI = 0;
  const beatEl = el.querySelector('#attract-beat');
  const ticker = setInterval(() => {
    beatI = (beatI + 1) % beats.length;
    beatEl.classList.add('swap');
    setTimeout(() => {
      if (closed) return;
      beatEl.innerHTML = `<span class="bi">${beats[beatI][0]}</span>${beats[beatI][1]}`;
      beatEl.classList.remove('swap');
    }, 240);
  }, 2600);
  const stop = () => {
    if (closed) return;
    closed = true;
    clearInterval(ticker);
    window.removeEventListener('keydown', onKey);
    if (padFrame) cancelAnimationFrame(padFrame);
  };
  const start = () => {
    if (closed) return;
    stop();
    audio.init();
    audio.setSfx(settings().sfx);
    audio.setMusic(settings().music);
    audio.music('title'); // intro theme; carries through player-select + story until the hub
    audio.sfx('correct');
    onStart();
  };
  const onKey = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      start();
    }
  };
  const pollGamepad = () => {
    if (closed) return;
    const pads = globalThis.navigator?.getGamepads?.() || [];
    for (const pad of pads) {
      if (pad?.buttons?.[9]?.pressed || pad?.buttons?.[0]?.pressed) {
        start();
        return;
      }
    }
    padFrame = requestAnimationFrame(pollGamepad);
  };

  window.addEventListener('keydown', onKey);
  pollGamepad();
  el.querySelector('#attract-start').addEventListener('click', start);
  // the whole screen starts the game — the menu row is the only island of
  // "not yet" (clicks there must not bubble into start)
  el.querySelector('.attract-shell').addEventListener('click', start);
  el.querySelector('#attract-menu').addEventListener('click', (e) => e.stopPropagation());
  for (const b of el.querySelectorAll('[data-lang]')) {
    b.addEventListener('click', () => {
      audio.sfx('click');
      setLang(b.dataset.lang);
      persistNow();
      stop();
      showAttract({ onStart, onParents, onDuel });
    });
  }
  el.querySelector('#btn-parents')?.addEventListener('click', () => {
    audio.sfx('click');
    stop();
    onParents();
  });
  el.querySelector('#btn-duel')?.addEventListener('click', () => {
    audio.sfx('click');
    stop();
    onDuel();
  });
}

export function showTitle({ onPlay, onParents, onDuel }) {
  const ps = profiles();
  const s = settings();
  const packs = listPacks();
  const el = render(`
    <h1>🐵 Monkey Grove 🍌</h1>
    <div class="tagline">${t('title.tagline')}</div>
    <div class="card">
      <h3>${t('title.who')}</h3>
      <div class="tile-grid" id="profile-grid">
        ${ps.map((p) => `
          <div class="tile pressable" data-pid="${p.id}">
            <div class="t-icon">🐵</div>
            <div class="t-name">${esc(p.name)}</div>
            <div class="t-price">🍌 ${p.bananas} · 🔥 ${p.streak.count}</div>
          </div>`).join('')}
        <div class="tile pressable" id="tile-new">
          <div class="t-icon">✨</div>
          <div class="t-name">${t('title.new_player')}</div>
        </div>
      </div>
      <div id="new-player-row" class="new-player-form hidden">
        <input id="new-name" maxlength="14" placeholder="${t('title.name_prompt')}"
          style="flex:1;font-family:inherit;font-size:18px;font-weight:700;padding:10px 14px;border-radius:14px;border:3px solid var(--cream-2);pointer-events:auto;user-select:text">
        <input id="new-age" type="number" min="4" max="13" inputmode="numeric" placeholder="${t('title.age_prompt')}"
          style="width:140px;font-family:inherit;font-size:18px;font-weight:700;padding:10px 14px;border-radius:14px;border:3px solid var(--cream-2);pointer-events:auto;user-select:text">
        <input id="new-birth-date" type="date" aria-label="${esc(t('title.birthday_prompt'))}"
          style="min-width:168px;font-family:inherit;font-size:16px;font-weight:700;padding:10px 14px;border-radius:14px;border:3px solid var(--cream-2);pointer-events:auto;user-select:text">
        <select id="new-pack" aria-label="${esc(t('title.curriculum_prompt'))}"
          style="min-width:220px;font-family:inherit;font-size:16px;font-weight:700;padding:10px 14px;border-radius:14px;border:3px solid var(--cream-2);pointer-events:auto">
          ${packs.map((pack) => `<option value="${esc(pack.id)}">${esc(curriculumPackLabel(pack))}</option>`).join('')}
        </select>
        <button class="btn green" id="new-go">${t('title.start')}</button>
        <div class="form-help">${t('title.age_help')} ${t('title.birthday_help')} ${t('title.curriculum_help')}</div>
      </div>
    </div>
    <div class="menu-row">
      <div class="lang-toggle">
        ${languageButton('en', s.lang)}
        ${languageButton('nl', s.lang)}
      </div>
      ${ps.length >= 2 ? `<button class="btn soft" id="btn-duel">⚔️ ${t('title.duel')}</button>` : ''}
      <button class="btn soft" id="btn-parents">${t('title.parents')}</button>
    </div>
  `);
  for (const tile of el.querySelectorAll('[data-pid]')) {
    tile.addEventListener('click', () => { audio.sfx('click'); onPlay(tile.dataset.pid); });
    // long-press to delete
    let timer = null;
    tile.addEventListener('pointerdown', () => {
      timer = setTimeout(() => {
        if (confirm(t('ui.confirm_delete'))) { deleteProfile(tile.dataset.pid); showTitle({ onPlay, onParents, onDuel }); }
      }, 900);
    });
    for (const ev of ['pointerup', 'pointerleave']) tile.addEventListener(ev, () => clearTimeout(timer));
  }
  el.querySelector('#tile-new').addEventListener('click', () => {
    el.querySelector('#new-player-row').classList.remove('hidden');
    el.querySelector('#new-name').focus();
  });
  const go = () => {
    const name = el.querySelector('#new-name').value.trim() || 'Monkey';
    const ageValue = Number(el.querySelector('#new-age').value);
    const age = Number.isFinite(ageValue) && ageValue >= 4 && ageValue <= 13 ? ageValue : null;
    const birthDate = el.querySelector('#new-birth-date').value;
    const packId = el.querySelector('#new-pack').value;
    const p = createProfile(name, { age, birthDate, packId });
    audio.sfx('correct');
    onPlay(p.id, true);
  };
  el.querySelector('#new-go').addEventListener('click', go);
  el.querySelector('#new-name').addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
  el.querySelector('#new-age').addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
  el.querySelector('#new-birth-date').addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
  for (const b of el.querySelectorAll('[data-lang]')) {
    b.addEventListener('click', () => {
      setLang(b.dataset.lang); persistNow();
      showTitle({ onPlay, onParents, onDuel });
    });
  }
  el.querySelector('#btn-parents')?.addEventListener('click', onParents);
  el.querySelector('#btn-duel')?.addEventListener('click', onDuel);
}

// ---------- story intro ----------

export function showStory(onDone) {
  let step = 0;
  const lines = [t('story.1'), t('story.2'), t('story.3')];
  const faces = ['🦀', '🐵', '🌴'];
  const el = render(`
    <div style="flex:1"></div>
    <div class="card" style="text-align:center">
      <div id="story-face" style="font-size:64px">${faces[0]}</div>
      <div id="story-text" style="font-size:20px;font-weight:700;line-height:1.4;min-height:64px">${lines[0]}</div>
    </div>
    <button class="btn green" id="story-next">${t('ui.ok')} →</button>
    <div style="flex:2"></div>
  `);
  el.querySelector('#story-next').addEventListener('click', () => {
    audio.sfx('click');
    step++;
    if (step >= lines.length) { onDone(); return; }
    el.querySelector('#story-face').textContent = faces[step];
    el.querySelector('#story-text').innerHTML = lines[step];
    if (step === lines.length - 1) el.querySelector('#story-next').textContent = t('title.start') + ' 🍌';
  });
}

// The Crab King interrupts the plaza funding: apology + he pays half.
export function showFinale(onDone) {
  let step = 0;
  const lines = [t('finale.1'), t('finale.2'), t('finale.3'), t('finale.4')];
  const faces = ['🦀', '🦀', '🦀', '🐵'];
  const el = render(`
    <div style="flex:1"></div>
    <div class="card" style="text-align:center">
      <div id="story-face" style="font-size:64px">${faces[0]}</div>
      <div id="story-text" style="font-size:20px;font-weight:700;line-height:1.4;min-height:64px">${lines[0]}</div>
    </div>
    <button class="btn green" id="story-next">${t('ui.ok')} →</button>
    <div style="flex:2"></div>
  `);
  el.querySelector('#story-next').addEventListener('click', () => {
    audio.sfx('click');
    step++;
    if (step >= lines.length) { onDone(); return; }
    el.querySelector('#story-face').textContent = faces[step];
    el.querySelector('#story-text').innerHTML = lines[step];
    if (step === lines.length - 1) el.querySelector('#story-next').textContent = '🎪 ' + t('title.start');
  });
}
