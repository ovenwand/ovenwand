<script lang="ts" context="module">
	import type { LoadOutput } from '@sveltejs/kit';
	import { preloadStory } from '$lib/content';

	export async function load(): Promise<LoadOutput> {
		const { stories } = await preloadStory('', {
			resolve_relations: String(['blog.author']),
			page: 1,
			per_page: 10,
			starts_with: 'blog/',
			'filter_query[component][in]': 'blog'
		});

		return {
			props: { data: stories }
		};
	}
</script>

<script lang="ts">
	import { writable } from 'svelte/store';
	import { StoryblokComponent } from '@storyblok/svelte';
	import { useStories, type IBlog, type Story } from '$lib/content';

	export let data: Story<IBlog>[];

	const { stories = writable([]) } = useStories(data, {
		resolveRelations: ['blog.author']
	});
</script>

<div>
	{#each $stories as story}
		<StoryblokComponent {story} blok={story.content} />
	{/each}
</div>
