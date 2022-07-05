<script lang="ts">
	import { onMount } from 'svelte';

	let form;

	onMount(() => {
		form.submit();
	});
</script>

<form bind:this={form} method="post">
	<noscript>
		<button type="submit">logout</button>
	</noscript>
</form>
