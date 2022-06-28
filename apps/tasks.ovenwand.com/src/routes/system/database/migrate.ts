import { migrate } from '$lib/database';

export async function get() {
	await migrate();

	return {
		status: 200,
		body: {
			data: 'ok'
		}
	};
}
