<script lang="ts">
	import { Column, Grid } from '@ovenwand/ui';
	import { Logo } from '@ovenwand/brand';
	import { Navigation } from '$lib/components';
</script>

<Grid class="h-full">
	<Column
		columns={4}
		offset={4}
		class="
				flex
				flex-col
				items-center
				justify-center
		 "
	>
		<Logo size="large" />
		<Navigation class="my-24" />
	</Column>
</Grid>
