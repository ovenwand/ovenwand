<script lang="ts">
	import { Column, Grid } from '$lib/components/layout';
	import { format } from '$modules/chi/util/formatter';
	import { player } from '$modules/chi/engine/player';
	const { chi } = player;
</script>

<Grid relative>
	<Column>
		<ul>
			<li>Chi: {format($chi.bank)}</li>
			<li>Total collected: {format($chi.total)}</li>
			<li>Chi per second: {format($chi.perSecond)}</li>
			<li>Chi per click: {format($chi.perClick)}</li>
		</ul>
	</Column>
</Grid>
