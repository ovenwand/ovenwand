<script lang="ts">
	import { createClassName, createStyle, noop } from '$lib/util';
	import type { TransitionConfig } from 'svelte/transition';

	type TransitionFunction<T = unknown> = (options: T) => TransitionConfig;

	let className: string = null;
	export { className as class };
	export let style: Record<string, unknown> = null;

	let inTransition: TransitionFunction | [TransitionFunction, unknown] = noop({});
	export { inTransition as in };
	let outTransition: TransitionFunction | [TransitionFunction, unknown] = noop({});
	export { outTransition as out };

	export let relative = false;
	export let gap = true;
	export let gapOutside = true;

	$: inFn = Array.isArray(inTransition) ? inTransition[0] : inTransition;
	$: inOpt = Array.isArray(inTransition) ? inTransition[1] : {};
	$: outFn = Array.isArray(outTransition) ? outTransition[0] : outTransition;
	$: outOpt = Array.isArray(outTransition) ? outTransition[1] : {};

	$: gridClassName = createClassName({
		'grid--relative': relative,
		'grid--gap': gap,
		'grid--gap-outside': gapOutside,
		[className]: className
	});

	$: gridStyle = style && createStyle(style);
</script>

<div class="grid {gridClassName}" style={gridStyle} in:inFn={inOpt} out:outFn={outOpt}>
	<slot />
</div>

<style lang="postcss">
	/* Configuration */
	:global(:root) {
		--ow-grid: 100vw;
		--ow-gap: 0rem;
		--ow-gap-outside: 0rem;
		--ow-columns: 12;
		--ow-column-offset: auto;
	}

	.grid {
		--ow-column-offset: auto; /* Reset the column offset for child columns */

		--ow-gap-count: calc(var(--ow-columns) - 1);
		--ow-gap-total: calc(var(--ow-gap) * var(--ow-gap-count));
		--ow-grid-size: calc(var(--ow-grid) - var(--ow-gap-total));
		--ow-column-size: calc(var(--ow-grid-size) / var(--ow-columns));

		display: grid;
		gap: var(--ow-gap);
		grid-template-columns: repeat(var(--ow-columns), var(--ow-column-size));
		padding: var(--ow-gap-outside);
	}

	.grid :global(.grid) {
		padding: 0;
	}

	.grid--relative {
		--ow-grid: 100%;
	}

	.grid--gap {
		--ow-gap: 1rem;
	}

	.grid--gap-outside {
		--ow-gap-outside: var(--ow-gap);
	}

	.grid--gap-outside:not(.grid--relative) {
		--ow-gap-count: calc(var(--ow-columns) + 1);
	}
</style>
