<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Logo from '$lib/logo';
</script>

<style>
	section {
			align-items: center;
      display: flex;
			justify-content: center;
			height: 100%;
			padding: 2rem;
	}
</style>

<svelte:head>
	<title>Ovenwand</title>
</svelte:head>

<section>
	<Logo/>
</section>
