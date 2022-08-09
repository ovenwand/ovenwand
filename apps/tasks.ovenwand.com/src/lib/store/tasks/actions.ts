import { derived, writable } from 'svelte/store';
import { isBoolean, isNull, noop } from '@ovenwand/util';
import { useNotifications } from '@ovenwand/ui';
import { browser } from '$app/env';
import { addOrUpdateTask, addTask, removeTask, type TaskMutation, updateTask } from './mutations';
import { tasks, type ITask } from './state';

const { loading } = useNotifications();
const { update: _update } = tasks;

let hasCache = false;

const update = (mutation: TaskMutation) => {
	return _update(($tasks) => {
		hasCache = !!$tasks.length;
		return mutation($tasks);
	});
};

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
	if (fromLabel === toLabel || isNull(toLabel)) {
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

export function getTasks(shouldFetch?: boolean) {
	const cache = { subscribe: tasks.subscribe };
	const loading = writable(true);

	shouldFetch = isBoolean(shouldFetch) ? shouldFetch : browser;

	const tasksOrPlaceholders = derived([loading, cache], ([$loading, $cache]) => {
		if ($loading && !hasCache) {
			return [{}, {}, {}];
		}

		return $cache;
	});

	let response: Response;

	const request =
		browser || shouldFetch
			? fetch('/tasks', { headers: { accept: 'application/json' } })
					.then((res) => (response = res))
					.then((res) => res.json())
					.then((data) => data.data.tasks)
					.then(($tasks) => {
						loading.set(false);

						for (const task of $tasks) {
							update(addOrUpdateTask(task));
						}

						return response;
					})
			: new Promise(noop);

	return {
		loading: { subscribe: loading.subscribe },
		tasks: { subscribe: tasksOrPlaceholders.subscribe },
		request,
		cache
	};
}
