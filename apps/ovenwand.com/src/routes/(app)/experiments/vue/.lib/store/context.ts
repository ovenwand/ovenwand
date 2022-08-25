import { reactive } from 'vue';

const contextCache: Record<string, Record<string, unknown>> = {};

function setContext(key: string, data: Record<string, unknown>) {
	const cache = contextCache[key];
	const context = cache ?? reactive(data);

	if (cache) {
		for (const key of Object.keys(data)) {
			context[key] = data[key];
		}
	} else {
		contextCache[key] = context;
	}

	return context;
}

export function useContext(): [typeof setContext, typeof contextCache] {
	return [setContext, contextCache];
}
