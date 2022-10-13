<script lang="ts">
	import { Button, Column, Grid } from '@ovenwand/ui';
	import { enhance } from '$app/forms';
	export let errors: { form?: string } | undefined;
</script>

<Grid>
	<Column>
		<form method="POST" use:enhance>
			{#if errors?.form}
				<p>{errors.form}</p>
			{/if}

			<input type="email" name="email" />
			<input type="password" name="password" />

			<Button type="submit">Login</Button>
		</form>
	</Column>
</Grid>
