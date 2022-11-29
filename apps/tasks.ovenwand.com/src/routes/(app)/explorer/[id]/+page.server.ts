import { mutate } from '$lib/database';
import { PartialUpdateTask } from '$lib/database/queries';

export const actions: import('./$types').Actions = {
	async saveTask({ params, request }) {
		const body = Array.from(await request.formData()).reduce<Record<string, FormDataEntryValue>>(
			(input, [key, value]) => {
				input[key] = value;
				return input;
			},
			{}
		);

		const { errors, data } = await mutate({
			mutation: PartialUpdateTask,
			variables: {
				id: params.id,
				data: { ...body }
			}
		});

		return { success: !!errors, errors, data };
	}
};
