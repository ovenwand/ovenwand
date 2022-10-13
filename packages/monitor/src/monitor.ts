import { noop } from '@ovenwand/util.fp';
import { getConnectionSpeed } from './utils';

function withDefaultOptions(options: Partial<MonitorOptions>): MonitorOptions {
	return {
		enabled: import.meta.env.PUBLIC_MONITOR === '1',
		project: import.meta.env.PUBLIC_MONITOR_PROJECT,
		url: import.meta.env.PUBLIC_MONITOR_URL,
		...options
	};
}

export interface MonitorOptions {
	enabled: boolean;
	project: string;
	url: string;
}

export function useMonitor(options: Partial<MonitorOptions> = {}) {
	const { enabled, project, url } = withDefaultOptions(options);

	function trackPageView({ path, params }: { path: string; params: Record<string, string> }) {
		const page = Object.entries(params).reduce(
			(acc, [key, value]) => acc.replace(value, `[${key}]`),
			path
		);

		fetch(`${url}/track`, {
			method: 'POST',
			credentials: 'omit',
			body: JSON.stringify({
				project,
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
		trackPageView: enabled ? trackPageView : noop
	};
}
