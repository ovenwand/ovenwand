<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Overlay from './Overlay.svelte';
</script>

<Meta
	title="Atoms/Overlay"
	component={Overlay}
	parameters={{
		layout: 'fullscreen',
		docs: {
			story: {
				inline: false
			}
		}
	}}
/>

<Template let:args>
	<Overlay {...args}>
		{args.default ?? 'Content'}
	</Overlay>
</Template>

<Story name="Default" />

<Story name="With back link" args={{ back: '#' }} />
