import { useTasks } from '$lib/database';

export async function load({ parent }: import('./$types').PageLoadEvent) {
	await parent();

	const tasks = useTasks();
	const { error, data } = await tasks.query.current();

	return {
		errors: [error],
		tasks: [data.currentTask].filter(Boolean)
	};
}
