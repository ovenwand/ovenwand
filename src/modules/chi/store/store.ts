import { writable } from 'svelte/store';
import type { GameObject } from '$modules/chi/engine/model';
import * as objects from '$modules/chi/engine/objects';
import type { Player } from '$modules/chi/store/player/player';

const inventory = writable(Object.values(objects));

export const store = {
	subscribe: inventory.subscribe,

	buy(player: Player, object: GameObject): boolean {
		const amount = 20;

		if (player.spend(amount)) {
			player.receive(object);
			return true;
		}

		return false;
	},

	sell(player: Player, object: GameObject): boolean {
		const amount = 123;

		if (player.earn(amount)) {
			player.give(object);
			return true;
		}

		return false;
	}
};
