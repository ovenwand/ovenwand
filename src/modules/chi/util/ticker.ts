export const SECOND = 1000;

export function ticker(tick: (delta: number, start: number, now: number) => unknown): () => void {
	let stopped = false;

	function loop(start: number = Date.now()) {
		if (stopped) {
			return;
		}

		requestAnimationFrame(() => {
			const now = Date.now();
			const delta = now - start;
			tick(delta, start, now);
			loop(now);
		});
	}

	if (typeof window !== 'undefined') {
		loop();
	}

	return function stop() {
		stopped = true;
	};
}
