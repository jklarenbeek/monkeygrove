// AvatarRig — the player monkey + pet follower mesh lifecycle, shared by every
// scene builder (hub, chamber, business). Builds the monkey from the profile's
// equipped cosmetics, swaps it in place when the shop changes them, and spawns
// or respawns the pet beside the player. It reaches the Game for the active
// scene (player/pet/place/profile).
import { Player, PetFollower } from './player.js';
import { makeCharacter } from './entities.js';
import { CHARS, PETS, HATS, FURS, MONKEY_HAT_Y } from './models.js';
import { buildVoxelMesh } from './voxel.js';

export class AvatarRig {
  constructor(game) {
    this.game = game;
  }

  spawnAvatar() {
    this.game.player = new Player(this.makeMonkeyMesh(this.game.profile.avatar));
    this.game.player.headH = 0.95;
  }

  makeMonkeyMesh(avatar) {
    const fur = FURS.find((f) => f.id === avatar?.fur) || FURS[0];
    const g = makeCharacter(CHARS.monkey, 0.85, fur.palette, 'char:monkey');
    const hat = avatar?.hat ? HATS.find((h) => h.id === avatar.hat) : null;
    if (hat) {
      const hm = buildVoxelMesh(hat.model, { cacheKey: 'hat:' + hat.id });
      const vs = g.userData.voxelScale;
      hm.scale.setScalar(vs);
      hm.position.y = (MONKEY_HAT_Y + (hat.dy || 0)) * vs;
      g.add(hm);
    }
    return g;
  }

  refreshAvatar() {
    const game = this.game;
    if (!game.player || !game.place) return;
    const { x, z } = game.player;
    const old = game.player.mesh;
    old.removeFromParent();
    const mesh = this.makeMonkeyMesh(game.profile.avatar);
    game.player.mesh = mesh;
    game.player.baseScale = mesh.scale.x || 1;
    game.player.setPlace(game.place, x, z);
    this.respawnPet();
  }

  spawnPet(near) {
    const game = this.game;
    const petId = game.profile.avatar.pet;
    if (!petId) { game.pet = null; return; }
    const def = PETS.find((p) => p.id === petId);
    if (!def) { game.pet = null; return; }
    const mesh = makeCharacter(def.model, 0.45, null, 'pet:' + def.id);
    game.pet = new PetFollower(mesh);
    const spot = this.findFreeNear(near.x, near.z) || near;
    game.pet.setPlace(game.place, spot.x, spot.z);
  }

  respawnPet() {
    const game = this.game;
    if (game.pet) { game.pet.mesh.removeFromParent(); game.pet = null; }
    if (game.player) this.spawnPet({ x: game.player.x, z: game.player.z });
  }

  findFreeNear(x, z) {
    for (const [dx, dz] of [[0, 1], [1, 0], [-1, 0], [0, -1], [1, 1], [-1, -1]]) {
      const c = this.game.place.cellAt(x + dx, z + dz);
      if (c && c.walk) return { x: x + dx, z: z + dz };
    }
    return null;
  }
}
