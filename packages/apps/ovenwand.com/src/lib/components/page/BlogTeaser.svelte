<script lang="ts">
	import type { Action } from 'svelte/action';

	export let use: [Action, unknown];
	export let title: string;
	export let publishedAt: string;
	export let author: unknown[];
	export let content: unknown[];
	export let external_url: { url: string };

	$: action = use[0];
	$: params = use[1];
</script>

<div use:action={params}>
	<h1><a href={external_url.url} target="_blank">{title}</a></h1>
	<span>{publishedAt}</span>
	{JSON.stringify(author)}
	{JSON.stringify(content)}
</div>
