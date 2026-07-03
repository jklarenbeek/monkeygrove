// Scene registry — every switchable activity the island offers, keyed by mode id.
// `Game.switchTo(id, params)` looks up an entry here, lazy-loads its chunk, and
// hands control to the scene controller it makes. Adding a new activity (a
// garden, a memory walk, a spelling grove…) is ONE entry here + its own module
// — main.js never changes.
//
// The scene contract (all methods optional unless noted; the controller may be
// the activity's existing controller class — it just grows these methods):
//   enter() -> boolean          REQUIRED. Mount the 3D place (scenes/mount.js
//                               has the shared choreography), start the flow.
//                               The shell has already set game.mode and loaded
//                               the chunk. Return false to refuse.
//   exit()                      teardown beyond game.clearPlace() (rarely needed)
//   update(dt)                  per-frame work; self-guard on game.mode, since a
//                               staged cutscene can borrow the mode mid-scene
//   onTap(x, z) -> handled      grid tap; unhandled falls through to the active
//                               verb, then to walk-there
//   onAction() -> handled       Space/Enter or the round action button
//   onHint() -> handled         E or the lightbulb button
//   onHome() -> handled         the home button (intercept to leave differently)
//   controlPrompt() -> {icon,label} | null | undefined
//                               contextual action-button state; null = show no
//                               action, undefined = no opinion (default rules)
//   refreshLanguage()           live locale switch while the scene is open
//
// Entry fields:
//   load()      dynamic import of the activity's barrel — its own lazy chunk
//   canEnter()  cheap guard checked before the mode flips (e.g. is it built?)
//   make()      construct the scene controller from the loaded module
import { isBuilt } from '../island.js';

export const SCENES = {
  business: {
    load: () => import('../business.js'),
    canEnter: (game, params) => isBuilt(game.profile, params.buildId || 'bakery'),
    make: (mod, game, params) => new mod.BusinessController(game, params.buildId || 'bakery'),
  },
  stage: {
    load: () => import('../stage.js'),
    canEnter: (game) => isBuilt(game.profile, 'stage'),
    make: (mod, game) => new mod.StageController(game),
  },
};
