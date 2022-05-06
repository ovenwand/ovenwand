import { writable, type Writable } from 'svelte/store';
import { createStorage, isClient } from '@ovenwand/util.browser';

export interface ITask {
	id: string;
	title: string;
	description: string;
	done: boolean;
	labels: string[];
}

const storage = createStorage<ITask[]>('tasks', []);

export const tasks: Writable<ITask[]> = writable(isClient ? storage.read() : []);
