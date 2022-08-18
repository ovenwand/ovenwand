<script lang="ts">
	import '../app.css';
	import { Column, DefaultLayout, Grid, Notifications } from '@ovenwand/ui';
	import { Footer } from '$lib/components';
</script>

<DefaultLayout class="h-screen" footer>
	<Notifications top />

	<Grid class="h-full">
		<Column class="h-full">
			<slot />
		</Column>
	</Grid>

	<svelte:fragment slot="after-content">
		<Footer />
	</svelte:fragment>
</DefaultLayout>
