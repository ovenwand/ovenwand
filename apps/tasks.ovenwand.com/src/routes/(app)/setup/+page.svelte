<script lang="ts">
	import { Button, useNotifications } from '@ovenwand/ui';
	import type { FaunaImportMode } from '@ovenwand/services.faunadb';

	const { loading } = useNotifications();

	const migrate = (mode: FaunaImportMode) => async () => {
		const updateNotification = loading({ message: 'Running migrations...' }, 3000);

		try {
			const response = await fetch(`/api/system/database/migrate`, {
				method: 'POST',
				body: JSON.stringify({ mode }),
				headers: { 'content-type': 'application/json' }
			});

			if (!response.ok) {
				throw new Error(await response.text());
			}

			updateNotification({ type: 'success', message: 'Migrations completed' }, 3000);
		} catch (e) {
			console.error(e);
			updateNotification({ type: 'error', message: 'Migrations failed' }, 3000);
		}
	};

	function useConfirmation(fn: (...args: unknown[]) => unknown): unknown {
		return (...args) => {
			if (confirm('Are you sure you want to delete everything and start fresh?')) {
				return fn(...args);
			}
		};
	}
</script>

<Button on:click={migrate('merge')}>Migrate</Button>
<Button on:click={useConfirmation(migrate('override'))}>Start fresh</Button>
