// Chamber result overlay: tap the chest to reveal the run's rewards, then choose
// Next or Home.
import { render } from './core.js';
import { t } from '../i18n.js';
import { audio } from '../audio.js';

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
