import { writable, type Writable } from 'svelte/store';
import type { Identifiable } from '$database';

export interface ILabel extends Identifiable {
	name: string;
}

export const labels: Writable<ILabel[]> = writable([]);
