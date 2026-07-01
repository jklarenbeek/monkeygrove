// Bakery/pizzeria business overlays: the order card, the prep + payment panels
// (one small view per task mode), stock + upgrades, and the end-of-day summary
// with its shopkeeper-review questions. The view tables here only build prompts +
// option labels; grading lives in src/business/engine.js — keep the submit shapes
// in sync with applyPrepAction / applyPaymentAction / applyReviewAction there.
import { render, backBtn, esc } from './core.js';
import { t } from '../i18n.js';
import { settings } from '../state.js';
import { getPack } from '../curriculum/index.js';
import { BUSINESS_MODES, INGREDIENTS, RECIPES, UPGRADES, shopById } from '../business/data.js';

export function money(cents) {
  const amount = (Number(cents || 0) / 100).toFixed(2);
  // Dutch children write euros with a decimal comma (€4,50); English with a point.
  return `€${(settings().lang || 'en') === 'en' ? amount : amount.replace('.', ',')}`;
}

function objectiveLabel(objectiveId) {
  if (!objectiveId) return null;
  const objective = getPack('NL_PO').objectives.find((o) => o.id === objectiveId);
  return objective?.titleKey ? t(objective.titleKey) : null;
}

export function businessModeLabel(modeId) {
  return objectiveLabel(BUSINESS_MODES[modeId]?.objectiveId);
}

function businessTaskLabel(task) {
  return objectiveLabel(task?.objectiveId)
    || businessModeLabel(task?.mode)
    || (task?.kind === 'payment' ? t('business.pay') : null)
    || (task?.kind === 'prep' ? t('business.prep') : null)
    || t('business.order');
}

export function showBusinessOrder({
  order, customerName, activeTask, bakeStatus = 'raw', onPrep, onPay, onServe, onExit,
}) {
  const recipe = RECIPES[order.recipeId];
  const titleKey = recipe.kind === 'pizza' ? 'business.zone.pizzeria' : 'business.zone.bakery';
  const task = activeTask || order.tasks[0];
  const canPrep = task && task.kind === 'prep';
  const canPay = task && task.kind === 'payment';
  const el = render(`
    <div class="business-panel">
      <div class="business-head">
        <h2>${t(titleKey)}</h2>
        <button class="round-btn" id="business-close" aria-label="${esc(t('nav.close'))}">x</button>
      </div>
      <div class="card business-order-card">
        <div class="chip">${esc(customerName)}</div>
        <h3>${t('business.order')}: ${t(recipe.titleKey)}</h3>
        <div class="business-price">${t('business.pay')}: ${money(order.priceCents)}</div>
        <div class="business-bake business-bake-${bakeStatus}">${t('business.bake.' + bakeStatus)}</div>
        <div class="menu-row">
          <button class="btn green" id="business-prep" ${canPrep ? '' : 'disabled'}>${t('business.prep')}</button>
          <button class="btn soft" id="business-pay" ${canPay ? '' : 'disabled'}>${t('business.pay')}</button>
          <button class="btn green" id="business-serve">${t('business.serve')}</button>
        </div>
        <div class="tagline">${esc(businessTaskLabel(task))}</div>
      </div>
    </div>
  `, 'business-screen');
  el.querySelector('#business-prep').addEventListener('click', () => { if (canPrep) onPrep?.(task); });
  el.querySelector('#business-pay').addEventListener('click', () => { if (canPay) onPay?.(task); });
  el.querySelector('#business-serve').addEventListener('click', onServe);
  el.querySelector('#business-close').addEventListener('click', onExit);
}

function choiceValues(expected, deltas, fallback) {
  const base = Number(expected);
  const values = Number.isFinite(base)
    ? [base, ...deltas.map((delta) => base + delta)].filter((value) => value >= 0)
    : fallback;
  return [...new Set(values.map((value) => Number(value)))].sort((a, b) => a - b);
}

function setSelected(button, selector) {
  for (const other of button.closest('.card')?.querySelectorAll(selector) || []) other.classList.remove('equipped');
  button.classList.add('equipped');
}

// Prep panels — one small view per task mode. Each renders only the controls its
// math needs and submits the exact `action` shape applyPrepAction() grades. Keep
// these submit shapes in sync with src/business/engine.js applyPrepAction().
function prepTile(attr, value, icon, name) {
  return `
    <button class="tile pressable" data-${attr}="${esc(value)}">
      <div class="t-icon">${esc(icon)}</div>
      ${name ? `<div class="t-name">${esc(name)}</div>` : ''}
    </button>`;
}

function pickOne(el, selector, onPick) {
  for (const btn of el.querySelectorAll(selector)) {
    btn.addEventListener('click', () => { onPick(btn); setSelected(btn, selector); });
  }
}

const PREP_VIEWS = {
  // Halves & quarters: how many equal pieces, and which topping.
  portion_halves_quarters: {
    prompt: () => t('business.prep.portion'),
    controls(task) {
      const e = task.expected || {};
      const slices = [...new Set([2, 4, 6, 8, Number(e.slices)].filter(Number.isFinite))].sort((a, b) => a - b);
      const toppings = [...new Set(['cheese', 'tomato', e.topping].filter(Boolean))];
      return `
        <div class="business-choice-grid">
          ${slices.map((n) => prepTile('slices', n, n, t('business.prep.pieces'))).join('')}
        </div>
        <div class="business-choice-grid">
          ${toppings.map((top) => prepTile('topping', top, top === 'tomato' ? '🍅' : '🧀', t('business.ingredient.' + top))).join('')}
        </div>`;
    },
    bind(el, action) {
      pickOne(el, '[data-slices]', (b) => { action.slices = Number(b.dataset.slices); });
      pickOne(el, '[data-topping]', (b) => { action.topping = b.dataset.topping; });
    },
    submit: (a) => ({ slices: a.slices, topping: a.topping }),
  },

  // Repeated addition: trays × per-tray → total.
  repeated_addition_orders: {
    prompt: (task) => t('business.prep.repeat', {
      trays: task.expected?.trays ?? 0,
      perTray: task.expected?.perTray ?? 0,
    }),
    controls(task) {
      const e = task.expected || {};
      const totals = choiceValues((e.trays || 0) * (e.perTray || 0), [-2, -1, 1, 2], [4, 6, 8, 12]);
      return `
        <div class="business-choice-grid">
          ${totals.map((n) => prepTile('total', n, n, t('business.prep.total'))).join('')}
        </div>`;
    },
    bind(el, action) {
      pickOne(el, '[data-total]', (b) => { action.total = Number(b.dataset.total); });
    },
    submit: (a) => ({ total: a.total }),
  },

  // Measurement: pick the right ingredient and the whole amount to measure.
  recipe_measure_whole: {
    prompt: () => t('business.prep.measure'),
    controls(task) {
      const e = task.expected || {};
      const ingredients = [...new Set(['flour', 'dough', 'milk', e.ingredient].filter(Boolean))];
      const amounts = choiceValues(e.amount, [-2, -1, 1, 2], [1, 2, 3, 4]);
      const unit = t('business.unit.' + (e.unit || 'amount'));
      return `
        <div class="business-choice-grid">
          ${ingredients.map((id) => prepTile('ingredient', id, '🥣', t('business.ingredient.' + id))).join('')}
        </div>
        <div class="business-choice-grid">
          ${amounts.map((n) => prepTile('amount', n, n, unit)).join('')}
        </div>`;
    },
    bind(el, action, task) {
      action.unit = task.expected?.unit;
      pickOne(el, '[data-ingredient]', (b) => { action.ingredient = b.dataset.ingredient; });
      pickOne(el, '[data-amount]', (b) => { action.amount = Number(b.dataset.amount); });
    },
    submit: (a) => ({ ingredient: a.ingredient, amount: a.amount, unit: a.unit }),
  },

  // Fraction of a quantity: how many is num/den of the order amount.
  fraction_of_quantity_recipe: {
    prompt: (task) => {
      const e = task.expected || {};
      return t('business.prep.fraction', { num: e.numerator ?? 1, den: e.denominator ?? 1, of: e.of ?? 0 });
    },
    controls(task) {
      const e = task.expected || {};
      const answer = ((e.of || 0) * (e.numerator || 0)) / (e.denominator || 1);
      const amounts = choiceValues(answer, [-2, -1, 1, 2], [1, 2, 3, 4]);
      return `
        <div class="business-choice-grid">
          ${amounts.map((n) => prepTile('amount', n, n, t('business.prep.total'))).join('')}
        </div>`;
    },
    bind(el, action) {
      pickOne(el, '[data-amount]', (b) => { action.amount = Number(b.dataset.amount); });
    },
    submit: (a) => ({ amount: a.amount }),
  },

  // Scale the recipe: set each ingredient to base × factor.
  scale_recipe: {
    prompt: (task) => t('business.prep.scale', { factor: task.expected?.factor ?? 1 }),
    controls(task) {
      const e = task.expected || {};
      const factor = e.factor || 1;
      return Object.entries(e.base || {}).map(([id, n]) => `
        <div class="tagline">${esc(t('business.ingredient.' + id))}</div>
        <div class="business-choice-grid">
          ${choiceValues(n * factor, [-1, 1], [n]).map((choice) => `
            <button class="tile pressable" data-scale-ingredient="${esc(id)}" data-scale-amount="${choice}">
              <div class="t-icon">${choice}</div>
            </button>`).join('')}
        </div>`).join('');
    },
    bind(el, action) {
      action.ingredients = {};
      for (const btn of el.querySelectorAll('[data-scale-ingredient]')) {
        btn.addEventListener('click', () => {
          const id = btn.dataset.scaleIngredient;
          action.ingredients[id] = Number(btn.dataset.scaleAmount);
          for (const other of el.querySelectorAll(`[data-scale-ingredient="${id}"]`)) other.classList.remove('equipped');
          btn.classList.add('equipped');
        });
      }
    },
    submit: (a) => ({ ingredients: { ...(a.ingredients || {}) } }),
  },
};

// Shared wiring for the prep/payment panels: bind the view, the 💡 hint, and the
// done button. A wrong answer keeps the panel open and reveals a mode-specific
// nudge so the child can try again in place (onSubmit returns { correct }).
function wireBusinessPanel(el, { task, view, action, doneId, onSubmit, onClose }) {
  el.querySelector('#scr-back').addEventListener('click', onClose);
  view.bind(el, action, task);
  const feedback = el.querySelector('#business-feedback');
  const reveal = (msg) => { feedback.textContent = msg; feedback.hidden = false; };
  const hint = () => t('business.hint.' + task.mode);
  el.querySelector('#business-hint').addEventListener('click', () => reveal(hint()));
  el.querySelector('#' + doneId).addEventListener('click', () => {
    const res = onSubmit?.(view.submit(action));
    if (res && res.correct === false && !res.handled) reveal(`${t('business.almost')} ${hint()}`);
  });
}

export function showBusinessPrep({ task, onSubmit, onClose }) {
  const view = PREP_VIEWS[task?.mode] || PREP_VIEWS.portion_halves_quarters;
  const action = {};
  const el = render(`
    ${backBtn(onClose, '←')}
    <h2>${t('business.prep')}</h2>
    <div class="tagline">${esc(businessTaskLabel(task))}</div>
    <div class="card">
      <p class="business-prompt">${esc(view.prompt(task))}</p>
      ${view.controls(task)}
      <div class="business-feedback" id="business-feedback" hidden></div>
      <div class="menu-row">
        <button class="btn soft" id="business-hint">💡</button>
        <button class="btn green" id="business-prep-done">${t('business.done')}</button>
      </div>
    </div>
  `);
  wireBusinessPanel(el, { task, view, action, doneId: 'business-prep-done', onSubmit, onClose });
}

// Payment panels — one small view per task mode, mirroring PREP_VIEWS. Submit shapes
// must stay in sync with src/business/engine.js applyPaymentAction().
// Euro coins/notes (in cents); any multiple of 5 is composable, which covers every
// recipe price. Used by the make-the-amount panel.
const PAY_COINS = [500, 200, 100, 50, 20, 10, 5];

const PAYMENT_VIEWS = {
  // Make the amount: tap coins to build up to the price, with a live running total.
  money_make_amounts: {
    controls(task) {
      const target = task.expected?.amountCents ?? 0;
      return `
        <p class="business-prompt">${esc(t('business.pay.make', { amount: money(target) }))}</p>
        <div class="business-price">${t('business.pay.total')}:
          <span id="pay-total">${money(0)}</span> / ${money(target)}</div>
        <div class="business-money-row">
          ${PAY_COINS.map((c) => `<button class="btn soft" data-money="${c}">${money(c)}</button>`).join('')}
        </div>
        <div class="menu-row">
          <button class="btn soft" id="pay-reset">${t('business.pay.reset')}</button>
        </div>`;
    },
    bind(el, action) {
      action.amountCents = 0;
      const total = el.querySelector('#pay-total');
      const refresh = () => { total.textContent = money(action.amountCents); };
      for (const btn of el.querySelectorAll('[data-money]')) {
        btn.addEventListener('click', () => { action.amountCents += Number(btn.dataset.money); refresh(); });
      }
      el.querySelector('#pay-reset').addEventListener('click', () => { action.amountCents = 0; refresh(); });
    },
    submit: (a) => ({ amountCents: a.amountCents || 0 }),
  },

  // Make change: the customer pays a given amount — how much change comes back?
  decimal_money_change: {
    controls(task) {
      const e = task.expected || {};
      const price = (e.paidCents ?? 0) - (e.changeCents ?? 0);
      const changes = choiceValues(e.changeCents, [-100, -50, 50, 100], [0, 50, 100, 250]);
      return `
        <div class="business-price">${t('business.order')}: ${money(price)}</div>
        <p class="business-prompt">${esc(t('business.pay.change', { paid: money(e.paidCents ?? 0) }))}</p>
        <div class="business-money-row">
          ${changes.map((c) => `<button class="btn soft" data-change="${c}">${money(c)}</button>`).join('')}
        </div>`;
    },
    bind(el, action, task) {
      action.paidCents = task.expected?.paidCents;
      pickOne(el, '[data-change]', (b) => { action.changeCents = Number(b.dataset.change); });
    },
    submit: (a) => ({ paidCents: a.paidCents, changeCents: a.changeCents }),
  },

  // Percentage discount: take the percent off and pick the new price.
  percentage_discount: {
    controls(task) {
      const e = task.expected || {};
      const finals = choiceValues(e.finalCents, [-100, -50, 50, 100], [100, 250, 500, 1000]);
      return `
        <p class="business-prompt">${esc(t('business.pay.discount', {
          percent: e.percent ?? 10,
          was: money(e.originalCents ?? 0),
        }))}</p>
        <div class="business-money-row">
          ${finals.map((c) => `<button class="btn soft" data-final="${c}">${money(c)}</button>`).join('')}
        </div>`;
    },
    bind(el, action) {
      pickOne(el, '[data-final]', (b) => { action.finalCents = Number(b.dataset.final); });
    },
    submit: (a) => ({ finalCents: a.finalCents }),
  },
};

export function showBusinessPayment({ task, onSubmit, onClose }) {
  const view = PAYMENT_VIEWS[task?.mode] || PAYMENT_VIEWS.money_make_amounts;
  const action = {};
  const el = render(`
    ${backBtn(onClose, '←')}
    <h2>${t('business.pay')}</h2>
    <div class="tagline">${esc(businessTaskLabel(task))}</div>
    <div class="card">
      ${view.controls(task)}
      <div class="business-feedback" id="business-feedback" hidden></div>
      <div class="menu-row">
        <button class="btn soft" id="business-hint">💡</button>
        <button class="btn green" id="business-payment-done">${t('business.done')}</button>
      </div>
    </div>
  `);
  wireBusinessPanel(el, { task, view, action, doneId: 'business-payment-done', onSubmit, onClose });
}

export function showBusinessStock({ business, shopId, onRestock, onClose }) {
  const limit = Math.max(1, business.stockLimit || 1);
  // Show only THIS shop's (disjoint) ingredient set — the bakery never lists dough.
  const ingredients = shopById(shopId || business.id).ingredientIds.map((id) => INGREDIENTS[id]);
  const el = render(`
    ${backBtn()}
    <h2>${t('business.stock')}</h2>
    <div class="chip">${t('business.profit')}: ${money(business.shopCoins)}</div>
    <div class="card">
      ${ingredients.map((ing) => {
        const count = business.stock[ing.id] || 0;
        return `
          <div class="skill-row">
            <div class="s-name">${t(ing.titleKey)}</div>
            <div class="s-bar"><div class="s-fill" style="width:${Math.round((count / limit) * 100)}%"></div></div>
            <div class="curriculum-count">${count}/${limit}</div>
            <button class="btn soft" data-restock="${ing.id}">${t('business.restock')}</button>
          </div>`;
      }).join('')}
    </div>
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
  for (const btn of el.querySelectorAll('[data-restock]')) {
    btn.addEventListener('click', () => onRestock?.(btn.dataset.restock));
  }
}

export function showBusinessUpgrades({ business, onBuy, onClose }) {
  const ownedUpgrades = Array.isArray(business.upgrades) ? business.upgrades : [];
  const el = render(`
    ${backBtn()}
    <h2>${t('business.upgrades')}</h2>
    <div class="chip">${t('business.profit')}: ${money(business.shopCoins)}</div>
    <div class="card">
      ${Object.values(UPGRADES).map((upgrade) => {
        const owned = ownedUpgrades.includes(upgrade.id);
        return `
          <div class="skill-row">
            <div class="s-name">${t(upgrade.titleKey)}</div>
            <div class="curriculum-count">${owned ? t('business.done') : money(upgrade.priceCents)}</div>
            ${owned ? '' : `<button class="btn soft" data-upgrade="${upgrade.id}">${t('business.buy')}</button>`}
          </div>`;
      }).join('')}
    </div>
  `);
  el.querySelector('#scr-back').addEventListener('click', onClose);
  for (const btn of el.querySelectorAll('[data-upgrade]')) {
    btn.addEventListener('click', () => onBuy?.(btn.dataset.upgrade));
  }
}

// showBusinessDaySummary + its REVIEW_VIEWS live in ./business-summary.js (it imports
// `money` from here) to keep this module under the size guardrail.
