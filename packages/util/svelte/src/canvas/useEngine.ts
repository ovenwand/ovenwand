import { onDestroy, onMount } from 'svelte';
import type { Engine, Fn, Hook, IDrawContext, ISetupContext } from '@ovenwand/util.browser';
import { createEngine } from '@ovenwand/util.browser';
import { noop } from '@ovenwand/util.fp';

export function useEngine(getCanvas: () => HTMLCanvasElement): Engine {
	let _setup: Hook<ISetupContext> = noop;
	let _draw: Hook<IDrawContext> = noop;
	let _resume: Fn = noop;
	let _stop: Fn = noop;

	function setup(setupFn: (context: ISetupContext) => void) {
		onMount(() => {
			[_setup, _draw, _stop, _resume] = createEngine(getCanvas());
			_setup(setupFn);
		});

		onDestroy(stop);
	}

	function draw(drawFn: (context: IDrawContext) => void) {
		onMount(() => {
			_draw(drawFn);
		});
	}

	function resume() {
		_resume();
	}

	function stop() {
		_stop();
	}

	return [setup, draw, stop, resume];
}
