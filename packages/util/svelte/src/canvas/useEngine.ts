import { onDestroy, onMount } from 'svelte';
import type { Engine, Fn, Hook, IDrawContext, ISetupContext } from '@ovenwand/util.browser';
import { createEngine } from '@ovenwand/util.browser';

export function useEngine(getCanvas: () => HTMLCanvasElement): Engine {
	let engine: Engine;

	function setup(setupFn: (context: ISetupContext) => void) {
		onMount(() => {
			engine = createEngine(getCanvas());
			engine.setup(setupFn);
		});

		onDestroy(stop);
	}

	function update(updateFn: () => void) {
		onMount(() => {
			engine.update(updateFn);
		});
	}

	function draw(drawFn: (context: IDrawContext) => void) {
		onMount(() => {
			engine.draw(drawFn);
		});
	}

	function resume() {
		if (!engine) {
			return;
		}

		engine.resume();
	}

	function stop() {
		if (!engine) {
			return;
		}

		engine.stop();
	}

	return { setup, update, draw, resume, stop };
}
