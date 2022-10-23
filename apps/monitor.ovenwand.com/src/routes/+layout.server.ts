export async function load({ locals }: import('./$types').LayoutServerLoadEvent) {
	return {
		session: {
			id: locals.id,
			token: locals.token
		},
		referrer: locals.referrer.toString()
	};
}
