<script lang="ts">
	export let active = false;
</script>

{#if active}
	<div
		class="
            fixed
            flex
            items-center
            justify-center
            inset-0
            bg-gray-900/80
        "
		on:click|self={() => (active = false)}
	>
		<div class="p-4 bg-gray-300 dark:bg-gray-800">
			<slot />
		</div>
	</div>
{/if}
