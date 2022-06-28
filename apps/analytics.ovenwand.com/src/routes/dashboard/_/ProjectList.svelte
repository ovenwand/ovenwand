<script lang="ts">
	import { Button } from '@ovenwand/ui';
	import type { IProject } from '$lib/store';

	export let projects: IProject[];
</script>

<table>
	<caption>Projects</caption>
	<thead>
		<tr>
			<td>
				<Button href="/projects/create">Create project</Button>
			</td>
		</tr>
		<tr>
			<th>Name</th>
		</tr>
	</thead>
	<tbody>
		{#each projects as project}
			<tr>
				<td>
					<a href="/dashboard?project={project._id}">
						{project.name}
					</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
