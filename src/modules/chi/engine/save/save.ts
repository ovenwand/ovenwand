import { createStorage, encode } from '$lib/util';
import type { Save } from './model';

const AUTO_SAVE_INTERVAL = 5000;

const namespace = encode('ovenwand/chi');

const storage = createStorage<Save>(namespace, {
	timestamp: 0,
	chi: {
		bank: 0,
		total: 0
	},
	objects: []
});

export function load(): Save {
	return storage.read();
}

export function persist(data: Partial<Save>): void {
	return storage.update(data);
}

export function wipe(): boolean {
	const result = storage.clean();
	onWipeHandlers.forEach((handler) => handler(load()));
	return result;
}

let timeSinceLastSave = 0;
export function autosave(delta: number, getData: () => Save): void {
	timeSinceLastSave += delta;

	if (timeSinceLastSave >= AUTO_SAVE_INTERVAL) {
		persist(getData());
		timeSinceLastSave = 0;
	}
}

const onWipeHandlers = [];
export function onWipe(handler: (data: Save) => unknown): void {
	onWipeHandlers.push(handler);
}
