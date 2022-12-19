<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { useQuery } from '$lib/database';
	import { tasks } from '$lib/models';
	import { ApplicationState, Footer, Panel, Task } from '$lib/components';

	const { loading } = useQuery(() => tasks.query.all());

	$: todaysTasks = tasks.today;
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
				<Task interactive={false} href={`/explorer/${task._id}`} {...task} />
			{/each}
		</Panel>
	</Column>
</Grid>
