import { BALANCE } from '../config.js';
import { getPack } from '../curriculum/index.js';
import {
  BUSINESS_MODES,
  CUSTOMER_IDS,
  INGREDIENTS,
  RECIPES,
  UPGRADES,
} from './data.js';

const STAGE_ORDER = {
  grade_1: 1,
  grade_2: 2,
  grade_3: 3,
  grade_4: 4,
  grade_5: 5,
  grade_6: 6,
  grade_7: 7,
  grade_8: 8,
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function createBusinessState() {
  return {
    level: 1,
    shopCoins: 0,
    stock: { ...BALANCE.businessStartingStock },
    stockLimit: 12,
    upgrades: [],
    currentDay: 1,
    activeOrder: null,
    queue: [],
    progress: {},
    day: freshBusinessDay(),
    history: [],
  };
}

export function freshBusinessDay() {
  return {
    ordersServed: 0,
    revenueCents: 0,
    costCents: 0,
    profitCents: 0,
    wasteCents: 0,
    demand: {},
  };
}

export function ensureBusinessState(profile) {
  if (!profile.business || typeof profile.business !== 'object') profile.business = createBusinessState();
  const ref = createBusinessState();
  for (const [key, value] of Object.entries(ref)) {
    if (profile.business[key] === undefined) profile.business[key] = clone(value);
  }
  if (!profile.business.stock || typeof profile.business.stock !== 'object') profile.business.stock = { ...ref.stock };
  for (const [key, value] of Object.entries(ref.stock)) {
    if (profile.business.stock[key] === undefined) profile.business.stock[key] = value;
  }
  if (!profile.business.day || typeof profile.business.day !== 'object') profile.business.day = freshBusinessDay();
  const dayRef = freshBusinessDay();
  for (const [key, value] of Object.entries(dayRef)) {
    if (profile.business.day[key] === undefined) profile.business.day[key] = clone(value);
  }
  if (!profile.business.day.demand || typeof profile.business.day.demand !== 'object' || Array.isArray(profile.business.day.demand)) {
    profile.business.day.demand = {};
  }
  if (!profile.business.progress || typeof profile.business.progress !== 'object') profile.business.progress = {};
  if (!Array.isArray(profile.business.upgrades)) profile.business.upgrades = [];
  if (!Array.isArray(profile.business.queue)) profile.business.queue = [];
  if (!Array.isArray(profile.business.history)) profile.business.history = [];
  return profile.business;
}

function stageOrder(stageId) {
  return STAGE_ORDER[stageId] ?? 4;
}

function curriculumStage(curriculum) {
  const pack = getPack(curriculum?.packId);
  const id = curriculum?.confirmedStage || curriculum?.estimatedStage || 'grade_4';
  return pack.stages.some((stage) => stage.id === id) ? id : 'grade_4';
}

function allowedRecipes(curriculum) {
  const order = stageOrder(curriculumStage(curriculum));
  return Object.values(RECIPES).filter((recipe) => recipe.stages.some((stage) => stageOrder(stage) <= order));
}

function allowedModes(curriculum) {
  const order = stageOrder(curriculumStage(curriculum));
  return Object.values(BUSINESS_MODES).filter((mode) => stageOrder(mode.minStage) <= order);
}

function recipeCostCents(recipe, quantity = 1) {
  return Object.entries(recipe.ingredients)
    .reduce((sum, [id, n]) => sum + (INGREDIENTS[id].unitCostCents * n * quantity), 0);
}

function hasStock(state, recipe, quantity = 1) {
  return Object.entries(recipe.ingredients)
    .every(([id, n]) => (state.stock[id] ?? 0) >= n * quantity);
}

function consumeStock(state, recipe, quantity = 1) {
  for (const [id, n] of Object.entries(recipe.ingredients)) state.stock[id] -= n * quantity;
}

function taskForMode(mode, order, rng) {
  if (mode.id === 'portion_halves_quarters') {
    return {
      id: `${order.id}:prep:portion`,
      kind: 'prep',
      mode: mode.id,
      objectiveId: mode.objectiveId,
      expected: { slices: rng.pick([2, 4]), topping: order.recipeId.includes('tomato') ? 'tomato' : 'cheese' },
    };
  }
  if (mode.id === 'repeated_addition_orders') {
    return {
      id: `${order.id}:prep:repeat`,
      kind: 'prep',
      mode: mode.id,
      objectiveId: mode.objectiveId,
      expected: { trays: order.quantity, perTray: order.recipeId.includes('pizza') ? 6 : 4 },
    };
  }
  if (mode.id === 'recipe_measure_whole') {
    return {
      id: `${order.id}:prep:measure`,
      kind: 'prep',
      mode: mode.id,
      objectiveId: mode.objectiveId,
      expected: { ingredient: 'flour', amount: order.quantity * 2, unit: 'cups' },
    };
  }
  if (mode.id === 'fraction_of_quantity_recipe') {
    return {
      id: `${order.id}:prep:fraction`,
      kind: 'prep',
      mode: mode.id,
      objectiveId: mode.objectiveId,
      expected: { numerator: 1, denominator: 2, of: order.quantity * 8 },
    };
  }
  if (mode.id === 'scale_recipe') {
    return {
      id: `${order.id}:prep:scale`,
      kind: 'prep',
      mode: mode.id,
      objectiveId: mode.objectiveId,
      expected: { factor: order.quantity, base: RECIPES[order.recipeId].ingredients },
    };
  }
  if (mode.id === 'percentage_discount') {
    const discountCents = Math.round(order.priceCents * 0.1);
    return {
      id: `${order.id}:pay:discount`,
      kind: 'payment',
      mode: mode.id,
      objectiveId: mode.objectiveId,
      expected: { originalCents: order.priceCents, percent: 10, finalCents: order.priceCents - discountCents },
    };
  }
  if (mode.id === 'decimal_money_change') {
    const paidCents = Math.ceil(order.priceCents / 500) * 500 || 500;
    return {
      id: `${order.id}:pay:change`,
      kind: 'payment',
      mode: mode.id,
      objectiveId: mode.objectiveId,
      expected: { paidCents, changeCents: paidCents - order.priceCents },
    };
  }
  return {
    id: `${order.id}:pay:make`,
    kind: 'payment',
    mode: 'money_make_amounts',
    objectiveId: BUSINESS_MODES.money_make_amounts.objectiveId,
    expected: { amountCents: order.priceCents },
  };
}

export function nextBusinessOrder(state, curriculum, opts = {}) {
  const rng = opts.rng ?? {
    pick: (xs) => xs[Math.floor(Math.random() * xs.length)],
    int: (a, b) => a + Math.floor(Math.random() * (b - a + 1)),
  };
  const stage = stageOrder(curriculumStage(curriculum));
  const quantity = stage >= 7 ? rng.pick([1, 2, 3]) : stage >= 5 ? rng.pick([1, 2]) : 1;
  const allowed = allowedRecipes(curriculum);
  const stocked = allowed.filter((recipe) => hasStock(state, recipe, quantity));
  const recipes = stocked.length ? stocked : allowed;
  const recipe = rng.pick(recipes);
  const order = {
    id: `biz-${Date.now().toString(36)}-${Math.floor(Math.random() * 10000).toString(36)}`,
    customerId: rng.pick(CUSTOMER_IDS),
    recipeId: recipe.id,
    quantity,
    priceCents: recipe.basePriceCents * quantity,
    costCents: recipeCostCents(recipe, quantity),
    tasks: [],
  };
  const modes = allowedModes(curriculum);
  const prepModes = modes.filter((mode) => mode.kind === 'prep');
  const paymentModes = modes.filter((mode) => mode.kind === 'payment');
  order.tasks.push(taskForMode(rng.pick(prepModes.length ? prepModes : [BUSINESS_MODES.portion_halves_quarters]), order, rng));
  order.tasks.push(taskForMode(rng.pick(paymentModes.length ? paymentModes : [BUSINESS_MODES.money_make_amounts]), order, rng));
  if (stage >= 8) {
    order.tasks.push({
      id: `${order.id}:summary:demand`,
      kind: 'summary',
      mode: 'demand_chart',
      objectiveId: BUSINESS_MODES.demand_chart.objectiveId,
      expected: {},
    });
  }
  return order;
}

export function applyPrepAction(state, order, task, action) {
  const recipe = RECIPES[order.recipeId];
  let correct = false;
  if (task.mode === 'portion_halves_quarters') {
    correct = Number(action.slices) === task.expected.slices && String(action.topping) === task.expected.topping;
  } else if (task.mode === 'repeated_addition_orders') {
    correct = Number(action.total) === task.expected.trays * task.expected.perTray;
  } else if (task.mode === 'recipe_measure_whole') {
    correct = String(action.ingredient) === task.expected.ingredient
      && Number(action.amount) === task.expected.amount
      && String(action.unit) === task.expected.unit;
  } else if (task.mode === 'fraction_of_quantity_recipe') {
    correct = Number(action.amount) === (task.expected.of * task.expected.numerator) / task.expected.denominator;
  } else if (task.mode === 'scale_recipe') {
    correct = Object.entries(task.expected.base)
      .every(([id, n]) => Number(action.ingredients?.[id]) === n * task.expected.factor);
  }
  if (correct && !task.stockConsumed) {
    if (!hasStock(state, recipe, order.quantity)) {
      return recordBusinessAttempt(state, task.mode, false, { taskId: task.id, reason: 'stock' });
    }
    consumeStock(state, recipe, order.quantity);
    task.stockConsumed = true;
  }
  return recordBusinessAttempt(state, task.mode, correct, { taskId: task.id });
}

export function applyPaymentAction(state, order, task, action) {
  let correct = false;
  if (task.mode === 'money_make_amounts') correct = Number(action.amountCents) === task.expected.amountCents;
  else if (task.mode === 'decimal_money_change') {
    correct = Number(action.paidCents) === task.expected.paidCents
      && Number(action.changeCents) === task.expected.changeCents;
  } else if (task.mode === 'percentage_discount') {
    correct = Number(action.finalCents) === task.expected.finalCents;
  }
  return recordBusinessAttempt(state, task.mode, correct, { taskId: task.id });
}

export function recordBusinessAttempt(state, mode, correct, extra = {}) {
  if (!state.progress[mode]) state.progress[mode] = { attempts: 0, correct: 0 };
  state.progress[mode].attempts += 1;
  if (correct) state.progress[mode].correct += 1;
  return { mode, correct, recorded: true, ...extra };
}

export function completeOrder(state, order, result = {}) {
  for (const attempt of result.attempts || []) {
    if (attempt.recorded === true && attempt.mode) continue;
    const task = order.tasks.find((item) => item.id === attempt.taskId);
    if (task) recordBusinessAttempt(state, task.mode, !!attempt.correct, { taskId: task.id });
  }
  const profit = Math.max(0, order.priceCents - order.costCents);
  state.shopCoins += profit;
  state.day.ordersServed += 1;
  state.day.revenueCents += order.priceCents;
  state.day.costCents += order.costCents;
  state.day.profitCents += profit;
  state.day.demand[order.recipeId] = (state.day.demand[order.recipeId] || 0) + order.quantity;
  state.history.push({
    id: order.id,
    recipeId: order.recipeId,
    customerId: order.customerId,
    priceCents: order.priceCents,
    costCents: order.costCents,
    profitCents: profit,
    t: Date.now(),
  });
  state.history = state.history.slice(-40);
  state.activeOrder = null;
  return { profitCents: profit, shopCoins: state.shopCoins };
}

export function restockIngredient(state, ingredientId, units) {
  const ingredient = INGREDIENTS[ingredientId];
  if (!ingredient || units <= 0) return { ok: false, reason: 'unknown' };
  const room = Math.max(0, state.stockLimit - (state.stock[ingredientId] ?? 0));
  if (room <= 0) return { ok: false, reason: 'full' };
  const affordable = Math.floor(state.shopCoins / ingredient.unitCostCents);
  const bought = Math.min(room, units, affordable);
  if (bought <= 0) return { ok: false, reason: 'price' };
  const spent = ingredient.unitCostCents * bought;
  state.shopCoins -= spent;
  state.stock[ingredientId] = (state.stock[ingredientId] ?? 0) + bought;
  return { ok: true, bought, costCents: spent };
}

export function buyUpgrade(state, upgradeId) {
  const upgrade = UPGRADES[upgradeId];
  if (!upgrade || state.upgrades.includes(upgradeId)) return { ok: false, reason: 'unknown' };
  if (state.shopCoins < upgrade.priceCents) return { ok: false, reason: 'price' };
  state.shopCoins -= upgrade.priceCents;
  state.upgrades.push(upgradeId);
  if (upgrade.effect.stockLimit) state.stockLimit += upgrade.effect.stockLimit;
  if (upgrade.effect.ovenSlots) state.ovenSlots = (state.ovenSlots || 1) + upgrade.effect.ovenSlots;
  if (upgrade.effect.demandBonus) state.demandBonus = (state.demandBonus || 0) + upgrade.effect.demandBonus;
  return { ok: true, upgrade };
}

export function dailyBusinessReport(state) {
  const modes = {};
  for (const mode of Object.keys(BUSINESS_MODES)) {
    const stats = state.progress?.[mode] ?? { attempts: 0, correct: 0 };
    const rate = stats.attempts ? stats.correct / stats.attempts : 0;
    modes[mode] = {
      ...stats,
      rate,
      coverage: stats.correct >= 3 && rate >= 0.8 ? 'covered' : stats.attempts > 0 ? 'partial' : 'playable',
    };
  }
  const topRecipes = Object.entries(state.day?.demand || {})
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);
  return {
    ordersServed: state.day?.ordersServed ?? 0,
    revenueCents: state.day?.revenueCents ?? 0,
    costCents: state.day?.costCents ?? 0,
    profitCents: state.day?.profitCents ?? 0,
    topRecipes,
    modes,
  };
}
