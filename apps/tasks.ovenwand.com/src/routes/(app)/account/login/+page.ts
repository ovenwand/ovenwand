import { redirect, type LoadEvent } from '@sveltejs/kit';

export async function load({ parent }: LoadEvent) {
	const { referrer, session } = await parent();

	if (session.id) {
		throw redirect(307, referrer);
	}

	return {};
}
