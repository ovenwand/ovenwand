<script lang="ts">
	import hljs from 'highlight.js/lib/core';
	import bash from 'highlight.js/lib/languages/bash';
	import json from 'highlight.js/lib/languages/json';
	import typescript from 'highlight.js/lib/languages/typescript';
	import xml from 'highlight.js/lib/languages/xml';
	// import javascript from 'highlight.js/lib/languages/javascript';
	import 'highlight.js/styles/base16/monokai.css';

	hljs.registerLanguage('bash', bash);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('html', xml);
	hljs.registerLanguage('vue', xml);
	hljs.registerLanguage('javascript', typescript);
	hljs.registerLanguage('typescript', typescript);

	let element;

	$: if (element) {
		hljs.highlightElement(element);
	}
</script>

<pre class="m-4 p-4" {...$$restProps}>
  <code bind:this={element}>
    <slot />
  </code>
</pre>
