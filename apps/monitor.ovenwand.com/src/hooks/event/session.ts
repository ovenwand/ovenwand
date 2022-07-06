import type { RequestEvent } from '@sveltejs/kit';
import { readSessionCookie } from '$lib/session';

export function useSession(event: RequestEvent) {
	const session = readSessionCookie(event);

	if (session) {
		event.locals.id = session.id;
		event.locals.token = session.token;
	} else {
		event.locals.token = import.meta.env.VITE_FAUNA_ANONYMOUS_KEY;
	}

	return event;
}
