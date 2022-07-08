import { noop } from '@ovenwand/util.fp';
import { getConnectionSpeed } from './utils';

export function useMonitor(projectId: string) {
	const isEnabled = import.meta.env.VITE_MONITOR === '1';

	function trackPageView({ path, params }: { path: string; params: Record<string, string> }) {
		const page = Object.entries(params).reduce(
			(acc, [key, value]) => acc.replace(value, `[${key}]`),
			path
		);

		fetch(`${import.meta.env.VITE_MONITOR_URL}/track`, {
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
		}).catch(noop);
	}

	return {
		trackPageView: isEnabled ? trackPageView : noop
	};
}
