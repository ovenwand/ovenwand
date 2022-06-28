<script lang="ts">
	import '../app.css';
	import { DefaultLayout } from '@ovenwand/ui';
	import { ApplicationSidebar, Base, Header } from '$lib/components';
</script>

<Base>
	<DefaultLayout header>
		<svelte:fragment slot="before-content">
			<Header />
		</svelte:fragment>

		<slot />

		<svelte:fragment slot="outside">
			<ApplicationSidebar />
		</svelte:fragment>
	</DefaultLayout>
</Base>
