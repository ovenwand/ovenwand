<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Icon from './Icon.svelte';
</script>

<Meta title="Atoms/Icon" component={Icon} />

<Template let:args>
	<Icon {...args}>
		{@html args.icon ?? 'X'}
	</Icon>
</Template>

<Story name="Default" />
