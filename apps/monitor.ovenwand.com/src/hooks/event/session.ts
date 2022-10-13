import type { RequestEvent } from '@sveltejs/kit';
import { readSessionToken } from '@ovenwand/auth';
import { PUBLIC_FAUNA_ANONYMOUS_KEY } from '$env/static/public';

export function useSession(event: RequestEvent) {
	const { cookies, locals } = event;
	const session = readSessionToken(cookies.get('session_id'));

	if (session) {
		locals.id = session.id;
		locals.token = session.token;
	} else {
		locals.token = PUBLIC_FAUNA_ANONYMOUS_KEY;
	}

	return event;
}
