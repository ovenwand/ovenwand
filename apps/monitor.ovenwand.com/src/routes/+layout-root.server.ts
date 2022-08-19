import { env } from '$env/dynamic/private';
import { readSessionCookie } from '../lib/session';

type LoadEvent = import('./$types').LoadEvent;

export async function load(event: LoadEvent) {
	const session = readSessionCookie(event) ?? {
		id: null,
		token: env.VITE_FAUNA_ANONYMOUS_KEY
	};

	return {
		session
	};
}
