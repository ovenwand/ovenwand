import { writable, type Writable } from 'svelte/store';
import { useStoryblokBridge } from '@storyblok/svelte';
import { isBridgeEnabled } from './content';

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
