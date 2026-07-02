// InputController — owns every raw input device and turns it into semantic
// intents the Game acts on. Keyboard (arrows/WASD hop, Space/Enter act, E hint),
// one-finger touch (tap to walk/act, swipe to step) and two-finger camera
// gestures (pinch zoom, drag pan), plus the mouse wheel. It reaches the Game
// through a small surface: the semantic handlers (inputStep via player,
// inputAction, inputHint, inputTapCell) plus world/place for picking and camera.
// The retained pinch/wheel zoom and the once-per-session gesture hint live here.
import * as hud from './hud.js';
import { t } from './i18n.js';
import { delay } from './anim.js';
import { TILE, IS_TOUCH, MOBILE_DEFAULT_ZOOM } from './config.js';
import { screenDirToGridStep } from './world.js';

export const JOYSTICK_RADIUS = 48;
export const JOYSTICK_DEAD_ZONE = 0.22;

const clamp01 = (n) => Math.max(0, Math.min(1, n));

export function joystickVectorFromPointer(origin, point, radius = JOYSTICK_RADIUS, deadZone = JOYSTICK_DEAD_ZONE) {
  if (!origin || !point || radius <= 0) return null;
  const dx = point.x - origin.x;
  const dy = point.y - origin.y;
  const dist = Math.hypot(dx, dy);
  const strength = clamp01(dist / radius);
  if (strength < deadZone || dist === 0) return null;
  const clamped = Math.min(dist, radius);
  return {
    x: Number((dx / dist * (clamped / radius)).toFixed(4)),
    y: Number((dy / dist * (clamped / radius)).toFixed(4)),
    strength: Number(strength.toFixed(4)),
  };
}

export function joystickStepFromVector(v) {
  if (!v) return null;
  return screenDirToGridStep(v.x, -v.y);
}

export function joystickRepeatMs(strength) {
  const s = clamp01(strength || 0);
  return Math.round(260 - s * 95);
}

export function isJoystickZone(x, y, width = window.innerWidth || 1, height = window.innerHeight || 1) {
  return x <= Math.min(360, width * 0.46) && y >= height - Math.min(260, height * 0.46);
}

export function shouldOrbitDrag({ startX, dx, dy, pointerType = 'touch', width = window.innerWidth || 1 } = {}) {
  const dist = Math.hypot(dx || 0, dy || 0);
  if (pointerType === 'mouse') return dist > 8;
  return startX > width * 0.62 && dist > 18;
}

export function softVibrate(ms = 10) {
  try { navigator.vibrate?.(ms); } catch { /* unsupported or denied: harmless */ }
}

export class InputController {
  constructor(game) {
    this.game = game;
    this.canvas = game.canvas;
    this.userZoom = null;        // player's retained pinch/wheel zoom (null = comfort default)
    this.gestureHintDone = false; // pinch/pan hint shows at most once per session
    this.joystick = { active: false, pointerId: null, origin: null, vector: null };
  }

  bind() {
    this._bindKeyboard();
    this._bindPointerControls();
    this._bindWheel();
  }

  _bindKeyboard() {
    window.addEventListener('keydown', (e) => this._onKeyDown(e));
  }

  _onKeyDown(e) {
    const game = this.game;
    if (game.mode === 'title' || document.querySelector('#screens .screen')) return;
    const code = e.code;
    // an open dialogue eats the confirm key first, Zelda-style
    if ((code === 'Space' || code === 'Enter') && hud.advanceBubble()) {
      e.preventDefault();
      return;
    }
    if (game.verb?.onKey?.(code)) { e.preventDefault(); return; }
    // Screen-relative movement on the iso diamond. The board's rows/columns
    // run at 45°, so every single-cell hop travels on a screen diagonal.
    const dirs = {
      ArrowUp: [0, -1], KeyW: [0, -1],     // top of screen  (up-right hop)
      ArrowDown: [0, 1], KeyS: [0, 1],     // bottom         (down-left hop)
      ArrowLeft: [-1, 0], KeyA: [-1, 0],   // left edge       (up-left hop)
      ArrowRight: [1, 0], KeyD: [1, 0],    // right edge      (down-right hop)
    };
    if (dirs[code]) {
      e.preventDefault();
      game.player?.tryStep(dirs[code][0], dirs[code][1]);
    } else if (code === 'Space' || code === 'Enter') {
      e.preventDefault();
      game.inputAction();
    } else if (code === 'KeyE') {
      game.inputHint();
    }
  }

  _bindPointerControls() {
    // One finger drives the game (tap to walk/act, short swipe to step); two
    // fingers drive the camera (pinch to zoom, drag to pan). A two-finger
    // gesture suppresses the one-finger tap that would otherwise fire on lift.
    const state = {
      pointers: new Map(), // active pointers: id -> {x, y}
      downPos: null,
      dragging: false,
      gestured: false,
      orbitDrag: null,    // { pointerId, x, y } while one-finger orbiting
      pinch: null,        // { dist, zoom, cx, cy } during 2 fingers
    };
    this.canvas.addEventListener('pointerdown', (e) => this._onPointerDown(e, state));
    this.canvas.addEventListener('pointermove', (e) => this._onPointerMove(e, state));
    const endPointer = (e) => this._onPointerEnd(e, state);
    this.canvas.addEventListener('pointerup', endPointer);
    this.canvas.addEventListener('pointercancel', endPointer);
  }

  _pointerCentroid(state) {
    let x = 0, y = 0;
    for (const p of state.pointers.values()) { x += p.x; y += p.y; }
    const n = state.pointers.size || 1;
    return { x: x / n, y: y / n };
  }

  _pointerSpread(state) {
    const pts = [...state.pointers.values()];
    return pts.length < 2 ? 0 : Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
  }

  _startJoystick(e) {
    this.joystick = {
      active: true,
      pointerId: e.pointerId,
      origin: { x: e.clientX, y: e.clientY },
      vector: null,
    };
    hud.setJoystickActive(true);
    hud.setJoystickVector(0, 0);
    try { this.canvas.setPointerCapture?.(e.pointerId); } catch { /* synthetic/ended pointer: ignore */ }
    e.preventDefault();
  }

  _moveJoystick(e) {
    const v = joystickVectorFromPointer(this.joystick.origin, { x: e.clientX, y: e.clientY });
    this.joystick.vector = v;
    hud.setJoystickVector(v?.x || 0, v?.y || 0);
    const step = joystickStepFromVector(v);
    if (step) {
      const key = `${step[0]},${step[1]}`;
      if (this.joystick.lastStepKey !== key) softVibrate(12);
      this.joystick.lastStepKey = key;
      this.game.player?.setMoveIntent(step[0], step[1], v.strength);
    } else {
      this.joystick.lastStepKey = null;
      this.game.player?.clearMoveIntent();
    }
    e.preventDefault();
  }

  _endJoystick(e) {
    this.joystick = { active: false, pointerId: null, origin: null, vector: null };
    this.game.player?.clearMoveIntent();
    hud.setJoystickActive(false);
    hud.setJoystickVector(0, 0);
    e.preventDefault();
  }

  _onPointerDown(e, state) {
    const game = this.game;
    if (game.mode !== 'title' && e.pointerType !== 'mouse' && isJoystickZone(e.clientX, e.clientY)) {
      this._startJoystick(e);
      return;
    }
    state.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (state.pointers.size === 1) {
      state.downPos = { x: e.clientX, y: e.clientY };
      state.dragging = false; state.gestured = false;
      state.orbitDrag = null;
      if (game.mode !== 'title' && !document.querySelector('#screens .screen')) {
        const cell = this.pickCell(e.clientX, e.clientY);
        if (cell) game.previewTapCell?.(cell);
      }
    } else if (state.pointers.size === 2) {
      const c = this._pointerCentroid(state);
      state.pinch = { dist: this._pointerSpread(state) || 1, zoom: game.world.zoom, cx: c.x, cy: c.y };
      state.gestured = true;
      state.orbitDrag = null;
    }
  }

  _onPointerMove(e, state) {
    if (this.joystick.active && this.joystick.pointerId === e.pointerId) {
      this._moveJoystick(e);
      return;
    }
    if (!state.pointers.has(e.pointerId)) return;
    state.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.game.mode === 'title') return;
    if (state.pointers.size >= 2 && state.pinch) {
      this._movePinchCamera(state);
    } else if (state.pointers.size === 1 && state.downPos) {
      this._moveSinglePointerCamera(e, state);
    }
  }

  _movePinchCamera(state) {
    const d = this._pointerSpread(state);
    if (d > 0) this.game.world.setZoom(state.pinch.zoom * (d / state.pinch.dist));
    const c = this._pointerCentroid(state);
    this.game.world.panByPixels(c.x - state.pinch.cx, c.y - state.pinch.cy);
    state.pinch.cx = c.x; state.pinch.cy = c.y;
    this.userZoom = this.game.world.zoom; // remember the level they settled on
  }

  _moveSinglePointerCamera(e, state) {
    const dx = e.clientX - state.downPos.x, dy = e.clientY - state.downPos.y;
    if (shouldOrbitDrag({ startX: state.downPos.x, dx, dy, pointerType: e.pointerType, width: window.innerWidth || 1 })) {
      state.dragging = true;
      state.gestured = true;
      if (!state.orbitDrag) state.orbitDrag = { pointerId: e.pointerId, x: state.downPos.x, y: state.downPos.y };
      this.game.world.orbitByPixels(e.clientX - state.orbitDrag.x);
      state.orbitDrag.x = e.clientX;
      state.orbitDrag.y = e.clientY;
    } else if (Math.hypot(dx, dy) > 14) state.dragging = true;
  }

  _onPointerEnd(e, state) {
    if (this.joystick.active && this.joystick.pointerId === e.pointerId) {
      this._endJoystick(e);
      return;
    }
    const start = state.downPos;
    const had = state.pointers.delete(e.pointerId);
    if (state.pointers.size < 2) state.pinch = null;
    if (state.pointers.size > 0) return;   // wait until every finger is up
    state.downPos = null;
    state.orbitDrag = null;
    const wasDrag = state.dragging, wasGesture = state.gestured;
    state.dragging = false; state.gestured = false;
    if (!had || this.game.mode === 'title' || wasGesture) return;
    if (!wasDrag) {
      const cell = this.pickCell(e.clientX, e.clientY);
      if (!cell) return;
      this.game.previewTapCell?.(cell);
      this.game.inputTapCell(cell);
    } else {
      this._finishSwipe(e, start);
    }
  }

  _finishSwipe(e, start) {
    const dx = e.clientX - (start?.x ?? e.clientX), dy = e.clientY - (start?.y ?? e.clientY);
    if (Math.hypot(dx, dy) <= 30) return;
    // Swipe = one step, screen-relative, using the same iso resolver as the
    // joystick so touch movement feels like one language.
    const d = screenDirToGridStep(dx, -dy);
    if (d) this.game.player?.tryStep(d[0], d[1]);
  }

  _bindWheel() {
    this.canvas.addEventListener('wheel', (e) => {
      if (this.game.mode === 'title') return;
      e.preventDefault();
      this.game.world.zoomBy(e.deltaY < 0 ? 1.1 : 1 / 1.1);
      this.userZoom = this.game.world.zoom; // remember the level they settled on
    }, { passive: false });
  }

  update(dtMs) {
    this.game.player?.updateMoveIntent?.(dtMs);
  }

  // One-time nudge so touch players discover the camera gestures.
  maybeGestureHint() {
    if (!IS_TOUCH || this.gestureHintDone) return;
    this.gestureHintDone = true;   // once per session, even if storage is unavailable
    try {
      if (localStorage.getItem('monkeygrove.gestureHint')) return; // shown on a past visit
      localStorage.setItem('monkeygrove.gestureHint', '1');
    } catch { /* private mode: the session flag above still holds it to one toast */ }
    delay(900, () => hud.toast(t('hint.controls')));
  }

  // Startup zoom for the next scene. Portrait phones open closer in (the full
  // fit sits too far back); desktop, landscape, and the number line keep 1 so
  // the whole board / both ends stay visible. Pinch overrides at any time.
  mobileZoom(kind) {
    const portrait = (window.innerHeight || 1) / (window.innerWidth || 1) > 1.35;
    if (!IS_TOUCH || !portrait) return 1;
    if (kind === 'hub') return MOBILE_DEFAULT_ZOOM.hub;
    if (kind === 'numberline') return 1;
    return MOBILE_DEFAULT_ZOOM.chamber;
  }

  // Default zoom for the next gameplay scene: once the player has pinched/wheeled
  // to a level they like, keep it across hub and chambers (including the number
  // line — overriding a retained zoom each time read as a bug). Until they set
  // one, fall back to the per-device comfort default, which is fit (1) for the
  // number line so both ends show for magnitude estimation. The title is not
  // routed through here — it stays pinned to its full-island framing.
  sceneZoom(kind) {
    return this.userZoom ?? this.mobileZoom(kind);
  }

  pickCell(cx, cy) {
    const direct = this._pickCellAt(cx, cy);
    if (direct) return direct;
    // Fat-finger fallback: sample a small ring around the touch point before
    // giving up. This keeps picking forgiving without changing the world.
    for (const r of [14, 24, 34]) {
      for (let i = 0; i < 8; i++) {
        const a = (Math.PI * 2 * i) / 8;
        const cell = this._pickCellAt(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        if (cell) return cell;
      }
    }
    return null;
  }

  _pickCellAt(cx, cy) {
    const place = this.game.place;
    if (!place) return null;
    const hit = this.game.world.pick(cx, cy);
    if (!hit) return null;
    const gridList = hit.object?.userData?.gridList;
    if (gridList && hit.instanceId !== undefined) {
      const it = gridList[hit.instanceId];
      if (it) return { x: it.x, z: it.z };
    }
    if (hit.object === place?.floor && hit.instanceId !== undefined) {
      const it = place.floorList[hit.instanceId];
      if (it) return { x: it.x, z: it.z };
    }
    // fall back: derive from point
    const p = hit.point;
    const x = Math.floor(p.x / TILE + place.size.w / 2);
    const z = Math.floor(p.z / TILE + place.size.d / 2);
    if (place.cellAt(x, z)) return { x, z };
    return null;
  }
}
