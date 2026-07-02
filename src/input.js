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
    const game = this.game;
    window.addEventListener('keydown', (e) => {
      if (game.mode === 'title' || document.querySelector('#screens .screen')) return;
      const code = e.code;
      // an open dialogue eats the confirm key first, Zelda-style
      if ((code === 'Space' || code === 'Enter') && hud.advanceBubble()) {
        e.preventDefault();
        return;
      }
      if (game.verb?.onKey?.(code)) { e.preventDefault(); return; }
      // Screen-relative movement on the iso diamond. The board's rows/columns
      // run at 45°, so every single-cell hop travels on a screen diagonal —
      // there is no cell-to-cell move that goes dead-straight up (see
      // world.GRID_STEP_SCREEN). Rather than fight that, each arrow is assigned
      // the hop that carries its own label's screen component: Up steps toward
      // the top of the screen (the up-and-right hop), Down toward the bottom,
      // Left/Right toward their edges. A deliberate four-key→four-hop bijection
      // that lines up with the swipe buckets (world.screenDirToGridStep), so
      // keyboard and touch send the monkey the same way for the same intent.
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
    });

    // One finger drives the game (tap to walk/act, short swipe to step); two
    // fingers drive the camera (pinch to zoom, drag to pan). A two-finger
    // gesture suppresses the one-finger tap that would otherwise fire on lift.
    const pointers = new Map();        // active pointers: id -> {x, y}
    let downPos = null, dragging = false, gestured = false;
    let orbitDrag = null;             // { pointerId, x, y } while one-finger orbiting
    let pinch = null;                  // { dist, zoom, cx, cy } during 2 fingers

    const centroid = () => {
      let x = 0, y = 0;
      for (const p of pointers.values()) { x += p.x; y += p.y; }
      const n = pointers.size || 1;
      return { x: x / n, y: y / n };
    };
    const spread = () => {
      const pts = [...pointers.values()];
      return pts.length < 2 ? 0 : Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    };

    this.canvas.addEventListener('pointerdown', (e) => {
      if (game.mode !== 'title' && e.pointerType !== 'mouse' && isJoystickZone(e.clientX, e.clientY)) {
        this.joystick = {
          active: true,
          pointerId: e.pointerId,
          origin: { x: e.clientX, y: e.clientY },
          vector: null,
        };
        hud.setJoystickActive(true);
        hud.setJoystickVector(0, 0);
        this.canvas.setPointerCapture?.(e.pointerId);
        e.preventDefault();
        return;
      }
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1) {
        downPos = { x: e.clientX, y: e.clientY };
        dragging = false; gestured = false;
        orbitDrag = null;
        if (game.mode !== 'title' && !document.querySelector('#screens .screen')) {
          const cell = this.pickCell(e.clientX, e.clientY);
          if (cell) game.previewTapCell?.(cell);
        }
      } else if (pointers.size === 2) {
        const c = centroid();
        pinch = { dist: spread() || 1, zoom: game.world.zoom, cx: c.x, cy: c.y };
        gestured = true;
        orbitDrag = null;
      }
    });

    this.canvas.addEventListener('pointermove', (e) => {
      if (this.joystick.active && this.joystick.pointerId === e.pointerId) {
        const v = joystickVectorFromPointer(this.joystick.origin, { x: e.clientX, y: e.clientY });
        this.joystick.vector = v;
        hud.setJoystickVector(v?.x || 0, v?.y || 0);
        const step = joystickStepFromVector(v);
        if (step) {
          const key = `${step[0]},${step[1]}`;
          if (this.joystick.lastStepKey !== key) softVibrate(12);
          this.joystick.lastStepKey = key;
          game.player?.setMoveIntent(step[0], step[1], v.strength);
        } else {
          this.joystick.lastStepKey = null;
          game.player?.clearMoveIntent();
        }
        e.preventDefault();
        return;
      }
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (game.mode === 'title') return;
      if (pointers.size >= 2 && pinch) {
        const d = spread();
        if (d > 0) game.world.setZoom(pinch.zoom * (d / pinch.dist));
        const c = centroid();
        game.world.panByPixels(c.x - pinch.cx, c.y - pinch.cy);
        pinch.cx = c.x; pinch.cy = c.y;
        this.userZoom = game.world.zoom; // remember the level they settled on
      } else if (pointers.size === 1 && downPos) {
        const dx = e.clientX - downPos.x, dy = e.clientY - downPos.y;
        const wantsOrbit = e.pointerType === 'mouse' || downPos.x > (window.innerWidth || 1) * 0.45;
        if (wantsOrbit && Math.hypot(dx, dy) > 8) {
          dragging = true;
          gestured = true;
          if (!orbitDrag) orbitDrag = { pointerId: e.pointerId, x: e.clientX, y: e.clientY };
          game.world.orbitByPixels(e.clientX - orbitDrag.x);
          orbitDrag.x = e.clientX;
          orbitDrag.y = e.clientY;
        } else if (Math.hypot(dx, dy) > 14) dragging = true;
      }
    });

    const endPointer = (e) => {
      if (this.joystick.active && this.joystick.pointerId === e.pointerId) {
        this.joystick = { active: false, pointerId: null, origin: null, vector: null };
        game.player?.clearMoveIntent();
        hud.setJoystickActive(false);
        hud.setJoystickVector(0, 0);
        e.preventDefault();
        return;
      }
      const start = downPos;
      const had = pointers.delete(e.pointerId);
      if (pointers.size < 2) pinch = null;
      if (pointers.size > 0) return;   // wait until every finger is up
      downPos = null;
      orbitDrag = null;
      const wasDrag = dragging, wasGesture = gestured;
      dragging = false; gestured = false;
      if (!had || game.mode === 'title' || wasGesture) return;
      if (!wasDrag) {
        const cell = this.pickCell(e.clientX, e.clientY);
        if (!cell) return;
        game.previewTapCell?.(cell);
        game.inputTapCell(cell);
      } else {
        const dx = e.clientX - (start?.x ?? e.clientX), dy = e.clientY - (start?.y ?? e.clientY);
        if (Math.hypot(dx, dy) > 30) {
          // swipe = one step, screen-relative. Hand the swipe direction (screen
          // y points down, so negate it for "up+") to the same iso resolver the
          // camera basis drives: it buckets the angle into the four grid hops
          // 1:1 — a swipe up-left steps up-left — instead of the old octant
          // round() that double-mapped left and could drop diagonals sideways.
          const d = screenDirToGridStep(dx, -dy);
          if (d) game.player?.tryStep(d[0], d[1]);
        }
      }
    };
    this.canvas.addEventListener('pointerup', endPointer);
    this.canvas.addEventListener('pointercancel', endPointer);

    // desktop: mouse wheel / trackpad pinch zooms toward the current framing
    this.canvas.addEventListener('wheel', (e) => {
      if (game.mode === 'title') return;
      e.preventDefault();
      game.world.zoomBy(e.deltaY < 0 ? 1.1 : 1 / 1.1);
      this.userZoom = game.world.zoom; // remember the level they settled on
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
