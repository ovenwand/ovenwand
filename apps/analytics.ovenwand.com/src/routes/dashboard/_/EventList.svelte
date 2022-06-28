<script lang="ts">
	import type { IEvent } from '$lib/store';

	export let events: IEvent[];
</script>

<table>
	<caption>Last month's events</caption>
	<thead>
		<tr>
			<th>Timestamp</th>
			<th>Type</th>
			<th>URI</th>
			<th>Project</th>
		</tr>
	</thead>
	<tbody>
		{#each events as event}
			<tr>
				<td>{event.timestamp}</td>
				<td>{event.type}</td>
				<td>{event.uri}</td>
				<td>{event.project.name}</td>
			</tr>
		{/each}
	</tbody>
</table>
