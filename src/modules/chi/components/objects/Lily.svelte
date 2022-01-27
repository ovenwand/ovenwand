<script lang="ts">
    import { format } from '$modules/chi/util';
	import type { GameObjectInstance } from '$modules/chi/engine';
  import type { LilyState } from '$modules/chi/engine/objects/lily';

  export let store: GameObjectInstance<LilyState>;

  $: size = $store.growthCache / 10 * 100;
</script>

<div>
	<span>{store.type.name}</span>
	<progress max="100" value={size}>{format(size, 0)}</progress>
</div>