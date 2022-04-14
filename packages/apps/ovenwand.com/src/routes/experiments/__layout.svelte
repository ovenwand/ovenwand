<script lang="ts">
	import { page } from '$app/stores';
	import { createClassName } from '@ovenwand/util.browser';
	import { Column, Grid } from '@ovenwand/ui.grid';
	import { Sidebar } from '$lib/components/sidebar';

	const experiments = [
		{
			title: 'Pendulum',
			href: '/experiments/pendulum'
		},
		{
			title: 'Star field',
			href: '/experiments/star-field'
		},
		{
			title: 'Game of life',
			href: '/experiments/game-of-life'
		},
		{
			title: 'Marching squares',
			href: '/experiments/marching-squares'
		}
	];

	let title: string;

	$: title = experiments.find((e) => e.href === $page.url.pathname)?.title;

	function anchorClass(experiment) {
		return createClassName({
			active: $page.url.pathname === experiment.href
		});
	}
</script>

<div class="flex min-h-full min-w-full">
	<Sidebar active={true}>
		<svelte:fragment slot="expand">
			<Grid relative>
				<Column>
					<h1>Experiments</h1>

					{#each experiments as experiment}
						<div>
							<a href={experiment.href} class={anchorClass(experiment)}>
								{experiment.title}
							</a>
						</div>
					{/each}
				</Column>
			</Grid>
		</svelte:fragment>
	</Sidebar>
	<Grid relative class="flex-auto min-h-full">
		<Column>
			<h2>{title}</h2>
		</Column>
		<Column class="flex flex-col items-center justify-center" columns={12}
			><!-- columns required, to calculate pool column size in ./index.svelte -->
			<slot />
		</Column>
	</Grid>
</div>
