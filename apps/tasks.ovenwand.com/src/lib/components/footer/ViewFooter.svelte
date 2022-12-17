<script lang="ts">
	import { Button, Column, Grid } from '@ovenwand/ui';
	import { footer } from './store';

	const { links } = footer;

	$: columns = 12 / $links.length;
</script>

<Grid tag="footer" class="bg-gray-300 dark:bg-gray-900 drop-shadow" gap={false} gapOutside={false}>
	{#each $links as link}
		<Column columns={link.columns ?? columns}>
			<Button full size="large" {...link.anchor}>
				{link.label}
			</Button>
		</Column>
	{/each}
</Grid>
