import type { SvelteComponent } from 'svelte';
import { storyblokInit, apiPlugin } from '@storyblok/svelte';
import { dev } from '$app/environment';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';
import type { Story } from '../types';
import { useStoryblokApi } from '../client';

export let isBridgeEnabled = false;

export function useContent(
	components: Record<string, typeof SvelteComponent>,
	bridge = false
): void {
	isBridgeEnabled = bridge;

	return storyblokInit({
		accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN,
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
		version: isBridgeEnabled || dev ? 'draft' : 'published',
		...params
	});

	return response.data;
}
