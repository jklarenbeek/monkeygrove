// Visual baseline pack — the "before" evidence every later liveliness phase diffs
// against to prove "Low = today" and "a child can still read everything". Boots the
// real WebGL game in headless Chrome, walks to each key scene, and writes a PNG per
// (scene × viewport × motion) into tmp/baseline/ (git-ignored — large binaries stay
// out of the repo; re-run the command to regenerate). Self-contained: spawns its own
// Vite dev server and tears it down. Skips cleanly if no Chrome is found.
//
//   npm run baseline                 # capture the full pack
//   MG_GRAPHICS=low npm run baseline # force a tier (default: auto)
//
// Capture on a fixed seed/profile + pinned viewports so diffs stay meaningful; only
// re-baseline deliberately (see PHASE_0 §5).
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.MG_BASE_PORT || 5192);
const URL = `http://localhost:${PORT}/monkeygrove/`;
const OUT = fileURLToPath(new URL('../tmp/baseline/', import.meta.url));
const GRAPHICS = process.env.MG_GRAPHICS || 'auto';
const CHROME = [process.env.MG_CHROME, '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser']
  .find((p) => p && existsSync(p));

if (!CHROME) {
  console.log('baseline: no Chrome/Chromium found — skipping (set MG_CHROME to run).');
  process.exit(0);
}

mkdirSync(OUT, { recursive: true });

// Desktop + portrait-phone, pinned so diffs stay comparable.
const VIEWPORTS = [
  { id: 'desktop', width: 900, height: 660 },
  { id: 'portrait', width: 390, height: 780 },
];

const server = spawn('node', ['node_modules/vite/bin/vite.js', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' });
process.on('exit', () => server.kill('SIGTERM'));

async function waitForServer(timeoutMs = 40000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try { if ((await fetch(URL)).ok) return; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error('dev server did not come up');
}

const click = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (e) { e.click(); return true; } return false; }, sel);
const fill = (page, sel, v) => page.evaluate(({ s, v }) => { const e = document.querySelector(s); if (e) { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); } }, { s: sel, v });
const present = (page, sel) => page.evaluate((s) => !!document.querySelector(s), sel);
const waitSel = (page, sel, t = 10000) => page.waitForFunction((s) => !!document.querySelector(s), sel, { timeout: t });
const pause = (page, ms) => page.waitForTimeout(ms);

async function captureScene(page, tag) {
  await pause(page, 600);
  await page.screenshot({ path: `${OUT}${tag}.png` });
  console.log('  ✓', `${tag}.png`);
}

let browser, code = 0;
try {
  await waitForServer();
  browser = await chromium.launch({
    executablePath: CHROME, headless: true,
    args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'],
  });

  for (const vp of VIEWPORTS) {
    for (const reduced of [false, true]) {
      const motion = reduced ? 'reduced' : 'motion';
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        reducedMotion: reduced ? 'reduce' : 'no-preference',
      });
      const page = await ctx.newPage();
      await page.goto(URL, { waitUntil: 'load', timeout: 30000 });
      // the dev tuning panel (gfxdev.js) mounts in dev mode — hide it so it never
      // pollutes a baseline screenshot.
      await page.addStyleTag({ content: '#gfxdev{display:none!important}' });
      await waitSel(page, '#attract-start');
      // pin the graphics tier for a stable baseline
      await page.evaluate((g) => { try { const s = JSON.parse(localStorage.getItem('monkeygrove.save') || '{}'); s.settings = { ...(s.settings || {}), graphics: g }; localStorage.setItem('monkeygrove.save', JSON.stringify(s)); } catch {} }, GRAPHICS);

      const base = `${vp.id}-${motion}`;
      // 1. title attract island
      await captureScene(page, `${base}-title`);

      // 2. create a quick profile → hub
      await click(page, '#attract-start');
      if (await present(page, '#tile-new')) {
        await click(page, '#tile-new');
        await waitSel(page, '#new-name');
        await fill(page, '#new-name', 'Base');
        await click(page, '#wizard-next');
        if (await present(page, '#new-go')) await click(page, '#new-go');
        await pause(page, 800);
        for (let i = 0; i < 15 && await present(page, '#story-next'); i++) { await click(page, '#story-next'); await pause(page, 200); }
        if (await present(page, '#warmup-skip')) await click(page, '#warmup-skip');
        await pause(page, 1500);
      }
      await captureScene(page, `${base}-hub`);

      // 3. build everything + bakery business scene via the dev preset
      if (await present(page, '#btn-settings')) {
        await click(page, '#btn-settings');
        if (await present(page, '#settings-extra-toggle')) {
          await click(page, '#settings-extra-toggle');
          if (await present(page, '[data-settings-preset="festival_complete"]')) {
            await click(page, '[data-settings-preset="festival_complete"]');
            await pause(page, 1500);
          }
        }
        if (await present(page, '#scr-back')) await click(page, '#scr-back');
        await captureScene(page, `${base}-hub-full`);
        await page.evaluate(() => window.__game?.startBusiness?.());
        await pause(page, 1400);
        await captureScene(page, `${base}-business`);
      }
      await ctx.close();
    }
  }
  console.log(`\nbaseline: wrote pack to ${OUT} (graphics=${GRAPHICS}).`);
} catch (e) {
  console.error('baseline: FAILED —', e.message);
  code = 1;
} finally {
  await browser?.close().catch(() => {});
  server.kill('SIGTERM');
}
process.exit(code);
