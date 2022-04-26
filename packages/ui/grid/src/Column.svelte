<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';
	import type { Breakpoint } from './util';
	import { createColumnStyle } from './util';

	let className: string = null;
	export { className as class };
	export let style: Record<string, unknown> = {};

	export let columns: number | Record<Breakpoint, number> = null;
	export let offset: number | Record<Breakpoint, number> = null;

	let columnStyle: string;

	$: columnClassName = createClassName({
		[className]: className
	});

	$: columnStyle = createColumnStyle(columns, offset, style);
</script>

<div class="column {columnClassName}" style={columnStyle}>
	<slot />
</div>

<style lang="postcss">
	.column {
		--ow-columns-xs: 12;
		--ow-columns-sm: var(--ow-columns-xs);
		--ow-columns-md: var(--ow-columns-sm);
		--ow-columns-lg: var(--ow-columns-md);
		--ow-columns-xl: var(--ow-columns-lg);

		--ow-column-offset-xs: auto;
		--ow-column-offset-sm: var(--ow-column-offset-xs);
		--ow-column-offset-md: var(--ow-column-offset-sm);
		--ow-column-offset-lg: var(--ow-column-offset-md);
		--ow-column-offset-xl: var(--ow-column-offset-lg);
	}

	.column {
		--ow-columns: var(--ow-columns-xs);
		--ow-column-offset: var(--ow-column-offset-xs);
		grid-column: var(--ow-column-offset, auto) / span var(--ow-columns, 12);
	}

	/* Breakpoint: SM */
	@media screen(sm) {
		.column {
			--ow-columns: var(--ow-columns-sm);
			--ow-column-offset: var(--ow-column-offset-sm);
		}
	}

	/* Breakpoint: MD */
	@media screen(md) {
		.column {
			--ow-columns: var(--ow-columns-md);
			--ow-column-offset: var(--ow-column-offset-md);
		}
	}

	/* Breakpoint: LG */
	@media screen(lg) {
		.column {
			--ow-columns: var(--ow-columns-lg);
			--ow-column-offset: var(--ow-column-offset-lg);
		}
	}

	/* Breakpoint: XL */
	@media screen(xl) {
		.column {
			--ow-columns: var(--ow-columns-xl);
			--ow-column-offset: var(--ow-column-offset-xl);
		}
	}
</style>
