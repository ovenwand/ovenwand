<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui.grid';
	import { Overlay } from '@ovenwand/ui.overlay';
	import { Sheet } from '@ovenwand/ui.sheet';
	import { useMedia } from '@ovenwand/util.svelte';

	export let active = false;

	const { xs } = useMedia();
</script>

{#if active}
	<Overlay class="flex items-center justify-center" on:click={() => (active = false)}>
		<Grid class="pointer-events-none" gapOutside={$xs}>
			<Column
				class="pointer-events-auto"
				columns={{ sm: 10, md: 8, lg: 6 }}
				offset={{ sm: 1, md: 2, lg: 3 }}
			>
				<Sheet padding background rounded shadow>
					<slot />
				</Sheet>
			</Column>
		</Grid>
	</Overlay>
{/if}
