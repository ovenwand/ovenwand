<script lang="ts">
	import '../app.css';
	import { Column, DefaultLayout, Grid, Notifications } from '@ovenwand/ui';
	import { Footer } from '$lib/components';
</script>

<svelte:head>
	<title>Tasks - Ovenwand</title>
</svelte:head>

<DefaultLayout class="h-screen" footer>
	<Grid class="min-h-full">
		<Column class="min-h-full">
			<slot />
		</Column>
	</Grid>

	<svelte:fragment slot="after-content">
		<Footer />
	</svelte:fragment>

	<svelte:fragment slot="outside">
		<Notifications top />
	</svelte:fragment>
</DefaultLayout>
