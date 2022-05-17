<script lang="ts">
	import type { Action } from 'svelte/action';
	import { StoryblokComponent } from '@storyblok/svelte';
	import { Column, Grid } from '@ovenwand/ui';

	export let use: [Action, unknown];
	export let title: string;
	export let content: unknown[];

	const columns = { sm: 8 };
	const offset = { sm: 2 };
</script>

<Grid class="min-h-full auto-rows-min" relative {use}>
	<Column {columns} {offset}>
		<h1>{title}</h1>
	</Column>

	<Column {columns} {offset}>
		{#each content as blok}
			<StoryblokComponent {blok} />
		{/each}
	</Column>
</Grid>
