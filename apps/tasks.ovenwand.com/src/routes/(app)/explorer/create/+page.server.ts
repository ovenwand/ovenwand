import { redirect } from '@sveltejs/kit';
import { tasks } from '$lib/models';

export const actions: import('./$types').Actions = {
	async createTask({ request }) {
		const body = Array.from<[string, FormDataEntryValue]>(await request.formData()).reduce<
			Record<string, FormDataEntryValue>
		>((input, [key, value]) => {
			input[key] = value;
			return input;
		}, {});

		const { error, data } = await tasks.mutate.create({
			...body,
			order: 0,
			status: 'open'
		});

		if (data) {
			throw redirect(307, `/explorer/${data.createTask._id}`);
		}

		return { success: !!error, errors: [error], data };
	}
};
