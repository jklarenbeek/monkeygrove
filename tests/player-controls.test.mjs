import { test } from 'vitest';
import assert from 'node:assert/strict';
import { Player, moveIntentHopTuning } from '../src/player.js';

function fakeMesh() {
  return {
    position: { x: 0, y: 0, z: 0, copy() {}, clone() { return { ...this }; } },
    rotation: { y: 0 },
    scale: { x: 1, set() {}, setScalar() {} },
    add() {},
    remove() {},
  };
}

function playerWithStepRecorder() {
  const p = new Player(fakeMesh());
  const steps = [];
  p.tryStep = (dx, dz) => {
    steps.push([dx, dz]);
    return true;
  };
  return { p, steps };
}

test('held move intent steps immediately, repeats on its interval, and stops cleanly', () => {
  const { p, steps } = playerWithStepRecorder();

  p.setMoveIntent(1, 0, 1);
  assert.deepEqual(steps, [[1, 0]], 'the first held direction moves immediately');

  p.updateMoveIntent(80);
  assert.deepEqual(steps, [[1, 0]], 'not enough elapsed time for a repeat');

  p.updateMoveIntent(180);
  assert.deepEqual(steps, [[1, 0], [1, 0]], 'held direction repeats');

  p.clearMoveIntent();
  p.updateMoveIntent(500);
  assert.deepEqual(steps, [[1, 0], [1, 0]], 'released intent no longer repeats');
});

test('held move intent clears queued steps when the child changes direction', () => {
  const { p } = playerWithStepRecorder();
  p.setMoveIntent(1, 0, 1);
  p.queue = [{ dx: 1, dz: 0 }, { dx: 1, dz: 0 }];

  p.setMoveIntent(0, 1, 1);

  assert.deepEqual(p.queue, [], 'old direction queue is discarded for responsiveness');
});

function makePlace(blocked = new Set()) {
  return {
    size: { w: 4, d: 3 },
    cellAt(x, z) {
      if (x < 0 || z < 0 || x >= this.size.w || z >= this.size.d) return null;
      return { x, z, walk: !blocked.has(`${x},${z}`) };
    },
    canWalk(_from, to) {
      return !!to?.walk;
    },
  };
}

test('previewPathTo returns BFS cells without mutating the movement queue', () => {
  const p = new Player(fakeMesh());
  p.place = makePlace();
  p.x = 0;
  p.z = 0;
  p.queue = [{ dx: 0, dz: 1 }];

  const path = p.previewPathTo(2, 0);

  assert.deepEqual(path, [{ x: 1, z: 0 }, { x: 2, z: 0 }]);
  assert.deepEqual(p.queue, [{ dx: 0, dz: 1 }], 'preview is read-only');
});

test('previewPathTo returns false for unreachable targets', () => {
  const p = new Player(fakeMesh());
  p.place = makePlace(new Set(['1,0', '0,1']));
  p.x = 0;
  p.z = 0;

  assert.equal(p.previewPathTo(2, 0), false);
});

test('reachableCells returns nearby legal cells without including blocked tiles', () => {
  const p = new Player(fakeMesh());
  p.place = makePlace(new Set(['1,0']));
  p.x = 0;
  p.z = 0;

  const cells = p.reachableCells(2).map((c) => `${c.x},${c.z}`).sort();

  assert.deepEqual(cells, ['0,1', '0,2', '1,1'].sort());
});

test('moveIntentHopTuning makes strong joystick movement look quicker and livelier', () => {
  const weak = moveIntentHopTuning(0.2);
  const strong = moveIntentHopTuning(1);

  assert.ok(strong.ms < weak.ms, `strong move ms ${strong.ms} should be lower than weak ${weak.ms}`);
  assert.ok(strong.arc > weak.arc, `strong move arc ${strong.arc} should be higher than weak ${weak.arc}`);
  assert.ok(strong.ms >= 145, 'hop animation keeps enough time to read as a hop');
});
