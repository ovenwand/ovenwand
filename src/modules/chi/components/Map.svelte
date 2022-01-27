<script lang="ts">
    import { player } from '$modules/chi/store';
    import { format } from '$modules/chi/util';
    import { Lily } from '$modules/chi/components/objects';
    const { chi, objects } = player;
</script>

<style>
    .map {
        position: relative;
        background-image: url("$modules/chi/static/background-garden.jpg");
        background-size: cover;
        z-index: 0;
    }

    .map__shadow {
        pointer-events: none;
        z-index: -1;
    }
</style>

<div class="map relative h-full text-color-inverse">
	<div class="map__stats flex flex-column align-center justify-center">
		<span>{format($chi.bank)}</span>
		<span>{format($chi.perSecond)}</span>

		<button on:click={() => player.collect()}>
			Collect
		</button>
	</div>

	<div class="map__objects">
		{#each $objects as object}
			{#if object.type.id === 'lily'}
				<Lily store={object}/>
			{/if}
		{/each}
	</div>

	<div class="map__shadow absolute top left h-full w-full bg-color-inverse" style="opacity: {$chi.level}"></div>
</div>