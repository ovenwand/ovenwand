<script>
  import { icons } from '../../../../src/lib/tokens/icons/index.js';
  import Button from '../../../../src/lib/patterns/button/button.svelte';
  import { SIZE, STATUS, VARIANT } from '../../../../src/lib/patterns/button/constants.js';

  // Little hack to trick tailwind:

  //  ow-button--icon-only

  // Variants
  //  ow-button--primary
  //  ow-button--secondary
  //  ow-button--ghost

  // Sizes
  //  ow-button--sm
  //  ow-button--md
  //  ow-button--lg
  //  ow-button--xl
  //  ow-button--2xl

  // Status
  //  ow-button--loading
  //  ow-button--error
  //  ow-button--success

  // End little hack

  /** @type import('@histoire/plugin-svelte').Hst */
	export let Hst;

  let variant = VARIANT.PRIMARY;
  let size = SIZE.LG;
  let status = STATUS.IDLE;
  let icon = 'add';

  $: source = `
<button class="ow-button ow-button--${variant}${size ? ` ow-button--${size}` : ''} ow-button--${status}"${status === STATUS.DISABLED ? ' disabled' : ''}>
  Button${status === STATUS.LOADING ? `
  <svg class="ow-loading ow-loading--inline" viewBox="0 0 100 100">
    <title>Active loading indicator</title>
    <circle class="ow-loading__background" cx="50%" cy="50%" r="{radius}"></circle>
    <circle class="ow-loading__stroke" cx="50%" cy="50%" r="{radius}"></circle>
  </svg>` : ''}${icon && status !== STATUS.LOADING ? `
  ` : ''}
</button>
  `.trim();
</script>

<Hst.Story id="button" title="Button/Playground">
	<Hst.Variant id="button" title="Text" {source}>
		<Button {variant} {size} {status}>
			Button
		</Button>

		<svelte:fragment slot="controls">
			<Hst.Radio
				title="Variant"
				bind:value={variant}
				options={Object.values(VARIANT)}
			/>

			<Hst.Select
				title="Size"
				bind:value={size}
				options={Object.values(SIZE)}
			/>

			<Hst.Select
				title="Status"
				bind:value={status}
				options={Object.values(STATUS)}
			/>
		</svelte:fragment>
	</Hst.Variant>
	<Hst.Variant title="Text and icon">
		<Button {variant} {size} {status} {icon}>
			Button
		</Button>

		<svelte:fragment slot="controls">
			<Hst.Radio
				title="Variant"
				bind:value={variant}
				options={Object.values(VARIANT)}
			/>

			<Hst.Select
				title="Size"
				bind:value={size}
				options={Object.values(SIZE)}
			/>

			<Hst.Select
				title="Status"
				bind:value={status}
				options={Object.values(STATUS)}
			/>

			<Hst.Select
				title="Icon"
				bind:value={icon}
				options={Object.keys(icons)}
			/>
		</svelte:fragment>
	</Hst.Variant>

	<Hst.Variant title="Icon">
		<Button {variant} {size} {status} {icon} />

		<svelte:fragment slot="controls">
			<Hst.Radio
				title="Variant"
				bind:value={variant}
				options={Object.values(VARIANT)}
			/>

			<Hst.Select
				title="Size"
				bind:value={size}
				options={Object.values(SIZE)}
			/>

			<Hst.Select
				title="Status"
				bind:value={status}
				options={Object.values(STATUS)}
			/>

			<Hst.Select
				title="Icon"
				bind:value={icon}
				options={Object.keys(icons)}
			/>
		</svelte:fragment>
	</Hst.Variant>
</Hst.Story>
