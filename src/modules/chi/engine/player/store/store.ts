import { derived } from 'svelte/store';
import { chi } from './chi';
import { objects } from './objects';
import { buildings } from './buildings';

export const store = derived([chi, objects, buildings], ([$chi, $objects, $buildings]) => ({
	chi: $chi,
	objects: $objects,
	buildings: $buildings
}));
