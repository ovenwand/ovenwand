<script lang="ts">
	import { Grid, Column } from '@ovenwand/ui.grid';
	import { Logo } from '../logo';
	import { Navigation } from '../navigation';
</script>

<Grid>
	<Column class="flex">
		<a href="/">
			<Logo size="small" />
		</a>

		<div class="flex-grow" />

		<Navigation />
	</Column>
</Grid>
