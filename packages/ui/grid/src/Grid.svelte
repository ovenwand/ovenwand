<script lang="ts">
	import type { TransitionConfig } from 'svelte/transition';
	import { noop } from '@ovenwand/util.fp';
	import { createClassName, createStyle } from '@ovenwand/util.browser';

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
	.grid {
		--ow-grid: 100vw;
		--ow-gap: 0rem;
		--ow-gap-outside: 0rem;
		--ow-columns: 12;
		--ow-column-offset: auto;
	}

	.grid {
		--ow-gap-count: calc(var(--ow-columns) - 1);
		--ow-gap-total: calc(var(--ow-gap) * var(--ow-gap-count));
		--ow-grid-size: calc(var(--ow-grid) - var(--ow-gap-total));
		--ow-column-size: calc(var(--ow-grid-size) / var(--ow-columns));

		display: grid;
		gap: var(--ow-gap);
		grid-template-columns: repeat(var(--ow-columns), var(--ow-column-size));
		/*grid-auto-rows: min-content;*/
		padding: var(--ow-gap-outside);
		width: var(--ow-grid);
	}

	.grid :global(.grid.grid--relative) {
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
