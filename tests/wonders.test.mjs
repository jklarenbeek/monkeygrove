// The cohesion-of-nature reveals (SUPER_PROMPT Phase 7). The cards are never on the
// clock and never gate play — but the WONDER each one points at must be literally true,
// so the "does this make sense? could it be true?" promise holds. This checks the
// cosmology (the engine identity behind each card) and that every card has cozy EN+NL
// copy. It does NOT test any gameplay — the reveals stay a door, not a worksheet.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  WONDERS, wonderProof, wondersForTrigger, parentWonders, nextWonderFor, playTrigger,
} from '../src/story/wonders.js';
import { FOUNDING_HEXAGRAM } from '../src/story/constants.js';

test('every wonder card is well-formed with a distinct id and a real audience', () => {
  const ids = WONDERS.map((w) => w.id);
  assert.equal(new Set(ids).size, ids.length, 'card ids are distinct');
  for (const w of WONDERS) {
    assert.ok(['child', 'parent', 'both'].includes(w.audience), `${w.id} audience`);
    assert.ok(w.titleKey.startsWith('wonder.') && w.bodyKey.startsWith('wonder.'), `${w.id} keys`);
    assert.ok(typeof w.trigger === 'string' && w.trigger.length, `${w.id} trigger`);
  }
});

test('subtraction really undoes adding (yijing_invert is its own undo — the tide returns)', () => {
  const tide = wonderProof('tide_returns');
  assert.equal(typeof tide, 'function');
  for (const h of [0, 7, FOUNDING_HEXAGRAM, 63]) assert.equal(tide(tide(h)), h);
});

test('commutativity really is a mirror twin (yijing_opposite is its own undo)', () => {
  const twin = wonderProof('twin_gem');
  assert.equal(typeof twin, 'function');
  for (const h of [0, 7, FOUNDING_HEXAGRAM, 63]) assert.equal(twin(twin(h)), h);
});

test('the array reads both ways (yijing_reverse is its own undo)', () => {
  const rev = wonderProof('array_both_ways');
  for (const h of [0, 5, FOUNDING_HEXAGRAM, 63]) assert.equal(rev(rev(h)), h);
});

test('a fact and its division are one wheel turned (yijing_center is a real transform)', () => {
  const wheel = wonderProof('fact_and_division');
  for (const h of [0, 13, 42, 63]) {
    const v = wheel(h);
    assert.ok(Number.isInteger(v) && v >= 0 && v <= 63, `center(${h}) = ${v} in 0..63`);
  }
});

test('the Gem Tree 64 are the 64 codons — each hexagram names a real amino acid', () => {
  const amino = wonderProof('gem_tree_64');
  let named = 0;
  for (let h = 0; h < 64; h++) {
    const name = amino(h);
    assert.equal(typeof name, 'string');
    if (name && name !== '?') named += 1;
  }
  assert.ok(named >= 60, `most of the 64 gems map to an amino acid (got ${named})`);
});

test('mechanic-only wonders carry no hexagram proof (the wonder is in the mechanic)', () => {
  assert.equal(wonderProof('music_skip_count'), null);
  assert.equal(wonderProof('bakery_pie'), null);
  assert.equal(wonderProof('bee_hexagons'), null);
  assert.equal(wonderProof('doubling_branches'), null);
  assert.equal(wonderProof('one_line_at_a_time'), null);
});

test('triggers and audiences select the right cards', () => {
  assert.deepEqual(wondersForTrigger('commutativity').map((w) => w.id), ['twin_gem']);
  assert.equal(wondersForTrigger('nope').length, 0);
  const parents = parentWonders().map((w) => w.id);
  // the DNA reveal ('both') keeps its parent-dashboard home alongside the child door
  assert.ok(parents.includes('gem_tree_64') && parents.includes('one_line_at_a_time'));
  for (const w of parentWonders()) assert.notEqual(w.audience, 'child');
});

test('playTrigger maps in-play moments to child wonder triggers', () => {
  assert.equal(playTrigger({ litTwin: true, skillId: 'tables_a', kind: 'fetch' }), 'commutativity');
  assert.equal(playTrigger({ kind: 'array', skillId: 'tables_b' }), 'array');
  assert.equal(playTrigger({ skillId: 'div_facts', kind: 'fetch' }), 'division_fact');
  assert.equal(playTrigger({ skillId: 'div_remainder', kind: 'share' }), 'division_fact');
  assert.equal(playTrigger({ world: 'business', skillId: 'percent_of' }), 'bakery');
  assert.equal(playTrigger({ world: 'tide', kind: 'fetch', skillId: 'sub_20' }), 'tide');
  assert.equal(playTrigger({ world: 'tide', kind: 'fetch', skillId: 'missing_addend' }), 'tide');
  assert.equal(playTrigger({ kind: 'fetch', skillId: 'add_20' }), null);
});

test('nextWonderFor offers an undiscovered child card once, then the next, then nothing', () => {
  assert.equal(nextWonderFor('commutativity', []).id, 'twin_gem');
  assert.equal(nextWonderFor('commutativity', ['twin_gem']), null); // already discovered — no nag
  // a trigger with a deck deals one card per discovery, in order
  assert.equal(nextWonderFor('array', []).id, 'array_both_ways');
  assert.equal(nextWonderFor('array', ['array_both_ways']).id, 'bee_hexagons');
  assert.equal(nextWonderFor('array', ['array_both_ways', 'bee_hexagons']), null);
  assert.equal(nextWonderFor('nope', []), null);
  // the Gem Tree door: first the DNA 64 ('both'), then the doubling branches
  assert.equal(nextWonderFor('gem_tree', []).id, 'gem_tree_64');
  assert.equal(nextWonderFor('gem_tree', ['gem_tree_64']).id, 'doubling_branches');
  assert.equal(nextWonderFor('gem_tree', ['gem_tree_64', 'doubling_branches']), null);
  // strictly parent cards are never offered as child reveals
  assert.equal(nextWonderFor('pacing', []), null);
});

test('every wonder card has cozy EN and NL copy', () => {
  const src = ['en', 'nl']
    .map((l) => readFileSync(new URL(`../src/i18n/${l}.js`, import.meta.url), 'utf8'))
    .join('\n');
  for (const w of WONDERS) {
    for (const key of [w.titleKey, w.bodyKey]) {
      assert.ok(src.split(`'${key}'`).length - 1 >= 2, `'${key}' needs EN and NL copy`);
    }
  }
});
