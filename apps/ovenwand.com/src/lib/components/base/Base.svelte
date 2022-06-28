<script lang="ts">
	import { useAnalytics } from '@ovenwand/analytics';
	import { page } from '$app/stores';
	import { browser } from '$app/env';

	const { trackPageView } = useAnalytics(import.meta.env.VITE_ANALYTICS_PROJECT);
	$: $page.url.pathname, browser && trackPageView();
</script>
