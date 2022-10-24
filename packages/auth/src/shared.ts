export function useAuth(forbiddenRoutes?: string[]) {
	function forbidden(pathname: string) {
		return forbiddenRoutes
			? forbiddenRoutes.find((forbiddenRoute) => pathname === forbiddenRoute)
			: true;
	}

	function authorize(url, session) {
		const isForbidden = !session?.id && forbidden(url.pathname);
		return !isForbidden;
	}

	return (url, session, redirectPath = '/account/login') => ({
		isAuthorized: authorize(url, session),
		redirectPath
	});
}
