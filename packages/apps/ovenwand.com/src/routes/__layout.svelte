<script lang="ts">
	import '../app.css';
	import { DefaultLayout } from '@ovenwand/ui';
	import { ApplicationSidebar, Footer, Header } from '$lib/components';
</script>

<DefaultLayout header footer>
	<svelte:fragment slot="before-content">
		<Header />
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="after-content">
		<Footer />
	</svelte:fragment>

	<svelte:fragment slot="outside">
		<ApplicationSidebar />
	</svelte:fragment>
</DefaultLayout>
