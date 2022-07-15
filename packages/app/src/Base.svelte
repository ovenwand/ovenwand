<script lang="ts">
	import type { Readable } from 'svelte/store';
	import { useMonitor } from '@ovenwand/monitor';

	export interface Page {
		url: URL;
		params: Record<string, string>;
	}

	export let title: string;
	export let page: Readable<Page>;
	export let browser: boolean;

	const { trackPageView } = useMonitor(import.meta.env.VITE_MONITOR_PROJECT);

	$: if (browser) {
		trackPageView({ path: $page.url.pathname, params: $page.params });
	}
</script>

<svelte:head>
	{#if title}
		<title>{title}</title>
	{/if}

	<meta name="version" content={import.meta.env.APP_VERSION} />
	<meta name="version-id" content={import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA} />
</svelte:head>

<slot />
