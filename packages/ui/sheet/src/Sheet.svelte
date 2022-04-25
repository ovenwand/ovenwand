<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';

	let className: string = null;
	export { className as class };

	export let padding = false;
	export let rounded = false;
	export let shadow = false;
	export let background = false;

	$: sheetClassName = createClassName({
		[className]: className,
		'p-2': padding,
		'bg-gray-100 dark:bg-gray-800': background,
		rounded,
		shadow
	});
</script>

<div class={sheetClassName}>
	<slot />
</div>
