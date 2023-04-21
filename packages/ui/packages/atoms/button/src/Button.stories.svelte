<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';
</script>

<Meta
	title="Atoms/Button"
	component={Button}
	argTypes={{
		size: {
			control: 'radio',
			options: ['default', 'large']
		}
	}}
/>

<Template let:args>
	<Button {...args}>
		{args.default ?? 'Button'}
	</Button>
</Template>

<Story name="Default" />

<Story
	name="Large"
	args={{
		size: 'large',
		default: 'Large button'
	}}
/>

<Story
	name="Full width"
	args={{
		full: true,
		default: 'Full width button'
	}}
/>

<Story
	name="Anchor"
	args={{
		href: '#',
		default: 'Anchor button'
	}}
/>

<Story
	name="Submit button"
	args={{
		type: 'submit',
		default: 'Submit button'
	}}
/>
