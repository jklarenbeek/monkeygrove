// Accessibility & comfort. The 3D juice (camera shake, squash & stretch) reads
// reducedMotion() directly; DOM/CSS comfort (easy-read font, high contrast, calmer
// transitions) is mirrored onto <html> as classes that style.css reacts to.
import { settings } from './state.js';

export function prefersReducedMotionOS() {
  return typeof matchMedia === 'function'
    && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Tri-state: settings.reduceMotion null/undefined → follow the OS; otherwise explicit.
export function reducedMotion() {
  const pref = settings().reduceMotion;
  return pref === undefined || pref === null ? prefersReducedMotionOS() : !!pref;
}

// OpenDyslexic is 235 KB of woff2 that most kids never need, so it is NOT a static
// @font-face in the always-loaded CSS and is kept out of the PWA precache. We register
// it on demand the first time the easy-read font is switched on. new URL(..., import.meta.url)
// lets Vite fingerprint + emit the woff2 (served runtime-cacheable, so it still works
// offline once a kid has turned the font on). Memoized: load + register at most once.
let dyslexiaFontPromise = null;
export function loadDyslexiaFont() {
  if (dyslexiaFontPromise) return dyslexiaFontPromise;
  if (typeof FontFace === 'undefined' || typeof document === 'undefined' || !document.fonts) {
    return Promise.resolve(); // old browsers / SSR: the CSS fallback stack still applies
  }
  const face = (file, weight) => new FontFace(
    'OpenDyslexic',
    `url("${file}") format("woff2")`,
    { weight, style: 'normal', display: 'swap' },
  );
  const faces = [
    face(new URL('../assets/fonts/OpenDyslexic-Regular.woff2', import.meta.url).href, '400'),
    face(new URL('../assets/fonts/OpenDyslexic-Bold.woff2', import.meta.url).href, '700 900'),
  ];
  dyslexiaFontPromise = Promise.all(faces.map((f) => f.load().then((loaded) => document.fonts.add(loaded))))
    .catch((err) => { dyslexiaFontPromise = null; throw err; }); // let a failed load retry on the next toggle
  return dyslexiaFontPromise;
}

// Mirror the comfort settings onto the root element so CSS can react. Safe anytime.
// Returns a promise that resolves once the dyslexia state is fully applied (the font is
// awaited before the .dyslexia class flips, so there's no flash of the fallback font).
export function applyComfortSettings() {
  if (typeof document === 'undefined') return Promise.resolve();
  const s = settings();
  const root = document.documentElement;
  root.classList.toggle('reduce-motion', reducedMotion());
  root.classList.toggle('high-contrast', !!s.highContrast);
  root.classList.toggle('colorblind', !!s.colorblind);
  // font-sizes are calc(<px> * var(--text-scale)); 1 = normal
  root.style.setProperty('--text-scale', String(Number(s.textScale) > 0 ? s.textScale : 1));
  if (!s.dyslexiaFont) {
    root.classList.remove('dyslexia');
    return Promise.resolve();
  }
  // Honor the setting even if the font fails to load — the CSS fallback stack covers it.
  return loadDyslexiaFont().catch(() => {}).then(() => root.classList.add('dyslexia'));
}
