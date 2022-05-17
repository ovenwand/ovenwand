<script lang="ts" context="module">
	import { preloadStory } from '../../content';

	export async function load() {
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
	import { StoryblokComponent } from '@storyblok/svelte';
	import { useStories } from '../../content';

	export let data;

	const { stories = [] } = useStories(data, {
		resolveRelations: ['blog.author']
	});
</script>

<div>
	{#each $stories as story}
		<StoryblokComponent {story} blok={story.content} />
	{/each}
</div>
