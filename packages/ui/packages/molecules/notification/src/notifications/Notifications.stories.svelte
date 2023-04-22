<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { useNotifications } from '../store';
	import Notifications from './Notifications.svelte';

	const { info, error, notifications } = useNotifications();

	if (!$notifications.length) {
		info({ message: 'Info notification' });
		error({ message: 'Error notification' });
	}
</script>

<Meta title="Molecules/Notifications" component={Notifications} />

<Template let:args>
	<Notifications {...args} />
</Template>

<Story name="Default" />
