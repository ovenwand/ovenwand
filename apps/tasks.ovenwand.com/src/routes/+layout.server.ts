import { getSession } from '$lib/auth';

export async function load({ locals }: import('./$types').LayoutServerLoadEvent) {
	return {
		session: getSession(),
		referrer: locals.referrer.toString()
	};
}
