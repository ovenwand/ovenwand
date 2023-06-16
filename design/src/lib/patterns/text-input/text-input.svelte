<script>
  import { uuid } from "../../utils.js";
  import { SIZE } from "./constants.js";

  /** @type {string} */
  export let id = `text-input-${uuid()}`;

  /** @type {string} */
  export let labelText = '';

  /** @type {string} */
  export let helperText = '';

  /** @type {string} */
  export let invalidText = '';

  /** @type {boolean} */
  export let disabled = false;

  /** @type {boolean} */
  export let invalid = false;

  /** @type {string} */
  export let size = SIZE.MEDIUM;

  /** @type {boolean} */
  $: hasLabelText = Boolean(labelText) || $$slots.default;

  /** @type {boolean} */
  $: hasHelperText = Boolean(helperText) || $$slots['helper-text'];

  /** @type {boolean} */
  $: hasInvalidText = Boolean(invalidText) || $$slots['invalid-text'];

  /** @type {boolean} */
  $: shouldShowInvalidText = invalid && hasInvalidText;
</script>

<div
	class="ow-text-input"
	class:ow-text-input--disabled={disabled}
	class:ow-text-input--invalid={invalid}
	class:ow-text-input--small={size === SIZE.SMALL}
	class:ow-text-input--medium={size === SIZE.MEDIUM}
	class:ow-text-input--large={size === SIZE.LARGE}
>
	{#if hasLabelText}
		<div class="ow-text-input__label">
			<label for={id}>
				{labelText}
				<slot name="label" />
			</label>
		</div>
	{/if}

	<div class="ow-text-input__field">
		<input
			{id}
			{disabled}
			aria-invalid={invalid}
			{...$$restProps}
		/>
		<slot />
	</div>

	{#if hasHelperText || shouldShowInvalidText}
		<div class="ow-text-input__helper">
			<label for={id}>
				{#if shouldShowInvalidText}
					{invalidText}
					<slot name="invalid-text" />
				{:else}
					{helperText}
					<slot name="helper-text" />
				{/if}
			</label>
		</div>
	{/if}
</div>
