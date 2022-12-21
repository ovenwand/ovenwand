<script lang="ts">
	import { route } from '$lib/route';
	import { Footer } from '$lib/components';
</script>

<Footer links={[{ label: '<', columns: 2, anchor: { href: route('/') } }]} />

<slot />
