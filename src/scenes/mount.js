// mountPlace — the shared choreography of standing a walkable scene up, exactly
// as the business/stage entries did it by hand: close any screen, tear the old
// place down, build the new one, spawn the avatar + pet, wire the movement
// callbacks, frame the camera, reset the HUD to a bare walkabout, and start the
// music. Scene controllers call this from enter() and then do their specifics.
import { Particles } from '../entities.js';
import * as screens from '../screens.js';
import * as hud from '../hud.js';
import { audio } from '../audio.js';

// makePlace is a factory (the old place must be disposed before the new one
// attaches to the world). spawn is a function of the built place, so a scene
// can honor its own named spawn cell or compute one from its footprint.
export function mountPlace(game, makePlace, { spawn, onBump, music = 'island' } = {}) {
  screens.closeScreen();
  game.clearPlace();
  const place = makePlace();
  game.place = place;
  game.particles = new Particles(place.group);
  place.fx = game.particles;
  game.avatar.spawnAvatar();
  const at = spawn(place);
  game.player.setPlace(place, at.x, at.z);
  game.avatar.spawnPet(at);
  game.player.onArrive = (x, z) => game.pet?.notePlayerAt(x, z);
  if (onBump) game.player.onBump = onBump;
  place.playerAt = () => (game.player ? { x: game.player.x, z: game.player.z } : null);
  game.world.defaultZoom = game.input.sceneZoom('hub');
  game.world.frameBoard(place.center(), place.size.w, place.size.d, game.player.mesh);
  hud.showHud(true);
  hud.hideBanner();
  hud.setAction(null);
  hud.setVerbPanel(null);
  hud.showHintButton(false);
  game.refreshHudCounts();
  audio.music(music);
  return place;
}
