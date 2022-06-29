<script lang="ts">
	import { formatDistanceToNow } from '@ovenwand/util.date';
	import { parseUserAgent } from '@ovenwand/util';
	import type { IEvent } from '$lib/store';

	export let events: IEvent[];
</script>

<table>
	<caption>Last month's events</caption>
	<thead>
		<tr>
			<th>Date</th>
			<th>Type</th>
			<th>Page</th>
			<th>Client</th>
			<th>Speed</th>
		</tr>
	</thead>
	<tbody>
		{#each events as event}
			{@const agent = parseUserAgent(event.details.agent)}
			<tr>
				<td>{formatDistanceToNow(new Date(event.timestamp))} ago</td>
				<td>{event.type}</td>
				<td>{event.page}</td>
				<td>{agent.browser.name}</td>
				<td>{event.details.speed}</td>
			</tr>
		{/each}
	</tbody>
</table>
