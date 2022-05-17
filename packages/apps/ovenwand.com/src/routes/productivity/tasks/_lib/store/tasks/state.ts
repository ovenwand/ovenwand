import { writable, type Writable } from 'svelte/store';
import type { Identifiable } from '$database';
import type { ILabel } from '../labels';

export interface ITask extends Identifiable {
	title: string;
	description: string;
	done: boolean;
	labels: ILabel['_id'][];
	[key: string]: unknown;
}

export const tasks: Writable<ITask[]> = writable([]);

export const labels: Writable<ILabel[]> = writable([]);
