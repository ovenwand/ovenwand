<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui.grid';
	import { Overlay } from '@ovenwand/ui.overlay';
	import { Sheet } from '@ovenwand/ui.sheet';
	import { useMedia } from '@ovenwand/util.svelte';

	export let active = false;

	const { portrait } = useMedia();
</script>

{#if active}
	<Overlay class="flex items-center justify-center" on:click={() => (active = false)}>
		<Grid class="pointer-events-none" gapOutside={false}>
			<Column class="pointer-events-auto" columns={$portrait ? 10 : 8} offset={$portrait ? 1 : 2}>
				<Sheet padding background rounded shadow>
					<slot />
				</Sheet>
			</Column>
		</Grid>
	</Overlay>
{/if}
