<script lang="ts">
	import '../../../app.css';
	import { Footer } from '$lib/components';
</script>

<div id="app" class="min-h-screen bg-center bg-cover grid">
	<slot name="navigation" />

	<main>
		<slot />
	</main>

	<slot name="footer">
		<Footer />
	</slot>
</div>

<style lang="postcss">
	#app {
		background-image: url(/background.png);
		grid-template-rows: 1fr 5rem;
	}
</style>
