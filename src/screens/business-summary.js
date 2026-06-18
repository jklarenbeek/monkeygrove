// End-of-day business summary overlay + its shopkeeper-review question views. Split
// out of screens/business.js to keep that module under the size guardrail. Grading
// lives in src/business/engine.js (applyReviewAction); these views only turn a task
// into a prompt + option labels.
import { render, esc } from './core.js';
import { t } from '../i18n.js';
import { RECIPES } from '../business/data.js';
import { money } from './business.js';

// One small descriptor per non-order mode, used to render the questions
// nextBusinessReview() produced.
const REVIEW_VIEWS = {
  profit_margin: {
    prompt: (task) => t('business.review.profit', { rev: money(task.revenueCents), cost: money(task.costCents) }),
    label: (value) => money(value),
  },
  demand_chart: {
    prompt: () => t('business.review.demand'),
    label: (value) => t(RECIPES[value]?.titleKey || value),
  },
  unit_conversion_stock: {
    prompt: (task) => t('business.review.convert', { kg: task.kg }),
    label: (value) => t('business.review.grams', { n: value }),
  },
  price_compare: {
    prompt: () => t('business.review.compare'),
    label: (value, task) => {
      const pack = value === 'A' ? task.a : task.b;
      return t('business.review.pack', { count: pack.count, price: money(pack.cents) });
    },
  },
};

export function showBusinessDaySummary({ report, review = [], onReview, onDone }) {
  const reviewHtml = review.map((task, i) => {
    const view = REVIEW_VIEWS[task.mode];
    if (!view) return '';
    return `
      <div class="card business-review" data-review-index="${i}">
        <p class="business-prompt">${esc(view.prompt(task))}</p>
        <div class="business-money-row">
          ${task.options.map((value) => `
            <button class="btn soft" data-review-value="${esc(value)}">${esc(view.label(value, task))}</button>
          `).join('')}
        </div>
      </div>`;
  }).join('');

  const el = render(`
    <div style="flex:1"></div>
    <h2>${t('business.summary')}</h2>
    <div class="card business-summary">
      <div class="reward-item">${t('business.orders_served', { n: report.ordersServed })}</div>
      <div class="reward-item">${t('business.profit')}: ${money(report.profitCents)}</div>
    </div>
    ${reviewHtml}
    <button class="btn green" id="business-done">${t('business.done')}</button>
    <div style="flex:2"></div>
  `);

  for (const card of el.querySelectorAll('[data-review-index]')) {
    const task = review[Number(card.dataset.reviewIndex)];
    for (const btn of card.querySelectorAll('[data-review-value]')) {
      btn.addEventListener('click', () => {
        if (card.dataset.answered) return; // one tap per question, then it locks
        card.dataset.answered = '1';
        const correct = onReview?.(task, btn.dataset.reviewValue);
        for (const b of card.querySelectorAll('[data-review-value]')) b.disabled = true;
        btn.classList.add(correct ? 'correct' : 'wrong');
      });
    }
  }
  el.querySelector('#business-done').addEventListener('click', onDone);
}
