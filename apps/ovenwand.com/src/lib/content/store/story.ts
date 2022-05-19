import { writable, type Writable } from 'svelte/store';
import { useStoryblokBridge } from '@storyblok/svelte';
import { isBridgeEnabled } from './content';

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
