import type { SvelteComponent } from 'svelte';
import { storyblokInit, apiPlugin } from '@storyblok/svelte';
import type { Story } from '../types';
import { useStoryblokApi } from '../client';

export let isBridgeEnabled = false;

export function useContent(
	components: Record<string, typeof SvelteComponent>,
	bridge = false
): void {
	isBridgeEnabled = bridge;

	return storyblokInit({
		accessToken: import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN,
		use: [apiPlugin],
		bridge,
		components
	});
}

export async function preloadStory(
	path: string,
	params: Record<string, unknown> = {}
): Promise<{ story: Story; stories: Story[] }> {
	const api = useStoryblokApi();

	const response = await api.get<{ story: Story; stories: Story[] }>(`cdn/stories/${path}`, {
		version: isBridgeEnabled || import.meta.env.DEV ? 'draft' : 'published',
		...params
	});

	return response.data;
}
