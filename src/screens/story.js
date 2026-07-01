// Story-mode ceremonies: the line-draw reveal of "The Book of Banana Changes".
// When a world is mastered (or a remembered shore draws itself), the founding
// hexagram gains a line and the island steps toward balance. Calm and additive —
// no timers, no fail state (DESIGN.md): a quiet card the child taps through.
import { render, backBtn, PET_EMOJI } from './core.js';
import { t } from '../i18n.js';
import { audio } from '../audio.js';
import { islandBloom } from '../story/engine.js';
import { LINE_POLARITY } from '../story/constants.js';
import { NARRATIVE_BEATS } from '../story/chapters.js';
import { voxelSvg } from '../voxelsvg.js';
import { getCreature } from '../mesh/creatures.js';
import { reducedMotion } from '../a11y.js';

// Phase 6: a returning friend arrives as its REAL voxel self (an isometric render of
// the exact 3D model), not an emoji stand-in — and, unless reduced-motion is on, it
// walks home from the side. A gentle CSS entrance, no timers, no WebGL canvas.
const FRIEND_STYLE = `<style>
  @keyframes story-friend-walk {
    0% { transform: translateX(-64px) scale(.88); opacity: 0; }
    62% { transform: translateX(5px) scale(1.05); opacity: 1; }
    100% { transform: translateX(0) scale(1); opacity: 1; }
  }
  #story-face { min-height: 84px; margin-top: 10px; }
  .story-friend { display: flex; justify-content: center; align-items: flex-end; height: 84px; }
  .story-friend svg { height: 80px; width: auto; filter: drop-shadow(0 4px 3px rgba(0,0,0,.18)); }
  .story-friend-walk { animation: story-friend-walk .7s cubic-bezier(.22,1,.36,1) both; }
</style>`;

// The face for a ceremony beat: a real returning friend (voxel render, walking home)
// when one comes with the line, otherwise the beat's emoji.
function faceHtml(ev) {
  if (ev.kind === 'earned' && ev.friend) {
    const creature = getCreature(ev.friend);
    const svg = creature?.full ? voxelSvg(creature.full) : '';
    if (svg) return `<div class="story-friend ${reducedMotion() ? '' : 'story-friend-walk'}">${svg}</div>`;
  }
  return `<span style="font-size:56px">${eventFace(ev)}</span>`;
}

// Six stacked lines, line 6 (top) -> line 1 (bottom). Drawn lines are solid and
// bright; not-yet-drawn lines sit faint at their eventual yang/yin shape. The
// line(s) being celebrated this beat pulse. Exported so the intro can show the
// same motif (a fallen, all-faint island) as a through-line into the ceremonies.
export function storyHexagram(story, highlight = []) {
  return hexagramHtml(story, highlight);
}
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
    ${FRIEND_STYLE}
    <div style="flex:1"></div>
    <div class="card" style="text-align:center;max-width:420px;margin:0 auto">
      <div id="story-hex">${hexagramHtml(story, highlightFor(list[0]))}</div>
      <div id="story-face">${faceHtml(list[0])}</div>
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
    el.querySelector('#story-face').innerHTML = faceHtml(ev); // re-render replays the walk-in
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

// A narrative beat (the Four-Directions reveal, the finale): a few prose pages
// with the founding hexagram showing the beat's line freshly drawn. The caller
// latches the line before showing this, so the hexagram already reflects it.
export function showStoryBeat(beatKey, ctx, onDone) {
  const beat = NARRATIVE_BEATS[beatKey];
  if (!beat) { onDone?.(); return; }
  const story = ctx?.story || { lines: [false, false, false, false, false, false] };
  const pages = beat.pages;
  const faces = beat.faces || [];
  let step = 0;

  const el = render(`
    <div style="flex:1"></div>
    <div class="card" style="text-align:center;max-width:420px;margin:0 auto">
      <div id="story-hex">${hexagramHtml(story, [beat.lineIndex])}</div>
      <div id="story-face" style="font-size:56px;margin-top:10px">${faces[0] || '✨'}</div>
      <div id="story-text" style="font-size:19px;font-weight:700;line-height:1.45;min-height:58px">${t(pages[0])}</div>
    </div>
    <button class="btn green" id="story-next">${t('ui.ok')} →</button>
    <div style="flex:2"></div>
  `);

  el.querySelector('#story-next').addEventListener('click', () => {
    audio.sfx('click');
    step++;
    if (step >= pages.length) { onDone?.(); return; }
    el.querySelector('#story-face').textContent = faces[step] || '✨';
    el.querySelector('#story-text').innerHTML = t(pages[step]);
  });
}

// The Balance Dial (the Altar of Balance) — the deep reading the hybrid bloom
// reserves for here. Shows the founding hexagram, a needle that seeks the MIDDLE
// (balanced, not maxed — the anti-perfectionism moral), and the lines-returned
// count. Child-safe throughout (no yijing/hexagram words).
export function showAltar({ story, onClose }) {
  const bloom = islandBloom(story);
  const balancePct = Math.round(bloom.balance * 100); // 0..50 in this game's model
  const inBalance = bloom.complete || bloom.balance === 0.5;

  const el = render(`
    ${backBtn()}
    <h2>☯️ ${t('altar.title')}</h2>
    <div class="tagline" style="margin-bottom:10px">${t('altar.sub')}</div>
    <div class="card" style="text-align:center">
      ${hexagramHtml(story)}
      <div style="margin-top:16px">
        <div style="font-size:13px;letter-spacing:.04em;text-transform:uppercase;opacity:.7">${t('altar.balance')}</div>
        <div style="position:relative;height:18px;border-radius:9px;background:rgba(255,255,255,.12);margin:8px 0">
          <div style="position:absolute;left:calc(50% - 14px);top:-3px;width:28px;height:24px;border-radius:8px;background:rgba(124,207,124,.25)"></div>
          <div style="position:absolute;left:50%;top:-5px;bottom:-5px;width:2px;background:rgba(124,207,124,.8)"></div>
          <div style="position:absolute;left:calc(${balancePct}% - 7px);top:-4px;width:14px;height:26px;border-radius:7px;background:#f4c95d;transition:left .5s ease"></div>
        </div>
        <div style="font-weight:800;min-height:22px">${inBalance ? t('altar.in_balance') : ''}</div>
      </div>
      ${balanceHtml(story)}
      <div style="margin-top:14px;font-size:14px;line-height:1.4;color:var(--ink-soft)">
        ${bloom.complete ? t('altar.complete') : t('altar.goal')}
      </div>
      <div style="margin-top:10px;font-size:13px;line-height:1.4;opacity:.75">${t('altar.tip')}</div>
    </div>
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
}
