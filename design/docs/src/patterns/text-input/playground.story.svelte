<script>
  import { SIZE } from "../../../../src/patterns/text-input/constants.js";
  import TextInput from "../../../../src/patterns/text-input/text-input.svelte";

  // Little hack to trick tailwind:

  // Blocks
  //  ow-text-input
  //  ow-text-input__label
  //  ow-text-input__field
  //  ow-text-input__helper
  //  ow-text-input__error

  // Modifiers
  //  ow-text-input--invalid
  //  ow-text-input--disabled

  // Sizes
  //  ow-text-input--small
  //  ow-text-input--medium
  //  ow-text-input--large

  // End little hack

  /** @type {import('@histoire/plugin-svelte').Hst} */
  export let Hst;

  let disabled = false;
  let invalid = false;
  let size = SIZE.MEDIUM;

  $: source = `
    `.trim();
</script>

<Hst.Story id="text-input" title="Text input/Playground" {source}>
  <TextInput
    labelText="Label text"
    helperText="Helper text"
    invalidText="Invalid text"
    placeholder="Placeholder"
    {disabled}
    {invalid}
    {size}
  />
  <svelte:fragment slot="controls">
    <Hst.Checkbox
      title="Disabled"
      bind:value={disabled}
    />
    <Hst.Checkbox
      title="Invalid"
      bind:value={invalid}
    />
    <Hst.Select
      title="Size"
      bind:value={size}
      options={Object.values(SIZE)}
    />
  </svelte:fragment>
</Hst.Story>
