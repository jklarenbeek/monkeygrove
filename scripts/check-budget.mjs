// First-load performance budget. Runs after `vite build` (see `npm run build`) and
// FAILS the build if the first download re-bloats — the guardrail that makes the
// lazy-fonts (TODO_01) and code-split-business (TODO_02) wins stick. Checks:
//   1. the first-load `index` JS gzip stays under budget (the target is kids on
//      slow school Wi-Fi / cheap Android, so this stays a HARD cap),
//   2. no always-loaded webfont ships (none in the precache, none @font-face'd in the
//      always-loaded CSS — the dyslexia font must stay lazy, registered at runtime),
//   3. the PWA precache total stays under budget,
//   4. the bakery `business-*` chunk stays lazily-loaded (its own chunk, never folded
//      into `index` nor static-imported / module-preloaded from the entry).
// Re-run standalone (no rebuild) with `npm run build:check`. Update the budgets below
// — and ARCHITECTURE.md's "Performance budget" — deliberately when the baseline moves.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

// --- Budgets ---------------------------------------------------------------
// Headroom is small on purpose: enough to absorb gzip jitter between toolchain
// versions, tight enough to catch a re-bloating feature (a font is 100+ KB, a
// folded-back chunk a few KB gzip). Recorded post-TODO_01/02 (2026-06-18):
// index 210.09 kB gzip, precache 15 entries / 1088.28 KiB.
// 2026-06-27: bumped 215 -> 217 for the unified creature roster — 10 new
// hand-authored character meshes (8 full-body pets + chibi monkey/mimi) that the
// hub/attract/avatar reference eagerly (~1.5 kB gzip). index was ~215.2 kB gzip.
// 2026-06-27: bumped 217 -> 235 for story mode — the vendored yijingjs engine and
// per-chapter content land in the entry (~221 kB gzip today). Raised DELIBERATELY,
// not removed: the cap stays a real guardrail (the target is cheap Android / school
// Wi-Fi). When the entry approaches this again, code-split the story screens/prose
// into a lazy chunk (like business-*/duel-*) rather than just bumping the number.
// 2026-06-28: precache 1150 -> 1200 for the "liveliness" plan (Phases 1-5): sky,
// quality tiers, contact shadows, micro-prop scatter, ambient ecosystem, and GPU
// sway are all PROCEDURAL code (no shipped image/HDR/audio assets), so only the
// always-lazy app chunks grew (~a few KiB uncompressed). index gzip stayed well
// under cap (~227). Bumped deliberately; the cap stays a real guardrail.
const INDEX_JS_GZIP_BUDGET_KB = 235;   // decimal kB (÷1000), matches Vite's report
const PRECACHE_BUDGET_KIB = 1200;      // binary KiB (÷1024), matches workbox's report

const DIST = 'dist';
const ASSETS = join(DIST, 'assets');

const fail = (msg) => { console.error(`  ✗ ${msg}`); return false; };
const pass = (msg) => { console.log(`  ✓ ${msg}`); return true; };

if (!existsSync(ASSETS)) {
  console.error('check-budget: no dist/assets — run `vite build` first.');
  process.exit(1);
}

const assets = readdirSync(ASSETS);
const findAsset = (re) => {
  const name = assets.find((f) => re.test(f));
  return name ? join(ASSETS, name) : null;
};

const checks = [];

// 1. First-load JS: the `index` entry chunk's gzip size — a HARD cap.
const indexJs = findAsset(/^index-.*\.js$/);
if (!indexJs) {
  checks.push(fail('no index-*.js entry chunk found in dist/assets'));
} else {
  const gzipKb = gzipSync(readFileSync(indexJs)).length / 1000;
  const label = `first-load JS: ${gzipKb.toFixed(2)} kB gzip (budget ${INDEX_JS_GZIP_BUDGET_KB} kB)`;
  checks.push(gzipKb <= INDEX_JS_GZIP_BUDGET_KB ? pass(label) : fail(label));
}

// 2a. No always-loaded webfont in the shipped CSS. A lazy font is registered via the
//     FontFace API in JS (src/a11y.js), never @font-face'd into the always-loaded CSS,
//     so a woff2 url() here means a font went back to always-loaded.
const indexCss = findAsset(/^index-.*\.css$/);
if (!indexCss) {
  checks.push(fail('no index-*.css found in dist/assets'));
} else if (readFileSync(indexCss, 'utf8').includes('.woff2')) {
  checks.push(fail('always-loaded CSS references a .woff2 — fonts must stay lazy'));
} else {
  checks.push(pass('no always-loaded webfont in CSS'));
}

// Parse the workbox precache manifest from the generated service worker. generateSW
// emits `precacheAndRoute([{url,revision},...])`; the array is a JS object literal
// (unquoted keys), so quote them before JSON.parse. No nested arrays → the first ']'
// after the '[' closes it.
const swPath = join(DIST, 'sw.js');
let precache = null;
if (existsSync(swPath)) {
  const sw = readFileSync(swPath, 'utf8');
  const open = sw.indexOf('[', sw.indexOf('precacheAndRoute('));
  const close = open === -1 ? -1 : sw.indexOf(']', open);
  if (open !== -1 && close !== -1) {
    try {
      precache = JSON.parse(sw.slice(open, close + 1).replace(/([{,])(\w+):/g, '$1"$2":'));
    } catch { /* fall through to the failure below */ }
  }
}

if (!precache) {
  checks.push(fail('could not parse the precache manifest from dist/sw.js'));
} else {
  // 2b. No webfont in the precache (kept out via the glob in vite.config.js).
  const fonts = precache.filter((e) => /\.woff2?$/.test(e.url));
  checks.push(fonts.length === 0
    ? pass('no webfont in PWA precache')
    : fail(`webfont(s) in precache: ${fonts.map((e) => e.url).join(', ')}`));

  // 3. Precache total. Sum unique URLs (matches workbox's reported KiB; the manifest
  //    lists icons twice from includeAssets + manifest.icons).
  const seen = new Set();
  let bytes = 0;
  for (const { url } of precache) {
    if (seen.has(url)) continue;
    seen.add(url);
    const f = join(DIST, url);
    if (existsSync(f)) bytes += statSync(f).size;
  }
  const kib = bytes / 1024;
  const label = `PWA precache: ${precache.length} entries / ${kib.toFixed(2)} KiB (budget ${PRECACHE_BUDGET_KIB} KiB)`;
  checks.push(kib <= PRECACHE_BUDGET_KIB ? pass(label) : fail(label));
}

// 4. The bakery sim stays lazy: it has its own `business-*` chunk (not folded into
//    `index`) and the entry never static-imports it (Vite would module-preload a
//    static import into index.html). Either regression is what this budget guards.
const businessChunk = assets.find((f) => /^business-.*\.js$/.test(f));
const indexHtml = existsSync(join(DIST, 'index.html')) ? readFileSync(join(DIST, 'index.html'), 'utf8') : '';
if (!businessChunk) {
  checks.push(fail('no business-*.js chunk — the bakery sim folded back into index'));
} else if (indexHtml.includes('business-')) {
  checks.push(fail('index.html preloads the business chunk — it is no longer lazy'));
} else {
  checks.push(pass('bakery business chunk stays lazy'));
}

if (checks.includes(false)) {
  console.error('\ncheck-budget: FAIL — first-load budget exceeded (see ✗ above).');
  process.exit(1);
}
console.log('\ncheck-budget: OK — within first-load budget.');
