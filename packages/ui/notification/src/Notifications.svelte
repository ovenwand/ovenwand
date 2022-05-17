<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui.grid';
	import Notification from './Notification.svelte';
	import { useNotifications } from './store';
	const { notifications } = useNotifications();
</script>

{#if $notifications.length}
	<Grid class="fixed bottom-0 right-0">
		{#each $notifications as notification}
			<Column columns={{ sm: 3 }} offset={{ sm: 9 }}>
				<slot {notification}>
					<Notification {...notification} />
				</slot>
			</Column>
		{/each}
	</Grid>
{/if}
