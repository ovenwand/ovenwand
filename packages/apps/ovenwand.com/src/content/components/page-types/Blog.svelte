<script lang="ts">
	import { StoryblokComponent, type StoryData } from '@storyblok/svelte';
	import { Blog } from '$lib/components/page';
	import { Editable } from '../system';

	export let story: StoryData;
	export let blok: StoryData['content'];
</script>

<Editable component={Blog} title={story.name} publishedAt={story.published_at} {blok}>
	{#each blok.content as blok}
		<StoryblokComponent {blok} />
	{/each}
</Editable>
