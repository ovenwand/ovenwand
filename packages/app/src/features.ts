const features = JSON.parse(import.meta.env.VITE_FEATURE_FLAGS) || {};

type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never;

export function useFeatures<Features extends Map<string, boolean>>() {
	const localFeatures: Features = new Map(Object.entries(features));

	return function isRunning(feature: KeyOfMap<Features>): boolean {
		if (!localFeatures.has(feature)) {
			return true;
		}

		return localFeatures.get(feature);
	};
}
