import { noop } from '@ovenwand/util.fp';

export function useAnalytics(projectId) {
	const isEnabled = import.meta.env.VITE_ANALYTICS === '1';

	function trackPageView() {
		fetch(`${import.meta.env.VITE_ANALYTICS_URL}/track`, {
			method: 'POST',
			body: JSON.stringify({
				project: projectId,
				type: 'page_view',
				timestamp: new Date().toISOString(),
				uri: location.href,
				details: null
			})
		});
	}

	return {
		trackPageView: isEnabled ? trackPageView : noop
	};
}
