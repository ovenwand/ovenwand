<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import Sheet from './Sheet.svelte';
</script>

<Meta title="Atoms/Sheet" component={Sheet} />

<Template let:args>
	<Sheet {...args}>
		{args.default ?? 'Content'}
	</Sheet>
</Template>

<Story name="Default" />

<Story name="With background" args={{ background: true }} />

<Story name="With padding" args={{ padding: true }} />

<Story name="With rounded corners" args={{ rounded: true }} />

<Story name="Elevated" args={{ shadow: true }} />
