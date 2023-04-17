<script lang="ts">
	import { writable } from 'svelte/store';
	import { StoryblokComponent } from '@storyblok/svelte';
	import { useStories, type IBlog, type Story } from '$lib/content';

	export let data: { stories: Story<IBlog>[] };

	const { stories = writable([]) } = useStories(data.stories, {
		resolveRelations: ['blog.author']
	});
</script>

<div>
	{#each $stories as story}
		<StoryblokComponent {story} blok={story.content} />
	{/each}
</div>
