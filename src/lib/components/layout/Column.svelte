<script lang="ts">
	import { createClassName } from '$lib/util/createClassName';
	import { createStyle } from '$lib/util/createStyle';

	let className: string = null;
	export { className as class };
	export let style: Record<string, unknown> = {};

	type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	export let columns: number | Record<Breakpoint, number> = null;
	export let offset: number | Record<Breakpoint, number> = null;

	let columnStyle: string;

	$: columnClassName = createClassName({
		[className]: className
	});

	$: {
		const styleMap = {
			...style
		};

		// Update column span
		if (typeof columns === 'number' || typeof columns === 'string') {
			styleMap['--ow-columns-xs'] = columns;
		} else if (columns != null) {
			for (const breakpoint of Object.keys(columns)) {
				styleMap[`--ow-columns-${breakpoint}`] = columns[breakpoint];
			}
		}

		// Update column offset
		if (typeof offset === 'number') {
			styleMap['--ow-column-offset-xs'] = offset + 1;
		} else if (offset != null) {
			for (const breakpoint of Object.keys(offset)) {
				styleMap[`--ow-column-offset-${breakpoint}`] = offset[breakpoint] + 1;
			}
		}

		columnStyle = createStyle(styleMap);
	}
</script>

<div class="column {columnClassName}" style={columnStyle}>
	<slot />
</div>

<style>
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
	@media screen and (min-width: 420px) {
		.column {
			--ow-columns: var(--ow-columns-sm);
			--ow-column-offset: var(--ow-column-offset-sm);
		}
	}

	/* Breakpoint: MD */
	@media screen and (min-width: 1024px) {
		.column {
			--ow-columns: var(--ow-columns-md);
			--ow-column-offset: var(--ow-column-offset-md);
		}
	}

	/* Breakpoint: LG */
	@media screen and (min-width: 1440px) {
		.column {
			--ow-columns: var(--ow-columns-lg);
			--ow-column-offset: var(--ow-column-offset-lg);
		}
	}

	/* Breakpoint: XL */
	@media screen and (min-width: 1920px) {
		.column {
			--ow-columns: var(--ow-columns-xl);
			--ow-column-offset: var(--ow-column-offset-xl);
		}
	}
</style>
