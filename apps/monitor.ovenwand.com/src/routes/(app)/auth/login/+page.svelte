<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { Login } from '@ovenwand/auth';
	import { enhance } from '$app/forms';
	export let form;
</script>

<Grid>
	<Column>
		<Login {enhance}>
			<svelte:fragment slot="errors">
				{#if form?.form}
					<p>{form.form}</p>
				{/if}
			</svelte:fragment>
		</Login>
	</Column>
</Grid>
