// Story-mode ceremonies: the line-draw reveal of "The Book of Banana Changes".
// When a world is mastered (or a remembered shore draws itself), the founding
// hexagram gains a line and the island steps toward balance. Calm and additive —
// no timers, no fail state (DESIGN.md): a quiet card the child taps through.
import { render, PET_EMOJI } from './core.js';
import { t } from '../i18n.js';
import { audio } from '../audio.js';
import { islandBloom } from '../story/engine.js';
import { LINE_POLARITY } from '../story/constants.js';

// Six stacked lines, line 6 (top) -> line 1 (bottom). Drawn lines are solid and
// bright; not-yet-drawn lines sit faint at their eventual yang/yin shape. The
// line(s) being celebrated this beat pulse.
function hexagramHtml(story, highlight = []) {
  const hi = new Set(highlight);
  let rows = '';
  for (let i = 5; i >= 0; i--) {
    const yang = LINE_POLARITY[i] === 1;
    const drawn = !!story.lines[i];
    const bar = yang
      ? '<span style="display:inline-block;width:128px;height:14px;border-radius:7px;background:currentColor"></span>'
      : '<span style="display:inline-block;width:56px;height:14px;border-radius:7px;background:currentColor"></span>'
        + '<span style="display:inline-block;width:16px"></span>'
        + '<span style="display:inline-block;width:56px;height:14px;border-radius:7px;background:currentColor"></span>';
    const color = drawn ? '#f4c95d' : 'rgba(255,255,255,.18)';
    const pulse = hi.has(i) ? 'animation:slot-pulse 1.1s ease-in-out infinite;' : '';
    rows += `<div style="color:${color};line-height:0;margin:5px 0;${pulse}">${bar}</div>`;
  }
  return `<div style="display:flex;flex-direction:column;align-items:center">${rows}</div>`;
}

function balanceHtml(story) {
  const bloom = islandBloom(story);
  let pips = '';
  for (let i = 0; i < 6; i++) {
    const on = i < bloom.linesDrawn;
    pips += `<span style="display:inline-block;width:18px;height:18px;border-radius:50%;margin:0 3px;background:${on ? '#7ccf7c' : 'rgba(255,255,255,.18)'}"></span>`;
  }
  return `
    <div style="margin-top:14px;opacity:.9">
      <div style="font-size:13px;letter-spacing:.04em;text-transform:uppercase;opacity:.7">${t('story.balance.label')}</div>
      <div style="margin:6px 0">${pips}</div>
      <div style="font-weight:700">${t('story.balance.value', { n: bloom.linesDrawn })}</div>
    </div>`;
}

function eventText(ev) {
  if (ev.kind === 'remembered_batch') return t('story.line.remembered_batch');
  const world = t('world.' + ev.world);
  if (ev.kind === 'remembered') return t('story.line.remembered', { world });
  const home = ev.friend ? ' ' + t('story.line.friend_home') : '';
  return t('story.line.earned', { world }) + home;
}

function eventFace(ev) {
  if (ev.kind === 'earned' && ev.friend && PET_EMOJI[ev.friend]) return PET_EMOJI[ev.friend];
  return ev.face || '✨';
}

function highlightFor(ev) {
  if (ev.kind === 'remembered_batch') return ev.lineIndices || [];
  return ev.lineIndex != null ? [ev.lineIndex] : [];
}

// Play a sequence of line-draw ceremony events (from story/chapters lineCeremonies),
// then onDone. `ctx.story` is the already-updated story state (lines latched).
export function showLineCeremony(events, ctx, onDone) {
  const list = Array.isArray(events) ? events.filter(Boolean) : [];
  if (!list.length) { onDone?.(); return; }
  const story = ctx?.story || { lines: [false, false, false, false, false, false] };
  let step = 0;

  const el = render(`
    <div style="flex:1"></div>
    <div class="card" style="text-align:center;max-width:420px;margin:0 auto">
      <div id="story-hex">${hexagramHtml(story, highlightFor(list[0]))}</div>
      <div id="story-face" style="font-size:56px;margin-top:10px">${eventFace(list[0])}</div>
      <div id="story-text" style="font-size:19px;font-weight:700;line-height:1.45;min-height:58px">${eventText(list[0])}</div>
      <div id="story-balance">${balanceHtml(story)}</div>
    </div>
    <button class="btn green" id="story-next">${t('ui.ok')} →</button>
    <div style="flex:2"></div>
  `);

  const bloom = islandBloom(story);
  const lastLabel = bloom.complete ? `☯️ ${t('ui.ok')}` : t('ui.ok') + ' →';

  const renderStep = () => {
    const ev = list[step];
    el.querySelector('#story-hex').innerHTML = hexagramHtml(story, highlightFor(ev));
    el.querySelector('#story-face').textContent = eventFace(ev);
    el.querySelector('#story-text').innerHTML = eventText(ev);
    const isLast = step === list.length - 1;
    el.querySelector('#story-next').innerHTML = isLast ? lastLabel : t('ui.ok') + ' →';
  };

  el.querySelector('#story-next').addEventListener('click', () => {
    audio.sfx('correct');
    step++;
    if (step >= list.length) {
      if (bloom.complete) el.querySelector('#story-text').innerHTML = t('story.complete');
      onDone?.();
      return;
    }
    renderStep();
  });
}
