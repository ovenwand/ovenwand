<script>
	import { icons } from '../../../../src/tokens/icons/index.js';

  /** @type import('@histoire/plugin-svelte').Hst */
	export let Hst;

  let icon = 'checkmark--filled';
</script>

<Hst.Story title="Icons/Playground">
	{#await icons[icon]()}
		Loading...
	{:then component}
		<svelte:component this={component.default} />
	{/await}

	<svelte:fragment slot="controls">
		<Hst.Select
			title="Icon"
			bind:value={icon}
			options={Object.keys(icons)}
		/>
	</svelte:fragment>
</Hst.Story>
