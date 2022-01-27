import { derived, get } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { Save, GameObject } from '$modules/chi/engine';
import { chi } from './chi';
import { objects } from './objects';
import { buildings } from './buildings';
import * as objectMap from '$modules/chi/engine/objects';
import * as buildingMap from '$modules/chi/engine/buildings';

export interface Player extends Readable<{ chi: number; objects: GameObject[] }> {
	chi: Writable<number>;
	objects: Writable<GameObject[]>;
	spend(amount: number): boolean;
	earn(amount: number): boolean;
	buy(object: GameObject): boolean;
	sell(object: GameObject): boolean;
	give(object: GameObject): boolean;
	receive(object: GameObject): boolean;
}

const store = derived([chi, objects, buildings], ([$chi, $objects, $buildings]) => ({
	chi: $chi,
	objects: $objects,
	buildings: $buildings,
}));

const inventory = derived([buildings, objects], ([$buildings, $objects]) => {
	const $inventory = [...Object.keys(objectMap), ...Object.keys(buildingMap)].reduce((inventory, id) => {
		inventory[id] = 0;
		return inventory;
	}, {});

	for (const object of [...$buildings, ...$objects]) {
		$inventory[object.type.id]++;
	}

	return $inventory;
});

const onCollectHandlers = [];
const onBuyHandlers = [];
const onSellHandlers = [];

function spend(amount: number): boolean {
	return chi.subtract(amount);
}

function earn(amount: number): boolean {
	return chi.add(amount);
}

function give(object: GameObject): boolean {
	return objects.remove(object);
}

function receive(object: GameObject): boolean {
	return objects.add(object);
}

export const player = {
	subscribe: store.subscribe,

	chi,

	objects,

	inventory,

	load(data: Save): void {
		objects.load(data.objects);
		chi.load(data.chi);
	},

	save(): Save {
		return {
			timestamp: Date.now(),
			chi: chi.save(),
			objects: objects.save()
		};
	},

	tick(delta: number): void {
		objects.tick(delta);
		earn(objects.generate(delta));
	},

	collect(): void {
		earn(1 + objects.collect());
		onCollectHandlers.forEach((handler) => handler());
	},

	buy(object: GameObject): boolean {
		const $inventory = get(inventory);
		const price = object.price($inventory[object.id]);

		if (spend(price)) {
			receive(object);
		}

		onBuyHandlers.forEach((handler) => handler());

		return false;
	},

	sell(object: GameObject): boolean {
		const $inventory = get(inventory);
		const price = object.price($inventory[object.id] - 1);

		if (give(object)) {
			earn(price * 0.25);
		}

		onSellHandlers.forEach((handler) => handler());

		return false;
	},

	onCollect(handler: () => unknown): void {
		onCollectHandlers.push(handler);
	},

	onBuy(handler: () => unknown): void {
		onBuyHandlers.push(handler);
	},

	onSell(handler: () => unknown): void {
		onSellHandlers.push(handler);
	}
};
