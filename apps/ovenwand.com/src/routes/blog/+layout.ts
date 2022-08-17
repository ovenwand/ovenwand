import { error, type LoadEvent } from '@sveltejs/kit';
import { useFeatures } from '@ovenwand/app';
import { useContent, Blog, Author, Page, Text } from '$lib/content';

const isFeatureEnabled = useFeatures();

export async function load({ url }: LoadEvent) {
	if (!isFeatureEnabled('route.blog')) {
		throw error(404, 'Not Found');
	}

	const isBridgeEnabled = url.searchParams.has('_storyblok');

	useContent(
		{
			blog: Blog,
			page: Page,
			person: Author,
			text: Text
		},
		isBridgeEnabled
	);
}
