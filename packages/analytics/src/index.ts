import { noop } from '@ovenwand/util.fp';
import { getConnectionSpeed } from './utils';

export function useAnalytics(projectId) {
	const isEnabled = import.meta.env.VITE_ANALYTICS === '1';

	function trackPageView({ path, params }) {
		const page = Object.entries(params).reduce(
			(acc, [key, value]) => acc.replace(value, `[${key}]`),
			path
		);

		fetch(`${import.meta.env.VITE_ANALYTICS_URL}/track`, {
			method: 'POST',
			credentials: 'omit',
			body: JSON.stringify({
				project: projectId,
				type: 'page_view',
				timestamp: new Date().toISOString(),
				uri: location.href,
				page,
				details: {
					speed: getConnectionSpeed()
				}
			})
		});
	}

	return {
		trackPageView: isEnabled ? trackPageView : noop
	};
}
