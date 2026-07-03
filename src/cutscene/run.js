// The two cutscene runners, extracted from main.js into the lazy chunk so the
// scene-swap choreography ships with the director it drives. The Game shell's
// playCutscene() resolves the scene and guards the fallback; these own the play.
import { Particles } from '../entities.js';
import * as screens from '../screens.js';
import * as hud from '../hud.js';
import { runSceneTransition } from '../scene-transition.js';
import { CutscenePlace } from './place.js';
import { CutsceneDirector } from './director.js';

// A cutscene with its own diorama: swap the current place out (behind the
// portal transition), play, and leave the diorama standing — the caller's
// continuation (hub build, checkup screen) replaces or covers it.
export async function playPlaced(game, scene) {
  game.mode = 'cutscene';
  game.setScene(null); // dialog owns the input; the continuation re-registers
  const token = ++game.flowToken;
  let director = null;
  await runSceneTransition(() => {
    if (token !== game.flowToken) return;
    screens.closeScreen();
    hud.showHud(false);
    hud.hideBubble();
    game.clearPlace();
    game.player = null;
    game.pet = null;
    game.place = new CutscenePlace(game.world, scene.place);
    game.particles = new Particles(game.place.group);
    game.place.fx = game.particles;
    director = new CutsceneDirector(game, scene, { place: game.place });
  }, { kind: 'soft' });
  if (!director) return;
  try { await director.play(); } finally { director.dispose(); }
}

// A cutscene staged on the LIVE place (the finale on the hub): freeze the
// player, dim the HUD, play, then hand the camera and controls back.
export async function playStaged(game, scene) {
  const world = game.world;
  const prev = { mode: game.mode, followObj: world.followObj, followMode: world.followMode, span: world.span };
  game.mode = 'cutscene';
  hud.showHud(false);
  hud.hideBubble();
  if (game.player) { game.player.stop(); game.player.locked = true; }
  const director = new CutsceneDirector(game, scene, { place: game.place });
  try {
    await director.play();
  } finally {
    director.dispose();
    game.mode = prev.mode;
    if (game.player) game.player.locked = false;
    world.followObj = prev.followObj;
    world.followMode = prev.followMode;
    world.setSpan(prev.span);
    hud.showHud(true);
  }
}
