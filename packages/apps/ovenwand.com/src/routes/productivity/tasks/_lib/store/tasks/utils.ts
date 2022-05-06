import type { ITask } from './state';

export function createTask(task: Partial<ITask> = {}): ITask {
	return {
		_id: null,
		title: 'Default title',
		description: 'Default description',
		done: false,
		labels: [],
		...task
	};
}

export function copyTask(task: Partial<ITask>): ITask {
	return createTask({
		...task,
		labels: [...task.labels]
	});
}
