// Renderer, isometric ortho camera rig, lighting, picking.
import * as THREE from 'three';
import { QUALITY, TILE } from './config.js';

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

export class World {
  constructor(canvas) {
    this.renderer = new THREE.WebGLRenderer({
      canvas, antialias: true, alpha: true, powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.shadows = QUALITY === 'high';
    if (this.shadows) {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    this.scene = new THREE.Scene();
    this.scene.background = null; // CSS sky gradient shows through

    this.camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 200);
    this.span = 14;                       // world units visible vertically-ish
    this.fitBoard = null;                 // when set: keep this {w,d} board fully in frame
    this.target = new THREE.Vector3();    // smoothed look-at
    this.goal = new THREE.Vector3();      // where target wants to be
    this.followObj = null;
    this.shakeAmp = 0;

    const hemi = new THREE.HemisphereLight(0xeaf6ff, 0xcdeac0, 0.95);
    this.scene.add(hemi);
    this.sun = new THREE.DirectionalLight(0xfff2d8, 1.25);
    this.sun.position.set(8, 14, 5);
    if (this.shadows) {
      this.sun.castShadow = true;
      this.sun.shadow.mapSize.set(1024, 1024);
      this.sun.shadow.bias = -0.0015;
      this.sun.shadow.normalBias = 0.02;
    }
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);
    this.fill = new THREE.DirectionalLight(0xbfd8ff, 0.25);
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
    const aspect = w / h;
    // fit-board mode (chambers): the whole diorama must stay visible on ANY
    // aspect — stones in the far corner can't hide off-screen, and number-line
    // magnitude estimation needs the full bridge in view
    if (this.fitBoard) {
      const diag = (this.fitBoard.w + this.fitBoard.d) * TILE;
      const horiz = diag * ISO_PROJ_H + 1.5;  // side margin
      const vert = diag * ISO_PROJ_V + 2.5;   // headroom for props & HUD banner
      this.span = Math.max(vert, horiz / aspect);
    }
    // Keep a minimum horizontal span so portrait phones still see the diorama.
    const vSpan = Math.max(this.span, (this.span * 1.15) / aspect);
    this.camera.top = vSpan / 2;
    this.camera.bottom = -vSpan / 2;
    this.camera.left = (-vSpan * aspect) / 2;
    this.camera.right = (vSpan * aspect) / 2;
    this.camera.updateProjectionMatrix();
  }

  setSpan(span) {
    this.span = span;
    this.resize();
  }

  // Frame a static diorama (hub overview / chamber)
  lookAt(center, span) {
    this.fitBoard = null;
    if (span) this.setSpan(span);
    this.goal.copy(center);
    this.target.copy(center);
    this.followObj = null;
    this._place();
  }

  follow(obj, span) {
    this.fitBoard = null;
    if (span) this.setSpan(span);
    this.followObj = obj;
  }

  // Static, centered framing that keeps a whole w×d tile board on screen,
  // re-fitted automatically on window resize.
  frameBoard(center, w, d) {
    this.followObj = null;
    this.fitBoard = { w, d };
    this.goal.copy(center);
    this.target.copy(center);
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
    this.camera.position.set(this.target.x + off.x + sx, this.target.y + off.y, this.target.z + off.z + sz);
    this.camera.lookAt(this.target.x + sx, this.target.y, this.target.z + sz);
    // Sun follows the action so the shadow camera stays tight.
    this.sun.position.set(this.target.x + 8, this.target.y + 14, this.target.z + 5);
    this.sun.target.position.copy(this.target);
    if (this.sun.castShadow) {
      const s = this.span * 0.9;
      const c = this.sun.shadow.camera;
      c.left = -s; c.right = s; c.top = s; c.bottom = -s;
      c.updateProjectionMatrix();
    }
  }

  shake(amount = 0.15) { this.shakeAmp = Math.max(this.shakeAmp, amount); }

  update(dtMs) {
    if (this.followObj) {
      this.goal.copy(this.followObj.position);
    }
    const k = 1 - Math.pow(0.0015, dtMs / 1000); // smooth exp follow
    this.target.lerp(this.goal, k);
    this.shakeAmp *= Math.pow(0.0005, dtMs / 1000);
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
