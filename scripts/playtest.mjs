// Headless playtest driver — drives the running dev server in a real browser so
// changes can be verified visually (and as the basis for future E2E tests).
//
// Prereq: `npm run dev` is serving the game, and a Chromium/Chrome is installed.
// Usage:
//   node scripts/playtest.mjs <action> [<action> ...]
// Actions:
//   click:<sel>        JS-click a selector (overlays intercept real pointer events)
//   fill:<sel>=<val>   set an input's value + dispatch input/change
//   eval:<js>          run JS in the page (e.g. eval:window.__game.startBusiness())
//   press:<key>        keyboard press
//   tap:<x>,<y>        real mouse click at viewport coords (for canvas grid taps)
//   wait:<ms>          pause
// On exit it writes a screenshot and prints the visible #screens / #hud controls.
//
// State persists between runs via the user-data-dir, so you can build up a save.
// Handy hook: the game exposes the controller as `window.__game`.
import { chromium } from 'playwright';

const URL = process.env.MG_URL || 'http://localhost:5173/monkeygrove/';
const SHOT = process.env.MG_SHOT || '/tmp/mg-shot.png';
const PROFILE = process.env.MG_PROFILE || '/tmp/mg-playtest-profile';
const CHROME = process.env.MG_CHROME || '/usr/bin/google-chrome';

// MG_VIEWPORT="WIDTHxHEIGHT" (default 900x660) — lets the visual-baseline workflow
// capture desktop (1280x800) and mobile-portrait (390x844) from the same helper
// without code edits. Garbage values fall back to the default rather than crashing.
const DEFAULT_VIEWPORT = { width: 900, height: 660 };
function parseViewport(s) {
  const m = /^(\d+)x(\d+)$/.exec((s || '').trim());
  if (!m) return DEFAULT_VIEWPORT;
  const width = Number(m[1]), height = Number(m[2]);
  return width > 0 && height > 0 ? { width, height } : DEFAULT_VIEWPORT;
}
const viewport = parseViewport(process.env.MG_VIEWPORT);

const ctx = await chromium.launchPersistentContext(PROFILE, {
  executablePath: CHROME,
  headless: true,
  viewport,
  args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'],
});
const page = ctx.pages()[0] || await ctx.newPage();
const log = [];
page.on('pageerror', (e) => log.push(`[pageerror] ${e.message}`));
page.on('console', (m) => { if (m.type() === 'error') log.push(`[console.error] ${m.text()}`); });

if (!page.url().startsWith(URL)) await page.goto(URL, { waitUntil: 'load', timeout: 30000 });

for (const a of process.argv.slice(2)) {
  try {
    if (a === 'goto') await page.goto(URL, { waitUntil: 'load' });
    else if (a.startsWith('click:')) {
      const sel = a.slice(6);
      const ok = await page.evaluate((s) => { const e = document.querySelector(s); if (e) { e.click(); return true; } return false; }, sel);
      if (!ok) log.push(`[click '${sel}' — not found]`);
    } else if (a.startsWith('fill:')) {
      const [s, v] = a.slice(5).split('=');
      await page.evaluate(({ s, v }) => { const e = document.querySelector(s); if (e) { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); } }, { s, v });
    } else if (a.startsWith('eval:')) { log.push(`[eval] ${JSON.stringify(await page.evaluate(a.slice(5)))}`); }
    else if (a.startsWith('press:')) await page.keyboard.press(a.slice(6));
    else if (a.startsWith('tap:')) { const [x, y] = a.slice(4).split(',').map(Number); await page.mouse.click(x, y); }
    else if (a.startsWith('wait:')) await page.waitForTimeout(Number(a.slice(5)));
    await page.waitForTimeout(300);
  } catch (e) { log.push(`[action '${a}' failed] ${e.message.split('\n')[0]}`); }
}

await page.waitForTimeout(500);
await page.screenshot({ path: SHOT });
const dump = await page.evaluate(() => {
  const pick = (root) => [...(root?.querySelectorAll('button, input, [data-pid], [data-lang], [data-settings-preset], [data-review-value]') || [])]
    .map((e) => ({ id: e.id || '', txt: (e.innerText || e.value || '').trim().slice(0, 40), data: { ...e.dataset } }))
    .filter((e) => e.id || e.txt || Object.keys(e.data).length).slice(0, 30);
  return {
    mode: document.querySelector('#screens')?.firstElementChild ? 'screen-open' : 'in-world',
    screensText: (document.querySelector('#screens')?.innerText || '').slice(0, 200),
    screens: pick(document.querySelector('#screens')),
    hud: pick(document.querySelector('#hud')).map((e) => e.id),
  };
});
console.log(JSON.stringify(dump, null, 1));
if (log.length) console.log('LOG:\n' + log.join('\n'));
console.log('screenshot:', SHOT);
await ctx.close();
