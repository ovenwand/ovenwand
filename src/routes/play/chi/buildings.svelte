<script lang="ts">
    import { fade } from 'svelte/transition';
    import { Icon } from '$lib/components/icon';
    import { Column, Grid } from '$lib/components/layout';
    import { format } from '$modules/chi/util';
    import { player } from '$modules/chi/store';
    import * as buildingMap from '$modules/chi/engine/buildings';

    const { inventory } = player;
    const buildings = Object.values(buildingMap);
</script>

<Grid in={[fade, { delay: 300 }]} out={[fade, { duration: 200 }]} relative>
	{#each buildings as building}
		{@const inventoryCount = $inventory[building.id]}
		{@const canBuy = building.stock(inventoryCount) <= 0}
		{@const buyPrice = building.price(inventoryCount)}
		{@const canSell = $inventory[building.id] <= 0}
		{@const sellPrice = building.price(inventoryCount - 1) * 0.25}

		<Column class="flex">

			<Icon>{@html building.icon}</Icon>

			<span class="flex-full">{building.name}</span>

			<button on:click={() => player.buy(building)} disabled={canBuy}>
				Buy ({format(buyPrice)})
			</button>

			<button on:click={() => player.sell(building)} disabled={canSell}>
				Sell ({format(sellPrice)})
			</button>

			<button on:click={() => console.log(building)}>
				Info ({inventoryCount})
			</button>
		</Column>
	{/each}
</Grid>
