import { useNotifications } from '@ovenwand/ui';
import { addTask, removeTask, updateTask } from './mutations';
import { tasks, type ITask } from './state';

const { loading } = useNotifications();
const { update } = tasks;

export async function saveTask(task: Partial<ITask>): Promise<void> {
	const updateNotification = loading({ message: 'Saving task..' }, 3000);

	const body = JSON.stringify({
		_id: task._id,
		title: task.title,
		description: task.description,
		done: task.done,
		labels: task.labels
	});

	const method = task._id ? 'PATCH' : 'POST';

	let success = true;

	try {
		const response = await fetch('/', {
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
	} catch (e) {
		console.error(e);
		success = false;
	}

	if (success) {
		updateNotification({ type: 'success', message: 'Task saved' }, 3000);
	} else {
		updateNotification({ type: 'error', message: 'Failed to save task' }, 3000);
	}
}

export async function moveTask(task: ITask, fromLabel: string, toLabel: string): Promise<void> {
	if (fromLabel === toLabel || toLabel === null) {
		return;
	}

	const updateNotification = loading({ message: 'Moving task..' }, 3000);

	const body = JSON.stringify({
		_id: task._id,
		title: task.title,
		description: task.description,
		done: task.done,
		labels: [...task.labels.filter((l) => l !== fromLabel), toLabel]
	});

	let success = true;

	try {
		const response = await fetch('/', {
			method: 'PATCH',
			headers: {
				Accept: 'application/json'
			},
			body
		});

		const { data } = await response.json();

		update(updateTask(data));
	} catch (e) {
		console.error(e);
		success = false;
	}

	if (success) {
		updateNotification({ type: 'success', message: 'Task moved' }, 3000);
	} else {
		updateNotification({ type: 'error', message: 'Failed to move task' }, 3000);
	}
}

export async function deleteTask(task: ITask): Promise<void> {
	const updateNotification = loading({ message: 'Deleting task' }, 3000);

	const body = JSON.stringify({ id: task._id });

	let success = true;

	try {
		const response = await fetch('/', {
			method: 'DELETE',
			headers: {
				Accept: 'application/json'
			},
			body
		});

		const { data } = await response.json();

		update(removeTask(data));
	} catch (e) {
		console.error(e);
		success = false;
	}

	if (success) {
		updateNotification({ type: 'success', message: 'Task deleted' }, 3000);
	} else {
		updateNotification({ type: 'error', message: 'Failed to delete task' }, 3000);
	}
}
