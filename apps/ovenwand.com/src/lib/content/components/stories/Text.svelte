<script lang="ts" context="module">
	import type { RichTextNode } from '../bloks';

	export interface IText {
		content: RichTextNode[];
	}
</script>

<script lang="ts">
	import type { Blok } from '../../types';
	import { Editable } from '../system';
	import { Text } from '../bloks';
	export let blok: Blok<IText>;
</script>

<Editable component={Text} {blok} />
