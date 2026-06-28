// Selective bloom + depth-of-field post-processing (High tier only).
//
// HIGH TIER ONLY, and built ENTIRELY from three.js's own bundled addons
// (`three/examples/jsm/postprocessing/*`) — NO extra npm dependency. Everything here
// is `await import()`-ed inside `createComposer()` so the EffectComposer / bloom /
// bokeh code lands in its OWN lazy chunk and NEVER enters the first-load `index`
// bundle (guarded by scripts/check-budget.mjs, mirroring the business-* chunk rule).
// Low/Medium keep the plain `renderer.render()` path — this module is never imported
// there.
//
// DESIGN — why "additive halo over a direct render" instead of the textbook
// full-screen composer:
//   The scene is sprite-heavy and, crucially, every floating LABEL is a Sprite. The
//   canonical "darken every non-bloom Mesh" selective-bloom trick leaves Sprites
//   untouched, so it would bloom the number/prompt labels — exactly the child-safety
//   line we must never cross. So bloom selection is done by LAYER instead: only
//   objects tagged onto BLOOM_LAYER render into the bloom buffer.
//   And the MAIN scene is rendered DIRECTLY to the canvas, byte-for-byte as today
//   (same tone mapping, same colors); the bloom buffer is then blended ON TOP with an
//   additive full-screen quad (autoClear off). That guarantees bloom can only ADD a
//   soft halo around magic — it can never wash out, darken, or recolor the scene, and
//   there is zero double-tone-mapping risk on the default path.
//
//   Depth-of-field (Phase 10, opt-in, perspective-hub + High only) is the one path
//   that must process the main image, so it routes the main render through a small
//   EffectComposer [RenderPass → BokehPass → OutputPass]; the additive bloom halo is
//   then composited identically on top. DoF is never used in chambers.
//
// CHILD-SAFETY: bloom is a gentle halo, never glare; DOM UI and text labels are never
// on the bloom layer; pulsing of the underlying glows is already reduced-motion gated
// in glow.js, so static bloom stays calm for sensitive children.
import * as THREE from 'three';
// BLOOM_LAYER + tagBloom() live in glow.js (always-loaded, dependency-free) so scene
// code can tag glow objects without importing this heavy lazy chunk. We only need the
// layer index on the render side here.
import { BLOOM_LAYER } from './glow.js';

// Default bloom look — a GENTLE accent, never flashy. `threshold` is high on purpose:
// only the brightest magic cores bloom, so dim props/decor (and the rest of the scene)
// keep their crisp voxel shapes instead of washing out. `amount` is the master dial:
// it is the opacity of the additive composite quad, so it scales the ENTIRE bloom
// contribution (core + halo) from 0 (off) up — this is what the dev "bloom" slider
// drives, and why moving it now visibly works across its whole range.
const BLOOM_DEFAULTS = { strength: 0.55, radius: 0.35, threshold: 0.55 };
const BLOOM_AMOUNT = 0.3; // master add at GFX_TUNING.bloomIntensity = 1 (calm by default)
const DOF_DEFAULTS = { focus: 40.0, aperture: 0.00018, maxblur: 0.006 };
const clamp01 = (v) => Math.max(0, Math.min(1, v));

// Build the lazy composer. Returns null only on import failure (caller falls back to
// direct render). Otherwise returns a small handle:
//   { render(scene, camera, { dof }), setSize(w,h), setBloom({strength,radius,...}),
//     setDofParams({...}), dispose() }
export async function createComposer(renderer, { width, height, halfRes = true, bloom = BLOOM_DEFAULTS, amount = BLOOM_AMOUNT } = {}) {
  let EffectComposer, RenderPass, UnrealBloomPass, BokehPass, OutputPass;
  try {
    ([{ EffectComposer }, { RenderPass }, { UnrealBloomPass }, { BokehPass }, { OutputPass }] = await Promise.all([
      import('three/examples/jsm/postprocessing/EffectComposer.js'),
      import('three/examples/jsm/postprocessing/RenderPass.js'),
      import('three/examples/jsm/postprocessing/UnrealBloomPass.js'),
      import('three/examples/jsm/postprocessing/BokehPass.js'),
      import('three/examples/jsm/postprocessing/OutputPass.js'),
    ]));
  } catch {
    return null; // never break rendering if the chunk fails to load
  }

  // Construction needs a live WebGL context (render targets, materials). Wrap it so a
  // missing/failed GL context degrades to the plain direct render rather than throwing
  // — this is also what lets the unit tests probe createComposer without a real canvas.
  try {
  const w = Math.max(2, width | 0), h = Math.max(2, height | 0);
  // Bloom buffer runs at half resolution on `halfRes` (the High default) — bloom is a
  // soft blur, so half-res is visually free and a big fill-rate win on mobile-High.
  const bw = halfRes ? Math.max(2, Math.round(w / 2)) : w;
  const bh = halfRes ? Math.max(2, Math.round(h / 2)) : h;

  // --- Bloom buffer: renders ONLY the bloom layer, blooms it, keeps the result. ---
  const bloomComposer = new EffectComposer(renderer);
  bloomComposer.renderToScreen = false;
  bloomComposer.setSize(bw, bh);
  // RenderPass clears the bloom buffer to solid black so untagged geometry (which the
  // camera-layer mask already culls) contributes nothing and the halo is pure.
  const bloomRender = new RenderPass(new THREE.Scene(), new THREE.Camera());
  bloomRender.clear = true;
  bloomRender.clearColor = new THREE.Color(0x000000);
  bloomRender.clearAlpha = 1;
  bloomComposer.addPass(bloomRender);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(bw, bh), bloom.strength, bloom.radius, bloom.threshold,
  );
  bloomComposer.addPass(bloomPass);

  // --- Additive composite quad: draws the bloom texture over the canvas, no clear. ---
  const quadScene = new THREE.Scene();
  const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  // `opacity` is the master bloom amount: with additive blending the halo's screen
  // contribution scales linearly with it, so amount=0 means literally no bloom and the
  // canvas is the untouched direct render. The bright glow sprites already live in that
  // direct render, so keeping `amount` modest also stops the composite from re-adding
  // them at full strength (the old blowout that buried every shape).
  const quadMat = new THREE.MeshBasicMaterial({
    map: bloomComposer.renderTarget2.texture,
    blending: THREE.AdditiveBlending, transparent: true,
    opacity: clamp01(amount),
    depthTest: false, depthWrite: false,
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), quadMat);
  quad.frustumCulled = false;
  quadScene.add(quad);

  // --- DoF path (lazy-built on first use): main scene → bokeh → output, to screen. ---
  let dofComposer = null, dofRender = null, bokeh = null, output = null;
  let dofParams = { ...DOF_DEFAULTS };
  function ensureDof(scene, camera) {
    if (dofComposer) { dofRender.scene = scene; dofRender.camera = camera; bokeh.camera = camera; return; }
    dofComposer = new EffectComposer(renderer);
    dofComposer.setSize(w, h);
    dofRender = new RenderPass(scene, camera);
    bokeh = new BokehPass(scene, camera, {
      focus: dofParams.focus, aperture: dofParams.aperture, maxblur: dofParams.maxblur,
    });
    output = new OutputPass();
    dofComposer.addPass(dofRender);
    dofComposer.addPass(bokeh);
    dofComposer.addPass(output);
  }

  const _layers = new THREE.Layers();

  function renderBloom(scene, camera) {
    // Point the bloom RenderPass at the live scene/camera, then mask the camera to the
    // bloom layer for exactly this pass so only tagged objects draw.
    bloomRender.scene = scene;
    bloomRender.camera = camera;
    _layers.mask = camera.layers.mask;          // save
    camera.layers.set(BLOOM_LAYER);             // bloom-only
    bloomComposer.render();
    camera.layers.mask = _layers.mask;          // restore
  }

  function composite() {
    const auto = renderer.autoClear;
    renderer.autoClear = false;                 // keep the main image on the canvas
    renderer.setRenderTarget(null);
    renderer.render(quadScene, quadCam);        // ADD the bloom halo on top
    renderer.autoClear = auto;
  }

  return {
    // The one entry point world.js calls instead of renderer.render().
    render(scene, camera, { dof = false } = {}) {
      if (dof) {
        ensureDof(scene, camera);
        dofComposer.render();                   // DoF'd main image → screen
      } else {
        renderer.setRenderTarget(null);
        renderer.render(scene, camera);         // plain main image → screen (== today)
      }
      renderBloom(scene, camera);
      composite();
    },
    setSize(nw, nh) {
      const W = Math.max(2, nw | 0), H = Math.max(2, nh | 0);
      const BW = halfRes ? Math.max(2, Math.round(W / 2)) : W;
      const BH = halfRes ? Math.max(2, Math.round(H / 2)) : H;
      bloomComposer.setSize(BW, BH);
      bloomPass.setSize(BW, BH);
      dofComposer?.setSize(W, H);
    },
    setBloom({ amount, strength, radius, threshold } = {}) {
      if (amount != null) quadMat.opacity = clamp01(amount); // master dial (0 = off)
      if (strength != null) bloomPass.strength = strength;
      if (radius != null) bloomPass.radius = radius;
      if (threshold != null) bloomPass.threshold = threshold;
    },
    setDofParams(p = {}) {
      dofParams = { ...dofParams, ...p };
      if (bokeh?.uniforms) {
        if (p.focus != null) bokeh.uniforms.focus.value = p.focus;
        if (p.aperture != null) bokeh.uniforms.aperture.value = p.aperture;
        if (p.maxblur != null) bokeh.uniforms.maxblur.value = p.maxblur;
      }
    },
    dispose() {
      bloomComposer.dispose();
      bloomPass.dispose?.();
      dofComposer?.dispose();
      bokeh?.dispose?.();
      quadMat.dispose();
      quad.geometry.dispose();
    },
  };
  } catch {
    return null; // no GL context → caller keeps the direct render path
  }
}
