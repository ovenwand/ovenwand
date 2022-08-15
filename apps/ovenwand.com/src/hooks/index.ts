import { configureSentry } from '@ovenwand/services.sentry';
import { useFeatures } from '@ovenwand/app';

const isFeatureEnabled = useFeatures();

configureSentry({
	enabled: isFeatureEnabled('services.sentry'),
	dsn: import.meta.env.SENTRY_DSN,
	environment: import.meta.env.VITE_VERCEL_ENV || 'development',
	release: import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA || 'local'
});

export { getSession } from './getSession';
export { handle } from './handle';
export { handleError } from './handleError';
