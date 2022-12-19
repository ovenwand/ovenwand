import { tasks } from '$lib/models';
import { redirect } from '@sveltejs/kit';

export const actions: import('./$types').Actions = {
	async markDone({ request }) {
		const body = await request.formData();
		const id = body.get('id');

		const { error, data } = await tasks.mutate.update(id, { status: 'closed' });

		if (!error) {
			throw redirect(307, '/focus/done');
		}

		return { errors: [error], data };
	}
};
