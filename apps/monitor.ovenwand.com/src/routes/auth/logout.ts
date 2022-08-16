import { gql } from '$lib/database';
import { deleteSessionCookie } from '$lib/session';

export async function POST() {
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
