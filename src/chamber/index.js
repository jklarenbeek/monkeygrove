// Places: ASCII-template dioramas (chambers + hub island), instanced tile floors,
// water, themed decoration, marker extraction. Public barrel over the split modules:
//   templates.js  the hand-authored ASCII boards + the marker-char legend
//   layout.js     parse / vary / scatter, and problem-hosting reshaping
//   place.js      the shared Place scene base (chambers, business, cutscenes, stage)
//   hubplace.js   the HubPlace subclass (portals, gem tree, builds, bloom)
export { TEMPLATES, HUB_PORTALS } from './templates.js';
export {
  HOST_LIMITS, ensureHostable, varyLayout, scatterFetchSpots, parseLayout,
} from './layout.js';
export { Place } from './place.js';
export { HubPlace } from './hubplace.js';
