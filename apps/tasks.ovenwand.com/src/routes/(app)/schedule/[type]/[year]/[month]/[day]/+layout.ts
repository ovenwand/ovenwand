import { get } from 'svelte/store';
import { useTasks } from '$lib/store';

export async function load({ fetch, params }: import('./$types').LayoutLoadEvent) {
	const { day, month, year, type, task } = params;
	const { byDate: getTasksByDate } = useTasks();

	const { tasksByDate, request } = getTasksByDate(type, year, month, day, { shouldFetch: true, fetch });

	await request;

	return {
		year,
		month,
		day,
		type,
		task,
		tasks: get(tasksByDate),
	};
}
