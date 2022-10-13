import { json } from '@sveltejs/kit';
import { migrate } from '$lib/database';

export async function GET({ params, locals }: import('./$types').RequestEvent) {
	const result = await migrate(params.mode || 'merge', locals.token);

	console.log(result);

	return json({ data: 'ok' });
}
