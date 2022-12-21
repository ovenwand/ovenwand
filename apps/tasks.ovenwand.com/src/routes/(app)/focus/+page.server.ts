import { redirect } from '@sveltejs/kit';
import { route } from '$lib/route';
import { tasks } from '$lib/models';

export const actions: import('./$types').Actions = {
	async markDone({ request }) {
		const body = await request.formData();
		const id = body.get('id');

		const { error, data } = await tasks.mutate.update(id, { status: 'closed' });

		if (!error) {
			throw redirect(307, route('/focus/done'));
		}

		return { errors: [error], data };
	}
};
