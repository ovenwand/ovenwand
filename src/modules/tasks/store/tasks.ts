import { writable } from 'svelte/store';

export interface ITask {
	title: string;
	description: string;
	done: boolean;
	labels: string[];
}

export const tasks = writable([]);

export function createTask(task: Partial<ITask>): ITask {
	return {
		title: 'Default title',
		description: 'Default description',
		done: false,
		labels: [],
		...task
	};
}

export function addTask(task: Partial<ITask>): void {
	tasks.update(($tasks) => [...$tasks, createTask(task)]);
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
