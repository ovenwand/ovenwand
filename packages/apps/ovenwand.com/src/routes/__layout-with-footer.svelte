<script lang="ts">
	import '../app.css';
	import { DefaultLayout } from '@ovenwand/ui.layout';
	import { Footer } from '$lib/components';
</script>

<DefaultLayout footer>
	<slot />

	<svelte:fragment slot="after-content">
		<Footer />
	</svelte:fragment>
</DefaultLayout>
