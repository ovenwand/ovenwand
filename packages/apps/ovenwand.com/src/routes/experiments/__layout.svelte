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

	function anchorClass(experiment: { title: string; href: string }) {
		return createClassName({
			active: $page.url.pathname === experiment.href
		});
	}
</script>

<Grid relative class="flex-auto min-h-full">
	<Column columns={3}>
		<Sidebar id="experiments-navigation" active absolute={false}>
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
	</Column>

	<Column columns={9}>
		<h2>{title}</h2>

		<div class="flex flex-col items-center justify-center">
			<slot />
		</div>
	</Column>
</Grid>
