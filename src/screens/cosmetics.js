// Cosmetics + economy overlays: the shop (hats/furs/trails + streak freeze), the
// pets/egg screen, the hatch animation, and Mimi's island-restoration worktable.
import { render, backBtn, flash, HAT_EMOJI, TRAIL_EMOJI, PET_EMOJI } from './core.js';
import { t } from '../i18n.js';
import { audio } from '../audio.js';
import { activeProfile, spendBananas, ownItem, equip, persist } from '../state.js';
import { HATS, FURS, TRAILS, PET_CREATURES, getCreature } from '../models.js';
import { RARITY_STARS, BALANCE } from '../config.js';

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
    // Hats anchor only on the monkey; fur recolours only the monkey/mimi fur
    // slots. Tell the player so the shop never silently no-ops on a pet avatar.
    const creature = getCreature(p.avatar.creature);
    const cosmeticNote = (cur === 'hats' && !creature.hat) || (cur === 'furs' && !creature.fur);
    const el = render(`
      ${backBtn()}
      <h2>🛍️ ${t('shop.title')}</h2>
      <div class="chip" style="margin-bottom:10px"><span class="chip-icon">🍌</span>${p.bananas}</div>
      <div class="menu-row" style="margin-bottom:12px">
        ${tabs.map((x) => `<button class="btn soft" data-tab="${x.id}" ${x.id === cur ? 'style="outline:4px solid var(--sun)"' : ''}>${x.label}</button>`).join('')}
      </div>
      ${cosmeticNote ? `<div class="form-help" style="margin-bottom:10px">${t('shop.cosmetic_note')}</div>` : ''}
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
        ${PET_CREATURES.filter((c) => c.id !== p.avatar.creature).map((c) => {
          const owned = p.pets.includes(c.id);
          const equipped = p.avatar.pet === c.id;
          const stars = c.companion ? '💛' : RARITY_STARS[c.rarity];
          return `<div class="tile pressable ${owned ? 'owned' : 'locked'} ${equipped ? 'equipped' : ''}" data-pet="${c.id}">
            <div class="t-rarity">${stars}</div>
            <div class="t-icon">${owned ? (PET_EMOJI[c.id] || '🐾') : '❓'}</div>
            <div class="t-name">${owned ? t(c.nameKey) : t('rarity.' + c.rarity)}</div>
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
export function showIsland({ profile, status, onClose, onFund, onAltar = null }) {
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
      ${onAltar ? `<button class="btn soft" id="island-altar">${t('altar.open')}</button>` : ''}
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
  if (onAltar) {
    el.querySelector('#island-altar')?.addEventListener('click', () => { audio.sfx('click'); onAltar(); });
  }
  for (const btn of el.querySelectorAll('[data-fund]')) {
    btn.addEventListener('click', () => {
      const b = status.find((x) => x.id === btn.dataset.fund);
      if (profile.bananas < b.playerCost) { audio.sfx('boop'); flash(t('shop.too_pricey')); return; }
      audio.sfx('click');
      onFund(b.id);
    });
  }
}
