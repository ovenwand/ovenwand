<script lang="ts">
	import BlogDetail from './BlogDetail.svelte';
	import BlogTeaser from './BlogTeaser.svelte';
	import type { Action } from 'svelte/action';

	export let use: [Action, unknown];
	export let title: string;
	export let publishedAt: string;
	export let tags: string[];
	export let author: any[];
	export let content: any[];
	export let external_url: string;
</script>

{#if external_url}
	<BlogTeaser {use} {title} {publishedAt} {tags} {author} {content} {external_url} />
{:else}
	<BlogDetail {use} {title} {publishedAt} {tags} {author} {content} />
{/if}
