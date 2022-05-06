import { uuid } from '@ovenwand/util.string';
import type { ITask } from './state';

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

export function copyTask(task: Partial<ITask>): ITask {
	return createTask({
		...task,
		labels: [...task.labels]
	});
}
