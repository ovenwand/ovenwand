<script lang="ts">
	import '../../app.css';
	import { Header, Layout } from '@ovenwand/app';
	import { ApplicationSidebar, Navigation } from '$lib/components';
</script>

<Layout header>
	<svelte:fragment slot="before-content">
		<Header>
			<Navigation />
		</Header>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="outside">
		<ApplicationSidebar />
	</svelte:fragment>
</Layout>
