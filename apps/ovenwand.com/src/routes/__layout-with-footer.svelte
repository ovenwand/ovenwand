<script lang="ts">
	import '../app.css';
	import { DefaultLayout } from '@ovenwand/ui';
	import { ApplicationSidebar, Base, Footer } from '$lib/components';
</script>

<Base>
	<DefaultLayout footer>
		<slot />

		<svelte:fragment slot="after-content">
			<Footer />
		</svelte:fragment>

		<svelte:fragment slot="outside">
			<ApplicationSidebar />
		</svelte:fragment>
	</DefaultLayout>
</Base>
