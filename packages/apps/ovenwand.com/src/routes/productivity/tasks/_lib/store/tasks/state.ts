import { writable, type Writable } from 'svelte/store';
import type { ILabel } from '../labels';

export interface ITask {
	_id: string;
	title: string;
	description: string;
	done: boolean;
	labels: ITask['_id'][];
}

export const tasks: Writable<ITask[]> = writable([]);

export const labels: Writable<ILabel[]> = writable([]);
