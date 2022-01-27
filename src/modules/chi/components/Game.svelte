<script lang="ts">
    import { onInitialize, onLoad, onTick, save, Save } from '$modules/chi/engine';
    import { lifecycle, player } from '$modules/chi/store';
    import { Sidebar } from '$modules/chi/components/sidebar';
    import { Viewport } from '$modules/chi/components/viewport';
    import Engine from './Engine.svelte';
    import Map from './Map.svelte';

    const { loading } = lifecycle;

    export let view: string | false = false;

    onLoad((data) => {
        player.load(data);
    });

    onInitialize((delta) => {
        player.tick(delta);
    });

    onTick((delta) => {
        player.tick(delta);
        save.autosave(delta, player.save);
    });

    player.onCollect(() => {
        save.persist(player.save());
    });

    player.onBuy(() => {
        save.persist(player.save());
    });

    player.onSell(() => {
        save.persist(player.save());
    });

    save.onWipe((data: Save) => {
        player.load(data);
    });
</script>

<Engine>
	<div class="game grid h-screen w-max-screen o-hidden">
		<Viewport>
			{#if $loading}
				Loading...
			{:else}
				<Map/>
			{/if}
		</Viewport>

		<Sidebar active={!!view}>
			<slot name="navigation"/>

			<svelte:fragment slot="expand">
				{#if $loading}
					Loading...
				{:else}
					<slot name="view"/>
				{/if}
			</svelte:fragment>
		</Sidebar>
	</div>
</Engine>

<style>
    @media screen and (orientation: landscape) {
        .game {
            grid-template-columns: 1fr auto;
        }
    }

    @media screen and (orientation: portrait) {
        .game {
            grid-template-rows: 1fr auto;
        }
    }
</style>
