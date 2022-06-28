<script lang="ts">
	import '../app.css';
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import { Column, DefaultLayout, Grid, Notifications } from '@ovenwand/ui';
	import { useAnalytics } from '@ovenwand/analytics';

	const { trackPageView } = useAnalytics('335462223966110284');

	$: $page.url.pathname, browser && trackPageView();
</script>

<DefaultLayout class="h-screen" footer>
	<Notifications top />

	<Grid class="h-full">
		<Column class="h-full">
			<slot />
		</Column>
	</Grid>
</DefaultLayout>
