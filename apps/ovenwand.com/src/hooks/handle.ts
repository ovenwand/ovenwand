import type { Handle } from '@sveltejs/kit';
import { extractTraceparentData, getCurrentHub, startTransaction } from '@ovenwand/monitor/node';

export const handle: Handle = async ({ event, resolve }) => {
	const { request, params } = event;
	const traceHeader = request.headers.get('sentry-trace');
	const traceParentData = traceHeader && extractTraceparentData(traceHeader);

	const page = Object.entries(params).reduce(
		(acc, [key, value]) => acc.replace(value, `[${key}]`),
		new URL(request.url).pathname
	);

	const transaction = startTransaction({
		op: 'http.server',
		name: `${request.method} ${page}`,
		...traceParentData
	});

	getCurrentHub().configureScope((scope) => {
		scope.setSpan(transaction);
	});

	const response = await resolve(event);

	transaction.setHttpStatus(response.status);
	transaction.finish();

	return response;
};