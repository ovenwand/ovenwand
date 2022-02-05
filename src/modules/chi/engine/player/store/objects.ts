import { createObjectStore } from '$modules/chi/util';
import type { ObjectStore } from '$modules/chi/util';
import type { GameObjectLifecycle, Save } from '$modules/chi/engine';
import * as objectMap from '$modules/chi/engine/objects';

const store = createObjectStore([]);

export const objects: GameObjectLifecycle<Save['objects']> & ObjectStore<unknown> = {
	...store,

	load(player, data) {
		store.clear();

		for (const { type, state } of data) {
			const object = objectMap[type];
			const instance = object.createInstance(player, state);
			store.add(instance);
		}
	},

	save() {
		return store.map((object) => ({
			type: object.type.id,
			state: object.save()
		}));
	},

	tick(delta) {
		store.forEach((instance) => instance.tick && instance.tick(delta));
	},

	generate(delta) {
		let generated = 0;

		store.forEach((instance) => {
			generated += instance.generate(delta);
		});

		return generated;
	},

	collect() {
		let collected = 0;

		store.forEach((instance) => {
			collected += instance.collect();
		});

		return collected;
	}
};
