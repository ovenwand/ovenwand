<script lang="ts" context="module">
	import { preloadStory, useStory } from '../../content';

	const resolveRelations = ['blog.author'];

	export async function load({ params }) {
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
