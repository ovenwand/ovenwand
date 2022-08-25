import { useId, useRef, useState } from 'react';
import { useScope } from './scope';

export function useTracker() {
	const { scope, register, update } = useScope();

	console.log('tracker:', scope);

	function track(value: unknown) {
		console.log(
			'track',
			'\nwillTrack:',
			!!(scope.isRendering && !scope.isTracked),
			'\nvalue:',
			value,
			'\nscope:',
			scope
		);

		if (scope.isRendering && !scope.isTracked) {
			register(value);
		}
	}

	function trigger(value: unknown) {
		console.log(
			'trigger',
			'\nwillTrigger:',
			!!(!scope.isRendering && scope.isTracked),
			'\nvalue:',
			value,
			'\nscope:',
			scope
		);

		// TODO add warning when trying to trigger while rendering?
		if (!scope.isRendering && scope.isTracked) {
			update(value);
		}
	}

	return [track, trigger];
}
