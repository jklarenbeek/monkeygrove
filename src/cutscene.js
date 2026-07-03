// Lazy entry for the story cutscenes (src/cutscene/). main.js dynamically
// import()s this barrel from playCutscene(), so Rollup bundles the director,
// the dialog overlay, the scene scripts, and the diorama place into one async
// `cutscene-*` chunk the title/hub never download up front. The DOM card
// screens (screens/intro.js, screens/story.js) stay eager as the fallback —
// story flow must never depend on a lazy chunk arriving.
export { CutscenePlace } from './cutscene/place.js';
export { CutsceneDirector } from './cutscene/director.js';
export { CUTSCENES } from './cutscene/scenes.js';
