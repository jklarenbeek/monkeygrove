// AvatarRig — the player body + pet follower mesh lifecycle, shared by every
// scene builder (hub, chamber, business). Builds the chosen avatar creature
// from the profile (default monkey, with the monkey's equipped fur/hat), swaps
// it in place when the shop changes it, and spawns or respawns the follower pet
// beside the player. It reaches the Game for the active scene
// (player/pet/place/profile).
import { Player, PetFollower } from './player.js';
import { makeCharacter } from './entities.js';
import { HATS, FURS, MONKEY_HAT_Y, getCreature, DEFAULT_CREATURE_ID } from './models.js';
import { buildVoxelMesh } from './voxel.js';

export class AvatarRig {
  constructor(game) {
    this.game = game;
  }

  spawnAvatar() {
    this.game.player = new Player(this.makeAvatarMesh(this.game.profile.avatar));
    this.game.player.headH = 0.95;
  }

  // Build the player's full-size body for whichever creature they chose
  // (default monkey). Fur tints only fur-capable creatures (monkey/mimi share
  // the F/f slots); hats anchor only on hat-capable creatures (monkey). The
  // ':f' cache-key suffix keeps the full body distinct from the chibi (':s').
  makeAvatarMesh(avatar) {
    const creature = getCreature(avatar?.creature || DEFAULT_CREATURE_ID);
    const fur = creature.fur ? (FURS.find((f) => f.id === avatar?.fur) || FURS[0]) : null;
    const g = makeCharacter(
      creature.full, 0.85, fur?.palette || null, 'creature:' + creature.id + ':f',
    );
    const hat = creature.hat && avatar?.hat ? HATS.find((h) => h.id === avatar.hat) : null;
    if (hat) {
      const hm = buildVoxelMesh(hat.model, { cacheKey: 'hat:' + hat.id });
      const vs = g.userData.voxelScale;
      hm.scale.setScalar(vs);
      hm.position.y = ((creature.hatY ?? MONKEY_HAT_Y) + (hat.dy || 0)) * vs;
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
    const mesh = this.makeAvatarMesh(game.profile.avatar);
    game.player.mesh = mesh;
    game.player.baseScale = mesh.scale.x || 1;
    game.player.setPlace(game.place, x, z);
    this.respawnPet();
  }

  spawnPet(near) {
    const game = this.game;
    const petId = game.profile.avatar.pet;
    if (!petId) { game.pet = null; return; }
    // A follower can never be the same creature you're playing as.
    if (petId === (game.profile.avatar.creature || DEFAULT_CREATURE_ID)) { game.pet = null; return; }
    const def = getCreature(petId);
    if (!def || def.id !== petId || !def.canBePet) { game.pet = null; return; }
    const mesh = makeCharacter(def.small, 0.45, null, 'creature:' + def.id + ':s');
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
