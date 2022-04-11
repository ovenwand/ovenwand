<div id="app" class="min-h-screen bg-center bg-cover grid">
	<slot name="before-content" />

	<main>
		<slot />
	</main>

	<slot name="after-content" />
</div>

<style lang="postcss">
	#app {
		background-image: url(/background.png);
		grid-template-rows: 1fr 5rem;
	}
</style>
