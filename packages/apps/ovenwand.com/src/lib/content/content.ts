import { writable, type Writable } from 'svelte/store';
import type { SvelteComponent } from 'svelte';
import {
	storyblokInit,
	apiPlugin,
	useStoryblokBridge,
	storyblokEditable as _storyblokEditable
} from '@storyblok/svelte';
import { useStoryblokApi } from './client';

let isBridgeEnabled = false;

export function useContent(components: Record<string, SvelteComponent>, bridge = false): void {
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
): Promise<unknown> {
	const api = useStoryblokApi();

	const response = await api.get(`cdn/stories/${path}`, {
		version: isBridgeEnabled || import.meta.env.DEV ? 'draft' : 'published',
		...params
	});

	return response.data;
}

export function useStory<Data extends { id: number }>(
	data: Data,
	params: Record<string, unknown>
): { story: Writable<Data> } {
	const story = writable(data);

	if (isBridgeEnabled) {
		useStoryblokBridge(data.id, (newStory: Data) => story.set(newStory), params);
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

export function storyblokEditable(node: HTMLElement, parameters: unknown) {
	if (isBridgeEnabled) {
		return _storyblokEditable(node, parameters);
	}
}
