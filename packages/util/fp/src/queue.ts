import { isFunction } from './is';

export function useQueue<Context>(context: Context) {
	const queue: Promise<unknown>[] = [];

	function add(
		promise: Promise<unknown> | (() => Promise<unknown>) | ((context: Context) => Promise<unknown>)
	) {
		if (isFunction(promise)) {
			promise = promise(context);
		}

		queue.push(promise);
	}

	function settle() {
		const result = Promise.all(queue);
		queue.length = 0;
		return result;
	}

	return {
		queue,
		add,
		settle
	};
}
