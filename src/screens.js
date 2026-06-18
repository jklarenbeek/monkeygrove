// Full-screen DOM overlays: title, story, settings, shop, pets, gem tree,
// parents, chamber results, duel. One active screen at a time in #screens.
import { t, setLang } from './i18n.js';
import { languageButton } from './langFlags.js';
import { applyComfortSettings, reducedMotion } from './a11y.js';
import { audio } from './audio.js';
import {
  settings, profiles, activeProfile, createProfile, selectProfile, deleteProfile,
  spendBananas, ownItem, equip, persist, persistNow,
} from './state.js';
import { coverageForReport, getPack, listPacks } from './curriculum/index.js';
import { HATS, FURS, TRAILS, PETS } from './models.js';
import { RARITY_STARS, BALANCE } from './config.js';
import { BUSINESS_MODES, INGREDIENTS, RECIPES, UPGRADES } from './business/data.js';

const $ = (id) => document.getElementById(id);
const host = () => $('screens');

export const PET_EMOJI = {
  bunny: '🐰', duckling: '🐥', kitten: '🐱', piglet: '🐷',
  redpanda: '🦊', turtle: '🐢', owl: '🦉', dragon: '🐉',
};
export const HAT_EMOJI = {
  cap: '🧢', bow: '🎀', crown: '👑', flowercrown: '🌸',
  beanie: '🧶', wizard: '🧙‍♂️', pirate: '🏴‍☠️', party: '🥳',
};
const TRAIL_EMOJI = { sparkle: '✨', petal: '🌸', bubble: '🫧', star: '⭐' };
const WORLD_EMOJI = { tide: '🌊', garden: '🌱', stump: '🥥', vines: '🍇' };

export function closeScreen() {
  host().innerHTML = '';
}

function render(html, extraClass = '') {
  const className = ['screen', extraClass].filter(Boolean).join(' ');
  host().innerHTML = `<div class="${className}">${html}</div>`;
  const el = host().firstElementChild;
  // move keyboard/screen-reader focus into the freshly opened screen
  el.tabIndex = -1;
  el.focus?.({ preventScroll: true });
  return el;
}

function backBtn(onBack, label = null) {
  return `<button class="round-btn screen-close" id="scr-back">${label || '✖️'}</button>`;
}

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

export function showWarmup({ problems, onAnswer, onDone, onSkip }) {
  let started = false;
  let finished = false;
  let i = 0;
  let answered = false;

  const finish = (fn) => {
    if (finished) return false;
    finished = true;
    fn?.();
    return true;
  };

  const renderProblem = () => {
    answered = false;
    const problem = problems[i];
    const choices = Array.isArray(problem?.choices) ? problem.choices : [];
    const instruction = problem?.prompt?.key
      ? t(warmupPromptKey(problem.prompt.key), problemPromptVars(problem))
      : t('placement.answer');
    const el = render(`
      <div style="flex:1"></div>
      <h2>${t('placement.title')}</h2>
      <div class="tagline">${t('placement.body')}</div>
      <div class="card placement-card">
        <div class="placement-step">${esc(t('placement.step', { n: i + 1, total: problems.length }))}</div>
        <div class="placement-task">${esc(instruction)}</div>
        <div class="placement-eq">${formatWarmupEquation(problem?.equation || '')}</div>
        <div class="tile-grid">
          ${choices.map((choice) => `
            <button class="tile pressable warmup-choice" data-value="${esc(String(choice.value))}" aria-label="${esc(instruction)} ${esc(String(choice.value))}">
              <div class="t-icon">✨</div>
              <div class="t-name">${esc(String(choice.value))}</div>
              <div class="t-price">${t('placement.answer')}</div>
            </button>
          `).join('')}
        </div>
      </div>
      <div class="menu-row">
        <button class="btn soft" id="warmup-skip">${t('placement.skip')}</button>
      </div>
      <div style="flex:2"></div>
    `);

    for (const btn of el.querySelectorAll('[data-value]')) {
      btn.addEventListener('click', () => {
        if (finished || answered) return;
        answered = true;
        for (const other of el.querySelectorAll('[data-value]')) other.disabled = true;
        const correct = String(btn.dataset.value) === String(problem.answer);
        onAnswer({ problem, correct });
        i += 1;
        if (i >= problems.length) {
          flash(t('placement.done'));
          finish(onDone);
          return;
        }
        renderProblem();
      });
    }
    el.querySelector('#warmup-skip')?.addEventListener('click', () => finish(onSkip));
  };

  const renderIntro = () => {
    const el = render(`
      <div style="flex:1"></div>
      <h2>${t('placement.title')}</h2>
      <div class="tagline">${t('placement.body')}</div>
      <div class="card placement-card">
        <div class="placement-eq"><span class="slot">?</span> <span aria-hidden="true">+</span> <span class="slot">?</span></div>
      </div>
      <div class="menu-row">
        <button class="btn green" id="warmup-start">${t('placement.start')}</button>
        <button class="btn soft" id="warmup-skip">${t('placement.skip')}</button>
      </div>
      <div style="flex:2"></div>
    `);
    el.querySelector('#warmup-start')?.addEventListener('click', () => {
      if (finished || started) return;
      started = true;
      for (const btn of el.querySelectorAll('button')) btn.disabled = true;
      if (!problems.length) {
        finish(onSkip);
        return;
      }
      renderProblem();
    });
    el.querySelector('#warmup-skip')?.addEventListener('click', () => finish(onSkip));
  };

  if (!started || !problems.length) renderIntro();
}

function formatWarmupEquation(equation) {
  return esc(equation)
    .replace(/(\d+)\s*\/\s*(\d+)/g, '<span class="frac"><span class="n">$1</span><span class="d">$2</span></span>')
    .replace(/\?/g, '<span class="slot">?</span>');
}

function problemPromptVars(problem) {
  const v = { ...(problem?.meta || {}), ...(problem?.model?.params || {}), ...(problem?.prompt?.vars || {}) };
  if (v.n !== undefined && v.d !== undefined) v.frac = `${v.n}/${v.d}`;
  v.answer = problem?.answer;
  return v;
}

function warmupPromptKey(promptKey) {
  return ({
    'q.compare': 'warmup.q.compare',
    'q.equiv': 'warmup.q.equiv',
    'q.frac_of': 'warmup.q.frac_of',
    'q.missing': 'warmup.q.missing',
    'q.share_fetch': 'warmup.q.share_fetch',
  })[promptKey] || 'warmup.q.fetch';
}

// ---------- settings ----------

export function showSettings({ onClose, onSwitchPlayer, onLangChange, devTools }) {
  const s = settings();
  const el = render(`
    ${backBtn()}
    <h2>${t('settings.title')}</h2>
    <div class="card">
      <div class="menu-col">
        <div class="menu-row" style="align-items:center">
          <span style="font-weight:800">${t('settings.lang')}</span>
          <div class="lang-toggle">
            ${languageButton('en', s.lang)}
            ${languageButton('nl', s.lang)}
          </div>
        </div>
        <div class="menu-row">
          <button class="btn soft" id="tg-sfx">${s.sfx ? '🔊' : '🔇'} ${t('settings.sfx')}</button>
          <button class="btn soft" id="tg-music">${s.music ? '🎵' : '🚫'} ${t('settings.music')}</button>
        </div>
        <div class="menu-col">
          <button class="btn soft" id="tg-motion" aria-pressed="${reducedMotion()}">${reducedMotion() ? '🐢' : '🏃'} ${t('settings.reduce_motion')}</button>
          <button class="btn soft" id="tg-font" aria-pressed="${!!s.dyslexiaFont}">🔤 ${t('settings.dyslexia_font')}</button>
          <button class="btn soft" id="tg-contrast" aria-pressed="${!!s.highContrast}">${s.highContrast ? '◑' : '○'} ${t('settings.high_contrast')}</button>
        </div>
        <button class="btn soft" id="switch-player">👥 ${t('settings.switch_player')}</button>
        ${devTools?.toggleHtml || ''}
      </div>
    </div>
    ${devTools?.panelHtml || ''}
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
  for (const b of el.querySelectorAll('[data-lang]')) {
    b.addEventListener('click', () => {
      setLang(b.dataset.lang); persistNow(); onLangChange?.();
      showSettings({ onClose, onSwitchPlayer, onLangChange, devTools });
    });
  }
  el.querySelector('#tg-sfx').addEventListener('click', () => {
    s.sfx = !s.sfx; audio.setSfx(s.sfx); persist();
    showSettings({ onClose, onSwitchPlayer, onLangChange, devTools });
  });
  el.querySelector('#tg-music').addEventListener('click', () => {
    s.music = !s.music; audio.setMusic(s.music); persist();
    showSettings({ onClose, onSwitchPlayer, onLangChange, devTools });
  });
  el.querySelector('#tg-motion').addEventListener('click', () => {
    s.reduceMotion = !reducedMotion(); applyComfortSettings(); persist();
    showSettings({ onClose, onSwitchPlayer, onLangChange, devTools });
  });
  el.querySelector('#tg-font').addEventListener('click', () => {
    s.dyslexiaFont = !s.dyslexiaFont; applyComfortSettings(); persist();
    showSettings({ onClose, onSwitchPlayer, onLangChange, devTools });
  });
  el.querySelector('#tg-contrast').addEventListener('click', () => {
    s.highContrast = !s.highContrast; applyComfortSettings(); persist();
    showSettings({ onClose, onSwitchPlayer, onLangChange, devTools });
  });
  el.querySelector('#switch-player').addEventListener('click', onSwitchPlayer);
  el.querySelector('#settings-extra-toggle')?.addEventListener('click', () => devTools?.onToggle?.(!devTools.open));
  for (const btn of el.querySelectorAll('[data-settings-preset]')) {
    btn.addEventListener('click', () => devTools?.onApply?.(btn.dataset.settingsPreset));
  }
  el.querySelector('#settings-manual-devtools')?.addEventListener('submit', (e) => {
    e.preventDefault();
    devTools?.onManual?.({
      bananas: el.querySelector('#dev-bananas')?.value,
      stage: el.querySelector('#dev-stage')?.value,
      buildCount: el.querySelector('#dev-build-count')?.value,
      worlds: {
        tide: el.querySelector('#dev-tide')?.value,
        garden: el.querySelector('#dev-garden')?.value,
        stump: el.querySelector('#dev-stump')?.value,
        vines: el.querySelector('#dev-vines')?.value,
      },
    });
  });
}

// ---------- shop ----------

export function showShop({ onClose, onChanged }) {
  const p = activeProfile();
  const tabs = [
    { id: 'hats', label: t('shop.hats'), items: HATS, owned: p.owned.hats, slot: 'hat', icon: (it) => HAT_EMOJI[it.id] || '🎩' },
    { id: 'furs', label: t('shop.furs'), items: FURS, owned: p.owned.furs, slot: 'fur', icon: (it) => `<span style="display:inline-block;width:30px;height:30px;border-radius:50%;background:${it.palette?.F || '#a8743f'};border:3px solid #fff"></span>` },
    { id: 'trails', label: t('shop.trails'), items: TRAILS, owned: p.owned.trails, slot: 'trail', icon: (it) => TRAIL_EMOJI[it.id] || '✨' },
  ];
  let cur = showShop._tab || 'hats';

  const draw = () => {
    const tab = tabs.find((x) => x.id === cur);
    const el = render(`
      ${backBtn()}
      <h2>🛍️ ${t('shop.title')}</h2>
      <div class="chip" style="margin-bottom:10px"><span class="chip-icon">🍌</span>${p.bananas}</div>
      <div class="menu-row" style="margin-bottom:12px">
        ${tabs.map((x) => `<button class="btn soft" data-tab="${x.id}" ${x.id === cur ? 'style="outline:4px solid var(--sun)"' : ''}>${x.label}</button>`).join('')}
      </div>
      <div class="card">
        <div class="tile-grid">
          ${tab.items.map((it) => {
            const owned = tab.owned.includes(it.id);
            const equipped = p.avatar[tab.slot] === it.id;
            return `<div class="tile pressable ${owned ? 'owned' : ''} ${equipped ? 'equipped' : ''}" data-item="${it.id}">
              <div class="t-icon">${tab.icon(it)}</div>
              <div class="t-name">${t(it.nameKey)}</div>
              <div class="t-price">${equipped ? t('shop.equipped') : owned ? t('shop.equip') : `🍌 ${it.price}`}</div>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div class="card" style="display:flex;align-items:center;gap:12px">
        <div style="font-size:34px">❄️</div>
        <div style="flex:1"><b>${t('shop.freeze')}</b> (${p.streak.freezes})<div style="font-size:13px;color:var(--ink-soft)">${t('shop.freeze_desc')}</div></div>
        <button class="btn soft" id="buy-freeze">🍌 ${BALANCE.streakFreezePrice}</button>
      </div>
    `);
    el.querySelector('#scr-back').addEventListener('click', onClose);
    for (const b of el.querySelectorAll('[data-tab]')) {
      b.addEventListener('click', () => { showShop._tab = cur = b.dataset.tab; audio.sfx('click'); draw(); });
    }
    el.querySelector('#buy-freeze').addEventListener('click', () => {
      if (spendBananas(p, BALANCE.streakFreezePrice)) {
        p.streak.freezes++; persist(); audio.sfx('chest'); draw(); onChanged?.();
      } else { audio.sfx('boop'); flash(t('shop.too_pricey')); }
    });
    for (const tile of el.querySelectorAll('[data-item]')) {
      tile.addEventListener('click', () => {
        const tabd = tabs.find((x) => x.id === cur);
        const it = tabd.items.find((i) => i.id === tile.dataset.item);
        const owned = tabd.owned.includes(it.id);
        if (owned) {
          equip(p, tabd.slot, p.avatar[tabd.slot] === it.id && tabd.slot === 'hat' ? null : it.id);
          audio.sfx('pick');
        } else if (spendBananas(p, it.price)) {
          ownItem(p, tabd.id, it.id);
          equip(p, tabd.slot, it.id);
          audio.sfx('chest');
        } else {
          audio.sfx('boop'); flash(t('shop.too_pricey')); return;
        }
        draw(); onChanged?.();
      });
    }
  };
  draw();
}

function flash(text) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = text;
  $('toasts').appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

// ---------- pets ----------

export function showPets({ onClose, onChanged, onHatch }) {
  const p = activeProfile();
  const ready = p.egg.points >= p.egg.goal;
  const el = render(`
    ${backBtn()}
    <h2>🐾 ${t('pets.title')}</h2>
    <div class="card" style="display:flex;align-items:center;gap:14px">
      <div style="font-size:48px">${ready ? '🥚✨' : '🥚'}</div>
      <div style="flex:1">
        <div style="font-weight:800">${ready ? t('egg.ready') : t('egg.progress')}</div>
        <div id="egg-bar" style="width:100%;margin-top:6px"><div id="egg-fill" style="width:${Math.min(100, p.egg.points / p.egg.goal * 100)}%"></div></div>
      </div>
      ${ready ? `<button class="btn green" id="hatch-now">${t('egg.hatch')}</button>` : ''}
    </div>
    <div class="card">
      <div style="font-size:14px;color:var(--ink-soft);font-weight:700;margin-bottom:8px">${t('pets.choose')}</div>
      <div class="tile-grid">
        ${PETS.map((pet) => {
          const owned = p.pets.includes(pet.id);
          const equipped = p.avatar.pet === pet.id;
          return `<div class="tile pressable ${owned ? 'owned' : 'locked'} ${equipped ? 'equipped' : ''}" data-pet="${pet.id}">
            <div class="t-rarity">${RARITY_STARS[pet.rarity]}</div>
            <div class="t-icon">${owned ? (PET_EMOJI[pet.id] || '🐾') : '❓'}</div>
            <div class="t-name">${owned ? t(pet.nameKey) : t('rarity.' + pet.rarity)}</div>
            ${equipped ? `<div class="t-price">${t('pets.follow')}</div>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
  el.querySelector('#hatch-now')?.addEventListener('click', onHatch);
  for (const tile of el.querySelectorAll('[data-pet]')) {
    tile.addEventListener('click', () => {
      const id = tile.dataset.pet;
      if (!p.pets.includes(id)) { audio.sfx('boop'); return; }
      equip(p, 'pet', p.avatar.pet === id ? null : id);
      audio.sfx('pick');
      showPets({ onClose, onChanged, onHatch });
      onChanged?.();
    });
  }
}

export function showHatch(pet, onDone) {
  let taps = 0;
  let hatched = false;
  const el = render(`
    <div style="flex:1"></div>
    <div id="hatch-egg">🥚</div>
    <div class="tagline" id="hatch-label">${t('egg.hatch')}</div>
    <div style="flex:2"></div>
  `);
  const eggEl = el.querySelector('#hatch-egg');
  eggEl.addEventListener('click', () => {
    if (hatched) return; // extra taps must not schedule extra onDone calls
    taps++;
    audio.sfx('egg', { pitch: 1 + taps * 0.15 });
    eggEl.classList.add('cracking');
    if (taps >= 3) {
      hatched = true;
      audio.sfx('hatch');
      eggEl.textContent = pet ? (PET_EMOJI[pet.id] || '🐾') : '💛';
      eggEl.classList.remove('cracking');
      eggEl.style.animation = 'chest-bounce .8s cubic-bezier(.34,1.56,.64,1)';
      el.querySelector('#hatch-label').innerHTML = pet
        ? `${t('egg.hatched', { pet: t(pet.nameKey) })} ${RARITY_STARS[pet.rarity]}`
        : t('egg.all_pets');
      setTimeout(onDone, 2200);
    }
  });
}

// ---------- island restoration (Mimi's worktable) ----------

// status: islandStatus() rows — built ✓, unlocked (fund button), locked (?).
export function showIsland({ profile, status, onClose, onFund }) {
  const built = status.filter((b) => b.state === 'built').length;
  const row = (icon, title, sub, right, dim = false) => `
    <div class="skill-row" ${dim ? 'style="opacity:.55"' : ''}>
      <div style="font-size:28px;width:36px;text-align:center">${icon}</div>
      <div style="flex:1"><b>${title}</b>
        <div style="font-size:13px;color:var(--ink-soft);line-height:1.3">${sub}</div></div>
      ${right}
    </div>`;
  const el = render(`
    ${backBtn()}
    <h2>🛠️ ${t('island.title')}</h2>
    <div class="tagline" style="margin-bottom:8px">${t('island.sub')}</div>
    <div class="menu-row" style="margin-bottom:10px">
      <div class="chip"><span class="chip-icon">🔨</span>${t('island.progress', { n: built, total: status.length })}</div>
      <div class="chip"><span class="chip-icon">🍌</span>${profile.bananas}</div>
    </div>
    <div class="card">
      ${status.map((b) => {
        if (b.state === 'built') {
          return row(b.emoji, t('build.' + b.id), t(`build.${b.id}_desc`),
            '<div style="font-size:22px">✅</div>');
        }
        if (b.state === 'unlocked') {
          const afford = profile.bananas >= b.playerCost;
          return row(b.emoji, t('build.' + b.id), t(`build.${b.id}_desc`),
            `<button class="btn ${afford ? 'green' : 'soft'}" data-fund="${b.id}">🍌 ${b.playerCost}</button>`);
        }
        return row('❓', t('island.locked_name'), t('island.locked_hint'), '', true);
      }).join('')}
    </div>
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
  for (const btn of el.querySelectorAll('[data-fund]')) {
    btn.addEventListener('click', () => {
      const b = status.find((x) => x.id === btn.dataset.fund);
      if (profile.bananas < b.playerCost) { audio.sfx('boop'); flash(t('shop.too_pricey')); return; }
      audio.sfx('click');
      onFund(b.id);
    });
  }
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

// ---------- gem tree ----------

export function showGems({ report, onClose }) {
  const lit = new Set(report.gems.lit);
  let cells = '<div class="gem-cell head">×</div>';
  for (let c = 1; c <= 10; c++) cells += `<div class="gem-cell head">${c}</div>`;
  for (let r = 1; r <= 10; r++) {
    cells += `<div class="gem-cell head">${r}</div>`;
    for (let c = 1; c <= 10; c++) {
      const on = lit.has(`${r}x${c}`);
      cells += `<div class="gem-cell ${on ? 'lit' : ''}">${on ? '💎' : r * c}</div>`;
    }
  }
  const el = render(`
    ${backBtn()}
    <h2>🌳 ${t('gems.title')}</h2>
    <div class="tagline" style="margin-bottom:8px">${t('gems.sub')}</div>
    <div class="chip" style="margin-bottom:10px">💎 ${t('gems.count', { n: report.gems.lit.length, total: report.gems.total })}</div>
    <div class="card" style="display:flex;justify-content:center"><div id="gem-grid">${cells}</div></div>
    <div class="card">
      <h3>${t('gems.skills')}</h3>
      ${Object.entries(report.worlds).map(([w, info]) => `
        <div style="margin-bottom:8px">
          <div style="font-weight:900">${WORLD_EMOJI[w]} ${t('world.' + w)}</div>
          ${info.skills.map((s) => `
            <div class="skill-row">
              <div class="s-name">${t(s.nameKey)}</div>
              <div class="s-bar"><div class="s-fill" style="width:${Math.round(Math.min(1, Math.max(0, (s.rating - 400) / 600)) * 100)}%"></div></div>
              <div class="s-star">${s.mastered ? '🌟' : (s.n > 0 ? '🌱' : '·')}</div>
            </div>`).join('')}
        </div>`).join('')}
    </div>
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
}

// ---------- business ----------

function money(cents) {
  const amount = (Number(cents || 0) / 100).toFixed(2);
  // Dutch children write euros with a decimal comma (€4,50); English with a point.
  return `€${(settings().lang || 'en') === 'en' ? amount : amount.replace('.', ',')}`;
}

function objectiveLabel(objectiveId) {
  if (!objectiveId) return null;
  const objective = getPack('NL_PO').objectives.find((o) => o.id === objectiveId);
  return objective?.titleKey ? t(objective.titleKey) : null;
}

function businessModeLabel(modeId) {
  return objectiveLabel(BUSINESS_MODES[modeId]?.objectiveId);
}

function businessTaskLabel(task) {
  return objectiveLabel(task?.objectiveId)
    || businessModeLabel(task?.mode)
    || (task?.kind === 'payment' ? t('business.pay') : null)
    || (task?.kind === 'prep' ? t('business.prep') : null)
    || t('business.order');
}

export function showBusinessOrder({
  order, customerName, activeTask, onPrep, onPay, onServe, onExit,
}) {
  const recipe = RECIPES[order.recipeId];
  const titleKey = recipe.kind === 'pizza' ? 'business.zone.pizzeria' : 'business.zone.bakery';
  const task = activeTask || order.tasks[0];
  const canPrep = task && task.kind === 'prep';
  const canPay = task && task.kind === 'payment';
  const el = render(`
    <div class="business-panel">
      <div class="business-head">
        <h2>${t(titleKey)}</h2>
        <button class="round-btn" id="business-close">x</button>
      </div>
      <div class="card business-order-card">
        <div class="chip">${esc(customerName)}</div>
        <h3>${t('business.order')}: ${t(recipe.titleKey)}</h3>
        <div class="business-price">${t('business.pay')}: ${money(order.priceCents)}</div>
        <div class="menu-row">
          <button class="btn green" id="business-prep" ${canPrep ? '' : 'disabled'}>${t('business.prep')}</button>
          <button class="btn soft" id="business-pay" ${canPay ? '' : 'disabled'}>${t('business.pay')}</button>
          <button class="btn green" id="business-serve">${t('business.serve')}</button>
        </div>
        <div class="tagline">${esc(businessTaskLabel(task))}</div>
      </div>
    </div>
  `, 'business-screen');
  el.querySelector('#business-prep').addEventListener('click', () => { if (canPrep) onPrep?.(task); });
  el.querySelector('#business-pay').addEventListener('click', () => { if (canPay) onPay?.(task); });
  el.querySelector('#business-serve').addEventListener('click', onServe);
  el.querySelector('#business-close').addEventListener('click', onExit);
}

function choiceValues(expected, deltas, fallback) {
  const base = Number(expected);
  const values = Number.isFinite(base)
    ? [base, ...deltas.map((delta) => base + delta)].filter((value) => value >= 0)
    : fallback;
  return [...new Set(values.map((value) => Number(value)))].sort((a, b) => a - b);
}

function setSelected(button, selector) {
  for (const other of button.closest('.card')?.querySelectorAll(selector) || []) other.classList.remove('equipped');
  button.classList.add('equipped');
}

// Prep panels — one small view per task mode. Each renders only the controls its
// math needs and submits the exact `action` shape applyPrepAction() grades. Keep
// these submit shapes in sync with src/business/engine.js applyPrepAction().
function prepTile(attr, value, icon, name) {
  return `
    <button class="tile pressable" data-${attr}="${esc(value)}">
      <div class="t-icon">${esc(icon)}</div>
      ${name ? `<div class="t-name">${esc(name)}</div>` : ''}
    </button>`;
}

function pickOne(el, selector, onPick) {
  for (const btn of el.querySelectorAll(selector)) {
    btn.addEventListener('click', () => { onPick(btn); setSelected(btn, selector); });
  }
}

const PREP_VIEWS = {
  // Halves & quarters: how many equal pieces, and which topping.
  portion_halves_quarters: {
    prompt: () => t('business.prep.portion'),
    controls(task) {
      const e = task.expected || {};
      const slices = [...new Set([2, 4, 6, 8, Number(e.slices)].filter(Number.isFinite))].sort((a, b) => a - b);
      const toppings = [...new Set(['cheese', 'tomato', e.topping].filter(Boolean))];
      return `
        <div class="business-choice-grid">
          ${slices.map((n) => prepTile('slices', n, n, t('business.prep.pieces'))).join('')}
        </div>
        <div class="business-choice-grid">
          ${toppings.map((top) => prepTile('topping', top, top === 'tomato' ? '🍅' : '🧀', t('business.ingredient.' + top))).join('')}
        </div>`;
    },
    bind(el, action) {
      pickOne(el, '[data-slices]', (b) => { action.slices = Number(b.dataset.slices); });
      pickOne(el, '[data-topping]', (b) => { action.topping = b.dataset.topping; });
    },
    submit: (a) => ({ slices: a.slices, topping: a.topping }),
  },

  // Repeated addition: trays × per-tray → total.
  repeated_addition_orders: {
    prompt: (task) => t('business.prep.repeat', {
      trays: task.expected?.trays ?? 0,
      perTray: task.expected?.perTray ?? 0,
    }),
    controls(task) {
      const e = task.expected || {};
      const totals = choiceValues((e.trays || 0) * (e.perTray || 0), [-2, -1, 1, 2], [4, 6, 8, 12]);
      return `
        <div class="business-choice-grid">
          ${totals.map((n) => prepTile('total', n, n, t('business.prep.total'))).join('')}
        </div>`;
    },
    bind(el, action) {
      pickOne(el, '[data-total]', (b) => { action.total = Number(b.dataset.total); });
    },
    submit: (a) => ({ total: a.total }),
  },

  // Measurement: pick the right ingredient and the whole amount to measure.
  recipe_measure_whole: {
    prompt: () => t('business.prep.measure'),
    controls(task) {
      const e = task.expected || {};
      const ingredients = [...new Set(['flour', 'dough', 'milk', e.ingredient].filter(Boolean))];
      const amounts = choiceValues(e.amount, [-2, -1, 1, 2], [1, 2, 3, 4]);
      const unit = t('business.unit.' + (e.unit || 'amount'));
      return `
        <div class="business-choice-grid">
          ${ingredients.map((id) => prepTile('ingredient', id, '🥣', t('business.ingredient.' + id))).join('')}
        </div>
        <div class="business-choice-grid">
          ${amounts.map((n) => prepTile('amount', n, n, unit)).join('')}
        </div>`;
    },
    bind(el, action, task) {
      action.unit = task.expected?.unit;
      pickOne(el, '[data-ingredient]', (b) => { action.ingredient = b.dataset.ingredient; });
      pickOne(el, '[data-amount]', (b) => { action.amount = Number(b.dataset.amount); });
    },
    submit: (a) => ({ ingredient: a.ingredient, amount: a.amount, unit: a.unit }),
  },

  // Fraction of a quantity: how many is num/den of the order amount.
  fraction_of_quantity_recipe: {
    prompt: (task) => {
      const e = task.expected || {};
      return t('business.prep.fraction', { num: e.numerator ?? 1, den: e.denominator ?? 1, of: e.of ?? 0 });
    },
    controls(task) {
      const e = task.expected || {};
      const answer = ((e.of || 0) * (e.numerator || 0)) / (e.denominator || 1);
      const amounts = choiceValues(answer, [-2, -1, 1, 2], [1, 2, 3, 4]);
      return `
        <div class="business-choice-grid">
          ${amounts.map((n) => prepTile('amount', n, n, t('business.prep.total'))).join('')}
        </div>`;
    },
    bind(el, action) {
      pickOne(el, '[data-amount]', (b) => { action.amount = Number(b.dataset.amount); });
    },
    submit: (a) => ({ amount: a.amount }),
  },

  // Scale the recipe: set each ingredient to base × factor.
  scale_recipe: {
    prompt: (task) => t('business.prep.scale', { factor: task.expected?.factor ?? 1 }),
    controls(task) {
      const e = task.expected || {};
      const factor = e.factor || 1;
      return Object.entries(e.base || {}).map(([id, n]) => `
        <div class="tagline">${esc(t('business.ingredient.' + id))}</div>
        <div class="business-choice-grid">
          ${choiceValues(n * factor, [-1, 1], [n]).map((choice) => `
            <button class="tile pressable" data-scale-ingredient="${esc(id)}" data-scale-amount="${choice}">
              <div class="t-icon">${choice}</div>
            </button>`).join('')}
        </div>`).join('');
    },
    bind(el, action) {
      action.ingredients = {};
      for (const btn of el.querySelectorAll('[data-scale-ingredient]')) {
        btn.addEventListener('click', () => {
          const id = btn.dataset.scaleIngredient;
          action.ingredients[id] = Number(btn.dataset.scaleAmount);
          for (const other of el.querySelectorAll(`[data-scale-ingredient="${id}"]`)) other.classList.remove('equipped');
          btn.classList.add('equipped');
        });
      }
    },
    submit: (a) => ({ ingredients: { ...(a.ingredients || {}) } }),
  },
};

// Shared wiring for the prep/payment panels: bind the view, the 💡 hint, and the
// done button. A wrong answer keeps the panel open and reveals a mode-specific
// nudge so the child can try again in place (onSubmit returns { correct }).
function wireBusinessPanel(el, { task, view, action, doneId, onSubmit, onClose }) {
  el.querySelector('#scr-back').addEventListener('click', onClose);
  view.bind(el, action, task);
  const feedback = el.querySelector('#business-feedback');
  const reveal = (msg) => { feedback.textContent = msg; feedback.hidden = false; };
  const hint = () => t('business.hint.' + task.mode);
  el.querySelector('#business-hint').addEventListener('click', () => reveal(hint()));
  el.querySelector('#' + doneId).addEventListener('click', () => {
    const res = onSubmit?.(view.submit(action));
    if (res && res.correct === false && !res.handled) reveal(`${t('business.almost')} ${hint()}`);
  });
}

export function showBusinessPrep({ task, onSubmit, onClose }) {
  const view = PREP_VIEWS[task?.mode] || PREP_VIEWS.portion_halves_quarters;
  const action = {};
  const el = render(`
    ${backBtn(onClose, '←')}
    <h2>${t('business.prep')}</h2>
    <div class="tagline">${esc(businessTaskLabel(task))}</div>
    <div class="card">
      <p class="business-prompt">${esc(view.prompt(task))}</p>
      ${view.controls(task)}
      <div class="business-feedback" id="business-feedback" hidden></div>
      <div class="menu-row">
        <button class="btn soft" id="business-hint">💡</button>
        <button class="btn green" id="business-prep-done">${t('business.done')}</button>
      </div>
    </div>
  `);
  wireBusinessPanel(el, { task, view, action, doneId: 'business-prep-done', onSubmit, onClose });
}

// Payment panels — one small view per task mode, mirroring PREP_VIEWS. Submit shapes
// must stay in sync with src/business/engine.js applyPaymentAction().
// Euro coins/notes (in cents); any multiple of 5 is composable, which covers every
// recipe price. Used by the make-the-amount panel.
const PAY_COINS = [500, 200, 100, 50, 20, 10, 5];

const PAYMENT_VIEWS = {
  // Make the amount: tap coins to build up to the price, with a live running total.
  money_make_amounts: {
    controls(task) {
      const target = task.expected?.amountCents ?? 0;
      return `
        <p class="business-prompt">${esc(t('business.pay.make', { amount: money(target) }))}</p>
        <div class="business-price">${t('business.pay.total')}:
          <span id="pay-total">${money(0)}</span> / ${money(target)}</div>
        <div class="business-money-row">
          ${PAY_COINS.map((c) => `<button class="btn soft" data-money="${c}">${money(c)}</button>`).join('')}
        </div>
        <div class="menu-row">
          <button class="btn soft" id="pay-reset">${t('business.pay.reset')}</button>
        </div>`;
    },
    bind(el, action) {
      action.amountCents = 0;
      const total = el.querySelector('#pay-total');
      const refresh = () => { total.textContent = money(action.amountCents); };
      for (const btn of el.querySelectorAll('[data-money]')) {
        btn.addEventListener('click', () => { action.amountCents += Number(btn.dataset.money); refresh(); });
      }
      el.querySelector('#pay-reset').addEventListener('click', () => { action.amountCents = 0; refresh(); });
    },
    submit: (a) => ({ amountCents: a.amountCents || 0 }),
  },

  // Make change: the customer pays a given amount — how much change comes back?
  decimal_money_change: {
    controls(task) {
      const e = task.expected || {};
      const price = (e.paidCents ?? 0) - (e.changeCents ?? 0);
      const changes = choiceValues(e.changeCents, [-100, -50, 50, 100], [0, 50, 100, 250]);
      return `
        <div class="business-price">${t('business.order')}: ${money(price)}</div>
        <p class="business-prompt">${esc(t('business.pay.change', { paid: money(e.paidCents ?? 0) }))}</p>
        <div class="business-money-row">
          ${changes.map((c) => `<button class="btn soft" data-change="${c}">${money(c)}</button>`).join('')}
        </div>`;
    },
    bind(el, action, task) {
      action.paidCents = task.expected?.paidCents;
      pickOne(el, '[data-change]', (b) => { action.changeCents = Number(b.dataset.change); });
    },
    submit: (a) => ({ paidCents: a.paidCents, changeCents: a.changeCents }),
  },

  // Percentage discount: take the percent off and pick the new price.
  percentage_discount: {
    controls(task) {
      const e = task.expected || {};
      const finals = choiceValues(e.finalCents, [-100, -50, 50, 100], [100, 250, 500, 1000]);
      return `
        <p class="business-prompt">${esc(t('business.pay.discount', {
          percent: e.percent ?? 10,
          was: money(e.originalCents ?? 0),
        }))}</p>
        <div class="business-money-row">
          ${finals.map((c) => `<button class="btn soft" data-final="${c}">${money(c)}</button>`).join('')}
        </div>`;
    },
    bind(el, action) {
      pickOne(el, '[data-final]', (b) => { action.finalCents = Number(b.dataset.final); });
    },
    submit: (a) => ({ finalCents: a.finalCents }),
  },
};

export function showBusinessPayment({ task, onSubmit, onClose }) {
  const view = PAYMENT_VIEWS[task?.mode] || PAYMENT_VIEWS.money_make_amounts;
  const action = {};
  const el = render(`
    ${backBtn(onClose, '←')}
    <h2>${t('business.pay')}</h2>
    <div class="tagline">${esc(businessTaskLabel(task))}</div>
    <div class="card">
      ${view.controls(task)}
      <div class="business-feedback" id="business-feedback" hidden></div>
      <div class="menu-row">
        <button class="btn soft" id="business-hint">💡</button>
        <button class="btn green" id="business-payment-done">${t('business.done')}</button>
      </div>
    </div>
  `);
  wireBusinessPanel(el, { task, view, action, doneId: 'business-payment-done', onSubmit, onClose });
}

export function showBusinessStock({ business, onRestock, onClose }) {
  const limit = Math.max(1, business.stockLimit || 1);
  const el = render(`
    ${backBtn()}
    <h2>${t('business.stock')}</h2>
    <div class="chip">${t('business.profit')}: ${money(business.shopCoins)}</div>
    <div class="card">
      ${Object.values(INGREDIENTS).map((ing) => {
        const count = business.stock[ing.id] || 0;
        return `
          <div class="skill-row">
            <div class="s-name">${t(ing.titleKey)}</div>
            <div class="s-bar"><div class="s-fill" style="width:${Math.round((count / limit) * 100)}%"></div></div>
            <div class="curriculum-count">${count}/${limit}</div>
            <button class="btn soft" data-restock="${ing.id}">${t('business.restock')}</button>
          </div>`;
      }).join('')}
    </div>
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
  for (const btn of el.querySelectorAll('[data-restock]')) {
    btn.addEventListener('click', () => onRestock?.(btn.dataset.restock));
  }
}

export function showBusinessUpgrades({ business, onBuy, onClose }) {
  const ownedUpgrades = Array.isArray(business.upgrades) ? business.upgrades : [];
  const el = render(`
    ${backBtn()}
    <h2>${t('business.upgrades')}</h2>
    <div class="chip">${t('business.profit')}: ${money(business.shopCoins)}</div>
    <div class="card">
      ${Object.values(UPGRADES).map((upgrade) => {
        const owned = ownedUpgrades.includes(upgrade.id);
        return `
          <div class="skill-row">
            <div class="s-name">${t(upgrade.titleKey)}</div>
            <div class="curriculum-count">${owned ? t('business.done') : money(upgrade.priceCents)}</div>
            ${owned ? '' : `<button class="btn soft" data-upgrade="${upgrade.id}">${t('business.buy')}</button>`}
          </div>`;
      }).join('')}
    </div>
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
  for (const btn of el.querySelectorAll('[data-upgrade]')) {
    btn.addEventListener('click', () => onBuy?.(btn.dataset.upgrade));
  }
}

// End-of-day shopkeeper review — one small descriptor per non-order mode, used to
// render the questions nextBusinessReview() produced. Grading lives in the engine
// (applyReviewAction); these only turn a task into a prompt + option labels.
const REVIEW_VIEWS = {
  profit_margin: {
    prompt: (task) => t('business.review.profit', { rev: money(task.revenueCents), cost: money(task.costCents) }),
    label: (value) => money(value),
  },
  demand_chart: {
    prompt: () => t('business.review.demand'),
    label: (value) => t(RECIPES[value]?.titleKey || value),
  },
  unit_conversion_stock: {
    prompt: (task) => t('business.review.convert', { kg: task.kg }),
    label: (value) => t('business.review.grams', { n: value }),
  },
  price_compare: {
    prompt: () => t('business.review.compare'),
    label: (value, task) => {
      const pack = value === 'A' ? task.a : task.b;
      return t('business.review.pack', { count: pack.count, price: money(pack.cents) });
    },
  },
};

export function showBusinessDaySummary({ report, review = [], onReview, onDone }) {
  const reviewHtml = review.map((task, i) => {
    const view = REVIEW_VIEWS[task.mode];
    if (!view) return '';
    return `
      <div class="card business-review" data-review-index="${i}">
        <p class="business-prompt">${esc(view.prompt(task))}</p>
        <div class="business-money-row">
          ${task.options.map((value) => `
            <button class="btn soft" data-review-value="${esc(value)}">${esc(view.label(value, task))}</button>
          `).join('')}
        </div>
      </div>`;
  }).join('');

  const el = render(`
    <div style="flex:1"></div>
    <h2>${t('business.summary')}</h2>
    <div class="card business-summary">
      <div class="reward-item">${t('business.orders_served', { n: report.ordersServed })}</div>
      <div class="reward-item">${t('business.profit')}: ${money(report.profitCents)}</div>
    </div>
    ${reviewHtml}
    <button class="btn green" id="business-done">${t('business.done')}</button>
    <div style="flex:2"></div>
  `);

  for (const card of el.querySelectorAll('[data-review-index]')) {
    const task = review[Number(card.dataset.reviewIndex)];
    for (const btn of card.querySelectorAll('[data-review-value]')) {
      btn.addEventListener('click', () => {
        if (card.dataset.answered) return; // one tap per question, then it locks
        card.dataset.answered = '1';
        const correct = onReview?.(task, btn.dataset.reviewValue);
        for (const b of card.querySelectorAll('[data-review-value]')) b.disabled = true;
        btn.classList.add(correct ? 'correct' : 'wrong');
      });
    }
  }
  el.querySelector('#business-done').addEventListener('click', onDone);
}

// ---------- parents ----------

function curriculumPackLabel(pack) {
  const country = pack.countryKey ? t(pack.countryKey) : pack.countryCode || pack.id;
  return `${country} - ${t(pack.titleKey)}`;
}

function stageLabel(pack, stageId) {
  const stage = pack.stages.find((s) => s.id === stageId);
  return stage ? t(stage.labelKey) : t(pack.fallbackStagePrefixKey || 'curriculum.stage', { n: '?' });
}

function curriculumCoverageHtml(profile, report, businessReport = null, showControls = false) {
  if (!profile?.curriculum || !report) return '';
  const pack = getPack(profile.curriculum.packId);
  const packs = listPacks();
  const coverage = coverageForReport(pack.id, report, { business: businessReport });
  const stage = profile.curriculum.confirmedStage || profile.curriculum.estimatedStage;
  const strictness = profile.curriculum.strictness || 'soft';
  return `
    <div class="card">
      <h3>${esc(t('parents.curriculum'))}</h3>
      <div class="curriculum-meta">
        <div class="chip">${esc(t('parents.country'))}: ${esc(pack.countryKey ? t(pack.countryKey) : pack.countryCode || pack.id)}</div>
        <div class="chip">${esc(t('parents.curriculum_pack'))}: ${esc(t(pack.titleKey))}</div>
        ${profile.curriculum.birthDate ? `<div class="chip">${esc(t('parents.birthday'))}: ${esc(profile.curriculum.birthDate)}</div>` : ''}
        <div class="chip">${esc(t('parents.stage'))}: ${esc(stageLabel(pack, stage))}</div>
      </div>
      ${showControls ? `<div class="curriculum-controls">
        <label>
          <span>${esc(t('parents.curriculum_pack'))}</span>
          <select data-pack>
            ${packs.map((p) => `<option value="${esc(p.id)}" ${p.id === pack.id ? 'selected' : ''}>${esc(curriculumPackLabel(p))}</option>`).join('')}
          </select>
        </label>
        <label>
          <span>${esc(t('parents.birthday'))}</span>
          <input type="date" data-birth-date value="${esc(profile.curriculum.birthDate || '')}">
        </label>
        <label>
          <span>${esc(t('parents.stage'))}</span>
          <select data-stage>
            ${pack.stages.map((s) => `<option value="${esc(s.id)}" ${s.id === stage ? 'selected' : ''}>${esc(t(s.labelKey))}</option>`).join('')}
          </select>
        </label>
        <label>
          <span>${esc(t('parents.strictness'))}</span>
          <select data-strictness>
            <option value="soft" ${strictness === 'soft' ? 'selected' : ''}>${esc(t('parents.strictness_soft'))}</option>
            <option value="strict" ${strictness === 'strict' ? 'selected' : ''}>${esc(t('parents.strictness_strict'))}</option>
          </select>
        </label>
      </div>` : ''}
      <div class="tagline" style="color:var(--ink-soft);text-shadow:none;margin-bottom:8px">${esc(t('parents.coverage'))}</div>
      ${Object.values(coverage.domains).filter((d) => d.total > 0).map((d) => `
        <div class="curriculum-domain">
          <div class="skill-row">
            <div class="s-name">${esc(t(d.labelKey))}</div>
            <div class="s-bar"><div class="s-fill" style="width:${Math.round((d.covered / Math.max(1, d.total)) * 100)}%"></div></div>
            <div class="curriculum-count">${d.covered}/${d.total}</div>
          </div>
          <div class="curriculum-objectives">
            ${d.objectives.map((o) => `<span class="curriculum-pill ${o.coverage}">${esc(t(o.titleKey))} · ${esc(t(`parents.${o.coverage}`))}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>`;
}

function parentBusinessHtml(businessReport) {
  if (!businessReport) return '';
  const modes = Object.entries(businessReport.modes || {});
  return `
    <div class="card">
      <h3>${esc(t('parents.business'))}</h3>
      <div class="curriculum-meta">
        <div class="chip">${esc(t('business.orders_served', { n: businessReport.ordersServed || 0 }))}</div>
        <div class="chip">${esc(t('business.profit'))}: ${esc(money(businessReport.profitCents))}</div>
      </div>
      <div class="curriculum-objectives">
        ${modes.map(([id, mode]) => {
          const coverage = mode?.coverage || 'partial';
          const label = businessModeLabel(id) || t('parents.business');
          return `<span class="curriculum-pill ${esc(coverage)}">${esc(label)} · ${esc(t(`parents.${coverage}`))}</span>`;
        }).join('')}
      </div>
    </div>`;
}

export function showParents({ report, profile, businessReport = null, onClose, onCurriculumChange }) {
  const el = render(`
    ${backBtn()}
    <h2>${t('parents.title')}</h2>
    <div class="card"><p style="margin:0;font-size:15px;line-height:1.5">${t('parents.body')}</p></div>
    ${profile && report ? `
    ${curriculumCoverageHtml(profile, report, businessReport, !!onCurriculumChange)}
    ${parentBusinessHtml(businessReport)}
    <div class="card">
      <h3>${t('parents.skills')} — ${esc(profile.name)}</h3>
      ${Object.entries(report.worlds).map(([w, info]) => info.skills.filter((s) => s.n > 0).map((s) => `
        <div class="skill-row">
          <div class="s-name">${t(s.nameKey)}</div>
          <div class="s-bar"><div class="s-fill" style="width:${Math.round(s.acc10 * 100)}%"></div></div>
          <div style="font-size:12px;color:var(--ink-soft);min-width:90px;text-align:right">
            ${Math.round(s.acc10 * 100)}% · ${t('parents.attempts', { n: s.n })}${s.mastered ? ' · 🌟' : ''}
          </div>
        </div>`).join('')).join('') || '<p style="font-size:14px;color:var(--ink-soft)">—</p>'}
    </div>` : ''}
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
  el.querySelector('[data-pack]')?.addEventListener('change', (e) => {
    onCurriculumChange?.({ packId: e.target.value });
  });
  el.querySelector('[data-birth-date]')?.addEventListener('change', (e) => {
    onCurriculumChange?.({ birthDate: e.target.value });
  });
  el.querySelector('[data-stage]')?.addEventListener('change', (e) => {
    onCurriculumChange?.({ confirmedStage: e.target.value });
  });
  el.querySelector('[data-strictness]')?.addEventListener('change', (e) => {
    onCurriculumChange?.({ strictness: e.target.value });
  });
}

// ---------- chamber result ----------

export function showResult({ rewards, onNext, onHome }) {
  const el = render(`
    <div style="flex:1"></div>
    <h2>${t('result.title')}</h2>
    <div id="result-chest">🎁</div>
    <div class="tagline" id="chest-hint">${t('result.tap_chest')}</div>
    <div class="reward-row hidden" id="reward-row"></div>
    <div class="menu-row hidden" id="result-btns" style="margin-top:18px">
      <button class="btn green" id="res-next">${t('result.next')} →</button>
      <button class="btn soft" id="res-home">🏝️ ${t('result.home')}</button>
    </div>
    <div style="flex:2"></div>
  `);
  const chest = el.querySelector('#result-chest');
  chest.addEventListener('click', () => {
    if (chest.dataset.open) return;
    chest.dataset.open = '1';
    chest.textContent = '🎉';
    audio.sfx('chest');
    el.querySelector('#chest-hint').classList.add('hidden');
    const row = el.querySelector('#reward-row');
    row.classList.remove('hidden');
    row.innerHTML = rewards.map((r) => `<div class="reward-item">${r}</div>`).join('');
    el.querySelector('#result-btns').classList.remove('hidden');
  }, { once: false });
  el.querySelector('#res-next').addEventListener('click', onNext);
  el.querySelector('#res-home').addEventListener('click', onHome);
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
export { esc };
