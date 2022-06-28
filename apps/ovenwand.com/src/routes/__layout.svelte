<script lang="ts">
	import '../app.css';
	import { DefaultLayout } from '@ovenwand/ui';
	import { ApplicationSidebar, Base, Footer, Header } from '$lib/components';
</script>

<Base>
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
</Base>
