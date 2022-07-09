<script lang="ts">
	import '../app.css';
	import { Layout } from '@ovenwand/app';
	import { ApplicationSidebar, Header } from '$lib/components';
</script>

<Layout header>
	<svelte:fragment slot="before-content">
		<Header />
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="outside">
		<ApplicationSidebar />
	</svelte:fragment>
</Layout>
