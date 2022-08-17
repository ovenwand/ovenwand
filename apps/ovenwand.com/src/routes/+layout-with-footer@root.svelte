<script lang="ts">
	import '../app.css';
	import { Footer, Layout } from '@ovenwand/app';
	import { ApplicationSidebar } from '$lib/components';
</script>

<Layout footer>
	<slot />

	<svelte:fragment slot="after-content">
		<Footer />
	</svelte:fragment>

	<svelte:fragment slot="outside">
		<ApplicationSidebar />
	</svelte:fragment>
</Layout>
