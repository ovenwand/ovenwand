<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Column, Grid } from '@ovenwand/ui';
	import { useProjects } from '$lib/store';

	let name: string;

	const { save: saveProject } = useProjects();

	async function createProject() {
		await saveProject({ name });
		goto('/dashboard');
	}
</script>

<Grid>
	<Column>
		<form on:submit|preventDefault={createProject}>
			<input type="text" name="name" bind:value={name} />

			<Button type="submit">Create project</Button>
		</form>
	</Column>
</Grid>
