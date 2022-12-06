import { json } from '@sveltejs/kit';
import { migrate } from '$lib/database';

export async function POST({ locals, request }: import('./$types').RequestEvent) {
	const body = await request.json();

	try {
		const result = await migrate(body.mode || 'merge', locals.token);
		console.log(result);
	} catch (e) {
		console.error(e);
	}

	return json({ data: 'ok' });
}
