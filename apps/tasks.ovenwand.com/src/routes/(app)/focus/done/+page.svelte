<script lang="ts">
	import { Button, Column, Grid } from '@ovenwand/ui';
	import { key, panelTransitions, receive, send } from '$lib/transitions/main-panel';
	import { route } from '$lib/route';
	import { Panel } from '$lib/components';
</script>

<Grid relative class="min-h-full peer peer-[.peer]:absolute peer-[.peer]:top-0">
	<Column
		class="flex flex-col justify-center"
		columns={{ sm: 10, md: 8, lg: 6, xl: 4 }}
		offset={{ sm: 1, md: 2, lg: 3, xl: 4 }}
	>
		<div in:receive={{ key }} out:send={{ key }}>
			<Panel title="W00p!" transitions={panelTransitions}>
				You finished

				<svelte:fragment slot="footer">
					<Button class="ml-auto" href={route('/focus')}>Continue with next task</Button>
				</svelte:fragment>
			</Panel>
		</div>
	</Column>
</Grid>
