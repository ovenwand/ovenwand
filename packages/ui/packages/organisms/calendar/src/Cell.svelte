<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';

	export let dim = false;

	$: cellClassName = createClassName({
		'p-4': true,
		'bg-gray-300 dark:bg-gray-800': !dim,
		'bg-gray-200 dark:bg-gray-700': dim,
		'text-black/50 dark:text-white/50': dim
	});
</script>

<div class={cellClassName} {...$$restProps}>
	<slot />
</div>
