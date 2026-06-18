import { test } from 'vitest';
import assert from 'node:assert/strict';
import { en } from '../src/i18n/en.js';
import { nl } from '../src/i18n/nl.js';

test('every key exists in both English and Dutch — no half-translated strings', () => {
  const enKeys = new Set(Object.keys(en));
  const nlKeys = new Set(Object.keys(nl));
  const missingInNl = [...enKeys].filter((k) => !nlKeys.has(k));
  const missingInEn = [...nlKeys].filter((k) => !enKeys.has(k));
  assert.deepEqual(missingInNl, [], `keys present in en but missing from nl: ${missingInNl.join(', ')}`);
  assert.deepEqual(missingInEn, [], `keys present in nl but missing from en: ${missingInEn.join(', ')}`);
});

test('no translation is blank', () => {
  for (const [k, v] of Object.entries(en)) assert.ok(String(v).trim().length, `en '${k}' is blank`);
  for (const [k, v] of Object.entries(nl)) assert.ok(String(v).trim().length, `nl '${k}' is blank`);
});

test('interpolation placeholders match between locales', () => {
  const vars = (s) => [...String(s).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
  for (const k of Object.keys(en)) {
    if (k in nl) {
      assert.equal(vars(nl[k]), vars(en[k]),
        `'${k}' uses different {placeholders} in en ("${en[k]}") vs nl ("${nl[k]}")`);
    }
  }
});
