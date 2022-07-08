import type { GetSession, HandleError } from '@sveltejs/kit';
import { parseUserAgent } from '@ovenwand/util';
import { configureSentry, captureException } from '@ovenwand/monitor';

configureSentry();

export const getSession: GetSession = async ({ request }) => {
	const referer = request.headers.get('referer');
	return { referer };
};

export const handleError: HandleError = async ({ error, event }) => {
	const { params, request, url } = event;
	const userAgentString = request.headers.get('User-Agent');
	const userAgent = userAgentString && parseUserAgent(userAgentString);

	captureException(error, (scope) => {
		scope.setTag('url', event.url);

		scope.setTag(
			'page',
			Object.entries(params).reduce(
				(acc, [key, value]) => acc.replace(value, `[${key}]`),
				url.pathname
			)
		);

		if (userAgent) {
			scope.setContext('os', userAgent.os);
			scope.setContext('browser', userAgent.browser);
		}

		return {
			data: {
				mechanism: {
					type: 'handleError',
					handled: false
				}
			}
		};
	});
};
