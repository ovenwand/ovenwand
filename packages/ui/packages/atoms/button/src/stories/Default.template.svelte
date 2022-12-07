<script lang="ts">
	import Button from '../Button.svelte';
	export let props;
	export let slots;
</script>

<Button {...props}>
	{slots.default}
</Button>
