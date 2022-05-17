import { useStoryblokApi as _useStoryblokApi } from '@storyblok/svelte';

export interface StoryblokApi {
	get<Data extends unknown>(
		slug: string,
		options: Record<string, unknown>
	): Promise<{ data: Data }>;
}

export function useStoryblokApi(config?: Record<string, unknown>): StoryblokApi {
	return _useStoryblokApi(config);
}
