import { get } from 'svelte/store';
import { useTasks } from '../../lib/store';

export async function load({ fetch }: import('./$types').PageLoadEvent) {
	const { current: getCurrentTask } = useTasks();
	const { currentTask, request } = getCurrentTask({ shouldFetch: true, fetch });

	await request;

	return {
		tasks: [get(currentTask)]
	};
}
