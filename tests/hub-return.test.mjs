import { test } from 'vitest';
import assert from 'node:assert/strict';
import { HubController } from '../src/hub.js';

function fakeGame(anchor) {
  const calls = [];
  const place = {
    portals: { tide: { x: 5, z: 5 } },
    buildSpots: { bakery: { x: 9, z: 4, state: 'built' } },
    size: { w: 12, d: 12 },
    cellAt(x, z) {
      if (x < 0 || z < 0 || x >= this.size.w || z >= this.size.d) return null;
      if (x === 5 && z === 5) return { walk: true };
      return { walk: !(x === 4 && z === 5) };
    },
  };
  return {
    lastHubEntry: anchor,
    place,
    player: {
      setPlace(_place, x, z) { calls.push(['setPlace', x, z]); this.x = x; this.z = z; },
      face(dx, dz) { calls.push(['face', dx, dz]); this.faceDx = dx; this.faceDz = dz; },
    },
    avatar: { spawnPet(pos) { calls.push(['spawnPet', pos.x, pos.z]); } },
    calls,
  };
}

test('hub return spot chooses a walkable tile beside the entered portal', () => {
  const g = fakeGame({ type: 'portal', worldId: 'tide' });
  const hub = new HubController(g);

  const spot = hub.findHubReturnSpot(g.lastHubEntry);

  assert.deepEqual(spot, { x: 6, z: 5, face: { dx: -1, dz: 0 } });
});

test('hub return placement faces the player back toward the portal and clears the anchor', () => {
  const g = fakeGame({ type: 'portal', worldId: 'tide' });
  const hub = new HubController(g);

  hub.placePlayerAtHubReturn();

  assert.deepEqual(g.calls, [
    ['setPlace', 6, 5],
    ['face', -1, 0],
    ['spawnPet', 6, 5],
  ]);
  assert.equal(g.lastHubEntry, null);
});

test('hub return spot can target a built business plot', () => {
  const g = fakeGame({ type: 'build', id: 'bakery' });
  const hub = new HubController(g);

  const spot = hub.findHubReturnSpot(g.lastHubEntry);

  assert.deepEqual(spot, { x: 10, z: 4, face: { dx: -1, dz: 0 } });
});
