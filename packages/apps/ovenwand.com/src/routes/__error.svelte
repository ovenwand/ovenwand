<script lang="ts" context="module">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	/** @type {import('@sveltejs/kit').Load} */
	export function load({ error, status }: LoadInput): LoadOutput {
		return {
			props: {
				status: status,
				message: error.message
			}
		};
	}
</script>

<script lang="ts">
	export let status;
	export let message;
</script>

<h1>{status}</h1>
<h3>{message}</h3>
