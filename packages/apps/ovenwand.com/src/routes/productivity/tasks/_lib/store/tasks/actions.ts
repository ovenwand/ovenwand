import { addTask, removeTask, updateTask } from './mutations';
import { tasks, type ITask } from './state';

const { update } = tasks;

export async function saveTask(task: Partial<ITask>): Promise<void> {
	const body = JSON.stringify({
		_id: task._id,
		title: task.title,
		description: task.description,
		done: task.done,
		labels: task.labels
	});

	const method = task._id ? 'PATCH' : 'POST';

	const response = await fetch('/productivity/tasks', {
		method,
		headers: {
			Accept: 'application/json'
		},
		body
	});

	const { data } = await response.json();

	if (task._id) {
		update(updateTask(data));
	} else {
		update(addTask(data));
	}
}

export async function moveTask(task: ITask, fromLabel: string, toLabel: string): Promise<void> {
	if (fromLabel === toLabel || toLabel === null) {
		return;
	}

	const body = JSON.stringify({
		_id: task._id,
		title: task.title,
		description: task.description,
		done: task.done,
		labels: [...task.labels.filter((l) => l !== fromLabel), toLabel]
	});

	const response = await fetch('/productivity/tasks', {
		method: 'PATCH',
		headers: {
			Accept: 'application/json'
		},
		body
	});

	const { data } = await response.json();

	update(updateTask(data));
}

export async function deleteTask(task: ITask): Promise<void> {
	const body = JSON.stringify({ id: task._id });

	const response = await fetch('/productivity/tasks', {
		method: 'DELETE',
		headers: {
			Accept: 'application/json'
		},
		body
	});

	const { data, errors } = await response.json();

	if (!errors) {
		update(removeTask(data));
	}
}
