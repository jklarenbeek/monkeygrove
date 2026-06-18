// Warm-up placement quiz overlay: a short multiple-choice probe that helps Mimi
// tune the first quests. Records each answer and finalizes exactly once.
import { render, esc, flash } from './core.js';
import { t } from '../i18n.js';

export function showWarmup({ problems, onAnswer, onDone, onSkip }) {
  let started = false;
  let finished = false;
  let i = 0;
  let answered = false;

  const finish = (fn) => {
    if (finished) return false;
    finished = true;
    fn?.();
    return true;
  };

  const renderProblem = () => {
    answered = false;
    const problem = problems[i];
    const choices = Array.isArray(problem?.choices) ? problem.choices : [];
    const instruction = problem?.prompt?.key
      ? t(warmupPromptKey(problem.prompt.key), problemPromptVars(problem))
      : t('placement.answer');
    const el = render(`
      <div style="flex:1"></div>
      <h2>${t('placement.title')}</h2>
      <div class="tagline">${t('placement.body')}</div>
      <div class="card placement-card">
        <div class="placement-step">${esc(t('placement.step', { n: i + 1, total: problems.length }))}</div>
        <div class="placement-task">${esc(instruction)}</div>
        <div class="placement-eq">${formatWarmupEquation(problem?.equation || '')}</div>
        <div class="tile-grid">
          ${choices.map((choice) => `
            <button class="tile pressable warmup-choice" data-value="${esc(String(choice.value))}" aria-label="${esc(instruction)} ${esc(String(choice.value))}">
              <div class="t-icon">✨</div>
              <div class="t-name">${esc(String(choice.value))}</div>
              <div class="t-price">${t('placement.answer')}</div>
            </button>
          `).join('')}
        </div>
      </div>
      <div class="menu-row">
        <button class="btn soft" id="warmup-skip">${t('placement.skip')}</button>
      </div>
      <div style="flex:2"></div>
    `);

    for (const btn of el.querySelectorAll('[data-value]')) {
      btn.addEventListener('click', () => {
        if (finished || answered) return;
        answered = true;
        for (const other of el.querySelectorAll('[data-value]')) other.disabled = true;
        const correct = String(btn.dataset.value) === String(problem.answer);
        onAnswer({ problem, correct });
        i += 1;
        if (i >= problems.length) {
          flash(t('placement.done'));
          finish(onDone);
          return;
        }
        renderProblem();
      });
    }
    el.querySelector('#warmup-skip')?.addEventListener('click', () => finish(onSkip));
  };

  const renderIntro = () => {
    const el = render(`
      <div style="flex:1"></div>
      <h2>${t('placement.title')}</h2>
      <div class="tagline">${t('placement.body')}</div>
      <div class="card placement-card">
        <div class="placement-eq"><span class="slot">?</span> <span aria-hidden="true">+</span> <span class="slot">?</span></div>
      </div>
      <div class="menu-row">
        <button class="btn green" id="warmup-start">${t('placement.start')}</button>
        <button class="btn soft" id="warmup-skip">${t('placement.skip')}</button>
      </div>
      <div style="flex:2"></div>
    `);
    el.querySelector('#warmup-start')?.addEventListener('click', () => {
      if (finished || started) return;
      started = true;
      for (const btn of el.querySelectorAll('button')) btn.disabled = true;
      if (!problems.length) {
        finish(onSkip);
        return;
      }
      renderProblem();
    });
    el.querySelector('#warmup-skip')?.addEventListener('click', () => finish(onSkip));
  };

  if (!started || !problems.length) renderIntro();
}

function formatWarmupEquation(equation) {
  return esc(equation)
    .replace(/(\d+)\s*\/\s*(\d+)/g, '<span class="frac"><span class="n">$1</span><span class="d">$2</span></span>')
    .replace(/\?/g, '<span class="slot">?</span>');
}

function problemPromptVars(problem) {
  const v = { ...(problem?.meta || {}), ...(problem?.model?.params || {}), ...(problem?.prompt?.vars || {}) };
  if (v.n !== undefined && v.d !== undefined) v.frac = `${v.n}/${v.d}`;
  v.answer = problem?.answer;
  return v;
}

function warmupPromptKey(promptKey) {
  return ({
    'q.compare': 'warmup.q.compare',
    'q.equiv': 'warmup.q.equiv',
    'q.frac_of': 'warmup.q.frac_of',
    'q.missing': 'warmup.q.missing',
    'q.share_fetch': 'warmup.q.share_fetch',
  })[promptKey] || 'warmup.q.fetch';
}
