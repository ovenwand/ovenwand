<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { onLoad, onTick, start } from '$modules/chi/engine/lifecycle';
    import { lifecycle } from '$modules/chi/engine/lifecycle/store';

    const dispatch = createEventDispatcher();

    if ($lifecycle === 'idle') {
        onLoad((data, delta) => dispatch('load', { data, delta }));
        onTick((delta) => dispatch('tick', { delta }));
        start();
		}
</script>

<slot />
