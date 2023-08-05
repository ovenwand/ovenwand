<script>
	import { SIZE } from './constants.js';

  /** @type {import('./constants.js').Size} */
  export let size = SIZE.FLEXIBLE;

  // @ts-expect-error Argument of type 'Size' is not assignable to parameter of type '"small" | "inline"'. Type '"large"' is not assignable to type '"small" | "inline"'.js(2345)
  $: radius = [SIZE.SMALL, SIZE.INLINE].includes(size) ? 41 : 44;
</script>

<svg
	class="ow-loading"
	class:ow-loading--small={size === SIZE.SMALL}
	class:ow-loading--large={size === SIZE.LARGE}
	class:ow-loading--inline={size === SIZE.INLINE}
	class:ow-loading--flexible={size === SIZE.FLEXIBLE}
	viewBox="0 0 100 100"
>
	<title>Active loading indicator</title>
	<circle class="ow-loading__background" cx="50%" cy="50%" r="{radius}"></circle>
	<circle class="ow-loading__stroke" cx="50%" cy="50%" r="{radius}"></circle>
</svg>
