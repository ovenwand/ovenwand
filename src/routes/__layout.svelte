<script lang="ts">
	import '../app.css';

	import Footer from '$lib/footer';
</script>

<style>
	#app {
			background-image: url(/background.png);
			background-position: center;
      background-size: cover;
			display: grid;
			height: 100vh;
			grid-template-rows: 1fr 5rem;
	}
</style>

<div id="app">
	<main>
		<slot />
	</main>

	<Footer/>
</div>
