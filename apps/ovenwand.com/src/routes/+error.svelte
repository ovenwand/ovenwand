<script lang="ts">
	import '../app.css';
	import { Footer, Header, Layout } from '@ovenwand/app';
	import { Column, Grid } from '@ovenwand/ui';
	import { page } from '$app/stores';
	import { ApplicationSidebar, Navigation } from '$lib/components';
</script>

<Layout header footer>
	<svelte:fragment slot="before-content">
		<Header>
			<Navigation/>
		</Header>
	</svelte:fragment>

	<Grid class="min-h-full">
		<Column class="flex flex-col items-center justify-center min-h-full" columns={{ md: 8 }} offset={{ md: 2 }}>
			<h1>{$page.status}</h1>
			<h3>{$page.error.message}</h3>
		</Column>
	</Grid>

	<svelte:fragment slot="after-content">
		<Footer />
	</svelte:fragment>

	<svelte:fragment slot="outside">
<!--		<ApplicationSidebar />-->
	</svelte:fragment>
</Layout>
