// Chamber result overlay: tap the chest to reveal the run's rewards, then choose
// Next or Home.
import { render } from './core.js';
import { t } from '../i18n.js';
import { audio } from '../audio.js';

export function showResult({ rewards, wonder = null, onWonderOpen, onNext, onHome }) {
  // Phase 7: an optional "did you know?" door — the moment the child just lived (a twin
  // gem, an array both ways) offered as a gentle reveal. Never required: tap to open, or
  // just press Next. Appears only after the chest so it never competes with the reward.
  const wonderHtml = wonder ? `
    <button class="btn soft hidden" id="result-wonder" style="margin-top:12px">✨ ${t('result.wonder')}</button>
    <div class="card hidden" id="wonder-card" style="max-width:400px;margin:10px auto;text-align:center">
      <div style="font-weight:800">${t(wonder.titleKey)}</div>
      <div style="font-size:14px;line-height:1.5;color:var(--ink-soft);margin-top:6px">${t(wonder.bodyKey)}</div>
    </div>` : '';
  const el = render(`
    <div style="flex:1"></div>
    <h2>${t('result.title')}</h2>
    <div id="result-chest">🎁</div>
    <div class="tagline" id="chest-hint">${t('result.tap_chest')}</div>
    <div class="reward-row hidden" id="reward-row"></div>
    ${wonderHtml}
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
    el.querySelector('#result-wonder')?.classList.remove('hidden');
  }, { once: false });
  const wonderBtn = el.querySelector('#result-wonder');
  wonderBtn?.addEventListener('click', () => {
    wonderBtn.classList.add('hidden');
    el.querySelector('#wonder-card').classList.remove('hidden');
    audio.sfx('correct');
    onWonderOpen?.(wonder.id);
  });
  el.querySelector('#res-next').addEventListener('click', onNext);
  el.querySelector('#res-home').addEventListener('click', onHome);
}
