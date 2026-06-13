// Full-screen DOM overlays: title, story, settings, shop, pets, gem tree,
// parents, chamber results, duel. One active screen at a time in #screens.
import { t, setLang } from './i18n.js';
import { audio } from './audio.js';
import {
  settings, profiles, activeProfile, createProfile, selectProfile, deleteProfile,
  spendBananas, ownItem, equip, persist, persistNow,
} from './state.js';
import { HATS, FURS, TRAILS, PETS } from './models.js';
import { RARITY_STARS, BALANCE } from './config.js';

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

function render(html) {
  host().innerHTML = `<div class="screen">${html}</div>`;
  return host().firstElementChild;
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
            <button class="round-btn ${s.lang === 'en' ? 'active' : ''}" data-lang="en">🇬🇧</button>
            <button class="round-btn ${s.lang === 'nl' ? 'active' : ''}" data-lang="nl">🇳🇱</button>
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
      <div id="new-player-row" class="hidden" style="margin-top:12px;display:flex;gap:8px">
        <input id="new-name" maxlength="14" placeholder="${t('title.name_prompt')}"
          style="flex:1;font-family:inherit;font-size:18px;font-weight:700;padding:10px 14px;border-radius:14px;border:3px solid var(--cream-2);pointer-events:auto;user-select:text">
        <button class="btn green" id="new-go">${t('title.start')}</button>
      </div>
    </div>
    <div class="menu-row">
      <div class="lang-toggle">
        <button class="round-btn ${s.lang === 'en' ? 'active' : ''}" data-lang="en">🇬🇧</button>
        <button class="round-btn ${s.lang === 'nl' ? 'active' : ''}" data-lang="nl">🇳🇱</button>
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
    const p = createProfile(name);
    audio.sfx('correct');
    onPlay(p.id, true);
  };
  el.querySelector('#new-go').addEventListener('click', go);
  el.querySelector('#new-name').addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
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

// ---------- settings ----------

export function showSettings({ onClose, onSwitchPlayer, onLangChange }) {
  const s = settings();
  const el = render(`
    ${backBtn()}
    <h2>${t('settings.title')}</h2>
    <div class="card">
      <div class="menu-col">
        <div class="menu-row" style="align-items:center">
          <span style="font-weight:800">${t('settings.lang')}</span>
          <div class="lang-toggle">
            <button class="round-btn ${s.lang === 'en' ? 'active' : ''}" data-lang="en">🇬🇧</button>
            <button class="round-btn ${s.lang === 'nl' ? 'active' : ''}" data-lang="nl">🇳🇱</button>
          </div>
        </div>
        <div class="menu-row">
          <button class="btn soft" id="tg-sfx">${s.sfx ? '🔊' : '🔇'} ${t('settings.sfx')}</button>
          <button class="btn soft" id="tg-music">${s.music ? '🎵' : '🚫'} ${t('settings.music')}</button>
        </div>
        <button class="btn soft" id="switch-player">👥 ${t('settings.switch_player')}</button>
      </div>
    </div>
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
  for (const b of el.querySelectorAll('[data-lang]')) {
    b.addEventListener('click', () => {
      setLang(b.dataset.lang); persistNow(); onLangChange?.();
      showSettings({ onClose, onSwitchPlayer, onLangChange });
    });
  }
  el.querySelector('#tg-sfx').addEventListener('click', () => {
    s.sfx = !s.sfx; audio.setSfx(s.sfx); persist();
    showSettings({ onClose, onSwitchPlayer, onLangChange });
  });
  el.querySelector('#tg-music').addEventListener('click', () => {
    s.music = !s.music; audio.setMusic(s.music); persist();
    showSettings({ onClose, onSwitchPlayer, onLangChange });
  });
  el.querySelector('#switch-player').addEventListener('click', onSwitchPlayer);
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

// ---------- parents ----------

export function showParents({ report, profile, onClose }) {
  const el = render(`
    ${backBtn()}
    <h2>${t('parents.title')}</h2>
    <div class="card"><p style="margin:0;font-size:15px;line-height:1.5">${t('parents.body')}</p></div>
    ${profile && report ? `
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
