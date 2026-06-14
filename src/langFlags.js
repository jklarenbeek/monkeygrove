const FLAGS = {
  en: { label: 'English', className: 'flag-gb' },
  nl: { label: 'Nederlands', className: 'flag-nl' },
};

export function languageButton(lang, currentLang) {
  const flag = FLAGS[lang];
  if (!flag) throw new Error(`Unknown language flag: ${lang}`);
  const active = lang === currentLang ? ' active' : '';
  return `<button class="round-btn lang-btn${active}" data-lang="${lang}" aria-label="${flag.label}" title="${flag.label}"><span class="flag-icon ${flag.className}" aria-hidden="true"></span></button>`;
}
