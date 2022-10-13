import { readSessionToken } from '@ovenwand/auth';
import { PUBLIC_FAUNA_ANONYMOUS_KEY } from '$env/static/public';

export async function load({ cookies }: import('./$types').LayoutServerLoadEvent) {
	const session = readSessionToken(cookies.get('session_id')) ?? {
		id: null,
		token: PUBLIC_FAUNA_ANONYMOUS_KEY
	};

	return {
		session
	};
}
