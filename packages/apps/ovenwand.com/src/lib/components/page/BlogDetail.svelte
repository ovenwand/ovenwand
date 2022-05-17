<script lang="ts">
	import type { Action } from 'svelte/action';
	import { StoryblokComponent } from '@storyblok/svelte';
	import { format } from '@ovenwand/util';
	import { Button, Column, Grid } from '@ovenwand/ui';

	export let use: [Action, unknown];
	export let title: string;
	export let publishedAt: string;
	export let tags: string[];
	export let author: unknown[];
	export let content: unknown[];

	const columns = { xs: 12, sm: 8 };
	const offset = { sm: 2 };
</script>

<Grid class="min-h-full auto-rows-min" relative {use}>
	<Column {columns} {offset}>
		<h1>{title}</h1>
		<span>{format(new Date(publishedAt), 'MMMM dd, y')}</span>
	</Column>

	<Column {columns} {offset}>
		{#each tags as tag}
			<Button href="/blog?tag={tag}">{tag}</Button>
		{/each}
	</Column>

	<Column {columns} {offset}>
		{#each author as story}
			<StoryblokComponent blok={story.content} />
		{/each}
	</Column>

	<Column {columns} {offset}>
		{#each content as blok}
			<StoryblokComponent {blok} />
		{/each}
	</Column>
</Grid>
