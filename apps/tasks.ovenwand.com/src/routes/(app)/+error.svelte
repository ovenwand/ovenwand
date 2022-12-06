<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
</script>

<Grid class="min-h-full" relative>
	<Column class="flex flex-col items-center justify-center">
		<h2 class="text-5xl font-extrabold">{$page.status}</h2>
		<h1 class="text-4xl font-bold my-2">{$page.error.message}</h1>

		{#if dev}
			<pre><code>{JSON.stringify($page.error)}</code></pre>
		{/if}
	</Column>
</Grid>
