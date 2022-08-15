import {
	init,
	withScope,
	getCurrentHub,
	type EventHint,
	type NodeOptions,
	type Scope
} from '@sentry/node';

// Importing @sentry/tracing patches the global hub for tracing to work.
import '@sentry/tracing';

// If you want to use `@sentry/tracing` in your project directly, use a named import instead:
// import * as SentryTracing from "@sentry/tracing"
// Unused named imports are not guaranteed to patch the global hub.

export {
	addBreadcrumb,
	addRequestDataToEvent,
	startTransaction,
	getCurrentHub,
	type Scope
} from '@sentry/node';
export { extractTraceparentData } from '@sentry/tracing';

export function captureException(error: Error, createEvent: (scope: Scope) => EventHint) {
	withScope((scope) => {
		getCurrentHub().captureException(error, {
			originalException: error,
			...createEvent(scope)
		});
	});
}

export function configureSentry(options: NodeOptions = {}) {
	init({
		environment: options.environment || 'development',
		release: options.release || 'local',

		// We recommend adjusting this value in production, or using tracesSampler
		// for finer control
		tracesSampleRate: 1.0,

		...options
	});
}