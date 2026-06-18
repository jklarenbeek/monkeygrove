// End-to-end smoke test: boots the real WebGL game in headless Chrome and drives
// the flow node/happy-dom can't reach — title -> create profile -> hub -> kitchen.
// Self-contained: spawns its own Vite dev server on a dedicated port and tears it
// down. Needs a Chrome/Chromium (skips cleanly if none is found, so CI without a
// browser won't fail). Run with: npm run test:e2e
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import assert from 'node:assert/strict';

const PORT = Number(process.env.MG_E2E_PORT || 5191);
const URL = `http://localhost:${PORT}/monkeygrove/`;
const CHROME = [process.env.MG_CHROME, '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser']
  .find((p) => p && existsSync(p));

if (!CHROME) {
  console.log('e2e: no Chrome/Chromium found — skipping (set MG_CHROME to run).');
  process.exit(0);
}

const sh = (sel) => `document.querySelector(${JSON.stringify(sel)})`;

async function waitForServer(timeoutMs = 40000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try { if ((await fetch(URL)).ok) return; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error('dev server did not come up');
}

const server = spawn('node', ['node_modules/vite/bin/vite.js', '--port', String(PORT), '--strictPort'], {
  stdio: 'ignore',
});
process.on('exit', () => server.kill('SIGTERM'));

let browser;
let code = 0;
try {
  await waitForServer();
  browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'],
  });
  const page = await browser.newPage({ viewport: { width: 900, height: 660 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });

  // helpers — overlays intercept real pointer events, so click/fill via JS
  const click = (sel) => page.evaluate((s) => { const e = document.querySelector(s); if (e) { e.click(); return true; } return false; }, sel);
  const fill = (sel, v) => page.evaluate(({ s, v }) => { const e = document.querySelector(s); if (e) { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); } }, { s: sel, v });
  const waitSel = (sel, t = 10000) => page.waitForFunction((s) => !!document.querySelector(s), sel, { timeout: t });
  const present = (sel) => page.evaluate((s) => !!document.querySelector(s), sel);
  const evalp = (js) => page.evaluate(js);
  const text = () => page.evaluate(() => document.querySelector('#screens')?.innerText || '');
  const pause = (ms) => page.waitForTimeout(ms);

  await page.goto(URL, { waitUntil: 'load', timeout: 30000 });

  // 1. boot + WebGL
  await waitSel('#attract-start');
  assert.ok(await present('#game-canvas'), 'game canvas exists');
  assert.equal(await evalp('(() => { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); })()'), true, 'WebGL is available');

  // 2. title -> new-explorer form
  await click('#attract-start');
  await waitSel('#new-go');

  // 3. create a profile (birth date avoids nothing here; we skip warm-up next)
  await fill('#new-name', 'E2E');
  await fill('#new-birth-date', '2015-06-18');
  await click('#new-go');

  // 4. through the intro story, then the warm-up
  await pause(800);
  for (let i = 0; i < 15 && await present('#story-next'); i++) { await click('#story-next'); await pause(250); }
  if (await present('#warmup-skip')) { await click('#warmup-skip'); }
  await pause(1500);

  // 5. landed in the hub (no screen open, HUD live)
  assert.equal(await evalp(`!${sh('#screens')}.firstElementChild`), true, 'hub: no modal screen open');
  assert.ok(await present('#btn-settings'), 'hub HUD is visible');

  // 6. dev preset: build the bakery, then enter the business scene
  await click('#btn-settings');
  await waitSel('#settings-extra-toggle');
  await click('#settings-extra-toggle');
  await waitSel('[data-settings-preset="bakery_built"]');
  await click('[data-settings-preset="bakery_built"]');
  await pause(1500);
  // startBusiness() is async now (it lazy-loads the business-* chunk); await the
  // promise so the assertion is real and this.business exists before we use it.
  assert.equal(await evalp('window.__game.startBusiness()'), true, 'business mode starts (bakery is built)');
  await pause(1200);

  // 7. the order panel works and shows the TODO_06 bake status
  await evalp('window.__game.business.showBusinessOrderPanel()');
  await waitSel('#business-serve');
  const panel = await text();
  assert.ok(/oven|🍞|🔥/i.test(panel), `order panel shows a bake status (got: ${panel.slice(0, 80)})`);

  assert.deepEqual(errors, [], `no page errors during the run`);
  console.log('e2e: PASSED — boot -> profile -> hub -> kitchen, no errors.');
} catch (e) {
  console.error('e2e: FAILED —', e.message);
  code = 1;
} finally {
  await browser?.close().catch(() => {});
  server.kill('SIGTERM');
}
process.exit(code);
