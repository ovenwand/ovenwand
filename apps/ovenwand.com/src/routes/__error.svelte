<script lang="ts" context="module">
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	import { Column, Grid } from '@ovenwand/ui';

	export function load({ error, status }: LoadEvent): LoadOutput {
		return {
			props: {
				status: status,
				message: error?.message
			}
		};
	}
</script>

<script lang="ts">
	export let status: number;
	export let message: string;
</script>

<Grid>
	<Column columns={{ md: 8 }} offset={{ md: 2 }}>
		<h1>{status}</h1>
		<h3>{message}</h3>
	</Column>
</Grid>
