<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Modal from './Modal.svelte';
</script>

<Meta title="Molecules/Modal" component={Modal} />

<Template let:args>
	<Modal {...args}>
		{args.default ?? 'Content'}
	</Modal>
</Template>

<Story name="Default" />

<Story name="With back link" args={{ active: true, back: '#' }} />
