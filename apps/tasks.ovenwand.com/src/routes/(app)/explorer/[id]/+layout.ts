import { get } from 'svelte/store';
import { useTasks } from '$lib/store';

export async function load({ params, fetch }: import('./$types').LayoutLoadEvent) {
	const { get: getTaskById } = useTasks();
	const { task, request } = getTaskById(params.id, { shouldFetch: true, fetch });

	await request;

	return {
		task: get(task)
	};
}
