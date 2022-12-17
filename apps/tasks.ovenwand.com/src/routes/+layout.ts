import { browser } from '$app/environment';
import { setSession } from '$lib/auth';
import { setCurrentUrl } from '$lib/route';

export async function load(event: import('./$types').LayoutLoadEvent) {
	if (browser) {
		setSession(event.data.session);
		setCurrentUrl(event.url);
	}

	return event.data;
}
