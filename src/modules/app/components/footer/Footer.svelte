<script lang="ts">
	const name = 'Ovenwand';
	const currentYear = (new Date()).getFullYear();
</script>

<style>
	footer {
			align-items: center;
			color: white;
      display: flex;
			font-size: 1.5rem;
			justify-content: center;
	}
</style>

<footer>
	<span>&copy; {name} {currentYear}</span>
</footer>