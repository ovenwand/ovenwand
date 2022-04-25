<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui.grid';
	import { Logo, Navigation } from '$lib/components';
</script>

<svelte:head>
	<title>Ovenwand</title>
</svelte:head>

<Grid class="h-full">
	<Column
		columns={4}
		offset={4}
		class="
				flex
				flex-col
				items-center
				justify-center
		 "
	>
		<Logo />
		<Navigation class="py-12" />
	</Column>
</Grid>
