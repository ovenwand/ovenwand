<script>
  import { icons } from '../../tokens/icons/index.js';
  import Loading from '../loading/loading.svelte';
  import { VARIANT, SIZE, STATUS } from './constants.js';

  /** @type {import('./constants.js').Variant} */
  export let variant = VARIANT.PRIMARY;

  /** @type {import('./constants.js').Size} */
  export let size = SIZE.LG;

  /** @type {import('./constants.js').Status} */
  export let status = STATUS.IDLE;

  /** @type {string | undefined} */
  export let icon = undefined;

  /** @type {boolean} */
  let isAnchor = false;
  $: isAnchor = $$restProps.href !== undefined;

  /** @type {'a' | 'button'} */
  let tag = 'button';
  $: tag = isAnchor ? 'a' : 'button';

  /** @type {boolean} */
  let isIconOnly = false;
  $: isIconOnly = !$$slots.default && Boolean(icon);

  /** @type {Promise<{ default: any } | undefined>} */
  let iconModule;
  $: switch(status) {
	case STATUS.ERROR:
		iconModule = icons['error--filled']();
		break;
	case STATUS.SUCCESS:
		iconModule = icons['checkmark--filled']();
		break;
	default:
		// @ts-expect-error Type 'undefined' cannot be used as an index type.js(2538)
		iconModule = icons[icon]?.();
  }
</script>

<svelte:element
	this={tag}
	class="ow-button"
	class:ow-button--icon-only={isIconOnly}
	class:ow-button--primary={variant === VARIANT.PRIMARY}
	class:ow-button--secondary={variant === VARIANT.SECONDARY}
	class:ow-button--ghost={variant === VARIANT.GHOST}
	class:ow-button--danger={variant === VARIANT.DANGER}
	class:ow-button--sm={size === SIZE.SM}
	class:ow-button--md={size === SIZE.MD}
	class:ow-button--lg={size === SIZE.LG}
	class:ow-button--xl={size === SIZE.XL}
	class:ow-button--2xl={size === SIZE.XXL}
	class:ow-button--loading={status === STATUS.LOADING}
	class:ow-button--error={status === STATUS.ERROR}
	class:ow-button--success={status === STATUS.SUCCESS}
	disabled={isAnchor ? null : status === STATUS.DISABLED}
	aria-disabled={isAnchor ? status === STATUS.DISABLED : null}
	{...$$restProps}
>
	<slot />

	{#if status === STATUS.LOADING}
		<Loading size="inline" />
	{:else if iconModule}
		{#await iconModule then IconComponent}
			<svelte:component this={IconComponent?.default} />
		{/await}
	{/if}
</svelte:element>
