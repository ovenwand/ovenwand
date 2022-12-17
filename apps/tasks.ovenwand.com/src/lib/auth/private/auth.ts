import type { Handle } from '@sveltejs/kit';
import { readSessionToken, type WithSessionOptions } from '@ovenwand/auth/node';
import { setSession } from '../public';

export function Auth(options: WithSessionOptions): Handle {
	const { anonymous = null, cookie = 'session_id' } = options;

	return ({ event, resolve }) => {
		const { cookies, locals } = event;
		const session = readSessionToken(cookies.get(cookie));

		if (session) {
			locals.id = session.id;
			locals.token = session.token;
		} else {
			locals.token = anonymous;
		}

		setSession({ id: event.locals.id, token: event.locals.token });

		return resolve(event);
	};
}
