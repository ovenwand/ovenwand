<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Column, Grid } from '@ovenwand/ui';

	const name = 'Ovenwand';
	const currentYear = new Date().getFullYear();

	$: copyright = `&copy; ${name} ${currentYear}`;
</script>

<footer class="text-white" in:fly={{ delay: 250, duration: 300, y: 8 }} out:fly={{ duration: 200 }}>
	<Grid>
		<Column class="flex justify-center items-center">
			<slot {copyright}>
				<span class="display-4 weight-normal">{@html copyright}</span>
			</slot>
		</Column>
	</Grid>
</footer>
