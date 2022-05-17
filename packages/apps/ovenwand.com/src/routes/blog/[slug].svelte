<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { preloadStory, useStory } from '../../content';

	const resolveRelations = ['blog.author'];

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params }: LoadInput): Promise<LoadOutput> {
		const { story } = await preloadStory(`blog/${params.slug}`, {
			resolve_relations: String(resolveRelations)
		});

		return {
			props: { data: story }
		};
	}
</script>

<script lang="ts">
	import { StoryblokComponent } from '@storyblok/svelte';

	export let data;

	const { story } = useStory(data, {
		resolveRelations: resolveRelations
	});
</script>

{#if $story}
	<StoryblokComponent story={$story} blok={$story.content} />
{/if}
