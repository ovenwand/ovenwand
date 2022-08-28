import { preloadStory } from '$lib/content';

export async function load({ params, parent }: import('./$types').PageLoadEvent) {
	await parent(); // Make sure the layout loads storyblok before called preloadStory

	const { story } = await preloadStory(`blog/${params.slug}`, {
		resolve_relations: String(['blog.author'])
	});

	return { story };
}
