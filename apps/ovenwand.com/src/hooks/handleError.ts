// TODO: Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'cookie' imported from /Volumes/T7/Business/Ovenwand/Projects/Development/@ovenwand/apps/ovenwand.com/.svelte-kit/output/server/index.js

// import type { HandleError } from '@sveltejs/kit';
// import { parseUserAgent } from '@ovenwand/util';
// import { captureException } from '@ovenwand/services.sentry';
//
// export const handleError: HandleError = async ({ error, event }) => {
// 	const { params, request, url } = event;
// 	const userAgentString = request.headers.get('User-Agent');
// 	const userAgent = userAgentString && parseUserAgent(userAgentString);
//
// 	captureException(error, (scope) => {
// 		scope.setTag('url', event.url.toString());
//
// 		scope.setTag(
// 			'page',
// 			Object.entries(params).reduce(
// 				(acc, [key, value]) => acc.replace(value, `[${key}]`),
// 				url.pathname
// 			)
// 		);
//
// 		if (userAgent) {
// 			scope.setContext('os', userAgent.os);
// 			scope.setContext('browser', userAgent.browser);
// 		}
//
// 		// scope.addEventProcessor((event) => {
// 		//   return addRequestDataToEvent(event, request);
// 		// });
//
// 		return {
// 			data: {
// 				mechanism: {
// 					type: 'handleError',
// 					handled: false
// 				}
// 			}
// 		};
// 	});
// };
