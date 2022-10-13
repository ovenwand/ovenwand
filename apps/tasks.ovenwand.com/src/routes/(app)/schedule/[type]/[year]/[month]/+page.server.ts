import { redirect } from '@sveltejs/kit';
import { getScheduleURL } from '$lib/utils';

export async function load({ params }: import('./$types').PageServerLoadEvent) {
	throw redirect(307, getScheduleURL(params.type, new Date(`${params.year}-${params.month}-01`)));
}
