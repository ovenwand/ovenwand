import type { HandleError } from '@sveltejs/kit';
import { parseUserAgent } from '@ovenwand/util';
import { addRequestDataToEvent, captureException } from '@ovenwand/monitor/node';

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

		// scope.addEventProcessor((event) => {
		//   return addRequestDataToEvent(event, request);
		// });

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
