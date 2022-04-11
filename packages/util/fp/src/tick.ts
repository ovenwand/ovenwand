export function createTicker(fn: () => void): [() => void, () => void] {
	let isRunning = false;

	function tick() {
		if (!isRunning) {
			return;
		}

		fn();
		requestAnimationFrame(tick);
	}

	function resume() {
		isRunning = true;
		tick();
	}

	function stop() {
		isRunning = false;
	}

	return [resume, stop];
}
