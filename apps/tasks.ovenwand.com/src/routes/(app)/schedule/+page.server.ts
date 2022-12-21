import { redirect } from '@sveltejs/kit';
import { getScheduleURL } from '$lib/utils';

export async function load() {
	throw redirect(307, getScheduleURL('month'));
}
