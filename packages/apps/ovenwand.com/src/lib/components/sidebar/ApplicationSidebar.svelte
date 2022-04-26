<script lang="ts">
	import { onMount } from 'svelte';
	import { Column, Grid } from '@ovenwand/ui.grid';
	import { Sheet } from '@ovenwand/ui.sheet';
	import { Overlay } from '@ovenwand/ui.overlay';
	import { store } from '@ovenwand/ui.sidebar';
	import { Sidebar, SideNavigation } from '$lib/components';

	let sidebar;

	onMount(() => {
		sidebar = store.get();
	});
</script>

{#if sidebar && $sidebar.expand}
	<Overlay on:click={() => sidebar.contract()} />
{/if}

<Sidebar>
	<svelte:fragment slot="expand">
		<Sheet class="h-full" background>
			<Grid relative>
				<Column>
					<h3>Applications</h3>
					<SidebarDivider />
					<SideNavigation on:click={() => sidebar.contract()} />
				</Column>
			</Grid>
		</Sheet>
	</svelte:fragment>
</Sidebar>
