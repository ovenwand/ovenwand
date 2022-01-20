<script lang="ts">
	import { createClassName } from '$lib/utils/createClassName';
  import { createStyle } from '$lib/utils/createStyle';

  let className: string = null;
  export { className as class };
	export let style: Record<string, unknown> = null;

  export let relative = false;
  export let gapOutside = true;

	$: gridClassName = createClassName({
			'grid--relative': relative,
			'grid--gap-outside': gapOutside,
      [className]: className,
	});

	$: gridStyle = style && createStyle(style);
</script>

<style lang="postcss">
		 /* Configuration */
		 :global(:root) {
				 --ow-grid: 100vw;
         --ow-gap: 1rem;
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

		.grid--gap-outside {
				--ow-gap-outside: var(--ow-gap);
		}

		.grid--gap-outside:not(.grid--relative) {
        --ow-gap-count: calc(var(--ow-columns) + 1);
		}
</style>

<div class="grid {gridClassName}" style={gridStyle}>
	<slot/>
</div>
