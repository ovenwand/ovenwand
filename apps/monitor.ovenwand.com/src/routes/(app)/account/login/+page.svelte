<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { Login } from '@ovenwand/auth';
	export let form;
</script>

<Grid>
	<Column>
		<Login>
			<svelte:fragment slot="errors">
				{#if form?.form}
					<p>{form.form}</p>
				{/if}
			</svelte:fragment>
		</Login>
	</Column>
</Grid>
