<script lang="ts">
	import { Base } from '@ovenwand/app';
	import { browser } from '$app/env';
	import { page } from '$app/stores';
</script>

<Base title="Ovenwand" {page} {browser}>
	<slot />
</Base>
