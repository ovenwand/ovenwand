<script lang="ts">
	import { createClassName } from '@ovenwand/util.browser';
	import { Sheet } from '@ovenwand/ui.sheet';
	import { Icon } from '@ovenwand/ui.icon';
	import { Button } from '@ovenwand/ui.button';
	import { type NotificationType, useNotifications } from '../store';

	export let id: string;
	export let type: NotificationType;
	export let message: string;

	const { close } = useNotifications();

	let icon: string;

	$: switch (type) {
		case 'loading':
			icon = 'o';
			break;
		case 'success':
			icon = '✓';
			break;
		case 'warn':
			icon = '!';
			break;
		case 'error':
			icon = 'X';
			break;
		case 'info':
		default:
			icon = 'i';
			break;
	}

	$: notificationClassName = createClassName({
		'bg-blue-400 dark:bg-blue-700': [undefined, 'info', 'loading'].includes(type),
		'bg-green-400 dark:bg-green-700': type === 'success',
		'bg-yellow-400 dark:bg-yellow-700': type === 'warn',
		'bg-red-400 dark:bg-red-700': type === 'error'
	});

	function onClose() {
		close({ id });
	}
</script>

<Sheet
	id="notification-{id}"
	class="flex items-center justify-center {notificationClassName}"
	padding
	shadow
	rounded
>
	<Icon>{icon}</Icon>
	<span class="flex-grow px-2">{message}</span>
	<Button on:click={onClose}>x</Button>
</Sheet>
