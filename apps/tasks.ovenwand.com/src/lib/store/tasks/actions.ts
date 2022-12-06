import { derived, writable } from 'svelte/store';
import { isBoolean, isNull, noop } from '@ovenwand/util';
import { useNotifications } from '@ovenwand/ui';
import { browser } from '$app/environment';
import { addOrUpdateTask, type TaskMutation } from './mutations';
import { tasks, type ITask } from './state';
import { createTask } from './utils';

type Fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

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

	const body = JSON.stringify(task);

	const method = task._id ? 'PATCH' : 'POST';

	let success = true;

	try {
		await fetch('/api/tasks', {
			method,
			headers: {
				Accept: 'application/json'
			},
			body
		});
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
		await fetch('/api/tasks', {
			method: 'PATCH',
			headers: {
				Accept: 'application/json'
			},
			body
		});
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
		await fetch('/api/tasks', {
			method: 'DELETE',
			headers: {
				Accept: 'application/json'
			},
			body
		});
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

export function getTask(
	id: string,
	{ shouldFetch, fetch }: { shouldFetch?: boolean; fetch: Fetch }
) {
	const cache = derived([tasks], ([$tasks]) => $tasks.find((task) => task._id === id));
	const loading = writable(false);
	const task = derived([loading, cache], ([$loading, $cache]) => {
		if ($loading && !$cache) {
			return createTask();
		}

		return $cache;
	});

	shouldFetch = isBoolean(shouldFetch) ? shouldFetch : browser;

	let response: Response;

	const request = shouldFetch
		? fetch(`/api/tasks/${id}`)
				.then((res) => (response = res))
				.then((res) => res.json())
				.then((data) => data.data)
				.then(($task) => {
					loading.set(false);

					update(addOrUpdateTask($task));

					return response;
				})
		: new Promise(noop);

	return {
		loading: { subscribe: loading.subscribe },
		task: { subscribe: task.subscribe },
		request,
		cache
	};
}

export function getTasks(shouldFetch?: boolean) {
	const cache = { subscribe: tasks.subscribe };
	const loading = writable(true);

	shouldFetch = isBoolean(shouldFetch) ? shouldFetch : browser;

	const tasksOrPlaceholders = derived([loading, cache], ([$loading, $cache]) => {
		if ($loading && !hasCache) {
			return [createTask(), createTask(), createTask()];
		}

		return $cache;
	});

	let response: Response;

	const request =
		browser || shouldFetch
			? fetch('/api/tasks', { headers: { accept: 'application/json' } })
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

export function getCurrentTask({ shouldFetch, fetch }: { shouldFetch?: boolean; fetch: any }) {
	const cache = derived([tasks], ([$tasks]) => $tasks.find((task) => !task.done));
	const loading = writable(true);
	const currentTask = derived([loading, cache], ([$loading, $cache]) => {
		if ($loading && !$cache) {
			return createTask();
		}

		return $cache;
	});

	shouldFetch = isBoolean(shouldFetch) ? shouldFetch : browser;

	let response: Response;

	const request =
		browser || shouldFetch
			? fetch('/api/focus/current')
					.then((res) => (response = res))
					.then((res) => res.json())
					.then((data) => data.data)
					.then(($task) => {
						loading.set(false);

						if ($task) {
							update(addOrUpdateTask($task));
						}

						return response;
					})
			: new Promise(noop);

	return {
		loading: { subscribe: loading.subscribe },
		currentTask: { subscribe: currentTask.subscribe },
		request,
		cache
	};
}

export function getTasksByDate(
	type: string,
	year: string,
	month: string,
	day: string,
	{ shouldFetch, fetch }: { shouldFetch?: boolean; fetch: any }
) {
	const cache = { subscribe: tasks.subscribe };
	const loading = writable(true);
	const tasksByDate = derived([loading, cache], ([$loading, $cache]) => {
		if ($loading && !$cache) {
			return [createTask(), createTask(), createTask()];
		}

		return $cache;
	});

	shouldFetch = isBoolean(shouldFetch) ? shouldFetch : browser;

	let response: Response;

	const request =
		browser || shouldFetch
			? fetch(`/api/schedule/${type}/${year}/${month}/${day}`)
					.then((res) => (response = res))
					.then((res) => res.json())
					.then((data) => data.data)
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
		tasksByDate: { subscribe: tasksByDate.subscribe },
		request,
		cache
	};
}
