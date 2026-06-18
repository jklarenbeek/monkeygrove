// Flat ESLint config (ESM — matches package.json "type": "module").
//
// Purpose (TODO_12): cheap guardrails against the god-file / god-function pattern.
// A `max-lines` rule would have flagged the old 1,604-line main.js and the ~90-line
// onCorrect *before* they became Hall-of-Fame entries. Start lenient: the size rules
// warn (not error) for now and flip to error once the remaining big files are split.
//
// Run with `npm run lint`. Warnings are allowed; the suite is expected to be green
// (zero errors) so the script stays a reliable gate.

import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';

export default [
  // Build output and generated assets — never lint these.
  { ignores: ['dist/**', 'dev-dist/**', 'public/**', 'assets/**', 'node_modules/**'] },

  // Recommended correctness baseline (no-undef, no-dupe-keys, valid-typeof, …).
  js.configs.recommended,

  // Shared rules + the size guardrails this config exists for.
  {
    plugins: { '@stylistic': stylistic },
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
    },
    rules: {
      // --- The guardrails (TODO_12) ---------------------------------------
      // Flag god-files and god-functions before they snowball. `warn` for now;
      // flip to `error` once the remaining large modules (screens.js, verbs.js,
      // mathengine.js, …) are split the way main.js was in TODO_06.
      'max-lines': ['warn', { max: 400, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['warn', { max: 60, skipBlankLines: true, skipComments: true }],

      // --- Correctness ----------------------------------------------------
      eqeqeq: ['error', 'smart'],
      // Empty `catch {}` is a deliberate idiom here — localStorage can throw in
      // private mode / when quota is full, and the right response is to do nothing.
      'no-empty': ['error', { allowEmptyCatch: true }],
      // Lenient for now: unused *args* and unused catch bindings are ignored, and an
      // `_`-prefix opts a binding out explicitly. Surfaces dead vars without a wall.
      'no-unused-vars': ['warn', {
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      }],

      // --- Basic @stylistic formatting (match the existing house style) ---
      // 2-space indent, single quotes, semicolons, trailing commas. Kept as `warn`
      // and deliberately minimal — the point is consistency, not a formatting wall.
      '@stylistic/semi': ['warn', 'always'],
      '@stylistic/quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: 'always' }],
      '@stylistic/comma-dangle': ['warn', 'always-multiline'],
      '@stylistic/no-trailing-spaces': 'warn',
      '@stylistic/eol-last': ['warn', 'always'],
    },
  },

  // The game itself runs in the browser.
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: { ...globals.browser } },
  },

  // Config files run under Node.
  {
    files: ['vite.config.js', 'eslint.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },

  // Build/playtest scripts run under Node but embed browser code in Playwright
  // `page.evaluate()` callbacks (which reference `document`/`window`), so allow both.
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },

  // Tests run under Vitest in Node but exercise browser code via happy-dom, so allow
  // both global sets. Vitest helpers (test/expect/…) are imported explicitly, not global.
  {
    files: ['tests/**/*.mjs'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
    rules: {
      // A single `test('…', () => { … })` is legitimately long (setup + many
      // assertions); the god-method guardrail is aimed at production code, not specs.
      'max-lines-per-function': 'off',
    },
  },
];
