// The Tree of Learning is cross-checked against the @yijingjs/core engine, exactly
// like the story spine in story.test.mjs: the 10 + 22 fold must reproduce from the
// King Wen sequence, the bottom node must be the founding hexagram, and every skill
// a path names must be a real mathengine skill (so the cosmology can't drift).
// See docs/story/TREE_OF_LEARNING.md and src/story/tree.js.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import {
  YIJING_KINGWEN_SEQUENCE, yijing_isBalanced, yijing_toWen,
} from '../src/yijing/yijing.js';
import { SKILLS } from '../src/mathengine.js';
import { CHAPTERS } from '../src/story/constants.js';
import {
  PAIRS, NODES, NODE_IDS, PATHS, CHAPTER_REGIONS, PLANNED_PATHS,
  nodeById, pathsForSkill,
} from '../src/story/tree.js';
import { SLO_DOMAINS } from '../src/curriculum/domains.js';

// The four SLO domains come from the single shared map (src/curriculum/domains.js),
// not a hand-typed set here, so the Tree and the coherence harness can never disagree
// about what the four domains are.
const FOUR_DOMAINS = new Set(SLO_DOMAINS);

// ---------------------------------------------------------------------------
// The fold: 64 -> 32 King Wen pairs -> 10 balanced (nodes) + 22 unbalanced (paths).

test('the fold yields exactly 10 nodes and 22 paths', () => {
  assert.equal(PAIRS.balanced.length, 10);
  assert.equal(PAIRS.unbalanced.length, 22);
  assert.equal(NODES.length, 10);
  assert.equal(PATHS.length, 22);
  assert.equal(NODE_IDS.length, 10);
});

test('the fold reproduces from the engine (no hand-typed pair can drift)', () => {
  const balanced = [], unbalanced = [];
  for (let i = 0; i < 64; i += 2) {
    const a = YIJING_KINGWEN_SEQUENCE[i], b = YIJING_KINGWEN_SEQUENCE[i + 1];
    (yijing_isBalanced(a) && yijing_isBalanced(b) ? balanced : unbalanced).push([a, b]);
  }
  assert.deepEqual(PAIRS.balanced, balanced);
  assert.deepEqual(PAIRS.unbalanced, unbalanced);
});

test('every node pair is balanced; every path pair is unbalanced', () => {
  for (const n of NODES) {
    assert.ok(yijing_isBalanced(n.pair[0]) && yijing_isBalanced(n.pair[1]), `node ${n.id} balanced`);
  }
  for (const p of PATHS) {
    assert.ok(!(yijing_isBalanced(p.pair[0]) && yijing_isBalanced(p.pair[1])), `path ${p.pathNo} unbalanced`);
  }
});

test('the bottom node "the Whole" is the founding hexagram pair (#63/#64 = 42/21)', () => {
  const whole = nodeById('whole');
  assert.deepEqual(whole.pair, [42, 21]);
  assert.equal(yijing_toWen(whole.pair[0]), 63); // After Completion
  assert.equal(yijing_toWen(whole.pair[1]), 64); // Before Completion
  assert.equal(NODE_IDS[9], 'whole'); // kingdom = bottom of the Tree
});

// ---------------------------------------------------------------------------
// Structure: nodes, pillars, path adjacency.

test('node ids are ten distinct learning points indexed in order', () => {
  assert.equal(new Set(NODE_IDS).size, 10);
  for (const n of NODES) assert.equal(NODE_IDS[n.index], n.id);
});

test('the three pillars hold the curriculum spine, build-up, and break-down', () => {
  const pillar = (name) => NODES.filter((n) => n.pillar === name).map((n) => n.id);
  assert.deepEqual(pillar('middle'), ['integration', 'balance', 'foundation', 'whole']);
  assert.deepEqual(pillar('right'),  ['proportion', 'growth', 'fluency']);   // building up (generating)
  assert.deepEqual(pillar('left'),   ['precision', 'sharing', 'procedure']); // breaking down (overcoming)
});

test('every path bridges two real, distinct nodes and names them consistently', () => {
  for (const p of PATHS) {
    assert.ok(p.nodes[0] >= 0 && p.nodes[0] < 10, `path ${p.pathNo} from in range`);
    assert.ok(p.nodes[1] >= 0 && p.nodes[1] < 10, `path ${p.pathNo} to in range`);
    assert.notEqual(p.nodes[0], p.nodes[1], `path ${p.pathNo} connects two nodes`);
    assert.equal(p.from, NODE_IDS[p.nodes[0]]);
    assert.equal(p.to, NODE_IDS[p.nodes[1]]);
  }
});

// ---------------------------------------------------------------------------
// Curriculum binding: skills are real, coverage is complete, gaps are honest.

test('every skill a path names is a real mathengine skill (no drift)', () => {
  for (const p of PATHS) {
    for (const s of p.skills) assert.ok(SKILLS[s], `path ${p.pathNo} names unknown skill "${s}"`);
  }
});

test('the 22 paths cover all shipped skills, each exactly once', () => {
  const named = PATHS.flatMap((p) => p.skills);
  assert.equal(new Set(named).size, named.length, 'no skill is mapped to two paths');
  assert.deepEqual([...named].sort(), Object.keys(SKILLS).sort());
});

test('planned paths carry no shipped skill (the decimals/%/scale gap); live paths do', () => {
  for (const p of PATHS) {
    if (p.planned) assert.equal(p.skills.length, 0, `planned path ${p.pathNo} should map to no shipped skill yet`);
    else assert.ok(p.skills.length > 0, `live path ${p.pathNo} should map to a shipped skill`);
  }
  // the gap has shrunk to the still-unbuilt upper-grade paths (estimation, fraction
  // notation); the bottom, top, decimals, %, and scale are now live.
  assert.ok(PLANNED_PATHS.length >= 1, 'the remaining curriculum gap is represented');
  assert.deepEqual(PATHS.filter((p) => p.planned), PLANNED_PATHS);
});

test('every path domain is one of the four SLO domains', () => {
  for (const p of PATHS) assert.ok(FOUR_DOMAINS.has(p.domain), `path ${p.pathNo} domain ${p.domain}`);
});

test('pathsForSkill resolves a shipped skill back to its single path', () => {
  const ps = pathsForSkill('frac_equiv');
  assert.equal(ps.length, 1);
  assert.ok(ps[0].skills.includes('frac_equiv'));
  assert.deepEqual(pathsForSkill('no_such_skill'), []);
});

// ---------------------------------------------------------------------------
// Chapter regions: the seven-chapter spine lights the whole Tree, once.

test('every region key is a real chapter', () => {
  const keys = new Set(CHAPTERS.map((c) => c.key));
  for (const k of Object.keys(CHAPTER_REGIONS)) assert.ok(keys.has(k), `region "${k}" is a real chapter`);
});

test('the seven chapters light every node and every path exactly once', () => {
  const nodes = Object.values(CHAPTER_REGIONS).flatMap((r) => r.nodes);
  assert.equal(new Set(nodes).size, nodes.length, 'no node lit by two chapters');
  assert.deepEqual([...nodes].sort(), [...NODE_IDS].sort());

  const paths = Object.values(CHAPTER_REGIONS).flatMap((r) => r.paths);
  assert.equal(new Set(paths).size, paths.length, 'no path lit by two chapters');
  assert.deepEqual([...paths].sort((a, b) => a - b), Array.from({ length: 22 }, (_, i) => i));
});
