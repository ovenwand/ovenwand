<script lang="ts">
	import Modal from '../Modal.svelte';
	export let props;
	export let slots;
</script>

<Modal {...props}>
	{slots.default}
</Modal>
