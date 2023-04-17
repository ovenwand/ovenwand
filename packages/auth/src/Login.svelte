<script lang="ts">
	import { Button } from '@ovenwand/ui.button';
	export let action = null;
</script>

<form method="POST" {action}>
	<slot name="errors" />

	<input type="email" name="email" />
	<input type="password" name="password" />

	<Button type="submit">Login</Button>
</form>
