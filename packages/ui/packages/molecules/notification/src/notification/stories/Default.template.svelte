<script lang="ts">
	import Notification from '../Notification.svelte';
	export let props;
	export let slots;
</script>

<Notification {...props}>
	{slots.default}
</Notification>
