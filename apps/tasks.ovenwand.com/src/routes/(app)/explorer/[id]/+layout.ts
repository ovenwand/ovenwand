import { tasks } from '$lib/models';

export async function load({ params, parent }: import('./$types').LayoutLoadEvent) {
	await parent();

	const { error, data } = await tasks.query.byId(params.id);

	return {
		errors: [error],
		task: data.findTaskByID
	};
}
