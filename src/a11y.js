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

// Mirror the comfort settings onto the root element so CSS can react. Safe anytime.
export function applyComfortSettings() {
  if (typeof document === 'undefined') return;
  const s = settings();
  const root = document.documentElement;
  root.classList.toggle('reduce-motion', reducedMotion());
  root.classList.toggle('dyslexia', !!s.dyslexiaFont);
  root.classList.toggle('high-contrast', !!s.highContrast);
  root.classList.toggle('colorblind', !!s.colorblind);
  // font-sizes are calc(<px> * var(--text-scale)); 1 = normal
  root.style.setProperty('--text-scale', String(Number(s.textScale) > 0 ? s.textScale : 1));
}
