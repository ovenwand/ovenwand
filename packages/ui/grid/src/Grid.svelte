<script lang="ts">
	import type { Action } from 'svelte/action';
	import { createClassName, createStyle } from '@ovenwand/util.browser';
	import { noop } from '@ovenwand/util.fp';

	let className: string | null = null;
	export { className as class };
	export let style: Record<string, unknown> | null = null;

	export let relative = false;
	export let gap = true;
	export let gapOutside = true;
	export let use: [Action, unknown] = [noop(), undefined];

	let gridClassName: string;
	let gridStyle: string;
	let action: Action, payload: unknown;

	$: gridClassName = createClassName({
		'grid--relative': relative,
		'grid--gap': gap,
		'grid--gap-outside': gapOutside,
		[className as string]: className
	});

	$: gridStyle = style ? createStyle(style) : '';
	$: [action, payload] = use;
</script>

<div class="grid {gridClassName}" style={gridStyle} use:action={payload}>
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
