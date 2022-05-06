import { createTask, copyTask } from './utils';
import type { ITask } from './state';

export type TaskMutation = ($tasks: ITask[]) => ITask[];

export function addTask(task: Partial<ITask>): TaskMutation {
	return ($tasks) => [...$tasks, createTask(task)];
}

export function updateTask(task: Partial<ITask>): TaskMutation {
	return ($tasks) => [...$tasks.filter((t) => t._id !== task._id), copyTask(task)];
}

export function addOrUpdateTask(task: Partial<ITask>): TaskMutation {
	return ($tasks) =>
		$tasks.find((t) => t._id === task._id) ? updateTask(task)($tasks) : addTask(task)($tasks);
}

export function removeTask(task: ITask): TaskMutation {
	return ($tasks) => $tasks.filter((t) => t._id !== task._id);
}
