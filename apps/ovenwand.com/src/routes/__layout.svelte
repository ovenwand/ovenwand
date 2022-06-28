<script lang="ts">
	import '../app.css';
	import { useAnalytics } from '@ovenwand/analytics';
	import { DefaultLayout } from '@ovenwand/ui';
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import { ApplicationSidebar, Footer, Header } from '$lib/components';

	const { trackPageView } = useAnalytics(import.meta.env.VITE_ANALYTICS_PROJECT);
	$: $page.url.pathname, browser && trackPageView();
</script>

<DefaultLayout header footer>
	<svelte:fragment slot="before-content">
		<Header />
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="after-content">
		<Footer />
	</svelte:fragment>

	<svelte:fragment slot="outside">
		<ApplicationSidebar />
	</svelte:fragment>
</DefaultLayout>
