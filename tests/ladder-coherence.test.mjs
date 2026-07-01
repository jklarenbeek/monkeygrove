// The coherence harness — lock #11 of SUPER_PROMPT made real (Phase 0). The story
// spine, the NL_PO curriculum, and the Tree of Learning are three projections of one
// 64-fold object; the older tests check them only PAIRWISE (tree.test: Tree<->engine;
// business-curriculum.test: mode<->objective). This file checks all three pillars as a
// whole, so drift is unmergeable:
//
//   1. every engine skill sits on exactly one Tree path AND is named by >=1 objective;
//   2. every objective names only real skills and real business modes;
//   3. an objective and the Tree path of each of its skills agree on the SLO domain
//      (via the single NL_PO<->SLO map in src/curriculum/domains.js);
//   4. every live (non-planned) Tree path is taught by >=1 NL_PO objective;
//   5. the NL_PO<->SLO domain map is total and lands in the four SLO domains.
//
// Delete a skill from ANY one pillar (engine SKILLS, a Tree path's skills[], or an
// objective's gameSkills) and one of these reddens — that is the whole point.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { SKILLS } from '../src/mathengine.js';
import { PATHS, pathsForSkill } from '../src/story/tree.js';
import { NL_PO } from '../src/curriculum/nl_po.js';
import { BUSINESS_MODES } from '../src/business/data.js';
import { SLO_DOMAINS, NL_PO_TO_SLO, sloForDomain } from '../src/curriculum/domains.js';
import { LADDER_STEPS, LADDER_SIZE, ladderStep, isTreeStep } from '../src/curriculum/ladder.js';

const OBJECTIVES = NL_PO.objectives;
const SKILL_IDS = Object.keys(SKILLS);
const MODE_IDS = new Set(Object.keys(BUSINESS_MODES));

const objectivesForSkill = (id) => OBJECTIVES.filter((o) => (o.gameSkills || []).includes(id));

// 1 — the three-pillar join: every engine skill is reachable from BOTH the Tree and
// the curriculum. (Deleting it from the engine reddens test 2 + tree.test instead.)
test('every engine skill sits on exactly one Tree path and >=1 NL_PO objective', () => {
  for (const id of SKILL_IDS) {
    const paths = pathsForSkill(id);
    assert.equal(paths.length, 1, `skill ${id} must sit on exactly one Tree path (got ${paths.length})`);
    assert.ok(objectivesForSkill(id).length >= 1, `skill ${id} is on the Tree but named by no NL_PO objective`);
  }
});

// 2 — no dangling reference in either direction.
test('every objective names only real engine skills and real business modes', () => {
  for (const o of OBJECTIVES) {
    for (const s of o.gameSkills || []) assert.ok(SKILLS[s], `${o.id} names unknown skill "${s}"`);
    for (const m of o.businessModes || []) assert.ok(MODE_IDS.has(m), `${o.id} names unknown business mode "${m}"`);
  }
});

// 3 — the curriculum's English domain and the Tree path's SLO domain must agree
// through the one shared map. This is where a careless skill-move would silently land
// a fraction objective on a numbers path; here it cannot.
test('an objective and the Tree path of each of its skills agree on the SLO domain', () => {
  for (const o of OBJECTIVES) {
    const slo = sloForDomain(o.domain);
    assert.ok(slo, `${o.id} domain "${o.domain}" has no SLO mapping`);
    for (const s of o.gameSkills || []) {
      const path = pathsForSkill(s)[0];
      if (!path) continue; // realness of the skill is asserted in test 2
      assert.equal(path.domain, slo,
        `${o.id} (${o.domain} -> ${slo}) names ${s}, which sits on path ${path.pathNo} (${path.domain})`);
    }
  }
});

// 4 — no live path is curriculum-orphaned: if the four shipped worlds practise it, a
// parent-visible objective must claim it.
test('every live Tree path is taught by >=1 NL_PO objective', () => {
  for (const p of PATHS) {
    if (p.planned) continue;
    const taught = OBJECTIVES.some((o) => (o.gameSkills || []).some((s) => p.skills.includes(s)));
    assert.ok(taught, `live path ${p.pathNo} (${p.cluster}) is taught by no NL_PO objective`);
  }
});

// 5 — the map that joins the two vocabularies must be total (every pack domain mapped,
// every Tree path domain a real SLO domain).
test('the NL_PO<->SLO domain map is total and lands in the four SLO domains', () => {
  const slo = new Set(SLO_DOMAINS);
  assert.equal(slo.size, 4, 'exactly four SLO domains');
  for (const d of NL_PO.domains) {
    const mapped = NL_PO_TO_SLO[d.id];
    assert.ok(mapped, `NL_PO domain "${d.id}" is unmapped`);
    assert.ok(slo.has(mapped), `NL_PO domain "${d.id}" maps to non-SLO "${mapped}"`);
  }
  for (const p of PATHS) assert.ok(slo.has(p.domain), `path ${p.pathNo} domain "${p.domain}" is not an SLO domain`);
});

// ---------------------------------------------------------------------------
// The 64-step ladder <-> Tree cross-check (Phase 1). The ladder is the canonical
// sequence; the Tree's steps[] arrays must reference it cleanly, and a step and the
// path that owns it must agree on the SLO domain.

// 6 — the ladder is well-formed: 8 bands x 8, the band/grade law, SLO domains, linear prereqs.
test('the 64-step ladder is well-formed (8 bands x 8, band/grade law, SLO domains)', () => {
  assert.equal(LADDER_SIZE, 64);
  const slo = new Set(SLO_DOMAINS);
  LADDER_STEPS.forEach((s, i) => {
    assert.equal(s.id, i, `step ${i} id`);
    assert.equal(s.band, i >> 3, `step ${i} band`);
    assert.equal(s.grade, (i >> 3) + 1, `step ${i} grade`);
    assert.ok(slo.has(s.domain), `step ${i} domain "${s.domain}"`);
    assert.deepEqual(s.prereq, i === 0 ? [] : [i - 1], `step ${i} prereq`);
  });
});

// 7 — every legacyGroup seed resolves to a real engine skill (18->64 migration can seed).
test('every ladder legacyGroup is a real engine skill (or null cold-start)', () => {
  for (const s of LADDER_STEPS) {
    if (s.legacyGroup) assert.ok(SKILLS[s.legacyGroup], `step ${s.id} legacyGroup "${s.legacyGroup}" is not a skill`);
  }
});

// 8 — the partition: every Getallen/Verhoudingen ladder step sits on EXACTLY ONE Tree
// path, none on two, and the Meten/Verbanden steps sit on none (they live off-Tree).
test('Tree path steps[] partition the Getallen/Verhoudingen ladder steps exactly once', () => {
  const onPath = [];
  for (const p of PATHS) {
    for (const step of p.steps) {
      assert.ok(ladderStep(step) != null, `path ${p.pathNo} names non-existent ladder step ${step}`);
      onPath.push(step);
    }
  }
  assert.equal(new Set(onPath).size, onPath.length, 'a ladder step is claimed by two paths');
  const treeSteps = LADDER_STEPS.filter(isTreeStep).map((s) => s.id);
  assert.deepEqual(
    [...onPath].sort((a, b) => a - b),
    [...treeSteps].sort((a, b) => a - b),
    'on-path steps must be exactly the Getallen+Verhoudingen ladder steps (no orphan, no double-claim)',
  );
});

// 9 — a step and the Tree path that owns it agree on the SLO domain.
test('a ladder step and the Tree path that owns it agree on the SLO domain', () => {
  for (const p of PATHS) {
    for (const step of p.steps) {
      assert.equal(ladderStep(step).domain, p.domain,
        `path ${p.pathNo} (${p.domain}) owns step ${step} (${ladderStep(step).domain})`);
    }
  }
});

// 10 — NL_PO objectives reference the ladder honestly: any objective.steps point at real
// ladder steps in the objective's own SLO domain.
test('objective.steps reference real ladder steps in the objective SLO domain', () => {
  for (const o of OBJECTIVES) {
    if (!o.steps) continue;
    const slo = sloForDomain(o.domain);
    for (const step of o.steps) {
      const ls = ladderStep(step);
      assert.ok(ls != null, `${o.id} references non-existent ladder step ${step}`);
      assert.equal(ls.domain, slo, `${o.id} (${o.domain} -> ${slo}) references step ${step} (${ls.domain})`);
    }
  }
});
