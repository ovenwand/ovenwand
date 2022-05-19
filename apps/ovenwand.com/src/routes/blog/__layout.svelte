<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { useContent, Blog, Author, Page, Text } from '$lib/content';

	export async function load({ url }: LoadInput): Promise<LoadOutput> {
		useContent(
			{
				blog: Blog,
				page: Page,
				person: Author,
				text: Text
			},
			url.searchParams.has('_storyblok')
		);

		return {};
	}
</script>

<slot />
