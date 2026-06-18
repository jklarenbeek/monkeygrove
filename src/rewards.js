// RewardService — owns every payout and its juice: the per-correct banana
// fountain + egg fill + gem/mastery toasts, the end-of-chamber treasure chest,
// and the in-world treats (banana pickups, berries) that fly to their HUD
// counter. The ChamberFlow decides WHEN to pay; this decides WHAT and animates
// the emoji flights. It reaches the Game for profile/world/player/particles/rng.
import * as THREE from 'three';
import { flyEmojiToHud } from './entities.js';
import { HATS } from './models.js';
import { t, pickCorrectLine } from './i18n.js';
import * as hud from './hud.js';
import * as screens from './screens.js';
import { audio } from './audio.js';
import { addBananas, addEggPoints } from './state.js';
import { BALANCE } from './config.js';

export class RewardService {
  constructor(game) {
    this.game = game;
  }

  // A solved problem: confetti over the player, a banana fountain that scales
  // with the combo (and a pet bonus), egg fill, and any new fact-gem / mastery
  // toasts. Returns whether the egg just filled, so the caller can hatch.
  payCorrect(combo, res) {
    const g = this.game;
    const apos = g.player.mesh.position.clone().add(new THREE.Vector3(0, 0.8, 0));
    g.particles.confetti(apos, 30);
    // banana fountain
    const base = g.rng.int(BALANCE.bananasPerCorrect[0], BALANCE.bananasPerCorrect[1]);
    const bonus = Math.min(10, (combo - 1) * BALANCE.comboBonus);
    let n = base + bonus;
    if (g.profile.avatar.pet) n = Math.round(n * (1 + BALANCE.petBananaBonus));
    flyEmojiToHud(g.world, apos, '🍌', document.getElementById('banana-count'), Math.min(n, 8),
      () => audio.sfx('coin'));
    addBananas(g.profile, n);
    const eggFull = addEggPoints(g.profile, BALANCE.eggPerCorrect);
    g.refreshHudCounts();
    hud.say(`<b>${pickCorrectLine()}</b>`, { transient: true, ms: 1800 });
    // gems & mastery toasts
    for (const gem of res.newGems || []) {
      hud.toast('💎 ' + t('result.gem', { fact: gem.replace('x', ' × ') }), 'gem');
      audio.sfx('sparkle');
    }
    if (res.masteredSkill) {
      hud.toast('🌟 ' + t('result.mastered', { skill: t('skill.' + res.masteredSkill) }));
      audio.sfx('bloom');
    }
    return eggFull;
  }

  // The end-of-chamber treasure chest: bananas (scaling with depth), a chance
  // at a fresh hat, and a few egg points. Mutates the profile and returns the
  // reward lines for the result screen. Persisting + HUD refresh stay with the
  // caller, which sequences the rest of the completion.
  payChest(chamberIndex) {
    const g = this.game;
    const chestBananas = BALANCE.bananasChestBase + g.rng.int(0, 6) + Math.min(12, chamberIndex * 2);
    addBananas(g.profile, chestBananas);
    const rewards = [`🍌 +${chestBananas}`];
    if (g.rng.chance(BALANCE.hatRandomChestChance)) {
      const unowned = HATS.filter((h) => !g.profile.owned.hats.includes(h.id));
      if (unowned.length) {
        const hat = g.rng.pick(unowned);
        g.profile.owned.hats.push(hat.id);
        rewards.push(`${screens.HAT_EMOJI[hat.id] || '🎩'} ${t(hat.nameKey)}!`);
      }
    }
    const r2 = g.rng.int(1, 3);
    addEggPoints(g.profile, r2);
    rewards.push(`🥚 +${r2}`);
    return rewards;
  }

  // A treat picked up in the world flies to its HUD counter: bananas to the
  // banana count, berries to the egg fill.
  payTreat(kind, n, pos) {
    const g = this.game;
    if (kind === 'bananas') {
      flyEmojiToHud(g.world, pos, '🍌', document.getElementById('banana-count'), n, () => audio.sfx('coin'));
      addBananas(g.profile, n);
    } else if (kind === 'berry') {
      flyEmojiToHud(g.world, pos, '🍓', document.getElementById('egg-fill').parentElement, n, () => audio.sfx('egg'));
      addEggPoints(g.profile, n * BALANCE.eggPerBerry);
      g.profile.stats.berries += n;
    }
    g.refreshHudCounts();
  }
}
