import type { ITask } from '../model';

export function createTask(task: Partial<ITask> = {}): ITask {
	return {
		_id: '',
		title: '',
		description: '',
		order: 0,
		dueDate: '1970-01-01T00:00:00.000Z',
		status: 'open',
		...task
	};
}

export function copyTask(task: Partial<ITask>): ITask {
	return createTask({ ...task });
}

export function findTaskById($tasks: ITask[], id: unknown): ITask {
	const $task = $tasks.find(($task) => $task.id === id);

	if (!$task) {
		throw new Error(`Task with id "${id}" not found.`);
	}

	return $task;
}
