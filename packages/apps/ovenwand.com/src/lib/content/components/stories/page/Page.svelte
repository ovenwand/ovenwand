<script lang="ts">
	import { StoryblokComponent, type StoryData } from '@storyblok/svelte';
	import { Page } from '../../bloks/page';
	import { Editable } from '../../system';

	export let story: StoryData;
	export let blok: StoryData['content'];
</script>

<Editable component={Page} title={story.name} {blok}>
	{#each blok.content as blok}
		<StoryblokComponent {blok} />
	{/each}
</Editable>
