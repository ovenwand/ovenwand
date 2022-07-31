<script lang="ts">
  import { onMount } from "svelte";

  export let html: string;

  onMount(() => {});
</script>

<div id="react-app">
  {@html html}
</div>