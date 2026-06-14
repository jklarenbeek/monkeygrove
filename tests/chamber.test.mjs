import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');

test('runChamber passes curriculum eligible skills into normal chamber problems', () => {
  assert.match(
    main,
    /const allowedSkills = eligibleSkillIds\(this\.profile\.curriculum\);\s+const opts = this\.isEcho\s+\?\s+\{ echo: true, allowedSkills \}\s+:\s+\{ world: this\.currentWorld, allowedSkills \};\s+problem = ensureHostable\(nextProblem\(this\.profile\.math, opts\), this\.profile\.math, opts\);/s,
  );
});

test('correct-answer chamber follow-up also passes curriculum eligible skills', () => {
  assert.match(
    main,
    /const allowedSkills = eligibleSkillIds\(this\.profile\.curriculum\);\s+const opts = this\.isEcho\s+\?\s+\{ echo: true, kind: this\.problem\.kind, allowedSkills \}\s+:\s+\{ world: this\.currentWorld, kind: this\.problem\.kind, allowedSkills \};\s+next = ensureHostable\(nextProblem\(this\.profile\.math, opts\), this\.profile\.math, opts\);/s,
  );
});
