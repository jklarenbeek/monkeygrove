# Vendored: @yijingjs/core

These files are a **verbatim copy** of `packages/core/src` from
[yijingjs](https://github.com/jklarenbeek/yijingjs) — the battle-tested hexagram
engine that drives Monkey Grove's story mode ("The Book of Banana Changes").

- **Source:** `~/github/yijingjs/packages/core/src`
- **Vendored at commit:** `cffd50e`
- **Vendored on:** 2026-06-27

It is vendored (not an npm dependency) because the published `@yijingjs/core`
package is out of date. When the npm package is fixed, this folder can be deleted
and replaced with a normal dependency — re-point the imports in `src/story/` and
`tests/story.test.mjs` back at `@yijingjs/core/...`.

## License

These files are **GPL-2.0** (see `LICENSE` in this folder). Monkey Grove as a whole
is **GPL-2.0** too — dual-licensed with a separate **commercial license** available
**only from the author** for closed-source/proprietary use (see the root `/LICENSE`).
Both Monkey Grove and yijingjs are authored by the same copyright holder (Johannes
Klarenbeek), so the engine and the game share one consistent license: under the open
license GPL-2.0 governs this copy and any redistribution; for any non-GPL use, only
the author can grant a commercial license.

## Import rules (enforced by a test)

**Do not hand-edit these files.** Fix bugs upstream in yijingjs and re-copy, so the
two never diverge. Internal use only imports `yijing.js` and `bagua.js`; `tools.js`
and `index.js` are copied for completeness but run side-effectful module-load
computations (and `tools.js`'s transition-groups builder is broken), so import the
leaf modules directly, **never the barrel**. `tests/no-yijing-barrel.test.mjs`
fails the build if any app module imports `yijing/index.js` or `yijing/tools.js`.

`yijing.js` builds its nuclear-matrix tables eagerly at import using `Object.groupBy`
(Chrome 117+/Safari 17.4+/FF 119+). `src/polyfills.js` shims it and is imported by
`src/story/engine.js` and `src/story/pacing.js` **before** the engine, so older
school/Android WebViews don't crash on boot. Keep that import order if you re-copy.

This folder is exempt from the project's whitespace checks (`.gitattributes`) and
ESLint (`eslint.config.js`) so the copy can stay verbatim.
