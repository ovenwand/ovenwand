<script lang="ts">
	import { onMount } from 'svelte';
	import { useMedia } from '@ovenwand/util';
	import { Column, Grid, Sheet, Overlay, type SidebarStore, useSidebar } from '@ovenwand/ui';
	import { Sidebar, SidebarDivider, SideNavigation } from '$lib/components';

	const { portrait } = useMedia();
	const store = useSidebar();

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
