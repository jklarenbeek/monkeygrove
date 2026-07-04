// Visual end-to-end for the Memory Grove (docs/06, Phases 1–3). Boots the real
// game, jumps straight to a memory-ready state with the `memory_grove` dev preset,
// then drives every surface through window.__game and screenshots each into
// scripts/screens-memory/. Proves the features render + wire without page errors.
//
//   node scripts/e2e-memory.mjs      (or: MG_CHROME=/path npm run test:e2e:memory)
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const PORT = Number(process.env.MG_E2E_PORT || 5192);
const APP_URL = `http://localhost:${PORT}/monkeygrove/`;
const CHROME = [process.env.MG_CHROME, '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser']
  .find((p) => p && existsSync(p));
const SHOTS = fileURLToPath(new URL('./screens-memory/', import.meta.url));

if (!CHROME) {
  console.log('e2e-memory: no Chrome/Chromium found — skipping (set MG_CHROME to run).');
  process.exit(0);
}
mkdirSync(SHOTS, { recursive: true });

const server = spawn('node', ['node_modules/vite/bin/vite.js', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' });
process.on('exit', () => server.kill('SIGTERM'));

async function waitForServer(timeoutMs = 40000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try { if ((await fetch(APP_URL)).ok) return; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error('dev server did not come up');
}

let browser;
let code = 0;
try {
  await waitForServer();
  browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'],
  });
  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });

  const click = (sel) => page.evaluate((s) => { const e = document.querySelector(s); if (e) { e.click(); return true; } return false; }, sel);
  const fill = (sel, v) => page.evaluate(({ s, v }) => { const e = document.querySelector(s); if (e) { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true })); } }, { s: sel, v });
  const waitSel = (sel, t = 12000) => page.waitForFunction((s) => !!document.querySelector(s), sel, { timeout: t });
  const present = (sel) => page.evaluate((s) => !!document.querySelector(s), sel);
  const evalp = (js) => page.evaluate(js);
  const txt = () => page.evaluate(() => document.querySelector('#screens')?.innerText || '');
  const pause = (ms) => page.waitForTimeout(ms);
  // let the screen's fade-in transition settle before capturing
  const shot = async (name) => { await pause(500); await page.screenshot({ path: `${SHOTS}${name}.png` }); console.log(`  📸 ${name}.png`); };

  await page.goto(APP_URL, { waitUntil: 'load', timeout: 30000 });

  // 1. boot -> new explorer -> skip intro cutscene + checkup -> hub
  await waitSel('#attract-start');
  await click('#attract-start');
  await waitSel('#tile-new'); await click('#tile-new');
  await waitSel('#new-name'); await fill('#new-name', 'MemE2E');
  await click('#wizard-next'); await waitSel('#new-go'); await click('#new-go');
  await page.waitForFunction(() => {
    const c = document.getElementById('cutscene-ui');
    return (c && !c.classList.contains('hidden')) || !!document.querySelector('#story-next');
  }, { timeout: 20000 });
  if (await evalp('!!document.querySelector("#cutscene-ui:not(.hidden)")')) {
    await waitSel('#cutscene-skip', 15000); await click('#cutscene-skip');
  } else {
    for (let i = 0; i < 15 && await present('#story-next'); i++) { await click('#story-next'); await pause(200); }
  }
  await page.waitForFunction(() => !document.getElementById('cutscene-ui')
    || document.getElementById('cutscene-ui').classList.contains('hidden'), null, { timeout: 10000 });
  await pause(700);
  if (await present('#checkup-skip')) await click('#checkup-skip');
  await pause(1200);
  assert.ok(await present('#btn-settings'), 'landed in hub');

  // 2. jump to the Memory-Grove-ready state via the dev preset
  await click('#btn-settings');
  await waitSel('#settings-extra-toggle'); await click('#settings-extra-toggle');
  await waitSel('[data-settings-preset="memory_grove"]');
  await click('[data-settings-preset="memory_grove"]');
  await pause(1200);
  await evalp('window.__game.startHub()');
  await pause(2600); // let the hub's arrival camera + blueprint toasts settle first
  assert.equal(await evalp('window.__game.profile.memory.enabled'), true, 'memory enabled by preset');
  assert.ok(await evalp('Object.keys(window.__game.profile.memory.anchors).length >= 2'), 'anchors adopted');

  // 3. Gem Tree overlay — the adoption card (Phase 1) with adoptable + adopted anchors
  await evalp('window.__game.hub.openGems()');
  await waitSel('#mem-open'); // the "Open the Memory Grove" button only shows when unlocked
  const gems = await txt();
  assert.ok(/Memory Grove/i.test(gems), 'gem tree shows the Memory Grove card');
  await shot('1-gemtree-adoption');

  // 4. the anchor browser (Phase 2 §4.6 + Phase 3 code entry + probe)
  await evalp('window.__game.hub.openMemory()');
  await waitSel('[data-walk]');
  const browser0 = await txt();
  assert.ok(/Memory walk|Count by/i.test(browser0), 'browser shows walk steps');
  assert.ok(await present('#mem-code-play'), 'challenge-code entry present');
  assert.ok(await present('#mem-probe'), 'recall-probe entry present');
  await shot('2-memory-browser');

  // 5. a memory WALK — drive a short 3-stop skip-count via the debug instance
  await evalp('window.__game.hub.startMemoryWalk(7, { stops: 3 })');
  await pause(500);
  assert.equal(await evalp('window.__game.mode'), 'walk', 'walk mode active');
  await evalp('window.__game.memoryWalk.present()'); // force the arrival card
  await waitSel('#mem-walk-exit');
  await shot('3-walk-step');
  // answer all three stops (7, 14, 21) → the done card with the shareable code
  for (let i = 0; i < 3; i++) {
    const answer = await evalp(`window.__game.memoryWalk.walk.stops[${i}].answer`);
    await evalp(`window.__game.memoryWalk.present()`);
    await evalp(`window.__game.memoryWalk.grade(${answer})`);
    await pause(350);
  }
  await waitSel('#mem-walk-home', 8000);
  const doneTxt = await txt();
  assert.ok(/MW7-3/.test(doneTxt), `walk done card shows the challenge code (got: ${doneTxt.slice(0, 80)})`);
  await shot('4-walk-done-code');
  await click('#mem-walk-home'); await pause(600);

  // 6. the opt-in recall probe (Phase 3 §7)
  await evalp('window.__game.hub.startMemoryProbe()');
  await waitSel('#mem-probe-exit');
  assert.equal(await evalp('window.__game.mode'), 'probe', 'probe mode active');
  await shot('5-probe-item');
  // answer every item correctly → a 'pre' baseline gets recorded
  await page.waitForFunction(() => {
    const g = window.__game;
    if (!g.memoryProbe || g.mode !== 'probe') return true;
    const it = g.memoryProbe.items[g.memoryProbe.i];
    if (!it) return true;
    g.memoryProbe.answer(it.answer);
    return false;
  }, null, { timeout: 8000, polling: 250 });
  await waitSel('#mem-probe-home', 8000);
  await shot('6-probe-done');
  assert.equal(await evalp('window.__game.profile.memory.probes.length'), 1, 'probe recorded');
  assert.equal(await evalp('window.__game.profile.memory.probes[0].phase'), 'pre', 'first probe is the pre baseline');
  await click('#mem-probe-home'); await pause(600);

  // 7. the memory HINT inside a chamber (Phase 1 §4.3 + Phase 3 A/B) — force a 7×8
  //    problem (the adopted, wobbly anchor) via debugChamber's targetFact, open the
  //    hint, and confirm an A/B arm was assigned and the hint bubble is shown.
  const forced = await evalp("window.__game.chamber.debugChamber(null, 'fetch', '7x8')");
  assert.equal(await evalp('window.__game.problem.meta.a * window.__game.problem.meta.b'), 56, 'forced the 7×8 fact');
  await pause(400);
  await evalp('window.__game.chamber.useHint()');
  await pause(500);
  const hintArm = await evalp('window.__game.hintArm && window.__game.hintArm.arm');
  assert.ok(hintArm === 'mem' || hintArm === 'model', `hint A/B arm assigned (got ${hintArm}, eq ${forced.eq})`);
  await shot('7-chamber-memory-hint');

  // 8. parents analytics — adoption, walks, probe, and the A/B all surfaced. The
  //    dashboard renders from appflow (same module the app already loaded).
  await evalp('window.__game.startHub()'); await pause(400);
  await evalp(`import(new URL('src/appflow.js', document.baseURI).href)
    .then((m) => m.showParents(window.__game, window.__game.profile.id, () => window.__game.startHub()))`);
  await waitSel('#scr-back', 6000);
  const parents = await txt();
  assert.ok(/Memory Grove/i.test(parents), 'parents screen shows the Memory Grove analytics block');
  // scroll the analytics card into view (it sits below the curriculum block)
  await evalp(`[...document.querySelectorAll('#screens h3')]
    .find((h) => /Memory Grove/.test(h.textContent))?.scrollIntoView({ block: 'center' })`);
  await shot('8-parents-analytics');

  assert.deepEqual(errors, [], 'no page errors during the run');
  console.log(`e2e-memory: PASSED — preset -> gem-tree adoption -> browser -> walk+code -> probe -> chamber hint -> parents, no errors. Screens in ${SHOTS}`);
} catch (e) {
  console.error('e2e-memory: FAILED —', e.message);
  code = 1;
} finally {
  await browser?.close().catch(() => {});
  server.kill('SIGTERM');
}
process.exit(code);
