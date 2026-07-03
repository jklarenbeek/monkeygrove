// The cutscene scripts are data — validate them the way the director will read
// them, so a typo'd cell, an unknown beat, or a missing translation fails here
// and never in front of a child.
import { test } from 'vitest';
import assert from 'node:assert/strict';
import { CUTSCENES } from '../src/cutscene/scenes.js';
import { en } from '../src/i18n/en.js';
import { nl } from '../src/i18n/nl.js';

// Chars an actor can reliably stand on / walk to. 'd' cells are excluded on
// purpose: _decorate may drop a blocking palm/rock on them depending on seed.
const SAFE_CHARS = new Set(['.', ',']);
const BEAT_KEYS = ['say', 'walk', 'pause', 'camera', 'turn', 'fx', 'emote', 'sfx'];
const FX_KINDS = new Set(['gray', 'bloom', 'confetti', 'sparkle', 'shake', 'numbers']);
const WHO_VALUES = new Set(['mimi', 'crabking', null, undefined]);

const scenes = Object.entries(CUTSCENES);

function charAt(rows, x, z) {
  return rows?.[z]?.[x] ?? '#';
}

// Literal positions must land on safe floor; symbolic specs ('@actor',
// {marker}, {nearPlayer}) are resolved at runtime against the live place.
function assertPos(scene, spec, label, { walkable = false } = {}) {
  if (Array.isArray(spec)) {
    assert.equal(spec.length, 2, `${label}: literal position is [x, z]`);
    if (scene.place) {
      const ch = charAt(scene.place.rows, spec[0], spec[1]);
      assert.notEqual(ch, '#', `${label}: [${spec}] is not a wall`);
      if (walkable) assert.ok(SAFE_CHARS.has(ch), `${label}: [${spec}] ('${ch}') is safe floor`);
    }
    return;
  }
  if (typeof spec === 'string') {
    assert.match(spec, /^@\w+$/, `${label}: string positions are '@actorId'`);
    const id = spec.slice(1);
    assert.ok(scene.actors.some((a) => a.id === id), `${label}: '${spec}' names a declared actor`);
    return;
  }
  assert.ok(spec && typeof spec === 'object', `${label}: has a position`);
  assert.ok(spec.marker !== undefined || spec.nearPlayer !== undefined,
    `${label}: object positions use {marker} or {nearPlayer}`);
  if (spec.nearPlayer !== undefined) {
    assert.ok(scene.staged, `${label}: {nearPlayer} only makes sense on a staged (live-place) scene`);
  }
}

test('every cutscene id matches its registry key and has actors + beats', () => {
  assert.ok(scenes.length >= 4, 'the four story dialogs are all scripted');
  for (const [key, scene] of scenes) {
    assert.equal(scene.id, key, `scene '${key}' id matches its key`);
    assert.ok(Array.isArray(scene.actors) && scene.actors.length, `scene '${key}' declares actors`);
    assert.ok(Array.isArray(scene.beats) && scene.beats.length, `scene '${key}' has beats`);
    assert.ok(scene.staged || scene.place, `scene '${key}' is staged or brings its own place`);
    assert.ok(!(scene.staged && scene.place), `scene '${key}' is not both staged and placed`);
  }
});

test('placed scenes have rectangular, wall-bordered rows and an in-bounds opening camera', () => {
  for (const [key, scene] of scenes) {
    if (!scene.place) continue;
    const rows = scene.place.rows;
    const w = rows[0].length;
    for (const row of rows) assert.equal(row.length, w, `scene '${key}': rows are rectangular`);
    assert.match(rows[0], /^#+$/, `scene '${key}': top border is wall`);
    assert.match(rows[rows.length - 1], /^#+$/, `scene '${key}': bottom border is wall`);
    assert.ok(scene.camera, `scene '${key}': placed scenes set an opening camera`);
    assertPos(scene, scene.camera.to, `scene '${key}' camera.to`);
  }
});

test('every actor spawns on safe floor and every walk target is reachable floor', () => {
  for (const [key, scene] of scenes) {
    for (const actor of scene.actors) {
      assert.ok(actor.id, `scene '${key}': actor has an id`);
      assert.ok(['char', 'creature', 'avatar'].includes(actor.kind), `scene '${key}': actor '${actor.id}' kind known`);
      assert.ok(actor.kind === 'avatar' || actor.model, `scene '${key}': actor '${actor.id}' names a model`);
      assertPos(scene, actor.at, `scene '${key}' actor '${actor.id}' at`, { walkable: true });
      if (actor.look) assertPos(scene, actor.look, `scene '${key}' actor '${actor.id}' look`);
    }
    for (const beat of scene.beats) {
      if (beat.walk !== undefined) {
        assert.ok(scene.actors.some((a) => a.id === beat.walk), `scene '${key}': walk names actor '${beat.walk}'`);
        assertPos(scene, beat.to, `scene '${key}' walk '${beat.walk}' to`, { walkable: true });
      }
      if (beat.turn !== undefined) {
        assert.ok(scene.actors.some((a) => a.id === beat.turn), `scene '${key}': turn names actor '${beat.turn}'`);
        assertPos(scene, beat.toward, `scene '${key}' turn '${beat.turn}' toward`);
      }
      if (beat.emote !== undefined) {
        assert.ok(scene.actors.some((a) => a.id === beat.emote), `scene '${key}': emote names actor '${beat.emote}'`);
      }
      if (beat.camera !== undefined) assertPos(scene, beat.camera, `scene '${key}' camera beat`);
      if (beat.fx !== undefined && beat.at !== undefined) assertPos(scene, beat.at, `scene '${key}' fx '${beat.fx}' at`);
    }
  }
});

test('every beat uses exactly one known verb and known fx/who values', () => {
  for (const [key, scene] of scenes) {
    for (const beat of scene.beats) {
      const verbs = BEAT_KEYS.filter((k) => beat[k] !== undefined);
      assert.equal(verbs.length, 1, `scene '${key}': beat ${JSON.stringify(beat)} has exactly one verb`);
      if (beat.fx !== undefined) assert.ok(FX_KINDS.has(beat.fx), `scene '${key}': fx '${beat.fx}' known`);
      if (beat.say !== undefined) assert.ok(WHO_VALUES.has(beat.who), `scene '${key}': who '${beat.who}' known`);
      if (beat.pause !== undefined) assert.ok(beat.pause > 0 && beat.pause <= 2500, `scene '${key}': pause is a moment, not a timer`);
    }
  }
});

test('every say key resolves in BOTH dictionaries (the cutscenes speak Dutch too)', () => {
  for (const [key, scene] of scenes) {
    for (const beat of scene.beats) {
      if (beat.say === undefined) continue;
      assert.ok(en[beat.say], `scene '${key}': '${beat.say}' exists in EN`);
      assert.ok(nl[beat.say], `scene '${key}': '${beat.say}' exists in NL`);
    }
  }
  assert.ok(en['cutscene.skip'] && nl['cutscene.skip'], 'the Skip button is translated');
});

test('the cutscenes retell the SAME story pages the DOM cards show (no fork in canon)', () => {
  const saidKeys = (id) => CUTSCENES[id].beats.filter((b) => b.say).map((b) => b.say);
  assert.deepEqual(saidKeys('intro'), ['story.1', 'story.2', 'story.3', 'story.4']);
  assert.deepEqual(saidKeys('finale'), ['finale.1', 'finale.2', 'finale.3', 'finale.4']);
  assert.deepEqual(saidKeys('reveal'), ['story.beat.reveal.1', 'story.beat.reveal.2']);
  assert.deepEqual(saidKeys('sighting'), ['story.beat.sighting.1', 'story.beat.sighting.2']);
});
