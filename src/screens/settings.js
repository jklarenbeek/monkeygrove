// Settings overlay: language, sfx/music, comfort + accessibility toggles, switch
// player, and the optional DEV tools panel (HTML + handlers injected by the caller).
import { render, backBtn } from './core.js';
import { t, setLang } from '../i18n.js';
import { languageButton } from '../langFlags.js';
import { applyComfortSettings, reducedMotion } from '../a11y.js';
import { audio } from '../audio.js';
import { settings, persist, persistNow, setActiveProfileLanguage } from '../state.js';
import { GRAPHICS_SETTINGS, refreshGfx } from '../gfx.js';

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
          <button class="btn soft" id="tg-ambience" aria-pressed="${s.ambience !== false}">${s.ambience !== false ? '🌊' : '🔇'} ${t('settings.ambience')}</button>
        </div>
        <div class="menu-col">
          <button class="btn soft" id="tg-motion" aria-pressed="${reducedMotion()}">${reducedMotion() ? '🐢' : '🏃'} ${t('settings.reduce_motion')}</button>
          <button class="btn soft" id="tg-font" aria-pressed="${!!s.dyslexiaFont}">🔤 ${t('settings.dyslexia_font')}</button>
          <button class="btn soft" id="tg-contrast" aria-pressed="${!!s.highContrast}">${s.highContrast ? '◑' : '○'} ${t('settings.high_contrast')}</button>
          <button class="btn soft" id="tg-colorblind" aria-pressed="${!!s.colorblind}">${s.colorblind ? '◑' : '○'} ${t('settings.colorblind')}</button>
          <button class="btn soft" id="tg-textsize">🔠 ${t('settings.text_size')}: ${Math.round((s.textScale || 1) * 100)}%</button>
        </div>
        <div class="menu-col">
          <span style="font-weight:800" title="${t('settings.graphics_relaunch')}">🎨 ${t('settings.graphics')}</span>
          <div class="lang-toggle" id="graphics-toggle" role="group" aria-label="${t('settings.graphics')}">
            ${GRAPHICS_SETTINGS.map((g) => `<button class="btn soft" data-graphics="${g}" aria-pressed="${(s.graphics || 'auto') === g}">${t('settings.graphics_' + g)}</button>`).join('')}
          </div>
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
      setLang(b.dataset.lang); setActiveProfileLanguage(b.dataset.lang); persistNow(); onLangChange?.();
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
  el.querySelector('#tg-ambience').addEventListener('click', () => {
    s.ambience = s.ambience === false; audio.setAmbience(s.ambience); persist();
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
  el.querySelector('#tg-colorblind').addEventListener('click', () => {
    s.colorblind = !s.colorblind; applyComfortSettings(); persist();
    showSettings({ onClose, onSwitchPlayer, onLangChange, devTools });
  });
  el.querySelector('#tg-textsize').addEventListener('click', () => {
    const steps = [1, 1.15, 1.3];
    const i = steps.findIndex((v) => Math.abs(v - (s.textScale || 1)) < 0.01);
    s.textScale = steps[(i + 1) % steps.length];
    applyComfortSettings(); persist();
    showSettings({ onClose, onSwitchPlayer, onLangChange, devTools });
  });
  for (const b of el.querySelectorAll('[data-graphics]')) {
    b.addEventListener('click', () => {
      s.graphics = GRAPHICS_SETTINGS.includes(b.dataset.graphics) ? b.dataset.graphics : 'auto';
      refreshGfx(); // live-flip density/ambient/sway; GL-state flags apply next launch
      persist();
      showSettings({ onClose, onSwitchPlayer, onLangChange, devTools });
    });
  }
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
