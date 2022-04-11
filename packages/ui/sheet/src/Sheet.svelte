<script lang="ts">
	import { createClassName } from '@ovenwand/util.dom';

	let className: string = null;
	export { className as class };

	export let padding = false;
	export let rounded = false;
	export let shadow = false;

	$: sheetClassName = createClassName({
		[className]: className,
		'p-2': padding,
		rounded,
		shadow
	});
</script>

<div class={sheetClassName}>
	<slot />
</div>
