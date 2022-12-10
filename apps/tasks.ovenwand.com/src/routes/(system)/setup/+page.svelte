<script lang="ts">
	import { Button, useNotifications } from '@ovenwand/ui';
	import { enhance } from '$app/forms';

	const { loading, notify } = useNotifications();

	export let form: import('./$types').FormData;

	let notification = notify;

	$: if (form?.data) {
		notification = notification({ type: 'success', message: form.data.message }, 3000);
	}

	$: if (form?.error) {
		notification = notification({ type: 'error', message: form.error.message }, 3000);
	}
</script>

<form
	method="POST"
	action="?/migrate"
	use:enhance={() => {
		notification = loading({ message: 'Running migrations..' }, 3000);
	}}
>
	<Button type="submit" name="mode" value="merge">Migrate</Button>
	<Button type="submit" name="mode" value="override">Start fresh</Button>
</form>
