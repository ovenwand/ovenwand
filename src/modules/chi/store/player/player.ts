import { derived, get } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { Save, GameObject } from '$modules/chi/engine';
import { chi } from './chi';
import { objects } from './objects';

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

const store = derived([chi, objects], ([$chi, $objects]) => ({
	chi: $chi,
	objects: $objects
}));

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

	generate(delta: number): void {
		earn(objects.generate(delta));
	},

	collect(): void {
		earn(1 + objects.collect());
		onCollectHandlers.forEach((handler) => handler());
	},

	buy(object: GameObject): boolean {
		const $inventory = get(objects.inventory);
		const price = object.price($inventory[object.id]);

		if (spend(price)) {
			receive(object);
		}

		onBuyHandlers.forEach((handler) => handler());

		return false;
	},

	sell(object: GameObject): boolean {
		const $inventory = get(objects.inventory);
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
