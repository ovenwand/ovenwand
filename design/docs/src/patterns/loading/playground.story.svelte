<script>
  import { SIZE } from '../../../../src/patterns/loading/constants.js';
  import Loading from '../../../../src/patterns/loading/loading.svelte';

  // Little hack to trick tailwind:

  // Sizes
  //  ow-loading--small
  //  ow-loading--medium
  //  ow-loading--large
  //  ow-loading--inline
  //  ow-loading--flexible
  
  // End little hack

  /** @type import('@histoire/plugin-svelte').Hst */
  export let Hst;

  let size = 'flexible';

  $: radius = ['small', 'inline'].includes(size) ? 41 : 44;

  $: source = `
<svg class="ow-loading ow-loading--${size}" viewBox="0 0 100 100">
  <title>Active loading indicator</title>
  <circle class="ow-loading__background" cx="50%" cy="50%" r="${radius}"></circle>
  <circle class="ow-loading__stroke" cx="50%" cy="50%" r="${radius}"></circle>
</svg>
	`.trim();
</script>

<Hst.Story id="loading" title="Loading/Playground" {source}>
	<Loading {size} />

	<svelte:fragment slot="controls">
		<Hst.Select
			title="Size"
			bind:value={size}
			options={Object.values(SIZE)}
		/>
	</svelte:fragment>
</Hst.Story>
