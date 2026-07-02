// Water surface. This file stays in the first-load chunk.
//
// Two quality paths:
//   'flat'     — today's two always-readable Lambert planes + gentle bob,
//                byte-identical to the original renderer (low tier / reduced
//                motion). No spawns, no anchors.
//   'animated' — ONE stylized shader plane: a shore-distance field baked from
//                the island's real footprint drives a shallow→deep gradient and
//                an animated foam band hugging the coast; low-frequency vertex
//                waves and drifting procedural highlights live entirely in the
//                shader. Playful sprite moments (ripples, fish shadows,
//                bubbles) stay in the lazy-loaded waterfx.js chunk.
//
// The shader's clock is GLOBAL (module epoch), not per-scene: rebuilding a
// place resumes the exact same phase, so the water never visibly "resets"
// between hub, chambers, and shops.
import * as THREE from 'three';

// One clock for every water surface of the session (see header).
const EPOCH = (typeof performance !== 'undefined' && performance.now)
  ? performance.now() : 0;
function waterTime() {
  return (((typeof performance !== 'undefined' && performance.now)
    ? performance.now() : 0) - EPOCH) / 1000;
}

// Per-world water personality (used by the animated shader; 'flat' always
// keeps the plain base palette).
export const WATER_TINT = {
  hub: { shallow: 0x86cfe6, deep: 0x4f9fc9, foam: 1.0 },
  tide: { shallow: 0x8fd6ea, deep: 0x4f9fc9, foam: 1.35 },
  garden: { shallow: 0x84cbe2, deep: 0x54a3c8, foam: 0.8 },
  stump: { shallow: 0x8ccbdd, deep: 0x569fc0, foam: 1.0 },
  vines: { shallow: 0x7fbde4, deep: 0x5b86cf, foam: 0.8 },
};

function flatPlane(geo, color, y, opts = {}) {
  const mat = new THREE.MeshLambertMaterial({ color, ...opts });
  mat._owned = true;
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = y;
  return mesh;
}

// Bake the island's shore-distance field into a small one-channel texture:
// 0 under/at land, rising to 1 in open water (normalized by MAX_SHORE_DIST
// world units). The fragment shader reads it for the depth gradient and the
// foam band — so the foam hugs the REAL coastline, coves and all.
const MAX_SHORE_DIST = 5;
function bakeShoreField(place, span, texSize = 96) {
  const { w, d } = place.size;
  const land = [];
  for (let z = 0; z < d; z++) {
    for (let x = 0; x < w; x++) {
      if (place.cellAt(x, z)) {
        const wp = place.worldPos(x, z);
        land.push(wp.x, wp.z);
      }
    }
  }
  const data = new Uint8Array(texSize * texSize);
  for (let iz = 0; iz < texSize; iz++) {
    const wz = ((iz + 0.5) / texSize - 0.5) * span;
    for (let ix = 0; ix < texSize; ix++) {
      const wx = ((ix + 0.5) / texSize - 0.5) * span;
      let best = Infinity;
      for (let i = 0; i < land.length; i += 2) {
        const dx = land[i] - wx, dz = land[i + 1] - wz;
        const dd = dx * dx + dz * dz;
        if (dd < best) best = dd;
      }
      // half a tile of the distance belongs to the tile body itself
      const dist = Math.max(0, Math.sqrt(best) - 0.5);
      data[iz * texSize + ix] = Math.min(255, Math.round((dist / MAX_SHORE_DIST) * 255));
    }
  }
  const tex = new THREE.DataTexture(data, texSize, texSize, THREE.RedFormat, THREE.UnsignedByteType);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

const WATER_VERT = /* glsl */`
#include <fog_pars_vertex>
uniform float uTime;
uniform float uWave;
varying vec2 vXZ;
void main() {
  // PlaneGeometry local (x, y) maps to world (x, -z) after the -90° X tilt.
  vXZ = vec2(position.x, -position.y);
  vec3 p = position;
  float w1 = sin(vXZ.x * 0.9 + uTime * 1.05) * cos(vXZ.y * 0.7 + uTime * 0.8);
  float w2 = sin((vXZ.x - vXZ.y) * 0.45 + uTime * 0.55);
  p.z += (w1 * 0.6 + w2 * 0.4) * uWave;
  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}
`;

const WATER_FRAG = /* glsl */`
#include <fog_pars_fragment>
uniform float uTime;
uniform float uSpan;
uniform float uMotion;
uniform float uFoam;
uniform vec3 uShallow;
uniform vec3 uDeep;
uniform vec3 uFoamColor;
uniform vec3 uMood;
uniform sampler2D uShore;
varying vec2 vXZ;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main() {
  float t = uTime * uMotion;
  float d = texture2D(uShore, vXZ / uSpan + 0.5).r;

  // shallow -> deep gradient off the real coastline
  vec3 col = mix(uShallow, uDeep, smoothstep(0.04, 0.72, d));

  // two drifting low-frequency highlight layers (open-water life)
  float n1 = vnoise(vXZ * 0.55 + vec2(t * 0.11, t * 0.07));
  float n2 = vnoise(vXZ * 1.60 - vec2(t * 0.16, -t * 0.10));
  col += (n1 * 0.5 + n2 * 0.5 - 0.5) * 0.07;

  // sparse sun glints that twinkle as the field drifts (kept rare — a dense
  // field reads as static noise on a still screen)
  float sp = vnoise(vXZ * 3.1 + vec2(-t * 0.22, t * 0.18)) * vnoise(vXZ * 1.1 + vec2(t * 0.13, -t * 0.09));
  col += smoothstep(0.62, 0.85, sp) * 0.20 * uMotion;

  // animated foam band hugging the shore + a soft breathing outer ring
  float wob = (vnoise(vXZ * 2.2 + vec2(t * 0.35, -t * 0.28)) - 0.5) * 0.10;
  float band = 1.0 - smoothstep(0.015, 0.14 + wob, d);
  float ringAt = 0.24 + 0.045 * sin(t * 0.8) + wob;
  float ring = (1.0 - smoothstep(0.0, 0.045, abs(d - ringAt)))
    * (0.45 + 0.55 * vnoise(vXZ * 1.3 + vec2(t * 0.2, -t * 0.15)));
  float foam = clamp(band + ring * 0.55, 0.0, 1.0) * uFoam;
  col = mix(col, uFoamColor, foam * (0.55 + 0.12 * sin(t * 1.3)));

  gl_FragColor = vec4(col * uMood, 1.0);
  #include <fog_fragment>
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

function shaderSurface(place, span, theme, reduced) {
  const tint = WATER_TINT[theme] || WATER_TINT.hub;
  const mat = new THREE.ShaderMaterial({
    vertexShader: WATER_VERT,
    fragmentShader: WATER_FRAG,
    uniforms: {
      ...THREE.UniformsUtils.clone(THREE.UniformsLib.fog),
      uTime: { value: waterTime() },
      uSpan: { value: span },
      uMotion: { value: reduced ? 0.25 : 1 },
      uWave: { value: reduced ? 0.008 : 0.035 },
      uFoam: { value: tint.foam },
      uShallow: { value: new THREE.Color(tint.shallow) },
      uDeep: { value: new THREE.Color(tint.deep) },
      uFoamColor: { value: new THREE.Color(0xf2fdff) },
      uMood: { value: new THREE.Vector3(1, 1, 1) },
      uShore: { value: bakeShoreField(place, span) },
    },
    fog: true,
  });
  mat._owned = true;
  // The mesh reaches well past the shore field so its straight edge sits out in
  // the fog/horizon instead of cutting across the visible sea. Beyond the field
  // the clamped texture reads "deep" everywhere, which is exactly right.
  const geo = new THREE.PlaneGeometry(span * 1.8, span * 1.8, 56, 56);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.22;
  return mesh;
}

export function createWaterSurface(place, { size, quality, palette, theme = 'hub' } = {}) {
  const group = new THREE.Group();
  const span = Math.max(size.w, size.d) * 3;
  const lifeAnchors = [];
  let t = 0;
  let fx = null;
  let disposed = false;
  let surface;

  if (quality === 'animated') {
    // a11y module stays out of this first-load file; callers pass 'flat' under
    // reduced motion (gfx.js folds it down), so animated here means motion is ok
    surface = shaderSurface(place, span, theme, false);
    group.add(surface);
    import('./waterfx.js').then((mod) => {
      if (disposed) return;
      fx = mod.attachWaterEffects(place, { group, surface, theme, lifeAnchors });
    }).catch(() => {});
  } else {
    const geo = new THREE.PlaneGeometry(span, span);
    surface = flatPlane(geo, palette.water, -0.22, { transparent: true, opacity: 0.92 });
    const deep = flatPlane(geo, palette.waterDeep, -0.55);
    group.add(surface, deep);
  }

  return {
    group,
    surface,
    lifeAnchors,
    update(dtMs) {
      t += dtMs / 1000;
      if (surface.material.isShaderMaterial) {
        surface.material.uniforms.uTime.value = waterTime();
      } else {
        surface.position.y = -0.22 + Math.sin(t * 1.11) * 0.02;
      }
      fx?.update?.(dtMs);
    },
    // per-chamber mood: a subtle multiplier over the theme tint (see world.js DAYLIGHT)
    setMood(rgb) {
      if (surface.material.isShaderMaterial && rgb) {
        surface.material.uniforms.uMood.value.set(rgb.r ?? 1, rgb.g ?? 1, rgb.b ?? 1);
      }
    },
    react(type, payload) { fx?.react?.(type, payload); },
    dispose() {
      disposed = true;
      fx?.dispose?.();
      if (surface.material.isShaderMaterial) surface.material.uniforms.uShore.value?.dispose?.();
    },
    spawnShoreRipple(anchor, opts) { fx?.spawnShoreRipple?.(anchor, opts); },
    spawnFishShadow(anchor, opts) { fx?.spawnFishShadow?.(anchor, opts); },
    spawnBubble(anchor, opts) { fx?.spawnBubble?.(anchor, opts); },
    spawnSparkle(anchor, opts) { fx?.spawnSparkle?.(anchor, opts); },
  };
}
