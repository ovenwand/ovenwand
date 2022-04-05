<script lang="ts">
	import '../../../../app.css';
	import { Footer } from '$modules/app/components';
</script>

<div id="app" class="min-h-screen bg-center bg-cover grid">
	<main>
		<slot />
	</main>

	<Footer />
</div>

<style lang="postcss">
	#app {
		background-image: url(/background.png);
		grid-template-rows: 1fr 5rem;
	}
</style>
