<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Column, Grid } from '$lib/components/layout';
	import { save } from '$modules/chi/engine';
</script>

<Grid relative in={[fade, { delay: 300 }]} out={[fade, { duration: 200 }]}>
	<Column>
		<button on:click={save.wipe}> Wipe save </button>
	</Column>
</Grid>
