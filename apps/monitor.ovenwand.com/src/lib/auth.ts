import { redirect } from '@sveltejs/kit';

type LayoutLoad = import('./$types').LayoutLoad;
type LoadEvent = import('./$types').LoadEvent;

export function useAuth(forbiddenRoutes?: string[], resolve?: LayoutLoad): LayoutLoad {
	function forbidden(pathname: string) {
		return forbiddenRoutes ? forbiddenRoutes.find((f) => pathname.startsWith(f)) : true;
	}

	return async ({ url, parent }: LoadEvent): Promise<unknown> => {
		const { session } = await parent();

		if (!session.id && forbidden(url.pathname)) {
			throw redirect(307, '/auth/login');
		}

		return resolve ? resolve(event) : {};
	};
}
