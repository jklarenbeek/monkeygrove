// Mimi's conversation ladder: the right advice surfaces first, every line
// has EN+NL copy, and the list never runs dry (taps always get an answer).
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mimiLines, mimiPhaseFor, advanceMimiPhase } from '../src/mimi.js';
import { islandStatus, buildById, freshIsland, playerCost } from '../src/island.js';
import { freshStory } from '../src/story/engine.js';

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

// ---------------------------------------------------------------------------
// Mimi's three-phase healing arc (Phase 4): tone shifts anxious -> opening -> whole,
// while her quest advice never changes by phase.

function storyProfile(mimiPhase, extra = {}) {
  const story = { ...freshStory(), mimiPhase };
  return { ...profile(extra), story };
}

test('phase 0 (anxious): the gray-dock, self-blaming Mimi, advice still intact', () => {
  const r = report({ tide: 0.3 });
  const ls = lines(storyProfile(0, { bananas: 999 }), r);
  const keys = ls.map((l) => l.key);
  assert.ok(keys.includes('mimi.phase0'));
  assert.ok(!keys.includes('mimi.phase1') && !keys.includes('mimi.phase2'));
  assert.equal(ls[0].key, 'mimi.build_ready'); // usefulness never drops — advice leads
});

test('phase 1 (opening): she begins to trust herself again', () => {
  const keys = lines(storyProfile(1), report()).map((l) => l.key);
  assert.ok(keys.includes('mimi.phase1'));
  assert.ok(!keys.includes('mimi.phase0') && !keys.includes('mimi.phase2'));
});

test('phase 2 (whole): nerve restored at the festival', () => {
  const keys = lines(storyProfile(2), report()).map((l) => l.key);
  assert.ok(keys.includes('mimi.phase2'));
  assert.ok(!keys.includes('mimi.phase0') && !keys.includes('mimi.phase1'));
});

test('mimiPhaseFor reads island progress: theft -> a friend home -> festival', () => {
  assert.equal(mimiPhaseFor({ story: freshStory() }), 0);            // nothing drawn yet
  const opening = { story: { ...freshStory(), lines: [true, false, false, false, false, false] } };
  assert.equal(mimiPhaseFor(opening), 1);                            // one friend home
  assert.equal(mimiPhaseFor({ story: freshStory(), flags: { festivalDone: true } }), 2);
  assert.equal(mimiPhaseFor({ story: { ...freshStory(), crabKingReconciled: true } }), 2);
});

test('advanceMimiPhase is monotonic — Mimi never relapses', () => {
  const p = { story: freshStory(), flags: {} };
  assert.equal(advanceMimiPhase(p), 0);
  p.story.lines[0] = true;
  assert.equal(advanceMimiPhase(p), 1);
  p.story.lines[0] = false; // a rating decays / line "un-draws" in a bad report
  assert.equal(advanceMimiPhase(p), 1, 'phase only ever rises');
  p.flags.festivalDone = true;
  assert.equal(advanceMimiPhase(p), 2);
});

test('every line key has EN and NL copy in i18n.js', () => {
  const src = ['en', 'nl']
    .map((l) => readFileSync(new URL(`../src/i18n/${l}.js`, import.meta.url), 'utf8'))
    .join('\n');
  const keys = [
    'mimi.meet', 'mimi.build_ready', 'mimi.need_bananas', 'mimi.almost_blueprint',
    'mimi.world_hint', 'mimi.egg_soon', 'mimi.streak', 'mimi.festival',
    'mimi.phase0', 'mimi.phase1', 'mimi.phase2',
    'mimi.chat.1', 'mimi.chat.2', 'mimi.chat.3',
  ];
  for (const k of keys) {
    const n = src.split(`'${k}'`).length - 1;
    assert.ok(n >= 2, `'${k}' needs an EN and an NL entry (found ${n})`);
  }
});
