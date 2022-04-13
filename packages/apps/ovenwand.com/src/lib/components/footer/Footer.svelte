<script lang="ts">
	import { fly } from 'svelte/transition';

	const name = 'Ovenwand';
	const currentYear = new Date().getFullYear();
	$: copyright = `&copy; ${name} ${currentYear}`;
</script>

<footer in:fly={{ delay: 250, duration: 300, y: 8 }} out:fly={{ duration: 200 }}>
	<slot {copyright}>
		<span class="display-4 weight-normal">{@html copyright}</span>
	</slot>
</footer>

<style lang="postcss">
	footer {
		align-items: center;
		color: white;
		display: flex;
		justify-content: center;
	}
</style>
