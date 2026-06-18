// Lazy entry for the bakery/pizzeria sim (src/business/). main.js dynamically
// import()s this barrel from startBusiness(), so Rollup bundles the 3D shop
// scene + its controller into one async `business-*` chunk that the title/hub
// never download. (The pure engine/data stay in the eager `index` chunk —
// state.js imports them at load — and three.js stays there too, for the hub.)
export { BusinessPlace } from './business/scene.js';
export { BusinessController } from './business/controller.js';
