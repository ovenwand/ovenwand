import { migrate } from '$lib/database/private';
import { invalid } from '@sveltejs/kit';

export const actions: import('./$types').Actions = {
	async migrate({ locals, request }) {
		const body = await request.formData();

		try {
			const result = await migrate(body.get('mode') ?? 'merge', locals.token);
			console.log(result);

			return {
				data: { message: 'Migrations successful' }
			};
		} catch (e) {
			console.error(e);

			return invalid(500, {
				error: {
					message: 'Migrations failed',
					stack: e.stack
				}
			});
		}
	}
};
