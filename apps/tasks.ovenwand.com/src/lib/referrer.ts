import type { Handle, RequestEvent } from '@sveltejs/kit';

export interface WithReferrerOptions {
	header?: string;
	path?: string;
}

export function withReferrer(event: RequestEvent, options: WithReferrerOptions = {}) {
	const { header = 'referer', path = '/' } = options;
	const { locals, request, url } = event;
	const referrerParam = url.searchParams.get(header);
	const referrerHeader = request.headers.get(header);

	let referrer: URL;

	if (referrerParam) {
		referrer = new URL(referrerParam);
	} else if (referrerHeader) {
		referrer = new URL(referrerHeader);
	} else {
		referrer = new URL(path, url.origin);
	}

	if (referrer?.origin === url.origin) {
		locals.referrer = referrer;
	}

	return event;
}

export function Referrer(options: WithReferrerOptions = {}): Handle {
	return ({ event, resolve }) => resolve(withReferrer(event, options));
}
