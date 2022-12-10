import { useTasks } from '$lib/database';

export async function load({ params, parent }: import('./$types').LayoutLoadEvent) {
	await parent();

	const tasks = useTasks();

	const { error, data } = await tasks.query.byId(params.id);

	return {
		errors: [error],
		task: data.findTaskByID
	};
}
