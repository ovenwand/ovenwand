<script lang="ts" context="module">
	import type { Blok, Story } from '../../../types';
	import type { IPerson } from '../Author.svelte';

	interface IUrl {
		url: string;
	}

	export interface IBlog {
		content: Blok<Record<string, unknown>>[];
		author: Story<IPerson>[];
		tags: string[];
		external_url?: IUrl;
	}
</script>

<script lang="ts">
	import { StoryblokComponent } from '@storyblok/svelte';
	import { Blog } from '../../bloks';
	import { Editable } from '../../system';

	export let story: Story<IBlog>;
	export let blok: Blok<IBlog>;
</script>

<Editable component={Blog} title={story.name} publishedAt={story.published_at} {blok}>
	{#each blok.content as blok}
		<StoryblokComponent {blok} />
	{/each}
</Editable>
