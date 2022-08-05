<script lang="ts">
	import { createClassName } from '@ovenwand/util';
	import { useFeatures } from '@ovenwand/app';
	import { useSidebar } from '@ovenwand/ui';

	const isFeatureEnabled = useFeatures();

	let className: string | null = null;
	export { className as class };

	const store = useSidebar();

	const items = [
		isFeatureEnabled('route.portfolio') && {
			label: 'Portfolio',
			href: '/portfolio'
		},
		isFeatureEnabled('route.about') && {
			label: 'About',
			href: '/about'
		},
		isFeatureEnabled('route.blog') && {
			label: 'Blog',
			href: '/blog'
		},
		isFeatureEnabled('route.experiments') && {
			label: 'Experiments',
			href: '/experiments'
		},
		isFeatureEnabled('ui.sidenav') && {
			label: '::',
			action: store.expand
		}
	].filter(Boolean);

	$: navClassName = createClassName({
		[className as string]: className
	});
</script>

<nav class="flex {navClassName}">
	<ul class="flex">
		{#each items as item}
			<li class="flex items-center px-4">
				{#if item.href}
					<a href={item.href}>
						{item.label}
					</a>
				{:else}
					<button on:click={() => item.action()}>
						{item.label}
					</button>
				{/if}
			</li>
		{/each}
	</ul>
	<slot />
</nav>
