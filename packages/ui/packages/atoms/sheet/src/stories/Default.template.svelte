<script lang="ts">
	import Sheet from '../Sheet.svelte';
	export let props;
	export let slots;
</script>

<Sheet {...props}>
	{slots.default}
</Sheet>
