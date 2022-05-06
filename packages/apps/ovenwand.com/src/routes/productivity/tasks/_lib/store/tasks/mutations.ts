import { createTask, copyTask } from './utils';
import type { ITask } from './state';

export type TaskMutation = ($tasks: ITask[]) => ITask[];

export function addTask(task: Partial<ITask>): TaskMutation {
	return ($tasks: ITask[]) => [...$tasks, createTask(task)];
}

export function updateTask(task: Partial<ITask>): TaskMutation {
	return ($tasks: ITask[]) => [...$tasks.filter((t) => t.id !== task.id), copyTask(task)];
}

export function addOrUpdateTask(task: Partial<ITask>): TaskMutation {
	return ($tasks: ITask[]) =>
		$tasks.find((t) => t.id === task.id) ? updateTask(task)($tasks) : addTask(task)($tasks);
}
