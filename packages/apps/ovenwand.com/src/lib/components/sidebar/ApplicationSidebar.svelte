<script lang="ts">
	import { onMount } from 'svelte';
	import { Column, Grid } from '@ovenwand/ui.grid';
	import { Sheet } from '@ovenwand/ui.sheet';
	import { Overlay } from '@ovenwand/ui.overlay';
	import type { SidebarStore } from '@ovenwand/ui.sidebar';
	import { store } from '@ovenwand/ui.sidebar';
	import { useMedia } from '@ovenwand/util.svelte';
	import { Sidebar, SidebarDivider, SideNavigation } from '$lib/components';

	const { portrait } = useMedia();

	let sidebar: SidebarStore;

	$: position = { top: !$portrait, left: $portrait, bottom: $portrait, right: true };

	onMount(() => {
		sidebar = store.get();
	});
</script>

{#if sidebar && $sidebar.expand}
	<Overlay on:click={() => sidebar.contract()} />
{/if}

<Sidebar {...position}>
	<svelte:fragment slot="expand">
		<Sheet class="h-full min-w-[100vw] landscape:min-w-[25vw]" background shadow>
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
