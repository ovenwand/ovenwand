<script lang="ts">
	import { Text } from '$lib/components/page';
	import { Editable } from './system';
	export let blok;
</script>

<Editable component={Text} {blok} />
