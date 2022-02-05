<script lang="ts">
    import { save, Save } from '$modules/chi/engine';
    import { player } from '$modules/chi/engine/player';
    import { lifecycle } from '$modules/chi/engine/lifecycle/store';
    import { Sidebar } from '$modules/chi/components/sidebar';
    import { Viewport } from '$modules/chi/components/viewport';
    import Engine from './Engine.svelte';
    import Map from './Map.svelte';

    export let view: string | false = false;

    function onLoad({ detail: { data, delta } }) {
        player.load(data);
        player.tick(delta);

        player.on('collect', () => {
            console.log('onPlayerCollect');
            save.persist(player.save());
        });

        player.on('buy', () => {
            save.persist(player.save());
        });

        player.on('sell', () => {
            save.persist(player.save());
        });

        save.onWipe((data: Save) => {
            player.load(data);
        });
		}

	 function onTick({ detail: { delta } }) {
       player.tick(delta);
       save.autosave(delta, player.save);
   }
</script>

<Engine on:load={onLoad} on:tick={onTick}>
	<div class="game grid h-screen w-max-screen o-hidden">
		<Viewport>
			{#if ['idle', 'loading'].includes($lifecycle)}
				Loading...
			{:else}
				<Map/>
			{/if}
		</Viewport>

		<Sidebar active={!!view}>
			<slot name="navigation"/>

			<svelte:fragment slot="expand">
				{#if ['idle', 'loading'].includes($lifecycle)}
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
