import type { Readable } from 'svelte/store';
import { isClient } from '@ovenwand/env';
import { createStorage } from '@ovenwand/util';
import { createTask, copyTask } from './utils';
import { type ITask, tasks } from './state';
import { addOrUpdateTask } from './mutations';
import { saveTask, moveTask, deleteTask } from './actions';

const storage = createStorage<ITask[]>('tasks', []);

const { subscribe, update } = tasks;

subscribe(($tasks) => isClient && storage.set($tasks));

export { type ITask } from './state';

export interface ITaskStore<State extends ITask[] = ITask[]> {
	tasks: Readable<State>;
	create: typeof createTask;
	copy: typeof copyTask;
	save: typeof saveTask;
	move: typeof moveTask;
	delete: typeof deleteTask;
}

export function useTasks(data: Partial<ITask>[] = []): ITaskStore {
	for (const task of data) {
		update(addOrUpdateTask(task));
	}

	return {
		tasks: { subscribe },
		create: createTask,
		copy: copyTask,
		save: saveTask,
		move: moveTask,
		delete: deleteTask
	};
}
