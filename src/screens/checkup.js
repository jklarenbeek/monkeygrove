// Mimi's Check overlay (docs/05-mimi-check.md §3): the child-invocable adaptive
// placement probe. Presentational only — main.js owns the flow and the state
// machine (curriculum/checkup.js); this module renders one page at a time and
// reports what the child did, with per-item response times measured here.
//
// Child-facing rules (docs/05 §3.8): never the words test/toets/score, no
// visible timer, no right/wrong tally — a filling notebook row is the only
// progress, every answer gets the same warm nod, and stopping is always a
// visible, shame-free button.
import { render, esc, flash } from './core.js';
import { t } from '../i18n.js';

const GROEP_ICONS = ['🌱', '🌼', '🐣', '🪁', '🛶', '🌿', '🪶', '🌳'];
const PRAISE_KEYS = ['checkup.praise_1', 'checkup.praise_2', 'checkup.praise_3', 'checkup.praise_4'];

export function showCheckup({ onSkip = null, onStop = null } = {}) {
  let finished = false;
  let praiseI = 0;

  const finish = (fn, ...args) => {
    if (finished) return;
    finished = true;
    fn?.(...args);
  };
  const once = (fn) => {
    let used = false;
    return (...args) => {
      if (used || finished) return;
      used = true;
      fn?.(...args);
    };
  };

  const shell = (inner, { skip = false, stop = false } = {}) => render(`
    <div style="flex:1"></div>
    <h2>${t('checkup.title')}</h2>
    <div class="tagline">${t('checkup.body')}</div>
    ${inner}
    <div class="menu-row">
      ${skip ? `<button class="btn soft" id="checkup-skip">${t('checkup.skip')}</button>` : ''}
      ${stop ? `<button class="btn soft" id="checkup-stop">${t('checkup.stop')}</button>` : ''}
    </div>
    <div style="flex:2"></div>
  `);

  const wireExits = (el) => {
    el.querySelector('#checkup-skip')?.addEventListener('click', () => finish(onSkip));
    el.querySelector('#checkup-stop')?.addEventListener('click', () => finish(onStop));
  };

  const handle = {
    // "Welke groep zit je in?" — the one question worth asking (docs/05 §3.2).
    askGroep({ onPick }) {
      if (finished) return;
      const pick = once(onPick);
      const tiles = Array.from({ length: 8 }, (_, i) => `
        <button class="tile pressable checkup-groep" data-groep="${i + 1}" aria-label="${esc(t('checkup.groep_n', { n: i + 1 }))}">
          <div class="t-icon">${GROEP_ICONS[i]}</div>
          <div class="t-name">${esc(t('checkup.groep_n', { n: i + 1 }))}</div>
        </button>`).join('');
      const el = shell(`
        <div class="card placement-card">
          <div class="placement-task">${esc(t('checkup.groep_title'))}</div>
          <div class="tile-grid checkup-groep-grid">
            ${tiles}
            <button class="tile pressable checkup-groep" data-groep="none">
              <div class="t-icon">✨</div>
              <div class="t-name">${esc(t('checkup.groep_unknown'))}</div>
            </button>
          </div>
        </div>
      `, { skip: true });
      for (const btn of el.querySelectorAll('[data-groep]')) {
        btn.addEventListener('click', () => {
          const v = btn.dataset.groep;
          pick(v === 'none' ? null : Number(v));
        });
      }
      wireExits(el);
    },

    // Birthday keeps the age floor growing over the years — optional, one tap out.
    askBirthday({ onPick }) {
      if (finished) return;
      const pick = once(onPick);
      const today = new Date();
      const max = today.toISOString().slice(0, 10);
      const min = `${today.getFullYear() - 14}-01-01`;
      const el = shell(`
        <div class="card placement-card">
          <div class="placement-task">${esc(t('checkup.bday_title'))}</div>
          <div class="tagline" style="margin-bottom:12px">${esc(t('checkup.bday_body'))}</div>
          <input type="date" id="checkup-bday" class="wizard-input" min="${min}" max="${max}">
          <div class="menu-row" style="margin-top:14px">
            <button class="btn soft" id="checkup-bday-later">${esc(t('checkup.bday_later'))}</button>
            <button class="btn green" id="checkup-bday-ok">${esc(t('ui.ok'))}</button>
          </div>
        </div>
      `, { skip: false });
      el.querySelector('#checkup-bday-ok')?.addEventListener('click', () => {
        const v = el.querySelector('#checkup-bday')?.value || '';
        pick(/^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null);
      });
      el.querySelector('#checkup-bday-later')?.addEventListener('click', () => pick(null));
      wireExits(el);
    },

    // Groep 1-2 / young ones are never probed (docs/05 §2.5) — Mimi just plays.
    showKleuter(onPlay) {
      if (finished) return;
      const play = once(() => finish(onPlay));
      const el = shell(`
        <div class="card placement-card">
          <div style="font-size:56px">🐒</div>
          <div class="placement-task">${esc(t('checkup.kleuter_title'))}</div>
          <div class="tagline" style="margin-bottom:12px">${esc(t('checkup.kleuter_body'))}</div>
          <button class="btn green" id="checkup-kleuter-play">${esc(t('checkup.kleuter_play'))} 🌱</button>
        </div>
      `);
      el.querySelector('#checkup-kleuter-play')?.addEventListener('click', play);
      wireExits(el);
    },

    // One probe item. Integer answers get a numpad (constructed response — no
    // 25% guess floor corrupting the low end, docs/05 §2.2); everything else
    // falls back to the choice tiles. Response time is measured from render.
    presentItem(problem, { count = 0 } = {}, onAnswered) {
      if (finished) return;
      const answered = once(onAnswered);
      const instruction = problem?.prompt?.key
        ? t(checkupPromptKey(problem.prompt.key), promptVars(problem))
        : t('placement.answer');
      const numpad = isNumpadAnswer(problem);
      const notebook = `<div class="checkup-notebook" role="img" aria-label="${esc(t('checkup.notebook', { n: count }))}">${'❀'.repeat(Math.min(16, count))}<span class="checkup-now">✿</span></div>`;
      const el = shell(`
        <div class="card placement-card">
          ${notebook}
          <div class="placement-task">${esc(instruction)}</div>
          <div class="placement-eq">${formatEquation(problem?.equation || '')}</div>
          ${numpad ? numpadHtml() : tilesHtml(problem, instruction)}
        </div>
      `, { stop: !!onStop });
      const startedAt = performance.now();
      const done = (value, correct, tag) => {
        for (const b of el.querySelectorAll('button')) b.disabled = true;
        flash(t(PRAISE_KEYS[praiseI++ % PRAISE_KEYS.length]));
        answered({ value, correct, tag, ms: performance.now() - startedAt });
      };
      if (numpad) wireNumpad(el, problem, done);
      else wireTiles(el, problem, done);
      wireExits(el);
    },

    // Close on a win: the result is a story, the reward is for finishing
    // (identical whatever the frontier — docs/05 §3.8).
    showDone({ reward = 0, worldEmoji = '🌴' } = {}, onPlay) {
      if (finished) return;
      const play = once(() => finish(onPlay));
      const el = shell(`
        <div class="card placement-card">
          <div style="font-size:56px">${esc(worldEmoji)}</div>
          <div class="placement-task">${esc(t('checkup.done_title'))}</div>
          <div class="tagline" style="margin-bottom:12px">${esc(t('checkup.done_body'))}</div>
          ${reward ? `<div class="placement-step">🍌 +${reward}</div>` : ''}
          <button class="btn green" id="checkup-done-play">${esc(t('checkup.done_play'))} 🎉</button>
        </div>
      `);
      el.querySelector('#checkup-done-play')?.addEventListener('click', play);
    },
  };
  return handle;
}

// ---------- item rendering helpers ----------

function isNumpadAnswer(problem) {
  return Number.isInteger(problem?.answer) && problem.answer >= 0;
}

function numpadHtml() {
  const key = (v, label = v, extra = '') => `
    <button class="btn soft numpad-key ${extra}" data-np="${v}" aria-label="${esc(String(label))}">${label}</button>`;
  return `
    <div class="numpad-display" id="np-val" aria-live="polite">&nbsp;</div>
    <div class="checkup-numpad">
      ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => key(n)).join('')}
      ${key('del', '⌫')}
      ${key(0)}
      ${key('ok', t('ui.ok'), 'green')}
    </div>`;
}

function wireNumpad(el, problem, done) {
  const display = el.querySelector('#np-val');
  let value = '';
  const refresh = () => { display.textContent = value || ' '; };
  for (const btn of el.querySelectorAll('[data-np]')) {
    btn.addEventListener('click', () => {
      const k = btn.dataset.np;
      if (k === 'ok') {
        if (!value) return;
        const correct = String(Number(value)) === String(problem.answer);
        done(value, correct, correct ? 'correct' : tagForValue(problem, Number(value)));
        return;
      }
      if (k === 'del') value = value.slice(0, -1);
      else if (value.length < 7) value += k; // big_numbers reaches 7 digits
      refresh();
    });
  }
}

function tilesHtml(problem, instruction) {
  const choices = Array.isArray(problem?.choices) ? problem.choices : [];
  return `
    <div class="tile-grid">
      ${choices.map((choice) => `
        <button class="tile pressable warmup-choice" data-value="${esc(String(choice.value))}" aria-label="${esc(instruction)} ${esc(String(choice.value))}">
          <div class="t-icon">✨</div>
          <div class="t-name">${esc(String(choice.value))}</div>
          <div class="t-price">${t('placement.answer')}</div>
        </button>
      `).join('')}
    </div>`;
}

function wireTiles(el, problem, done) {
  for (const btn of el.querySelectorAll('[data-value]')) {
    btn.addEventListener('click', () => {
      const value = btn.dataset.value;
      const correct = String(value) === String(problem.answer);
      done(value, correct, correct ? 'correct' : tagForValue(problem, value));
    });
  }
}

// The misconception tag of the distractor the child picked — the check's most
// valuable diagnostic byproduct (docs/05 §3.6.3). Null when untagged.
function tagForValue(problem, value) {
  const choices = Array.isArray(problem?.choices) ? problem.choices : [];
  const hit = choices.find((c) => String(c.value) === String(value));
  return hit?.tag || null;
}

function formatEquation(equation) {
  return esc(equation)
    .replace(/(\d+)\s*\/\s*(\d+)/g, '<span class="frac"><span class="n">$1</span><span class="d">$2</span></span>')
    .replace(/\?/g, '<span class="slot">?</span>');
}

function promptVars(problem) {
  const v = { ...(problem?.meta || {}), ...(problem?.model?.params || {}), ...(problem?.prompt?.vars || {}) };
  if (v.n !== undefined && v.d !== undefined) v.frac = `${v.n}/${v.d}`;
  v.answer = problem?.answer;
  return v;
}

function checkupPromptKey(promptKey) {
  return ({
    'q.compare': 'warmup.q.compare',
    'q.equiv': 'warmup.q.equiv',
    'q.frac_of': 'warmup.q.frac_of',
    'q.missing': 'warmup.q.missing',
    'q.share_fetch': 'warmup.q.share_fetch',
  })[promptKey] || 'warmup.q.fetch';
}
