import { useTasks } from '$lib/database';

export const actions: import('./$types').Actions = {
	async markDone({ request }) {
		const tasks = useTasks();
		const body = await request.formData();
		const id = body.get('id');

		const { error, data } = await tasks.mutate.update(id, { status: 'closed' });

		return { success: !!error, errors: [error], data };
	}
};
