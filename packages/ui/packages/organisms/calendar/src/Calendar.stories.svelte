<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Calendar from './Calendar.svelte';
</script>

<Meta
	title="Organisms/Calendar"
	component={Calendar}
	argTypes={{
		date: { control: 'date' } // Regex matching does not seem to be working
	}}
/>

<Template let:args>
	<Calendar {...args} />
</Template>

<Story name="Default" />
