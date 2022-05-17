<script lang="ts">
	export let href: string = null;
	export let type = 'button';
</script>

{#if href}
	<a {href} on:click {...$$restProps}>
		<slot />
	</a>
{:else}
	<button {type} on:click {...$$restProps}>
		<slot />
	</button>
{/if}
