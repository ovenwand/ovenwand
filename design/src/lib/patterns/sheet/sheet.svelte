<script>
  import { BACKGROUND, VARIANT } from './constants.js';

  export let tag = 'div';

  let className = '';
  export { className as class };

  export let style = '';

  /** @type {import('./constants.js').Variant} */
  export let variant = VARIANT.LIGHT;

  /** @type {import('./constants.js').Background} */
  export let background = BACKGROUND.GLASS;
</script>

<svelte:element
	this={tag}
	class="ow-sheet {className}"
	class:ow-sheet--light={variant === VARIANT.LIGHT}
	class:ow-sheet--dark={variant === VARIANT.DARK}
	class:ow-sheet--primary={variant === VARIANT.PRIMARY}
	class:ow-sheet--secondary={variant === VARIANT.SECONDARY}
	class:ow-sheet--solid={background === BACKGROUND.SOLID}
	class:ow-sheet--glass={background === BACKGROUND.GLASS}
	class:ow-sheet--transparent={background === BACKGROUND.TRANSPARENT}
	style="{style}"
>
	<slot />
</svelte:element>