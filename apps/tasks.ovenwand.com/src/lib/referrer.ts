import type { RequestEvent } from '@sveltejs/kit';

export interface WithReferrerOptions {
	header?: string;
	path?: string;
}

export function withReferrer(event: RequestEvent, options: WithReferrerOptions = {}) {
	const { header = 'referer', path = '/' } = options;

	const { locals, url } = event;
	const { headers } = event.request;
	const referrerParam = url.searchParams.get(header);
	const referrerHeader = headers.get(header);

	let referrer;

	if (referrerParam) {
		referrer = new URL(referrerParam);
	} else if (referrerHeader) {
		referrer = new URL(referrerHeader);
	}

	if (referrer?.origin === url.origin) {
		locals.referrer = referrer;
	}

	if (!locals.referrer) {
		locals.referrer = new URL(path, url.origin);
	}

	return event;
}
