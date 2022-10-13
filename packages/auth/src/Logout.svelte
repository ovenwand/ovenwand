<script lang="ts">
  import { onMount } from 'svelte';

  export let enhance;

  let form;

  onMount(() => {
    form.submit();
  });
</script>

<form bind:this={form} method="POST" use:enhance>
  <noscript>
    <button type="submit">Click here to logout</button>
  </noscript>
</form>
