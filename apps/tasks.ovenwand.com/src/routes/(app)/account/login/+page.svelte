<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { Login } from '@ovenwand/auth';
	import { Panel } from '$lib/components';
	export let form;
</script>

<Grid class="min-h-full" relative>
	<Column class="flex flex-col items-center justify-center">
		<Panel title="Login">
			<Login>
				<svelte:fragment slot="errors">
					{#if form?.form}
						<p>{form.form}</p>
					{/if}
				</svelte:fragment>
			</Login>
		</Panel>
	</Column>
</Grid>
