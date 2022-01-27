import { cubicOut } from 'svelte/easing';
import type { EasingFunction, TransitionConfig } from 'svelte/transition';

interface ExpandParams {
	delay: number;
	duration: number;
	easing: EasingFunction;
	x: 'width' | 'min-width' | 'max-width';
	y: 'height' | 'min-height' | 'max-height';
	axis: 'x' | 'y';
	size: number;
}

export function expand(node: Element, params: ExpandParams): TransitionConfig {
	const {
		delay = 0,
		duration = 400,
		easing = cubicOut,
		axis = 'x',
		x = 'width',
		y = 'height',
		size = 0
	} = params;
	const style = getComputedStyle(node);
	const targetSize = parseInt(axis === 'x' ? style.width : style.height, 10);
	const delta = targetSize - size;

	return {
		delay,
		duration,
		easing,
		css: (t: number, u: number) => `
          ${axis === 'x' ? x : y}: ${targetSize - delta * u}px;
        `
	};
}
