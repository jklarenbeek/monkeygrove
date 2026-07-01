import * as THREE from 'three';
import { TILE } from '../config.js';
import { Place } from '../chamber.js';
import { makeCharacter, makeProp, makeTextSprite } from '../entities.js';
import { PROPS, getCreature } from '../models.js';
import { t } from '../i18n.js';
import { BUSINESS_CUSTOMERS, RECIPES, shopById } from './data.js';

// The bakery and the pizzeria are separate scenes now (each its own hub build +
// independent economy), so a BusinessPlace renders exactly ONE shop — whichever the
// child walked into. And they are no longer the SAME room with different props: each
// shop has its own footprint so it reads as a distinct place the moment you walk in.
// The bakery is a cozy octagonal cottage (its corners are cut off); the pizzeria is a
// wider trattoria you enter through a narrow street-side vestibule. Everything that
// depends on the footprint — layout, station coords, queue, spawn — lives per-shop in
// ZONES; only the prop + display height of each station is shop-agnostic.
const STATION_DEFS = {
  counter: { prop: 'counter', height: 0.65 },
  coinTray: { prop: 'coinTray', height: 0.24, lift: 0.42 },
  orderBoard: { prop: 'orderBoard', height: 1.05 },
  prep: { prop: 'prepBoard', height: 0.18 },
  oven: { prop: 'oven', height: 0.95 },
  pantry: { prop: 'shopTable', height: 0.38 },
};

// Cozy octagonal cottage — the four corners are walled off so the bakery reads round.
const BAKERY_ROWS = [
  '####.......####',
  '##...........##',
  '#.............#',
  '#.............#',
  '#.............#',
  '#.............#',
  '#.............#',
  '#.............#',
  '#.............#',
  '#.............#',
  '#.............#',
  '##...........##',
  '####.......####',
];

// Wider trattoria: a broad dining room you enter through a narrow street vestibule
// (the stem at the bottom) — a clearly different silhouette from the bakery cottage.
const PIZZERIA_ROWS = [
  '#################',
  '#...............#',
  '#...............#',
  '#...............#',
  '#...............#',
  '#...............#',
  '#...............#',
  '#...............#',
  '#####.......#####',
  '#####.......#####',
  '#####.......#####',
];

// Per-shop storefront: the footprint (rows), where the sign hangs, the station coords
// for THIS room, the customer queue + player spawn, the pantry prop, non-station
// set-dressing, and the resident pets that make the shop feel lived-in. Bakery reuses
// dough bowl / basket visuals; pizzeria reuses pizza pan / topping crate visuals.
const ZONES = {
  bakery: {
    titleKey: 'business.zone.bakery',
    rows: BAKERY_ROWS,
    // Warm buttery-wheat floor + cream sign — cozy cottage bakery.
    floor: [0xf5e7bf, 0xecdba6],
    signBg: '#fff6e0ee',
    signAt: { x: 7, z: 1 },
    pantryProp: 'shopTable',
    stations: {
      counter: { x: 7, z: 3 },
      coinTray: { x: 10, z: 3 },
      orderBoard: { x: 11, z: 2 },
      prep: { x: 4, z: 6 },
      oven: { x: 8, z: 8 },
      pantry: { x: 3, z: 3 },
    },
    queue: [{ x: 7, z: 10 }, { x: 6, z: 10 }, { x: 8, z: 10 }, { x: 5, z: 10 }],
    spawn: { x: 2, z: 10 },
    props: ['counter', 'prepBoard', 'doughBowl', 'basket', 'coinTray', 'orderBoard', 'shopTable', 'oven'],
    decor: [
      { key: 'doughBowl', x: 5, z: 5, targetH: 0.24, lift: 0.18 },
      { key: 'basket', x: 3, z: 5, targetH: 0.34, dx: 0.1 },
      { key: 'basket', x: 10, z: 5, targetH: 0.34, dx: -0.2 },
    ],
    ambientPets: [{ id: 'piglet', x: 6, z: 11 }, { id: 'duckling', x: 9, z: 11 }],
  },
  pizzeria: {
    titleKey: 'business.zone.pizzeria',
    rows: PIZZERIA_ROWS,
    // Terracotta floor + peachy sign — warm Italian trattoria, clearly not the bakery.
    floor: [0xe7c5a6, 0xd8b088],
    signBg: '#ffe9d6ee',
    signAt: { x: 8, z: 1 },
    pantryProp: 'toppingCrate',
    stations: {
      counter: { x: 8, z: 2 },
      coinTray: { x: 11, z: 2 },
      orderBoard: { x: 12, z: 1 },
      prep: { x: 4, z: 5 },
      oven: { x: 8, z: 6 },
      pantry: { x: 3, z: 2 },
    },
    queue: [{ x: 8, z: 8 }, { x: 7, z: 8 }, { x: 9, z: 8 }, { x: 6, z: 8 }],
    spawn: { x: 8, z: 10 },
    props: ['counter', 'prepBoard', 'pizzaPan', 'toppingCrate', 'coinTray', 'orderBoard', 'shopTable', 'oven'],
    decor: [
      { key: 'pizzaPan', x: 6, z: 4, targetH: 0.18, lift: 0.18 },
      { key: 'toppingCrate', x: 3, z: 4, targetH: 0.34 },
      { key: 'pizzaPan', x: 13, z: 4, targetH: 0.18, lift: 0.18 },
    ],
    ambientPets: [{ id: 'owl', x: 2, z: 6 }, { id: 'turtle', x: 14, z: 6 }],
  },
};

function propHeight(key, fallback) {
  return fallback ?? Math.min(0.75, PROPS[key].layers.length * 0.12);
}

// Build this shop's station map: shared prop/height from STATION_DEFS merged with the
// shop's own coordinates. Copied so per-place edits never mutate the ZONES templates.
function cloneStations(zone) {
  const out = {};
  for (const [name, def] of Object.entries(STATION_DEFS)) {
    out[name] = { ...def, ...zone.stations[name], prop: name === 'pantry' ? zone.pantryProp : def.prop };
  }
  return out;
}

export class BusinessPlace extends Place {
  constructor(world, opts = {}) {
    super(world, 'hub');
    this.shopId = shopById(opts.shopId).id;
    this.zone = ZONES[this.shopId] || ZONES.bakery;
    this.buildFrom(this.zone.rows, { seed: opts.seed ?? 404 });
    this.stations = cloneStations(this.zone);
    this.activeStations = this.stations;
    this.stationMarkers = {};
    this.stationHits = [];
    this.queueMarkers = this.zone.queue.map((spot) => ({ ...spot }));
    // Where the player lands when entering this shop (its footprint differs per shop,
    // so the generic "bottom-left" fallback in main.js may not be a floor cell here).
    this.spawn = { ...this.zone.spawn };
    this.customers = [];
    this._customerEntities = new Set();
    this._textSprites = [];
    this._placeShop();
    this.setActiveRecipe(opts.recipeId || null);
  }

  // Per-shop floor tint so the bakery and pizzeria read as different places at a glance
  // (the shape already differs; this makes the colour differ too). Falls back to the
  // hub theme for any raised/alt cells (business rooms are all flat, so the tint wins).
  _floorColors(cell, x, z, opts) {
    const tint = this.zone?.floor;
    if (tint && cell.h === 0 && !cell.alt) return (x + z) % 2 === 0 ? tint[0] : tint[1];
    return super._floorColors(cell, x, z, opts);
  }

  _disposeTextSprite(sprite) {
    if (!sprite) return;
    sprite.material?.map?.dispose?.();
    sprite.material?.dispose?.();
    if (sprite.geometry?._owned) sprite.geometry.dispose?.();
  }

  _textSprite(key, text, opts, position) {
    const sprite = makeTextSprite(text, opts);
    sprite.position.copy(position);
    this.group.add(sprite);
    this._textSprites.push({ key, sprite, opts, position: position.clone() });
    return sprite;
  }

  refreshLanguage() {
    for (const record of this._textSprites) {
      const text = record.key === 'zone' ? t(this.zone.titleKey) : t(record.key);
      const next = makeTextSprite(text, record.opts);
      next.position.copy(record.position);
      this.group.add(next);
      this.group.remove(record.sprite);
      this._disposeTextSprite(record.sprite);
      record.sprite = next;
    }
    for (const customer of this.customers) {
      const next = makeTextSprite(t(customer.nameKey), { bg: '#fff8ecdd', scale: 0.48, fontSize: 34 });
      next.position.copy(customer.label.position);
      customer.group.add(next);
      customer.group.remove(customer.label);
      this._disposeCustomerLabel(customer.label);
      customer.label = next;
    }
  }

  _placeShop() {
    // shop sign over the counter (its background tinted to the shop's palette)
    const sign = this.zone.signAt;
    const bg = this.zone.signBg || '#fff8ecdd';
    this._textSprite('zone', t(this.zone.titleKey), { bg, scale: 0.6, fontSize: 42 }, this.worldPos(sign.x, sign.z, 1.2));
    for (const [name, def] of Object.entries(this.stations)) {
      this.stationHits.push({ name, x: def.x, z: def.z });
      this.stationMarkers[name] = { ...def };
      const cell = this.cellAt(def.x, def.z);
      if (cell) cell.walk = false;
      this._prop(def.prop, def.x, def.z, { targetH: propHeight(def.prop, def.height), lift: def.lift ?? 0 });
      this._textSprite('business.station.' + name, t('business.station.' + name), { bg, scale: 0.36, fontSize: 34 }, this.worldPos(def.x, def.z, 1.15));
    }
    for (const item of this.zone.decor) this._prop(item.key, item.x, item.z, item);
    this._placeAmbientPets();
  }

  // Full-size resident pets standing at the storefront — pure set-dressing that makes
  // the shop feel lived-in (the resident who moved in with the build, plus a friend).
  // Their cells are blocked so the player never stands inside a resident.
  _placeAmbientPets() {
    this._ambientPets = [];
    for (const def of this.zone.ambientPets || []) {
      const cell = this.cellAt(def.x, def.z);
      if (!cell) continue;
      const creature = getCreature(def.id);
      const mesh = makeCharacter(creature.full, 0.62, null, 'creature:' + creature.id + ':f');
      const p = this.worldPos(def.x, def.z);
      mesh.position.copy(p);
      mesh.rotation.y = Math.PI; // face out toward the counter/player
      this.group.add(mesh);
      cell.walk = false;
      const baseY = p.y;
      const bob = {
        t: Math.random() * 4,
        update: (dtMs) => {
          bob.t += dtMs / 1000;
          mesh.position.y = baseY + Math.abs(Math.sin(bob.t * 1.8)) * 0.05;
        },
      };
      this.addEntity(bob);
      this._ambientPets.push(mesh);
    }
  }

  _prop(key, x, z, opts = {}) {
    const prop = makeProp(PROPS[key], opts.targetH, 'prop:' + key);
    const p = this.worldPos(x, z, opts.lift ?? 0);
    prop.position.set(p.x + (opts.dx ?? 0) * TILE, p.y, p.z + (opts.dz ?? 0) * TILE);
    if (opts.rotation !== undefined) prop.rotation.y = opts.rotation;
    this.group.add(prop);
    return prop;
  }

  stationAt(x, z) {
    for (const { name, ...spot } of this.stationHits) {
      if (Math.abs(spot.x - x) + Math.abs(spot.z - z) <= 1) return name;
    }
    return null;
  }

  // A bakery only ever bakes bakery recipes (and the pizzeria only pizza), so this just
  // records the active recipe (for any prop highlight) — kept so the controller's order
  // flow stays shop-agnostic. It never switches rooms the way the old two-wing scene did.
  setActiveRecipe(recipeId) {
    this.activeRecipe = RECIPES[recipeId] ? recipeId : null;
    return this.shopId;
  }

  spawnCustomer(customerId, queueIndex = 0) {
    const customer = BUSINESS_CUSTOMERS[customerId];
    if (!customer) return null;
    const creature = getCreature(customer.petId);
    const spot = this.queueMarkers[queueIndex] || this.queueMarkers[0];
    if (!spot) return null;

    const group = new THREE.Group();
    const mesh = makeCharacter(creature.full, 0.6, null, 'creature:' + creature.id + ':f');
    group.add(mesh);
    const label = makeTextSprite(t(customer.nameKey), { bg: '#fff8ecdd', scale: 0.48, fontSize: 34 });
    label.position.y = 0.8;
    group.add(label);
    group.position.copy(this.worldPos(spot.x, spot.z));
    group.rotation.y = Math.PI;
    this.group.add(group);

    const record = {
      id: customer.id,
      petId: customer.petId,
      nameKey: customer.nameKey,
      x: spot.x,
      z: spot.z,
      mesh,
      label,
      group,
    };
    this.customers.push(record);

    const baseY = group.position.y;
    const bob = {
      t: queueIndex * 0.7,
      update: (dtMs) => {
        bob.t += dtMs / 1000;
        group.position.y = baseY + Math.abs(Math.sin(bob.t * 2.1)) * 0.045;
        label.position.y = 0.8 + Math.sin(bob.t * 1.7) * 0.035;
      },
    };
    this._customerEntities.add(bob);
    this.addEntity(bob);
    return record;
  }

  _disposeCustomerLabel(label) {
    if (!label) return;
    label.material?.map?.dispose?.();
    label.material?.dispose?.();
    if (label.geometry?._owned) label.geometry.dispose?.();
  }

  clearCustomers() {
    for (const customer of this.customers) {
      this._disposeCustomerLabel(customer.label);
      this.group.remove(customer.group);
    }
    this.customers = [];
    this.entities = this.entities.filter((entity) => !this._customerEntities.has(entity));
    this._customerEntities.clear();
  }
}
