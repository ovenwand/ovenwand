<script lang="ts">
	import { page } from '$app/stores';
	import { createClassName } from '@ovenwand/util';
	import { Column, Grid } from '@ovenwand/ui';
	import { Sidebar } from '$lib/components/sidebar';

	const experiments = [
		{
			title: 'Canvas',
			href: '/experiments/canvas'
		},
		{
			title: 'Pendulum',
			href: '/experiments/canvas/pendulum'
		},
		{
			title: 'Star field',
			href: '/experiments/canvas/star-field'
		},
		{
			title: 'Game of life',
			href: '/experiments/canvas/game-of-life'
		},
		{
			title: 'Marching squares',
			href: '/experiments/canvas/marching-squares'
		},
		{
			title: 'React',
			href: '/experiments/react'
		},
		{
			title: 'Vue',
			href: '/experiments/vue'
		},
		{
			title: 'Vue reactivity',
			href: '/experiments/vue/reactivity'
		}
	];

	let title: string | undefined;

	$: title = experiments.find((e) => $page.url.pathname.startsWith(e.href))?.title;

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
		{#if title}
			<h2>{title}</h2>
		{/if}

		<div class="flex flex-col items-center justify-center">
			<slot />
		</div>
	</Column>
</Grid>
