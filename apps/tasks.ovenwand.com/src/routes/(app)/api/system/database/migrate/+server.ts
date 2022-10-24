import { json } from '@sveltejs/kit';
import { migrate } from '$lib/database';

export async function GET({ params, locals }: import('./$types').RequestEvent) {
	try {
		const result = await migrate(params.mode || 'merge', locals.token);
		console.log(result);
	} catch (e) {
		console.error(e);
	}

	return json({ data: 'ok' });
}
