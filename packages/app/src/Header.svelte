<script lang="ts">
	import { Grid, Column } from '@ovenwand/ui';
	import { Logo } from '@ovenwand/brand';
</script>

<header>
	<Grid relative>
		<Column class="flex">
			<a href="/">
				<Logo size="small" />
			</a>

			<div class="flex-grow" />

			<slot />
		</Column>
	</Grid>
</header>
