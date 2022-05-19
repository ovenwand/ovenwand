<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { Blok, Story } from '../../../types';
	import type { IPerson } from '../../stories';
	import BlogDetail from './BlogDetail.svelte';
	import BlogTeaser from './BlogTeaser.svelte';

	export let use: [Action, unknown];
	export let title: string;
	export let publishedAt: string;
	export let tags: string[];
	export let author: Story<IPerson>[];
	export let content: Blok[];
	export let external_url: { id: string; url: string; type: string } | null = null;
</script>

{#if external_url?.url}
	<BlogTeaser {use} {title} {publishedAt} {author} {content} {external_url} />
{:else}
	<BlogDetail {use} {title} {publishedAt} {tags} {author} {content} />
{/if}
