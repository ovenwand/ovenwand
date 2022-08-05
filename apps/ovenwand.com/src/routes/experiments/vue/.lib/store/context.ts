import { reactive } from 'vue';

const context: Record<string, Record<string, unknown>> = {};

function setContext(key: string, data: Record<string, unknown>) {
	const cache = context[key];
	const ref = cache ?? reactive(data);

	if (cache) {
		for (const key of Object.keys(data)) {
			ref[key] = data[key];
		}
	} else {
		context[key] = ref;
	}

	return ref;
}

export function useContext(): [typeof setContext, typeof context] {
	return [setContext, context];
}
