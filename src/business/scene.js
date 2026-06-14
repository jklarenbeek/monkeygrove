import * as THREE from 'three';
import { TILE } from '../config.js';
import { Place } from '../chamber.js';
import { makeCharacter, makeProp, makeTextSprite } from '../entities.js';
import { PETS, PROPS } from '../models.js';
import { t } from '../i18n.js';
import { BUSINESS_CUSTOMERS } from './data.js';

const BUSINESS_ROWS = [
  '#################',
  '#...............#',
  '#...............#',
  '#...............#',
  '#...............#',
  '#...............#',
  '#...............#',
  '#...............#',
  '#...............#',
  '#...............#',
  '#...............#',
  '#################',
];

const STATIONS = [
  { name: 'counter', x: 5, z: 3, prop: 'counter', height: 0.65 },
  { name: 'coinTray', x: 8, z: 3, prop: 'coinTray', height: 0.24, lift: 0.42 },
  { name: 'orderBoard', x: 12, z: 3, prop: 'orderBoard', height: 1.05 },
  { name: 'prep', x: 5, z: 6, prop: 'prepBoard', height: 0.18, extras: ['pizzaPan', 'doughBowl'] },
  { name: 'oven', x: 9, z: 7, prop: 'oven', height: 0.95 },
  { name: 'pantry', x: 13, z: 7, prop: 'toppingCrate', height: 0.46, extras: ['shopTable'] },
];

const QUEUE_MARKERS = [
  { x: 5, z: 9 },
  { x: 6, z: 9 },
  { x: 7, z: 9 },
  { x: 8, z: 9 },
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
    this.queueMarkers = QUEUE_MARKERS.map((spot) => ({ ...spot }));
    this.customers = [];
    this._customerEntities = new Set();
    this._placeStations();
  }

  _placeStations() {
    for (const def of STATIONS) {
      this.stations[def.name] = { x: def.x, z: def.z };
      this.stationMarkers[def.name] = { x: def.x, z: def.z };
      const cell = this.cellAt(def.x, def.z);
      if (cell) cell.walk = false;

      this._prop(def.prop, def.x, def.z, {
        targetH: propHeight(def.prop, def.height),
        lift: def.lift ?? 0,
      });

      if (def.name === 'prep') {
        this._prop('pizzaPan', def.x, def.z, { targetH: 0.18, dx: 0.3, dz: 0.18, lift: 0.18 });
        this._prop('doughBowl', def.x, def.z, { targetH: 0.24, dx: -0.3, dz: 0.15, lift: 0.18 });
        this._prop('toppingCrate', def.x - 1, def.z, { targetH: 0.34, dx: -0.2 });
      } else if (def.name === 'pantry') {
        this._prop('shopTable', def.x, def.z + 1, { targetH: 0.38 });
      }

      const label = makeTextSprite(def.name, { bg: '#fff8ecdd', scale: 0.42, fontSize: 36 });
      label.position.copy(this.worldPos(def.x, def.z, 1.15));
      this.group.add(label);
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
    for (const [name, spot] of Object.entries(this.stations)) {
      if (Math.abs(spot.x - x) + Math.abs(spot.z - z) <= 1) return name;
    }
    return null;
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
