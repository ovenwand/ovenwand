import { gql } from '@ovenwand/services.faunadb';
import { deleteSessionCookie } from '$lib/session';

export async function post() {
	const { errors } = await gql<{ errors?: unknown[] }>(
		`mutation Logout {
      logout(all: false)
    }`
	);

	if (errors) {
		return {
			status: 400,
			body: { errors }
		};
	}

	return {
		status: 302,
		headers: {
			Location: '/',
			'Set-Cookie': deleteSessionCookie()
		}
	};
}
