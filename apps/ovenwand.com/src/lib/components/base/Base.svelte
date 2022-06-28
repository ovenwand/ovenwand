<script lang="ts">
	import { useAnalytics } from '@ovenwand/analytics';
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	const { trackPageView } = useAnalytics(import.meta.env.VITE_ANALYTICS_PROJECT);

	$: if (browser) {
		trackPageView({ path: $page.url.pathname, params: $page.params });
	}
</script>

<slot />
