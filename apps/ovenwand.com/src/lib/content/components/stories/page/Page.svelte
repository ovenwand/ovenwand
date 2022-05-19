<script lang="ts" context="module">
	import type { Blok, Story } from '../../../types';

	export interface IPage {
		content: Blok[];
	}
</script>

<script lang="ts">
	import { StoryblokComponent } from '@storyblok/svelte';
	import { Page } from '../../bloks';
	import { Editable } from '../../system';

	export let story: Story<IPage>;
	export let blok: Blok<IPage>;
</script>

<Editable component={Page} title={story.name} {blok}>
	{#each blok.content as blok}
		<StoryblokComponent {blok} />
	{/each}
</Editable>
