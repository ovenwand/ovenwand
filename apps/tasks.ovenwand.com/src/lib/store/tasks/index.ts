import { derived, type Readable } from 'svelte/store';
import { isClient } from '@ovenwand/env';
import { createStorage } from '@ovenwand/util';
import { createTask, copyTask, findTaskById } from './utils';
import { type ITask, tasks } from './state';
import { addOrUpdateTask } from './mutations';
import { saveTask, moveTask, deleteTask, getTask, getTasks, getCurrentTask } from './actions';

const storage = createStorage<ITask[]>('tasks', []);

const { subscribe, update } = tasks;

subscribe(($tasks) => isClient && storage.set($tasks));

export { type ITask, type ITaskData } from './state';

export interface ITasksStore {
	tasks: Readable<ITask[]>;
	create: typeof createTask;
	copy: typeof copyTask;
	save: typeof saveTask;
	move: typeof moveTask;
	delete: typeof deleteTask;
	get: typeof getTask;
	all: typeof getTasks;
	current: typeof getCurrentTask;
}

export interface ITasksStoreOptions {
	sort?: (a: ITask, b: ITask) => number;
}

export function useTasks(
	data: Partial<ITask>[] = [],
	options: ITasksStoreOptions = {}
): ITasksStore {
	const tasks = derived([{ subscribe }], ([$tasks]) => {
		return $tasks.sort(
			options.sort ||
				((a, b) => {
					if (a.dueDate === b.dueDate) {
						return 0;
					}
					if (a.dueDate < b.dueDate) {
						return -1;
					}

					return 1;
				})
		);
	});

	for (const task of data) {
		update(addOrUpdateTask(task));
	}

	return {
		tasks,
		create: createTask,
		copy: copyTask,
		save: saveTask,
		move: moveTask,
		delete: deleteTask,
		get: getTask,
		all: getTasks,
		current: getCurrentTask
	};
}
