import { derived } from 'svelte/store';
import * as objectMap from '$modules/chi/engine/objects';
import * as buildingMap from '$modules/chi/engine/buildings';
import { buildings } from './buildings';
import { objects } from './objects';

export const inventory = derived([buildings, objects], ([$buildings, $objects]) => {
	const $inventory = [...Object.keys(objectMap), ...Object.keys(buildingMap)].reduce(
		(inventory, id) => {
			inventory[id] = 0;
			return inventory;
		},
		{}
	);

	for (const object of [...$buildings, ...$objects]) {
		$inventory[object.type.id]++;
	}

	return $inventory;
});
