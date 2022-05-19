import { writable, type Writable } from 'svelte/store';
import type { Identifiable } from '@ovenwand/services.faunadb';

export interface ILabel extends Identifiable {
	name: string;
}

export const labels: Writable<ILabel[]> = writable([]);
