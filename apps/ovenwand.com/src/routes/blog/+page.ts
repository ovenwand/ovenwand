import { preloadStory } from '$lib/content';

export async function load() {
	const { stories } = await preloadStory('', {
		resolve_relations: String(['blog.author']),
		page: 1,
		per_page: 10,
		starts_with: 'blog/',
		'filter_query[component][in]': 'blog'
	});

	return { stories };
}
