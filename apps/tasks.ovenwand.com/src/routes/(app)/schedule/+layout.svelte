<script lang="ts">
	import { Footer } from '$lib/components';
</script>

<Footer
	links={[
		{ label: '<', anchor: { href: '/' } },
		{ label: 'Schedule', anchor: { href: '/schedule' } },
		{ label: 'Explore', anchor: { href: '/explorer' } },
	]}
/>

<slot />