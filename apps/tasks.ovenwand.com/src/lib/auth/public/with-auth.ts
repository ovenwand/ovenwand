import { redirect, type Load, type LoadEvent } from '@sveltejs/kit';
import { useAuth } from '@ovenwand/auth';

export function withAuth<T extends Load>(forbiddenRoutes?: string[], resolve?: T): Load {
	const authorize = useAuth(forbiddenRoutes);

	return async (event: LoadEvent) => {
		const { parent, url } = event;
		const { session } = await parent();

		const { isAuthorized, redirectPath } = authorize(url, session);

		if (!isAuthorized) {
			const redirectUrl = new URL(redirectPath, url.origin);
			redirectUrl.searchParams.set('referer', url.toString());
			throw redirect(307, redirectUrl.toString());
		}

		return resolve ? resolve(event) : { session };
	};
}
