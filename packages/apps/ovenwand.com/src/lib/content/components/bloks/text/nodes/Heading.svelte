<script lang="ts">
	export let level = 2;
	$: tag = `h${level}`;
</script>

<svelte:element this={tag} {...$$restProps}>
	<slot />
</svelte:element>
