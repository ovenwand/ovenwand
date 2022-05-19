<script lang="ts">
	import type { Action } from 'svelte/action';
	import BlogDetail from './BlogDetail.svelte';
	import BlogTeaser from './BlogTeaser.svelte';

	export let use: [Action, unknown];
	export let title: string;
	export let publishedAt: string;
	export let tags: string[];
	export let author: unknown[];
	export let content: unknown[];
	export let external_url: { id: string; url: string; type: string } = null;
</script>

{#if external_url?.url}
	<BlogTeaser {use} {title} {publishedAt} {tags} {author} {content} {external_url} />
{:else}
	<BlogDetail {use} {title} {publishedAt} {tags} {author} {content} />
{/if}
