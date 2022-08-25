<script lang="ts">
	import '../../app.css';
	import { Footer, Header, Layout } from '@ovenwand/app';
	import { ApplicationSidebar, Navigation } from '$lib/components';
</script>

<Layout header footer>
	<svelte:fragment slot="before-content">
		<Header>
			<Navigation/>
		</Header>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="after-content">
		<Footer />
	</svelte:fragment>

	<svelte:fragment slot="outside">
		<ApplicationSidebar />
	</svelte:fragment>
</Layout>
