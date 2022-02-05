<script lang="ts">
	import '../../../../app.css';
	import Footer from '$modules/app/components/footer';
</script>

<div id="app" class="h-min-screen">
	<main>
		<slot />
	</main>

	<Footer />
</div>

<style lang="postcss">
	#app {
		background-image: url(/background.png);
		background-position: center;
		background-size: cover;
		display: grid;
		grid-template-rows: 1fr 5rem;
	}
</style>
