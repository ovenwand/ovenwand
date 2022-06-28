export function useQueue() {
	const queue: Promise<unknown>[] = [];

	function add(promise: Promise<unknown>) {
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
