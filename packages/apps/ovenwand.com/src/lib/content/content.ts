import { writable, type Writable } from 'svelte/store';
import type { SvelteComponent } from 'svelte';
import { storyblokInit, apiPlugin, useStoryblokBridge } from '@storyblok/svelte';
import { useStoryblokApi } from './client';

const isBridgeEnabled = import.meta.env.DEV;

export function useContent(components: Record<string, SvelteComponent>): void {
	return storyblokInit({
		accessToken: import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN,
		bridge: isBridgeEnabled,
		use: [apiPlugin],
		components
	});
}

export async function preloadStory(
	path: string,
	params: Record<string, unknown> = {}
): Promise<unknown> {
	const api = useStoryblokApi();

	try {
		const response = await api.get(`cdn/stories/${path}`, {
			...params,
			version: 'draft'
		});

		return response.data;
	} catch (e) {
		console.error(e);
	}

	return {};
}

export function useStory<Data extends { id: number }>(
	data: Data,
	params: Record<string, unknown>
): { story: Writable<Data> } {
	const story = writable(data);

	if (isBridgeEnabled) {
		useStoryblokBridge(data.id, (newStory) => story.set(newStory), params);
	}

	return { story };
}

export function useStories<Data extends { id: number }[]>(
	data: Data,
	params: Record<string, unknown>
): { stories: Writable<Data> } {
	const stories = writable(data);

	if (isBridgeEnabled) {
		for (const story of data) {
			useStoryblokBridge(
				story.id,
				(newStory: Data[number]) =>
					stories.update(($stories): Data => {
						const index = $stories.findIndex((story) => story.id === newStory.id);

						if (index >= 0) {
							return [...$stories.splice(index, 1, newStory)] as Data;
						}

						return [...$stories, newStory] as Data;
					}),
				params
			);
		}
	}

	return { stories };
}
