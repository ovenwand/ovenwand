<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Notification from './Notification.svelte';
</script>

<Meta title="Molecules/Notification" component={Notification} />

<Template let:args>
	<Notification {...args} />
</Template>

<Story name="Default" />

<Story name="Info" args={{ type: 'info', message: 'Info notification' }} />

<Story name="Success" args={{ type: 'success', message: 'Success notification' }} />

<Story name="Warning" args={{ type: 'warn', message: 'Warning notification' }} />

<Story name="Error" args={{ type: 'error', message: 'Error notification' }} />
