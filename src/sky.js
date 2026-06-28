// Procedural gradient skydome — a single large inverted sphere whose vertices carry
// a baked vertical gradient (horizon color → top color). Built ONCE and shared
// across every scene (it never changes), added to `world.scene` (not a place group),
// so there is nothing per-place to dispose. No image/HDR asset → the precache budget
// is untouched (a shipped sky texture would blow it).
//
// Why vertex colors on a MeshBasicMaterial instead of a custom ShaderMaterial: a
// built-in material flows through the renderer's tone-mapping + sRGB output pipeline
// automatically, so the sky is graded identically to the rest of the world (Phase 1
// turns ACES tone mapping on). A raw ShaderMaterial would bypass that grading and
// the sky would clash with the scene. Unlit (Basic) so the gradient is exactly the
// authored sky, not lit by the sun.
import * as THREE from 'three';

// Light, sunny morning sky: a soft blue up top easing to a near-white warm haze at
// the horizon. Seeded from PALETTE.skyTop so it harmonizes with the CSS fallback
// gradient (body background in style.css). The horizon color is reused as the fog
// color in world.js so distance haze melts into the sky band.
export const SKY_TOP = 0xbfe8f7;      // == PALETTE.skyTop
export const SKY_HORIZON = 0xeaf6fb;  // pale, bright horizon haze

export function makeSky({ top = SKY_TOP, horizon = SKY_HORIZON, radius = 160, exponent = 0.7 } = {}) {
  const geo = new THREE.SphereGeometry(radius, 24, 16);
  const topC = new THREE.Color(top);
  const horC = new THREE.Color(horizon);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / radius;                 // -1 (down) .. +1 (up)
    const t = Math.pow(Math.max(0, y), exponent);   // hug the horizon band
    c.copy(horC).lerp(topC, t);
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.MeshBasicMaterial({
    vertexColors: true,
    side: THREE.BackSide,   // seen from the inside
    fog: false,             // the dome itself is never hazed — only the scene in front of it
    depthWrite: false,      // never occlude anything; it's the backdrop
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false; // always present; it surrounds the camera
  mesh.renderOrder = -1;      // drawn first, behind everything
  mesh.name = 'skydome';
  return mesh;
}
