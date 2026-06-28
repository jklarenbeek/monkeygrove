// Soft blob contact shadow — the cheap grounding that keeps every character, pet,
// and prop reading as planted ON the island instead of floating over it. Independent
// of the real sun shadow map, so it works even where that map is soft, off-screen,
// or disabled by tier — which is why it stays ON at every tier (GFX.contactShadows),
// including Low: grounding is a readability aid for young players.
//
// Everything heavy is a MODULE-LEVEL SINGLETON, built lazily on first use and shared
// across every blob: one canvas texture, one plane geometry, and a tiny set of
// materials bucketed by opacity. The geometry is marked `_cached` and the materials
// are NOT `_owned`, so a place's dispose() (which frees only `_owned` materials and
// non-`_cached` geometry — see chamber.js Place.dispose) leaves these shared objects
// alone, exactly like the cached voxel geometry. No shipped asset (procedural canvas)
// → the precache budget is untouched.
import * as THREE from 'three';

let _tex = null;
function blobTexture() {
  if (_tex) return _tex;
  if (typeof document === 'undefined') return null; // SSR / tests without a DOM
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  // Soft, slightly warm grey — a gentle smudge, never a hard black pool. Alpha
  // falls smoothly to 0 at the rim; overall strength is set by material.opacity.
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(34,42,22,1)');
  grad.addColorStop(0.5, 'rgba(34,42,22,0.55)');
  grad.addColorStop(1, 'rgba(34,42,22,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  _tex = new THREE.CanvasTexture(c);
  _tex._cached = true; // shared singleton — never disposed with a place
  return _tex;
}

let _geo = null;
function blobGeo() {
  if (_geo) {
    return _geo;
  }
  _geo = new THREE.PlaneGeometry(1, 1);
  _geo._cached = true; // shared singleton — skipped by Place.dispose()
  return _geo;
}

// Materials bucketed by opacity (rounded to whole percent) so a few gentle strengths
// (e.g. 0.28 under a character, ~0.18 under a big build cluster) still share material
// state. Each is a shared singleton — never `_owned`, so dispose() leaves it be.
const _mats = new Map();
function blobMat(opacity) {
  const key = Math.round(opacity * 100);
  let m = _mats.get(key);
  if (!m) {
    m = new THREE.MeshBasicMaterial({
      map: blobTexture(),
      transparent: true,
      depthWrite: false,   // never occlude anything; it's a flat smudge on the ground
      opacity,
      color: 0xffffff,     // the warm-grey tint lives in the texture
    });
    _mats.set(key, m); // NOT _owned → survives Place.dispose()
  }
  return m;
}

// → THREE.Mesh: a flat quad lying on the ground (XZ plane), centered on its origin.
// Add it under a static group (origin at the feet) or position it directly in a
// place group. `radius` is the footprint half-width in world units.
export function makeContactShadow({ radius = 0.4, opacity = 0.28, yOffset = 0.02 } = {}) {
  const mesh = new THREE.Mesh(blobGeo(), blobMat(opacity));
  mesh.rotation.x = -Math.PI / 2;      // lie flat
  mesh.scale.set(radius * 2, radius * 2, 1);
  mesh.position.y = yOffset;            // lift off the floor to avoid z-fighting
  mesh.userData.contactShadow = true;
  return mesh;
}
