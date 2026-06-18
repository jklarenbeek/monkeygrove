// Generates the PWA app icons (the 🐵 mascot on a warm grove gradient) by rendering
// them in headless Chrome and screenshotting to PNG. Re-run if the branding changes.
// Output lands in public/ so Vite copies them to the build root. Run: npm run gen:icons
import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';

const CHROME = [process.env.MG_CHROME, '/usr/bin/google-chrome', '/usr/bin/chromium']
  .find((p) => p && existsSync(p));
if (!CHROME) { console.error('gen:icons needs Chrome/Chromium (set MG_CHROME)'); process.exit(1); }

mkdirSync('public', { recursive: true });

// scale = how much of the canvas the monkey fills; maskable needs a safe-zone margin.
const ICONS = [
  { file: 'public/pwa-192.png', size: 192, scale: 0.72 },
  { file: 'public/pwa-512.png', size: 512, scale: 0.72 },
  { file: 'public/pwa-maskable-512.png', size: 512, scale: 0.56 },
  { file: 'public/apple-touch-icon.png', size: 180, scale: 0.70 },
];

const browser = await chromium.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--force-color-profile=srgb'],
});
for (const { file, size, scale } of ICONS) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  const monkey = Math.round(size * scale);
  const sh = Math.max(2, Math.round(size * 0.018));
  await page.setContent(`<!doctype html><html><body style="margin:0">
    <div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;
      background:radial-gradient(circle at 50% 40%, #fff3d6 0%, #ffd966 44%, #7ccf7c 100%);">
      <div style="font-size:${monkey}px;line-height:1;
        font-family:'Noto Color Emoji','Apple Color Emoji','Segoe UI Emoji',sans-serif;
        filter:drop-shadow(0 ${sh}px ${sh * 1.6}px rgba(74,63,53,.38));">🐵</div>
    </div></body></html>`);
  await page.waitForTimeout(250);
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width: size, height: size } });
  await page.close();
  console.log('wrote', file, `${size}x${size}`);
}
await browser.close();
