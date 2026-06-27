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
import { BUSINESS_CUSTOMERS } from './data.js';
import {
  applyPaymentAction,
  applyPrepAction,
  applyReviewAction,
  bakeDurationMs,
  buyUpgrade,
  completeOrder,
  dailyBusinessReport,
  ensureBusinessState,
  ensureOrderMakeable,
  nextBusinessOrder,
  nextBusinessReview,
  restockIngredient,
} from './engine.js';

export class BusinessController {
  constructor(game) {
    this.game = game;
    this.businessAttempts = [];
    this.businessCustomer = null;
    // Bake step: each order's dish must bake in the oven before it can be served.
    this.bakeStatus = 'raw'; // 'raw' -> 'baking' -> 'ready'
    this.bakeTimer = 0;      // ms remaining
    this.bakeSteam = 0;      // ms until the next steam puff
    this.bakeTicker = null;  // frame-driven entity added to the place
  }

  // ---------- oven / bake step ----------

  resetBake() {
    this.bakeStatus = 'raw';
    this.bakeTimer = 0;
    this.bakeSteam = 0;
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
        if (this.bakeStatus !== 'baking') return;
        this.bakeTimer -= dtMs;
        this.bakeSteam -= dtMs;
        if (this.bakeSteam <= 0) { this.emitSteam(); this.bakeSteam = 260; }
        if (this.bakeTimer <= 0) this.finishBake();
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

  startBake() {
    const business = ensureBusinessState(this.game.profile);
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
    audio.sfx('coin');
    hud.toast(t('business.bake.ready'));
  }

  // Tapping the oven: start the bake when the food is prepped, or report status.
  tapOven() {
    const business = ensureBusinessState(this.game.profile);
    const order = business.activeOrder;
    if (!order) { this.showBusinessOrderPanel(); return; }
    if (this.bakeStatus === 'baking') { hud.toast(t('business.bake.baking')); return; }
    if (this.bakeStatus === 'ready') { hud.toast(t('business.bake.ready')); return; }
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
    const business = ensureBusinessState(this.game.profile);
    if (business.activeOrder?.tasks?.length) {
      this.resumeBusinessOrder(business);
      return;
    }
    if ((business.day?.ordersServed || 0) >= BALANCE.businessOrdersPerDay) {
      this.endBusinessDay();
      return;
    }
    const rng = new Rng(`business:${this.game.profile.id}:${business.currentDay}:${business.day.ordersServed}`);
    const order = nextBusinessOrder(business, this.game.profile.curriculum, { rng });
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
    const business = ensureBusinessState(this.game.profile);
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
    const business = ensureBusinessState(this.game.profile);
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
        const business = ensureBusinessState(this.game.profile);
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
        const business = ensureBusinessState(this.game.profile);
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
    const business = ensureBusinessState(this.game.profile);
    const order = business.activeOrder;
    if (!order) return;
    const task = this.nextOpenBusinessTask(order);
    if (task) {
      this.showBusinessOrderPanel();
      return;
    }
    if (this.bakeStatus !== 'ready') {
      // math is done, but the dish still has to come out of the oven
      audio.sfx('boop');
      hud.toast(t(this.bakeStatus === 'baking' ? 'business.bake.baking' : 'business.bake.first'));
      return;
    }
    const result = completeOrder(business, order, { attempts: this.businessAttempts });
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
    if ((business.day?.ordersServed || 0) >= BALANCE.businessOrdersPerDay) this.endBusinessDay();
    else this.startNextBusinessOrder();
  }

  openBusinessStock() {
    const business = ensureBusinessState(this.game.profile);
    screens.showBusinessStock({
      business,
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
    const business = ensureBusinessState(this.game.profile);
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
    const business = ensureBusinessState(this.game.profile);
    business.queue = business.activeOrder ? [business.activeOrder] : [];
    persistNow();
    this.businessAttempts = [];
    this.businessCustomer = null;
    this.game.startHub();
    return true;
  }

  requestEndBusinessDay() {
    const business = ensureBusinessState(this.game.profile);
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
    const business = ensureBusinessState(this.game.profile);
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
    const reviewRng = new Rng(`business-review:${this.game.profile.id}:${business.currentDay}`);
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
