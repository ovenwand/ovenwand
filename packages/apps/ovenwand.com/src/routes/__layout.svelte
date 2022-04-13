<script lang="ts">
	import '../app.css';
	import { DefaultLayout } from '@ovenwand/ui.layout';
	import { Footer } from '$lib/components/footer';
</script>

<DefaultLayout>
	<slot />

	<svelte:fragment slot="after-content">
		<Footer />
	</svelte:fragment>
</DefaultLayout>
