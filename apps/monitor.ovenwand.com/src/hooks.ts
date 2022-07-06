import type { GetSession, Handle, RequestEvent } from '@sveltejs/kit';
import { readSessionCookie } from '$lib/session';

export const handle: Handle = async ({ event, resolve }) => {
	const session = readSessionCookie(event);

	if (session) {
		event.locals.id = session.id;
		event.locals.token = session.token;
	} else {
		event.locals.token = import.meta.env.VITE_FAUNA_ANONYMOUS_KEY;
	}

	const response = await resolve(event);

	return response;
};

export const getSession: GetSession = async ({ locals }: RequestEvent) => {
	return {
		id: locals.id,
		token: locals.token
	};
};
