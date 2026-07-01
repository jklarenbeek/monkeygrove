// BusinessController — owns the Pizzeria & Bakery order flow: everything between
// entering the shop and leaving it. The Game shell does the scene setup in
// Game.startBusiness(), then hands control here. The controller reaches back to
// the Game only through a small surface: profile, place, rng, mode, startHub(),
// and refreshHudCounts().
import { t } from '../i18n.js';
import * as hud from '../hud.js';
import * as screens from '../screens.js';
import { audio } from '../audio.js';
import { persist, persistNow, addBananas } from '../state.js';
import { Rng } from '../rng.js';
import { BALANCE } from '../config.js';
import { BUSINESS_CUSTOMERS, shopById } from './data.js';
import { nextWonderFor } from '../story/wonders.js';
import {
  applyPaymentAction,
  applyPrepAction,
  applyReviewAction,
  bakeDurationMs,
  buyUpgrade,
  completeOrder,
  dailyBusinessReport,
  ensureShop,
  ensureOrderMakeable,
  nextBusinessOrder,
  nextBusinessReview,
  restockIngredient,
} from './engine.js';

export class BusinessController {
  // Each controller drives ONE shop (bakery or pizzeria) — its own independent economy.
  constructor(game, shopId = 'bakery') {
    this.game = game;
    this.shopId = shopById(shopId).id;
    this.businessAttempts = [];
    this.businessCustomer = null;
    // Bake step: each order's dish must bake, then it stays warm for a short window.
    this.bakeStatus = 'raw'; // 'raw' -> 'baking' -> 'ready' -> 'cooled'
    this.bakeTimer = 0;      // ms remaining on the bake
    this.bakeSteam = 0;      // ms until the next steam puff
    this.freshMs = 0;        // ms of warm window left once 'ready' (serve within it for a tip)
    this.bakeTicker = null;  // frame-driven entity added to the place
  }

  // This controller's shop state (its own coins/stock/upgrades/day/progress).
  shop() {
    return ensureShop(this.game.profile, this.shopId);
  }

  // ---------- oven / bake step ----------

  resetBake() {
    this.bakeStatus = 'raw';
    this.bakeTimer = 0;
    this.bakeSteam = 0;
    this.freshMs = 0;
  }

  // The freshness window may only run while the child is roaming the 3D shop — never
  // while ANY panel is open. That guarantees the "serve it golden" timer can never race
  // a math answer (the arithmetic panels are always open when solving), so this stays
  // firmly inside the anti-anxiety bar: it nudges promptness, never pressures thinking.
  freeRoaming() {
    if (typeof document === 'undefined') return false;
    return !document.querySelector('#screens .screen');
  }

  bakePrepDone(order) {
    const prep = (order?.tasks || []).find((task) => task.kind === 'prep');
    return !prep || !!prep.businessDone; // can't bake raw ingredients
  }

  // A frame-driven ticker (added once to the place) counts the bake down and
  // puffs steam from the oven; the Game loop ticks place entities each frame.
  ensureBakeTicker() {
    if (this.bakeTicker || !this.game.place?.addEntity) return;
    this.bakeTicker = {
      update: (dtMs) => {
        if (this.bakeStatus === 'baking') {
          this.bakeTimer -= dtMs;
          this.bakeSteam -= dtMs;
          if (this.bakeSteam <= 0) { this.emitSteam(); this.bakeSteam = 260; }
          if (this.bakeTimer <= 0) this.finishBake();
          return;
        }
        // A golden, ready dish stays warm only while the child is walking the shop —
        // the window pauses the instant any panel opens (math is never on a clock).
        if (this.bakeStatus === 'ready' && this.freeRoaming()) {
          this.freshMs -= dtMs;
          this.bakeSteam -= dtMs;
          if (this.bakeSteam <= 0) { this.emitSteam(); this.bakeSteam = 700; }
          if (this.freshMs <= 0) this.coolDown();
        }
      },
    };
    this.game.place.addEntity(this.bakeTicker);
  }

  emitSteam() {
    const place = this.game.place;
    const oven = place?.activeStations?.oven;
    if (!oven || !place.fx || !place.worldPos) return;
    const p = place.worldPos(oven.x, oven.z, 1.1);
    place.fx.emit(p, 6, { colors: [0xffffff, 0xf0f0f0, 0xe2e2e2], speed: 0.45, up: 1.6, life: 1300, spread: 0.4 });
  }

  // A golden, on-time serve: a little sparkle over the counter and the fresh-tip toast.
  // This is the whole reward gradient a child sees — a bonus for promptness, never a loss.
  celebrateFreshServe(tipCents) {
    const place = this.game.place;
    const counter = place?.activeStations?.counter;
    if (counter && place?.fx && place?.worldPos) {
      const p = place.worldPos(counter.x, counter.z, 1.2);
      place.fx.emit(p, 10, { colors: [0xfff3a0, 0xffe066, 0xfff8d0], speed: 0.6, up: 1.4, life: 1100, spread: 0.5 });
    }
    hud.toast(`✨ ${t('business.fresh_tip')} +${((tipCents || 0) / 100).toFixed(2)}`);
  }

  startBake() {
    const business = this.shop();
    this.bakeStatus = 'baking';
    this.bakeTimer = bakeDurationMs(business);
    this.bakeSteam = 0;
    this.ensureBakeTicker();
    audio.sfx('click');
    hud.toast(t('business.bake.baking'));
  }

  finishBake() {
    this.bakeStatus = 'ready';
    this.bakeTimer = 0;
    this.freshMs = BALANCE.freshWindowMs;
    audio.sfx('coin');
    hud.toast(t('business.bake.ready'));
  }

  // The warm window ran out while the dish sat waiting. It's NOT ruined — no penalty,
  // no lost sale — it just cooled: it still sells at full base price, only the fresh
  // tip is missed, and the shopkeeper gives one gentle "serve it golden next time" nudge.
  coolDown() {
    this.bakeStatus = 'cooled';
    this.freshMs = 0;
    hud.toast(t('business.bake.cooled'));
  }

  // Tapping the oven: start the bake when the food is prepped, or report status.
  tapOven() {
    const business = this.shop();
    const order = business.activeOrder;
    if (!order) { this.showBusinessOrderPanel(); return; }
    if (this.bakeStatus === 'baking') { hud.toast(t('business.bake.baking')); return; }
    if (this.bakeStatus === 'ready') { hud.toast(t('business.bake.ready')); return; }
    if (this.bakeStatus === 'cooled') { hud.toast(t('business.bake.cooled')); return; }
    if (!this.bakePrepDone(order)) { audio.sfx('boop'); hud.toast(t('business.bake.prep_first')); return; }
    this.startBake();
  }

  resumeBusinessOrder(business) {
    const order = business.activeOrder;
    ensureOrderMakeable(business, order); // legacy/saved orders can't soft-lock either
    business.queue = [order];
    this.businessAttempts = [];
    this.resetBake();
    this.game.place?.clearCustomers?.();
    this.game.place?.setActiveRecipe?.(order.recipeId);
    this.businessCustomer = this.game.place?.spawnCustomer?.(order.customerId) || null;
    persist();
    this.announceBusinessOrder(order);
  }

  startNextBusinessOrder() {
    const business = this.shop();
    if (business.activeOrder?.tasks?.length) {
      this.resumeBusinessOrder(business);
      return;
    }
    if ((business.day?.ordersServed || 0) >= BALANCE.businessOrdersPerDay) {
      this.endBusinessDay();
      return;
    }
    const rng = new Rng(`business:${this.game.profile.id}:${this.shopId}:${business.currentDay}:${business.day.ordersServed}`);
    const order = nextBusinessOrder(business, this.game.profile.curriculum, { rng, shopId: this.shopId });
    business.activeOrder = order;
    business.queue = [order];
    this.businessAttempts = [];
    this.resetBake();
    this.game.place?.clearCustomers?.();
    this.game.place?.setActiveRecipe?.(order.recipeId);
    this.businessCustomer = this.game.place?.spawnCustomer?.(order.customerId) || null;
    persist();
    this.announceBusinessOrder(order);
  }

  announceBusinessOrder(order) {
    if (!order) return;
    hud.toast(order.supplied ? t('business.supplied') : t('business.order_ready'));
  }

  showBusinessOrderPanel() {
    const business = this.shop();
    const order = business.activeOrder;
    if (!order) {
      this.startNextBusinessOrder();
      return;
    }
    const customer = BUSINESS_CUSTOMERS[order.customerId];
    screens.showBusinessOrder({
      order,
      customerName: t(customer?.nameKey || 'business.order'),
      activeTask: this.nextOpenBusinessTask(order) || { kind: 'done', mode: 'ready' },
      bakeStatus: this.bakeStatus,
      onPrep: (task) => this.handleBusinessPrep(task),
      onPay: (task) => this.handleBusinessPayment(task),
      onServe: () => this.serveBusinessOrder(),
      onExit: () => this.leaveBusiness(),
    });
  }

  nextOpenBusinessTask(order) {
    return (order?.tasks || []).find((task) => (
      (task.kind === 'prep' || task.kind === 'payment') && !task.businessDone
    )) || null;
  }

  refreshLanguage() {
    this.game.place?.refreshLanguage?.();
    const open = document.querySelector('#screens .screen');
    if (!open || open.querySelector('#settings-card')) return;
    const business = this.shop();
    const order = business.activeOrder;
    if (open.classList.contains('business-screen')) this.showBusinessOrderPanel();
    else if (open.querySelector('#business-prep-done')) {
      const task = this.nextOpenBusinessTask(order) || (order?.tasks || []).find((t) => t.kind === 'prep');
      if (task?.kind === 'prep') this.handleBusinessPrep(task);
    } else if (open.querySelector('#business-payment-done')) {
      const task = this.nextOpenBusinessTask(order) || (order?.tasks || []).find((t) => t.kind === 'payment');
      if (task?.kind === 'payment') this.handleBusinessPayment(task);
    } else if (open.querySelector('[data-restock]')) this.openBusinessStock();
    else if (open.querySelector('[data-upgrade]')) this.openBusinessUpgrades();
  }

  handleBusinessPrep(task) {
    if (!task || task.kind !== 'prep') return;
    screens.showBusinessPrep({
      task,
      onClose: () => this.showBusinessOrderPanel(),
      onSubmit: (action) => {
        const business = this.shop();
        const order = business.activeOrder;
        if (!order || task.kind !== 'prep') return { correct: false, handled: true };
        const result = applyPrepAction(business, order, task, action);
        this.businessAttempts.push(result);
        persist();
        if (result.correct) {
          task.businessDone = true;
          audio.sfx('correct');
          hud.toast(t('business.done'));
          this.showBusinessOrderPanel();
          return { correct: true };
        }
        audio.sfx('boop');
        if (result.reason === 'stock') {
          // Out of stock isn't a math mistake — send them out to restock.
          hud.toast(t('business.stock'));
          this.showBusinessOrderPanel();
          return { correct: false, handled: true };
        }
        return { correct: false }; // wrong answer: panel stays and offers a hint
      },
    });
  }

  handleBusinessPayment(task) {
    if (!task || task.kind !== 'payment') return;
    screens.showBusinessPayment({
      task,
      onClose: () => this.showBusinessOrderPanel(),
      onSubmit: (action) => {
        const business = this.shop();
        const order = business.activeOrder;
        if (!order || task.kind !== 'payment') return { correct: false, handled: true };
        const result = applyPaymentAction(business, order, task, action);
        this.businessAttempts.push(result);
        persist();
        if (result.correct) {
          task.businessDone = true;
          audio.sfx('correct');
          hud.toast(t('business.done'));
          this.showBusinessOrderPanel();
          return { correct: true };
        }
        audio.sfx('boop');
        return { correct: false }; // wrong answer: panel stays and offers a hint
      },
    });
  }

  serveBusinessOrder() {
    const business = this.shop();
    const order = business.activeOrder;
    if (!order) return;
    const task = this.nextOpenBusinessTask(order);
    if (task) {
      this.showBusinessOrderPanel();
      return;
    }
    if (this.bakeStatus !== 'ready' && this.bakeStatus !== 'cooled') {
      // math is done, but the dish still has to come out of the oven
      audio.sfx('boop');
      hud.toast(t(this.bakeStatus === 'baking' ? 'business.bake.baking' : 'business.bake.first'));
      return;
    }
    // Served while still golden? The happy customer leaves a fresh tip (pure upside).
    // A cooled dish still sells at full base price — it just misses the tip.
    const fresh = this.bakeStatus === 'ready';
    const tipCents = fresh ? BALANCE.freshTipCents : 0;
    const result = completeOrder(business, order, { attempts: this.businessAttempts, tipCents });
    business.queue = [];
    this.businessAttempts = [];
    this.resetBake();
    this.game.place?.clearCustomers?.();
    const bananas = this.game.rng.int(BALANCE.businessBananaReward[0], BALANCE.businessBananaReward[1]);
    addBananas(this.game.profile, bananas);
    persist();
    this.game.refreshHudCounts();
    audio.sfx('coin');
    hud.toast(`+${bananas} 🍌 · ${t('business.profit')}: ${(result.profitCents / 100).toFixed(2)}`);
    if (fresh) this.celebrateFreshServe(result.tipCents);
    else hud.say(t('business.bake.cooled_coach'), { face: shopById(this.shopId).resident.face });
    this.maybeShopWonder();
    if ((business.day?.ordersServed || 0) >= BALANCE.businessOrdersPerDay) this.endBusinessDay();
    else this.startNextBusinessOrder();
  }

  // A gentle one-time reveal that the pie/pizza you cut IS a fraction (SUPER_PROMPT
  // Phase 7). Both shops share the 'bakery' wonder trigger — a sliced pizza is the
  // same fraction as a cut tart. The resident (piglet / owl) delivers it in a bubble
  // the child taps through at their own pace — never on a deadline, never repeated.
  maybeShopWonder() {
    const p = this.game.profile;
    const card = nextWonderFor('bakery', p.flags?.wondersSeen || []);
    if (!card) return;
    p.flags.wondersSeen = p.flags.wondersSeen || [];
    p.flags.wondersSeen.push(card.id);
    persist();
    hud.say(`✨ ${t(card.bodyKey)}`, { face: shopById(this.shopId).resident.face });
  }

  openBusinessStock() {
    const business = this.shop();
    screens.showBusinessStock({
      business,
      shopId: this.shopId,
      onRestock: (ingredientId) => {
        const result = restockIngredient(business, ingredientId, 1);
        audio.sfx(result.ok ? 'coin' : 'boop');
        if (!result.ok) hud.toast(t(result.reason === 'full' ? 'business.stock_full' : 'business.not_enough'));
        persist();
        this.openBusinessStock();
      },
      onClose: () => this.showBusinessOrderPanel(),
    });
  }

  openBusinessUpgrades() {
    const business = this.shop();
    screens.showBusinessUpgrades({
      business,
      onBuy: (upgradeId) => {
        const result = buyUpgrade(business, upgradeId);
        audio.sfx(result.ok ? 'coin' : 'boop');
        if (!result.ok) hud.toast(t('business.not_enough'));
        persist();
        this.openBusinessUpgrades();
      },
      onClose: () => this.showBusinessOrderPanel(),
    });
  }

  leaveBusiness() {
    const business = this.shop();
    business.queue = business.activeOrder ? [business.activeOrder] : [];
    persistNow();
    this.businessAttempts = [];
    this.businessCustomer = null;
    this.game.startHub();
    return true;
  }

  requestEndBusinessDay() {
    const business = this.shop();
    if (business.activeOrder) {
      audio.sfx('boop');
      hud.toast(t('business.serve'));
      this.showBusinessOrderPanel();
      return false;
    }
    this.endBusinessDay();
    return true;
  }

  endBusinessDay() {
    const business = this.shop();
    if (business.activeOrder) {
      audio.sfx('boop');
      hud.toast(t('business.serve'));
      this.showBusinessOrderPanel();
      return false;
    }
    const report = dailyBusinessReport(business);
    business.activeOrder = null;
    business.queue = [];
    this.businessAttempts = [];
    this.game.place?.clearCustomers?.();
    const reviewRng = new Rng(`business-review:${this.game.profile.id}:${this.shopId}:${business.currentDay}`);
    const review = nextBusinessReview(business, this.game.profile.curriculum, { rng: reviewRng });
    screens.showBusinessDaySummary({
      report,
      review,
      onReview: (task, value) => {
        const result = applyReviewAction(business, task, value);
        audio.sfx(result.correct ? 'correct' : 'boop');
        persist();
        return result.correct;
      },
      onDone: () => {
        business.currentDay = (business.currentDay || 1) + 1;
        business.day = {
          ordersServed: 0,
          revenueCents: 0,
          costCents: 0,
          profitCents: 0,
          wasteCents: 0,
          demand: {},
        };
        persistNow();
        this.game.startHub();
      },
    });
  }

  businessTap(x, z) {
    if (this.game.mode !== 'business') return false;
    const station = this.game.place?.stationAt?.(x, z);
    if (!station) return false;
    audio.sfx('click');
    if (station === 'pantry' || station === 'shopTable') this.openBusinessStock();
    else if (station === 'orderBoard') this.openBusinessUpgrades();
    else if (station === 'oven') this.tapOven();
    else this.showBusinessOrderPanel();
    return true;
  }
}
