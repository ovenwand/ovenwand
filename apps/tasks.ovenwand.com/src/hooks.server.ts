import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { withSession } from '@ovenwand/auth/node';
import { PUBLIC_FAUNA_ANONYMOUS_KEY } from '$env/static/public';
import { setSession } from '$lib/session';
import { withReferrer } from '$lib/referrer';

export const handle: Handle = sequence(
	async ({ event, resolve }) => resolve(withReferrer(event)),
	async ({ event, resolve }) =>
		resolve(
			withSession(event, {
				anonymous: PUBLIC_FAUNA_ANONYMOUS_KEY
			})
		),
	({ event, resolve }) => {
		setSession({ id: event.locals.id, token: event.locals.token });
		return resolve(event);
	}
);
