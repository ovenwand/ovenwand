<script lang="ts">
	import { Author } from '$lib/components/page';
	import { Editable } from './system';
	export let blok;
</script>

<Editable component={Author} {blok} />
