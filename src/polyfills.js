// Runtime polyfills — imported before any vendored-engine code evaluates.
//
// The vendored hexagram engine (src/yijing/yijing.js) builds its nuclear-matrix
// lookup tables EAGERLY at module-evaluation time using `Object.groupBy`, which
// only landed in Chrome 117 / Safari 17.4 / Firefox 119 (late 2023–2024). Monkey
// Grove targets budget Android tablets and school devices whose WebView can be
// older than that — there the bare import would throw "Object.groupBy is not a
// function" and white-screen the WHOLE app on boot (the engine is in the eager
// entry chunk). `story/engine.js` and `story/pacing.js` import this module before
// importing the engine, so the shim is always installed first.
//
// Spec-faithful enough for the engine's use: returns a null-prototype object keyed
// by the callback's return value. https://tc39.es/proposal-array-grouping/
if (typeof Object.groupBy !== 'function') {
  Object.defineProperty(Object, 'groupBy', {
    configurable: true,
    writable: true,
    value(items, callback) {
      const groups = Object.create(null);
      let i = 0;
      for (const item of items) {
        const key = callback(item, i++);
        (groups[key] ??= []).push(item);
      }
      return groups;
    },
  });
}
