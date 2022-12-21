<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { useQuery } from '$lib/database';
	import { tasks } from '$lib/models';
	import { route } from '$lib/route';
	import { ApplicationState, Footer, Panel, Task } from '$lib/components';

	const { loading } = useQuery(() => tasks.query.all());

	$: todaysTasks = tasks.today;
</script>

<ApplicationState busy={$loading} />

<Footer
	links={[
		{ label: 'Focus', anchor: { href: route('/focus') } },
		{ label: 'Schedule', anchor: { href: route('/schedule') } },
		{ label: 'Explore', anchor: { href: route('/explorer') } }
	]}
/>

<Grid relative class="min-h-full auto-rows-fr">
	<Column columns={{ md: 6 }}>
		<Panel class="min-h-full" title="Welcome">
			<p>Daily info?</p>
			<ul>
				<li>Work or life day?</li>
				<li>Travel schedule?</li>
				<li>Weather?</li>
			</ul>
		</Panel>
	</Column>

	<Column columns={{ md: 6 }}>
		<Panel class="min-h-full" title="Daily focus">
			{#each $todaysTasks as task}
				<Task interactive={false} href={route(`/explorer/[id]`, { id: task._id })} {...task} />
			{/each}
		</Panel>
	</Column>
</Grid>
