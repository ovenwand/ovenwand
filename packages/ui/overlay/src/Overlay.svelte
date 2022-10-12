<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createClassName } from '@ovenwand/util.browser';

	let className: string | null = null;
	export { className as class };
	export let back = null;

	$: overlayClassName = createClassName({
		[className as string]: className
	});
</script>

<div class="fixed bg-gray-900/80 inset-0 {overlayClassName}" transition:fade>
	<a class="fixed inset-0" href={back} title="Go back" on:click>
		<span class="hidden">Go back</span>
	</a>

	<slot />
</div>
