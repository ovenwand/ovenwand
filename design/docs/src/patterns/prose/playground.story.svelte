<script>
  import Prose from '../../../../src/lib/patterns/prose/prose.svelte';

  /** @type import('@histoire/plugin-svelte').Hst */
  export let Hst;

  let content = `  <h1>Some title</h1>
  <p>Some paragraph</p>
  <pre><code>Some code</code></pre>`;

  $: source = `
<article class="ow-prose">
${content}
</article>
  `.trim();
</script>

<Hst.Story id="loading" title="Prose/Playground" {source}>
  <Prose>
    {@html content}
  </Prose>
	<svelte:fragment slot="controls">
		<Hst.Textarea
			title="Content"
			bind:value={content}
		/>
	</svelte:fragment>
</Hst.Story>
