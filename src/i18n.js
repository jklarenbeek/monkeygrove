// Dictionary + t() helper. Per-language tables live in src/i18n/<lang>.js.
// Keys with {vars} are interpolated.
import { settings } from './state.js';
import { en } from './i18n/en.js';
import { nl } from './i18n/nl.js';

const DICT = { en, nl };

export function t(key, vars = null) {
  const lang = settings().lang || 'en';
  let s = DICT[lang]?.[key] ?? DICT.en[key] ?? key;
  if (vars) {
    s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? String(vars[k]) : m));
  }
  return s;
}

export function pickCorrectLine() {
  const n = 1 + Math.floor(Math.random() * 4);
  return t(`play.correct.${n}`);
}

export function setLang(lang) {
  settings().lang = lang;
}
