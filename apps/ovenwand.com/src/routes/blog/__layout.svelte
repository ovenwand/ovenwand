<script lang="ts" context="module">
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	import { isFeatureEnabled } from '$lib/features';
	import { useContent, Blog, Author, Page, Text } from '$lib/content';

	export async function load({ url }: LoadEvent): Promise<LoadOutput> {
		if (isFeatureEnabled('route.blog')) {
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

		return {
			status: 404,
			error: new Error('Not Found')
		};
	}
</script>

<slot />
