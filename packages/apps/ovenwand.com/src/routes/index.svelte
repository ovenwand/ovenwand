<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { Logo } from '$lib/components';
</script>

<svelte:head>
	<title>Ovenwand</title>
</svelte:head>

<section
	class="
		flex
		items-center
		justify-center
		h-full
		p-8
	"
>
	<Logo />
</section>
