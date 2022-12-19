import { derived } from 'svelte/store';
import { tasks } from './state';

export const open = derived(tasks, ($tasks) => $tasks.filter((task) => task.status === 'open'));

export const current = derived(
	tasks,
	($tasks) => $tasks.filter((task) => task.status === 'open')[0]
);

export const today = derived(tasks, ($tasks) => $tasks);
