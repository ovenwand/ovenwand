<script lang="ts">
	export let busy = false;
</script>

<svelte:head>
	{#if busy}
		<style>
			/* sad little hack, don't like it, but it'll do. */
			html,
			body {
				cursor: wait !important;
			}
		</style>
	{/if}
</svelte:head>

<slot />
