import { mutate } from '$lib/database';
import { PartialUpdateTask } from '$lib/database/queries';

export const actions: import('./$types').Actions = {
	async markDone({ request }) {
		const body = await request.formData();
		const id = body.get('id');

		const { errors, data } = await mutate({
			mutation: PartialUpdateTask,
			variables: {
				id,
				data: {
					schedule: 'unscheduled',
					done: true
				}
			}
		});

		return { success: !!errors, errors, data };
	}
};
