<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';

	let className: string;
	export { className as class };
	export let style: string;
	export let disabled: boolean;

	$: buttonClassName = createClassName({});
</script>

<button class={className} {style} {disabled} on:click>
	<slot />
</button>
