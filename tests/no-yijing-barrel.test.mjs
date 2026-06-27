// Guard: app code must import the vendored yijing LEAF modules (yijing.js /
// bagua.js), NEVER the barrel `src/yijing/index.js` or `src/yijing/tools.js`.
// The barrel re-exports namespace objects that pull in tools.js, which runs
// side-effectful 64-iteration tables at module load AND ships a broken
// transition-groups builder. PROVENANCE.md forbids the barrel; this keeps it true
// so a careless `import ... from '../yijing'` can't regress the entry bundle.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (name === 'yijing') continue; // skip the vendored copy itself
      walk(p, out);
    } else if (name.endsWith('.js')) {
      out.push(p);
    }
  }
  return out;
}

const FORBIDDEN = [
  /from\s+['"][^'"]*yijing\/index(\.js)?['"]/, // the barrel
  /from\s+['"][^'"]*yijing\/tools(\.js)?['"]/, // side-effectful tools
  /from\s+['"][^'"]*\/yijing['"]/,             // the bare directory (resolves to index)
];

test('no app module imports the vendored yijing barrel or tools.js', () => {
  const offenders = [];
  for (const file of walk('src')) {
    const src = readFileSync(file, 'utf8');
    if (FORBIDDEN.some((re) => re.test(src))) offenders.push(file);
  }
  assert.deepEqual(offenders, [],
    `import the yijing leaf modules (yijing.js/bagua.js), not the barrel/tools: ${offenders.join(', ')}`);
});
