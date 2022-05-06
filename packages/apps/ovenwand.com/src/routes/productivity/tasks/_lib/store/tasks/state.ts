import { writable, type Writable } from 'svelte/store';
import { createStorage, isClient } from '@ovenwand/util.browser';
import type { ILabel } from '../labels';

export interface ITask {
	_id: string;
	title: string;
	description: string;
	done: boolean;
	labels: ITask['_id'][];
}

const storage = createStorage<ITask[]>('tasks', []);

export const tasks: Writable<ITask[]> = writable([]);

export const labels: Writable<ILabel[]> = writable([]);
