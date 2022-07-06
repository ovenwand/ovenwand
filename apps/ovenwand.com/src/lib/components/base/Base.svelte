<script lang="ts">
	import { useMonitor } from '@ovenwand/monitor';
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	const { trackPageView } = useMonitor(import.meta.env.VITE_MONITOR_PROJECT);

	$: if (browser) {
		trackPageView({ path: $page.url.pathname, params: $page.params });
	}
</script>

<slot />
