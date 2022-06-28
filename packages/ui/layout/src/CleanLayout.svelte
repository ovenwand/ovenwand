<script lang="ts">
	import Base from './BaseLayout.svelte';

	let className: string;
	export { className as class };
</script>

<Base>
	<div id="app" class={className}>
		<main>
			<slot />
		</main>
	</div>
</Base>
