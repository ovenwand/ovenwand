<script lang="ts">
	import type { Readable } from 'svelte/store';
	import { useAnalytics } from '@ovenwand/analytics';
	import Layout from './Layout.svelte';

	export let title: string;
	export let page: Readable<any>;
	export let browser: boolean;

	const { trackPageView } = useAnalytics(import.meta.env.VITE_ANALYTICS_PROJECT);

	$: if (browser) {
		trackPageView({ path: $page.url.pathname, params: $page.params });
	}
</script>

<svelte:head>
	{#if title}
		<title>{title}</title>
	{/if}

	<meta name="build-id" content={import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA} />
</svelte:head>

<Layout>
	<slot />
</Layout>
