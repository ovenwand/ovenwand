import { getSession } from '$lib/session';

export async function load({ locals }: import('./$types').LayoutServerLoadEvent) {
	return {
		session: getSession(),
		referrer: locals.referrer.toString()
	};
}
