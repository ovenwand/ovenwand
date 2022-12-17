<script lang="ts">
	import { Button } from '@ovenwand/ui';
	import { enhance } from '$app/forms';
	export let action: string;
	export let label: string;
</script>

<form method="POST" {action} use:enhance>
	<slot />
	<Button type="submit">{label}</Button>
</form>
