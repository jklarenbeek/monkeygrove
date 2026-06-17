import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  BUSINESS_MODES,
  CUSTOMER_IDS,
  INGREDIENTS,
  RECIPES,
  UPGRADES,
} from '../src/business/data.js';
import {
  applyPrepAction,
  applyPaymentAction,
  applyReviewAction,
  buyUpgrade,
  completeOrder,
  createBusinessState,
  dailyBusinessReport,
  ensureBusinessState,
  nextBusinessOrder,
  nextBusinessReview,
  orderIsMakeable,
  restockIngredient,
} from '../src/business/engine.js';
import { createCurriculumState } from '../src/curriculum/placement.js';
import { Rng } from '../src/rng.js';

test('business data reuses the four helper customers', () => {
  assert.deepEqual(CUSTOMER_IDS, ['turtle', 'bunny', 'duckling', 'owl']);
  assert.equal(RECIPES.margherita.titleKey, 'business.recipe.margherita');
  assert.ok(INGREDIENTS.dough);
  assert.ok(UPGRADES.extra_oven);
});

test('fresh business state is local, gentle, and stocked for first orders', () => {
  const state = createBusinessState();
  assert.equal(state.level, 1);
  assert.equal(state.shopCoins, 0);
  assert.deepEqual(state.upgrades, []);
  assert.equal(state.day.ordersServed, 0);
  assert.ok(state.stock.dough >= 4);
  assert.ok(state.stock.sauce >= 4);
});

test('order generation chooses stage-appropriate tasks from curriculum', () => {
  const curriculum = createCurriculumState({ age: 8 });
  const state = createBusinessState();
  const order = nextBusinessOrder(state, curriculum, { rng: new Rng(123) });

  assert.ok(CUSTOMER_IDS.includes(order.customerId));
  assert.ok(order.recipeId in RECIPES);
  assert.ok(order.tasks.length >= 2);
  assert.ok(order.tasks.every((task) => task.objectiveId.startsWith('nl_po.')));
  assert.ok(order.tasks.some((task) => task.kind === 'prep'));
  assert.ok(order.tasks.some((task) => task.kind === 'payment'));
});

test('orders never carry a task the serve flow cannot complete', () => {
  const curriculum = createCurriculumState({ age: 11 }); // grade 8 — the old inert-task case
  const state = createBusinessState();
  for (let i = 0; i < 12; i++) {
    const order = nextBusinessOrder(state, curriculum, { rng: new Rng(`order-${i}`) });
    for (const task of order.tasks) {
      assert.ok(task.kind === 'prep' || task.kind === 'payment',
        `order task ${task.mode} is a completable prep/payment step`);
    }
  }
});

test('the shop can never soft-lock: a broke, empty shop still gets makeable orders', () => {
  const curriculum = createCurriculumState({ age: 11 }); // grade 8 — biggest quantities
  const state = createBusinessState();
  for (let i = 0; i < 60; i++) {
    state.stock = {};     // worst case: nothing on the shelves
    state.shopCoins = 0;  // and no coins to restock with
    const order = nextBusinessOrder(state, curriculum, { rng: new Rng(`lock-${i}`) });
    assert.ok(orderIsMakeable(state, order),
      `order ${i} (${order.recipeId} x${order.quantity}) is completable from empty + broke`);
    assert.equal(order.supplied, true, 'the supplier steps in when the child would be stuck');
  }
});

test('a stocked shop earns its own restocks — no free supply needed', () => {
  const curriculum = createCurriculumState({ age: 8 });
  const state = createBusinessState(); // starting stock, 0 coins
  const order = nextBusinessOrder(state, curriculum, { rng: new Rng('econ-1') });
  assert.equal(order.supplied, false, 'a freshly stocked shop is not handed free crates');
  assert.ok(orderIsMakeable(state, order));

  const before = state.shopCoins;
  const result = completeOrder(state, order, {});
  assert.ok(result.profitCents > 0, 'orders turn a profit');
  assert.ok(state.shopCoins > before, 'profit is banked as shop coins');
  assert.ok(state.shopCoins >= 100, 'one sale funds several restocks (cheapest ingredient ~25c)');
});

test('non-order modes surface as a graded end-of-day review (grade 6 and up)', () => {
  const curriculum = createCurriculumState({ age: 11 }); // grade 8 -> all four review modes
  const state = createBusinessState();
  state.day = {
    ordersServed: 3, revenueCents: 1350, costCents: 420, profitCents: 930, wasteCents: 0,
    demand: { flatbread: 2, margherita: 1 },
  };
  const review = nextBusinessReview(state, curriculum, { rng: new Rng(7) });
  const modes = review.map((task) => task.mode);
  for (const m of ['unit_conversion_stock', 'price_compare', 'profit_margin', 'demand_chart']) {
    assert.ok(modes.includes(m), `review includes ${m} at grade 8`);
  }
  for (const task of review) {
    assert.equal(task.kind, 'review');
    assert.ok(task.options.length >= 2, `${task.mode} offers choices`);
    assert.ok(task.options.map(String).includes(String(task.answer)), `${task.mode} answer is on the board`);
    assert.equal(applyReviewAction(state, task, task.answer).correct, true, `${task.mode} grades correct`);
    const wrong = task.options.map(String).find((o) => o !== String(task.answer));
    assert.equal(applyReviewAction(state, task, wrong).correct, false, `${task.mode} grades wrong`);
  }
  assert.equal(review.find((t) => t.mode === 'profit_margin').answer, 1350 - 420);
  assert.equal(review.find((t) => t.mode === 'demand_chart').answer, 'flatbread');
  // the graded answers accrue toward coverage in the daily report
  assert.ok(dailyBusinessReport(state).modes.profit_margin.attempts > 0);
});

test('younger graders get no review modes, and summary modes need a played day', () => {
  const young = createCurriculumState({ age: 8 }); // grade 5 -> review modes are grade 6+
  assert.deepEqual(nextBusinessReview(createBusinessState(), young, { rng: new Rng(1) }), []);

  const g8 = createCurriculumState({ age: 11 });
  const modes = nextBusinessReview(createBusinessState(), g8, { rng: new Rng(1) }).map((t) => t.mode);
  assert.ok(modes.includes('unit_conversion_stock'), 'synthetic stock question always available');
  assert.ok(modes.includes('price_compare'), 'synthetic deal question always available');
  assert.ok(!modes.includes('profit_margin'), 'profit needs a played day');
  assert.ok(!modes.includes('demand_chart'), 'demand needs sales');
});

test('order generation filters recipes by the generated quantity stock', () => {
  const curriculum = createCurriculumState({ age: 8 });
  const state = createBusinessState();
  state.stock = {
    dough: 1,
    sauce: 1,
    cheese: 1,
    tomato: 0,
    flour: 4,
    berries: 0,
    milk: 2,
  };
  const rng = {
    pick(items) {
      if (items.every((item) => typeof item === 'number')) return Math.max(...items);
      return items[0];
    },
  };

  const order = nextBusinessOrder(state, curriculum, { rng });
  const recipe = RECIPES[order.recipeId];

  assert.equal(order.quantity, 2);
  assert.equal(order.recipeId, 'flatbread');
  for (const [ingredientId, units] of Object.entries(recipe.ingredients)) {
    assert.ok(state.stock[ingredientId] >= units * order.quantity);
  }
});

test('prep actions consume stock only on correct completion', () => {
  const state = createBusinessState();
  const order = {
    id: 'o-test',
    recipeId: 'margherita',
    quantity: 1,
    priceCents: 450,
    costCents: 160,
    customerId: 'bunny',
    tasks: [{
      id: 'prep-halves',
      kind: 'prep',
      mode: 'portion_halves_quarters',
      objectiveId: 'nl_po.grade4.fair_sharing_intro',
      expected: { slices: 4, topping: 'cheese' },
    }],
  };
  const before = state.stock.dough;

  const wrong = applyPrepAction(state, order, order.tasks[0], { slices: 3, topping: 'cheese' });
  assert.equal(wrong.correct, false);
  assert.equal(state.stock.dough, before);

  const right = applyPrepAction(state, order, order.tasks[0], { slices: 4, topping: 'cheese' });
  assert.equal(right.correct, true);
  assert.equal(state.stock.dough, before - 1);
});

test('prep actions refuse correct completion when recipe stock is insufficient', () => {
  const state = createBusinessState();
  state.stock.dough = 1;
  state.stock.sauce = 1;
  state.stock.cheese = 1;
  const order = {
    id: 'o-understocked',
    recipeId: 'margherita',
    quantity: 2,
    priceCents: 900,
    costCents: 320,
    customerId: 'bunny',
    tasks: [{
      id: 'prep-understocked',
      kind: 'prep',
      mode: 'portion_halves_quarters',
      objectiveId: 'nl_po.grade4.fair_sharing_intro',
      expected: { slices: 4, topping: 'cheese' },
    }],
  };

  const result = applyPrepAction(state, order, order.tasks[0], { slices: 4, topping: 'cheese' });

  assert.equal(result.correct, false);
  assert.equal(result.reason, 'stock');
  assert.equal(state.stock.dough, 1);
  assert.equal(state.stock.sauce, 1);
  assert.equal(state.stock.cheese, 1);
});

test('payment action accepts exact payment and correct change', () => {
  const state = createBusinessState();
  const order = {
    id: 'o-pay',
    recipeId: 'flatbread',
    quantity: 1,
    priceCents: 375,
    costCents: 125,
    customerId: 'owl',
    tasks: [{
      id: 'pay-change',
      kind: 'payment',
      mode: 'decimal_money_change',
      objectiveId: 'nl_po.grade5.decimal_money_context',
      expected: { paidCents: 500, changeCents: 125 },
    }],
  };

  assert.equal(applyPaymentAction(state, order, order.tasks[0], { paidCents: 500, changeCents: 100 }).correct, false);
  assert.equal(applyPaymentAction(state, order, order.tasks[0], { paidCents: 500, changeCents: 125 }).correct, true);
});

test('completeOrder records profit, business progress, and no-loss retries', () => {
  const state = createBusinessState();
  const order = {
    id: 'o-done',
    recipeId: 'margherita',
    quantity: 1,
    priceCents: 450,
    costCents: 160,
    customerId: 'turtle',
    tasks: [
      { id: 'prep', kind: 'prep', mode: 'portion_halves_quarters', objectiveId: 'nl_po.grade4.fair_sharing_intro' },
      { id: 'pay', kind: 'payment', mode: 'money_make_amounts', objectiveId: 'nl_po.grade4.money_to_100' },
    ],
  };

  completeOrder(state, order, {
    attempts: [
      { taskId: 'prep', correct: false },
      { taskId: 'prep', correct: true },
      { taskId: 'pay', correct: true },
    ],
  });

  assert.equal(state.shopCoins, 290);
  assert.equal(state.day.ordersServed, 1);
  assert.equal(state.day.profitCents, 290);
  assert.equal(state.progress.portion_halves_quarters.correct, 1);
  assert.equal(state.progress.portion_halves_quarters.attempts, 2);
  assert.equal(state.progress.money_make_amounts.correct, 1);
});

test('completeOrder does not double-count attempts already recorded by actions', () => {
  const state = createBusinessState();
  const order = {
    id: 'o-action-recorded',
    recipeId: 'flatbread',
    quantity: 1,
    priceCents: 375,
    costCents: 125,
    customerId: 'owl',
    tasks: [{
      id: 'pay-action-recorded',
      kind: 'payment',
      mode: 'money_make_amounts',
      objectiveId: 'nl_po.grade4.money_to_100',
      expected: { amountCents: 375 },
    }],
  };

  const attempt = applyPaymentAction(state, order, order.tasks[0], { amountCents: 375 });
  completeOrder(state, order, { attempts: [attempt] });

  assert.equal(state.progress.money_make_amounts.attempts, 1);
  assert.equal(state.progress.money_make_amounts.correct, 1);
});

test('completeOrder records unevaluated completion attempts once', () => {
  const state = createBusinessState();
  const order = {
    id: 'o-unevaluated',
    recipeId: 'flatbread',
    quantity: 1,
    priceCents: 375,
    costCents: 125,
    customerId: 'owl',
    tasks: [{
      id: 'pay-unevaluated',
      kind: 'payment',
      mode: 'money_make_amounts',
      objectiveId: 'nl_po.grade4.money_to_100',
    }],
  };

  completeOrder(state, order, { attempts: [{ taskId: 'pay-unevaluated', correct: true }] });

  assert.equal(state.progress.money_make_amounts.attempts, 1);
  assert.equal(state.progress.money_make_amounts.correct, 1);
});

test('restock and upgrades spend only shop coins and never create debt', () => {
  const state = createBusinessState();
  assert.equal(restockIngredient(state, 'dough', 10).ok, false);
  assert.equal(state.shopCoins, 0);

  state.shopCoins = 1000;
  const restocked = restockIngredient(state, 'dough', 5);
  assert.equal(restocked.ok, true);
  assert.equal(state.stock.dough, createBusinessState().stock.dough + 5);

  const upgraded = buyUpgrade(state, 'extra_oven');
  assert.equal(upgraded.ok, true);
  assert.ok(state.upgrades.includes('extra_oven'));
  assert.ok(state.shopCoins >= 0);
});

test('restock buys the affordable shelf-room quantity before rejecting', () => {
  const state = createBusinessState();
  state.stockLimit = state.stock.dough + 1;
  state.shopCoins = INGREDIENTS.dough.unitCostCents;

  const restocked = restockIngredient(state, 'dough', 5);

  assert.equal(restocked.ok, true);
  assert.equal(restocked.bought, 1);
  assert.equal(restocked.costCents, INGREDIENTS.dough.unitCostCents);
  assert.equal(state.stock.dough, state.stockLimit);
  assert.equal(state.shopCoins, 0);
});

test('ensureBusinessState heals partial day fields without losing existing counters', () => {
  const profile = {
    business: {
      day: {
        ordersServed: 2,
      },
    },
  };

  const business = ensureBusinessState(profile);
  completeOrder(business, {
    id: 'o-heal',
    recipeId: 'flatbread',
    quantity: 1,
    priceCents: 375,
    costCents: 125,
    customerId: 'duckling',
    tasks: [],
  });

  assert.equal(business.day.ordersServed, 3);
  assert.equal(business.day.revenueCents, 375);
  assert.equal(business.day.costCents, 125);
  assert.equal(business.day.profitCents, 250);
  assert.deepEqual(business.day.demand, { flatbread: 1 });
});

test('dailyBusinessReport summarizes demand, profit, and modes', () => {
  const state = createBusinessState();
  state.day.ordersServed = 3;
  state.day.revenueCents = 1500;
  state.day.costCents = 600;
  state.day.profitCents = 900;
  state.day.demand = { margherita: 2, flatbread: 1 };
  state.progress.money_make_amounts = { attempts: 4, correct: 3 };
  state.progress.portion_halves_quarters = { attempts: 3, correct: 3 };

  const report = dailyBusinessReport(state);
  assert.equal(report.ordersServed, 3);
  assert.equal(report.profitCents, 900);
  assert.deepEqual(report.topRecipes, ['margherita', 'flatbread']);
  assert.deepEqual(Object.keys(report.modes).sort(), Object.keys(BUSINESS_MODES).sort());
  assert.equal(report.modes.money_make_amounts.coverage, 'partial');
  assert.equal(report.modes.portion_halves_quarters.coverage, 'covered');
  assert.equal(report.modes.decimal_money_change.coverage, 'playable');
});
