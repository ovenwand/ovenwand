import type { RequestEvent } from '@sveltejs/kit';
import { PUBLIC_FAUNA_ANONYMOUS_KEY } from '$env/static/public';
import { readSessionCookie } from '$lib/session';

export function useSession(event: RequestEvent) {
	const session = readSessionCookie(event);

	if (session) {
		event.locals.id = session.id;
		event.locals.token = session.token;
	} else {
		event.locals.token = PUBLIC_FAUNA_ANONYMOUS_KEY;
	}

	return event;
}
