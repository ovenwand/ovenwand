<script lang="ts">
	import '../app.css';

	import Footer from '$modules/app/components/footer';
</script>

<style>
	#app {
			background-image: url(/background.png);
			background-position: center;
      background-size: cover;
			display: grid;
			grid-template-rows: 1fr 5rem;
      min-height: 100vh;
	}
</style>

<div id="app">
	<main>
		<slot />
	</main>

	<Footer/>
</div>
