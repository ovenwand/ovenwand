import { redirect, type Load, type LoadEvent } from '@sveltejs/kit';
import { useAuth } from '@ovenwand/auth';
import { setSession } from './session';

export function withAuth(forbiddenRoutes?: string[], resolve?: Load): Load {
	const authorize = useAuth(forbiddenRoutes);

	return async (event: LoadEvent) => {
		const { parent, url } = event;
		const { session } = await parent();

		setSession(session);

		const { isAuthorized, redirectPath } = authorize(url, session);

		if (!isAuthorized) {
			const redirectUrl = new URL(redirectPath, url.origin);
			redirectUrl.searchParams.set('referer', url.toString());
			throw redirect(307, redirectUrl.toString());
		}

		return resolve ? resolve(event) : { session };
	};
}
