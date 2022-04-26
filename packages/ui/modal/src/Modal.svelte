<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui.grid';
	import { Overlay } from '@ovenwand/ui.overlay';
	import { Sheet } from '@ovenwand/ui.sheet';
	export let active = false;
</script>

{#if active}
	<Overlay class="flex items-center justify-center" on:click={() => (active = false)}>
		<Grid gap-outside={false}>
			<Column columns={8} offset={2}>
				<Sheet padding background rounded shadow>
					<slot />
				</Sheet>
			</Column>
		</Grid>
	</Overlay>
{/if}
