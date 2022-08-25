<script lang="ts">
	import { StoryblokComponent } from '@storyblok/svelte';
	import { useStory } from '$lib/content';

	export let data;

	const { story } = useStory(data.story, {
		resolveRelations: ['blog.author'],
	});
</script>

{#if $story}
	<StoryblokComponent story={$story} blok={$story.content} />
{/if}
