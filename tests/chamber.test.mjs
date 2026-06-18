import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// The chamber run (problem selection, build, present, score) moved out of the
// Game god class into ChamberFlow; it reaches the shared scene/profile state
// through `g = this.game`. Read it there so the curriculum-wiring assertions
// stay location-agnostic.
const main = readFileSync(new URL('../src/chamberflow.js', import.meta.url), 'utf8');

test('runChamber passes curriculum eligible skills into normal chamber problems', () => {
  assert.match(
    main,
    /const allowedSkills = eligibleSkillIds\(g\.profile\.curriculum\);\s+const opts = g\.isEcho\s+\?\s+\{ echo: true, allowedSkills, rng: g\.rng \}\s+:\s+\{ world: g\.currentWorld, allowedSkills, rng: g\.rng \};\s+problem = ensureHostable\(nextProblem\(g\.profile\.math, opts\), g\.profile\.math, opts\);/s,
  );
});

test('runChamber adopts the generated problem world before building the chamber', () => {
  assert.match(
    main,
    /problem = ensureHostable\(nextProblem\(g\.profile\.math, opts\), g\.profile\.math, opts\);\s+if \(problem\?\.world\) g\.currentWorld = problem\.world;/s,
  );
});

test('correct-answer chamber follow-up also passes curriculum eligible skills', () => {
  assert.match(
    main,
    /const allowedSkills = eligibleSkillIds\(g\.profile\.curriculum\);\s+const opts = g\.isEcho\s+\?\s+\{ echo: true, kind: g\.problem\.kind, allowedSkills, rng: g\.rng \}\s+:\s+\{ world: g\.currentWorld, kind: g\.problem\.kind, allowedSkills, rng: g\.rng \};\s+next = ensureHostable\(nextProblem\(g\.profile\.math, opts\), g\.profile\.math, opts\);/s,
  );
});
