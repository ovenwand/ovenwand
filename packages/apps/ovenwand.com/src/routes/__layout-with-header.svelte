<script lang="ts">
	import '../app.css';
	import { DefaultLayout } from '@ovenwand/ui.layout';
	import { Header } from '$lib/components';
</script>

<DefaultLayout header>
	<svelte:fragment slot="before-content">
		<Header />
	</svelte:fragment>

	<slot />
</DefaultLayout>
