import type { GetSession } from '@sveltejs/kit';

export const getSession: GetSession = async ({ request }) => {
	const referer = request.headers.get('referer');
	return { referer };
};
