<script lang="ts">
	let className: string = null;
	export { className as class };
	export let type: string = null;
	export let style: string = null;
	export let disabled = false;
</script>

<button class={className} {type} {style} {disabled} on:click>
	<slot />
</button>
