import type { ITask } from './state';

export function createTask(task: Partial<ITask> = {}): ITask {
	return {
		_id: '',
		title: '',
		description: '',
		priority: 0,
		businessValue: 0,
		size: 0,
		dueDate: '1970-01-01T00:00:00.000Z',
		done: false,
		schedule: 'unscheduled',
		labels: [],
		...task
	};
}

export function copyTask(task: Partial<ITask>): ITask {
	return createTask({
		...task,
		labels: task.labels ? [...task.labels] : []
	});
}

export function findTaskById($tasks: ITask[], id: unknown): ITask {
	const $task = $tasks.find(($task) => $task.id === id);

	if (!$task) {
		throw new Error(`Task with id "${id}" not found.`);
	}

	return $task;
}
