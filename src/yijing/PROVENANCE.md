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

**Do not hand-edit these files.** Fix bugs upstream in yijingjs and re-copy, so the
two never diverge. Internal use only imports `yijing.js` and `bagua.js`; `tools.js`
and `index.js` are copied for completeness but run side-effectful module-load
computations, so import the leaf modules directly, not the barrel.
