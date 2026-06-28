import { test } from 'vitest';
import assert from 'node:assert/strict';
import { windMaterial, voxelMaterial, setWind } from '../src/voxel.js';

test('windMaterial is a shared singleton, distinct from the base voxel material', () => {
  const a = windMaterial();
  const b = windMaterial();
  assert.strictEqual(a, b, 'singleton');
  assert.notStrictEqual(a, voxelMaterial(), 'the base material is left untouched');
  assert.ok(a.isMeshLambertMaterial);
  assert.equal(a.vertexColors, true);
  assert.equal(typeof a.onBeforeCompile, 'function');
});

test('the onBeforeCompile injection wires uTime/uWindAmp and a height-scaled sway', () => {
  const m = windMaterial();
  // simulate three.js compiling the material
  const shader = { uniforms: {}, vertexShader: 'void main(){\n#include <begin_vertex>\n}' };
  m.onBeforeCompile(shader);
  assert.ok(shader.uniforms.uTime && shader.uniforms.uWindAmp, 'wind uniforms are injected');
  assert.match(shader.vertexShader, /uniform float uWindAmp/, 'declares the amplitude uniform');
  assert.match(shader.vertexShader, /transformed\.x \+= sin\(uTime/, 'tops sway on uTime');
  assert.match(shader.vertexShader, /max\(transformed\.y, 0\.0\) \* uWindAmp/, 'sway scales by local height');
});

test('setWind drives the shared uniforms (one write per frame for the whole field)', () => {
  const m = windMaterial();
  const shader = { uniforms: {}, vertexShader: '#include <begin_vertex>' };
  m.onBeforeCompile(shader);
  setWind(2.5, 0.05);
  assert.equal(shader.uniforms.uTime.value, 2.5);
  assert.equal(shader.uniforms.uWindAmp.value, 0.05);
  setWind(0, 0); // reduced-motion / low → static
  assert.equal(shader.uniforms.uWindAmp.value, 0);
});
