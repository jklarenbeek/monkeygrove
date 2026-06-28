// Entity factories & classes: characters, props, number stones, pots, crabs,
// altar, chest, particles, and DOM-flight reward juice.
import * as THREE from 'three';
import { buildVoxelMesh, withPalette } from './voxel.js';
import { CHARS, PROPS } from './models.js';
import { tween, ease } from './anim.js';
import { audio } from './audio.js';
import { Rng } from './rng.js';
import { SOLID_MARKERS } from './config.js';
import { GFX } from './gfx.js';
import { makeContactShadow } from './blobshadow.js';

// Add a soft contact shadow under a static prop group (origin at its base). On at
// every tier (GFX.contactShadows); shared singletons → nothing extra to dispose.
function addBlob(group, radius, opacity = 0.28) {
  if (!GFX.contactShadows) return null;
  const blob = makeContactShadow({ radius, opacity });
  group.add(blob);
  return blob;
}

// ---------- factories ----------

// Build a character group: origin at feet, faces +Z, scaled to targetH world units.
export function makeCharacter(model, targetH, paletteOverride = null, cacheKey = null) {
  const m = paletteOverride ? withPalette(model, paletteOverride) : model;
  const mesh = buildVoxelMesh(m, { cacheKey: cacheKey && (cacheKey + JSON.stringify(paletteOverride || '')) });
  const height = m.layers.length;
  const s = targetH / height;
  const g = new THREE.Group();
  mesh.scale.setScalar(s);
  g.add(mesh);
  g.userData.headH = targetH;
  g.userData.voxelScale = s;
  return g;
}

export function makeProp(model, targetH, cacheKey, opts = {}) {
  const mesh = buildVoxelMesh(model, { cacheKey, ...opts });
  if (targetH) {
    const s = targetH / model.layers.length;
    mesh.scale.setScalar(s);
  }
  return mesh;
}

// Crisp text on a canvas-texture sprite (numbers on stones, line labels).
export function makeTextSprite(text, opts = {}) {
  const { fontSize = 64, color = '#4a3f35', bg = null, pad = 18, scale = 1 } = opts;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const font = `900 ${fontSize}px 'Quicksand','Varela Round','Comic Sans MS',system-ui,sans-serif`;
  ctx.font = font;
  const w = Math.ceil(ctx.measureText(text).width) + pad * 2;
  const h = fontSize + pad * 2;
  canvas.width = w * 2; canvas.height = h * 2;
  const c2 = canvas.getContext('2d');
  c2.scale(2, 2);
  if (bg) {
    c2.fillStyle = bg;
    c2.beginPath();
    c2.roundRect(2, 2, w - 4, h - 4, 16);
    c2.fill();
    c2.strokeStyle = '#ffffff';
    c2.lineWidth = 4;
    c2.stroke();
  }
  c2.font = font;
  c2.fillStyle = color;
  c2.textAlign = 'center';
  c2.textBaseline = 'middle';
  c2.fillText(text, w / 2, h / 2 + 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  mat._owned = true;
  const sp = new THREE.Sprite(mat);
  const aspect = w / h;
  sp.scale.set(0.5 * aspect * scale, 0.5 * scale, 1);
  return sp;
}

// ---------- DOM flight juice (world → HUD) ----------

export function worldToScreen(world, pos) {
  const v = pos.clone().project(world.camera);
  return {
    x: (v.x * 0.5 + 0.5) * window.innerWidth,
    y: (-v.y * 0.5 + 0.5) * window.innerHeight,
  };
}

export function flyEmojiToHud(world, worldPos, emoji, targetEl, count = 1, onEach = null) {
  const from = worldToScreen(world, worldPos);
  const r = targetEl.getBoundingClientRect();
  const to = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.textContent = emoji;
    el.style.cssText = `position:fixed;left:0;top:0;font-size:26px;z-index:40;pointer-events:none;will-change:transform;filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))`;
    document.body.appendChild(el);
    const burst = {
      x: from.x + (Math.random() - 0.5) * 70,
      y: from.y - Math.random() * 60,
    };
    tween({
      ms: 380 + Math.random() * 120, delay: i * 70, ease: ease.outQuad,
      onUpdate: (v, k) => {
        const x = from.x + (burst.x - from.x) * k;
        const y = from.y + (burst.y - from.y) * k - Math.sin(k * Math.PI) * 40;
        el.style.transform = `translate(${x - 13}px,${y - 13}px) scale(${0.6 + k * 0.6})`;
      },
      onDone: () => {
        tween({
          ms: 420, ease: ease.inQuad,
          onUpdate: (v, k) => {
            const x = burst.x + (to.x - burst.x) * k;
            const y = burst.y + (to.y - burst.y) * k;
            el.style.transform = `translate(${x - 13}px,${y - 13}px) scale(${1.2 - k * 0.7})`;
          },
          onDone: () => {
            el.remove();
            targetEl.parentElement?.animate?.(
              [{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }],
              { duration: 180 },
            );
            onEach?.();
          },
        });
      },
    });
  }
}

export function floatLabel(world, worldPos, text, color = '#2c6e49') {
  const p = worldToScreen(world, worldPos);
  const el = document.createElement('div');
  el.textContent = text;
  el.style.cssText = `position:fixed;left:0;top:0;font-family:inherit;font-weight:900;font-size:24px;color:${color};z-index:40;pointer-events:none;text-shadow:0 2px 0 #fff,0 3px 6px rgba(0,0,0,.2)`;
  document.body.appendChild(el);
  tween({
    ms: 900, ease: ease.outQuad,
    onUpdate: (v, k) => {
      el.style.transform = `translate(${p.x - 20}px,${p.y - 30 - k * 60}px) scale(${1 + k * 0.2})`;
      el.style.opacity = String(1 - Math.max(0, k - 0.6) / 0.4);
    },
    onDone: () => el.remove(),
  });
}

// ---------- particles ----------

const CONFETTI_COLORS = [0xffd966, 0x7ccf7c, 0xffb3c6, 0x9bd6ff, 0xc9a6ff, 0xff9b85];

export class Particles {
  constructor(scene, max = 320) {
    this.max = max;
    this.geo = new THREE.BufferGeometry();
    this.pos = new Float32Array(max * 3);
    this.col = new Float32Array(max * 3);
    this.vel = new Float32Array(max * 3);
    this.life = new Float32Array(max);     // remaining ms; <=0 dead
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    const mat = new THREE.PointsMaterial({ size: 0.14, vertexColors: true, transparent: true, depthWrite: false });
    mat._owned = true;
    this.points = new THREE.Points(this.geo, mat);
    this.points.frustumCulled = false;
    scene.add(this.points);
    this.cursor = 0;
    this.life.fill(0);
    this.pos.fill(9999);
  }

  emit(center, n, { colors = CONFETTI_COLORS, speed = 2.4, up = 2.6, life = 900, spread = 0.25 } = {}) {
    const c = new THREE.Color();
    for (let i = 0; i < n; i++) {
      const j = this.cursor = (this.cursor + 1) % this.max;
      this.life[j] = life * (0.7 + Math.random() * 0.6);
      this.pos[j * 3] = center.x + (Math.random() - 0.5) * spread;
      this.pos[j * 3 + 1] = center.y + Math.random() * spread;
      this.pos[j * 3 + 2] = center.z + (Math.random() - 0.5) * spread;
      const a = Math.random() * Math.PI * 2;
      const s = speed * (0.4 + Math.random() * 0.8);
      this.vel[j * 3] = Math.cos(a) * s;
      this.vel[j * 3 + 1] = up * (0.5 + Math.random() * 0.8);
      this.vel[j * 3 + 2] = Math.sin(a) * s;
      c.setHex(colors[(Math.random() * colors.length) | 0]);
      this.col[j * 3] = c.r; this.col[j * 3 + 1] = c.g; this.col[j * 3 + 2] = c.b;
    }
    this.geo.attributes.color.needsUpdate = true;
  }

  confetti(center, n = 36) { this.emit(center, n); audio.sfx('sparkle'); }
  splash(center, n = 30) {
    this.emit(center, n, { colors: [0x9bd6ff, 0xd9f2fb, 0x7ec8e3], speed: 1.8, up: 3.0, life: 700 });
  }
  poof(center, n = 16, color = 0xd9c9a8) {
    this.emit(center, n, { colors: [color, 0xffffff], speed: 1.2, up: 1.2, life: 500 });
  }

  update(dtMs) {
    const dt = dtMs / 1000;
    let alive = false;
    for (let j = 0; j < this.max; j++) {
      if (this.life[j] <= 0) continue;
      alive = true;
      this.life[j] -= dtMs;
      if (this.life[j] <= 0) { this.pos[j * 3 + 1] = 9999; continue; }
      this.vel[j * 3 + 1] -= 7.5 * dt;
      this.pos[j * 3] += this.vel[j * 3] * dt;
      this.pos[j * 3 + 1] += this.vel[j * 3 + 1] * dt;
      this.pos[j * 3 + 2] += this.vel[j * 3 + 2] * dt;
      if (this.pos[j * 3 + 1] < 0.02) { this.pos[j * 3 + 1] = 0.02; this.vel[j * 3 + 1] *= -0.35; }
    }
    if (alive) this.geo.attributes.position.needsUpdate = true;
  }
}

// ---------- living portals ----------

// A hub gate that grows with its world's mastery (config.portalStage): vines
// and flowers arrive in celebrated stages, the opening breathes with a soft
// world-colored glow, fireflies drift up inside it, the name tag bobs — and
// the gate does a happy jelly-bounce when the player walks up. Stages only
// ever go up: mistakes can never wilt a gate.

const PORTAL_H = 1.6;
const VINE_BY_STAGE = ['', 'portalVine1', 'portalVine2', 'portalVine3', 'portalVine3'];

// Soft round glow dot; per-sprite so place.dispose() can free map+material.
function makeMoteTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 32;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.4, 'rgba(255,250,225,0.85)');
  grad.addColorStop(1, 'rgba(255,245,200,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(c);
}

function makeMoteSprite(color, size) {
  const mat = new THREE.SpriteMaterial({
    map: makeMoteTexture(), color, transparent: true,
    depthWrite: false, blending: THREE.AdditiveBlending,
  });
  mat._owned = true;
  const sp = new THREE.Sprite(mat);
  sp.scale.set(size, size, 1);
  return sp;
}

export class LivingPortal {
  // opts: { worldId, label, accent (hex number), bloom ('#rrggbb'), pct 0..1, stage 0..4 }
  constructor(place, spot, opts) {
    this.place = place;
    this.spot = spot;
    this.worldId = opts.worldId;
    this.accent = opts.accent;
    this.bloom = opts.bloom;
    this.pct = Math.min(1, Math.max(0, opts.pct ?? 0));
    this.s = PORTAL_H / PROPS.portal.layers.length;
    this.t = Math.random() * 6;
    this.growK = 1;            // vine pop-in scale (celebrate tweens 0 -> 1)
    this.glowBoost = 0;        // celebration/greeting flash, decays
    this.greetArmed = true;
    this.greetCooldown = 0;

    this.group = new THREE.Group();
    this.group.position.copy(place.worldPos(spot.x, spot.z));
    place.group.add(this.group);
    this.body = new THREE.Group(); // everything that jelly-bounces
    this.group.add(this.body);

    // stone arch, inner film tinted to a pastel of the world color
    const pastel = '#' + new THREE.Color(this.accent).lerp(new THREE.Color('#ffffff'), 0.45).getHexString();
    const arch = buildVoxelMesh(withPalette(PROPS.portal, { Q: pastel }),
      { cacheKey: 'prop:portal:' + this.worldId });
    arch.scale.setScalar(this.s);
    this.body.add(arch);

    // breathing glow film over the opening (5x7 voxels), brighter with mastery
    const glowGeo = new THREE.PlaneGeometry(5 * this.s * 0.94, 7 * this.s * 0.94);
    this.glowMat = new THREE.MeshBasicMaterial({
      color: this.accent, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    });
    this.glowMat._owned = true;
    const glow = new THREE.Mesh(glowGeo, this.glowMat);
    glow.position.set(0, 3.5 * this.s, 1.06 * this.s);
    this.body.add(glow);

    // label floats clear of the full-bloom crown (2.08) and the star (2.10)
    this.labelY = 2.45;
    this.labelText = opts.label;
    this.label = makeTextSprite(this.labelText, { bg: '#fff8ecdd', scale: 0.85, fontSize: 44 });
    this.label.position.set(0, this.labelY, 0);
    this.group.add(this.label);

    this.overlay = null;
    this.star = null;
    this.motes = [];
    this._setStage(opts.stage ?? 0);
    place.addEntity(this);
  }

  updateLabel(text) {
    this.labelText = text;
    const next = makeTextSprite(this.labelText, { bg: '#fff8ecdd', scale: 0.85, fontSize: 44 });
    next.position.copy(this.label.position);
    this.group.add(next);
    this.group.remove(this.label);
    this.label.material?.map?.dispose?.();
    this.label.material?.dispose?.();
    if (this.label.geometry?._owned) this.label.geometry.dispose?.();
    this.label = next;
  }

  _setStage(stage) {
    this.stage = stage;
    if (this.overlay) this.body.remove(this.overlay); // geometry is cached, material shared
    this.overlay = null;
    const key = VINE_BY_STAGE[stage];
    if (key) {
      this.overlay = buildVoxelMesh(withPalette(PROPS[key], { F: this.bloom }),
        { cacheKey: `prop:${key}:${this.worldId}` });
      this.overlay.scale.setScalar(this.s);
      this.body.add(this.overlay);
    }
    if (this.star) {
      this.body.remove(this.star);
      this.star.material.map.dispose();
      this.star.material.dispose();
      this.star = null;
    }
    if (stage >= 4) {
      this.star = makeMoteSprite(0xffd966, 0.16);
      this.star.position.set(0, 13.1 * this.s, 0); // twinkle on the crown tip
      this.body.add(this.star);
    }
    // fireflies in the opening: even a gray gate keeps one shy spark alive
    for (const m of this.motes) {
      this.body.remove(m.sprite);
      m.sprite.material.map.dispose();
      m.sprite.material.dispose();
    }
    this.motes = [];
    const tint = new THREE.Color(0xffffff).lerp(new THREE.Color(this.accent), 0.4);
    for (let i = 0; i < 1 + stage; i++) {
      const size = 0.05 + Math.random() * 0.035;
      const sprite = makeMoteSprite(tint.getHex(), size);
      this.body.add(sprite);
      this.motes.push({
        sprite, size,
        x: (Math.random() - 0.5) * 0.5,
        z: (1.1 + Math.random() * 0.4) * this.s,
        phase: Math.random(),
        speed: 0.10 + Math.random() * 0.08,
        sway: 0.6 + Math.random() * 0.8,
      });
    }
  }

  // Stage-up moment (main.js fires it when the hub is rebuilt after growth):
  // the new vines pop in, the film flashes, sparkles rain in world colors.
  celebrate(stage) {
    if (stage <= this.stage) return;
    this._setStage(stage);
    this.growK = 0.001;
    tween({
      ms: 950, ease: ease.outBack,
      onUpdate: (v) => { this.growK = Math.max(0.001, v); },
      onDone: () => { this.growK = 1; },
    });
    this.glowBoost = 0.45;
    this.bounce();
    this.place.fx?.emit(this._fxPos(), 30, {
      colors: [this.accent, 0xffffff, 0xffd966], speed: 1.6, up: 2.8, life: 1000, spread: 0.55,
    });
    audio.sfx('sparkle');
  }

  enter() {
    this.glowBoost = 0.9;
    this.bounce();
    this.place.fx?.emit(this._fxPos(), 42, {
      colors: [this.accent, 0xffffff, 0xffd966, 0xc9a6ff],
      speed: 2.2,
      up: 2.0,
      life: 850,
      spread: 0.42,
    });
    tween({
      ms: 420, ease: ease.outQuad,
      onUpdate: (v, k) => {
        const pulse = Math.sin(k * Math.PI);
        this.body.rotation.y = pulse * Math.PI * 0.18;
        this.body.scale.set(1 + pulse * 0.18, 1 + pulse * 0.24, 1 + pulse * 0.18);
      },
      onDone: () => {
        this.body.rotation.y = 0;
        this.body.scale.set(1, 1, 1);
      },
    });
    audio.sfx('sparkle', { pitch: 0.75 });
  }

  // Cartoon jelly-boing that settles back to rest.
  bounce() {
    tween({
      ms: 540, ease: ease.linear,
      onUpdate: (v, k) => {
        const w = Math.sin(k * Math.PI * 2) * (1 - k);
        this.body.scale.set(1 - w * 0.08, 1 + w * 0.14, 1 - w * 0.08);
      },
      onDone: () => this.body.scale.set(1, 1, 1),
    });
  }

  _fxPos() {
    const p = this.group.position;
    return new THREE.Vector3(p.x, p.y + 0.8, p.z);
  }

  update(dt) {
    const dts = dt / 1000;
    this.t += dts;
    // the film breathes; mastery sets how awake the gate is
    const breathe = 0.5 + 0.5 * Math.sin(this.t * 1.7);
    this.glowBoost = Math.max(0, this.glowBoost - dts * 0.3);
    this.glowMat.opacity = Math.min(0.85,
      0.04 + 0.26 * this.pct + 0.12 * breathe * (0.3 + this.pct) + this.glowBoost);
    // fireflies drift up and twinkle
    for (const m of this.motes) {
      const k = (this.t * m.speed + m.phase) % 1;
      m.sprite.position.set(
        m.x + Math.sin(this.t * m.sway + m.phase * 7) * 0.14,
        0.12 + k * PORTAL_H * 0.62,
        m.z,
      );
      m.sprite.material.opacity = Math.sin(k * Math.PI) *
        (0.4 + 0.45 * Math.sin(this.t * 5 + m.phase * 9) ** 2);
      const sc = m.size * (0.85 + 0.25 * Math.sin(this.t * 3 + m.phase * 5));
      m.sprite.scale.set(sc, sc, 1);
    }
    // vines breathe ever so slightly
    if (this.overlay) {
      this.overlay.scale.setScalar(this.s * this.growK * (1 + 0.02 * Math.sin(this.t * 1.8)));
    }
    if (this.star) {
      this.star.material.rotation += dts * 0.8;
      const ss = 0.16 * (1 + 0.2 * Math.sin(this.t * 2.4));
      this.star.scale.set(ss, ss, 1);
    }
    this.label.position.y = this.labelY + Math.sin(this.t * 1.3) * 0.035;
    // greeting: a silent happy bounce when the player comes close
    this.greetCooldown = Math.max(0, this.greetCooldown - dts);
    const pp = this.place.playerAt?.();
    if (pp) {
      const d = Math.abs(pp.x - this.spot.x) + Math.abs(pp.z - this.spot.z);
      if (d <= 2 && this.greetArmed && !this.greetCooldown) {
        this.greetArmed = false;
        this.greetCooldown = 8;
        this.bounce();
        this.glowBoost = Math.max(this.glowBoost, 0.22);
        this.place.fx?.emit(this._fxPos(), 8, {
          colors: [this.accent, 0xffffff], speed: 1.0, up: 1.8, life: 600, spread: 0.4,
        });
      } else if (d >= 4) {
        this.greetArmed = true;
      }
    }
  }
}

// ---------- game objects ----------

export class NumberStone {
  constructor(place, x, z, choice, opts = {}) {
    this.place = place;
    this.x = x; this.z = z;
    this.choice = choice;        // {value, tag}
    this.taken = false;
    this.group = new THREE.Group();
    this.stone = makeProp(PROPS.stone, 0.62, 'prop:stone');
    this.group.add(this.stone);
    // a stone the altar already handed back gets a sleepy, dimmed label —
    // "tried that one" at a glance, with zero scolding
    this.label = opts.tried
      ? makeTextSprite(String(choice.value), { bg: '#ece2d0', color: '#9a8b7a', scale: 0.95 })
      : makeTextSprite(String(choice.value), { bg: '#fff8ec', scale: 0.95 });
    this.label.position.y = 0.95;
    this.group.add(this.label);
    addBlob(this.group, 0.3); // grounded on the chamber floor
    this.group.position.copy(place.worldPos(x, z));
    this.bobT = Math.random() * 10;
    place.group.add(this.group);
  }

  // Compact mesh version for carrying (label shrinks onto the stone).
  pickUpMesh() {
    this.taken = true;
    this.place.group.remove(this.group);
    const g = new THREE.Group();
    const s = makeProp(PROPS.stone, 0.5, 'prop:stone');
    g.add(s);
    const l = makeTextSprite(String(this.choice.value), { bg: '#fff8ec', scale: 0.7 });
    l.position.y = 0.62;
    g.add(l);
    return g;
  }

  update(dtMs) {
    if (this.taken) return;
    this.bobT += dtMs / 1000;
    this.label.position.y = 0.95 + Math.sin(this.bobT * 2.2) * 0.05;
  }

  remove() { this.place.group.remove(this.group); this.taken = true; }
}

export class Pot {
  constructor(place, x, z, contents) {
    this.place = place;
    this.x = x; this.z = z;
    this.contents = contents;       // {kind:'stone', choice} | {kind:'bananas', n} | {kind:'berry'}
    this.smashed = false;
    this.mesh = makeProp(PROPS.pot, 0.6, 'prop:pot');
    this.mesh.position.copy(place.worldPos(x, z));
    place.group.add(this.mesh);
    // the pot's voxel mesh is scaled, so the blob can't be its child — sit it in the
    // place group at the pot's foot, and clear it when the pot smashes.
    this.shadow = addBlob(place.group, 0.28);
    if (this.shadow) this.shadow.position.set(this.mesh.position.x, this.mesh.position.y + 0.02, this.mesh.position.z);
  }

  smash(particles) {
    if (this.smashed) return null;
    this.smashed = true;
    audio.sfx('pop');
    if (this.shadow) { this.place.group.remove(this.shadow); this.shadow = null; }
    particles.poof(this.mesh.position.clone().add(new THREE.Vector3(0, 0.3, 0)), 18, 0xd9906f);
    const m = this.mesh;
    tween({
      ms: 160, ease: ease.inQuad,
      onUpdate: (v, k) => { m.scale.setScalar((1 - k) * m.scale.x || 0.001); },
      onDone: () => this.place.group.remove(m),
    });
    return this.contents;
  }
}

// Tide-pool crabs: cheeky banana-snatchers that scuttle the chamber floor.
// They roam by hopping cell-to-cell with MOMENTUM (they keep a heading instead
// of jittering), pause on a beat now and then, and shift MOOD — mostly aimless
// wander, sometimes a curious sidle toward the player, sometimes a shy skitter
// away — so a path never reads as a metronome. Touching one yoinks a few
// bananas (always recoverable). When the player picks up an answer stone the
// crabs do a brief startled freeze, then carry on; the carry itself stays safe
// because the steal is suppressed while carrying (chamberflow.updateChamber).
//
// Each crab owns a seeded Rng: deterministic per seed (duel-fair) and separate
// from the chamber/problem stream, so its per-frame dice never skew the math.
const CRAB_DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

export class Crab {
  // opts: { speed (cells/sec), rng (seeded Rng) }
  constructor(place, x, z, opts = {}) {
    this.place = place;
    this.cell = { x, z };
    this.prev = { x, z };               // last cell — discourages instant U-turns
    this.heading = { dx: 0, dz: 1 };
    this.homeH = place.cellAt(x, z)?.h ?? 0;
    this.speed = opts.speed ?? 1.6;     // cells per second
    this.rng = opts.rng || new Rng(((x + 1) * 73856093) ^ ((z + 1) * 19349663));
    this.frozen = false;                // true during a startle (collision reads it)
    this.startleT = 0;                  // ms left in a "noticed you!" pause
    this.cooldown = 0;                  // post-yoink grace (set by chamberflow)
    this.hop = null;                    // { from, to, cell, k, dur }
    this.pause = 150 + this.rng.float() * 500;
    this.t = this.rng.float() * 10;
    this.mesh = makeCharacter(CHARS.crab, 0.5, null, 'char:crab');
    place.group.add(this.mesh);
    this._cellPos = place.worldPos(x, z);
    this.mesh.position.copy(this._cellPos);
    this.mesh.rotation.y = Math.atan2(this.heading.dx, this.heading.dz);
  }

  // Collision (chamberflow) reads these: a crab "occupies" whichever cell it is
  // at least halfway onto, matching the old round(pos) feel.
  get x() { return this.hop && this.hop.k >= 0.5 ? this.hop.cell.x : this.cell.x; }
  get z() { return this.hop && this.hop.k >= 0.5 ? this.hop.cell.z : this.cell.z; }

  // A brief startled freeze, then back to roaming (player grabbed an answer).
  startle() { this.startleT = Math.max(this.startleT, 800 + this.rng.float() * 600); }

  _neighbors() {
    const out = [];
    for (const [dx, dz] of CRAB_DIRS) {
      const cell = this.place.cellAt(this.cell.x + dx, this.cell.z + dz);
      if (cell && cell.walk && cell.h === this.homeH && !SOLID_MARKERS.has(cell.ch)) {
        out.push({ dx, dz });
      }
    }
    return out;
  }

  _decide() {
    const opts = this._neighbors();
    if (!opts.length) { this.pause = 500; return; }            // boxed in — wait
    if (this.rng.chance(0.16)) { this.pause = 250 + this.rng.float() * 950; return; } // a beat of stillness
    // don't spin straight back the way we came, unless it's a dead end
    let choices = opts.filter((o) => this.cell.x + o.dx !== this.prev.x || this.cell.z + o.dz !== this.prev.z);
    if (!choices.length) choices = opts;
    // mood: mostly neutral wander; occasionally curious (toward) or shy (away)
    const m = this.rng.float();
    const bias = m < 0.24 ? 1 : (m < 0.36 ? -1 : 0);
    const player = bias ? this.place.playerAt?.() : null;
    const weighted = [];
    for (const o of choices) {
      let w = 1;
      if (o.dx === this.heading.dx && o.dz === this.heading.dz) w += 2.2; // momentum
      if (player) {
        const cur = Math.abs(player.x - this.cell.x) + Math.abs(player.z - this.cell.z);
        const nxt = Math.abs(player.x - (this.cell.x + o.dx)) + Math.abs(player.z - (this.cell.z + o.dz));
        if ((bias > 0 && nxt < cur) || (bias < 0 && nxt > cur)) w += 1.4;
      }
      const n = Math.max(1, Math.round(w * 2));
      for (let i = 0; i < n; i++) weighted.push(o);
    }
    this._hopTo(this.rng.pick(weighted));
  }

  _hopTo(d) {
    this.prev = { x: this.cell.x, z: this.cell.z };
    this.heading = { dx: d.dx, dz: d.dz };
    const next = { x: this.cell.x + d.dx, z: this.cell.z + d.dz };
    this.hop = {
      from: this._cellPos,
      to: this.place.worldPos(next.x, next.z),
      cell: next,
      k: 0,
      dur: (1000 / this.speed) * (0.85 + this.rng.float() * 0.4),
    };
  }

  update(dtMs) {
    this.t += dtMs / 1000;
    if (this.cooldown > 0) this.cooldown -= dtMs;
    if (this.startleT > 0) this.startleT -= dtMs;
    this.frozen = this.startleT > 0;

    if (this.hop) { this._advance(dtMs); return; }   // always finish a hop first
    if (this.frozen) { this._startled(); return; }   // pause on the cell, then carry on
    if (this.pause > 0) { this.pause -= dtMs; this._idle(); return; }
    this._decide();
  }

  _advance(dtMs) {
    const h = this.hop;
    h.k += dtMs / h.dur;
    const k = Math.min(1, h.k);
    const mesh = this.mesh;
    mesh.position.x = h.from.x + (h.to.x - h.from.x) * k;
    mesh.position.z = h.from.z + (h.to.z - h.from.z) * k;
    mesh.position.y = h.from.y + Math.sin(k * Math.PI) * 0.12 + Math.abs(Math.sin(this.t * 12)) * 0.04;
    // turn toward the heading on the shortest arc
    const face = Math.atan2(this.heading.dx, this.heading.dz);
    let d = face - mesh.rotation.y;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    mesh.rotation.y += d * Math.min(1, dtMs / 80);
    mesh.rotation.z = 0;
    if (k >= 1) {
      this.cell = h.cell;
      this._cellPos = h.to;
      this.hop = null;
      this.pause = this.rng.chance(0.4) ? 150 + this.rng.float() * 700 : 0;
    }
  }

  _idle() {
    this.mesh.position.y = this._cellPos.y + Math.abs(Math.sin(this.t * 6)) * 0.05;
    this.mesh.rotation.z = 0;
  }

  _startled() {
    // tucked-in "oh! you've got the answer" wobble before carrying on
    this.mesh.position.y = this._cellPos.y + Math.abs(Math.sin(this.t * 4)) * 0.02;
    this.mesh.rotation.z = Math.sin(this.t * 3) * 0.06;
  }
}

export class Altar {
  constructor(place, x, z) {
    this.place = place;
    this.x = x; this.z = z;
    this.mesh = makeProp(PROPS.altar, 0.9, 'prop:altar');
    this.mesh.position.copy(place.worldPos(x, z));
    place.group.add(this.mesh);
    // scaled voxel mesh → blob sits in the place group at the altar's foot
    const blob = addBlob(place.group, 0.5);
    if (blob) blob.position.set(this.mesh.position.x, this.mesh.position.y + 0.02, this.mesh.position.z);
    this.baseS = this.mesh.scale.x;
    this.glow = makeTextSprite('✨', { scale: 0.8 });
    this.glow.position.copy(this.mesh.position).add(new THREE.Vector3(0, 1.45, 0));
    place.group.add(this.glow);
    this.t = 0;
  }

  // Success: a happy squash & stretch bounce, like everything alive here.
  cheer() {
    const m = this.mesh, s = this.baseS;
    tween({
      ms: 520, ease: ease.outQuad,
      onUpdate: (v, k) => {
        const pop = Math.sin(k * Math.PI);
        m.scale.set(s * (1 + pop * 0.1), s * (1 + pop * 0.18), s * (1 + pop * 0.1));
      },
      onDone: () => m.scale.setScalar(s),
    });
  }

  // "Hmm, not this one": a gentle head-shake — never a buzzer.
  shake() {
    const m = this.mesh;
    tween({
      ms: 540, ease: ease.linear,
      onUpdate: (v, k) => { m.rotation.z = Math.sin(k * Math.PI * 3) * 0.06 * (1 - k); },
      onDone: () => { m.rotation.z = 0; },
    });
  }

  update(dtMs) {
    this.t += dtMs / 1000;
    this.glow.position.y = this.mesh.position.y + 1.45 + Math.sin(this.t * 2.4) * 0.07;
    this.glow.material.opacity = 0.7 + Math.sin(this.t * 3) * 0.3;
  }
}

export class Chest {
  constructor(place, x, z) {
    this.place = place;
    this.group = new THREE.Group();
    this.base = makeProp(PROPS.chestBase, 0.55, 'prop:chestBase');
    this.lid = makeProp(PROPS.chestLid, 0.28, 'prop:chestLid');
    this.lid.position.y = 0.55;
    this.group.add(this.base, this.lid);
    addBlob(this.group, 0.34); // pops in with the chest, then grounded
    this.group.position.copy(place.worldPos(x, z));
    this.group.scale.setScalar(0.001);
    place.group.add(this.group);
    this.opened = false;
    tween({ ms: 450, ease: ease.outBack, onUpdate: (v, k) => this.group.scale.setScalar(Math.max(0.001, k)) });
  }
  open(particles) {
    if (this.opened) return;
    this.opened = true;
    audio.sfx('chest');
    tween({ ms: 420, ease: ease.outBack, onUpdate: (v, k) => { this.lid.rotation.x = -k * 2.0; this.lid.position.y = 0.55 + k * 0.1; } });
    particles.confetti(this.group.position.clone().add(new THREE.Vector3(0, 0.8, 0)), 40);
  }
}
