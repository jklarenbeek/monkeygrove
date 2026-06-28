// Renderer, isometric ortho camera rig, lighting, picking.
import * as THREE from 'three';
import { TILE } from './config.js';
import { GFX, GFX_TUNING } from './gfx.js';
import { makeSky, SKY_HORIZON } from './sky.js';
import { setWind } from './voxel.js';
import { tween, ease } from './anim.js';
import { reducedMotion } from './a11y.js';

const ISO_DIR = new THREE.Vector3(1, 1.15, 1).normalize();
const CAM_DIST = 40;
const CAM_OFF = ISO_DIR.clone().multiplyScalar(CAM_DIST); // hot path: no per-frame clone

// Screen-space share of one ground-plane world unit under the iso camera
// (derived from ISO_DIR so the two stay in sync) — used to pick a span that
// keeps a whole w×d tile board on screen at any aspect.
const _fwd = ISO_DIR.clone().negate();
const _upScr = new THREE.Vector3(0, 1, 0).projectOnPlane(_fwd).normalize();
const ISO_PROJ_H = Math.abs(new THREE.Vector3().crossVectors(_fwd, _upScr).x); // ≈ 0.71
const ISO_PROJ_V = Math.abs(_upScr.x);                                          // ≈ 0.45

// Ground-plane directions that a screen-space drag maps to under the iso camera
// — screen +X (right) and screen +Y (up). Used to turn a finger pan into a
// look-at offset so the world tracks the fingers. Derived from ISO_DIR so they
// stay in sync with the camera angle.
const SCREEN_RIGHT_GROUND = new THREE.Vector3(-_fwd.z, 0, _fwd.x).normalize();
const SCREEN_UP_GROUND = new THREE.Vector3()
  .crossVectors(SCREEN_RIGHT_GROUND, _fwd)
  .setComponent(1, 0)
  .normalize();

// The four cardinal grid hops ([dx, dz]) and where each one travels on screen
// under the iso camera (screen x = right+, screen y = up+). The board is a
// 45°-rotated diamond, so its rows/columns run diagonally and every single-cell
// hop lands on a screen diagonal (≈±45°, ±135°) — there is no cell-to-cell move
// that goes dead-straight up/down/left/right. Derived from the same basis as the
// camera so they rotate with ISO_DIR instead of being hand-tuned magic numbers.
const GRID_STEP_SCREEN = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dz]) => [
  dx, dz,
  dx * SCREEN_RIGHT_GROUND.x + dz * SCREEN_RIGHT_GROUND.z, // screen x (right+)
  dx * SCREEN_UP_GROUND.x + dz * SCREEN_UP_GROUND.z,       // screen y (up+)
]);

// Resolve a screen-space direction (sx = toward the right edge, sy = toward the
// top edge) into the single grid hop whose on-screen travel points most nearly
// the same way. This is the screen-relative input map: a swipe up-left always
// steps up-left, a drag down-right always steps down-right. It is total and
// gap-free — every non-zero direction picks exactly one of the four hops and
// all four stay reachable, so there are no duplicate or dead buckets. A
// perfectly diagonal input (a dead-straight vertical/horizontal swipe, equally
// close to two hops) falls to a fixed first match, so it still resolves rather
// than stalling. Returns null only for a zero vector.
export function screenDirToGridStep(sx, sy) {
  if (sx === 0 && sy === 0) return null;
  let best = null, bestDot = -Infinity;
  for (const [dx, dz, gx, gy] of GRID_STEP_SCREEN) {
    const dot = gx * sx + gy * sy;
    if (dot > bestDot) { bestDot = dot; best = [dx, dz]; }
  }
  return best;
}

// User zoom range: 1 = the auto fit/follow framing; >1 zooms in. Below 1 just
// pulls back a touch for breathing room.
const ZOOM_MIN = 0.8;
const ZOOM_MAX = 4;

export class World {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, alpha: true, powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.shadows = GFX.shadows;
    if (this.shadows) {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    // Phase 1 atmosphere — ALL gated so low tier is byte-identical to before:
    // ACES filmic tone mapping gives the world gentle warmth; exposure is tuned
    // bright (cheerful storybook morning, never dusky). outputColorSpace stays the
    // three.js default sRGB. Off at low tier → today's flat-but-cheap linear look.
    this.toneMap = GFX.toneMap;
    if (this.toneMap) {
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = GFX_TUNING.exposure;
    }

    this.scene = new THREE.Scene();
    this.scene.background = null; // sky comes from the in-engine dome (toneMap on) or the CSS gradient (low)

    // In-engine gradient sky + gentle distance haze (medium/high only). The dome is
    // built once and shared; fog distances are derived from the framing each
    // projection update so the fully-framed board always stays crisp (no number,
    // stone, or number-line end is ever hazed — see _applyProjection).
    this.sky = null;
    this.fog = null;
    if (this.toneMap) {
      this.sky = makeSky();
      this.scene.add(this.sky);
    }
    if (GFX.fog) {
      this.fog = new THREE.Fog(SKY_HORIZON, 60, 160); // near/far retuned in _applyProjection
      this.scene.fog = this.fog;
    }

    this.camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 200);
    this.span = 14;                       // world units visible vertically-ish
    this.fitBoard = null;                 // when set: keep this {w,d} board fully in frame
    this.target = new THREE.Vector3();    // smoothed look-at
    this.goal = new THREE.Vector3();      // where target wants to be
    this.followObj = null;
    this.shakeAmp = 0;

    // user camera control, composited over the auto fit/follow base:
    //   zoom — multiplier on the framing span (1 = auto, >1 = closer)
    //   pan  — ground-plane offset added to the look-at (pinch/two-finger drag)
    // followMode decides whose position drives the look-at:
    //   'always' (hub) follows the player at any zoom; 'zoomed' (chamber) shows
    //   the whole board at min zoom and follows the player once zoomed in.
    this.zoom = 1;
    this.defaultZoom = 1;             // per-scene startup zoom (mobile starts closer)
    this.pan = new THREE.Vector3();
    this.panLimit = new THREE.Vector3(16, 0, 16);
    this.boardCenter = new THREE.Vector3();
    this.followMode = null;
    this.aspect = 1;

    // Light rig. Intensities flow through GFX_TUNING so the dev sliders (gfxdev.js)
    // dial the warm/cool/hemisphere balance in by eye. When tone mapping is on we
    // retune for a touch more warm/cool contrast and ground-bounce — but keep fill
    // strong so faces, props, and numbers never fall into deep shadow (bright &
    // friendly beats moody for young learners). At low tier GFX_TUNING holds today's
    // exact values, so the rig is byte-identical to before.
    if (this.toneMap) {
      GFX_TUNING.sunIntensity = 1.45;
      GFX_TUNING.fillIntensity = 0.36;
      GFX_TUNING.hemiIntensity = 1.05;
    }
    const hemi = new THREE.HemisphereLight(0xeaf6ff, 0xcdeac0, GFX_TUNING.hemiIntensity);
    this.hemi = hemi; // kept for the dev tuning panel (gfxdev.js)
    this.scene.add(hemi);
    this.sun = new THREE.DirectionalLight(0xfff2d8, GFX_TUNING.sunIntensity);
    this.sun.position.set(8, 14, 5);
    if (this.shadows) {
      this.sun.castShadow = true;
      const sz = GFX.shadowMapSize || 1024;
      this.sun.shadow.mapSize.set(sz, sz);
      // Finer texels (2048) need less depth bias to stay crisp without peter-panning;
      // 1024 keeps the original tuned value. Spot-check with the Phase 0 dev sliders.
      this.sun.shadow.bias = sz >= 2048 ? -0.0009 : -0.0015;
      this.sun.shadow.normalBias = 0.02;
    }
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);
    this.fill = new THREE.DirectionalLight(0xbfd8ff, GFX_TUNING.fillIntensity);
    this.fill.position.set(-6, 8, -4);
    this.scene.add(this.fill);

    this.raycaster = new THREE.Raycaster();
    this.pickables = []; // set by current place (floor meshes with .gridInfo)

    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.aspect = w / h;
    // fit-board mode (chambers): the whole diorama must stay visible on ANY
    // aspect — stones in the far corner can't hide off-screen, and number-line
    // magnitude estimation needs the full bridge in view
    if (this.fitBoard) {
      const diag = (this.fitBoard.w + this.fitBoard.d) * TILE;
      const horiz = diag * ISO_PROJ_H + 1.5;  // side margin
      const vert = diag * ISO_PROJ_V + 2.5;   // headroom for props & HUD banner
      this.span = Math.max(vert, horiz / this.aspect);
    }
    this._applyProjection();
  }

  // Rebuild the ortho frustum from span + aspect + user zoom. Split out from
  // resize() so a pinch can re-zoom without recomputing the fit.
  _applyProjection() {
    const aspect = this.aspect || 1;
    // Keep a minimum horizontal span so portrait phones still see the diorama.
    // In fit-board mode `this.span` already folds in the aspect (via horiz/aspect
    // above), so the guard must NOT divide by aspect again — doing so double-counts
    // it and zooms a chamber to a tiny speck on portrait screens.
    const baseVSpan = this.fitBoard ? this.span : Math.max(this.span, (this.span * 1.15) / aspect);
    this.baseVSpan = baseVSpan;
    const vSpan = baseVSpan / this.zoom;
    this.camera.top = vSpan / 2;
    this.camera.bottom = -vSpan / 2;
    this.camera.left = (-vSpan * aspect) / 2;
    this.camera.right = (vSpan * aspect) / 2;
    this.camera.updateProjectionMatrix();
    // Keep distance haze entirely behind the framed board. The whole board is always
    // fit into ~baseVSpan, so its view-depth spread is < baseVSpan; starting the fog
    // past CAM_DIST + baseVSpan guarantees no in-board prop, number, stone, or
    // number-line end is ever hazed — only the ocean/horizon beyond it softens.
    if (this.fog) {
      this.fog.near = CAM_DIST + baseVSpan * 1.1;
      this.fog.far = CAM_DIST + baseVSpan * 3.2;
    }
  }

  setSpan(span) {
    this.span = span;
    this.resize();
  }

  // ---------- user camera control (pinch-zoom / two-finger pan) ----------

  setZoom(z) {
    this.zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
    this._clampPan();           // zooming out shrinks how far you can pan
    this._applyProjection();
  }

  zoomBy(factor) { this.setZoom(this.zoom * factor); }

  // Pan the look-at by a finger drag (screen pixels), so the world tracks the
  // fingers. Converted to a ground-plane offset via the iso screen basis.
  panByPixels(dxPx, dyPx) {
    const wpp = (this.camera.top - this.camera.bottom) / (window.innerHeight || 1);
    this.pan.addScaledVector(SCREEN_RIGHT_GROUND, -dxPx * wpp);
    this.pan.addScaledVector(SCREEN_UP_GROUND, dyPx * wpp);
    this._clampPan();
  }

  // Allowed pan scales with zoom: none at min zoom (board centered), up to the
  // board half-extent when fully zoomed in — so you can never lose the island.
  _clampPan() {
    const f = Math.max(0, Math.min(1, (this.zoom - 1) / (ZOOM_MAX - 1)));
    const lx = this.panLimit.x * f, lz = this.panLimit.z * f;
    this.pan.x = Math.max(-lx, Math.min(lx, this.pan.x));
    this.pan.z = Math.max(-lz, Math.min(lz, this.pan.z));
  }

  resetCamera() {
    this.zoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, this.defaultZoom || 1));
    this.pan.set(0, 0, 0);
    this._applyProjection();
  }

  // Frame a static diorama (hub overview / chamber)
  lookAt(center, span) {
    this.fitBoard = null;
    this.followObj = null;
    this.followMode = null;
    this.boardCenter.copy(center);
    this.goal.copy(center);
    this.target.copy(center);
    if (span) this.span = span;
    this.resetCamera();
    this.resize();
    this._place();
  }

  follow(obj, span, bound) {
    this.fitBoard = null;
    this.followObj = obj;
    this.followMode = 'always';
    this.panLimit.set(bound?.x ?? 16, 0, bound?.z ?? 16);
    if (span) this.span = span;
    // snap to the followed object so the scene opens framed on it, rather than
    // gliding in from the previous scene's look-at (matches lookAt/frameBoard).
    this.target.copy(obj.position);
    this.goal.copy(obj.position);
    this.resetCamera();
    this.resize();
    this._place();
  }

  // Centered framing that keeps a whole w×d tile board on screen (re-fitted on
  // resize). When a followObj is given, the camera follows it once the player
  // zooms in past the fit, while min zoom keeps the whole board in view.
  frameBoard(center, w, d, followObj = null) {
    this.followObj = followObj;
    this.followMode = followObj ? 'zoomed' : null;
    this.fitBoard = { w, d };
    this.boardCenter.copy(center);
    this.panLimit.set(w * TILE * 0.5, 0, d * TILE * 0.5);
    // when the startup zoom already trails the player (mobile), open framed on
    // them; otherwise center the whole board (the default, full-puzzle view).
    const onPlayer = followObj && (this.defaultZoom || 1) > 1.05;
    const c = onPlayer ? followObj.position : center;
    this.goal.copy(c);
    this.target.copy(c);
    this.resetCamera();
    this.resize();
    this._place();
  }

  _place() {
    const off = CAM_OFF;
    let sx = 0, sz = 0;
    if (this.shakeAmp > 0.001) {
      sx = (Math.random() - 0.5) * this.shakeAmp;
      sz = (Math.random() - 0.5) * this.shakeAmp;
    }
    // look-at = smoothed target + user pan offset (+ shake)
    const lx = this.target.x + this.pan.x + sx;
    const ly = this.target.y;
    const lz = this.target.z + this.pan.z + sz;
    this.camera.position.set(lx + off.x, ly + off.y, lz + off.z);
    this.camera.lookAt(lx, ly, lz);
    // The shared skydome rides with the camera so it always surrounds the view.
    if (this.sky) this.sky.position.copy(this.camera.position);
    // Sun follows the action so the shadow camera stays tight.
    this.sun.position.set(lx + 8, ly + 14, lz + 5);
    this.sun.target.position.set(lx, ly, lz);
    if (this.sun.castShadow) {
      const s = (this.baseVSpan || this.span) * 0.9;
      const c = this.sun.shadow.camera;
      c.left = -s; c.right = s; c.top = s; c.bottom = -s;
      c.updateProjectionMatrix();
    }
  }

  shake(amount = 0.15) {
    if (reducedMotion()) return; // camera shake is the motion most worth skipping
    this.shakeAmp = Math.max(this.shakeAmp, amount);
  }

  // Short, eased orthographic "moment" (Phase 12): a gentle push-in/pull-back on a
  // non-gameplay beat (hub arrival, build complete…). Animates SPAN only — the camera
  // ANGLE (ISO_DIR) never changes, so screenDirToGridStep and picking stay valid and
  // no input lock is needed. 'minimal' tier and reducedMotion() play nothing (snap
  // only) → Low is identical to today. Never used during active chamber solving.
  cameraShot({ fromSpanMul = 1.25, span = null, duration = 900, ease: e = ease.outCubic, onDone = null } = {}) {
    if (GFX.cameraMoments === 'minimal' || reducedMotion()) { onDone?.(); return; }
    const target = span ?? this.span;
    const start = target * fromSpanMul;
    this._shotTween?.cancel?.();
    this._shotTween = tween({
      ms: duration, ease: e,
      onUpdate: (v, k) => { this.span = start + (target - start) * k; this._applyProjection(); },
      onDone: () => { this.span = target; this._applyProjection(); this._shotTween = null; onDone?.(); },
    });
  }

  update(dtMs) {
    // who the camera frames: the hub always trails the player; a chamber shows
    // the whole board until the player zooms in, then trails them too.
    if (this.followObj && (this.followMode === 'always' || this.zoom > 1.05)) {
      this.goal.copy(this.followObj.position);
    } else {
      this.goal.copy(this.boardCenter);
    }
    const k = 1 - Math.pow(0.0015, dtMs / 1000); // smooth exp follow
    this.target.lerp(this.goal, k);
    this.shakeAmp *= Math.pow(0.0005, dtMs / 1000);
    // GPU field wind (Phase 5): one uniform write per frame for the whole scatter
    // field. Fully static under reduced-motion or low tier (amp 0).
    const windAmp = (reducedMotion() || !GFX.ambientScale) ? 0 : 0.06 * GFX.ambientScale;
    setWind((this._windT = (this._windT || 0) + dtMs / 1000), windAmp);
    this._place();
    this.renderer.render(this.scene, this.camera);
  }

  // Returns the first pickable intersection ({point, object}) or null.
  pick(clientX, clientY) {
    if (!this.pickables.length) return null;
    const r = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - r.left) / r.width) * 2 - 1,
      -((clientY - r.top) / r.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    const hits = this.raycaster.intersectObjects(this.pickables, true);
    return hits[0] || null;
  }

}
