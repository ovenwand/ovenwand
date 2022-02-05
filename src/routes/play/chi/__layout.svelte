<script lang="ts">
	import { page } from '$app/stores';
	import { Column, Grid } from '$lib/components/layout';
	import { Icon } from '$lib/components/icon';
	import Footer from '$modules/app/components/footer';
	import { Game } from '$modules/chi/components';

	import treehouse from '$modules/chi/static/treehouse.svg?raw';
	import shop from '$modules/chi/static/shop.svg?raw';
	import skills from '$modules/chi/static/skills.svg?raw';
	import achievement from '$modules/chi/static/achievement.svg?raw';
	import settings from '$modules/chi/static/settings-knobs.svg?raw';

	$: view = $page.url.pathname !== '/play/chi' && $page.url.pathname;

	const views = [
		{
			icon: treehouse,
			label: 'Buildings',
			href: '/play/chi/buildings'
		},
		{
			icon: shop,
			label: 'Store',
			href: '/play/chi/store'
		},
		{
			icon: skills,
			label: 'Talents',
			href: '/play/chi/talents'
		},
		{
			icon: achievement,
			label: 'Stats',
			href: '/play/chi/stats'
		},
		{
			icon: settings,
			label: 'Settings',
			href: '/play/chi/settings'
		}
	];
</script>

<Game {view}>
	<svelte:fragment slot="navigation">
		{#each views as { icon, label, href }}
			<a
				class="flex flex-column justify-center align-center p-1"
				href={view !== href ? href : '/play/chi'}
			>
				<Icon>{@html icon}</Icon>
				<span>{label}</span>
			</a>
		{/each}
	</svelte:fragment>

	<svelte:fragment slot="view">
		<Grid class="h-min-full" relative style={{ 'grid-template-rows': '1fr auto' }}>
			<Column>
				<slot />
			</Column>
			<Column>
				<Footer let:copyright>
					<span>{@html copyright}</span>
				</Footer>
			</Column>
		</Grid>
	</svelte:fragment>
</Game>
