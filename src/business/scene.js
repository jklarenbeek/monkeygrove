import * as THREE from 'three';
import { TILE } from '../config.js';
import { Place } from '../chamber.js';
import { makeCharacter, makeProp, makeTextSprite } from '../entities.js';
import { PETS, PROPS } from '../models.js';
import { t } from '../i18n.js';
import { BUSINESS_CUSTOMERS, RECIPES } from './data.js';

const BUSINESS_ROWS = [
  '#####################',
  '#...................#',
  '#...................#',
  '#...................#',
  '#...................#',
  '#...................#',
  '#...................#',
  '#...................#',
  '#...................#',
  '#...................#',
  '#...................#',
  '#...................#',
  '#####################',
];

const STATION_NAMES = ['counter', 'prep', 'oven', 'pantry', 'coinTray', 'orderBoard'];

const ZONES = {
  bakery: {
    titleKey: 'business.zone.bakery',
    sign: 'Bakery',
    signX: 5,
    signZ: 1,
    props: ['counter', 'prepBoard', 'doughBowl', 'basket', 'coinTray', 'orderBoard', 'shopTable', 'oven'],
    stations: {
      counter: { x: 4, z: 3, prop: 'counter', height: 0.65 },
      coinTray: { x: 7, z: 3, prop: 'coinTray', height: 0.24, lift: 0.42 },
      orderBoard: { x: 9, z: 2, prop: 'orderBoard', height: 1.05 },
      prep: { x: 4, z: 6, prop: 'prepBoard', height: 0.18 },
      oven: { x: 7, z: 8, prop: 'oven', height: 0.95 },
      pantry: { x: 2, z: 7, prop: 'shopTable', height: 0.38 },
    },
    queue: [{ x: 3, z: 10 }, { x: 4, z: 10 }, { x: 5, z: 10 }, { x: 6, z: 10 }],
  },
  pizzeria: {
    titleKey: 'business.zone.pizzeria',
    sign: 'Pizzeria',
    signX: 15,
    signZ: 1,
    props: ['counter', 'prepBoard', 'pizzaPan', 'toppingCrate', 'coinTray', 'orderBoard', 'shopTable', 'oven'],
    stations: {
      counter: { x: 16, z: 3, prop: 'counter', height: 0.65 },
      coinTray: { x: 13, z: 3, prop: 'coinTray', height: 0.24, lift: 0.42 },
      orderBoard: { x: 11, z: 2, prop: 'orderBoard', height: 1.05 },
      prep: { x: 16, z: 6, prop: 'prepBoard', height: 0.18 },
      oven: { x: 13, z: 8, prop: 'oven', height: 0.95 },
      pantry: { x: 18, z: 7, prop: 'toppingCrate', height: 0.46 },
    },
    queue: [{ x: 17, z: 10 }, { x: 16, z: 10 }, { x: 15, z: 10 }, { x: 14, z: 10 }],
  },
};

const DECOR = [
  { key: 'basket', zone: 'bakery', x: 2, z: 4, targetH: 0.34, dx: 0.1, dz: 0.15 },
  { key: 'doughBowl', zone: 'bakery', x: 5, z: 6, targetH: 0.24, lift: 0.18 },
  { key: 'basket', zone: 'bakery', x: 7, z: 4, targetH: 0.34, dx: -0.2 },
  { key: 'shopTable', zone: 'bakery', x: 5, z: 8, targetH: 0.38 },
  { key: 'pizzaPan', zone: 'pizzeria', x: 15, z: 6, targetH: 0.18, lift: 0.18 },
  { key: 'toppingCrate', zone: 'pizzeria', x: 18, z: 5, targetH: 0.34 },
  { key: 'pizzaPan', zone: 'pizzeria', x: 13, z: 4, targetH: 0.18, lift: 0.38 },
  { key: 'shopTable', zone: 'pizzeria', x: 15, z: 8, targetH: 0.38 },
];

function propHeight(key, fallback) {
  return fallback ?? Math.min(0.75, PROPS[key].layers.length * 0.12);
}

export class BusinessPlace extends Place {
  constructor(world, opts = {}) {
    super(world, 'hub');
    this.buildFrom(BUSINESS_ROWS, { seed: opts.seed ?? 404 });
    this.stations = {};
    this.stationMarkers = {};
    this.miniGameZones = cloneZones();
    this.stationHits = [];
    this.queueMarkers = this.miniGameZones.bakery.queue.map((spot) => ({ ...spot }));
    this.activeMiniGame = 'bakery';
    this.activeStations = this.miniGameZones.bakery.stations;
    this.customers = [];
    this._customerEntities = new Set();
    this._placeZones();
    this.setActiveRecipe(opts.recipeId || 'flatbread');
  }

  _placeZones() {
    for (const [zoneId, zone] of Object.entries(this.miniGameZones)) {
      this._placeZone(zoneId, zone);
    }
    this._placeSharedDecor();
    this._activateStations('bakery');
  }

  _placeZone(zoneId, zone) {
    const title = makeTextSprite(t(zone.titleKey) || zone.sign, { bg: '#fff8ecdd', scale: 0.58, fontSize: 40 });
    title.position.copy(this.worldPos(zone.signX, zone.signZ, 1.2));
    this.group.add(title);

    for (const [name, def] of Object.entries(zone.stations)) {
      const station = { x: def.x, z: def.z };
      this.stationHits.push({ name, zone: zoneId, ...station });
      const cell = this.cellAt(def.x, def.z);
      if (cell) cell.walk = false;

      this._prop(def.prop, def.x, def.z, {
        targetH: propHeight(def.prop, def.height),
        lift: def.lift ?? 0,
      });

      const label = makeTextSprite(t('business.station.' + name), { bg: '#fff8ecdd', scale: 0.36, fontSize: 34 });
      label.position.copy(this.worldPos(def.x, def.z, 1.15));
      this.group.add(label);
    }
  }

  _placeSharedDecor() {
    for (const item of DECOR) this._prop(item.key, item.x, item.z, item);
    for (let z = 1; z < this.size.d - 1; z++) {
      const cell = this.cellAt(10, z);
      if (cell) this.tintCell(10, z, 0xf7e6b5);
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

  _activateStations(kind) {
    const zone = this.miniGameZones[kind] || this.miniGameZones.bakery;
    this.activeMiniGame = kind in this.miniGameZones ? kind : 'bakery';
    this.activeStations = zone.stations;
    this.queueMarkers = zone.queue.map((spot) => ({ ...spot }));
    for (const name of STATION_NAMES) {
      this.stations[name] = { ...zone.stations[name] };
      this.stationMarkers[name] = { ...zone.stations[name] };
    }
  }

  setActiveRecipe(recipeId) {
    const kind = RECIPES[recipeId]?.kind === 'pizza' ? 'pizzeria' : 'bakery';
    this._activateStations(kind);
  }

  spawnCustomer(customerId, queueIndex = 0) {
    const customer = BUSINESS_CUSTOMERS[customerId];
    if (!customer) return null;
    const petDef = PETS.find((pet) => pet.id === customer.petId);
    if (!petDef) return null;
    const spot = this.queueMarkers[queueIndex] || this.queueMarkers[0];
    if (!spot) return null;

    const group = new THREE.Group();
    const mesh = makeCharacter(petDef.model, 0.55, null, 'business-customer:' + customer.id);
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

function cloneZones() {
  return Object.fromEntries(Object.entries(ZONES).map(([id, zone]) => [
    id,
    {
      ...zone,
      props: [...zone.props],
      queue: zone.queue.map((spot) => ({ ...spot })),
      stations: Object.fromEntries(Object.entries(zone.stations).map(([name, station]) => [
        name,
        { ...station },
      ])),
    },
  ]));
}
