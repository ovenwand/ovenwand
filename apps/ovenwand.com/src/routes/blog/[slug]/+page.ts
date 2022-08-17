import type { LoadEvent } from '@sveltejs/kit';
import { preloadStory } from '$lib/content';

export async function load({ params }: LoadEvent) {
	const { story } = await preloadStory(`blog/${params.slug}`, {
		resolve_relations: String(['blog.author'])
	});

	return { story };
}
