import type { Load, LoadEvent, LoadOutput } from '@sveltejs/kit';

export function useAuth(forbiddenRoutes?: string[], resolve?: Load): Load {
	function forbidden(pathname: string) {
		return forbiddenRoutes ? forbiddenRoutes.find((f) => pathname.startsWith(f)) : true;
	}

	return async (event: LoadEvent): Promise<LoadOutput> => {
		const { session, url } = event;

		if (!session.id && forbidden(url.pathname)) {
			return {
				status: 302,
				redirect: '/auth/login'
			};
		}

		return resolve ? resolve(event) : {};
	};
}
