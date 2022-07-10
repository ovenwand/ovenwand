<script lang="ts" context="module">
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	import { useFeatures } from '@ovenwand/app';
	import { useContent, Blog, Author, Page, Text } from '$lib/content';

	const isFeatureEnabled = useFeatures();

	export async function load({ url }: LoadEvent): Promise<LoadOutput> {
		if (!isFeatureEnabled('route.blog')) {
			return {
				status: 404,
				error: new Error('Not Found')
			};
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

		return {};
	}
</script>

<slot />
