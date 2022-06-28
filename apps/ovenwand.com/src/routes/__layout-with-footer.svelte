<script lang="ts">
	import '../app.css';
	import { useAnalytics } from '@ovenwand/analytics';
	import { DefaultLayout } from '@ovenwand/ui';
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import { ApplicationSidebar, Footer } from '$lib/components';

	const { trackPageView } = useAnalytics(import.meta.env.VITE_ANALYTICS_PROJECT);
	$: $page.url.pathname, browser && trackPageView();
</script>

<DefaultLayout footer>
	<slot />

	<svelte:fragment slot="after-content">
		<Footer />
	</svelte:fragment>

	<svelte:fragment slot="outside">
		<ApplicationSidebar />
	</svelte:fragment>
</DefaultLayout>
