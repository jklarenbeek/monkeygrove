// Base water surface. This file stays in the first-load chunk and only creates
// the always-readable two-plane water. The playful shoreline personality lives in
// waterfx.js and is lazy-loaded for animated tiers.
import * as THREE from 'three';

function flatPlane(geo, color, y, opts = {}) {
  const mat = new THREE.MeshLambertMaterial({ color, ...opts });
  mat._owned = true;
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = y;
  return mesh;
}

export function createWaterSurface(place, { size, quality, palette, theme = 'hub' } = {}) {
  const group = new THREE.Group();
  const span = Math.max(size.w, size.d) * 3;
  const geo = new THREE.PlaneGeometry(span, span);
  const surface = flatPlane(geo, palette.water, -0.22, { transparent: true, opacity: 0.92 });
  const deep = flatPlane(geo, palette.waterDeep, -0.55);
  const lifeAnchors = [];
  let t = 0;
  let fx = null;
  let disposed = false;

  group.add(surface, deep);

  if (quality === 'animated') {
    import('./waterfx.js').then((mod) => {
      if (disposed) return;
      fx = mod.attachWaterEffects(place, { group, surface, deep, theme, lifeAnchors });
    }).catch(() => {});
  }

  return {
    group,
    surface,
    lifeAnchors,
    update(dtMs) {
      t += dtMs / 1000;
      surface.position.y = -0.22 + Math.sin(t * 1.11) * 0.02;
      fx?.update?.(dtMs);
    },
    react(type, payload) { fx?.react?.(type, payload); },
    dispose() {
      disposed = true;
      fx?.dispose?.();
    },
    spawnShoreRipple(anchor, opts) { fx?.spawnShoreRipple?.(anchor, opts); },
    spawnFishShadow(anchor, opts) { fx?.spawnFishShadow?.(anchor, opts); },
    spawnBubble(anchor, opts) { fx?.spawnBubble?.(anchor, opts); },
    spawnSparkle(anchor, opts) { fx?.spawnSparkle?.(anchor, opts); },
  };
}
