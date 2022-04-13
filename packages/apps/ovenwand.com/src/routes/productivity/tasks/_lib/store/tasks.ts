import { writable } from 'svelte/store';
import { uuid } from '@ovenwand/util.string';
import { createStorage, isClient } from '@ovenwand/util.browser';

const storage = createStorage<ITask[]>('tasks', []);

export interface ITask {
	id: string;
	title: string;
	description: string;
	done: boolean;
	labels: string[];
}

export const tasks = writable(isClient ? storage.read() : []);

tasks.subscribe(($tasks) => isClient && storage.set($tasks));

export function createTask(task: Partial<ITask> = {}): ITask {
	return {
		id: uuid(),
		title: 'Default title',
		description: 'Default description',
		done: false,
		labels: [],
		...task
	};
}

export function saveTask(task: ITask | Partial<ITask>): void {
	tasks.update(($tasks) => {
		if ($tasks.find((t) => t.id === task.id)) {
			return [...$tasks.filter((t) => t.id !== task.id), copyTask(task as ITask)];
		}

		return [...$tasks, createTask(task)];
	});
}

export function copyTask(task: ITask): ITask {
	return createTask({
		...task,
		labels: [...task.labels]
	});
}

export function moveTask(task: ITask, fromLabel: string, toLabel: string): void {
	if (fromLabel === toLabel || toLabel === null) {
		return;
	}

	const newLabels = [...task.labels.filter((l) => l !== fromLabel), toLabel];

	tasks.update(($tasks) => [
		...$tasks.filter((t) => t !== task),
		copyTask({ ...task, labels: newLabels })
	]);
}
