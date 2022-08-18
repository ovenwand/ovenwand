import { migrate } from '$lib/database';

export async function GET() {
	await migrate();

	return {
		status: 200,
		body: {
			data: 'ok'
		}
	};
}
