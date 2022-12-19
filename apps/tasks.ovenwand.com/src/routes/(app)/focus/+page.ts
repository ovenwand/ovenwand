import { redirect } from '@sveltejs/kit';
import { tasks } from '$lib/models';

export async function load() {
	const { error, data } = await tasks.query.current();

	if (error?.message === 'Permission denied') {
		throw redirect(307, '/');
	}

	return {
		errors: [error],
		currentTask: data?.currentTask
	};
}
