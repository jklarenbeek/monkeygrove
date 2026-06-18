import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = (p) => new URL(`../${p}`, import.meta.url);

test('PWA app icons are present (generated into public/)', () => {
  for (const f of ['public/pwa-192.png', 'public/pwa-512.png', 'public/pwa-maskable-512.png', 'public/apple-touch-icon.png']) {
    assert.ok(existsSync(root(f)), `${f} exists`);
  }
});

test('vite config registers an offline-capable, installable PWA', () => {
  const cfg = readFileSync(root('vite.config.js'), 'utf8');
  assert.match(cfg, /VitePWA\(/, 'the VitePWA plugin is configured');
  assert.match(cfg, /registerType:\s*'autoUpdate'/, 'auto-updates so users are never cache-trapped on a stale build');
  assert.ok(cfg.includes('pwa-maskable-512.png') && cfg.includes("purpose: 'maskable'"), 'declares a maskable icon for Android');
  // The opt-in dyslexia font is kept OUT of the precache glob and runtime-cached instead, so
  // it still works offline once enabled without bloating every kid's first load (TODO_01).
  assert.doesNotMatch(cfg, /globPatterns:[^\]]*woff2/, 'the heavy dyslexia font is not in the precache glob');
  assert.match(cfg, /runtimeCaching:[\s\S]*woff2[\s\S]*CacheFirst/, 'the dyslexia font is runtime-cached for offline use');

  const html = readFileSync(root('index.html'), 'utf8');
  assert.match(html, /rel="apple-touch-icon"/, 'iOS home-screen icon is linked');
});
