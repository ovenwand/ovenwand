<script lang="ts">
	export let loading = true;
</script>

{#if loading}
	<div>...</div>
{:else}
	<slot />
{/if}
