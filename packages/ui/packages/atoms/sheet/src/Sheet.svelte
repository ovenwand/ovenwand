<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';

	export let id: string | null = null;

	let className: string | null = null;
	export { className as class };

	export let padding = false;
	export let rounded = false;
	export let shadow = false;
	export let background = false;

	$: sheetClassName = createClassName({
		[className as string]: className,
		'p-4': padding,
		'overflow-hidden': rounded,
		'bg-gray-100 dark:bg-gray-800': background,
		rounded,
		'drop-shadow-md': shadow
	});
</script>

<div {id} class={sheetClassName}>
	<slot />
</div>
