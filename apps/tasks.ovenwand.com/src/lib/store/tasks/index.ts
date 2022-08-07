import { derived, type Readable } from 'svelte/store';
import { isClient } from '@ovenwand/env';
import { createStorage } from '@ovenwand/util';
import { createTask, copyTask, findTaskById } from './utils';
import { type ITask, tasks } from './state';
import { addOrUpdateTask } from './mutations';
import { saveTask, moveTask, deleteTask, getTasks } from './actions';

const storage = createStorage<ITask[]>('tasks', []);

const { subscribe, update } = tasks;

subscribe(($tasks) => isClient && storage.set($tasks));

export { type ITask, type ITaskData } from './state';

export interface ITasksStore<State extends ITask[] = ITask[]> {
	tasks: Readable<State>;
	create: typeof createTask;
	copy: typeof copyTask;
	save: typeof saveTask;
	move: typeof moveTask;
	delete: typeof deleteTask;
	all: typeof getTasks;
}

export interface ITaskStore<State extends ITask = ITask> {
	tasks: ITasksStore<State[]>;
	task: Readable<State>;
}

export function useTasks(data: Partial<ITask>[] = []): ITasksStore {
	for (const task of data) {
		update(addOrUpdateTask(task));
	}

	return {
		tasks: { subscribe },
		create: createTask,
		copy: copyTask,
		save: saveTask,
		move: moveTask,
		delete: deleteTask,
		all: getTasks
	};
}

export function useTask(data: Partial<ITask>): ITaskStore {
	const store = useTasks([data]);
	const task = derived(store.tasks, ($tasks) => findTaskById($tasks, data.id), data as ITask);

	return {
		tasks: store,
		task: { subscribe: task.subscribe }
	};
}
