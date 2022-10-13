<script lang="ts">
  import { Button } from '@ovenwand/ui.button';
  export let action = null;
  export let enhance;
</script>

<form method="POST" {action} use:enhance>
  <slot name="errors"/>

  <input type="email" name="email" />
  <input type="password" name="password" />

  <Button type="submit">Login</Button>
</form>
