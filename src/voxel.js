// Voxel model builder: turns ASCII-layer model definitions into a single merged
// BufferGeometry with vertex colors and baked ambient occlusion. One material for
// every voxel mesh in the game keeps draw state tiny.
//
// Model format (see models.js):
// {
//   palette: { 'b': '#8a5a2b', ... },     // char -> css hex color
//   layers: [                             // bottom-up (y), each layer z-rows of x-chars
//     ['bbb',
//      'b.b'],
//   ...]
// }
// '.' and ' ' are empty.

import * as THREE from 'three';

const FACES = [
  { // +X
    dir: [1, 0, 0],
    corners: [[1, 1, 1], [1, 0, 1], [1, 1, 0], [1, 0, 0]],
  },
  { // -X
    dir: [-1, 0, 0],
    corners: [[0, 1, 0], [0, 0, 0], [0, 1, 1], [0, 0, 1]],
  },
  { // +Y (top)
    dir: [0, 1, 0],
    corners: [[0, 1, 1], [1, 1, 1], [0, 1, 0], [1, 1, 0]],
  },
  { // -Y (bottom)
    dir: [0, -1, 0],
    corners: [[0, 0, 0], [1, 0, 0], [0, 0, 1], [1, 0, 1]],
  },
  { // +Z
    dir: [0, 0, 1],
    corners: [[0, 1, 1], [0, 0, 1], [1, 1, 1], [1, 0, 1]],
  },
  { // -Z
    dir: [0, 0, -1],
    corners: [[1, 1, 0], [1, 0, 0], [0, 1, 0], [0, 0, 0]],
  },
];

const AO_LEVELS = [1.0, 0.8, 0.64, 0.5];

function key(x, y, z) { return x + '|' + y + '|' + z; }

export function parseModel(model) {
  const voxels = new Map(); // key -> THREE.Color
  const colorCache = {};
  const palette = model.palette;
  let maxX = 0, maxZ = 0;
  model.layers.forEach((layer, y) => {
    layer.forEach((row, z) => {
      for (let x = 0; x < row.length; x++) {
        const c = row[x];
        if (c === '.' || c === ' ') continue;
        if (!colorCache[c]) {
          const hex = palette[c];
          if (!hex) continue;
          colorCache[c] = new THREE.Color(hex);
        }
        voxels.set(key(x, y, z), colorCache[c]);
        if (x > maxX) maxX = x;
        if (z > maxZ) maxZ = z;
      }
    });
  });
  return { voxels, sizeX: maxX + 1, sizeY: model.layers.length, sizeZ: maxZ + 1 };
}

// Standard voxel AO: for a face vertex, occlusion from the two edge-adjacent
// neighbors and the corner neighbor one step along the face normal.
function vertexAO(voxels, x, y, z, corner, dir) {
  const base = [x + dir[0], y + dir[1], z + dir[2]];
  // Map corner (0/1 per axis) to offsets in the face plane (-1 or +1), 0 on normal axis.
  const off = [corner[0] === 1 ? 1 : -1, corner[1] === 1 ? 1 : -1, corner[2] === 1 ? 1 : -1];
  const axes = [0, 1, 2].filter((a) => dir[a] === 0); // the two in-plane axes
  const s1 = [...base]; s1[axes[0]] += off[axes[0]];
  const s2 = [...base]; s2[axes[1]] += off[axes[1]];
  const co = [...base]; co[axes[0]] += off[axes[0]]; co[axes[1]] += off[axes[1]];
  const occ1 = voxels.has(key(s1[0], s1[1], s1[2])) ? 1 : 0;
  const occ2 = voxels.has(key(s2[0], s2[1], s2[2])) ? 1 : 0;
  if (occ1 && occ2) return 3;
  const occC = voxels.has(key(co[0], co[1], co[2])) ? 1 : 0;
  return occ1 + occ2 + occC;
}

export function buildVoxelGeometry(model, opts = {}) {
  const { voxelSize = 1, centerXZ = true, ao = true } = opts;
  const { voxels, sizeX, sizeZ } = parseModel(model);

  const positions = [], normals = [], colors = [], indices = [];
  let vi = 0;
  const ox = centerXZ ? -sizeX / 2 : 0;
  const oz = centerXZ ? -sizeZ / 2 : 0;

  for (const [k, color] of voxels) {
    const [x, y, z] = k.split('|').map(Number);
    for (const face of FACES) {
      const [dx, dy, dz] = face.dir;
      if (voxels.has(key(x + dx, y + dy, z + dz))) continue; // interior face

      const aos = [];
      for (const corner of face.corners) {
        positions.push(
          (x + corner[0] + ox) * voxelSize,
          (y + corner[1]) * voxelSize,
          (z + corner[2] + oz) * voxelSize,
        );
        normals.push(dx, dy, dz);
        const a = ao ? vertexAO(voxels, x, y, z, corner, face.dir) : 0;
        aos.push(a);
        const m = AO_LEVELS[a];
        colors.push(color.r * m, color.g * m, color.b * m);
      }
      // Flip triangulation when needed so AO interpolates without artifacts.
      if (aos[0] + aos[3] > aos[1] + aos[2]) {
        indices.push(vi + 1, vi + 3, vi + 0, vi + 3, vi + 2, vi + 0);
      } else {
        indices.push(vi + 0, vi + 1, vi + 2, vi + 1, vi + 3, vi + 2);
      }
      vi += 4;
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeBoundingSphere();
  return geo;
}

let sharedMaterial = null;
export function voxelMaterial() {
  if (!sharedMaterial) {
    sharedMaterial = new THREE.MeshLambertMaterial({ vertexColors: true });
  }
  return sharedMaterial;
}

// GPU field wind. A variant of the voxel material whose vertex shader nudges
// each vertex horizontally by an amount scaled by its LOCAL height — so blade tops sway
// while bases stay planted — driven by a single shared `uTime` uniform (one write per
// frame for the whole instanced field, no per-instance CPU state). Per-instance phase
// comes from the instance translation so neighbouring blades don't sway in lockstep.
// Amplitude `uWindAmp` is set to 0 under reduced-motion / low tier → a perfectly still
// field. Isolated here so the base material everything else uses stays untouched, and
// so the onBeforeCompile injection is easy to audit across three.js upgrades.
const windUniforms = { uTime: { value: 0 }, uWindAmp: { value: 0 } };
let windMat = null;
export function windMaterial() {
  if (windMat) return windMat;
  windMat = new THREE.MeshLambertMaterial({ vertexColors: true });
  windMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = windUniforms.uTime;
    shader.uniforms.uWindAmp = windUniforms.uWindAmp;
    shader.vertexShader = 'uniform float uTime;\nuniform float uWindAmp;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      [
        '#include <begin_vertex>',
        '#ifdef USE_INSTANCING',
        '  float wphase = instanceMatrix[3][0] * 0.7 + instanceMatrix[3][2] * 0.9;',
        '#else',
        '  float wphase = 0.0;',
        '#endif',
        '  float wsway = max(transformed.y, 0.0) * uWindAmp;',
        '  transformed.x += sin(uTime * 1.6 + wphase) * wsway;',
        '  transformed.z += cos(uTime * 1.2 + wphase) * wsway * 0.6;',
      ].join('\n'),
    );
  };
  windMat._cached = true; // shared singleton — never disposed with a place
  return windMat;
}

// One write per frame drives the whole field. amp 0 → fully static (reduced-motion/low).
export function setWind(timeSec, amp) {
  windUniforms.uTime.value = timeSec;
  windUniforms.uWindAmp.value = amp;
}

const geoCache = new Map();

// cacheKey: pass a stable string to reuse geometry across instances (e.g. 'crab').
// Models with palette overrides (skins) should include the override in the key.
export function buildVoxelMesh(model, opts = {}) {
  let geo;
  if (opts.cacheKey && geoCache.has(opts.cacheKey)) {
    geo = geoCache.get(opts.cacheKey);
  } else {
    geo = buildVoxelGeometry(model, opts);
    if (opts.cacheKey) {
      geo._cached = true; // shared across places — never dispose with a scene
      geoCache.set(opts.cacheKey, geo);
    }
  }
  const mesh = new THREE.Mesh(geo, voxelMaterial());
  mesh.castShadow = opts.castShadow !== false;
  mesh.receiveShadow = opts.receiveShadow === true;
  return mesh;
}

// Apply a palette override (e.g. monkey fur skins) producing a new model object.
export function withPalette(model, overrides) {
  return { palette: { ...model.palette, ...overrides }, layers: model.layers };
}
