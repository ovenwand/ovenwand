<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';
	import { Column, Grid } from '@ovenwand/ui.grid';
	import Notification from './Notification.svelte';
	import { useNotifications } from './store';

	export let top = false;
	export let bottom = !top;
	export let left = false;
	export let right = !left;

	const { notifications } = useNotifications();

	const notificationsClassName = createClassName({
		'top-0': top,
		'right-0': right,
		'bottom-0': bottom,
		'left-0': left
	});
</script>

{#if $notifications.length}
	<Grid class="fixed {notificationsClassName}">
		{#each $notifications as notification}
			<Column columns={{ sm: 3 }} offset={{ sm: 9 }}>
				<slot {notification}>
					<Notification {...notification} />
				</slot>
			</Column>
		{/each}
	</Grid>
{/if}
