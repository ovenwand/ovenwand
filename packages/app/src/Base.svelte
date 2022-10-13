<script lang="ts">
	import type { Readable } from 'svelte/store';
	import { useMonitor } from '@ovenwand/services.monitor';
	import { useFeatures } from "./features";

	const isFeatureEnabled = useFeatures();

	export interface Page {
		url: URL;
		params: Record<string, string>;
	}

	export let title: string;
	export let page: Readable<Page>;
	export let browser: boolean;

	export let env = {
		APP_VERSION: import.meta.env.APP_VERSION,
		PUBLIC_MONITOR_PROJECT: import.meta.env.PUBLIC_MONITOR_PROJECT,
		PUBLIC_MONITOR_URL: import.meta.env.PUBLIC_MONITOR_URL,
		VERCEL_GIT_COMMIT_SHA: import.meta.env.VERCEL_GIT_COMMIT_SHA,
	};

	const { trackPageView } = useMonitor({
		enabled: isFeatureEnabled('services.monitor'),
		project: env.PUBLIC_MONITOR_PROJECT,
		url: env.PUBLIC_MONITOR_URL,
	});

	$: if (browser) {
		trackPageView({ path: $page.url.pathname, params: $page.params });
	}
</script>

<svelte:head>
	{#if title}
		<title>{title}</title>
	{/if}

	<meta name="version" content={env.APP_VERSION} />
	<meta name="version-id" content={env.VERCEL_GIT_COMMIT_SHA} />
</svelte:head>

<slot />
