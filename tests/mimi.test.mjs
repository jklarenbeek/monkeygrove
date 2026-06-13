// Mimi's conversation ladder: the right advice surfaces first, every line
// has EN+NL copy, and the list never runs dry (taps always get an answer).
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mimiLines } from '../src/mimi.js';
import { islandStatus, buildById, freshIsland, playerCost } from '../src/island.js';

// Fake masteryReport: per-world pct (0..1), like mathengine.masteryReport.
function report(pcts = {}) {
  const w = { tide: 0, garden: 0, stump: 0, vines: 0, ...pcts };
  return {
    worlds: Object.fromEntries(
      Object.entries(w).map(([id, pct]) => [id, { pct }]),
    ),
  };
}

function profile({ bananas = 0, built = [], flags = {}, egg = null, streak = 0 } = {}) {
  return {
    bananas,
    flags: { mimiMet: true, ...flags },
    egg: egg || { points: 0, goal: 30 },
    streak: { count: streak },
    island: { ...freshIsland(), built: [...built] },
  };
}

function lines(p, r) {
  return mimiLines(p, r, islandStatus(p, r));
}

test('first meeting leads, then never repeats', () => {
  const fresh = profile({ flags: { mimiMet: false } });
  assert.equal(lines(fresh, report())[0].key, 'mimi.meet');
  const met = profile();
  assert.ok(!lines(met, report()).some((l) => l.key === 'mimi.meet'));
});

test('affordable blueprint is the first thing on her mind', () => {
  const r = report({ tide: 0.3 }); // 0.3 points → lanterns (0.25) unlocked
  const rich = profile({ bananas: 999 });
  const first = lines(rich, r)[0];
  assert.equal(first.key, 'mimi.build_ready');
  assert.equal(first.buildId, 'lanterns');
});

test('unaffordable blueprint: she says exactly how many bananas are missing', () => {
  const r = report({ tide: 0.3 });
  const poor = profile({ bananas: 10 });
  const first = lines(poor, r)[0];
  assert.equal(first.key, 'mimi.need_bananas');
  assert.equal(first.buildId, 'lanterns');
  assert.equal(first.vars.n, playerCost(buildById('lanterns')) - 10);
});

test('she points at the weakest world', () => {
  const r = report({ tide: 0.8, garden: 0.1, stump: 0.5, vines: 0.6 });
  const hint = lines(profile({ bananas: 0 }), r).find((l) => l.key === 'mimi.world_hint');
  assert.ok(hint, 'world hint present');
  assert.equal(hint.worldId, 'garden');
});

test('a nearly-unlocked blueprint gets a nudge toward practice', () => {
  // 0.2 points total, lanterns needs 0.25 → gap 0.05
  const r = report({ tide: 0.2 });
  const keys = lines(profile(), r).map((l) => l.key);
  assert.ok(keys.includes('mimi.almost_blueprint'));
  // next blueprint far away (garden at 1.2 pts, only 0.3 earned) → no tease
  const built = profile({ built: ['lanterns', 'fruitstand'] });
  const far = report({ tide: 0.3 });
  assert.ok(!lines(built, far).some((l) => l.key === 'mimi.almost_blueprint'));
});

test('egg, streak and festival lines appear when they apply', () => {
  const eggy = profile({ egg: { points: 26, goal: 30 } });
  const eggLine = lines(eggy, report()).find((l) => l.key === 'mimi.egg_soon');
  assert.equal(eggLine.vars.n, 4);
  const fiery = profile({ streak: 5 });
  assert.ok(lines(fiery, report()).some((l) => l.key === 'mimi.streak'));
  const done = profile({ flags: { festivalDone: true } });
  assert.ok(lines(done, report()).some((l) => l.key === 'mimi.festival'));
  // none of them when they don't apply
  const plain = lines(profile(), report()).map((l) => l.key);
  for (const k of ['mimi.egg_soon', 'mimi.streak', 'mimi.festival']) {
    assert.ok(!plain.includes(k), `${k} only when it applies`);
  }
});

test('she always has something to say (cozy chatter closes the list)', () => {
  const ls = lines(profile(), report({ tide: 1, garden: 1, stump: 1, vines: 1 }));
  assert.ok(ls.length >= 3);
  assert.ok(ls.some((l) => l.key.startsWith('mimi.chat.')));
});

test('every line key has EN and NL copy in i18n.js', () => {
  const src = readFileSync(new URL('../src/i18n.js', import.meta.url), 'utf8');
  const keys = [
    'mimi.meet', 'mimi.build_ready', 'mimi.need_bananas', 'mimi.almost_blueprint',
    'mimi.world_hint', 'mimi.egg_soon', 'mimi.streak', 'mimi.festival',
    'mimi.chat.1', 'mimi.chat.2', 'mimi.chat.3',
  ];
  for (const k of keys) {
    const n = src.split(`'${k}'`).length - 1;
    assert.ok(n >= 2, `'${k}' needs an EN and an NL entry (found ${n})`);
  }
});
