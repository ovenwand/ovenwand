<script lang="ts">
    import { fade } from 'svelte/transition';
    import { Column, Grid } from '$lib/components/layout';
    import { Icon } from '$lib/components/icon';
    import { player } from '$modules/chi/store';
    import { format } from '$modules/chi/util/formatter';
    import * as objectMap from '$modules/chi/engine/objects';

    const { inventory } = player;

    const objects = Object.values(objectMap);
</script>

<Grid in={[fade, { delay: 300 }]} out={[fade, { duration: 200 }]} relative>
	{#each objects as object}
		{@const inventoryCount = $inventory[object.id]}
		{@const canBuy = object.stock(inventoryCount) <= 0}
		{@const buyPrice = object.price(inventoryCount)}
		{@const canSell = $inventory[object.id] <= 0}
		{@const sellPrice = object.price(inventoryCount - 1) * 0.25}

		<Column class="flex">
			<Icon>{@html object.icon}</Icon>

			<span class="flex-full">{object.name}</span>

			<button on:click={() => player.buy(object)} disabled={canBuy}>
				Buy ({format(buyPrice)})
			</button>

			<button on:click={() => player.sell(object)} disabled={canSell}>
				Sell ({format(sellPrice)})
			</button>

			<button on:click={() => console.log(object)}>
				Info ({inventoryCount})
			</button>
		</Column>
	{/each}
</Grid>
