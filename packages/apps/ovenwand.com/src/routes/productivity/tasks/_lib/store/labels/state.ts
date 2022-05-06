import { writable, type Writable } from 'svelte/store';

export interface Identifiable {
	_id: string;
}

export interface ILabel extends Identifiable {
	name: string;
}

export const labels: Writable<ILabel[]> = writable([]);
