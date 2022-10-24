<script lang="ts">
  import { onMount } from 'svelte';

  export let action = null;

  let form;

  onMount(() => {
    form.submit();
  });
</script>

<form bind:this={form} {action} method="POST">
  <noscript>
    <button type="submit">Click here to logout</button>
  </noscript>
</form>
