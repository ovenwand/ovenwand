<script>
  import { BACKGROUND, VARIANT } from "../../../../src/patterns/sheet/constants.js";
  import Sheet from "../../../../src/patterns/sheet/sheet.svelte";

  // Little hack to trick tailwind:

  // Variants
  //  ow-sheet--light
  //  ow-sheet--dark
  //  ow-sheet--primary
  //  ow-sheet--secondary

  // Background
  //  ow-sheet--solid
  //  ow-sheet--glass
  //  ow-sheet--transparent

  // End little hack

  /** @type {import('@histoire/plugin-svelte').Hst} */
  export let Hst;

  let tag = "div";
  let variant = VARIANT.LIGHT;
  let background = BACKGROUND.GLASS;

  $: source = `
<${tag} class="ow-sheet">
    Content
</${tag}>
    `.trim();
</script>

<Hst.Story id="sheet" title="Sheet/Playground">
  <div style="position: relative;">
    <div class="absolute inset-8 bg-red-400" style="z-index: -1;"></div>
    <Sheet style="height: 500px;" {tag} {variant} {background}>Content</Sheet>
  </div>

  <svelte:fragment slot="controls">
    <Hst.Select
      title="Variant"
      bind:value={variant}
      options={Object.values(VARIANT)}
    />

    <Hst.Select
      title="Background"
      bind:value={background}
      options={Object.values(BACKGROUND)}
    />
  </svelte:fragment>
</Hst.Story>
