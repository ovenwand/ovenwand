<script lang="ts" context="module">
	export interface IPerson {
		name: string;
		title: string;
	}
</script>

<script lang="ts">
	import { Editable } from '../system';
	import { Author } from '../bloks';
	export let blok: IPerson;
</script>

<Editable component={Author} {blok} />
