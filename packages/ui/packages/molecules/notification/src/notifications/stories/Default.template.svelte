<script lang="ts">
	import Notifications from '../Notifications.svelte';
	import { useNotifications } from '../../store';

	export let props;

	const { info, error, notifications } = useNotifications();

	if (!$notifications.length) {
		info({ message: 'Notification 1' });
		error({ message: 'Notification 2' });
	}
</script>

<Notifications {...props} />
