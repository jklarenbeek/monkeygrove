// Lazy entry for the music-stage minigame (src/stage/). The scene registry
// (scenes/registry.js) dynamically import()s this barrel from Game.switchTo(), so
// Rollup bundles the 3D stage scene + its controller into one async `stage-*` chunk
// that the title/hub never download. (The pure engine/data stay eager — state.js
// heals stage state on load, curriculum/parents read stageReport.)
export { StagePlace } from './stage/scene.js';
export { StageController } from './stage/controller.js';
