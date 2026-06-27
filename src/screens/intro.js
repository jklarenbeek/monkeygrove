// Intro flow overlays: the attract loop, the title / player-select, the story
// pages, and the Crab King finale.
import { render, esc, PET_EMOJI, flash } from './core.js';
import { storyHexagram } from './story.js';
import { t, setLang } from '../i18n.js';
import { languageButton } from '../langFlags.js';
import { audio } from '../audio.js';
import { profiles, settings, createProfile, deleteProfile, persistNow } from '../state.js';
import { listPacks } from '../curriculum/index.js';
import { PETS, AVATAR_CREATURES } from '../models.js';
import { curriculumPackLabel } from './parents.js';


const STARTER_PET_IDS = ['bunny', 'duckling', 'turtle', 'owl'];
const TRAIL_CHOICES = [
  { id: 'sprout', age: 6, icon: '🌱', tone: 'sprout' },
  { id: 'climber', age: 8, icon: '🌴', tone: 'climber' },
  { id: 'explorer', age: 10, icon: '🗿', tone: 'explorer' },
  { id: 'unsure', age: null, icon: '✨', tone: 'unsure', placementWarmup: true },
];
// ---------- title ----------

export function showAttract({ onStart, onParents, onDuel, onLangChange }) {
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
      onLangChange?.();
      stop();
      showAttract({ onStart, onParents, onDuel, onLangChange });
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

export function showTitle({ onPlay, onParents, onDuel, onLangChange }) {
  const ps = profiles();
  const s = settings();
  const packs = listPacks();
  const starterPets = STARTER_PET_IDS.map((id) => PETS.find((pet) => pet.id === id)).filter(Boolean);
  let wizardStep = 1;
  let selectedPet = starterPets[0]?.id || null;
  let selectedCreature = 'monkey';
  let selectedTrail = 'unsure';
  let explorerName = '';

  const profileIcon = (profile) => PET_EMOJI[profile.avatar?.creature]
    || PET_EMOJI[profile.avatar?.pet] || '🐵';
  const petName = (id) => t(PETS.find((pet) => pet.id === id)?.nameKey || 'pets.title');

  const el = render(`
    <h1>🐵 Monkey Grove 🍌</h1>
    <div class="tagline">${t('title.tagline')}</div>
    <div class="card player-card">
      <h3>${t('title.who')}</h3>
      <div class="tile-grid" id="profile-grid">
        ${ps.map((p) => `
          <div class="tile pressable" data-pid="${p.id}">
            <div class="t-icon">${profileIcon(p)}</div>
            <div class="t-name">${esc(p.name)}</div>
            <div class="t-price">🍌 ${p.bananas} · 🔥 ${p.streak.count}</div>
          </div>`).join('')}
        <div class="tile pressable new-explorer-tile" id="tile-new">
          <div class="t-icon">✨</div>
          <div class="t-name">${t('title.new_player')}</div>
        </div>
      </div>
    </div>
    <div id="new-player-row" class="new-player-form hidden"></div>
    <div class="menu-row title-menu" id="title-menu">
      <div class="lang-toggle">
        ${languageButton('en', s.lang)}
        ${languageButton('nl', s.lang)}
      </div>
      ${ps.length >= 2 ? `<button class="btn soft" id="btn-duel">⚔️ ${t('title.duel')}</button>` : ''}
      <button class="btn soft" id="btn-parents">${t('title.parents')}</button>
    </div>
  `);

  const playerCard = el.querySelector('.player-card');
  const wizard = el.querySelector('#new-player-row');
  const refreshLanguageButtons = () => {
    const lang = settings().lang;
    for (const button of el.querySelectorAll('[data-lang]')) {
      button.classList.toggle('active', button.dataset.lang === lang);
    }
  };
  const packOptions = packs.map((pack) => `<option value="${esc(pack.id)}">${esc(curriculumPackLabel(pack))}</option>`).join('');

  const renderWizard = () => {
    const selectedPetDef = starterPets.find((pet) => pet.id === selectedPet) || starterPets[0];
    const stepLabel = wizardStep === 1 ? t('title.wizard_step_1') : t('title.wizard_step_2');
    wizard.innerHTML = `
      <div class="explorer-wizard" id="new-explorer-wizard">
        <div class="wizard-progress" aria-label="${esc(stepLabel)}">
          <span class="wizard-step ${wizardStep === 1 ? 'active' : ''}">1</span>
          <span class="wizard-step ${wizardStep === 2 ? 'active' : ''}">2</span>
        </div>
        ${wizardStep === 1 ? `
          <div class="wizard-panel name-panel">
            <div class="wizard-kicker">${esc(t('title.wizard_name_title'))}</div>
            <input id="new-name" class="wizard-input" maxlength="14" value="${esc(explorerName)}" placeholder="${esc(t('title.name_prompt'))}">
            <div class="wizard-kicker pet-kicker">${esc(t('title.wizard_avatar_title'))}</div>
            <div class="starter-pet-grid">
              ${AVATAR_CREATURES.map((c) => `
                <button class="tile pressable starter-pet ${selectedCreature === c.id ? 'equipped' : ''}" data-avatar-creature="${esc(c.id)}" aria-pressed="${selectedCreature === c.id}">
                  <div class="voxel-plinth"><span>${PET_EMOJI[c.id] || '🐾'}</span></div>
                  <div class="t-name">${esc(t(c.nameKey))}</div>
                </button>
              `).join('')}
            </div>
            <div class="wizard-kicker pet-kicker">${esc(t('title.wizard_pet_title'))}</div>
            <div class="starter-pet-grid">
              ${starterPets.map((pet) => `
                <button class="tile pressable starter-pet ${selectedPet === pet.id ? 'equipped' : ''}" data-starter-pet="${esc(pet.id)}" aria-pressed="${selectedPet === pet.id}">
                  <div class="voxel-plinth"><span>${PET_EMOJI[pet.id] || '🐾'}</span></div>
                  <div class="t-name">${esc(t(pet.nameKey))}</div>
                </button>
              `).join('')}
            </div>
            <div class="wizard-actions">
              <button class="btn soft" id="wizard-cancel">${esc(t('ui.back'))}</button>
              <button class="btn green" id="wizard-next">${esc(t('ui.ok'))}</button>
            </div>
          </div>
        ` : `
          <div class="wizard-panel trail-panel">
            <div class="buddy-chip"><span>${PET_EMOJI[selectedPetDef?.id] || '🐾'}</span>${esc(petName(selectedPetDef?.id))}</div>
            <div class="wizard-kicker">${esc(t('title.wizard_trail_title'))}</div>
            <div class="learning-trail-grid">
              ${TRAIL_CHOICES.map((choice) => `
                <button class="tile pressable learning-trail trail-${choice.tone} ${selectedTrail === choice.id ? 'equipped' : ''}" data-learning-trail="${esc(choice.id)}" aria-pressed="${selectedTrail === choice.id}">
                  <div class="trail-icon">${choice.icon}</div>
                  <div class="t-name">${esc(t(`title.trail_${choice.id}`))}</div>
                  <div class="t-price">${esc(t(`title.trail_${choice.id}_body`))}</div>
                </button>
              `).join('')}
            </div>
            <select id="new-pack" aria-label="${esc(t('title.curriculum_prompt'))}" class="hidden">${packOptions}</select>
            <div class="form-help">${esc(t('title.wizard_parent_note'))}</div>
            <div class="wizard-actions">
              <button class="btn soft" id="wizard-back">${esc(t('ui.back'))}</button>
              <button class="btn green" id="new-go">${esc(t('title.start'))}</button>
            </div>
          </div>
        `}
      </div>`;

    for (const btn of wizard.querySelectorAll('[data-starter-pet]')) {
      btn.addEventListener('click', () => {
        explorerName = wizard.querySelector('#new-name')?.value.trim() || explorerName;
        selectedPet = btn.dataset.starterPet;
        audio.sfx('click');
        renderWizard();
      });
    }
    for (const btn of wizard.querySelectorAll('[data-avatar-creature]')) {
      btn.addEventListener('click', () => {
        explorerName = wizard.querySelector('#new-name')?.value.trim() || explorerName;
        selectedCreature = btn.dataset.avatarCreature;
        audio.sfx('click');
        renderWizard();
      });
    }
    for (const btn of wizard.querySelectorAll('[data-learning-trail]')) {
      btn.addEventListener('click', () => {
        selectedTrail = btn.dataset.learningTrail;
        audio.sfx('click');
        renderWizard();
      });
    }
    wizard.querySelector('#wizard-next')?.addEventListener('click', () => {
      const rawName = wizard.querySelector('#new-name')?.value.trim() || '';
      if (!rawName) {
        flash(t('title.name_required'));
        wizard.querySelector('#new-name')?.focus();
        audio.sfx('boop');
        return;
      }
      explorerName = rawName;
      wizardStep = 2;
      audio.sfx('click');
      renderWizard();
    });
    wizard.querySelector('#wizard-cancel')?.addEventListener('click', () => {
      wizard.classList.add('hidden');
      el.classList.remove('wizard-active');
      playerCard.classList.remove('hidden');
      audio.sfx('click');
    });
    wizard.querySelector('#wizard-back')?.addEventListener('click', () => {
      wizardStep = 1;
      audio.sfx('click');
      renderWizard();
      wizard.querySelector('#new-name')?.focus();
    });
    wizard.querySelector('#new-name')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const rawName = wizard.querySelector('#new-name')?.value.trim() || '';
        if (!rawName) {
          flash(t('title.name_required'));
          audio.sfx('boop');
          return;
        }
        explorerName = rawName;
        wizardStep = 2;
        renderWizard();
      }
    });
    wizard.querySelector('#new-go')?.addEventListener('click', go);
  };

  const openWizard = () => {
    playerCard.classList.add('hidden');
    el.classList.add('wizard-active');
    wizard.classList.remove('hidden');
    wizardStep = 1;
    renderWizard();
    wizard.querySelector('#new-name')?.focus();
  };

  const go = () => {
    const rawName = explorerName.trim();
    if (!rawName) {
      wizardStep = 1;
      renderWizard();
      flash(t('title.name_required'));
      wizard.querySelector('#new-name')?.focus();
      audio.sfx('boop');
      return;
    }
    const name = rawName;
    const trail = TRAIL_CHOICES.find((choice) => choice.id === selectedTrail);
    const age = trail?.age ?? null;
    const packId = el.querySelector('#new-pack').value;
    const avatarPet = selectedPet;
    const avatarCreature = selectedCreature;
    const placementWarmup = !!trail?.placementWarmup;
    const p = createProfile(name, { age, packId, avatarPet, avatarCreature, placementWarmup });
    audio.sfx('correct');
    onPlay(p.id, true);
  };

  for (const tile of el.querySelectorAll('[data-pid]')) {
    tile.addEventListener('click', () => { audio.sfx('click'); onPlay(tile.dataset.pid); });
    // long-press to delete
    let timer = null;
    tile.addEventListener('pointerdown', () => {
      timer = setTimeout(() => {
        if (confirm(t('ui.confirm_delete'))) { deleteProfile(tile.dataset.pid); showTitle({ onPlay, onParents, onDuel, onLangChange }); }
      }, 900);
    });
    for (const ev of ['pointerup', 'pointerleave']) tile.addEventListener(ev, () => clearTimeout(timer));
  }
  el.querySelector('#tile-new').addEventListener('click', openWizard);
  for (const b of el.querySelectorAll('[data-lang]')) {
    b.addEventListener('click', () => {
      setLang(b.dataset.lang); persistNow();
      onLangChange?.();
      if (el.classList.contains('wizard-active')) {
        renderWizard();
        refreshLanguageButtons();
        return;
      }
      showTitle({ onPlay, onParents, onDuel, onLangChange });
    });
  }
  el.querySelector('#btn-parents')?.addEventListener('click', onParents);
  el.querySelector('#btn-duel')?.addEventListener('click', onDuel);
}
// ---------- story intro ----------

// Chapter 0 — "The One": the island was one whole thing, the Crab King split it
// and the grove went gray, and you'll weave it back one gentle line at a time.
// The fallen island (the all-faint founding hexagram) sits above the words as the
// through-line into the line-draw ceremonies the rest of the game pays off.
export function showStory(onDone) {
  let step = 0;
  const lines = [t('story.1'), t('story.2'), t('story.3'), t('story.4')];
  const faces = ['🦀', '🌫️', '🌴', '☯️'];
  const fallen = { lines: [false, false, false, false, false, false] };
  const el = render(`
    <div style="flex:1"></div>
    <div class="card" style="text-align:center">
      <div style="margin-bottom:10px">${storyHexagram(fallen)}</div>
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
