import { redirect } from '@sveltejs/kit';

type LoadEvent = import('./$types').LoadEvent;

export async function load({ parent }: LoadEvent) {
	const { session } = await parent();

	if (session.id) {
		throw redirect(307, '/');
	}

	return {};
}
