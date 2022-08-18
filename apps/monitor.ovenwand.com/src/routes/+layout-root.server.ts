import { VITE_FAUNA_ANONYMOUS_KEY } from '$env/static/private';
import { readSessionCookie } from '../lib/session';

type LoadEvent = import('./$types').LoadEvent;

export async function load(event: LoadEvent) {
	const session = readSessionCookie(event) ?? {
		id: null,
		token: VITE_FAUNA_ANONYMOUS_KEY
	};

	return {
		session
	};
}
