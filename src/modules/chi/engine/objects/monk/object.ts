import type { GameObject } from '$modules/chi/engine';
import type { MonkState } from './model';
import { config } from './config';
import { createInstance } from './instance';

import monkFace from '$modules/chi/static/monk-face.svg?raw';

export const monk: GameObject<MonkState> = {
	id: 'monk',
	name: 'Monk',
	description: 'Some peaceful monk',
	icon: monkFace,
	price(player, amount) {
		return config.price * (1 + amount);
	},
	stock() {
		return config.stock;
	},
	createInstance(player, state) {
		return createInstance(player, monk, state);
	}
};
