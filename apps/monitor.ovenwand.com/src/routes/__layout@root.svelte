<script lang="ts">
	import '../app.css';
	import { Notifications } from '@ovenwand/ui';
	import { Footer, Header, Layout } from '@ovenwand/app';
</script>

<Layout class="h-screen" header footer>
	<svelte:fragment slot="before-content">
		<Header />
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="after-content">
		<Footer />
	</svelte:fragment>

	<Notifications top />
</Layout>
