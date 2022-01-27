<script lang="ts">
    // import { format } from '$modules/chi/util/formatter';
    import { onInitialize, onLoad, onTick, save, Save } from '$modules/chi/engine';
    import { lifecycle, player } from '$modules/chi/store';
    import { Sidebar } from '$modules/chi/components/sidebar';
    import { Viewport } from '$modules/chi/components/viewport';
    // import { Lily } from '$modules/chi/components/objects';
    import Engine from './Engine.svelte';
    import Map from './Map.svelte';

    const { loading } = lifecycle;
    const { chi, objects } = player;

    export let view: string | false = false;

    onLoad((data) => {
        player.load(data);
    });

    onInitialize((delta) => {
        player.generate(delta);
    });

    onTick((delta) => {
        player.generate(delta);
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
				<Map>
					<!--{format($chi.bank)}-->
					<!--{format($chi.perSecond)}-->
					<!--<button on:click={player.collect}>Generate</button>-->

					<!--{#each $objects as object}-->
					<!--	{#if object.type.id === 'lily'}-->
					<!--		<Lily store={object}/>-->
					<!--	{/if}-->
					<!--{/each}-->
				</Map>
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
