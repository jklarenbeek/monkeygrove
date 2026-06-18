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

export class InputController {
  constructor(game) {
    this.game = game;
    this.canvas = game.canvas;
    this.userZoom = null;        // player's retained pinch/wheel zoom (null = comfort default)
    this.gestureHintDone = false; // pinch/pan hint shows at most once per session
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
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1) {
        downPos = { x: e.clientX, y: e.clientY };
        dragging = false; gestured = false;
      } else if (pointers.size === 2) {
        const c = centroid();
        pinch = { dist: spread() || 1, zoom: game.world.zoom, cx: c.x, cy: c.y };
        gestured = true;
      }
    });

    this.canvas.addEventListener('pointermove', (e) => {
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
        if (Math.hypot(dx, dy) > 14) dragging = true;
      }
    });

    const endPointer = (e) => {
      const start = downPos;
      const had = pointers.delete(e.pointerId);
      if (pointers.size < 2) pinch = null;
      if (pointers.size > 0) return;   // wait until every finger is up
      downPos = null;
      const wasDrag = dragging, wasGesture = gestured;
      dragging = false; gestured = false;
      if (!had || game.mode === 'title' || wasGesture) return;
      if (!wasDrag) {
        const cell = this.pickCell(e.clientX, e.clientY);
        if (!cell) return;
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

  // One-time nudge so touch players discover the camera gestures.
  maybeGestureHint() {
    if (!IS_TOUCH || this.gestureHintDone) return;
    this.gestureHintDone = true;   // once per session, even if storage is unavailable
    try {
      if (localStorage.getItem('monkeygrove.gestureHint')) return; // shown on a past visit
      localStorage.setItem('monkeygrove.gestureHint', '1');
    } catch { /* private mode: the session flag above still holds it to one toast */ }
    delay(1200, () => hud.toast(t('hint.pinch')));
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
    const place = this.game.place;
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
