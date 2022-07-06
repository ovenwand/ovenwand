<script lang="ts" context="module">
	import type { LoadEvent } from '@sveltejs/kit';

	export async function load({ session }: LoadEvent) {
		if (session.id) {
			return {
				status: 302,
				redirect: '/'
			};
		}

		return {};
	}
</script>

<script lang="ts">
	import { Button, Column, Grid } from '@ovenwand/ui';
	export let errors: { form?: string } | undefined;
</script>

<Grid>
	<Column>
		<form method="post">
			{#if errors?.form}
				<p>{errors.form}</p>
			{/if}

			<input type="email" name="email" />
			<input type="password" name="password" />

			<Button type="submit">Login</Button>
		</form>
	</Column>
</Grid>
