<script lang="ts">
	import '../app.css';
	import { DefaultLayout } from '@ovenwand/ui.layout';
	import { ApplicationSidebar, Header } from '$lib/components';
</script>

<DefaultLayout header>
	<svelte:fragment slot="before-content">
		<Header />
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="outside">
		<ApplicationSidebar />
	</svelte:fragment>
</DefaultLayout>
