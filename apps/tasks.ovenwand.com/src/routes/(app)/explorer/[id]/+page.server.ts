import { redirect } from '@sveltejs/kit';
import { useTasks } from '$lib/database';

export const actions: import('./$types').Actions = {
	async saveTask({ params, request }) {
		const tasks = useTasks();
		const formData = Object.fromEntries(await request.formData());

		const { error, data } = await tasks.mutate.update(params.id, formData);

		return { success: !!error, errors: [error], data };
	},
	async deleteTask({ params }) {
		const tasks = useTasks();

		const { error, data } = await tasks.mutate.delete({
			_id: params.id
		});

		if (!error) {
			throw redirect(307, '/explorer');
		}

		return { success: !!error, errors: [error], data };
	}
};
