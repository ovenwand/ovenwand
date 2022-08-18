import type { RequestEvent } from '@sveltejs/kit';
import { gql } from '$lib/database';
import { deleteSessionCookie } from '$lib/session';

export async function POST({ setHeaders }: RequestEvent) {
	const { errors } = await gql<{ errors?: unknown[] }>(
		`mutation Logout {
      logout(all: false)
    }`
	);

	if (errors) {
		return {
			status: 400,
			errors
		};
	}

	setHeaders({
		'Set-Cookie': deleteSessionCookie()
	});

	return {
		location: '/'
	};
}
