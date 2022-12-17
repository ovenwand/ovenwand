import { redirect } from '@sveltejs/kit';
import { useTasks } from '$lib/database';

export async function load({ parent }: import('./$types').PageLoadEvent) {
	await parent();

	const tasks = useTasks();
	const { error, data } = await tasks.query.current();

	if (error?.message === 'Permission denied') {
		throw redirect(307, '/');
	}

	return {
		errors: [error],
		currentTask: data?.currentTask
	};
}
