<script lang="ts">
	import { Base } from '@ovenwand/app';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
</script>

<Base title="Ovenwand - Monitor" {page} {browser}>
	<slot />
</Base>
