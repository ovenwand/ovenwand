<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { useTasks } from '$lib/database';
	import { ApplicationState, Footer, Panel, Task } from '$lib/components';
	import { useQuery } from '$lib/database';

	const { tasks, today } = useTasks();

	const { loading } = useQuery(() => tasks.query.all());

	$: todaysTasks = $today;
</script>

<ApplicationState busy={$loading} />

<Footer
	links={[
		{ label: 'Focus', anchor: { href: '/focus' } },
		{ label: 'Schedule', anchor: { href: '/schedule' } },
		{ label: 'Explore', anchor: { href: '/explorer' } }
	]}
/>

<Grid relative class="min-h-full auto-rows-fr">
	<Column columns={{ md: 6 }}>
		<Panel class="min-h-full" title="Welcome">
			Daily info?<br />
			- Work or life day?<br />
			- Travel schedule?<br />
			- Weather?<br />
		</Panel>
	</Column>

	<Column columns={{ md: 6 }}>
		<Panel class="min-h-full" title="Daily focus">
			{#each todaysTasks as task}
				<Task interactive={false} href={`/explorer/${task._id}`} {...task} />
			{/each}
		</Panel>
	</Column>
</Grid>
