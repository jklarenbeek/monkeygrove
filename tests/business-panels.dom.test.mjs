// @vitest-environment happy-dom
// Real-DOM coverage of the business panels: render each one, click through it, and
// assert it shows only its own controls and submits the exact action the engine grades.
// This is the DOM layer the source-based business-wiring tests can't reach.
import { test, beforeEach } from 'vitest';
import assert from 'node:assert/strict';
import { setLang } from '../src/i18n.js';
import {
  showBusinessPrep, showBusinessPayment, showBusinessDaySummary,
} from '../src/screens.js';

const host = () => document.getElementById('screens');
const q = (sel) => host().querySelector(sel);
const qa = (sel) => [...host().querySelectorAll(sel)];

beforeEach(() => {
  document.body.innerHTML = '<div id="screens"></div>';
  setLang('en'); // pin money formatting to €x.yy
});

test('prep / portion: shows only slice + topping controls and submits {slices, topping}', () => {
  let submitted = null;
  showBusinessPrep({
    task: { mode: 'portion_halves_quarters', objectiveId: 'nl_po.grade4.fair_sharing_intro', expected: { slices: 4, topping: 'cheese' } },
    onSubmit: (a) => { submitted = a; return { correct: true }; },
    onClose: () => {},
  });
  assert.ok(q('[data-slices="4"]'), 'renders the correct slice choice');
  assert.ok(q('[data-topping="cheese"]'), 'renders the topping choice');
  assert.equal(q('[data-total]'), null, 'no repeated-addition control leaks in');
  assert.equal(q('[data-scale-ingredient]'), null, 'no scale control leaks in');

  q('[data-slices="4"]').click();
  q('[data-topping="cheese"]').click();
  q('#business-prep-done').click();
  assert.deepEqual(submitted, { slices: 4, topping: 'cheese' });
});

test('prep / repeated-addition: shows only the total choices and submits {total}', () => {
  let submitted = null;
  showBusinessPrep({
    task: { mode: 'repeated_addition_orders', objectiveId: 'nl_po.grade4.tables_2_5_10', expected: { trays: 2, perTray: 4 } },
    onSubmit: (a) => { submitted = a; return { correct: true }; },
    onClose: () => {},
  });
  assert.ok(q('[data-total="8"]'), 'renders the correct total (2×4)');
  assert.equal(q('[data-slices]'), null, 'no portion control leaks in');

  q('[data-total="8"]').click();
  q('#business-prep-done').click();
  assert.deepEqual(submitted, { total: 8 });
});

test('payment / make-amount: coins accumulate to the target and submit {amountCents}', () => {
  let submitted = null;
  showBusinessPayment({
    task: { mode: 'money_make_amounts', objectiveId: 'nl_po.grade4.money_to_100', expected: { amountCents: 450 } },
    onSubmit: (a) => { submitted = a; return { correct: true }; },
    onClose: () => {},
  });
  q('[data-money="200"]').click();
  q('[data-money="200"]').click();
  q('[data-money="50"]').click();
  assert.equal(q('#pay-total').textContent, '€4.50', 'running total reflects the coins tapped');

  q('#business-payment-done').click();
  assert.deepEqual(submitted, { amountCents: 450 });
});

test('payment / change: payment is given, child picks change, submits {paidCents, changeCents}', () => {
  let submitted = null;
  showBusinessPayment({
    task: { mode: 'decimal_money_change', objectiveId: 'nl_po.grade5.decimal_money_context', expected: { paidCents: 1000, changeCents: 475 } },
    onSubmit: (a) => { submitted = a; return { correct: true }; },
    onClose: () => {},
  });
  assert.ok(q('[data-change="475"]'), 'renders the correct change choice');
  assert.equal(q('[data-money]'), null, 'no make-amount coins leak in');

  q('[data-change="475"]').click();
  q('#business-payment-done').click();
  assert.deepEqual(submitted, { paidCents: 1000, changeCents: 475 });
});

test('a wrong answer keeps the panel open and reveals a hint', () => {
  showBusinessPayment({
    task: { mode: 'money_make_amounts', objectiveId: 'nl_po.grade4.money_to_100', expected: { amountCents: 450 } },
    onSubmit: () => ({ correct: false }), // engine says wrong
    onClose: () => {},
  });
  q('[data-money="200"]').click(); // only 200 — wrong
  q('#business-payment-done').click();

  const fb = q('#business-feedback');
  assert.equal(fb.hidden, false, 'feedback area is revealed');
  assert.ok(fb.textContent.trim().length, 'a hint message is shown');
  assert.ok(q('#business-payment-done'), 'the panel is still open for another try');
});

test('the hint button reveals a mode-specific hint on demand', () => {
  showBusinessPrep({
    task: { mode: 'fraction_of_quantity_recipe', objectiveId: 'nl_po.grade6.fraction_of_quantity', expected: { numerator: 1, denominator: 2, of: 8 } },
    onSubmit: () => ({ correct: true }),
    onClose: () => {},
  });
  assert.equal(q('#business-feedback').hidden, true, 'hint is hidden until asked');
  q('#business-hint').click();
  assert.equal(q('#business-feedback').hidden, false, 'tapping 💡 reveals the hint');
});

test('day-summary review: tapping an answer grades it and locks the question', () => {
  let graded = null;
  showBusinessDaySummary({
    report: { ordersServed: 3, profitCents: 930 },
    review: [{ mode: 'demand_chart', objectiveId: 'nl_po.grade8.advanced_data_reasoning', options: ['flatbread', 'margherita'], answer: 'flatbread' }],
    onReview: (task, value) => { graded = value; return value === task.answer; },
    onDone: () => {},
  });
  const card = q('[data-review-index="0"]');
  card.querySelector('[data-review-value="flatbread"]').click();
  assert.equal(graded, 'flatbread', 'the chosen value is graded');
  assert.ok(qa('[data-review-value]').every((b) => b.disabled), 'all choices lock after one tap');
});
