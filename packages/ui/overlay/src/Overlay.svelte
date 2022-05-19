<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createClassName } from '@ovenwand/util.browser';

	let className: string | null = null;
	export { className as class };

	$: overlayClassName = createClassName({
		[className as string]: className
	});
</script>

<div class="fixed bg-gray-900/80 inset-0 {overlayClassName}" transition:fade on:click|self>
	<slot />
</div>
